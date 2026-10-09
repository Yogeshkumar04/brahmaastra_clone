import type { CSSProperties } from "react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ReferenceImage } from "@/components/ui/reference-image";
import { home } from "@/content/home";

export function Integrations() {
  return <section id="integrations" aria-labelledby="integrations-title" className="integrations-section home-section"><Container>
    <div className="integrations-artwork">
      <svg className="integrations-ellipse" viewBox="0 0 900 500" preserveAspectRatio="none" fill="none" aria-hidden="true"><ellipse cx="450" cy="250" rx="350" ry="170" /></svg>
      <SectionHeading id="integrations-title" variant="integrations" align="center" title={home.integrations.title} description={<p>{home.integrations.description}</p>} />
      <ul className="integration-nodes" data-lenis-prevent tabIndex={0} aria-label="Connected platforms; scroll horizontally on mobile">{home.integrations.items.map((item, index) => {
        const angle=(-135 + index * (360 / home.integrations.items.length)) * Math.PI / 180;
        const style = { "--node-x": `${50 + 40 * Math.cos(angle)}%`, "--node-y": `${50 + 36 * Math.sin(angle)}%`, "--node-x-small": `${50 + 38 * Math.cos(angle)}%`, "--node-y-small": `${50 + 34 * Math.sin(angle)}%` } as CSSProperties;
        return <li className="integration-node" key={item.name} style={style} data-index={index}><ReferenceImage src={item.referenceAsset} alt={item.name} width={40} height={40} /></li>;
      })}</ul>
    </div>
  </Container></section>;
}
