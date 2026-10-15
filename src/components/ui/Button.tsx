import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

type Variant = "primary" | "dark" | "ghost" | "ghost-deep" | "link";
type Size = "sm" | "md" | "lg";

type BaseProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  /** Show the trailing arrow icon. */
  withIcon?: boolean;
  block?: boolean;
  className?: string;
};

type LinkProps = BaseProps & { to: string; href?: never; type?: never; onClick?: never; disabled?: never };
type AnchorProps = BaseProps & { href: string; to?: never; type?: never; onClick?: never; disabled?: never };
type ButtonProps = BaseProps & {
  to?: never;
  href?: never;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
};

type Props = LinkProps | AnchorProps | ButtonProps;

const classesFor = ({ variant = "primary", size = "md", block, className }: BaseProps) =>
  ["btn", `btn--${variant}`, size !== "md" ? `btn--${size}` : "", block ? "btn--block" : "", className ?? ""]
    .filter(Boolean)
    .join(" ");

/**
 * One button component for internal navigation, external links and real
 * buttons — so focus, hover, disabled and icon behaviour stay consistent and
 * no interactive element ends up as a dead <div>.
 */
export function Button(props: Props) {
  const { children, withIcon, ...rest } = props;
  const className = classesFor(props);

  if ("to" in rest && rest.to) {
    return (
      <Link to={rest.to} className={className}>
        {children}
        {withIcon && <ArrowRight className="btn__icon" aria-hidden="true" />}
      </Link>
    );
  }

  if ("href" in rest && rest.href) {
    return (
      <a href={rest.href} className={className} target="_blank" rel="noopener noreferrer">
        {children}
        <ArrowUpRight className="btn__icon" aria-hidden="true" />
        <span className="visually-hidden">(opens in a new tab)</span>
      </a>
    );
  }

  const { type = "button", onClick, disabled } = rest as ButtonProps;
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={className}>
      {children}
      {withIcon && <ArrowRight className="btn__icon" aria-hidden="true" />}
    </button>
  );
}

/** Inline text link with an arrow, used for "read more" style navigation. */
export function ArrowLink({
  to,
  children,
  className,
}: {
  to: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link to={to} className={`arrow-link ${className ?? ""}`}>
      {children}
      <ArrowRight className="btn__icon" aria-hidden="true" />
    </Link>
  );
}
