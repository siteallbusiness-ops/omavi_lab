import { ButtonLink, TextLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { DnaHelix } from "@/components/home/dna-helix";
import { site } from "@/lib/site";

const ledger = [
  ["01", "Identity", "Measured against scope"],
  ["02", "Purity", "Reported with method"],
  ["03", "Quantity", "Recorded where requested"],
  ["04", "COA", "Linked to a unique ID"],
] as const;

function AnalyticalRecord() {
  return (
    <div
      className="animate-fade-up-delay w-full overflow-hidden rounded-[18px] bg-navy text-white shadow-elevated"
      aria-label="Illustrative analytical reporting structure"
    >
      <div className="flex min-h-[56px] flex-col justify-center gap-1 border-b border-white/18 px-4 py-3 font-display text-[0.62rem] font-semibold tracking-[0.08em] text-white/70 uppercase sm:min-h-[62px] sm:flex-row sm:items-center sm:justify-between sm:gap-5 sm:px-6 sm:py-0">
        <span>Analytical record</span>
        <span className="inline-flex items-center gap-2.5 normal-case tracking-normal sm:uppercase sm:tracking-[0.08em]">
          <i className="status-pulse inline-block size-2 rounded-full bg-blue" />
          Structured reporting
        </span>
      </div>

      <div className="grid min-[720px]:grid-cols-[minmax(0,1.35fr)_minmax(190px,0.65fr)]">
        {/* DNA first on small screens */}
        <div
          className="relative order-1 flex min-h-[260px] items-center justify-center overflow-hidden border-b border-white/18 px-4 pt-11 pb-6 min-[720px]:order-2 min-[720px]:min-h-[310px] min-[720px]:border-b-0 min-[720px]:border-l min-[720px]:border-white/18"
          style={{
            backgroundColor: "rgba(9, 22, 40, 0.35)",
            backgroundImage:
              "linear-gradient(rgba(30,91,217,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(30,91,217,0.07) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
          aria-hidden="true"
        >
          <div className="absolute inset-x-3.5 top-3.5 flex justify-between gap-2.5 font-display text-[0.5rem] tracking-[0.08em] text-white/44 uppercase">
            <span>Molecular model</span>
            <span>Structure / 02</span>
          </div>

          <DnaHelix />

          <span className="absolute right-3.5 bottom-3 font-display text-[0.5rem] tracking-[0.1em] text-white/34 uppercase">
            OR — 02
          </span>
        </div>

        {/* Plot */}
        <div className="relative order-2 self-center border-b border-white/18 px-4 pt-5 pb-4 min-[720px]:order-1 min-[720px]:border-r min-[720px]:border-b-0 min-[720px]:px-6 min-[720px]:pt-6">
          <div className="mb-1 flex justify-between font-display text-[0.58rem] tracking-[0.08em] text-white/45 uppercase">
            <span>Signal</span>
            <span>Retention time</span>
          </div>

          <svg
            viewBox="0 0 680 255"
            role="img"
            aria-label="Illustrative chromatographic trace"
            className="mx-auto block h-auto w-full max-w-full"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <linearGradient id="traceFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1E5BD9" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#1E5BD9" stopOpacity="0" />
              </linearGradient>
            </defs>

            <g fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1">
              <path d="M28 42H652M28 94H652M28 146H652M28 198H652" />
              <path d="M104 25V220M208 25V220M312 25V220M416 25V220M520 25V220" />
            </g>

            <path
              fill="url(#traceFill)"
              d="M28 211C80 210 92 207 127 205C151 203 167 198 184 191C201 184 216 169 231 140C248 105 259 48 273 31C286 18 300 51 312 91C325 137 338 180 354 195C372 210 397 206 414 202C436 197 444 173 458 169C475 164 486 196 507 202C531 210 566 203 589 205C612 207 630 210 652 211V220H28Z"
            />

            <path
              className="trace-line"
              fill="none"
              stroke="#dbe7ff"
              strokeWidth="3"
              strokeLinejoin="round"
              d="M28 211C80 210 92 207 127 205C151 203 167 198 184 191C201 184 216 169 231 140C248 105 259 48 273 31C286 18 300 51 312 91C325 137 338 180 354 195C372 210 397 206 414 202C436 197 444 173 458 169C475 164 486 196 507 202C531 210 566 203 589 205C612 207 630 210 652 211"
            />

            <path
              d="M273 20V220"
              stroke="rgba(183,205,247,0.4)"
              strokeWidth="1"
              strokeDasharray="5 7"
            />
            <circle
              cx="273"
              cy="31"
              r="5"
              fill="#1E5BD9"
              stroke="#091628"
              strokeWidth="3"
            />
          </svg>

          <span className="absolute right-4 bottom-3.5 font-display text-[0.61rem] text-white/40 sm:right-6">
            Illustrative trace
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 border-t border-white/18 min-[720px]:grid-cols-4">
        {ledger.map(([index, title, note], i) => (
          <div
            key={index}
            className={[
              "animate-fade-up flex min-h-[110px] flex-col px-3.5 py-4 sm:min-h-[128px] sm:px-[17px] sm:py-5",
              i % 2 === 0 ? "border-r border-white/18" : "",
              i < 2 ? "border-b border-white/18 min-[720px]:border-b-0" : "",
              i < 3 ? "min-[720px]:border-r min-[720px]:border-white/18" : "",
            ].join(" ")}
            style={{ animationDelay: `${0.35 + i * 0.08}s` }}
          >
            <span className="mb-auto font-display text-[0.64rem] tracking-[0.08em] text-blue-mist">
              {index}
            </span>
            <strong className="font-display text-[0.88rem] font-semibold tracking-[-0.02em] text-white">
              {title}
            </strong>
            <small className="mt-1 text-[0.65rem] leading-[1.35] text-white/48">
              {note}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
}

export function HomeHero() {
  return (
    <section className="page-hero overflow-hidden border-b border-[color:var(--line)] bg-white">
      <Container className="grid items-center gap-layout lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="max-w-xl">
          <p className="animate-fade-up mb-[var(--eyebrow-gap)] font-display text-[0.69rem] font-bold tracking-[0.16em] text-muted uppercase">
            Peptide & specialty compound analysis
          </p>
          <h1 className="animate-fade-up-delay m-0 font-display text-[clamp(2.85rem,6.4vw,5rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-navy">
            Analytical
            <br />
            testing
            <br />
            you can
            <br />
            verify.
          </h1>
          <p className="animate-fade-up-delay-2 mt-7 max-w-[34rem] text-[1.05rem] leading-8 text-ink-soft">
            {site.name} supports supplement, nutraceutical and research samples
            with identity, purity and quantity testing. Results are delivered
            through clear, batch-level reporting you can review, share and
            retrieve.
          </p>
          <div className="animate-fade-up-delay-3 mt-8 flex flex-wrap items-center gap-5">
            <ButtonLink href="/testing-techniques">
              Explore testing <span aria-hidden="true">↗</span>
            </ButtonLink>
            <TextLink href="/coa-lookup">
              COA Lookup <span aria-hidden="true">→</span>
            </TextLink>
          </div>
        </div>

        <AnalyticalRecord />
      </Container>
    </section>
  );
}
