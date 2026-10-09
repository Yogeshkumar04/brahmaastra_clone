import { ReosConversation } from "@/components/home/reos-conversation";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { home } from "@/content/home";

export function ReosDemo() {
  return <section tabIndex={-1} id="reos-section" aria-labelledby="reos-title" className="reos-section home-section">
    <Container className="reos-heading-container"><SectionHeading id="reos-title" variant="reos" align="center" title={home.reos.title} description={<p>{home.reos.description}</p>} /></Container>
    <div className="reos-stage" aria-hidden="true"><span className="reos-shadow" /><span className="reos-aura" /><span className="reos-ring" /><Image src="/assets/brand/reos.png" width={658} height={379} style={{ aspectRatio: "658 / 379" }} sizes="165px" alt="" className="reos-robot" /></div>
    <Container size="chat" gutter="fixed" className="reos-chat-area">
      <ReosConversation messages={home.reos.messages} />
      <a className="reos-prompt" href={`https://brahmaastra.ai${home.reos.cta.href}`}><span>{home.reos.cta.label}</span><Image src="/assets/brand/reos.png" width={24} height={24} alt="" /></a>
    </Container>
  </section>;
}
