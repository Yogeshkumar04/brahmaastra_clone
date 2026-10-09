import { Fragment } from "react";
import { PartnerCarousel } from "@/components/home/partner-carousel";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ReferenceImage } from "@/components/ui/reference-image";
import { home } from "@/content/home";

/** Native radio selection works before hydration and without JavaScript. */
export function Partners() {
  return <section id="partners" aria-labelledby="partners-title" className="partners-section home-section"><Container>
    <SectionHeading id="partners-title" variant="compact" align="center" eyebrow={home.partners.eyebrow} title={home.partners.title} />
    <PartnerCarousel names={home.partners.items.map(partner => partner.name)} panels={home.partners.items.map(partner => <Fragment key={partner.name}><span className="partner-logo"><ReferenceImage src={partner.referenceAsset} alt={partner.name} width={176} height={176} /></span><p>{partner.name}</p></Fragment>)} />
  </Container></section>;
}
