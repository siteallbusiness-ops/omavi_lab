import type { Metadata } from "next";
import { ButtonLink, TextLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { CapabilityMap } from "@/components/testing/capability-map";

export const metadata: Metadata = {
  title: "Testing Techniques",
  description:
    "Methods chosen for the analytical question — peptide analysis, LC–MS/MS, high-resolution MS and screening services.",
};

const techniques = [
  {
    id: "peptide-analysis",
    index: "01",
    tag: "Peptides & proteins",
    title: "Identity, purity and quantity",
    lead: "Targeted analysis designed to establish what the submitted sample contains and report the agreed attributes clearly.",
    details: [
      {
        label: "Typical methods",
        body: "RP-HPLC-UV and mass spectrometric identification, selected to suit the analytical scope.",
      },
      {
        label: "Typical outputs",
        body: "Identity, peptide purity and quantity results where included in the requested test.",
      },
      {
        label: "Useful for",
        body: "Batch review, supplier checks, formulation work and research sample characterisation.",
      },
    ],
    bullets: [
      "Peptide identity confirmation",
      "Purity assessment",
      "Quantity analysis",
      "Defined compound panels",
    ],
  },
  {
    id: "targeted-analysis",
    index: "02",
    tag: "Targeted analysis",
    title: "LC–MS/MS",
    lead: "Liquid chromatography coupled with tandem mass spectrometry provides selective measurement for defined target compounds.",
    details: [
      {
        label: "Approach",
        body: "Targeted measurement against an agreed analyte and sample matrix.",
      },
      {
        label: "Typical outputs",
        body: "Compound identification and quantitative results within the confirmed reporting scope.",
      },
      {
        label: "Before testing",
        body: "Reference requirements, expected concentration and sample preparation are reviewed first.",
      },
    ],
    bullets: [
      "Small-molecule quantification",
      "Target compound confirmation",
      "Method development where required",
      "Defined multi-analyte panels",
    ],
  },
  {
    id: "high-resolution",
    index: "03",
    tag: "Structural information",
    title: "High-resolution mass spectrometry",
    lead: "High-resolution MS can support accurate-mass measurement and structural investigation when the question goes beyond a routine target assay.",
    details: [
      {
        label: "Approach",
        body: "Accurate-mass and fragmentation data interpreted against the agreed analytical objective.",
      },
      {
        label: "Typical outputs",
        body: "Mass observations and interpretation relevant to the requested identification work.",
      },
      {
        label: "Project fit",
        body: "Useful for unknowns, impurity investigation and more complex sample characterisation.",
      },
    ],
    bullets: [
      "Accurate-mass measurement",
      "Unknown compound investigation",
      "Impurity profiling",
      "Structural interpretation",
    ],
  },
] as const;

const screening = [
  {
    title: "Heavy metals",
    body: "Screening for arsenic, cadmium, lead and mercury.",
  },
  {
    title: "GC–MS screening",
    body: "Library-assisted screening for compounds within the method’s applicable range.",
  },
  {
    title: "Sterility testing",
    body: "Microbiological assessment scoped to the submitted sample and test request.",
  },
  {
    title: "Endotoxin count",
    body: "Endotoxin analysis available as a distinct testing service.",
  },
] as const;

const quality = [
  {
    index: "01",
    title: "Scope before claims",
    body: "The analyte, matrix, method and reporting output are agreed before a result is interpreted.",
  },
  {
    index: "02",
    title: "Method named",
    body: "The Certificate of Analysis identifies the analytical method used for the issued result.",
  },
  {
    index: "03",
    title: "Sample-specific reporting",
    body: "Results relate to the submitted sample and the analytical scope requested for that sample.",
  },
  {
    index: "04",
    title: "Retrievable record",
    body: "An issued COA can be opened through the public lookup using its unique identifier.",
  },
] as const;

export default function TestingTechniquesPage() {
  return (
    <>
      {/* Hero */}
      <section className="page-hero border-b border-[color:var(--line)] bg-white">
        <Container className="grid items-end gap-hero lg:grid-cols-[minmax(0,1.5fr)_minmax(280px,0.65fr)]">
          <div>
            <p className="mb-[var(--eyebrow-gap)] font-display text-[0.69rem] font-bold tracking-[0.14em] text-muted uppercase">
              Testing Techniques
            </p>
            <h1 className="m-0 max-w-[850px] font-display text-[clamp(3.1rem,6.4vw,5.4rem)] font-semibold leading-[0.97] tracking-[-0.07em] text-navy">
              Methods chosen
              <br />
              for the analytical
              <br />
              question.
            </h1>
          </div>
          <div>
            <p className="mb-7 m-0 text-[1.06rem] leading-[1.7] text-ink-soft">
              From peptide identity and purity to targeted compound analysis and
              supplementary screening, every project begins by confirming what
              needs testing, the sample type and the required report.
            </p>
            <TextLink
              href="/contact"
              className="border-b border-navy pb-2 text-navy hover:border-blue hover:text-blue"
            >
              Discuss your sample <span aria-hidden="true">→</span>
            </TextLink>
          </div>
        </Container>
      </section>

      <CapabilityMap />

      {/* Method features */}
      <section className="bg-paper pt-2 md:pt-4">
        <Container>
          {techniques.map((technique) => (
            <article
              key={technique.id}
              id={technique.id}
              className="scroll-target grid grid-cols-[40px_minmax(0,1fr)] gap-x-5 gap-y-6 border-b border-[color:var(--line)] py-[clamp(3.5rem,8vw,7rem)] md:grid-cols-[72px_minmax(200px,0.7fr)_minmax(0,1.3fr)] md:gap-[clamp(2rem,6vw,5.5rem)]"
            >
              <div className="pt-1 font-display text-[0.68rem] font-bold tracking-[0.08em] text-muted">
                {technique.index}
              </div>

              <div>
                <p className="mb-3 font-display text-[0.68rem] font-bold tracking-[0.14em] text-navy uppercase md:mb-4">
                  {technique.tag}
                </p>
                <h2 className="m-0 font-display text-[clamp(1.85rem,6vw,3.4rem)] font-semibold leading-[1.03] tracking-[-0.04em] text-navy">
                  {technique.title}
                </h2>
              </div>

              <div className="col-span-2 md:col-span-1">
                <p className="mb-10 m-0 max-w-[680px] font-display text-[clamp(1.15rem,1.8vw,1.5rem)] leading-[1.45] text-ink-soft">
                  {technique.lead}
                </p>

                <div className="mb-8 grid border-y border-[color:var(--line)] md:grid-cols-3">
                  {technique.details.map((detail, i) => (
                    <div
                      key={detail.label}
                      className={`py-5 ${
                        i < technique.details.length - 1
                          ? "border-b border-[color:var(--line)] md:border-r md:border-b-0 md:pr-[22px]"
                          : ""
                      } ${i > 0 ? "md:pl-[22px]" : "md:pr-[22px]"}`}
                    >
                      <span className="mb-2.5 block font-display text-[0.65rem] font-bold tracking-[0.08em] text-navy uppercase">
                        {detail.label}
                      </span>
                      <p className="m-0 text-sm leading-6 text-muted">
                        {detail.body}
                      </p>
                    </div>
                  ))}
                </div>

                <ul className="m-0 grid list-none grid-cols-1 gap-x-[26px] p-0 sm:grid-cols-2">
                  {technique.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="relative border-b border-[color:var(--line)] py-[11px] pl-[23px] text-[0.82rem] text-ink-soft"
                    >
                      <span
                        className="absolute top-[15px] left-0 size-[7px] rounded-full border border-navy"
                        aria-hidden="true"
                      />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}

          {/* Screening */}
          <article
            id="screening"
            className="scroll-target grid grid-cols-[40px_minmax(0,1fr)] gap-x-5 gap-y-6 border-b border-[color:var(--line)] py-[clamp(3.5rem,8vw,7rem)] md:grid-cols-[72px_minmax(200px,0.7fr)_minmax(0,1.3fr)] md:gap-[clamp(2rem,6vw,5.5rem)]"
          >
            <div className="pt-1 font-display text-[0.68rem] font-bold tracking-[0.08em] text-muted">
              04
            </div>
            <div>
              <p className="mb-3 font-display text-[0.68rem] font-bold tracking-[0.14em] text-navy uppercase md:mb-4">
                Supplementary scopes
              </p>
              <h2 className="m-0 font-display text-[clamp(1.85rem,6vw,3.4rem)] font-semibold leading-[1.03] tracking-[-0.04em] text-navy">
                Screening & microbiology
              </h2>
            </div>
            <div className="col-span-2 md:col-span-1">
              <p className="mb-10 m-0 max-w-[680px] font-display text-[clamp(1.15rem,1.8vw,1.5rem)] leading-[1.45] text-ink-soft">
                Additional testing services can be scoped separately where the
                sample requires broader screening or microbiological assessment.
              </p>
              <div className="grid border-t border-[color:var(--line)] sm:grid-cols-2">
                {screening.map((item, i) => (
                  <div
                    key={item.title}
                    className={`min-h-[145px] border-b border-[color:var(--line)] py-[23px] ${
                      i % 2 === 0
                        ? "sm:border-r sm:pr-[26px]"
                        : "sm:pl-[26px]"
                    }`}
                  >
                    <span className="mb-2.5 block font-display text-[0.65rem] font-bold tracking-[0.08em] text-navy uppercase">
                      {item.title}
                    </span>
                    <p className="m-0 text-sm leading-6 text-muted">{item.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </article>
        </Container>
      </section>

      {/* Methods & quality */}
      <section className="section bg-navy text-white">
        <Container className="grid gap-layout lg:grid-cols-[minmax(260px,0.8fr)_minmax(0,1.2fr)]">
          <div>
            <p className="mb-[var(--eyebrow-gap)] font-display text-[0.68rem] font-bold tracking-[0.14em] text-blue-mist uppercase">
              Methods & quality
            </p>
            <h2 className="m-0 font-display text-[clamp(3rem,5.6vw,4.8rem)] font-semibold leading-[0.98] tracking-[-0.045em]">
              Specific scope.
              <br />
              Clear record.
            </h2>
          </div>
          <div className="border-t border-white/14">
            {quality.map((item) => (
              <article
                key={item.index}
                className="grid grid-cols-[60px_1fr] gap-[22px] border-b border-white/14 py-[27px]"
              >
                <span className="font-display text-[0.68rem] tracking-[0.08em] text-blue-mist">
                  {item.index}
                </span>
                <div>
                  <h3 className="mb-2 m-0 font-display text-[1.2rem] font-semibold tracking-[-0.02em]">
                    {item.title}
                  </h3>
                  <p className="m-0 text-[0.85rem] leading-[1.62] text-white/62">
                    {item.body}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="section border-b border-[color:var(--line)] bg-white">
        <Container className="grid items-end gap-layout lg:grid-cols-[1fr_0.8fr]">
          <div>
            <p className="mb-[var(--eyebrow-gap)] font-display text-[0.68rem] font-bold tracking-[0.14em] text-muted uppercase">
              Not sure which test fits?
            </p>
            <h2 className="m-0 max-w-xl font-display text-[clamp(2.2rem,4vw,3.4rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-navy">
              Start with the sample and the question.
            </h2>
          </div>
          <div>
            <p className="mb-8 m-0 text-base leading-7 text-muted">
              Share the analyte, matrix, number of samples and the decision the
              result needs to support. We can then confirm an appropriate scope.
            </p>
            <div className="flex flex-wrap items-center gap-5">
              <ButtonLink href="/contact">
                Discuss your project <span aria-hidden="true">↗</span>
              </ButtonLink>
              <TextLink
                href="/pricing"
                className="border-b border-navy pb-1 text-navy hover:border-blue hover:text-blue"
              >
                View testing fees <span aria-hidden="true">→</span>
              </TextLink>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
