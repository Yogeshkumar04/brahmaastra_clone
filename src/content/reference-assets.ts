/** Local reference assets. Source records: public/assets/reference/sources.json; brand attribution: README.md. */
export function referenceAsset(path: string) {
  if (path === "/images/newhome/rios.png") return "/assets/brand/reos.png";
  if (path === "/global/main-logo.png") return "/assets/brand/main-logo.png";
  return `/assets/reference${path}`;
}
export const referenceDimensions: Readonly<Record<string, readonly [number, number]>> = {
  "/images/newhome/banner1.webp": [2880, 1450],
  "/images/newhome/banner2.webp": [2880, 1460],
  "/images/newhome/card1.webp": [1066, 1066],
  "/images/newhome/card2.webp": [1066, 1066],
  "/images/newhome/card3.webp": [1066, 1066],
  "/images/newhome/rios.png": [658, 379],
  "/global/main-logo.png": [1509, 280],
  "/global/footer-img.svg": [1047, 294],
  "/svg/homeview/soc.svg": [160, 69],
  "/svg/homeview/pri1.svg": [173, 129],
  "/svg/homeview/pri2.svg": [173, 153],
  "/svg/homeview/pri3.svg": [213, 140],
};
