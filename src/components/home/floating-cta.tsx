import Image from "next/image";
import { FloatingCTAVisibility } from "@/components/home/floating-cta-visibility";
import { home } from "@/content/home";

export function FloatingCTA() {
  return <FloatingCTAVisibility><a className="hero-floating-cta" href={`https://brahmaastra.ai${home.hero.floatingCta.href}`} aria-label="Ask REOS anything about real estate"><span className="hero-floating-cta__body"><span>{home.hero.floatingCta.label}</span><span className="hero-floating-cta__avatar"><Image src="/assets/brand/reos.png" width={24} height={24} alt="" /></span></span></a></FloatingCTAVisibility>;
}
