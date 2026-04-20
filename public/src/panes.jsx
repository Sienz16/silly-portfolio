// Panes — each section rendered as window content.
// Expose to window at the bottom.

const { useState, useEffect, useRef, useMemo } = React;

// ---------- HERO ----------
function HeroPane() {
  const [t, setT] = useState(() => new Date());
  useEffect(() => {
    const i = setInterval(() => setT(new Date()), 1000);
    return () => clearInterval(i);
  }, []);

  // Kota Kinabalu is UTC+8
  const fmt = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Kuala_Lumpur',
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
  }).format(t);

  return (
    <div className="hero-grid">
      <div className="hero-left" style={{padding:'20px 24px'}}>
        <div>
          <div className="eyebrow">sienz/os · v0.7</div>
          <div style={{height:12}} />
          <div className="bigname" style={{fontSize:'clamp(42px, 12vw, 90px)'}}>
            Sienz<span className="slash">/</span>
          </div>
          <div className="bigname" style={{marginTop:-8, fontSize:'clamp(42px, 12vw, 90px)'}}>
            building.
          </div>
          <div style={{height:12}} />
          <p style={{fontFamily:'var(--serif)', fontSize:'clamp(14px, 4vw, 19px)', lineHeight:1.35, maxWidth:440, margin:0, color:'var(--ink-2)'}}>
            Junior fullstack dev, seven months deep. Writing software from a small apartment in Kota Kinabalu, learning in public, shipping things that work.
          </p>
        </div>
        <div style={{display:'flex', gap:6, alignItems:'center', flexWrap:'wrap', marginTop:16}}>
          <span className="shimmer" style={{fontSize:9}}>open to work</span>
          <span className="chip" style={{fontSize:9, margin:0}}>KK · GMT+8</span>
          <span className="chip" style={{fontSize:9, margin:0}}>{fmt}</span>
        </div>
      </div>
      <div className="hero-right">
        <svg viewBox="0 0 400 400" style={{position:'absolute', inset:0, width:'100%', height:'100%'}} preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
            </pattern>
            <radialGradient id="sun" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
              <stop offset="40%" stopColor="rgba(255,255,255,0.2)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </radialGradient>
          </defs>
          <rect x="0" y="0" width="400" height="400" fill="url(#grid)" />
          <circle cx="200" cy="200" r="120" fill="url(#sun)" />
          {/* Orbits */}
          {[60, 90, 130, 170].map((r, i) => (
            <circle key={i} cx="200" cy="200" r={r}
              fill="none" stroke="rgba(26,24,20,0.35)" strokeWidth="0.6"
              strokeDasharray={i % 2 ? "2 4" : "none"} />
          ))}
          {/* Dots on orbits */}
          <g>
            <circle r="4" fill="#1a1814">
              <animateMotion dur="8s" repeatCount="indefinite"
                path="M 260,200 A 60,60 0 1,1 140,200 A 60,60 0 1,1 260,200" />
            </circle>
            <circle r="3" fill="#1a1814">
              <animateMotion dur="14s" repeatCount="indefinite"
                path="M 330,200 A 130,130 0 1,1 70,200 A 130,130 0 1,1 330,200" />
            </circle>
            <circle r="2.5" fill="rgba(26,24,20,0.7)">
              <animateMotion dur="22s" repeatCount="indefinite"
                path="M 370,200 A 170,170 0 1,1 30,200 A 170,170 0 1,1 370,200" />
            </circle>
          </g>
          {/* Crosshair */}
          <g stroke="rgba(26,24,20,0.6)" strokeWidth="0.8">
            <line x1="200" y1="180" x2="200" y2="220" />
            <line x1="180" y1="200" x2="220" y2="200" />
          </g>
          {/* Corner ticks */}
          <g fontFamily="JetBrains Mono, monospace" fontSize="8" fill="rgba(26,24,20,0.6)" letterSpacing="0.1em">
            <text x="12" y="18">5.9804°N</text>
            <text x="320" y="18">116.0735°E</text>
            <text x="12" y="390">// self</text>
            <text x="320" y="390">// signal</text>
          </g>
        </svg>
        <div style={{position:'absolute', bottom:16, left:16, fontFamily:'var(--mono)', fontSize:10, color:'rgba(26,24,20,0.7)', letterSpacing:'0.08em'}}>
          ◉ SIGNAL ACQUIRED
        </div>
      </div>
    </div>
  );
}

