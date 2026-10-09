import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { SiteHeader } from "@/components/layout/site-header";
import { site, siteUrl } from "@/content/site";
import { manrope, anton, dmSans } from "@/styles/fonts";
import "@/styles/globals.css";

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: { default: `${site.name}.ai — AI workspace for real estate`, template: `%s | ${site.name}.ai` },
  description: site.description,
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: `${site.name}.ai`,
    title: `${site.name}.ai — AI workspace for real estate`,
    description: site.description,
  },
  twitter: { card: "summary", title: `${site.name}.ai`, description: site.description },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#080D19",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={`${manrope.variable} ${anton.variable} ${dmSans.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <a href="#main-content" className="sr-only fixed top-4 left-4 z-[100] rounded-lg bg-foreground px-4 py-3 text-background focus:not-sr-only">
          Skip to content
        </a>
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
