"use client";

import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useHydrated } from "@/components/motion/use-motion-permission";
import type { FaqItem } from "@/types/content";

/** Native disclosure fallback, with controlled single-open state after hydration. */
export function FAQAccordion({ items }: { items: readonly FaqItem[] }) {
  const hydrated = useHydrated();
  const [active, setActive] = useState<number | null>(0);
  const controls = useRef<(HTMLElement | null)[]>([]);
  return <div className="faq-rows">{items.map((item, index) => <details className="faq-row" name="homepage-faq" open={active === index} key={item.question}>
    <summary ref={element => { controls.current[index] = element; }} id={`faq-question-${index}`} role="button" aria-expanded={hydrated ? active === index : undefined} aria-controls={`faq-answer-${index}`}
      onClick={event => { event.preventDefault(); setActive(current => current === index ? null : index); }} onKeyDown={event => {
        const target = event.key === "ArrowDown" ? (index + 1) % items.length : event.key === "ArrowUp" ? (index - 1 + items.length) % items.length : event.key === "Home" ? 0 : event.key === "End" ? items.length - 1 : null;
        if (target !== null) { event.preventDefault(); controls.current[target]?.focus(); }
      }}><span>{item.question}</span><ChevronDown size={20} aria-hidden="true" /></summary>
    <div id={`faq-answer-${index}`} role="region" aria-labelledby={`faq-question-${index}`}><p>{item.answer}</p></div>
  </details>)}</div>;
}
