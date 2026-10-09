import { Star } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { home } from "@/content/home";

export function Testimonials() {
  const columns = Array.from({ length: 4 }, (_, index) => home.testimonials.items.slice(index * 3, index * 3 + 3));
  return <section id="testimonials" aria-labelledby="testimonials-title" className="testimonials-section home-section">
    <Container><SectionHeading id="testimonials-title" variant="testimonial" align="center" title={home.testimonials.title} description={<p>{home.testimonials.description}</p>} /></Container>
    <Container className="testimonials-window" data-lenis-prevent role="region" tabIndex={0} aria-label="Customer testimonials; scroll to read all twelve"><div className="testimonials-columns">{columns.map((column, index) => <div className="testimonials-column" key={index}>{column.map(testimonial => <figure className="testimonial-card" key={testimonial.name}>
      <div className="testimonial-stars" role="img" aria-label="5 out of 5 stars">{[0,1,2,3,4].map(star => <Star key={star} size={12} fill="currentColor" aria-hidden="true" />)}</div>
      <blockquote>“{testimonial.quote}”</blockquote><figcaption><span>{testimonial.name}</span><span>{testimonial.role}</span></figcaption>
    </figure>)}</div>)}</div></Container>
  </section>;
}
