import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ReferenceImage } from "@/components/ui/reference-image";
import { home } from "@/content/home";

export function PlatformStack() {
  return <section id="platform" aria-labelledby="platform-title" className="platform-section home-section"><Container>
    <SectionHeading id="platform-title" variant="stack" align="center" title={home.platform.title} />
    <div className="platform-cards">{home.platform.cards.map(card => <article className="platform-card" data-reverse={card.reverse} key={card.id}>
      <div className="platform-card__copy"><p className="home-eyebrow">{card.eyebrow}</p><h3>{card.title}</h3><p className="platform-card__description">{card.description}</p></div>
      <div className="platform-card__image"><ReferenceImage src={card.referenceImage} alt={card.title} fill sizes="(min-width: 1280px) 544px, (min-width: 768px) calc((100vw - 194px) / 2), calc(100vw - 98px)" /></div>
    </article>)}</div>
  </Container></section>;
}
