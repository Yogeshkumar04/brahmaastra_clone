# Motion boundaries

`HomeMotion` progressively enhances the server-rendered homepage using scoped `useGSAP`, responsive `gsap.matchMedia`, and ScrollTrigger. It owns reveals, counters, section loops, integration pinning/orbits and decorative REOS movement. Its pause control restores static reading mode. Generated marquee copies are inert and aria-hidden; cleanup restores original DOM and values. `ReosConversation` and `PartnerCarousel` separately own deterministic React state and scoped timelines; `HomeMotion` no longer modifies their content.

`SmoothScroll` mounts once inside it. Lenis runs on fine-pointer screens ≥768px with no reduced-motion preference, driven by GSAP's ticker. Touch, nested scrolling and dialogs retain native input. Ticker, listener and instance cleanup are explicit.

`HeroMotion` owns decorative particles and pauses offscreen/background/global pause. Existing CSS and SVG hero animation is preserved. `FloatingCTAVisibility` owns the CTA's scoped fade/scale and pointer/keyboard exclusion over REOS.

See [verification report](../../../docs/verification/motion-milestone.md), [GSAP React guidance](https://github.com/greensock/react), and [Lenis integration guidance](https://github.com/darkroomengineering/lenis).
