// Tweaks panel — toggles for each section + accent hue
const { useState, useEffect } = React;

function TweaksPanel({ tweaks, setTweak }) {
  const rows = [
    ['showHero', 'Hero'],
    ['showAbout', 'About'],
    ['showProjects', 'Projects'],
    ['showStack', 'Stack'],
    ['showExperience', 'Timeline'],
    ['showNow', 'Now'],
    ['showContact', 'Contact'],
    ['showBoot', 'Boot on load'],
  ];
  return (
    <div className="tweaks-panel">
      <h4>Tweaks</h4>
      {rows.map(([k, label]) => (
        <div key={k} className="tweaks-row">
          <span>{label}</span>
          <button
            className={`toggle ${tweaks[k] ? 'on' : ''}`}
            onClick={() => setTweak(k, !tweaks[k])}
          />
        </div>
      ))}
      <div className="tweaks-row" style={{flexDirection:'column', alignItems:'stretch', gap:6}}>
        <div style={{display:'flex', justifyContent:'space-between'}}>
          <span>Accent hue</span>
          <span style={{color:'var(--ink-3)'}}>{tweaks.accentHue}°</span>
        </div>
        <input type="range" min="0" max="360" step="1"
          value={tweaks.accentHue}
          onChange={e => setTweak('accentHue', +e.target.value)}
          style={{width:'100%'}}
        />
      </div>
      <div style={{fontSize:9, color:'var(--ink-3)', marginTop:10, lineHeight:1.4, letterSpacing:'0.04em'}}>
        saved to localStorage · persisted<br />across reloads
      </div>
    </div>
  );
}

window.TweaksPanel = TweaksPanel;
