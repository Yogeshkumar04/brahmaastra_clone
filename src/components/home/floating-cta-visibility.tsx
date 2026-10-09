"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useMotionDisabled } from "@/components/motion/use-motion-permission";

gsap.registerPlugin(useGSAP, ScrollTrigger);
export function FloatingCTAVisibility({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const disabled = useMotionDisabled();
  useGSAP((context, contextSafe) => {
    const section = document.getElementById("reos-section");
    const element = root.current;
    if (!section || !element) return;
    const link = element.querySelector<HTMLAnchorElement>("a")!;
    const update = contextSafe!( (hidden: boolean) => {
      gsap.to(link, { opacity: hidden ? 0 : 1, scale: hidden ? .95 : 1, duration: disabled ? 0 : .5, ease: "power2.out", overwrite: true });
      element.inert = hidden;
      element.style.pointerEvents = hidden ? "none" : "";
      if (hidden && document.activeElement === link) { section.focus({ preventScroll: true }); }
    });
    try {
      const trigger = ScrollTrigger.create({ id: "reos-floating-cta", trigger: section, start: "top 70%", end: "bottom 30%", onToggle: self => update(self.isActive), onRefresh: self => update(self.isActive), invalidateOnRefresh: true });
      update(trigger.isActive);
    } catch { context.revert(); }
    return () => { element.inert = false; element.style.pointerEvents = ""; };
  }, { scope: root, dependencies: [disabled], revertOnUpdate: true });
  return <div ref={root}>{children}</div>;
}
