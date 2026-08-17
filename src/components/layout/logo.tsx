import Image from "next/image";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

type LogoSize = "sm" | "md" | "lg";

const sizes: Record<
  LogoSize,
  { width: number; height: number; className: string }
> = {
  sm: { width: 150, height: 32, className: "h-8 w-auto" },
  md: { width: 190, height: 40, className: "h-9 w-auto sm:h-10" },
  lg: { width: 240, height: 50, className: "h-11 w-auto md:h-12" },
};

/** Cyan DNA “B” mark from the official lockup. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <Image
      src="/brand-mark.png"
      alt=""
      width={48}
      height={48}
      className={cn("size-9 shrink-0 object-contain", className)}
      aria-hidden="true"
    />
  );
}

/** Official Biotech Laboratory lockup for dark surfaces. */
export function Logo({
  className,
  size = "md",
  priority = false,
}: {
  className?: string;
  inverted?: boolean;
  size?: LogoSize;
  priority?: boolean;
}) {
  const dims = sizes[size];

  return (
    <Image
      src="/biotech-logo.png"
      alt={site.name}
      width={dims.width}
      height={dims.height}
      priority={priority}
      className={cn(dims.className, "object-contain object-left", className)}
    />
  );
}
