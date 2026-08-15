import { cn } from "@/lib/utils";

export function Eyebrow({
  children,
  light = false,
  className,
}: {
  children: React.ReactNode;
  light?: boolean;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "mb-[var(--eyebrow-gap)] font-display text-[0.69rem] font-bold tracking-[0.14em] uppercase",
        light ? "text-blue-mist" : "text-muted",
        className,
      )}
    >
      {children}
    </p>
  );
}
