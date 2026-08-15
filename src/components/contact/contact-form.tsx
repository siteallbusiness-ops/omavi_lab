"use client";

import { useId, useState } from "react";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

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

type FieldKey = keyof FormState;
type FormErrors = Partial<Record<FieldKey, string>>;

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

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const FIELD_ORDER: FieldKey[] = [
  "name",
  "email",
  "compound",
  "samples",
  "question",
];

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

function validateField(key: FieldKey, data: FormState): string | undefined {
  switch (key) {
    case "name":
      if (!data.name.trim()) return "Name is required";
      return undefined;
    case "email":
      if (!data.email.trim()) return "Email is required";
      if (!EMAIL_PATTERN.test(data.email.trim())) return "Enter a valid email";
      return undefined;
    case "compound":
      if (!data.compound.trim()) return "This field is required";
      return undefined;
    case "samples":
      if (!data.samples.trim()) return undefined;
      {
        const samples = Number(data.samples);
        if (!Number.isInteger(samples) || samples < 1) {
          return "Enter a whole number of 1 or more";
        }
      }
      return undefined;
    case "question":
      if (!data.question.trim()) return "This field is required";
      if (data.question.trim().length < 20) return "Add a little more detail";
      return undefined;
    default:
      return undefined;
  }
}

function validateForm(data: FormState): FormErrors {
  const errors: FormErrors = {};
  for (const key of FIELD_ORDER) {
    const message = validateField(key, data);
    if (message) errors[key] = message;
  }
  return errors;
}

const fieldBase =
  "w-full min-h-[52px] rounded-md border bg-white px-[13px] py-3 text-[0.9rem] text-ink outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-muted/55 focus:shadow-[0_0_0_3px_rgba(30,91,217,0.12)]";

const labelClass = "mb-2 block text-[0.68rem] font-semibold text-ink-soft";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p
      id={id}
      className="mt-1.5 m-0 text-[0.72rem] leading-snug text-[#c2410c]"
      role="alert"
    >
      {message}
    </p>
  );
}

