import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { ReferenceImage } from "@/components/ui/reference-image";
import { home } from "@/content/home";

export function WhyChoose() {
  return <section id="benefits" aria-labelledby="benefits-title" className="benefits-section home-section">
    <ReferenceImage src="/images/newhome/banner2.webp" alt="Why leading real estate teams choose Brahmaastra" fill /><div className="benefits-overlay" aria-hidden="true" />
    <div className="benefits-content"><SectionHeading id="benefits-title" variant="section" eyebrow={home.benefits.eyebrow} title={home.benefits.title} description={<p>{home.benefits.description}</p>} /><Button href={home.benefits.cta.href} target="_blank" size="callback" variant="secondary">{home.benefits.cta.label}</Button></div>
  </section>;
}
