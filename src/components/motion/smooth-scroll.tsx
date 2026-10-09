"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motionPresets } from "@/components/motion/presets";

gsap.registerPlugin(useGSAP, ScrollTrigger);
export type SmoothScrollProps = { children: ReactNode; enabled?: boolean };

/** A single ticker owns Lenis. Touch and small screens retain native scrolling. */
export function SmoothScroll({ children, enabled = true }: SmoothScrollProps) {
  const scope = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    if (!enabled) return;
    const media = gsap.matchMedia();
    media.add("(min-width: 768px) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      let lenis: Lenis | undefined;
      const tick = (time: number) => lenis?.raf(time * 1000);
      try {
        lenis = new Lenis({ ...motionPresets.smoothScroll, smoothWheel: true, autoRaf: false, anchors: true,
          prevent: node => Boolean(node.closest('[data-lenis-prevent],dialog,[role="dialog"]')) });
        lenis.on("scroll", ScrollTrigger.update);
        gsap.ticker.lagSmoothing(0);
        gsap.ticker.add(tick);
      } catch {
        lenis?.destroy(); // Native scroll remains available on initialization failure.
      }
      return () => {
        gsap.ticker.remove(tick);
        lenis?.off("scroll", ScrollTrigger.update);
        lenis?.destroy();
        gsap.ticker.lagSmoothing(500, 33); // Restore GSAP's default on teardown.
      };
    });
    return () => media.revert();
  }, { scope, dependencies: [enabled], revertOnUpdate: true });
  return <div ref={scope} className="motion-contents">{children}</div>;
}
