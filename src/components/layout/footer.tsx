import Link from "next/link";
import { Brand } from "@/components/layout/brand";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { footerNavLinks, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-navy text-white">
      <Container>
        {/* CTA band */}
        <div className="flex flex-col items-start gap-8 border-b border-white/14 py-[var(--section-y)] md:grid md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:gap-[60px]">
          <div>
            <p className="mb-[var(--eyebrow-gap)] font-display text-[0.68rem] font-bold tracking-[0.14em] text-blue-mist uppercase">
              Start with the analytical question
            </p>
            <h2 className="m-0 max-w-[820px] font-display text-[clamp(2.2rem,8vw,4.8rem)] font-semibold leading-[1] tracking-[-0.045em]">
              Tell us what you need
              <br className="hidden sm:block" />
              to know about the sample.
            </h2>
          </div>
          <ButtonLink
            href={`mailto:${site.email}`}
            variant="light"
            external
            className="w-full shrink-0 justify-center sm:w-auto md:justify-self-end"
          >
            Email the laboratory <span aria-hidden="true">↗</span>
          </ButtonLink>
        </div>

        {/* Columns */}
        <div className="grid gap-10 py-[var(--section-y-compact)] sm:grid-cols-2 sm:gap-12 md:grid-cols-[1.7fr_0.65fr_0.8fr] md:gap-[clamp(3rem,9vw,8rem)]">
          <div className="sm:col-span-2 md:col-span-1">
            <Brand size="lg" />
            <p className="mt-[26px] m-0 max-w-[390px] text-[0.8rem] leading-[1.65] text-white/50">
              Analytical testing for peptides and specialty compounds, with
              clear results and batch-level reporting.
            </p>
          </div>

          <div>
            <h3 className="mb-[18px] font-display text-[0.66rem] font-bold tracking-[0.1em] text-blue-mist uppercase">
              Navigate
            </h3>
            <ul className="m-0 grid list-none gap-[9px] p-0">
              {footerNavLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[0.78rem] text-white/70 no-underline transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-[18px] font-display text-[0.66rem] font-bold tracking-[0.1em] text-blue-mist uppercase">
              Laboratory contact
            </h3>
            <a
              href={`mailto:${site.email}`}
              className="block break-all text-[0.78rem] text-white/70 no-underline transition-colors hover:text-white"
            >
              {site.email}
            </a>
            <address className="mt-[17px] not-italic text-[0.75rem] leading-[1.68] text-white/46">
              {site.address.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex min-h-[68px] flex-col justify-center gap-2 border-t border-white/14 py-5 text-[0.63rem] text-white/40 sm:gap-3 md:flex-row md:items-center md:justify-between md:gap-[30px]">
          <p className="m-0">
            © {site.year} {site.name}.
          </p>
          <p className="m-0 max-w-xl md:text-right">
            Results apply to the submitted sample and the agreed analytical
            scope.
          </p>
        </div>
      </Container>
    </footer>
  );
}
