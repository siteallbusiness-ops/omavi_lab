import { Eyebrow } from "@/components/ui/eyebrow";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  light = false,
  className,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  light?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mb-[clamp(50px,7vw,88px)] grid items-end gap-split md:grid-cols-[minmax(0,1.7fr)_minmax(280px,0.7fr)]",
        className,
      )}
    >
      <div>
        <Eyebrow light={light}>{eyebrow}</Eyebrow>
        <h2
          className={cn(
            "m-0 max-w-[820px] font-display text-[clamp(2.15rem,4.7vw,4.6rem)] font-semibold leading-[1.02] tracking-[-0.04em]",
            light ? "text-white" : "text-navy",
          )}
        >
          {title}
        </h2>
      </div>
      {description ? (
        <p
          className={cn(
            "m-0 max-w-md text-base leading-[1.72]",
            light ? "text-white/68" : "text-muted",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