// ---------- ABOUT ----------
function AboutPane() {
  return (
    <div className="pane" style={{padding:'24px 28px', maxWidth:720}}>
      <div className="eyebrow">/about</div>
      <div style={{height:10}} />
      <div style={{fontFamily:'var(--serif)', fontSize:'clamp(28px, 6vw, 40px)', lineHeight:1.1, fontStyle:'italic'}}>
        Seven months ago I couldn&rsquo;t center a div. Today I&rsquo;m building systems.
      </div>
      <div className="hline" />
      <div className="responsive-grid">
        <div>
          <p className="eyebrow">where</p>
          <p style={{margin:'4px 0 0', fontSize:14, lineHeight:1.55}}>
            Kota Kinabalu, Sabah &mdash; a coastal city in Malaysian Borneo. Ocean on one side, Mount Kinabalu on the other. Good light, slow internet some days.
          </p>
        </div>
        <div>
          <p className="eyebrow">stance</p>
          <p style={{margin:'4px 0 0', fontSize:14, lineHeight:1.55}}>
            Junior, curious, stubborn about craft. I&rsquo;d rather ship a small thing that works than talk about a big thing that doesn&rsquo;t.
          </p>
        </div>
        <div>
          <p className="eyebrow">learning now</p>
          <p style={{margin:'4px 0 0', fontSize:14, lineHeight:1.55}}>
            Systems design, Rails internals, Postgres tuning, the difference between &ldquo;working&rdquo; and &ldquo;well-made&rdquo;.
          </p>
        </div>
        <div>
          <p className="eyebrow">north star</p>
          <p style={{margin:'4px 0 0', fontSize:14, lineHeight:1.55}}>
            Build software someone actually leans forward to use. Be the junior who asks better questions than last week.
          </p>
        </div>
      </div>
      <div className="hline" />
      <div className="ascii" style={{marginTop:8}}>
{`     ╭────────── self ──────────╮
     │  input  : curiosity      │
     │  output : working code   │
     │  uptime : 7 months       │
     │  status : still learning │
     ╰──────────────────────────╯`}
      </div>
    </div>
  );
}

// ---------- PROJECTS ----------
const PROJECTS = [
  {
    name: "Ramadanku",
    tag: "MOBILE · PWA",
    stack: ["Svelte", "Node", "PostgreSQL"],
    blurb: "A quiet companion for Ramadan. Sahur alarms that actually wake you up, iftar countdowns by geolocation, a prayer guide that doesn't feel like a brochure.",
    role: "Solo build. Design, frontend, API, deploy.",
    hardest: "Handling timezones + prayer calculation methods across the whole ummah without hardcoding anything.",
    win: "A stranger messaged me on Eid to say it got their family through a tough month.",
    art: "crescent"
  },
  {
    name: "Event Management System",
    tag: "SAAS · INTERNAL",
    stack: ["Next.js", "Rails", "PostgreSQL", "Docker"],
    blurb: "End-to-end: ticketing, seating, QR check-in, post-event analytics. Built because every client event tool I tried was either bloated or broken.",
    role: "Full stack — schema, auth, scanner, dashboards.",
    hardest: "Race conditions on seat reservations. Learned about advisory locks the hard way.",
    win: "Checked in 400 people in under 20 minutes at a real event. Zero double-seats.",
    art: "ticket"
  },
  {
    name: "Promptify",
    tag: "AI · TOOL",
    stack: ["Astro", "Vue", "Python"],
    blurb: "Landing-page copy that doesn't sound like it was written by a committee. You describe the product, it asks three sharp questions, then generates a page you'd actually ship.",
    role: "Frontend + prompt architecture.",
    hardest: "Making the AI ask good follow-ups instead of just accepting vague input.",
    win: "Used it on this site's early drafts. It called out filler copy I didn't even see.",
    art: "grid"
  },
  {
    name: "Currency Converter",
    tag: "UTILITY · LEARNING",
    stack: ["React", "Node", "RESTful API"],
    blurb: "My first real app. Looks simple, is simple, still works daily. A reminder that shipping something ordinary is harder than it sounds.",
    role: "All of it. This is where I learned to deploy.",
    hardest: "Caching the rates so I didn't burn through the free API tier in one afternoon.",
    win: "Still running. Zero downtime in 5 months. Month-one Sienz would not believe it.",
    art: "dial"
  }
];

