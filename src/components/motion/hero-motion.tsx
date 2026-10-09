"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

gsap.registerPlugin(useGSAP);

/** Decorative movement only; content is fully visible before hydration. */
export function HeroMotion({ children }: { children: ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const particles = gsap.utils.toArray<HTMLElement>(".hero-particle", scope.current);
      const small = window.matchMedia("(max-width: 767px)").matches;
      const tweens = particles.slice(0, small ? 3 : 6).map((particle, index) => gsap.to(particle, { y: -14 - index * 2, x: index % 2 ? 7 : -7, opacity: .65, duration: 3.5 + index * .6, delay: index * .35, repeat: -1, yoyo: true, ease: "sine.inOut" }));
      let visible = true;
      const update = () => {
        const inactive = !visible || document.hidden;
        scope.current?.setAttribute("data-motion-inactive", String(inactive));
        tweens.forEach(tween => tween.paused(inactive));
      };
      const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); });
      observer.observe(scope.current!);
      document.addEventListener("visibilitychange", update);
      return () => { scope.current?.removeAttribute("data-motion-inactive"); observer.disconnect(); document.removeEventListener("visibilitychange", update); };
    });
    return () => media.revert();
  }, { scope });
  return <div ref={scope} className="hero-first-screen">{children}<div className="hero-particles" aria-hidden="true">{[0, 1, 2, 3, 4, 5].map(index => <span className="hero-particle" key={index} data-particle={index} />)}</div></div>;
}
