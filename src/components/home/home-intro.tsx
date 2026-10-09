import Image from "next/image";
import { ArrowRight, Network } from "lucide-react";
import { HeroArtwork, HeroLandscape } from "@/components/home/hero-artwork";
import { HeroMotion } from "@/components/motion/hero-motion";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { home } from "@/content/home";

function PartnerIcon({ whatsapp = false }: { whatsapp?: boolean }) {
  return <svg viewBox="0 0 24 24" aria-hidden="true" className={`partner-icon ${whatsapp ? "partner-icon--whatsapp" : "partner-icon--meta"}`} fill="currentColor">{whatsapp ? <path d="M12 2a10 10 0 0 0-8.68 14.97L2 22l5.17-1.35A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.07.8.82-3-.2-.32A8.2 8.2 0 1 1 12 20.2Zm4.5-6.15c-.25-.12-1.47-.72-1.7-.8-.23-.09-.4-.13-.57.12-.16.25-.64.8-.78.96-.15.17-.29.19-.53.07-.25-.12-1.05-.39-2-1.24-.73-.65-1.24-1.45-1.38-1.7-.15-.24-.02-.38.1-.5l.37-.43c.12-.14.16-.25.24-.42.09-.16.05-.3-.02-.43-.06-.12-.56-1.34-.77-1.84-.2-.48-.4-.41-.57-.42h-.48c-.17 0-.44.06-.67.31-.23.25-.87.85-.87 2.08s.9 2.41 1.03 2.58c.12.16 1.77 2.7 4.28 3.78.6.26 1.08.42 1.44.53.6.19 1.15.16 1.59.1.48-.07 1.47-.61 1.68-1.19.2-.57.2-1.07.14-1.18-.07-.1-.23-.16-.48-.28Z" /> : <path d="M24 12a12 12 0 1 0-13.88 11.85v-8.38H7.08V12h3.04V9.36c0-3 1.79-4.66 4.53-4.66 1.31 0 2.68.24 2.68.24v2.95h-1.51c-1.49 0-1.94.93-1.94 1.88V12h3.3l-.53 3.47h-2.77v8.38A12 12 0 0 0 24 12Z" />}</svg>;
}

export function HomeIntro() {
  return <section aria-labelledby="home-title" className="home-hero">
    <div className="hero-grain" aria-hidden="true"><svg width="100%" height="100%"><filter id="hero-noise"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" /><feColorMatrix type="saturate" values="0" /></filter><rect width="100%" height="100%" fill="var(--muted)" filter="url(#hero-noise)" /></svg></div>
    <HeroMotion>
      <HeroLandscape />
      <div className="hero-copy">
        <HeroArtwork />
        <SectionHeading as="h1" id="home-title" variant="hero" align="center" className="hero-heading" title={home.hero.title} description={<p>{home.hero.lead}<br />{home.hero.description}</p>} />
        <Button href={home.hero.cta.href} target="_blank" endIcon={<ArrowRight />} className="hero-demo">{home.hero.cta.label}</Button>
        <a className="hero-secondary" href={`https://brahmaastra.ai${home.hero.secondaryCta.href}`}>{home.hero.secondaryCta.label}<ArrowRight aria-hidden="true" /></a>
      </div>
    </HeroMotion>
    <div className="hero-products-area">
      <div className="hero-partners">{home.hero.badges.map((badge, index) => <span className="hero-partner" key={badge}><PartnerIcon whatsapp={index === 1} />{badge}</span>)}</div>
      <div className="hero-products"><h2>Our Products</h2><div className="hero-product-grid">{home.products.map((product, index) => <a className="hero-product" key={product.href} href={`https://brahmaastra.ai${product.href}`}>
        <span className={`hero-product__icon ${index === 2 ? "hero-product__icon--network" : ""}`}>{index < 2 ? <Image src={`/assets/brand/${index === 0 ? "trishul.svg" : "reos.png"}`} width={32} height={32} alt="" /> : <Network aria-hidden="true" />}</span>
        <span><span className="hero-product__name">{product.name}</span><span className="hero-product__description">{product.description}</span></span>
        <span className="hero-product__explore">Explore<ArrowRight aria-hidden="true" /></span>
      </a>)}</div></div>
    </div>
  </section>;
}
