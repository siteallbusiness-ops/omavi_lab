import type { PricingCategory } from "@/lib/site";
import { cn } from "@/lib/utils";

const icons: Record<
  PricingCategory["icon"],
  { viewBox: string; paths: React.ReactNode }
> = {
  peptide: {
    viewBox: "0 0 48 48",
    paths: (
      <>
        <path d="M4 28 12 17l10 6 9-12 13 8" />
        <path d="m22 23 3 13 11 3" />
        <g fill="currentColor" stroke="none">
          <circle cx="4" cy="28" r="2" />
          <circle cx="12" cy="17" r="2" />
          <circle cx="22" cy="23" r="2" />
          <circle cx="31" cy="11" r="2" />
          <circle cx="44" cy="19" r="2" />
          <circle cx="25" cy="36" r="2" />
          <circle cx="36" cy="39" r="2" />
        </g>
      </>
    ),
  },
  research: {
    viewBox: "0 0 48 48",
    paths: (
      <>
        <path d="M5 34 14 22l10 6 10-11 10 6" />
        <path d="M24 28 22 11l9-5" />
        <g fill="currentColor" stroke="none">
          <circle cx="5" cy="34" r="2" />
          <circle cx="14" cy="22" r="2" />
          <circle cx="24" cy="28" r="2" />
          <circle cx="34" cy="17" r="2" />
          <circle cx="44" cy="23" r="2" />
          <circle cx="22" cy="11" r="2" />
          <circle cx="31" cy="6" r="2" />
        </g>
      </>
    ),
  },
  growth: {
    viewBox: "0 0 48 48",
    paths: (
      <>
        <path d="M8 28c-5-9 2-19 11-15 7-10 22-4 20 7 9 5 4 18-6 17-5 8-18 6-19-3-3 0-5-3-6-6Z" />
        <path d="m14 34 7-9-2-12m2 12 12 12m-12-12 18-5" />
        <g fill="currentColor" stroke="none">
          <circle cx="8" cy="28" r="2" />
          <circle cx="19" cy="13" r="2" />
          <circle cx="21" cy="25" r="2.2" />
          <circle cx="39" cy="20" r="2" />
          <circle cx="33" cy="37" r="2" />
          <circle cx="14" cy="34" r="2" />
        </g>
      </>
    ),
  },
  steroid: {
    viewBox: "0 0 48 48",
    paths: (
      <>
        <path d="m3 25 6-10h12l6 10-6 10H9Z" />
        <path d="m21 15 11-4 8 8-4 11-9-5" />
        <path d="m36 30 8 1 1 9-8 4-6-7Z" />
        <path d="m9 15-3-6m34 10 5-3" />
        <g fill="currentColor" stroke="none">
          <circle cx="3" cy="25" r="1.8" />
          <circle cx="6" cy="9" r="1.8" />
          <circle cx="45" cy="16" r="1.8" />
          <circle cx="45" cy="40" r="1.8" />
        </g>
      </>
    ),
  },
  sarms: {
    viewBox: "0 0 48 48",
    paths: (
      <>
        <path d="m4 22 6-10h12l6 10-6 10H10Z" />
        <path d="m28 22 7-4 8 5-2 10-10 1-4-7" />
        <path d="M10 32 6 40m35-7 4 6" />
        <g fill="currentColor" stroke="none">
          <circle cx="4" cy="22" r="1.8" />
          <circle cx="6" cy="40" r="1.8" />
          <circle cx="45" cy="39" r="1.8" />
          <circle cx="28" cy="22" r="1.8" />
        </g>
      </>
    ),
  },
  pharma: {
    viewBox: "0 0 48 48",
    paths: (
      <>
        <path d="m5 25 7-12h14l7 12-7 12H12Z" />
        <path d="M12 17h12m3 16H14m19-8 8-5 4 7" />
        <g fill="currentColor" stroke="none">
          <circle cx="5" cy="25" r="1.8" />
          <circle cx="33" cy="25" r="1.8" />
          <circle cx="41" cy="20" r="1.8" />
          <circle cx="45" cy="27" r="1.8" />
        </g>
      </>
    ),
  },
  hormonal: {
    viewBox: "0 0 48 48",
    paths: (
      <>
        <path d="m3 24 6-10h12l6 10-6 10H9Z" />
        <path d="m27 24 6-9 10 3 1 11-9 5Z" />
        <path d="M9 14 5 7m39 22 2 8" />
        <g fill="currentColor" stroke="none">
          <circle cx="3" cy="24" r="1.8" />
          <circle cx="5" cy="7" r="1.8" />
          <circle cx="46" cy="37" r="1.8" />
          <circle cx="27" cy="24" r="1.8" />
        </g>
      </>
    ),
  },
  screening: {
    viewBox: "0 0 48 48",
    paths: (
      <>
        <circle cx="24" cy="24" r="8" />
        <path d="m18 18-9-9m21 9 9-9m-9 21 9 9M18 30l-9 9" />
        <path d="M24 5v7m0 24v7M5 24h7m24 0h7" />
        <g fill="currentColor" stroke="none">
          <circle cx="24" cy="24" r="2.5" />
          <circle cx="9" cy="9" r="2" />
          <circle cx="39" cy="9" r="2" />
          <circle cx="39" cy="39" r="2" />
          <circle cx="9" cy="39" r="2" />
        </g>
      </>
    ),
  },
};

