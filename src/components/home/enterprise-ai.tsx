import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { FeatureIcon } from "@/components/ui/feature-icon";
import { referenceAsset } from "@/content/reference-assets";
import { home } from "@/content/home";

export function EnterpriseAI() {
  return <section id="enterprise" aria-labelledby="enterprise-title" className="enterprise-section home-section">
    <Container>
      <div className="enterprise-intro">
        <SectionHeading id="enterprise-title" variant="enterprise" title={home.enterprise.title} description={<p>{home.enterprise.description}</p>} />
        <div className="enterprise-video"><video controls muted playsInline preload="metadata" poster="/assets/reference/video/enterprise-poster.png" aria-label="Brahmaastra enterprise AI overview"><source src={referenceAsset("/video/ad-video.mp4")} type="video/mp4" /><a href={referenceAsset("/video/ad-video.mp4")}>Watch the enterprise AI overview</a></video></div>
      </div>
      <div className="enterprise-features">{home.enterprise.features.map((feature, index) => <article key={feature.id} className="enterprise-feature" data-accent={index % 2 ? "secondary" : "primary"}>
        <span className="enterprise-feature__bar" aria-hidden="true" /><span className="enterprise-feature__icon">{index === 0 ? <span aria-hidden="true">AI</span> : <FeatureIcon name={feature.icon} />}</span>
        <button type="button" className="enterprise-feature-select" aria-label={`Highlight ${feature.title}`} /><h3>{feature.title}</h3><p>{feature.description}</p>
      </article>)}</div>
    </Container>
  </section>;
}
