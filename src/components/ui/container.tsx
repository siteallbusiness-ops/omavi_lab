import { cn } from "@/lib/utils";

export function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[var(--container)] px-[clamp(20px,4vw,54px)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
