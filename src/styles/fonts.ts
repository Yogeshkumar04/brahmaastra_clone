import localFont from "next/font/local";

export const manrope = localFont({
  src: "../../public/assets/fonts/manrope-latin.woff2",
  variable: "--font-manrope",
  weight: "200 800",
  display: "swap",
});

export const anton = localFont({
  src: "../../public/assets/fonts/anton-latin.woff2",
  variable: "--font-anton",
  weight: "400",
  display: "swap",
  preload: false,
});

export const dmSans = localFont({
  src: "../../public/assets/fonts/dm-sans-latin.woff2",
  variable: "--font-dm-sans",
  weight: "100 1000",
  display: "swap",
  preload: false,
});
