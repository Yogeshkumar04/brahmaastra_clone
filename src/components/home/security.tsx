import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ReferenceImage } from "@/components/ui/reference-image";
import { home } from "@/content/home";

export function Security() {
  return <section id="security" aria-labelledby="security-title" className="security-section home-section"><Container className="security-layout">
    <div className="security-intro"><SectionHeading id="security-title" variant="security" title={home.security.title} description={<p>{home.security.description}</p>} /><ReferenceImage src="/svg/homeview/soc.svg" alt="SOC 2 and GDPR compliance" className="security-badges" /></div>
    <div className="security-features">{home.security.features.map((feature, index) => <article className="security-feature" key={feature.id}><div><h3>{feature.title}</h3><p>{feature.description}</p></div><ReferenceImage src={`/svg/homeview/pri${index + 1}.svg`} alt="" className="security-feature__image" /></article>)}</div>
  </Container></section>;
}
