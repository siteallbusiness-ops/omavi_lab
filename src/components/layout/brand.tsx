import Link from "next/link";
import { Logo, LogoMark } from "@/components/layout/logo";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

type BrandSize = "sm" | "md" | "lg";

export function BrandMark({ className }: { className?: string }) {
  return <LogoMark className={className} />;
}

export function Brand({
  className,
  size = "md",
  priority = false,
}: {
  className?: string;
  /** Kept for existing call sites; lockup is designed for dark chrome. */
  inverted?: boolean;
  size?: BrandSize;
  priority?: boolean;
}) {
  return (
    <Link
      href="/"
      className={cn("inline-flex min-w-0 items-center no-underline", className)}
      aria-label={`${site.name} home`}
    >
      <Logo size={size} priority={priority} />
    </Link>
  );
}
