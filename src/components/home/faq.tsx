import { FAQAccordion } from "@/components/home/faq-accordion";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { home } from "@/content/home";

export function FAQ() {
  return <section id="faq" aria-labelledby="faq-title" className="faq-section home-section"><Container>
    <SectionHeading id="faq-title" align="center" title={home.faq.title} description={<p>{home.faq.description}</p>} />
    <FAQAccordion items={home.faq.items} />
  </Container></section>;
}
