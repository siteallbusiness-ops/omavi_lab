import { ButtonLink, TextLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { Reveal, RevealItem } from "@/components/ui/reveal";
import { CertificateViewer } from "@/components/home/certificate-viewer";
import { MicroscopeVisual } from "@/components/home/microscope-visual";

const pillars = [
  {
    title: "Identity",
    body: "Confirm that the submitted sample aligns with the agreed target.",
  },
  {
    title: "Purity",
    body: "Quantify the principal component using a scoped analytical method.",
  },
  {
    title: "Quantity",
    body: "Report measured amount where quantity analysis forms part of the scope.",
  },
  {
    title: "Traceability",
    body: "Retrieve an issued Certificate of Analysis using its unique reference.",
  },
] as const;

const services = [
  {
    index: "01",
    tag: "Core analysis",
    title: "Peptide identity, purity & quantity",
    body: "Targeted testing for established peptide analytes, with identity and purity reporting and quantity analysis where included in scope.",
  },
  {
    index: "02",
    tag: "Mass spectrometry",
    title: "Specialty compound testing",
    body: "Analysis for established specialty compounds across a defined catalogue, with the method and reporting output confirmed before work begins.",
  },
  {
    index: "03",
    tag: "Screening & safety",
    title: "Supplementary screening services",
    body: "Heavy metal screening, GC–MS library screening, sterility testing and endotoxin count services are available as separate analytical scopes.",
  },
] as const;

const workflow = [
  {
    index: "01",
    title: "Scope",
    body: "Share the analyte, sample matrix, quantity and question the testing needs to answer.",
  },
  {
    index: "02",
    title: "Confirm",
    body: "Agree the method, sample requirements, reporting output and testing fee.",
  },
  {
    index: "03",
    title: "Analyse",
    body: "The submitted sample is analysed against the agreed analytical scope.",
  },
  {
    index: "04",
    title: "Report",
    body: "Receive a batch-specific result with a Certificate of Analysis reference.",
  },
] as const;

const coaFeatures = [
  "Unique certificate reference",
  "Original PNG or PDF presented unchanged",
  "Clear found and not-found states",
  "Uncluttered, fit-to-view presentation",
] as const;

export function HomeSections() {
  return (
    <>
      <section
        className="border-y border-[color:var(--line)] bg-paper"
        aria-label="Core testing commitments"
      >
        <Container className="grid md:grid-cols-5">
          <Reveal
            as="div"
            variant="fade"
            className="border-b border-[color:var(--line)] py-12 md:border-r md:border-b-0 md:py-14 md:pr-7"
          >
            <p className="m-0 max-w-[9rem] font-display text-[0.68rem] font-bold leading-4 tracking-[0.14em] text-navy uppercase">
              What the work is built around
            </p>
          </Reveal>
          {pillars.map((item, index) => (
            <RevealItem
              key={item.title}
              as="article"
              index={index + 1}
              className={`border-b border-[color:var(--line)] py-12 md:border-b-0 md:px-6 md:py-14 ${
                index < pillars.length - 1 ? "md:border-r" : ""
              }`}
            >
              <h3 className="m-0 font-display text-[1.05rem] font-semibold tracking-[-0.02em] text-navy">
                {item.title}
              </h3>
              <p className="mt-3 m-0 text-sm leading-6 text-muted">{item.body}</p>
            </RevealItem>
          ))}
        </Container>
      </section>

      <section className="section bg-white">
        <Container>
          <Reveal className="mb-[clamp(50px,7vw,72px)] grid items-end gap-split border-b border-[color:var(--line)] pb-12 md:mb-0 md:grid-cols-[1.2fr_0.8fr] md:border-0 md:pb-0">
            <div>
              <p className="mb-[var(--eyebrow-gap)] font-display text-[0.68rem] font-bold tracking-[0.14em] text-muted uppercase">
                Focused analytical services
              </p>
              <h2 className="m-0 max-w-xl font-display text-[clamp(1.9rem,3.5vw,2.75rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-navy">
                Built around the decision the result needs to support.
              </h2>
            </div>
            <p className="m-0 max-w-md text-base leading-7 text-muted md:justify-self-end">
              Testing starts with the compound or product, sample type and
              required output—not a one-size-fits-all package. We define the
              scope first, then align the method and report.
            </p>
          </Reveal>

          <div className="mt-0 border-t border-[color:var(--line)] md:mt-12">
            {services.map((service, index) => (
              <RevealItem
                key={service.index}
                as="article"
                index={index}
                className="grid gap-4 border-b border-[color:var(--line)] py-8 sm:gap-5 sm:py-10 md:grid-cols-[48px_minmax(0,1.05fr)_minmax(0,1.15fr)_auto] md:items-start md:gap-8 md:py-12 lg:grid-cols-[64px_minmax(0,1.05fr)_minmax(0,1.15fr)_auto] lg:gap-10"
              >
                <div className="font-display text-sm tracking-[0.08em] text-muted">
                  {service.index}
                </div>
                <div>
                  <span className="mb-2 block font-display text-[0.65rem] font-bold tracking-[0.14em] text-muted uppercase">
                    {service.tag}
                  </span>
                  <h3 className="m-0 font-display text-[1.55rem] font-semibold leading-tight tracking-[-0.03em] text-navy md:text-[1.7rem]">
                    {service.title}
                  </h3>
                </div>
                <p className="m-0 text-[0.98rem] leading-7 text-muted">
                  {service.body}
                </p>
                <TextLink
                  href="/pricing"
                  className="text-navy hover:text-blue md:justify-self-end md:pt-1"
                >
                  View fees <span aria-hidden="true">↗</span>
                </TextLink>
              </RevealItem>
            ))}
          </div>
        </Container>
      </section>

      <section className="section relative overflow-hidden bg-navy text-white">
        <div className="pointer-events-none absolute inset-0 opacity-30" aria-hidden="true">
          <div className="absolute top-[-20%] left-[35%] size-[700px] rounded-full border border-blue/25" />
          <div className="absolute top-[10%] left-[48%] size-[820px] rounded-full border border-white/8" />
        </div>

        <Container className="relative z-10">
          <div className="process-intro mb-[clamp(42px,8vw,96px)] grid items-center gap-layout lg:grid-cols-[minmax(0,1fr)_minmax(390px,0.72fr)]">
            <Reveal variant="left" className="max-w-xl">
              <p className="mb-[var(--eyebrow-gap)] font-display text-[0.68rem] font-bold tracking-[0.14em] text-blue-mist uppercase">
                A clear path from sample to report
              </p>
              <h2 className="m-0 font-display text-[clamp(2.15rem,7vw,4.6rem)] font-semibold leading-[1.02] tracking-[-0.04em]">
                Defined before the instrument run begins.
              </h2>
              <p className="mt-7 max-w-[620px] text-base leading-[1.72] text-white/66">
                Clear scope is a trust signal. It establishes what is being
                measured, how it will be reported and what the result can—and
                cannot—say.
              </p>
            </Reveal>
            <Reveal
              variant="right"
              delay={120}
              className="min-w-0 w-full self-stretch lg:justify-self-end lg:w-[min(100%,720px)]"
            >
              <MicroscopeVisual />
            </Reveal>
          </div>

          <ol className="m-0 grid list-none grid-cols-1 border-t border-white/14 p-0 sm:grid-cols-2 lg:grid-cols-4">
            {workflow.map((step, index) => (
              <RevealItem
                key={step.index}
                as="li"
                index={index}
                className={`flex min-h-[200px] flex-col border-b border-white/14 px-0 py-6 sm:min-h-[240px] sm:border-b-0 sm:px-6 sm:py-7 lg:min-h-[280px] lg:px-7 ${
                  index < workflow.length - 1
                    ? "lg:border-r lg:border-white/14"
                    : ""
                } ${index % 2 === 0 ? "sm:border-r sm:border-white/14" : "sm:border-r-0"} ${
                  index < 2
                    ? "sm:border-b sm:border-white/14 lg:border-b-0"
                    : ""
                } ${index === 0 ? "sm:pl-0" : ""} ${index === workflow.length - 1 ? "lg:pr-0" : ""} ${
                  index === 2 ? "sm:pl-0 lg:pl-7" : ""
                }`}
              >
                <span className="mb-auto font-display text-[0.7rem] tracking-[0.12em] text-blue-mist">
                  {step.index}
                </span>
                <h3 className="mt-4 mb-3 font-display text-[1.45rem] font-semibold tracking-[-0.03em]">
                  {step.title}
                </h3>
                <p className="m-0 text-[0.85rem] leading-[1.62] text-white/62">
                  {step.body}
                </p>
              </RevealItem>
            ))}
          </ol>
        </Container>
      </section>

      <section className="section bg-white">
        <Container className="grid items-center gap-layout lg:grid-cols-[minmax(280px,0.75fr)_minmax(0,1.25fr)]">
          <Reveal variant="left">
            <p className="mb-[var(--eyebrow-gap)] font-display text-[0.68rem] font-bold tracking-[0.14em] text-muted uppercase">
              Public certificate lookup
            </p>
            <h2 className="mb-7 m-0 max-w-lg font-display text-[clamp(2.5rem,4.9vw,4.8rem)] font-semibold leading-[1.03] tracking-[-0.035em] text-navy">
              The issued certificate stays the record.
            </h2>
            <p className="mb-8 m-0 max-w-lg text-base leading-[1.72] text-muted">
              Each lookup match presents the original certificate file
              associated with that COA ID. The viewer adds archive context
              around the document without altering or obscuring its contents.
            </p>

            <ul className="mb-9 m-0 list-none border-t border-[color:var(--line)] p-0">
              {coaFeatures.map((item) => (
                <li
                  key={item}
                  className="relative border-b border-[color:var(--line)] py-[13px] pl-[27px] text-[0.84rem] text-ink-soft"
                >
                  <span
                    className="absolute top-[13px] left-0 font-bold text-navy"
                    aria-hidden="true"
                  >
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <ButtonLink href="/coa-lookup">
              COA Lookup <span aria-hidden="true">↗</span>
            </ButtonLink>
          </Reveal>

          <Reveal variant="right" delay={140}>
            <CertificateViewer />
          </Reveal>
        </Container>
      </section>

      <section className="section border-t border-[color:var(--line)] bg-paper">
        <Container className="grid items-start gap-8 sm:gap-10 md:grid-cols-[minmax(0,0.7fr)_minmax(0,1.6fr)] md:gap-split lg:grid-cols-[0.7fr_1.6fr_0.9fr]">
          <Reveal variant="fade">
            <p className="m-0 max-w-[8.5rem] font-display text-[0.68rem] font-bold leading-4 tracking-[0.14em] text-navy uppercase">
              Professional confidence is specific
            </p>
          </Reveal>
          <Reveal delay={80}>
            <blockquote className="m-0 font-display text-[clamp(1.55rem,5.5vw,2.55rem)] font-semibold leading-[1.15] tracking-[-0.035em] text-navy">
              “The method, scope and certificate reference should be as clear as
              the result itself.”
            </blockquote>
          </Reveal>
          <Reveal
            delay={140}
            className="md:col-span-2 lg:col-span-1 lg:justify-self-end"
          >
            <TextLink
              href="/contact"
              className="border-b border-navy pb-2 text-navy hover:border-blue hover:text-blue"
            >
              Discuss a testing scope <span aria-hidden="true">→</span>
            </TextLink>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
