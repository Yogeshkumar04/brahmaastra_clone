import type { ReactNode } from "react";

export type SectionHeadingProps = {
  id?: string;
  title: ReactNode;
  eyebrow?: string;
  description?: ReactNode;
  as?: "h1" | "h2" | "h3";
  variant?: "hero" | "section" | "compact" | "stack" | "card" | "enterprise" | "workflow" | "reos" | "testimonial" | "integrations" | "security";
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  id,
  title,
  eyebrow,
  description,
  as: Heading = "h2",
  variant = "section",
  align = "left",
  className = "",
}: SectionHeadingProps) {
  return (
    <div data-variant={variant} data-align={align} className={`ds-heading ${className}`}>
      {eyebrow && <p className="ds-heading__eyebrow">{eyebrow}</p>}
      <Heading id={id} className="ds-heading__title">{title}</Heading>
      {description && <div className="ds-heading__description">{description}</div>}
    </div>
  );
}