export function ContactForm() {
  const formId = useId();
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<FieldKey, boolean>>>(
    {},
  );
  const [copied, setCopied] = useState(false);

  function errorId(key: FieldKey) {
    return `${formId}-${key}-error`;
  }

  function showError(key: FieldKey) {
    return Boolean(touched[key] && errors[key]);
  }

  function update<K extends FieldKey>(key: K, value: FormState[K]) {
    const next = { ...form, [key]: value };
    setForm(next);

    if (touched[key]) {
      const message = validateField(key, next);
      setErrors((current) => {
        const nextErrors = { ...current };
        if (message) nextErrors[key] = message;
        else delete nextErrors[key];
        return nextErrors;
      });
    }
  }

  function markTouched(key: FieldKey) {
    setTouched((current) => ({ ...current, [key]: true }));
    const message = validateField(key, form);
    setErrors((current) => {
      const nextErrors = { ...current };
      if (message) nextErrors[key] = message;
      else delete nextErrors[key];
      return nextErrors;
    });
  }

  function runValidation() {
    const nextErrors = validateForm(form);
    setErrors(nextErrors);
    setTouched({
      name: true,
      email: true,
      compound: true,
      samples: true,
      question: true,
    });
    return nextErrors;
  }

  function focusFirstError(nextErrors: FormErrors) {
    const firstKey = FIELD_ORDER.find((key) => nextErrors[key]);
    if (!firstKey) return;
    const el = document.getElementById(`${formId}-${firstKey}`);
    el?.focus();
    el?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function prepareEmail(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = runValidation();
    if (Object.keys(nextErrors).length > 0) {
      focusFirstError(nextErrors);
      return;
    }

    const subject = encodeURIComponent(
      `Testing enquiry — ${form.compound.trim()}`,
    );
    const body = encodeURIComponent(buildEnquiryBody(form));
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
  }

  async function copyEnquiry() {
    const nextErrors = runValidation();
    if (Object.keys(nextErrors).length > 0) {
      focusFirstError(nextErrors);
      return;
    }

    await navigator.clipboard.writeText(buildEnquiryBody(form));
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  function fieldClass(key: FieldKey) {
    return cn(
      fieldBase,
      showError(key)
        ? "border-[#fdba74] focus:border-[#ea580c] focus:shadow-[0_0_0_3px_rgba(234,88,12,0.12)]"
        : "border-[color:var(--line)] focus:border-blue",
    );
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

      <form onSubmit={prepareEmail} noValidate className="grid gap-6">
        <div className="grid gap-[22px] md:grid-cols-2">
          <div>
            <label htmlFor={`${formId}-name`} className={labelClass}>
              Name *
            </label>
            <input
              id={`${formId}-name`}
              name="name"
              autoComplete="name"
              aria-invalid={showError("name")}
              aria-describedby={
                showError("name") ? errorId("name") : undefined
              }
              className={fieldClass("name")}
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              onBlur={() => markTouched("name")}
            />
            <FieldError
              id={errorId("name")}
              message={showError("name") ? errors.name : undefined}
            />
          </div>

          <div>
            <label htmlFor={`${formId}-email`} className={labelClass}>
              Email *
            </label>
            <input
              id={`${formId}-email`}
              name="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              aria-invalid={showError("email")}
              aria-describedby={
                showError("email") ? errorId("email") : undefined
              }
              className={fieldClass("email")}
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              onBlur={() => markTouched("email")}
            />
            <FieldError
              id={errorId("email")}
              message={showError("email") ? errors.email : undefined}
            />
          </div>
        </div>

        <div>
          <label htmlFor={`${formId}-organisation`} className={labelClass}>
            Organisation
          </label>
          <input
            id={`${formId}-organisation`}
            name="organisation"
            autoComplete="organization"
            className={fieldClass("organisation")}
            value={form.organisation}
            onChange={(e) => update("organisation", e.target.value)}
          />
        </div>

        <div className="grid gap-[22px] md:grid-cols-2">
          <div>
            <label htmlFor={`${formId}-compound`} className={labelClass}>
              Compound or product *
            </label>
            <input
              id={`${formId}-compound`}
              name="compound"
              placeholder="What needs to be measured?"
              aria-invalid={showError("compound")}
              aria-describedby={
                showError("compound") ? errorId("compound") : undefined
              }
              className={fieldClass("compound")}
              value={form.compound}
              onChange={(e) => update("compound", e.target.value)}
              onBlur={() => markTouched("compound")}
            />
            <FieldError
              id={errorId("compound")}
              message={showError("compound") ? errors.compound : undefined}
            />
          </div>

          <div>
            <label htmlFor={`${formId}-matrix`} className={labelClass}>
              Sample type / matrix
            </label>
            <input
              id={`${formId}-matrix`}
              name="matrix"
              placeholder="e.g. powder, solution"
              className={fieldClass("matrix")}
              value={form.matrix}
              onChange={(e) => update("matrix", e.target.value)}
            />
          </div>
        </div>

        <div className="grid gap-[22px] md:grid-cols-2">
          <div>
            <label htmlFor={`${formId}-samples`} className={labelClass}>
              Number of samples
            </label>
            <input
              id={`${formId}-samples`}
              name="samples"
              type="number"
              min={1}
              step={1}
              inputMode="numeric"
              aria-invalid={showError("samples")}
              aria-describedby={
                showError("samples") ? errorId("samples") : undefined
              }
              className={fieldClass("samples")}
              value={form.samples}
              onChange={(e) => update("samples", e.target.value)}
              onBlur={() => markTouched("samples")}
            />
            <FieldError
              id={errorId("samples")}
              message={showError("samples") ? errors.samples : undefined}
            />
          </div>

          <div>
            <label htmlFor={`${formId}-timing`} className={labelClass}>
              Required timing
            </label>
            <input
              id={`${formId}-timing`}
              name="timing"
              placeholder="Your preferred date or timeframe"
              className={fieldClass("timing")}
              value={form.timing}
              onChange={(e) => update("timing", e.target.value)}
            />
          </div>
        </div>

        <div>
          <label htmlFor={`${formId}-question`} className={labelClass}>
            What should the result help you determine? *
          </label>
          <textarea
            id={`${formId}-question`}
            name="question"
            rows={6}
            placeholder="Include the tests or outputs you expect, any known concentration range and relevant handling information."
            aria-invalid={showError("question")}
            aria-describedby={
              showError("question") ? errorId("question") : undefined
            }
            className={cn(fieldClass("question"), "min-h-[140px] resize-y")}
            value={form.question}
            onChange={(e) => update("question", e.target.value)}
            onBlur={() => markTouched("question")}
          />
          <FieldError
            id={errorId("question")}
            message={showError("question") ? errors.question : undefined}
          />
        </div>

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
