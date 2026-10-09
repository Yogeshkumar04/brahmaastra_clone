import type { ComponentPropsWithoutRef } from "react";

export type ContainerProps = ComponentPropsWithoutRef<"div"> & {
  size?: "page" | "hero" | "products" | "heading" | "chat" | "faq" | "copy";
  /** Page gutters match 16px / 0px at 2xl. Fixed gutters remain 16px. */
  gutter?: "page" | "fixed" | "none";
};

export function Container({
  size = "page",
  gutter = "page",
  className = "",
  ...props
}: ContainerProps) {
  return <div {...props} data-size={size} data-gutter={gutter} className={`ds-container ${className}`} />;
}
