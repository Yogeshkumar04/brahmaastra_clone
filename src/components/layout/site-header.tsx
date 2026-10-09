import Image from "next/image";
import Link from "next/link";
import { HeaderNavigation } from "@/components/layout/header-navigation";
import { home, mobileNavigation } from "@/content/home";

export function SiteHeader() {
  const logo = (className: string) => <Link href="/" className={`brand-logo ${className}`} aria-label="Brahmaastra.ai home"><Image src="/assets/brand/main-logo.png" width={1509} height={280} style={{ aspectRatio: "1509 / 280" }} alt="" sizes="(min-width: 1024px) 250px, (min-width: 768px) 180px, (max-width: 359px) 180px, 200px" loading="eager" /></Link>;
  const links = home.navigation.map(item => <a key={item.href} href={`https://brahmaastra.ai${item.href}`}>{item.label}</a>);
  return <HeaderNavigation
    primaryLogo={logo("brand-logo--large")}
    mobileLogo={logo("brand-logo--mobile")}
    compactLogo={<Link href="/" className="brand-logo brand-logo--compact" aria-label="Brahmaastra.ai home"><Image src="/assets/brand/small-logo.svg" width={60} height={50} alt="" /></Link>}
    links={links}
    mobileLinks={mobileNavigation.map(item => item.href === "/" ? <Link key={item.href} href="/">{item.label}</Link> : <a key={item.href} href={`https://brahmaastra.ai${item.href}`}>{item.label}</a>)}
    announcement={home.announcement}
  />;
}