function ProjectArt({ kind }) {
  const common = { width: "100%", height: "100%", viewBox: "0 0 200 120", preserveAspectRatio: "xMidYMid slice" };
  if (kind === "crescent") return (
    <svg {...common}>
      <rect width="200" height="120" fill="#1a1814" />
      <circle cx="140" cy="60" r="38" fill="var(--accent)" />
      <circle cx="128" cy="54" r="36" fill="#1a1814" />
      <g fill="#f1ece1" opacity="0.6">
        {[[30,30],[60,90],[45,70],[90,40],[25,80],[70,20]].map((p,i)=>(
          <circle key={i} cx={p[0]} cy={p[1]} r="0.8" />
        ))}
      </g>
    </svg>
  );
  if (kind === "ticket") return (
    <svg {...common}>
      <rect width="200" height="120" fill="var(--paper-2)" />
      <rect x="20" y="30" width="160" height="60" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1" />
      <line x1="130" y1="30" x2="130" y2="90" stroke="var(--ink)" strokeDasharray="3 3" strokeWidth="1" />
      <text x="40" y="55" fontFamily="Instrument Serif" fontSize="16" fontStyle="italic" fill="var(--ink)">ADMIT ONE</text>
      <text x="40" y="75" fontFamily="JetBrains Mono" fontSize="8" fill="var(--ink-2)" letterSpacing="0.1em">#SZ-000042</text>
      <g fontFamily="JetBrains Mono" fontSize="7" fill="var(--ink)">
        <text x="138" y="50">ROW</text>
        <text x="138" y="62">A-12</text>
      </g>
    </svg>
  );
  if (kind === "grid") return (
    <svg {...common}>
      <rect width="200" height="120" fill="var(--paper-2)" />
      <g stroke="var(--ink)" strokeWidth="0.5" opacity="0.3">
        {Array.from({length:20}).map((_,i)=><line key={'v'+i} x1={i*10} y1="0" x2={i*10} y2="120" />)}
        {Array.from({length:12}).map((_,i)=><line key={'h'+i} x1="0" y1={i*10} x2="200" y2={i*10} />)}
      </g>
      <rect x="30" y="30" width="50" height="12" fill="var(--ink)" />
      <rect x="30" y="48" width="90" height="4" fill="var(--ink-3)" />
      <rect x="30" y="56" width="70" height="4" fill="var(--ink-3)" />
      <rect x="30" y="70" width="34" height="18" fill="var(--accent)" />
    </svg>
  );
  if (kind === "dial") return (
    <svg {...common}>
      <rect width="200" height="120" fill="#1a1814" />
      <circle cx="100" cy="60" r="42" fill="none" stroke="var(--accent)" strokeWidth="1" />
      <circle cx="100" cy="60" r="32" fill="none" stroke="var(--paper)" strokeWidth="0.5" strokeDasharray="2 2" />
      {[0,45,90,135,180,225,270,315].map(a => (
        <line key={a}
          x1={100 + 38*Math.cos(a*Math.PI/180)} y1={60 + 38*Math.sin(a*Math.PI/180)}
          x2={100 + 44*Math.cos(a*Math.PI/180)} y2={60 + 44*Math.sin(a*Math.PI/180)}
          stroke="var(--paper)" strokeWidth="0.8" />
      ))}
      <text x="100" y="64" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10" fill="var(--accent)">1.00</text>
      <text x="100" y="90" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="6" fill="var(--paper)" letterSpacing="0.2em">MYR/USD</text>
    </svg>
  );
  return null;
}

