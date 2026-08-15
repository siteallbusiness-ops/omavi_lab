"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { MoleculeIcon } from "@/components/pricing/molecule-icons";
import { pricingCategories } from "@/lib/site";
import { cn } from "@/lib/utils";

export function PricingCatalog() {
  const [query, setQuery] = useState("");
  const [activeId, setActiveId] = useState(pricingCategories[0]?.id ?? "");
  const deferredQuery = useDeferredValue(query);
  const isSearching = deferredQuery.trim().length > 0;

  const filtered = useMemo(() => {
    const q = deferredQuery.trim().toLowerCase();
    if (!q) return pricingCategories;

    return pricingCategories
      .map((category) => ({
        ...category,
        rows: category.rows.filter((row) =>
          row.analyte.toLowerCase().includes(q),
        ),
      }))
      .filter((category) => category.rows.length > 0);
  }, [deferredQuery]);

  return (
    <div>
      <div className="mb-10 grid items-end justify-between gap-7 border-b border-[color:var(--line)] pb-8 sm:mb-[72px] sm:gap-10 sm:pb-[34px] md:grid-cols-[minmax(0,0.75fr)_minmax(0,0.55fr)] md:gap-[70px]">
        <label htmlFor="price-search-input" className="block min-w-0">
          <span className="mb-2.5 block font-display text-[0.67rem] font-bold tracking-[0.08em] text-blue uppercase">
            Find a compound or service
          </span>
          <input
            id="price-search-input"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search, for example: Semaglutide"
            autoComplete="off"
            className="w-full min-h-[52px] border-0 border-b border-navy bg-transparent pb-2 font-display text-[clamp(1.1rem,4.5vw,1.7rem)] text-ink outline-none transition-[border-color] placeholder:text-muted/55 focus:border-blue sm:min-h-[58px]"
          />
        </label>
        <p className="m-0 max-w-md text-[0.78rem] leading-[1.62] text-muted md:pb-2">
          Fees shown are the published starting price. Contact the laboratory to
          confirm the scope for your sample.
        </p>
      </div>

      <div className="grid items-start gap-10 lg:grid-cols-[225px_minmax(0,1fr)] lg:gap-[clamp(56px,8vw,112px)]">
        <aside
          className="grid grid-cols-1 sm:grid-cols-2 lg:sticky lg:top-[var(--sticky-top)] lg:grid-cols-1"
          aria-label="Pricing categories"
        >
          <p className="col-span-full mb-4 font-display text-[0.69rem] font-bold tracking-[0.14em] text-muted uppercase">
            Categories
          </p>
          {pricingCategories.map((category, index) => (
            <a
              key={category.id}
              href={`#${category.id}`}
              onClick={() => setActiveId(category.id)}
              className={cn(
                "border-b border-[color:var(--line)] py-[11px] font-display text-[0.74rem] no-underline transition-[color,padding] duration-150",
                index % 2 === 1 &&
                  "sm:border-l sm:border-[color:var(--line)] sm:pl-[18px] lg:border-l-0 lg:pl-0",
                activeId === category.id
                  ? "pl-1.5 text-blue sm:pl-[18px] lg:pl-1.5"
                  : "text-muted hover:pl-1.5 hover:text-blue lg:hover:pl-1.5",
              )}
            >
              {category.navLabel}
            </a>
          ))}
        </aside>

        <div className="min-w-0 border-t border-navy">
          {filtered.length === 0 ? (
            <p className="m-0 py-12 text-sm text-muted">
              No analytes matched “{query.trim()}”.
            </p>
          ) : (
            filtered.map((category, index) => {
              const originalIndex = pricingCategories.findIndex(
                (item) => item.id === category.id,
              );
              const displayIndex =
                originalIndex >= 0 ? originalIndex + 1 : index + 1;
              const countLabel = isSearching
                ? `${category.rows.length} ${category.rows.length === 1 ? "match" : "matches"}`
                : category.countLabel;

              return (
                <details
                  key={category.id}
                  id={category.id}
                  open
                  className="group scroll-target border-b border-[color:var(--line)]"
                  onToggle={(event) => {
                    if (event.currentTarget.open) setActiveId(category.id);
                  }}
                >
                  <summary className="flex min-h-[72px] cursor-pointer list-none items-center justify-between gap-3 py-4 marker:content-none sm:min-h-24 sm:gap-6 sm:py-[18px] [&::-webkit-details-marker]:hidden">
                    <span className="grid min-w-0 grid-cols-[18px_32px_minmax(0,1fr)] items-center gap-2.5 font-display text-[clamp(1.05rem,4vw,1.72rem)] font-medium tracking-[-0.035em] text-ink sm:grid-cols-[22px_42px_minmax(0,1fr)] sm:gap-[22px]">
                      <i className="not-italic font-display text-[0.65rem] tracking-normal text-blue">
                        {String(displayIndex).padStart(2, "0")}
                      </i>
                      <MoleculeIcon
                        name={category.icon}
                        className="size-8 transition-colors duration-160 group-open:text-ink group-hover:text-ink sm:size-[42px]"
                      />
                      <span className="min-w-0 break-words">{category.title}</span>
                    </span>
                    <small className="flex shrink-0 items-center gap-2 font-display text-[0.67rem] font-medium text-muted not-italic sm:gap-6">
                      <span className="max-[420px]:hidden">{countLabel}</span>
                      <span className="hidden max-[420px]:inline">
                        {category.rows.length}
                      </span>
                      <span
                        aria-hidden="true"
                        className="grid size-[18px] place-items-center text-[1.1rem] font-normal text-blue after:content-['+'] group-open:after:content-['−']"
                      />
                    </small>
                  </summary>

                  <div className="-mx-1 w-[calc(100%+8px)] max-w-[calc(100%+8px)] overflow-x-auto pb-[30px] sm:mx-0 sm:w-full sm:max-w-full">
                    <table className="w-full min-w-[480px] border-collapse bg-white/[0.34] tabular-nums sm:min-w-0">
                      <thead>
                        <tr>
                          <th className="bg-[rgba(203,213,225,0.45)] px-3 py-[13px] text-left font-display text-[0.62rem] font-bold tracking-[0.08em] text-blue uppercase sm:px-[18px]">
                            {category.columnLabel ?? "Analyte"}
                          </th>
                          <th className="w-[120px] bg-[rgba(203,213,225,0.45)] px-3 py-[13px] text-right font-display text-[0.62rem] font-bold tracking-[0.08em] text-blue uppercase sm:w-[190px] sm:px-[18px]">
                            Testing fee (USD)
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {category.rows.map((row) => (
                          <tr
                            key={row.analyte}
                            className="transition-colors hover:bg-blue-soft/40 [&:last-child_td]:border-b-0"
                          >
                            <td className="border-b border-[color:var(--line)] px-3 py-3 text-[0.82rem] text-ink-soft sm:px-[18px] sm:py-[13px]">
                              {row.analyte}
                            </td>
                            <td className="border-b border-[color:var(--line)] px-3 py-3 text-right font-display text-[0.82rem] font-semibold text-ink sm:px-[18px] sm:py-[13px]">
                              {row.fee}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </details>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
