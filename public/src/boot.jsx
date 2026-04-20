// Boot sequence shown on first load (can be re-triggered)
const { useEffect, useState } = React;

const BOOT_LINES = [
  { t: "[  0.00] sienz/os v0.7.0 (junior build) — boot", c: "" },
  { t: "[  0.12] CPU: 1x human · CORES: 2 · CACHE: 7 months", c: "dim" },
  { t: "[  0.18] loading kernel ........................ ok", c: "ok" },
  { t: "[  0.31] mount /self on /kota-kinabalu .......... ok", c: "ok" },
  { t: "[  0.44] probing stacks ........................", c: "" },
  { t: "         react ... vue ... svelte ... astro ... next", c: "dim" },
  { t: "         rails ... laravel ... node ... python ..... ok", c: "ok" },
  { t: "[  0.71] postgres  [ ok ]    mysql  [ ok ]    docker  [ ok ]", c: "ok" },
  { t: "[  0.89] warning: imposter_syndrome.service active", c: "warn" },
  { t: "[  0.92]          (non-fatal. ignoring.)", c: "dim" },
  { t: "[  1.10] loading personality ..................... ok", c: "ok" },
  { t: "[  1.24] loading curiosity ...................... ok", c: "ok" },
  { t: "[  1.38] establishing signal on 5.9804°N 116.0735°E", c: "" },
  { t: "[  1.52] uplink confirmed. ready.", c: "ok" },
  { t: "", c: "" },
  { t: "  welcome. drag windows. click the dock. gag accordingly.", c: "" },
];

function Boot({ onDone }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (n >= BOOT_LINES.length) {
      const t = setTimeout(onDone, 650);
      return () => clearTimeout(t);
    }
    const delay = 80 + Math.random() * 90;
    const t = setTimeout(() => setN(n + 1), delay);
    return () => clearTimeout(t);
  }, [n, onDone]);

  return (
    <div className="boot">
      {BOOT_LINES.slice(0, n).map((l, i) => (
        <div key={i} className={`boot-line ${l.c}`}>{l.t || '\u00A0'}</div>
      ))}
      {n < BOOT_LINES.length && (
        <div style={{display:'inline-block', width:8, height:14, background:'var(--crt)', verticalAlign:'middle', animation:'fadein 0.4s infinite alternate'}} />
      )}
      <div style={{position:'absolute', bottom:20, right:24, fontSize:10, opacity:0.5, letterSpacing:'0.1em'}}>
        press any key to skip
      </div>
    </div>
  );
}

window.Boot = Boot;
