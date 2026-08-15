"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

const links = [
  { id: "peptide-analysis", label: "Peptide analysis", index: "01" },
  { id: "targeted-analysis", label: "Targeted LC–MS/MS", index: "02" },
  { id: "high-resolution", label: "High-resolution MS", index: "03" },
  { id: "screening", label: "Screening services", index: "04" },
] as const;

export function CapabilityMap() {
  const [active, setActive] = useState<string>(links[0].id);

  useEffect(() => {
    const sections = links
      .map((link) => document.getElementById(link.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target.id) {
          setActive(visible[0].target.id);
        }
      },
      {
        rootMargin: "-25% 0px -55% 0px",
        threshold: [0.1, 0.25, 0.5],
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="sticky top-[var(--header-h)] z-40 border-b border-[color:var(--line)] bg-paper">
      <Container className="px-0 sm:px-[clamp(20px,4vw,54px)]">
        <div className="flex overflow-x-auto md:grid md:grid-cols-[1fr_repeat(4,1fr)] md:overflow-visible">
          <p className="hidden items-center py-6 font-display text-[0.68rem] font-bold tracking-[0.12em] text-navy uppercase md:flex">
            Capability map
          </p>
          {links.map((link) => {
            const isActive = active === link.id;
            return (
              <Link
                key={link.id}
                href={`#${link.id}`}
                className={cn(
                  "flex min-h-[64px] shrink-0 items-center gap-2.5 border-r border-[color:var(--line)] px-4 py-4 font-display text-[0.7rem] font-semibold whitespace-nowrap text-ink-soft no-underline transition-colors last:border-r-0 md:min-h-[100px] md:gap-3.5 md:border-t-0 md:border-r-0 md:border-l md:px-4 md:py-5 md:text-[0.72rem] md:whitespace-normal",
                  isActive
                    ? "bg-white text-navy md:bg-blue-soft"
                    : "hover:bg-white/70 hover:text-navy",
                )}
              >
                <span className="text-[0.62rem] text-muted">{link.index}</span>
                {link.label}
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