function ProjectsPane() {
  const [open, setOpen] = useState(0);
  return (
    <div>
      <div className="pane" style={{padding:'18px 20px 10px', borderBottom:'1px solid var(--rule)'}}>
        <div style={{display:'flex', alignItems:'baseline', justifyContent:'space-between'}}>
          <div>
            <div className="eyebrow">/projects · 04 items</div>
            <div style={{fontFamily:'var(--serif)', fontSize:'clamp(22px, 5vw, 32px)', fontStyle:'italic', marginTop:6}}>Things I built, with the receipts.</div>
          </div>
          <div style={{fontFamily:'var(--mono)', fontSize:10, color:'var(--ink-3)', display:'none'}}>click a row →</div>
        </div>
      </div>
      <div>
        {PROJECTS.map((p, i) => (
          <div key={p.name}>
            <div className="proj-row" onClick={() => setOpen(open === i ? -1 : i)}>
              <div className="idx">{String(i+1).padStart(2,'0')}</div>
              <div>
                <div className="nm">{p.name}</div>
                <div style={{marginTop:4, display:'flex', gap:6, flexWrap:'wrap'}}>
                  {p.stack.map(s => <span key={s} className="chip">{s}</span>)}
                </div>
              </div>
              <div className="tag">{p.tag} <span style={{marginLeft:8, transition:'transform 0.2s', display:'inline-block', transform: open === i ? 'rotate(90deg)' : 'rotate(0)'}}>›</span></div>
            </div>
            {open === i && (
              <div className="case">
                <div style={{gridColumn:'span 2', display:'grid', gridTemplateColumns:'140px 1fr', gap:20}}>
                  <div style={{height:90, borderRadius:6, overflow:'hidden', border:'1px solid var(--rule)'}}>
                    <ProjectArt kind={p.art} />
                  </div>
                  <p style={{margin:0, fontFamily:'var(--serif)', fontSize:17, lineHeight:1.4, fontStyle:'italic'}}>
                    &ldquo;{p.blurb}&rdquo;
                  </p>
                </div>
                <div><h4>role</h4><p>{p.role}</p></div>
                <div><h4>hardest bug</h4><p>{p.hardest}</p></div>
                <div style={{gridColumn:'span 2'}}><h4>what i&rsquo;m proud of</h4><p>{p.win}</p></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------- STACK ----------
const STACK = [
  { name: "React", pct: 82, group: "front" },
  { name: "Vue", pct: 72, group: "front" },
  { name: "Svelte", pct: 68, group: "front" },
  { name: "Next.js", pct: 78, group: "front" },
  { name: "Astro", pct: 64, group: "front" },
  { name: "Rails", pct: 74, group: "back" },
  { name: "Laravel", pct: 70, group: "back" },
  { name: "Node", pct: 80, group: "back" },
  { name: "Python", pct: 65, group: "back" },
  { name: "Postgres", pct: 75, group: "data" },
  { name: "MySQL", pct: 72, group: "data" },
  { name: "Docker", pct: 60, group: "infra" },
];

function StackPane() {
  return (
    <div className="pane" style={{padding:'20px 24px'}}>
      <div className="eyebrow">/stack · honest</div>
      <div style={{fontFamily:'var(--serif)', fontSize:'clamp(22px, 5vw, 32px)', fontStyle:'italic', marginTop:6, marginBottom:12}}>
        Tools I reach for.
      </div>
      <div className="stack-grid">
        {STACK.map((s, i) => (
          <div key={s.name} className="stack-cell">
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline'}}>
              <span className="nm">{s.name}</span>
              <span className="pct">{s.pct}%</span>
            </div>
            <div style={{height:2, background:'rgba(26,24,20,0.15)', marginTop:10, overflow:'hidden'}}>
              <div style={{
                height:'100%',
                width: s.pct + '%',
                background: s.group === 'front' ? 'var(--ink)' : s.group === 'back' ? 'var(--accent-deep)' : s.group === 'data' ? 'var(--ink-2)' : 'var(--ink-3)',
                transition: 'width 1.2s cubic-bezier(.2,.8,.2,1)'
              }} />
            </div>
            <div style={{fontFamily:'var(--mono)', fontSize:9, color:'var(--ink-3)', marginTop:6, letterSpacing:'0.08em', textTransform:'uppercase'}}>{s.group}</div>
          </div>
        ))}
      </div>
      <div className="hline" />
      <div style={{display:'flex', gap:18, fontFamily:'var(--mono)', fontSize:10, color:'var(--ink-3)', flexWrap:'wrap'}}>
        <span><span style={{display:'inline-block', width:8, height:8, background:'var(--ink)', marginRight:6, verticalAlign:'middle'}} />front</span>
        <span><span style={{display:'inline-block', width:8, height:8, background:'var(--accent-deep)', marginRight:6, verticalAlign:'middle'}} />back</span>
        <span><span style={{display:'inline-block', width:8, height:8, background:'var(--ink-2)', marginRight:6, verticalAlign:'middle'}} />data</span>
        <span><span style={{display:'inline-block', width:8, height:8, background:'var(--ink-3)', marginRight:6, verticalAlign:'middle'}} />infra</span>
      </div>
    </div>
  );
}

// ---------- EXPERIENCE ----------
const TIMELINE = [
  { date: "2025 · SEP", t: "First commit as a fullstack dev", d: "Opened VSCode, made a currency converter, pushed to GitHub. Didn't know what package.json was." },
  { date: "2025 · NOV", t: "First deployed app", d: "Got the converter onto Vercel. Cried a little. (Happy-cried.)" },
  { date: "2026 · JAN", t: "Ramadanku — first real users", d: "Shipped a PWA to strangers. Learned what production pressure feels like." },
  { date: "2026 · FEB", t: "Started Rails + Laravel", d: "Two frameworks, same month. Finally understood what an ORM really is." },
  { date: "2026 · MAR", t: "Event system — first paid build", d: "Shipped a real ticketing platform. 400 people through QR check-in, zero double-scans." },
  { date: "2026 · NOW", t: "Looking for my first team", d: "Senior mentors, hard problems, real codebases. Open to remote + relocate." },
];

function ExperiencePane() {
  return (
    <div className="pane" style={{padding:'20px 24px'}}>
      <div className="eyebrow">/timeline · from zero</div>
      <div style={{fontFamily:'var(--serif)', fontSize:'clamp(22px, 5vw, 32px)', fontStyle:'italic', marginTop:6, marginBottom:10}}>
        The short, honest version.
      </div>
      <div>
        {TIMELINE.map((e, i) => (
          <div key={i} className="tl-item">
            <div className="tl-date">{e.date}</div>
            <div className="tl-event">
              <div className="t">{e.t}</div>
              <div className="d">{e.d}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------- NOW ----------
function NowPane() {
  const [spin, setSpin] = useState(0);
  useEffect(() => {
    const i = setInterval(() => setSpin(s => (s + 1) % 360), 50);
    return () => clearInterval(i);
  }, []);
  return (
    <div className="pane responsive-grid" style={{padding:'20px 24px'}}>
      <div>
        <div className="eyebrow">/now · weekly</div>
        <div style={{fontFamily:'var(--serif)', fontSize:'clamp(20px, 5vw, 28px)', fontStyle:'italic', marginTop:6, lineHeight:1.1}}>
          What I&rsquo;m doing now.
        </div>
        <div className="hline" />
        <ul style={{padding:0, listStyle:'none', margin:0, display:'flex', flexDirection:'column', gap:10, fontSize:13, lineHeight:1.5}}>
          <li><span className="tick" />Refactoring the event system into a proper monolith-per-module shape.</li>
          <li><span className="tick" />Reading <em>Designing Data-Intensive Applications</em>, ch. 5 (replication).</li>
          <li><span className="tick" />Open to mentorship &mdash; if you&rsquo;re senior and kind, I&rsquo;m listening.</li>
          <li><span className="tick" />Running 3km every other morning. Brain works better.</li>
        </ul>
        <div className="hline" />
        <div className="grid-2">
          <div style={{border:'1px solid var(--rule)', padding:12, background:'var(--paper)'}}>
            <div className="eyebrow">cpu · coding</div>
            <div style={{fontFamily:'var(--serif)', fontSize:24, fontStyle:'italic', marginTop:4}}>64%</div>
            <div style={{height:4, background:'var(--paper-2)', marginTop:6}}>
              <div style={{height:'100%', width:'64%', background:'var(--accent-deep)'}} />
            </div>
          </div>
          <div style={{border:'1px solid var(--rule)', padding:12, background:'var(--paper)'}}>
            <div className="eyebrow">cpu · reading</div>
            <div style={{fontFamily:'var(--serif)', fontSize:24, fontStyle:'italic', marginTop:4}}>21%</div>
            <div style={{height:4, background:'var(--paper-2)', marginTop:6}}>
              <div style={{height:'100%', width:'21%', background:'var(--ink-2)'}} />
            </div>
          </div>
        </div>
      </div>
      <div style={{display:'flex', flexDirection:'column', gap:16, alignItems:'flex-start'}}>
        <div className="sticky" style={{maxWidth:260}}>
          <div style={{fontFamily:'var(--mono)', fontSize:10, letterSpacing:'0.12em', marginBottom:6, opacity:0.6}}>NOTE · TO SELF</div>
          Ship the small ugly thing. You learn more from one deploy than from ten tutorials.
        </div>
        <div style={{fontFamily:'var(--mono)', fontSize:10, color:'var(--ink-3)'}}>/currently playing</div>
        <div style={{display:'flex', gap:10, alignItems:'center', border:'1px solid var(--rule)', padding:10, background:'var(--paper-2)', width:'100%', maxWidth:280}}>
          <div style={{width:36, height:36, borderRadius:'50%', border:'1px solid var(--ink)', position:'relative', flexShrink:0}}>
            <div style={{position:'absolute', inset:4, borderRadius:'50%', background:'var(--ink)', transform:`rotate(${spin}deg)`, transition:'transform 0.05s linear'}}>
              <div style={{position:'absolute', top:'50%', left:'50%', width:4, height:4, borderRadius:'50%', background:'var(--accent)', transform:'translate(-50%,-50%)'}} />
            </div>
          </div>
          <div style={{fontSize:12, lineHeight:1.3}}>
            <div style={{fontStyle:'italic', fontFamily:'var(--serif)', fontSize:15}}>lo-fi focus mix</div>
            <div style={{fontFamily:'var(--mono)', fontSize:9, color:'var(--ink-3)', letterSpacing:'0.08em'}}>04:12 / 58:40</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------- CONTACT ----------
function ContactPane() {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard?.writeText("hello@sienz.dev");
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };
  return (
    <div className="pane" style={{padding:'20px 24px'}}>
      <div className="eyebrow">/contact</div>
      <div style={{fontFamily:'var(--serif)', fontSize:'clamp(24px, 6vw, 34px)', fontStyle:'italic', marginTop:6, marginBottom:12, lineHeight:1.05}}>
        Got a problem? Let&rsquo;s talk.
      </div>
      <div className="contact-grid">
        <div className="contact-btn" onClick={copy}>
          <span>hello@sienz.dev</span>
          <span className="arr">{copied ? '✓ copied' : 'copy'}</span>
        </div>
        <a className="contact-btn" href="#" onClick={e=>e.preventDefault()}>
          <span>github.com/sienz</span><span className="arr">→</span>
        </a>
        <a className="contact-btn" href="#" onClick={e=>e.preventDefault()}>
          <span>linkedin/in/sienz</span><span className="arr">→</span>
        </a>
        <a className="contact-btn" href="#" onClick={e=>e.preventDefault()}>
          <span>x.com/sienz_dev</span><span className="arr">→</span>
        </a>
        <div className="contact-btn" onClick={()=>alert('Resume download — placeholder. Drop your real PDF at /public/resume.pdf and update this handler.')}>
          <span>download resume · pdf · 142kb</span><span className="arr">↓</span>
        </div>
      </div>
      <div className="hline" />
      <div style={{fontFamily:'var(--mono)', fontSize:10, color:'var(--ink-3)', lineHeight:1.6}}>
        timezone: GMT+8 · usually awake 09:00–01:00<br />
        preferred: async first, calls when needed<br />
        interested in: first fullstack role, agency work, freelance builds
      </div>
    </div>
  );
}

Object.assign(window, {
  HeroPane, AboutPane, ProjectsPane, StackPane, ExperiencePane, NowPane, ContactPane
});
