import Link from "next/link";
import type { ComponentPropsWithRef, ReactNode } from "react";

type ButtonAppearance = {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "default" | "compact" | "callback";
  startIcon?: ReactNode;
  endIcon?: ReactNode;
};

type LinkButtonProps = ButtonAppearance & ComponentPropsWithRef<"a"> & { href: string; disabled?: never };
type NativeButtonProps = ButtonAppearance & ComponentPropsWithRef<"button"> & { href?: never };
export type ButtonProps = LinkButtonProps | NativeButtonProps;

/** Server-compatible. Event handlers belong in the consuming Client Component. */
export function Button({
  variant = "primary",
  size = "default",
  className = "",
  startIcon,
  endIcon,
  children,
  ...props
}: ButtonProps) {
  const appearance = { "data-variant": variant, "data-size": size, className: `ds-button ${className}` };
  const content = (
    <>
      {startIcon && <span aria-hidden="true" className="ds-button__icon">{startIcon}</span>}
      {children}
      {endIcon && <span aria-hidden="true" className="ds-button__icon">{endIcon}</span>}
    </>
  );

  if (typeof props.href === "string") {
    const { href, rel, ...anchorProps } = props;
    const safeRel = anchorProps.target === "_blank"
      ? [...new Set([...(rel?.split(/\s+/) ?? []), "noopener", "noreferrer"])].join(" ")
      : rel;

    if (href.startsWith("/")) {
      return <Link {...anchorProps} {...appearance} href={href} rel={safeRel}>{content}</Link>;
    }
    return <a {...anchorProps} {...appearance} href={href} rel={safeRel}>{content}</a>;
  }

  return <button {...props} {...appearance} type={props.type ?? "button"}>{content}</button>;
}
