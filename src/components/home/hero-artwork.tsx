const orbitPath = "M20 250 A480 170 0 0 0 980 250 A480 170 0 0 0 20 250";

/** Reference geometry, with all artwork paint driven by the custom palette. */
export function HeroArtwork() {
  return <div className="one-stage" aria-hidden="true">
    {(["back", "front"] as const).map(half => <svg key={half} className={`hero-orbit hero-orbit--${half}`} viewBox="0 0 1000 500" fill="none">
      {half === "back" && <defs>
        <clipPath id="hero-orbit-back"><rect x="-40" y="-40" width="1080" height="290" /></clipPath>
        <clipPath id="hero-orbit-front"><rect x="-40" y="250" width="1080" height="290" /></clipPath>
        <linearGradient id="hero-orbit-paint" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" className="orbit-stop-secondary" stopOpacity=".55" /><stop offset="30%" className="orbit-stop-text" /><stop offset="65%" className="orbit-stop-primary" /><stop offset="100%" className="orbit-stop-secondary" stopOpacity=".55" /></linearGradient>
        <filter id="hero-orbit-filter" x="-20%" y="-50%" width="140%" height="200%"><feGaussianBlur stdDeviation="4" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
      </defs>}
      <g transform="rotate(-10 500 250)" clipPath={`url(#hero-orbit-${half})`}>
        <path d={orbitPath} stroke="url(#hero-orbit-paint)" strokeWidth={half === "back" ? 3 : 3.5} opacity={half === "back" ? .85 : 1} filter="url(#hero-orbit-filter)" />
        <path className="orbit-spark orbit-spark--halo" d={orbitPath} pathLength="1000" strokeWidth="14" strokeLinecap="round" />
        <path className="orbit-spark orbit-spark--core" d={orbitPath} pathLength="1000" strokeWidth="5" strokeLinecap="round" />
      </g>
    </svg>)}
    <span className="one-word one-glow">ONE</span>
    <span className="one-word one-body">ONE</span>
    <span className="one-word one-shine">ONE</span>
  </div>;
}

export function HeroLandscape() {
  return <div className="hero-landscape" aria-hidden="true">
    <div className="hero-planet" />
    <svg className="hero-ridges" viewBox="0 0 1440 240" preserveAspectRatio="none">
      <defs><linearGradient id="ridge-back" x1="0" y1="0" x2="0" y2="1"><stop className="ridge-stop-surface" /><stop offset="100%" className="ridge-stop-background" /></linearGradient><linearGradient id="ridge-front" x1="0" y1="0" x2="0" y2="1"><stop className="ridge-stop-dark" /><stop offset="100%" className="ridge-stop-background" /></linearGradient></defs>
      <path d="M0 150 L90 95 L170 130 L260 60 L340 115 L420 85 L520 140 L620 120 L720 150 L820 125 L930 145 L1040 100 L1130 130 L1220 80 L1320 120 L1440 90 L1440 240 L0 240 Z" fill="url(#ridge-back)" className="ridge-outline" strokeWidth="1" />
      <path d="M0 190 L120 140 L210 175 L300 125 L400 180 L520 165 L640 195 L760 180 L880 200 L1000 170 L1100 190 L1200 150 L1310 185 L1440 160 L1440 240 L0 240 Z" fill="url(#ridge-front)" />
    </svg><div className="hero-landscape__fade" />
  </div>;
}
