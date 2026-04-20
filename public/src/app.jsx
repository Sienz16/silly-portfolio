// Main app — desktop shell, window manager, status bar, dock
const { useState, useEffect, useRef, useCallback, useMemo } = React;

const SECTIONS = [
  { id: 'hero',       title: 'hero.app',        icon: '◉', Comp: () => <HeroPane />,       tweak: 'showHero',       defaultOpen: true  },
  { id: 'projects',   title: 'projects/',       icon: '▤', Comp: () => <ProjectsPane />,   tweak: 'showProjects',   defaultOpen: true  },
  { id: 'about',      title: 'about.txt',       icon: 'A', Comp: () => <AboutPane />,      tweak: 'showAbout',      defaultOpen: false },
  { id: 'stack',      title: 'stack.config',    icon: '⌘', Comp: () => <StackPane />,      tweak: 'showStack',      defaultOpen: false },
  { id: 'experience', title: 'timeline.log',    icon: '▸', Comp: () => <ExperiencePane />, tweak: 'showExperience', defaultOpen: false },
  { id: 'now',        title: 'now.md',          icon: '◐', Comp: () => <NowPane />,        tweak: 'showNow',        defaultOpen: false },
  { id: 'contact',    title: 'contact.sh',      icon: '@', Comp: () => <ContactPane />,    tweak: 'showContact',    defaultOpen: false },
];

// Priority-ordered cell templates per open-set. Each cell value is [colStart, rowStart, colSpan, rowSpan] on a 12x12 grid.
// The engine picks the template that matches the CURRENT open set's size and fills cells in order of importance.
const CELLS = {
  1: {
    hero:       [0,0,12,12],
    projects:   [0,0,12,12],
    about:      [0,0,12,12],
    stack:      [0,0,12,12],
    experience: [0,0,12,12],
    now:        [0,0,12,12],
    contact:    [0,0,12,12],
  },
  2: [
    [0,0,7,12], [7,0,5,12]
  ],
  3: [
    [0,0,7,8], [7,0,5,12], [0,8,7,4]
  ],
  4: [
    [0,0,7,8], [7,0,5,8], [0,8,6,4], [6,8,6,4]
  ],
  5: [
    [0,0,7,7], [7,0,5,7], [0,7,4,5], [4,7,4,5], [8,7,4,5]
  ],
  6: [
    [0,0,7,7], [7,0,5,7], [0,7,4,5], [4,7,4,5], [8,7,4,5], [0,0,0,0] // 6th overlays - handled below
  ],
  7: [
    [0,0,7,6], [7,0,5,6], [0,6,4,3], [4,6,4,3], [8,6,4,3], [0,9,7,3], [7,9,5,3]
  ],
};

// Pick cells for the CURRENT open set, in a fixed priority order so hero/projects always anchor.
const PRIORITY = ['hero','projects','about','stack','now','experience','contact'];

