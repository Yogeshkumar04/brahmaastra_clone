import type { SiteContent } from "@/types/content";

export const site = {
  name: "Brahmaastra",
  description: "An AI workspace built for real estate teams, from first lead to final closing.",
} as const satisfies SiteContent;

export const siteUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
);
