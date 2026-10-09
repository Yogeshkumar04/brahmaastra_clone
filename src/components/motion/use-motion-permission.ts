"use client";

import { useSyncExternalStore } from "react";

const subscribeHydration = () => () => {};
export const useHydrated = () => useSyncExternalStore(subscribeHydration, () => true, () => false);
const subscribeMotion = (listener: () => void) => {
  const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
  preference.addEventListener("change", listener);
  return () => { preference.removeEventListener("change", listener); };
};
const motionDisabled = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
export const useMotionDisabled = () => useSyncExternalStore(subscribeMotion, motionDisabled, () => true);
const subscribeVisibility = (listener: () => void) => { document.addEventListener("visibilitychange", listener); return () => document.removeEventListener("visibilitychange", listener); };
export const usePageVisible = () => useSyncExternalStore(subscribeVisibility, () => !document.hidden, () => true);
