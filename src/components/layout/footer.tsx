import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { ReferenceImage } from "@/components/ui/reference-image";
import { home } from "@/content/home";

function SocialIcon({ name }: { name: typeof home.footer.socialPlatforms[number] }) {
  return <svg width={name === "YouTube" ? 28 : 24} height={name === "YouTube" ? 28 : 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" role="img" aria-label={name}>
    {name === "Instagram" ? <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none" /></> : name === "LinkedIn" ? <><rect x="3" y="3" width="18" height="18" rx="1" /><path d="M8 10v8m4 0v-8m0 4a3 3 0 0 1 6 0v4" /><circle cx="8" cy="6.8" r=".8" fill="currentColor" stroke="none" /></> : <><rect x="2" y="5" width="20" height="14" rx="4" /><path d="m10 9 5 3-5 3Z" fill="currentColor" stroke="none" /></>}
  </svg>;
}

export function Footer() {
  return <footer id="footer" className="site-footer"><div className="footer-glow" aria-hidden="true" /><Container>
    <div className="footer-top">
      <div className="footer-brand"><Link href="/" aria-label="Brahmaastra.ai home"><Image src="/assets/brand/main-logo.png" width={1509} height={280} style={{ aspectRatio: "1509 / 280" }} sizes="220px" alt="" /></Link><ReferenceImage src="/svg/homeview/soc.svg" alt="SOC 2 and GDPR compliance" className="footer-badges" /></div>
      <nav aria-label="Footer quick links"><h2>Quick links</h2><ul>{home.footer.quickLinks.map(link => <li key={link.href}><a href={`https://brahmaastra.ai${link.href}`}>{link.label}</a></li>)}</ul></nav>
      <nav aria-label="Legal links"><h2>Legals</h2><ul>{home.footer.legalLinks.map(link => <li key={link.href}><a href={`https://brahmaastra.ai${link.href}`}>{link.label}</a></li>)}</ul></nav>
      <div className="footer-support"><h2>Support</h2><div><h3>Contact Us:</h3><a href={home.footer.support.href}>{home.footer.support.label}</a></div><div className="footer-social"><h3>Follow Us:</h3><div role="group" aria-label="Social platforms">{home.footer.socialPlatforms.map(name => <SocialIcon name={name} key={name} />)}</div></div></div>
    </div>
    <div className="footer-contact"><div><h3>Parent Company</h3><p>{home.footer.company}</p></div><div><h3>Office Address</h3><address>{home.footer.address}</address></div><div><h3>WhatsApp / Mobile</h3><a href={home.footer.phone.href}>{home.footer.phone.label}</a></div><div><h3>Email</h3><ul>{home.footer.emails.map(email => <li key={email.href}><a href={email.href}>{email.label}</a></li>)}</ul></div></div>
    <div className="footer-artwork"><ReferenceImage src="/global/footer-img.svg" alt="Brahmaastra" /></div>
  </Container></footer>;
}
