"use client";

import { useState } from "react";
import Link from "next/link";

export function CoaLookupForm() {
  const [coaId, setCoaId] = useState("");
  const [status, setStatus] = useState<"idle" | "empty" | "not-found">("idle");

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = coaId.trim();
    if (!value) {
      setStatus("empty");
      return;
    }
    // Archive wiring comes later — UI states match the reference lookup flow.
    setStatus("not-found");
  }

  return (
    <div className="bg-navy text-white shadow-elevated">
      <div className="flex flex-col gap-1 border-b border-white/14 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-5 sm:px-[26px] sm:py-[22px]">
        <span className="font-display text-[0.65rem] font-bold tracking-[0.09em] text-blue-mist uppercase">
          Public lookup
        </span>
        <strong className="font-display text-[0.86rem] font-semibold text-white">
          Find a certificate
        </strong>
      </div>

      <form
        onSubmit={onSubmit}
        className="px-5 pt-7 pb-6 sm:px-[26px] sm:pt-[34px] sm:pb-7"
        id="lookup-result"
      >
        <label
          htmlFor="coa_id"
          className="mb-[11px] block text-[0.66rem] font-semibold tracking-[0.09em] text-white/74 uppercase"
        >
          COA ID
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_auto]">
          <input
            id="coa_id"
            name="coa_id"
            value={coaId}
            onChange={(event) => {
              setCoaId(event.target.value);
              setStatus("idle");
            }}
            placeholder="Enter your COA ID"
            autoComplete="off"
            spellCheck={false}
            className="min-h-[52px] min-w-0 border border-white/35 bg-white/[0.06] px-[18px] font-display text-base text-white outline-none placeholder:text-white/42 focus:border-blue-mist sm:min-h-[58px] sm:border-r-0"
          />
          <button
            type="submit"
            className="flex min-h-[52px] w-full items-center justify-center gap-3 border border-blue-soft bg-blue-soft px-4 font-display text-[0.75rem] font-bold text-navy transition-colors hover:bg-white sm:min-h-[58px] sm:min-w-[116px] sm:justify-between sm:gap-5"
          >
            Search COA <span aria-hidden="true">→</span>
          </button>
        </div>

        <p className="mt-3 m-0 text-[0.67rem] text-white/45">
          Use letters, numbers, underscores or hyphens as printed on the
          certificate.
        </p>

        {status === "empty" ? (
          <p className="mt-4 m-0 border border-white/20 bg-white/5 px-4 py-3 text-sm text-blue-mist">
            Enter a COA ID to search the archive.
          </p>
        ) : null}

        {status === "not-found" ? (
          <div className="mt-4 border border-white/20 bg-white/5 px-4 py-4">
            <p className="m-0 font-display text-sm font-semibold text-white">
              No matching certificate
            </p>
            <p className="mt-2 m-0 text-sm text-white/60">
              No public record was found for “{coaId.trim()}”. Check the ID and
              try again, or contact the laboratory.
            </p>
            <Link
              href="/contact"
              className="mt-3 inline-flex border-b border-blue-mist pb-0.5 font-display text-sm font-semibold text-blue-mist no-underline transition-colors hover:border-white hover:text-white"
            >
              Contact laboratory <span aria-hidden="true">→</span>
            </Link>
          </div>
        ) : null}
      </form>
    </div>
  );
}
