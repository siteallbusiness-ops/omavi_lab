"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Brand } from "@/components/layout/brand";
import { Container } from "@/components/ui/container";
import { navLinks, site } from "@/lib/site";
import { cn } from "@/lib/utils";

const STRAND_A =
  "M58 18C58 40 152 50 152 72C152 94 58 104 58 126C58 148 152 158 152 180C152 202 58 212 58 234C58 256 152 266 152 288";
const STRAND_B =
  "M152 18C152 40 58 50 58 72C58 94 152 104 152 126C152 148 58 158 58 180C58 202 152 212 152 234C58 256 58 266 58 288";

function DnaStrandMark({
  uid,
  className,
}: {
  uid: string;
  className?: string;
}) {
  const rungYs = [28, 62, 96, 130, 164, 198, 232, 266];

  return (
    <svg
      viewBox="45 10 120 280"
      className={className}
      preserveAspectRatio="xMidYMid meet"
      focusable="false"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${uid}-a`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1E5BD9" />
          <stop offset="100%" stopColor="#091628" />
        </linearGradient>
        <linearGradient id={`${uid}-b`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#091628" />
          <stop offset="100%" stopColor="#1E5BD9" />
        </linearGradient>
      </defs>

      <g stroke="#091628" strokeOpacity="0.22" strokeWidth="1.15" strokeLinecap="round">
        {rungYs.map((y, i) => {
          const wide = i % 2 === 0;
          return (
            <line
              key={y}
              x1={wide ? 58 : 88}
              y1={y}
              x2={wide ? 152 : 122}
              y2={y}
            />
          );
        })}
      </g>

      <g fill="none" strokeLinecap="round">
        <path d={STRAND_A} stroke={`url(#${uid}-a)`} strokeWidth="3.2" />
        <path d={STRAND_B} stroke={`url(#${uid}-b)`} strokeWidth="3.2" />
      </g>

      <g fill="#1E5BD9" fillOpacity="0.4">
        {rungYs.map((y, i) => {
          const wide = i % 2 === 0;
          return (
            <g key={`n-${y}`}>
              <circle cx={wide ? 58 : 88} cy={y} r="2.5" />
              <circle cx={wide ? 152 : 122} cy={y} r="2.5" />
            </g>
          );
        })}
      </g>
    </svg>
  );
}

/**
 * Single DNA watermark for the mobile menu — same idea as desktop hero,
 * soft and right-anchored (one helix only; dual cross was too busy on narrow screens).
 */
function MobileNavDna() {
  return (
    <div
      className="mobile-nav-dna pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_100%_40%,rgba(30,91,217,0.06),transparent_55%)]" />

      <DnaStrandMark
        uid="biotech-mnav-dna"
        className="absolute top-[6%] right-[-10%] h-[min(88%,520px)] w-auto rotate-[18deg] opacity-[0.13]"
      />
    </div>
  );
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const chromeRef = useRef<HTMLDivElement>(null);
  const [chromeHeight, setChromeHeight] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    function onResize() {
      if (window.matchMedia("(min-width: 1024px)").matches) {
        setOpen(false);
      }
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const el = chromeRef.current;
    if (!el) return;

    function measure() {
      if (!chromeRef.current) return;
      setChromeHeight(Math.ceil(chromeRef.current.getBoundingClientRect().height));
    }

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", open);
    return () => document.body.classList.remove("overflow-hidden");
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <div ref={chromeRef} className="sticky top-0 z-[110]">
        <div className="bg-[#050e1a] font-display text-[0.7rem] tracking-[0.08em] text-white/75 uppercase">
          <Container className="flex min-h-[31px] items-center justify-between gap-6 sm:min-h-[34px]">
            <p className="m-0 hidden truncate sm:block">
              {site.tagline}
            </p>
            <Link
              href="/coa-lookup"
              className="ml-auto text-blue-mist no-underline transition-colors hover:text-white"
            >
              COA Lookup ↗
            </Link>
          </Container>
        </div>

        <header className="border-b border-white/12 bg-navy">
          <Container className="relative grid min-h-[var(--header-h)] grid-cols-[1fr_auto] items-center gap-4 lg:grid-cols-[auto_1fr_auto] lg:gap-8">
            <Brand
              inverted
              size="md"
              priority
              className="relative z-[1] min-w-0"
            />

            <button
              type="button"
              className="relative z-[1] inline-flex items-center gap-3 justify-self-end py-2 font-display text-[0.68rem] font-bold tracking-[0.08em] text-blue-mist uppercase lg:hidden"
              aria-expanded={open}
              aria-controls={mounted ? "mobile-navigation" : undefined}
              onClick={() => setOpen((value) => !value)}
            >
              <span>{open ? "Close" : "Menu"}</span>
              <span className="grid w-[22px] gap-1.5" aria-hidden="true">
                <span
                  className={cn(
                    "block h-px origin-center bg-white transition-transform duration-200",
                    open && "translate-y-[3.5px] rotate-45",
                  )}
                />
                <span
                  className={cn(
                    "block h-px origin-center bg-white transition-transform duration-200",
                    open && "-translate-y-[3.5px] -rotate-45",
                  )}
                />
              </span>
            </button>

            <nav
              aria-label="Primary navigation"
              className="hidden lg:col-start-2 lg:block lg:justify-self-center"
            >
              <ul className="m-0 flex list-none items-center justify-center gap-7 p-0">
                {navLinks.map((link) => {
                  const active =
                    link.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(link.href);

                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className={cn(
                          "relative inline-flex py-2 font-display text-sm tracking-[-0.01em] text-white/72 no-underline transition-colors hover:text-white",
                          active && "text-white",
                        )}
                      >
                        {link.label}
                        <span
                          className={cn(
                            "absolute inset-x-0 -bottom-0.5 mx-auto h-px w-0 bg-blue transition-all",
                            active && "w-full",
                          )}
                        />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <Link
              href="/contact"
              className="relative z-[1] hidden items-center gap-2 justify-self-end rounded-md bg-[#e8edf5] px-4 py-2.5 font-display text-sm font-semibold text-navy no-underline transition-colors hover:bg-white lg:inline-flex"
            >
              Request a quote <span aria-hidden="true">↗</span>
            </Link>
          </Container>
        </header>
      </div>

      {mounted ? (
        <div
          id="mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className={cn(
            "fixed inset-x-0 bottom-0 z-[105] lg:hidden",
            open ? "pointer-events-auto" : "pointer-events-none",
          )}
          style={chromeHeight > 0 ? { top: chromeHeight } : undefined}
        >
          <div
            className={cn(
              "mobile-nav-panel absolute inset-0 flex flex-col overflow-hidden bg-[#f5f7fb]",
              open ? "mobile-nav-panel--open" : "mobile-nav-panel--closed",
            )}
          >
            <MobileNavDna />

            <div className="relative z-10 flex min-h-0 flex-1 flex-col px-[clamp(22px,5.5vw,36px)] pt-2 pb-[max(1.1rem,env(safe-area-inset-bottom))]">
              <nav aria-label="Mobile navigation" className="shrink-0">
                <ul className="m-0 flex list-none flex-col p-0">
                  {navLinks.map((link, index) => {
                    const active =
                      link.href === "/"
                        ? pathname === "/"
                        : pathname.startsWith(link.href);

                    return (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className={cn(
                            "group flex items-baseline gap-3 py-2.5 no-underline transition-colors",
                            active
                              ? "text-navy"
                              : "text-ink-soft hover:text-navy",
                          )}
                        >
                          <span
                            className={cn(
                              "w-6 shrink-0 font-display text-[0.62rem] tracking-[0.1em]",
                              active ? "text-blue" : "text-muted",
                            )}
                          >
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span
                            className={cn(
                              "font-display text-[1.2rem] font-semibold tracking-[-0.03em]",
                              active &&
                                "underline decoration-blue/40 decoration-2 underline-offset-[6px]",
                            )}
                          >
                            {link.label}
                          </span>
                          <span
                            className={cn(
                              "ml-auto translate-y-px text-sm transition-opacity",
                              active
                                ? "text-blue opacity-100"
                                : "text-muted opacity-0 group-hover:opacity-60",
                            )}
                            aria-hidden="true"
                          >
                            ↗
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              <div className="mt-auto space-y-3 pt-8">
                <Link
                  href="/contact"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-navy px-4 py-3.5 font-display text-sm font-semibold text-white no-underline transition-colors hover:bg-surface-soft"
                >
                  Request a quote <span aria-hidden="true">↗</span>
                </Link>

                <div className="flex items-center justify-between gap-4">
                  <span className="truncate font-display text-[0.7rem] text-muted">
                    {site.domain}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