export function MoleculeIcon({
  name,
  className,
}: {
  name: PricingCategory["icon"];
  className?: string;
}) {
  const icon = icons[name];

  return (
    <svg
      className={cn("size-[42px] shrink-0 text-muted", className)}
      viewBox={icon.viewBox}
      aria-hidden="true"
      focusable="false"
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      >
        {icon.paths}
      </g>
    </svg>
  );
}

export function PricingHeroMolecule() {
  return (
    <div className="mb-8 border-b border-[color:var(--line)] pb-[18px] text-muted">
      <svg viewBox="0 0 360 142" className="h-auto w-full" aria-hidden="true">
        <g
          fill="none"
          stroke="rgba(100, 116, 139, 0.17)"
          strokeWidth="1"
        >
          <path d="M0 22h360M0 71h360M0 120h360" />
          <path d="M43 0v142M126 0v142M209 0v142M292 0v142" />
        </g>
        <g
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.4"
        >
          <path d="m24 88 38-38 43 20 39-43 48 29 41-22 39 43 48-31 45 27" />
          <path d="m105 70 13 43 43 13m31-70 16 44 44 19m28-73 12-30" />
          <path d="m62 50 7-27 29-8 20 20-13 35" />
          <path d="m233 34 9-24 28-3 18 21-8 18" />
        </g>
        <g fill="white" stroke="currentColor" strokeWidth="1.5">
          <circle cx="24" cy="88" r="4" />
          <circle cx="62" cy="50" r="4" />
          <circle cx="105" cy="70" r="5" />
          <circle cx="144" cy="27" r="4" />
          <circle cx="192" cy="56" r="5" />
          <circle cx="233" cy="34" r="4" />
          <circle cx="272" cy="77" r="5" />
          <circle cx="320" cy="46" r="4" />
          <circle cx="365" cy="73" r="4" />
          <circle cx="118" cy="113" r="4" />
          <circle cx="161" cy="126" r="4" />
          <circle cx="208" cy="100" r="4" />
          <circle cx="252" cy="119" r="4" />
          <circle cx="292" cy="16" r="4" />
        </g>
      </svg>
      <div className="mt-4 flex justify-between gap-5 font-display text-[0.62rem] font-semibold tracking-[0.08em] text-muted uppercase">
        <span>Molecular targets</span>
        <span>Method-led analysis</span>
      </div>
    </div>
  );
}
