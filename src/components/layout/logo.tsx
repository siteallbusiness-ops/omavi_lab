import { cn } from "@/lib/utils";

/** Molecular mark — navy field, blue accents; designed to stay crisp at favicon sizes. */
export function LogoMark({
  className,
  title,
}: {
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={cn("shrink-0", className)}
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {title ? <title>{title}</title> : null}
      <rect width="64" height="64" rx="16" fill="#091628" />
      <path
        d="M32 18.5V28.2M32 35.8V45.5M22.2 39.2 29.4 34.6M34.6 29.4 41.8 24.8M22.2 24.8 29.4 29.4M34.6 34.6 41.8 39.2"
        stroke="rgba(255,255,255,0.88)"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <circle cx="32" cy="16.5" r="4.1" fill="#1E5BD9" />
      <circle cx="32" cy="47.5" r="4.1" fill="#ffffff" />
      <circle cx="20" cy="22.5" r="3.7" fill="#ffffff" />
      <circle cx="44" cy="22.5" r="3.7" fill="#ffffff" />
      <circle cx="20" cy="41.5" r="3.7" fill="#ffffff" />
      <circle cx="44" cy="41.5" r="3.7" fill="#ffffff" />
      <circle cx="32" cy="32" r="5.1" fill="#1E5BD9" />
      <circle cx="32" cy="32" r="2.1" fill="#ffffff" />
    </svg>
  );
}

type LogoProps = {
  className?: string;
  /** White wordmark for navy header/footer */
  inverted?: boolean;
  size?: "sm" | "md" | "lg";
};

const sizeStyles = {
  sm: {
    gap: "gap-2.5",
    mark: "size-8",
    title: "text-[1.05rem] leading-none tracking-[-0.04em]",
    sub: "mt-1 text-[0.52rem] tracking-[0.22em]",
  },
  md: {
    gap: "gap-3",
    mark: "size-9 sm:size-10",
    title: "text-[1.15rem] sm:text-[1.28rem] leading-none tracking-[-0.045em]",
    sub: "mt-1.5 text-[0.55rem] sm:text-[0.58rem] tracking-[0.24em]",
  },
  lg: {
    gap: "gap-3.5",
    mark: "size-11 md:size-12",
    title: "text-[1.35rem] md:text-[1.55rem] leading-none tracking-[-0.05em]",
    sub: "mt-1.5 text-[0.6rem] md:text-[0.64rem] tracking-[0.26em]",
  },
} as const;

/**
 * Full Biotech Laboratory lockup — mark + Space Grotesk wordmark.
 * Matches site typography so header/footer branding feels native.
 */
export function Logo({ className, inverted = true, size = "md" }: LogoProps) {
  const s = sizeStyles[size];

  return (
    <span className={cn("inline-flex min-w-0 items-center", s.gap, className)}>
      <LogoMark className={s.mark} />
      <span className="min-w-0">
        <span
          className={cn(
            "block font-display font-bold uppercase",
            s.title,
            inverted ? "text-white" : "text-navy",
          )}
        >
          Biotech
        </span>
        <span
          className={cn(
            "block font-display font-bold uppercase",
            s.sub,
            inverted ? "text-blue-mist" : "text-muted",
          )}
        >
          Laboratory
        </span>
      </span>
    </span>
  );
}
