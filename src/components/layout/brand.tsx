import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

type BrandSize = "sm" | "md" | "lg";

const sizes: Record<
  BrandSize,
  { width: number; height: number; className: string }
> = {
  sm: { width: 150, height: 40, className: "h-9 w-auto" },
  md: { width: 180, height: 48, className: "h-11 w-auto" },
  lg: { width: 210, height: 56, className: "h-12 w-auto md:h-14" },
};

export function BrandMark({ className }: { className?: string }) {
  return (
    <Image
      src="/favicon.png"
      alt=""
      width={48}
      height={48}
      className={cn("size-9 shrink-0 rounded-md", className)}
      aria-hidden="true"
    />
  );
}

export function Brand({
  className,
  size = "md",
}: {
  className?: string;
  /** Kept for call-site compatibility; logo already suits dark chrome. */
  inverted?: boolean;
  size?: BrandSize;
}) {
  const dims = sizes[size];

  return (
    <Link
      href="/"
      className={cn("inline-flex items-center no-underline", className)}
      aria-label={`${site.name} home`}
    >
      <Image
        src="/omavi-logo.webp"
        alt={site.name}
        width={dims.width}
        height={dims.height}
        className={cn(dims.className, "object-contain object-left")}
        priority
      />
    </Link>
  );
}
