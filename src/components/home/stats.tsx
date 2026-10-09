import { Container } from "@/components/ui/container";
import { ReferenceImage } from "@/components/ui/reference-image";
import { home } from "@/content/home";

export function Stats() {
  return <section id="stats" aria-label="Platform statistics" className="stats-section home-section"><Container gutter="none"><div className="stats-artwork">
    <ReferenceImage src="/images/newhome/banner1.webp" alt="Brahmaastra real estate AI platform" fill sizes="(min-width: 1280px) 1280px, 100vw" /><div className="stats-overlay" aria-hidden="true" />
    <dl className="stats-metrics">{home.statistics.map(metric => <div className="stats-metric" key={metric.label}><dt>{metric.label}</dt><dd><span className="sr-only">{metric.value}{metric.suffix}</span><span data-counter={metric.value} aria-hidden="true">{metric.value}</span><span aria-hidden="true">{metric.suffix}</span><span className="stats-metric-glow" aria-hidden="true" /></dd></div>)}</dl>
  </div></Container></section>;
}
