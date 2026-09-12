import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "danger" | "ghost";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  loading?: boolean;
  iconOnly?: boolean;
  children: ReactNode;
};

export function Button({ variant = "primary", loading = false, iconOnly = false, className = "", children, disabled, ...props }: ButtonProps) {
  const classes = ["ui-button", `ui-button--${variant}`, iconOnly ? "ui-button--icon" : "", className].filter(Boolean).join(" ");
  return <button className={classes} disabled={disabled || loading} aria-busy={loading || undefined} {...props}>{loading ? <span className="button-spinner" aria-hidden="true" /> : children}</button>;
}
