"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowRight, Menu, X } from "lucide-react";

gsap.registerPlugin(useGSAP);
const dismissalKey = "trishul-banner-dismissed";
let dismissedInMemory = false;
const subscribe = (listener: () => void) => {
  window.addEventListener("storage", listener);
  window.addEventListener("announcement-change", listener);
  return () => {
    window.removeEventListener("storage", listener);
    window.removeEventListener("announcement-change", listener);
  };
};
const getDismissed = () => {
  try { return dismissedInMemory || localStorage.getItem(dismissalKey) === "true"; }
  catch { return dismissedInMemory; }
};

type HeaderNavigationProps = {
  primaryLogo: ReactNode;
  compactLogo: ReactNode;
  mobileLogo: ReactNode;
  links: ReactNode;
  mobileLinks: ReactNode;
  announcement: { badge: string; text: string; cta: { label: string; href: string } };
};

export function HeaderNavigation({ primaryLogo, compactLogo, mobileLogo, links, mobileLinks, announcement }: HeaderNavigationProps) {
  const root = useRef<HTMLElement>(null);
  const large = useRef<HTMLElement>(null);
  const compact = useRef<HTMLElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const [menuState, setMenuState] = useState({ open: false, pathname });
  const open = menuState.open && menuState.pathname === pathname;
  const setOpen = useCallback((value: boolean) => setMenuState({ open: value, pathname }), [pathname]);
  const dismissed = useSyncExternalStore(subscribe, getDismissed, () => false);

  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add("(min-width: 768px)", () => {
      let scrolled: boolean | undefined;
      let tween: gsap.core.Timeline | undefined;
      const update = () => {
        const next = window.scrollY > 50;
        if (next === scrolled) return;
        const initial = scrolled === undefined;
        scrolled = next;
        // Inactive navigation is removed from keyboard navigation as well as sight.
        if (large.current) large.current.inert = next;
        if (compact.current) compact.current.inert = !next;
        tween?.kill();
        tween = gsap.timeline({ defaults: { duration: initial || window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : .4, ease: "power3.out" } });
        tween.to(large.current, { autoAlpha: next ? 0 : 1, y: next ? -20 : 0, pointerEvents: next ? "none" : "auto" }, 0)
          .to(compact.current, { autoAlpha: next ? 1 : 0, y: next ? 0 : -20, pointerEvents: next ? "auto" : "none" }, 0);
      };
      update();
      window.addEventListener("scroll", update, { passive: true });
      return () => { window.removeEventListener("scroll", update); tween?.kill(); if (compact.current) compact.current.inert = false; if (large.current) large.current.inert = false; };
    });
    return () => media.revert();
  }, { scope: root });

  useEffect(() => {
    const header = root.current;
    const banner = header?.querySelector<HTMLElement>(".announcement");
    if (!header || !banner) return;
    const update = () => header.style.setProperty("--announcement-height", `${banner.getBoundingClientRect().height}px`);
    update();
    let observer: ResizeObserver | undefined;
    try {
      observer = new ResizeObserver(update);
      observer.observe(banner);
    } catch {
      // Preserve navigation when observer initialization is unavailable.
      observer?.disconnect();
      observer = undefined;
      window.addEventListener("resize", update);
    }
    return () => { observer?.disconnect(); window.removeEventListener("resize", update); };
  }, [dismissed]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const menu = dialog.current;
    const returnFocus = trigger.current;
    if (menu && !menu.open) menu.showModal();
    const resize = () => { if (window.innerWidth >= 768) setOpen(false); };
    window.addEventListener("resize", resize);
    return () => {
      menu?.close();
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("resize", resize);
      if (returnFocus?.isConnected && window.innerWidth < 768) returnFocus.focus({ preventScroll: true });
    };
  }, [open, setOpen]);

  const dismiss = () => {
    dismissedInMemory = true;
    try { localStorage.setItem(dismissalKey, "true"); } catch { /* Still dismiss when storage is unavailable. */ }
    window.dispatchEvent(new Event("announcement-change"));
  };

  return (
    <header ref={root} className="site-header" data-announcement={!dismissed}>
      {!dismissed && <aside className="announcement" aria-label="Product announcement">
        <span className="announcement__sweep" aria-hidden="true" />
        <div className="announcement__content">
          <span className="announcement__badge"><span aria-hidden="true">✨</span> {announcement.badge}</span>
          <span className="announcement__message">{announcement.text.replace(/ Trishul$/, "")} <strong>Trishul</strong></span>
          <a href={`https://brahmaastra.ai${announcement.cta.href}`} className="announcement__link">{announcement.cta.label}<ArrowRight aria-hidden="true" /></a>
        </div>
        <button type="button" className="announcement__dismiss" aria-label="Dismiss announcement" onClick={dismiss}><X aria-hidden="true" /></button>
      </aside>}
      <nav ref={large} className="nav-large" aria-label="Main navigation">
        {primaryLogo}<div className="nav-links">{links}</div>
      </nav>
      <nav ref={compact} className="nav-compact" aria-label="Compact navigation">
        <span className="nav-compact__desktop-logo">{compactLogo}</span>
        <span className="nav-compact__mobile-logo">{mobileLogo}</span>
        <div className="nav-links">{links}</div>
        <button ref={trigger} className="nav-menu-toggle" type="button" aria-label="Open navigation menu" aria-expanded={open} aria-controls="mobile-navigation" aria-haspopup="dialog" onClick={() => setOpen(true)}><Menu aria-hidden="true" /></button>
      </nav>
      <dialog ref={dialog} id="mobile-navigation" className="mobile-menu" data-lenis-prevent aria-modal="true" aria-label="Navigation menu" onKeyDown={event => {
        if (event.key !== "Tab") return;
        const focusable = event.currentTarget.querySelectorAll<HTMLElement>("button, a[href]");
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }} onCancel={() => setOpen(false)} onClose={() => { if (!dialog.current?.open) setOpen(false); }} onClick={event => { if (event.target === event.currentTarget && event.clientX >= event.currentTarget.getBoundingClientRect().right) setOpen(false); }}>
        <button type="button" className="mobile-menu__close" aria-label="Close navigation menu" autoFocus onClick={() => setOpen(false)}><X aria-hidden="true" /></button>
        <nav aria-label="Mobile navigation" onClick={event => { if ((event.target as HTMLElement).closest("a")) setOpen(false); }}>{mobileLinks}</nav>
      </dialog>
    </header>
  );
}
