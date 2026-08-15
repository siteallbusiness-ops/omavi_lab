import { ButtonLink, TextLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

export function PageHero({
  eyebrow,
  title,
  description,
  actions,
  meta,
  className,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description: string;
  actions?: React.ReactNode;
  meta?: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "page-hero border-b border-[color:var(--line)] bg-white",
        className,
      )}
    >
      <Container className="grid items-end gap-hero md:grid-cols-[minmax(0,1.5fr)_minmax(280px,0.65fr)]">
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="m-0 max-w-[850px] font-display text-[clamp(3.1rem,6.4vw,5.4rem)] font-semibold leading-[0.97] tracking-[-0.07em] text-navy">
            {title}
          </h1>
          <p className="mt-7 max-w-xl text-[1.06rem] leading-[1.7] text-ink-soft">
            {description}
          </p>
          {actions ? (
            <div className="mt-8 flex flex-wrap items-center gap-5">{actions}</div>
          ) : null}
        </Reveal>
        {meta ? (
          <Reveal delay={100} variant="fade" className="md:justify-self-stretch">
            {meta}
          </Reveal>
        ) : null}
      </Container>
    </section>
  );
}

export function PageHeroActions({
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
}: {
  primaryHref: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}) {
  return (
    <>
      <ButtonLink href={primaryHref}>
        {primaryLabel} <span aria-hidden="true">↗</span>
      </ButtonLink>
      {secondaryHref && secondaryLabel ? (
        <TextLink href={secondaryHref}>
          {secondaryLabel} <span aria-hidden="true">→</span>
        </TextLink>
      ) : null}
    </>
  );
}
