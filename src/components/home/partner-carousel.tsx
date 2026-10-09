"use client";

import { useEffect, useLayoutEffect, useReducer, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useHydrated, useMotionDisabled, usePageVisible } from "@/components/motion/use-motion-permission";

gsap.registerPlugin(useGSAP, ScrollTrigger);
type State = { active: number; previous: number | null; revision: number; settled: boolean };
export function PartnerCarousel({ names, panels }: { names: readonly string[]; panels: readonly ReactNode[] }) {
  const scope = useRef<HTMLFieldSetElement>(null);
  const clock = useRef<gsap.core.Timeline | null>(null);
  const clockEpoch = useRef(0);
  const transitionEpoch = useRef(0);
  const hydrated = useHydrated();
  const disabled = useMotionDisabled();
  const enabled = hydrated && !disabled;
  const pageVisible = usePageVisible();
  const [state, select] = useReducer((state: State, index: number | "next" | { settle: number }): State => {
    if (typeof index === "object") return index.settle === state.revision ? { ...state, settled: true } : state;
    const next = index === "next" ? (state.active + 1) % names.length : index;
    return next === state.active ? state : { active: next, previous: state.active, revision: state.revision + 1, settled: false };
  }, { active: 0, previous: null, revision: 0, settled: true });
  useLayoutEffect(() => () => { clockEpoch.current++; }, [enabled, names.length]);
  useGSAP(() => {
    if (!enabled || !scope.current || names.length < 2) return;
    let visible = false, hovered = false, focused = false;
    const epoch = clockEpoch.current;
    const timeline = gsap.timeline({ repeat: -1, paused: true }).to({}, { duration: 2.8 }).call(() => { if (clockEpoch.current === epoch) select("next"); });
    clock.current = timeline;
    const update = () => timeline.paused(!visible || hovered || focused || document.hidden);
    const trigger = ScrollTrigger.create({ trigger: scope.current.closest("#partners"), start: "top bottom", end: "bottom top", onToggle: self => { visible = self.isActive; update(); }, onRefresh: self => { visible = self.isActive; update(); } });
    visible = trigger.isActive; update();
    const root = scope.current;
    const enter = () => { hovered = true; update(); };
    const leave = () => { hovered = false; update(); };
    const focus = () => { focused = true; update(); };
    const blur = (event: FocusEvent) => { focused = root.contains(event.relatedTarget as Node); update(); };
    root.addEventListener("pointerenter", enter); root.addEventListener("pointerleave", leave); root.addEventListener("focusin", focus); root.addEventListener("focusout", blur); document.addEventListener("visibilitychange", update);
    return () => { clock.current = null; root.removeEventListener("pointerenter", enter); root.removeEventListener("pointerleave", leave); root.removeEventListener("focusin", focus); root.removeEventListener("focusout", blur); document.removeEventListener("visibilitychange", update); };
  }, { scope, dependencies: [enabled, names.length], revertOnUpdate: true });
  useLayoutEffect(() => () => { transitionEpoch.current++; }, [enabled, state.active, state.previous, state.revision]);
  // Auto-advance has its own clock; selecting a dot never resets its interval.
  useGSAP(() => {
    if (!enabled || state.previous === null || !scope.current) return;
    const incoming = scope.current.querySelector(`[data-partner="${state.active}"]`)!;
    const outgoing = scope.current.querySelector(`[data-partner="${state.previous}"]`)!;
    const epoch = transitionEpoch.current;
    gsap.timeline().to(outgoing, { opacity: 0, scale: .95, duration: .5, ease: "power2.in", onComplete: () => { if (transitionEpoch.current === epoch) select({ settle: state.revision }); } })
      .fromTo(incoming, { opacity: 0, scale: .95 }, { opacity: 1, scale: 1, duration: .5, ease: "power2.out" }, .5);
  }, { scope, dependencies: [enabled, state.active, state.previous, state.revision], revertOnUpdate: true });
  useEffect(() => { if (!pageVisible) clock.current?.pause(); }, [pageVisible]);
  return <fieldset ref={scope} className="partner-selector"><legend className="sr-only">Choose a partner developer</legend>
    {names.map((name, index) => <input type="radio" className="partner-radio" name="partner-developer" id={`partner-${index}`} key={name} value={name} aria-label={`Show ${name}`} aria-controls={`partner-panel-${index}`} checked={state.active === index} onChange={() => select(index)} />)}
    <div className="partner-panels">{panels.map((panel, index) => <div className="partner-panel" id={`partner-panel-${index}`} data-partner={index} key={names[index]} aria-hidden={state.active !== index} inert={state.active !== index} style={hydrated ? { display: state.active === index || enabled && !state.settled && state.previous === index ? "flex" : "none" } : undefined}>{panel}</div>)}</div>
    <div className="partner-dots">{names.map((name, index) => <label htmlFor={`partner-${index}`} key={name} className="partner-dot"><span className="sr-only">{name}</span><span aria-hidden="true" /></label>)}</div>
  </fieldset>;
}
