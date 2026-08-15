"use client";

import { useState } from "react";
import { site } from "@/lib/site";

type FormState = {
  name: string;
  email: string;
  organisation: string;
  compound: string;
  matrix: string;
  samples: string;
  timing: string;
  question: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  organisation: "",
  compound: "",
  matrix: "",
  samples: "",
  timing: "",
  question: "",
};

function buildEnquiryBody(data: FormState) {
  return [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Organisation: ${data.organisation || "—"}`,
    `Compound or product: ${data.compound}`,
    `Sample type / matrix: ${data.matrix || "—"}`,
    `Number of samples: ${data.samples || "—"}`,
    `Required timing: ${data.timing || "—"}`,
    "",
    "What should the result help you determine?",
    data.question,
  ].join("\n");
}

const fieldClass =
  "w-full min-h-[52px] rounded-none border border-[color:var(--line)] bg-white/62 px-[13px] py-3 text-[0.9rem] text-ink outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-muted/55 focus:border-blue focus:shadow-[0_0_0_3px_rgba(30,91,217,0.1)]";

const labelClass =
  "mb-2 block text-[0.68rem] font-semibold text-ink-soft";

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [copied, setCopied] = useState(false);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function prepareEmail(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const subject = encodeURIComponent(
      `Testing enquiry — ${form.compound || "sample"}`,
    );
    const body = encodeURIComponent(buildEnquiryBody(form));
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
  }

  async function copyEnquiry() {
    await navigator.clipboard.writeText(buildEnquiryBody(form));
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="border border-[color:var(--line)] bg-white p-[clamp(28px,4.5vw,58px)]">
      <div className="mb-8 flex flex-col gap-3 border-b border-[color:var(--line)] pb-6 sm:mb-[46px] sm:flex-row sm:items-start sm:justify-between sm:gap-[25px] sm:pb-[27px]">
        <div>
          <p className="mb-2.5 font-display text-[0.69rem] font-bold tracking-[0.14em] text-muted uppercase">
            Build your enquiry
          </p>
          <h2 className="m-0 font-display text-[clamp(1.85rem,6vw,3.2rem)] font-medium leading-[1.05] tracking-[-0.04em] text-navy">
            Project details
          </h2>
        </div>
        <span className="shrink-0 font-display text-[0.63rem] text-muted sm:pt-1">
          Required fields *
        </span>
      </div>

      <form onSubmit={prepareEmail} className="grid gap-6">
        <div className="grid gap-[22px] md:grid-cols-2">
          <label className="block">
            <span className={labelClass}>Name *</span>
            <input
              required
              autoComplete="name"
              className={fieldClass}
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
            />
          </label>
          <label className="block">
            <span className={labelClass}>Email *</span>
            <input
              required
              type="email"
              autoComplete="email"
              className={fieldClass}
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
            />
          </label>
        </div>

        <label className="block">
          <span className={labelClass}>Organisation</span>
          <input
            autoComplete="organization"
            className={fieldClass}
            value={form.organisation}
            onChange={(e) => update("organisation", e.target.value)}
          />
        </label>

        <div className="grid gap-[22px] md:grid-cols-2">
          <label className="block">
            <span className={labelClass}>Compound or product *</span>
            <input
              required
              placeholder="What needs to be measured?"
              className={fieldClass}
              value={form.compound}
              onChange={(e) => update("compound", e.target.value)}
            />
          </label>
          <label className="block">
            <span className={labelClass}>Sample type / matrix</span>
            <input
              placeholder="e.g. powder, solution"
              className={fieldClass}
              value={form.matrix}
              onChange={(e) => update("matrix", e.target.value)}
            />
          </label>
        </div>

        <div className="grid gap-[22px] md:grid-cols-2">
          <label className="block">
            <span className={labelClass}>Number of samples</span>
            <input
              type="number"
              min={1}
              inputMode="numeric"
              className={fieldClass}
              value={form.samples}
              onChange={(e) => update("samples", e.target.value)}
            />
          </label>
          <label className="block">
            <span className={labelClass}>Required timing</span>
            <input
              placeholder="Your preferred date or timeframe"
              className={fieldClass}
              value={form.timing}
              onChange={(e) => update("timing", e.target.value)}
            />
          </label>
        </div>

        <label className="block">
          <span className={labelClass}>
            What should the result help you determine? *
          </span>
          <textarea
            required
            rows={6}
            placeholder="Include the tests or outputs you expect, any known concentration range and relevant handling information."
            className={`${fieldClass} min-h-[140px] resize-y`}
            value={form.question}
            onChange={(e) => update("question", e.target.value)}
          />
        </label>

        <div className="mt-2.5 grid items-center gap-6 border-t border-[color:var(--line)] pt-6 sm:gap-8 md:grid-cols-[1fr_auto]">
          <div>
            <p className="m-0 text-[0.69rem] leading-[1.52] text-muted">
              This prepares an email in your default email app. No project
              information is uploaded through this page.
            </p>
            <p
              className="mt-2 m-0 min-h-[1.2em] text-[0.69rem] text-blue"
              aria-live="polite"
            >
              {copied ? "Enquiry copied." : ""}
            </p>
          </div>

          <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:gap-[26px]">
            <button
              type="button"
              onClick={copyEnquiry}
              className="cursor-pointer self-start border-0 border-b border-navy bg-transparent p-0 pb-0.5 font-display text-sm font-semibold text-navy transition-colors hover:border-blue hover:text-blue"
            >
              {copied ? "Copied" : "Copy enquiry"}{" "}
              <span aria-hidden="true">□</span>
            </button>
            <button
              type="submit"
              className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-md border border-navy bg-navy px-5 py-3 font-display text-sm font-semibold tracking-[-0.01em] text-white transition-colors hover:border-surface-soft hover:bg-surface-soft sm:w-auto"
            >
              Prepare email <span aria-hidden="true">↗</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
