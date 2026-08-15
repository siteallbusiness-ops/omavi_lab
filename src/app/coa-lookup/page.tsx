import type { Metadata } from "next";
import { CoaLookupForm } from "@/components/coa/coa-lookup-form";
import { Container } from "@/components/ui/container";
import { TextLink } from "@/components/ui/button-link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "COA Lookup",
  description:
    "Enter the unique COA ID shown on the certificate to open the original file held in the public certificate archive.",
};

const meanings = [
  {
    index: "01",
    title: "Unique reference",
    body: "The lookup uses the COA ID assigned to the issued certificate file.",
  },
  {
    index: "02",
    title: "Original document",
    body: "The viewer displays the original PNG or PDF without changing the certificate artwork.",
  },
  {
    index: "03",
    title: "Scope matters",
    body: "A record match confirms that the certificate exists in this archive. Read the document itself for the sample, method and results.",
  },
] as const;

export default function CoaLookupPage() {
  return (
    <>
      <section className="page-hero border-b border-[color:var(--line)] bg-white">
        <Container className="grid items-center gap-hero lg:grid-cols-[minmax(0,1.1fr)_minmax(360px,0.9fr)]">
          <div>
            <p className="mb-[var(--eyebrow-gap)] font-display text-[0.69rem] font-bold tracking-[0.14em] text-muted uppercase">
              Certificate archive
            </p>
            <h1 className="mb-7 m-0 max-w-[760px] font-display text-[clamp(3rem,6.2vw,5.2rem)] font-semibold leading-[0.98] tracking-[-0.07em] text-navy">
              Certificate of Analysis (COA) Lookup.
            </h1>
            <p className="m-0 max-w-[630px] text-[1.04rem] leading-[1.72] text-ink-soft">
              Enter the unique COA ID shown on the certificate or supplied with
              the analytical report. A match opens the original file held in{" "}
              {site.name}’s public certificate archive.
            </p>
          </div>

          <CoaLookupForm />
        </Container>
      </section>

      <section className="section bg-paper">
        <Container className="grid items-start gap-10 sm:gap-layout lg:grid-cols-[minmax(240px,0.65fr)_minmax(0,1.1fr)_minmax(220px,0.55fr)]">
          <div>
            <p className="mb-[var(--eyebrow-gap)] font-display text-[0.68rem] font-bold tracking-[0.14em] text-muted uppercase">
              What a match means
            </p>
            <h2 className="m-0 font-display text-[clamp(2.1rem,6vw,3.4rem)] font-semibold leading-[1.04] tracking-[-0.04em] text-navy">
              A direct path back to the issued record.
            </h2>
          </div>

          <div className="border-t border-[color:var(--line)] lg:order-none">
            {meanings.map((item) => (
              <article
                key={item.index}
                className="grid grid-cols-[45px_1fr] gap-x-[18px] gap-y-1 border-b border-[color:var(--line)] py-[22px]"
              >
                <span className="row-span-2 font-display text-[0.64rem] tracking-[0.08em] text-muted">
                  {item.index}
                </span>
                <h3 className="m-0 font-display text-base font-semibold tracking-[-0.02em] text-navy">
                  {item.title}
                </h3>
                <p className="m-0 text-[0.78rem] leading-[1.58] text-muted">
                  {item.body}
                </p>
              </article>
            ))}
          </div>

          <aside className="border border-[color:var(--line)] bg-blue-soft p-6 md:p-7 lg:order-none">
            <strong className="mb-3.5 block font-display text-[0.7rem] font-bold tracking-[0.08em] text-navy uppercase">
              Important
            </strong>
            <p className="mb-5 m-0 text-[0.78rem] leading-[1.6] text-ink-soft">
              Certificate lookup is not a product-authentication service.
              Results apply to the submitted sample and the analytical scope
              stated on the certificate.
            </p>
            <TextLink
              href="/contact"
              className="border-b border-navy pb-1 text-navy hover:border-blue hover:text-blue"
            >
              Need help with a record? <span aria-hidden="true">→</span>
            </TextLink>
          </aside>
        </Container>
      </section>
    </>
  );
}
