"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  isCertificateNotFound,
  normalizeCoaNumber,
  parseCertificateLookup,
  withHiddenPdfToolbar,
  type CertificateLookupResult,
} from "@/lib/coa";

export function CoaLookupForm() {
  const [coaId, setCoaId] = useState("");
  const [status, setStatus] = useState<
    "idle" | "empty" | "loading" | "not-found" | "found" | "error"
  >("idle");
  const [result, setResult] = useState<CertificateLookupResult | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const resultRef = useRef<CertificateLookupResult | null>(null);

  useEffect(() => {
    return () => revokeResultUrls(resultRef.current);
  }, []);

  function setLookupResult(next: CertificateLookupResult | null) {
    setResult((current) => {
      revokeResultUrls(current);
      resultRef.current = next;
      return next;
    });
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = coaId.trim();
    if (!value) {
      setLookupResult(null);
      setErrorMessage("");
      setStatus("empty");
      return;
    }

    setStatus("loading");
    setLookupResult(null);
    setErrorMessage("");

    try {
      const response = await fetch("/api/certificates/lookup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ coaNumber: value }),
      });

      const contentType = response.headers.get("content-type") ?? "";
      if (
        response.ok &&
        (contentType.includes("application/pdf") || contentType.startsWith("image/"))
      ) {
        const blob = await response.blob();
        const objectUrl = URL.createObjectURL(blob);
        const coaNumber = normalizeCoaNumber(value);
        setLookupResult({
          coaNumber,
          viewUrl: objectUrl,
          downloadUrl: objectUrl,
          previewKind: contentType.startsWith("image/") ? "image" : "pdf",
        });
        setStatus("found");
        return;
      }

      const payload = await readJson(response);

      if (isCertificateNotFound(response.status, payload)) {
        setStatus("not-found");
        return;
      }

      if (!response.ok) {
        setErrorMessage(errorFromPayload(payload));
        setStatus("error");
        return;
      }

      const parsed = parseCertificateLookup(payload, normalizeCoaNumber(value));
      if (!parsed) {
        setStatus("not-found");
        return;
      }

      setLookupResult(parsed);
      setStatus("found");
    } catch {
      setErrorMessage(
        "Certificate archive is temporarily unavailable. Please try again.",
      );
      setStatus("error");
    }
  }

  return (
    <div className="bg-navy text-white shadow-elevated">
      <div className="border-b border-white/14 px-5 py-5 sm:px-[26px] sm:py-[22px]">
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
          COA ID / Report Number
        </label>

        <div
          className={cn(
            "flex flex-col overflow-hidden rounded-md border border-white/25 bg-white/[0.06] transition-[border-color,box-shadow] sm:flex-row sm:items-stretch",
            "focus-within:border-blue focus-within:shadow-[0_0_0_3px_rgba(30,91,217,0.35)]",
          )}
        >
          <input
            id="coa_id"
            name="coa_id"
            value={coaId}
            onChange={(event) => {
              setCoaId(event.target.value);
              setStatus("idle");
              setLookupResult(null);
              setErrorMessage("");
            }}
            placeholder="BTL- 260848"
            autoComplete="off"
            spellCheck={false}
            disabled={status === "loading"}
            className="min-h-[52px] min-w-0 flex-1 border-0 bg-transparent px-[18px] font-display text-base text-white shadow-none outline-none ring-0 placeholder:text-white/40 focus:border-0 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 disabled:opacity-70 sm:min-h-[56px]"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="inline-flex min-h-[52px] shrink-0 items-center justify-center gap-2.5 border-t border-white/15 bg-blue-soft px-5 font-display text-[0.75rem] font-bold text-navy transition-colors hover:bg-white disabled:cursor-wait disabled:opacity-80 sm:min-h-[56px] sm:min-w-[132px] sm:justify-between sm:border-t-0 sm:border-l sm:border-white/15"
          >
            {status === "loading" ? "Searching" : "Search COA"}{" "}
            <span aria-hidden="true">→</span>
          </button>
        </div>

        <p className="mt-3 m-0 text-[0.67rem] text-white/45">
          Enter the COA ID or report number as printed on the certificate.
        </p>

        {status === "empty" ? (
          <p className="mt-4 m-0 rounded-md border border-white/20 bg-white/5 px-4 py-3 text-sm text-blue-mist">
            Enter a COA ID or report number to search the archive.
          </p>
        ) : null}

        {status === "error" ? (
          <p className="mt-4 m-0 rounded-md border border-white/20 bg-white/5 px-4 py-3 text-sm text-blue-mist">
            {errorMessage}
          </p>
        ) : null}

        {status === "not-found" ? (
          <div className="mt-4 rounded-md border border-white/20 bg-white/5 px-4 py-4">
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

        {status === "found" && result ? (
          <div className="mt-4 rounded-md border border-white/20 bg-white/5 px-4 py-4">
            <p className="m-0 font-display text-sm font-semibold text-white">
              Certificate found
            </p>
            <p className="mt-2 m-0 text-sm text-white/60">
              Archive record for COA {result.coaNumber}.
            </p>
            {result.viewUrl ? (
              <>
                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
                  <a
                    href={result.viewUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex border-b border-blue-mist pb-0.5 font-display text-sm font-semibold text-blue-mist no-underline transition-colors hover:border-white hover:text-white"
                  >
                    View certificate <span aria-hidden="true">→</span>
                  </a>
                  {result.downloadUrl ? (
                    <a
                      href={result.downloadUrl}
                      className="inline-flex border-b border-blue-mist pb-0.5 font-display text-sm font-semibold text-blue-mist no-underline transition-colors hover:border-white hover:text-white"
                    >
                      Download PDF <span aria-hidden="true">→</span>
                    </a>
                  ) : null}
                </div>
                <div className="mt-4 overflow-hidden rounded-md bg-white">
                  {result.previewKind === "image" ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={result.viewUrl}
                      alt={`Certificate ${result.coaNumber}`}
                      className="h-auto w-full"
                    />
                  ) : (
                    <iframe
                      src={withHiddenPdfToolbar(result.viewUrl)}
                      title={`Certificate ${result.coaNumber}`}
                      className="h-[min(70vh,520px)] w-full border-0"
                    />
                  )}
                </div>
              </>
            ) : (
              <p className="mt-2 m-0 text-sm text-white/60">
                A matching record was found, but no certificate file was
                returned.
              </p>
            )}
          </div>
        ) : null}
      </form>
    </div>
  );
}

async function readJson(response: Response): Promise<unknown> {
  const text = await response.text();
  if (!text) return null;
  try {
    return JSON.parse(text) as unknown;
  } catch {
    return { error: text };
  }
}

function errorFromPayload(payload: unknown): string {
  if (payload && typeof payload === "object" && "error" in payload) {
    const error = (payload as { error: unknown }).error;
    if (typeof error === "string" && error.trim()) {
      return publicErrorMessage(error);
    }
  }
  if (payload && typeof payload === "object" && "message" in payload) {
    const message = (payload as { message: unknown }).message;
    if (typeof message === "string" && message.trim()) {
      return publicErrorMessage(message);
    }
  }
  return "Certificate archive is temporarily unavailable. Please try again.";
}

function publicErrorMessage(message: string): string {
  const trimmed = message.trim();
  if (!trimmed || trimmed.startsWith("<") || trimmed.length > 180) {
    return "Certificate archive is temporarily unavailable. Please try again.";
  }
  return trimmed;
}

function revokeResultUrls(current: CertificateLookupResult | null) {
  if (current?.viewUrl?.startsWith("blob:")) {
    URL.revokeObjectURL(current.viewUrl);
  }
  if (
    current?.downloadUrl?.startsWith("blob:") &&
    current.downloadUrl !== current.viewUrl
  ) {
    URL.revokeObjectURL(current.downloadUrl);
  }
}
