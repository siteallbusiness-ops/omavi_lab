import Link from "next/link";
import { Logo, LogoMark } from "@/components/layout/logo";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

type BrandSize = "sm" | "md" | "lg";

export function BrandMark({ className }: { className?: string }) {
  return <LogoMark className={cn("size-9 rounded-md", className)} />;
}

export function Brand({
  className,
  inverted = true,
  size = "md",
}: {
  className?: string;
  /** White wordmark on dark chrome; navy wordmark on light surfaces. */
  inverted?: boolean;
  size?: BrandSize;
}) {
  return (
    <Link
      href="/"
      className={cn("inline-flex min-w-0 items-center no-underline", className)}
      aria-label={`${site.name} home`}
    >
      <Logo inverted={inverted} size={size} />
    </Link>
  );
}
