import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { FeatureIcon } from "@/components/ui/feature-icon";
import { home } from "@/content/home";

export function WorkflowTopics() {
  return <section id="workflow" aria-labelledby="workflow-title" className="workflow-section home-section">
    <Container><SectionHeading id="workflow-title" variant="workflow" eyebrow={home.workflow.eyebrow} title={home.workflow.title} /></Container>
    <div className="workflow-scroll" data-lenis-prevent tabIndex={0} role="region" aria-label="Workflow topics; scroll horizontally to read all six"><div className="workflow-track">{home.workflow.topics.map(topic => <article key={topic.id} className="workflow-card" data-accent={topic.accent}>
      <div className="workflow-card__top"><span className="workflow-card__icon"><FeatureIcon name={topic.icon} /></span><span className="workflow-card__number">{topic.number}</span></div>
      <div><h3>{topic.title}</h3><p>{topic.description}</p></div>
    </article>)}</div></div>
  </section>;
}
