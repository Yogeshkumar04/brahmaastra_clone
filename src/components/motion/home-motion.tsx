"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SmoothScroll } from "@/components/motion/smooth-scroll";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/** Progressive enhancement: no CSS starting state hides server-rendered content. */
export function HomeMotion({ children }: { children: ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const root = scope.current;
    if (!root) return;
    const media = gsap.matchMedia();
    media.add({ motion: "(prefers-reduced-motion: no-preference)", desktop: "(min-width: 1024px) and (pointer: fine)", marquee: "(min-width: 768px) and (pointer: fine)", orbit: "(min-width: 640px)" }, context => {
      if (!context.conditions?.motion) return;
      const desktop = Boolean(context.conditions.desktop);
      const orbit = Boolean(context.conditions.orbit);
      const marquee = Boolean(context.conditions.marquee);
      const cleanups: (() => void)[] = [];
      const select = <T extends HTMLElement = HTMLElement>(selector: string) => gsap.utils.toArray<T>(selector, root);
      const listen = (element: EventTarget, event: string, handler: EventListener) => {
        element.addEventListener(event, handler);
        cleanups.push(() => element.removeEventListener(event, handler));
      };
      // Repeat effects consume no ticker work outside their section or in background tabs.
      const manage = (animation: gsap.core.Animation, region: HTMLElement) => {
        let visible = false;
        const update = () => animation.paused(!visible || document.hidden);
        animation.pause();
        ScrollTrigger.create({ trigger: region, start: "top bottom", end: "bottom top", onToggle: self => { visible = self.isActive; update(); } });
        listen(document, "visibilitychange", update);
      };
      const reveal = (targets: HTMLElement[], trigger: HTMLElement, duration = .8, distance = 40, stagger = .15) => {
        if (!targets.length) return;
        // immediateRender:false leaves offscreen content readable until its reveal starts.
        gsap.from(targets, { opacity: 0, y: distance, duration, stagger, ease: "power2.out", immediateRender: false,
          clearProps: "transform,opacity", scrollTrigger: { trigger, start: "top 85%", once: true } });
      };
      const clone = (parent: HTMLElement, child: Element) => {
        const duplicate = child.cloneNode(true) as HTMLElement;
        duplicate.dataset.motionClone = "true";
        duplicate.setAttribute("aria-hidden", "true");
        duplicate.inert = true;
        duplicate.querySelectorAll("[id]").forEach(node => node.removeAttribute("id"));
        parent.append(duplicate);
        cleanups.push(() => duplicate.remove());
      };
      try {
        root.classList.add("motion-ready");
        cleanups.push(() => root.classList.remove("motion-ready"));
        select(".home-section .ds-heading").filter(el => !el.closest("#integrations")).forEach(el => reveal(Array.from(el.children) as HTMLElement[], el));
        select(".enterprise-video").forEach(el => reveal([el], el, .9, 30));
        const features = select(".enterprise-feature");
        const enterprise = root.querySelector<HTMLElement>("#enterprise");
        if (enterprise && features.length) {
          reveal(features, features[0], .6, 30, .1);
          const cycle = gsap.timeline({ repeat: -1 });
          features.forEach((feature, index) => {
            cycle.to(features, { opacity: .5, scale: 1, duration: .3 }, index * 4)
              .to(feature, { opacity: 1, scale: 1.05, duration: .3 }, index * 4)
              .fromTo(feature.querySelector(".enterprise-feature__bar"), { scaleX: 0, transformOrigin: "left" }, { scaleX: 1, duration: 4, ease: "none", immediateRender: false }, index * 4);
          });
          manage(cycle, enterprise);
          features.forEach((feature, index) => listen(feature, "click", () => cycle.seek(index * 4)));
        }
        select(".workflow-track").forEach(track => {
          const viewport = track.parentElement!;
          const distance = track.scrollWidth - 32 + 20;
          Array.from(track.children).forEach(child => clone(track, child));
          const tween = gsap.to(track, { x: -distance, duration: 18, repeat: -1, ease: "none" });
          viewport.classList.add("marquee-active");
          cleanups.push(() => viewport.classList.remove("marquee-active"));
          manage(tween, viewport);
        });
        select(".stats-metric").forEach((metric, index) => {
          gsap.from(metric, { opacity: 0, y: 24, scale: .85, duration: .6, delay: index * .15, ease: "back.out(1.7)", immediateRender: false,
            clearProps: "transform,opacity", scrollTrigger: { trigger: metric, start: "top 80%", once: true } });
          const number = metric.querySelector<HTMLElement>("[data-counter]");
          if (!number) return;
          const final = number.textContent!;
          const value = { count: 0 };
          gsap.to(value, { count: Number(number.dataset.counter), duration: 1.6, delay: .2 + index * .15, ease: "power2.out",
            scrollTrigger: { trigger: metric, start: "top 80%", once: true }, onUpdate: () => { number.textContent = Math.round(value.count).toString(); }, onComplete: () => { number.textContent = final; } });
          cleanups.push(() => { number.textContent = final; });
          gsap.to(metric.querySelector(".stats-metric-glow"), { opacity: 1, duration: .6, ease: "power1.inOut", repeat: 3, yoyo: true, scrollTrigger: { trigger: metric, start: "top 80%", once: true } });
        });
        const cards = select(".platform-card");
        if (desktop) {
          root.classList.add("motion-stack");
          cleanups.push(() => root.classList.remove("motion-stack"));
          cards.slice(0, -1).forEach((card, index) => gsap.to(card, { scale: .94, opacity: .65, ease: "none",
            scrollTrigger: { trigger: cards[index + 1], start: "top bottom", end: "top 96px", scrub: true, invalidateOnRefresh: true } }));
        } else cards.forEach(card => reveal([card], card, .6, 24));
        select(".reos-robot").forEach(robot => {
          reveal([robot], robot, .9, 50);
          manage(gsap.to(robot, { y: -10, duration: 3, repeat: -1, yoyo: true, ease: "sine.inOut" }), robot.closest<HTMLElement>("#reos-section")!);
        });
        const integration = root.querySelector<HTMLElement>("#integrations");
        const artwork = root.querySelector<HTMLElement>(".integrations-artwork");
        if (integration && artwork) {
          if (desktop) {
            gsap.timeline({ scrollTrigger: { trigger: integration, start: "top top", end: () => `+=${window.innerHeight * .8}`, scrub: .4, pin: true, anticipatePin: 1, invalidateOnRefresh: true } })
              .fromTo(artwork, { opacity: 0, scale: .88, y: 70 }, { opacity: 1, scale: 1, y: 0, duration: .35, ease: "power2.out", immediateRender: false })
              .to(artwork, { opacity: 0, scale: .92, y: -70, duration: .35, ease: "power2.in" }, .65);
          } else reveal([artwork], integration, .8, 35);
          const nodes = select(".integration-node");
          if (orbit) {
            const angle = { value: 0 };
            const setters = nodes.map(node => ({ x: gsap.quickSetter(node, "x", "px"), y: gsap.quickSetter(node, "y", "px") }));
            let width = artwork.clientWidth, height = artwork.clientHeight;
            const resize = new ResizeObserver(() => { width = artwork.clientWidth; height = artwork.clientHeight; });
            resize.observe(artwork); cleanups.push(() => resize.disconnect());
            const movement = gsap.to(angle, { value: 360, duration: 45, repeat: -1, ease: "none", onUpdate: () => {
              nodes.forEach((node, index) => {
                const base = (-135 + index * 360 / nodes.length) * Math.PI / 180;
                const current = base + angle.value * Math.PI / 180;
                const rx = width * (desktop ? .4 : .38), ry = height * (desktop ? .36 : .34);
                setters[index].x(rx * (Math.cos(current) - Math.cos(base)));
                setters[index].y(ry * (Math.sin(current) - Math.sin(base)));
              });
            } });
            manage(movement, integration);
            cleanups.push(() => gsap.set(nodes, { clearProps: "transform" }));
          } else {
            const track = artwork.querySelector<HTMLElement>(".integration-nodes")!;
            const distance = track.scrollWidth + 16;
            nodes.forEach(node => clone(track, node));
            track.classList.add("marquee-active");
            cleanups.push(() => track.classList.remove("marquee-active"));
            // Scroll position preserves a native horizontal row rather than shifting a full-width box.
            const state = { x: 0 };
            const movement = gsap.to(state, { x: distance, duration: 22, repeat: -1, ease: "none", onUpdate: () => { track.scrollLeft = state.x; } });
            manage(movement, integration);
            cleanups.push(() => { track.scrollLeft = 0; });
          }
        }
        if (marquee) select(".testimonials-column").forEach((column, index) => {
          const distance = column.scrollHeight + 20;
          Array.from(column.children).forEach(child => clone(column, child));
          const animation = gsap.fromTo(column, { y: index % 2 ? -distance : 0 }, { y: index % 2 ? 0 : -distance, duration: 34 + index * 4, repeat: -1, ease: "none" });
          manage(animation, column.closest<HTMLElement>("#testimonials")!);
        });
        const testimonials = root.querySelector<HTMLElement>(".testimonials-window");
        if (testimonials && marquee) { testimonials.classList.add("marquee-active"); cleanups.push(() => testimonials.classList.remove("marquee-active")); }
        select(".security-feature,.blog-card").forEach(card => reveal([card], card, .6, 24));
        // Refresh after dimensions change, without observing animated transforms.
        let refreshFrame = 0;
        let alive = true;
        const refresh = () => {
          cancelAnimationFrame(refreshFrame);
          refreshFrame = requestAnimationFrame(() => { if (alive) ScrollTrigger.refresh(); });
        };
        const resize = new ResizeObserver(refresh);
        select(".home-section,.site-footer").forEach(section => resize.observe(section));
        root.addEventListener("load", refresh, true);
        cleanups.push(() => root.removeEventListener("load", refresh, true));
        root.addEventListener("toggle", refresh, true);
        cleanups.push(() => root.removeEventListener("toggle", refresh, true));
        document.fonts.ready.then(() => { if (alive) refresh(); });
        refresh();
        cleanups.push(() => { alive = false; resize.disconnect(); cancelAnimationFrame(refreshFrame); });
      } catch (error) {
        // Revert every partial tween/trigger before returning to the readable server layout.
        context.revert();
        cleanups.reverse().splice(0).forEach(cleanup => cleanup());
        if (process.env.NODE_ENV !== "production") console.warn("Homepage motion unavailable; static content retained.", error);
      }
      return () => { cleanups.reverse().forEach(cleanup => cleanup()); };
    }, root);
    return () => media.revert();
  }, { scope, dependencies: [], revertOnUpdate: true });

  return <div ref={scope} className="homepage-motion motion-contents"><div className="motion-background" aria-hidden="true"><span /><span /><span /></div><SmoothScroll>{children}</SmoothScroll></div>;
}
