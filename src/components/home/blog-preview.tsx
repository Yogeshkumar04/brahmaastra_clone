import { ArrowUpRight, Clock } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { ReferenceImage } from "@/components/ui/reference-image";
import { home } from "@/content/home";

export function BlogPreview() {
  return <section id="blog" aria-labelledby="blog-title" className="blog-section home-section"><Container>
    <div className="blog-heading"><SectionHeading id="blog-title" title={home.blog.title} description={<p>{home.blog.description}</p>} /><Button variant="outline" size="compact" href={`https://brahmaastra.ai${home.blog.cta.href}`} endIcon={<ArrowUpRight />}>{home.blog.cta.label}</Button></div>
    <div className="blog-grid">{home.blog.articles.map(article => <article className="blog-card" key={article.href}><a href={`https://brahmaastra.ai${article.href}`}>
      <div><div className="blog-card__image"><ReferenceImage src={article.referenceImage} alt={article.title} fill sizes="(min-width: 1280px) 400px, (min-width: 768px) calc((100vw - 80px) / 3), calc(100vw - 32px)" /><span className="blog-card__image-shade" aria-hidden="true" /><span className="blog-card__category">{article.category}</span></div>
        <div className="blog-card__meta"><time dateTime={article.date}>{new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(article.date))}</time><span aria-hidden="true">•</span><span><Clock size={12} aria-hidden="true" />{article.readTime}</span></div>
        <h3>{article.title}</h3><p className="blog-card__excerpt">{article.excerpt}</p></div>
      <span className="blog-card__read">Read Article<ArrowUpRight size={16} aria-hidden="true" /></span>
    </a></article>)}</div>
  </Container></section>;
}
