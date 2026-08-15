import type { Metadata } from "next";
import { PricingHeroMolecule } from "@/components/pricing/molecule-icons";
import { PricingCatalog } from "@/components/pricing/pricing-catalog";
import { ButtonLink, TextLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { Reveal, RevealItem } from "@/components/ui/reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Clear pricing for established tests. Published fees make the starting point visible before scope confirmation.",
};

export default function PricingPage() {
  return (
    <>
      <section className="page-hero border-b border-[color:var(--line)] bg-white">
        <Container className="grid items-center gap-hero lg:grid-cols-[minmax(0,1.15fr)_minmax(300px,0.85fr)]">
          <Reveal>
            <p className="mb-[var(--eyebrow-gap)] font-display text-[0.69rem] font-bold tracking-[0.14em] text-navy uppercase">
              Transparent testing fees
            </p>
            <h1 className="m-0 max-w-[14ch] font-display text-[clamp(2.8rem,5.6vw,4.6rem)] font-semibold leading-[1.02] tracking-[-0.05em] text-navy">
              Clear pricing for established tests.
            </h1>
          </Reveal>

          <Reveal delay={100} variant="fade" className="flex h-full flex-col justify-end">
            <PricingHeroMolecule />
            <p className="m-0 text-[1.02rem] leading-[1.7] text-ink-soft">
              Published fees make the starting point visible. Before testing, we
              confirm the compound or product, sample type, preparation
              requirements and reporting output.
            </p>
            <TextLink
              href="/contact"
              className="mt-7 w-full justify-between border-b border-[color:var(--line)] pb-3 no-underline"
            >
              Request a scoped quote <span aria-hidden="true">→</span>
            </TextLink>
          </Reveal>
        </Container>
      </section>

      <section className="border-b border-[color:var(--line)] bg-blue-soft/55">
        <Container className="grid sm:grid-cols-2 lg:grid-cols-[0.55fr_0.9fr_1fr_1.55fr]">
          <RevealItem
            index={0}
            className="flex min-h-[92px] flex-col justify-between border-b border-[color:var(--line)] py-5 sm:min-h-[110px] sm:border-r sm:py-6 sm:pr-[26px] lg:min-h-[128px] lg:border-r lg:pr-[26px] lg:pl-0"
          >
            <span className="font-display text-[0.62rem] font-semibold tracking-[0.08em] text-muted uppercase">
              Currency
            </span>
            <strong className="font-display text-[1.05rem] font-semibold tracking-[-0.02em] text-navy">
              USD
            </strong>
          </RevealItem>
          <RevealItem
            index={1}
            className="flex min-h-[92px] flex-col justify-between border-b border-[color:var(--line)] py-5 sm:min-h-[110px] sm:py-6 sm:pl-[26px] lg:min-h-[128px] lg:border-r lg:px-[26px]"
          >
            <span className="font-display text-[0.62rem] font-semibold tracking-[0.08em] text-muted uppercase">
              Service model
            </span>
            <strong className="font-display text-[1.05rem] font-semibold tracking-[-0.02em] text-navy">
              Analytical testing only
            </strong>
          </RevealItem>
          <RevealItem
            index={2}
            className="flex min-h-[92px] flex-col justify-between border-b border-[color:var(--line)] py-5 sm:col-span-2 sm:min-h-[110px] sm:border-r-0 sm:py-6 lg:col-span-1 lg:min-h-[128px] lg:border-r lg:px-[26px]"
          >
            <span className="font-display text-[0.62rem] font-semibold tracking-[0.08em] text-muted uppercase">
              Before work begins
            </span>
            <strong className="font-display text-[1.05rem] font-semibold tracking-[-0.02em] text-navy">
              Method & scope confirmed
            </strong>
          </RevealItem>
          <RevealItem
            index={3}
            as="p"
            className="m-0 flex items-center border-b border-[color:var(--line)] py-5 text-[0.78rem] leading-[1.62] text-ink-soft sm:col-span-2 sm:border-b-0 sm:py-6 lg:col-span-1 lg:min-h-[128px] lg:border-b-0 lg:pl-[26px] lg:pr-0"
          >
            {site.name} provides analytical services. The names listed below are
            testing targets and are not products offered for sale.
          </RevealItem>
        </Container>
      </section>

      <section className="section bg-paper">
        <Container>
          <PricingCatalog />
        </Container>
      </section>

      <section className="section bg-navy text-white">
        <Container className="grid items-end gap-layout lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="mb-[var(--eyebrow-gap)] font-display text-[0.69rem] font-bold tracking-[0.14em] text-white/55 uppercase">
              A fee is only useful with a clear scope
            </p>
            <h2 className="m-0 max-w-[16ch] font-display text-[clamp(2.2rem,4.5vw,3.6rem)] font-semibold leading-[1.05] tracking-[-0.04em]">
              Confirm the test before sending the sample.
            </h2>
          </div>
          <div className="max-w-md lg:justify-self-end">
            <p className="m-0 text-[0.95rem] leading-[1.7] text-white/68">
              Send the analyte, matrix, sample count and required output. We
              will use that information to confirm the appropriate testing
              scope.
            </p>
            <ButtonLink href="/contact" variant="light" className="mt-8">
              Request a quote <span aria-hidden="true">↗</span>
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
