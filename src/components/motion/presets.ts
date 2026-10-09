/** Measured/source-defined timings from docs/animation-inventory.md. */
export const motionPresets = {
  smoothScroll: {
    duration: 1.2,
    easing: (progress: number) => Math.min(1, 1.001 - Math.pow(2, -10 * progress)),
    wheelMultiplier: 1,
    touchMultiplier: 2,
  },
} as const;