// Bento grid layout — computed from viewport + currently open set.
function computeBento(openIds) {
  const W = window.innerWidth;
  const H = window.innerHeight;
  const isMobile = W < 640;

  const topPad = isMobile ? 36 : 44;
  const botPad = isMobile ? 80 : 90;
  const sidePad = isMobile ? 8 : 16;
  const gap = isMobile ? 8 : 10;

  const availW = W - sidePad * 2;
  const availH = H - topPad - botPad;

  if (isMobile) {
    const result = {};
    openIds.forEach((id) => {
      result[id] = {
        x: sidePad,
        y: topPad,
        w: availW,
        h: availH,
      };
    });
    return result;
  }

  const col = (availW - gap * 11) / 12;
  const row = (availH - gap * 11) / 12;
  const cellFromRect = ([cx, cy, cw, ch]) => ({
    x: Math.round(sidePad + cx * (col + gap)),
    y: Math.round(topPad + cy * (row + gap)),
    w: Math.round(cw * col + (cw - 1) * gap),
    h: Math.round(ch * row + (ch - 1) * gap),
  });

  const ordered = PRIORITY.filter(id => openIds.includes(id));
  const n = ordered.length;
  if (n === 0) return {};

  const result = {};
  if (n === 1) {
    result[ordered[0]] = cellFromRect([0, 0, 12, 12]);
    return result;
  }
  const template = CELLS[n] || CELLS[7];
  ordered.forEach((id, i) => {
    const rect = template[i] || template[template.length - 1];
    result[id] = cellFromRect(rect);
  });
  return result;
}

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  useEffect(() => {
    const h = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);

  // Force relayout if mobile (ignore manual touches)
  useEffect(() => {
    if (isMobile) {
      setWins(ws => relayout(ws));
    }
  }, [isMobile]);
  // Tweaks state
  const [tweaks, setTweaks] = useState(() => {
    const saved = (() => { try { return JSON.parse(localStorage.getItem('sienz_tweaks') || 'null'); } catch { return null; } })();
    return { ...window.__TWEAKS__, ...(saved || {}) };
  });
  const setTweak = useCallback((k, v) => {
    setTweaks(t => {
      const next = { ...t, [k]: v };
      try { localStorage.setItem('sienz_tweaks', JSON.stringify(next)); } catch {}
      try { window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { [k]: v } }, '*'); } catch {}
      return next;
    });
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty('--accent-h', tweaks.accentHue);
  }, [tweaks.accentHue]);

  // Boot
  const [booting, setBooting] = useState(() => {
    const shown = sessionStorage.getItem('sienz_booted') === '1';
    return tweaks.showBoot && !shown;
  });
  useEffect(() => { if (!booting) sessionStorage.setItem('sienz_booted', '1'); }, [booting]);
  useEffect(() => {
    if (!booting) return;
    const skip = () => setBooting(false);
    window.addEventListener('keydown', skip, { once: true });
    window.addEventListener('click', skip, { once: true });
    return () => {
      window.removeEventListener('keydown', skip);
      window.removeEventListener('click', skip);
    };
  }, [booting]);

  // Windows state — initial: only defaultOpen windows visible.
  const makeInitial = () => {
    const openIds = SECTIONS.filter(s => s.defaultOpen).map(s => s.id);
    const b = computeBento(openIds);
    return SECTIONS.map((s, i) => ({
      id: s.id,
      x: (b[s.id] || { x: 100 }).x || 100,
      y: (b[s.id] || { y: 100 }).y || 100,
      w: (b[s.id] || { w: 500 }).w || 500,
      h: (b[s.id] || { h: 400 }).h || 400,
      open: s.defaultOpen,
      z: 10 + i,
    }));
  };

  const [wins, setWins] = useState(() => {
    const saved = (() => { try { return JSON.parse(localStorage.getItem('sienz_wins_v3') || 'null'); } catch { return null; } })();
    if (saved && Array.isArray(saved) && saved.length === SECTIONS.length) return saved;
    return makeInitial();
  });

  useEffect(() => {
    try { localStorage.setItem('sienz_wins_v3', JSON.stringify(wins)); } catch {}
  }, [wins]);

  // Re-layout whenever the open set changes (unless user has manually repositioned).
  const [userTouched, setUserTouched] = useState(() => localStorage.getItem('sienz_touched') === '1');
  const relayout = useCallback((winsList) => {
    const openIds = winsList.filter(w => w.open).map(w => w.id);
    const b = computeBento(openIds);
    return winsList.map(w => b[w.id] ? { ...w, x: b[w.id].x, y: b[w.id].y, w: b[w.id].w, h: b[w.id].h } : w);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (userTouched) return;
      setWins(ws => relayout(ws));
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [userTouched, relayout]);

  const markTouched = useCallback(() => {
    if (!userTouched) {
      setUserTouched(true);
      try { localStorage.setItem('sienz_touched', '1'); } catch {}
    }
  }, [userTouched]);

  const [focused, setFocused] = useState('hero');
  const topZ = useRef(100);

  const focus = useCallback((id) => {
    setFocused(id);
    topZ.current += 1;
    const z = topZ.current;
    setWins(ws => ws.map(w => w.id === id ? { ...w, z } : w));
  }, []);

  const move = useCallback((id, x, y) => {
    markTouched();
    setWins(ws => ws.map(w => w.id === id ? { ...w, x, y } : w));
  }, [markTouched]);
  const resize = useCallback((id, w, h) => {
    markTouched();
    setWins(ws => ws.map(win => win.id === id ? { ...win, w, h } : win));
  }, [markTouched]);
  const close = useCallback((id) => {
    setWins(ws => {
      const next = ws.map(w => w.id === id ? { ...w, open: false } : w);
      return userTouched ? next : relayout(next);
    });
  }, [userTouched, relayout]);
  const openWin = useCallback((id) => {
    setWins(ws => {
      const exists = ws.find(w => w.id === id);
      if (!exists) return ws;
      topZ.current += 1;
      const next = ws.map(w => w.id === id ? { ...w, open: true, z: topZ.current } : w);
      return userTouched ? next : relayout(next);
    });
    setFocused(id);
  }, [userTouched, relayout]);

  const resetLayout = () => {
    try {
      localStorage.removeItem('sienz_wins_v3');
      localStorage.removeItem('sienz_touched');
    } catch {}
    setUserTouched(false);
    setWins(makeInitial());
    setFocused('hero');
  };

  // Tweaks panel host integration
  const [tweakOpen, setTweakOpen] = useState(false);
  useEffect(() => {
    const handler = (e) => {
      if (!e.data) return;
      if (e.data.type === '__activate_edit_mode') setTweakOpen(true);
      if (e.data.type === '__deactivate_edit_mode') setTweakOpen(false);
    };
    window.addEventListener('message', handler);
    try { window.parent.postMessage({ type: '__edit_mode_available' }, '*'); } catch {}
    return () => window.removeEventListener('message', handler);
  }, []);

  // Cursor dot
  const dotRef = useRef(null);
  useEffect(() => {
    const move = (e) => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
      }
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  // Clock
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const i = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(i);
  }, []);
  const clock = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Kuala_Lumpur',
    weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false
  }).format(now);

  if (booting) return <Boot onDone={() => setBooting(false)} />;

  const visibleSections = SECTIONS.filter(s => tweaks[s.tweak]);

  return (
    <div id="desktop" className={isMobile ? 'is-mobile' : ''}>
      <div className="statusbar">
        <div className="left">
          <span style={{fontWeight:700, letterSpacing:'0.06em'}}>◉ {isMobile ? 'S/OS' : 'sienz/os'}</span>
          {!isMobile && <span>{focused ? SECTIONS.find(s=>s.id===focused)?.title : 'desktop'}</span>}
          {!isMobile && <span style={{opacity:0.6}}>│</span>}
          {!isMobile && <span style={{cursor:'pointer'}} onClick={resetLayout}>view › reset layout</span>}
        </div>
        <div className="right">
          {isMobile ? (
            <span>{clock.split(' · ')[1]}</span>
          ) : (
            <>
              <span><span className="dot live" />live · open to work</span>
              <span>kota kinabalu · {clock}</span>
              <span>⌥ 100%</span>
              <span>⌘ wifi ·▆</span>
            </>
          )}
        </div>
      </div>

      {wins.filter(w => {
        const sec = SECTIONS.find(s => s.id === w.id);
        return w.open && sec && tweaks[sec.tweak];
      }).map(w => {
        const sec = SECTIONS.find(s => s.id === w.id);
        return (
          <Window
            key={w.id}
            id={w.id}
            title={sec.title}
            x={w.x} y={w.y} w={w.w} h={w.h} z={w.z}
            focused={focused === w.id}
            onFocus={focus}
            onClose={close}
            onMove={move}
            onResize={resize}
            noResize={isMobile}
            isMobile={isMobile}
          >
            <sec.Comp />
          </Window>
        );
      })}

      <div className="dock">
        {SECTIONS.map(s => {
          if (!tweaks[s.tweak]) return null;
          const w = wins.find(x => x.id === s.id);
          const isOpen = w && w.open;
          return (
            <div key={s.id}
              className={`dock-item ${isOpen && focused === s.id ? 'active' : ''} ${isOpen ? 'opened' : ''}`}
              onClick={() => {
                if (!isOpen) { openWin(s.id); return; }
                if (focused === s.id && !isMobile) { close(s.id); return; }
                focus(s.id);
              }}
              title={s.id}>
              <span>{s.icon}</span>
              {!isMobile && <span className="tip">{!isOpen ? s.id + ' · open' : focused === s.id ? s.id + ' · close' : s.id}</span>}
            </div>
          );
        })}
        {!isMobile && <div style={{width:1, background:'rgba(255,255,255,0.1)', margin:'4px 2px'}} />}
        {!isMobile && (
          <div className="dock-item" onClick={resetLayout} title="reset">
            <span style={{fontSize:13}}>↻</span>
            <span className="tip">reset layout</span>
          </div>
        )}
      </div>

      <div className="tweaks-fab" onClick={() => setTweakOpen(o => !o)} title="tweaks">
        {tweakOpen ? '×' : '⚙'}
      </div>
      {tweakOpen && <TweaksPanel tweaks={tweaks} setTweak={setTweak} />}

      <div ref={dotRef} className="cursor-dot" />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
