import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "light" | "ghost";

const variants: Record<ButtonVariant, string> = {
  primary:
    "border-navy bg-navy text-white hover:border-surface-soft hover:bg-surface-soft",
  light:
    "border-white bg-white text-navy hover:border-blue-soft hover:bg-blue-soft",
  ghost:
    "border-[color:var(--line)] bg-transparent text-navy hover:border-navy hover:bg-navy hover:text-white",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
  external,
}: {
  href: string;
  children: React.ReactNode;
  variant?: ButtonVariant;
  className?: string;
  external?: boolean;
}) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-md border px-5 py-3 font-display text-sm font-semibold tracking-[-0.01em] transition-colors duration-200",
    variants[variant],
    className,
  );

  if (external) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}

export function TextLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-2 font-display text-sm font-semibold text-navy transition-colors hover:text-blue",
        className,
      )}
    >
      {children}
    </Link>
  );
}
