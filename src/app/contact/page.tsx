import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/contact-form";
import { Container } from "@/components/ui/container";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell us what you need to test — compound, sample type, number of samples, required result and timing.",
};

const briefItems = [
  "Compound or product name",
  "Sample type / matrix and approximate amount",
  "Number of samples or batches",
  "Identity, purity, quantity or other output",
  "Any deadline or handling requirement",
] as const;

const faqs = [
  {
    q: "What information is needed for a quote?",
    a: "Provide the compound or product, sample type, approximate amount, number of samples, the result you need and any timing requirement. If a particular method or reporting format is required, include that too.",
  },
  {
    q: "Can you help define the analytical scope?",
    a: "Yes. Start with the sample and the question the result needs to answer. The laboratory can then confirm whether an established test fits or whether additional method work is needed.",
  },
  {
    q: "Where can I find a previously issued certificate?",
    a: "Use the COA ID printed on the document in the public certificate lookup. If the reference does not return a record, email the laboratory with the ID.",
  },
  {
    q: "Do published fees cover every sample type?",
    a: "Published fees are a starting point for established tests. Matrix, preparation, reference requirements and requested outputs can change the scope, so the fee is confirmed before work begins.",
  },
] as const;

export default function ContactPage() {
  return (
    <>
      <section className="page-hero border-b border-[color:var(--line)] bg-white">
        <Container className="grid items-end gap-hero lg:grid-cols-[minmax(0,1.5fr)_minmax(320px,0.65fr)]">
          <div>
            <p className="mb-[var(--eyebrow-gap)] font-display text-[0.69rem] font-bold tracking-[0.14em] text-muted uppercase">
              Project enquiries
            </p>
            <h1 className="m-0 max-w-[12ch] font-display text-[clamp(3.1rem,6.4vw,5.8rem)] font-semibold leading-[0.97] tracking-[-0.07em] text-navy">
              Tell us what you need to test.
            </h1>
          </div>

          <div>
            <p className="mb-[30px] m-0 text-[1.06rem] leading-[1.7] text-ink-soft">
              The most useful starting point is specific: what needs testing,
              the sample type, number of samples, required result and timing.
            </p>
            <a
              href={`mailto:${site.email}`}
              className="relative grid gap-[3px] border-y border-[color:var(--line)] py-[18px] pr-12 text-navy no-underline transition-colors hover:text-blue"
            >
              <span className="font-display text-[0.64rem] font-semibold tracking-[0.08em] text-muted uppercase">
                Email the laboratory
              </span>
              <strong className="font-display text-[1.02rem] font-semibold tracking-[-0.02em]">
                {site.email}
              </strong>
              <i
                aria-hidden="true"
                className="absolute top-1/2 right-0 not-italic text-blue -translate-y-1/2"
              >
                ↗
              </i>
            </a>
          </div>
        </Container>
      </section>

      <section className="section bg-paper">
        <Container className="grid items-start gap-layout lg:grid-cols-[minmax(0,1.25fr)_minmax(280px,0.55fr)]">
          <ContactForm />

          <aside className="grid gap-10 sm:grid-cols-2 sm:gap-8 lg:grid-cols-1 lg:gap-14">
            <div className="sm:col-span-2 lg:col-span-1">
              <p className="mb-[var(--eyebrow-gap)] font-display text-[0.69rem] font-bold tracking-[0.14em] text-muted uppercase">
                Before you write
              </p>
              <h2 className="mb-7 m-0 font-display text-[clamp(1.8rem,6vw,2.7rem)] font-medium leading-[1.08] tracking-[-0.035em] text-navy">
                A useful brief includes:
              </h2>
              <ol className="m-0 list-none border-t border-[color:var(--line)] p-0">
                {briefItems.map((item, index) => (
                  <li
                    key={item}
                    className="grid grid-cols-[34px_1fr] gap-3 border-b border-[color:var(--line)] py-3.5 text-[0.77rem] text-ink-soft"
                  >
                    <span className="font-display text-[0.62rem] tracking-[0.04em] text-blue">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {item}
                  </li>
                ))}
              </ol>
            </div>

            <div className="bg-navy p-5 text-white sm:p-[26px]">
              <p className="mb-4 font-display text-[0.64rem] font-bold tracking-[0.14em] text-blue-mist uppercase">
                Laboratory
              </p>
              <address className="mb-7 not-italic text-[0.83rem] leading-[1.7] text-white/68">
                <strong className="block font-display font-semibold text-white">
                  {site.name}
                </strong>
                {site.address.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex max-w-full items-center gap-2 break-all border-b border-white/35 pb-0.5 font-display text-sm font-semibold text-blue-mist no-underline transition-colors hover:border-white hover:text-white"
              >
                {site.email} <span aria-hidden="true">↗</span>
              </a>
            </div>
          </aside>
        </Container>
      </section>

      <section className="section bg-white">
        <Container className="grid items-start gap-layout lg:grid-cols-[minmax(280px,0.75fr)_minmax(0,1.25fr)]">
          <div>
            <p className="mb-[var(--eyebrow-gap)] font-display text-[0.69rem] font-bold tracking-[0.14em] text-muted uppercase">
              Common questions
            </p>
            <h2 className="m-0 max-w-[10ch] font-display text-[clamp(2.3rem,4.4vw,4.3rem)] font-semibold leading-[1.04] tracking-[-0.045em] text-navy">
              Useful context before a project starts.
            </h2>
          </div>

          <div className="border-t border-navy">
            {faqs.map((item, index) => (
              <details
                key={item.q}
                open={index === 0}
                className="group border-b border-[color:var(--line)]"
              >
                <summary className="relative cursor-pointer list-none py-[23px] pr-[50px] font-display text-[1.02rem] font-semibold tracking-[-0.02em] text-navy marker:content-none [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <span
                    aria-hidden="true"
                    className="absolute top-[21px] right-1 text-[1.25rem] font-normal text-blue after:content-['+'] group-open:after:content-['−']"
                  />
                </summary>
                <p className="mt-[-4px] mb-6 max-w-[660px] text-[0.84rem] leading-[1.68] text-muted">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
