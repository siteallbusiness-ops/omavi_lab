export function normalizeCoaNumber(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) return "";

  const withoutPrefix = trimmed.replace(/^BTL[-\s]*/i, "").trim();
  const compact = withoutPrefix.replace(/[^\dA-Za-z]/g, "");
  return compact || withoutPrefix || trimmed;
}

export type CertificatePreviewKind = "pdf" | "image" | "unknown";

export type CertificateLookupResult = {
  coaNumber: string;
  viewUrl: string | null;
  downloadUrl: string | null;
  previewKind: CertificatePreviewKind;
};

type JsonRecord = Record<string, unknown>;

function asRecord(value: unknown): JsonRecord | null {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value as JsonRecord;
  }
  return null;
}

function messageFrom(value: unknown): string {
  const record = asRecord(value);
  if (!record) return typeof value === "string" ? value : "";
  const parts = [record.message, record.error, record.code, record.status];
  return parts
    .map((part) => (typeof part === "string" || typeof part === "number" ? String(part) : ""))
    .filter(Boolean)
    .join(" ");
}

export function isCertificateNotFound(status: number, payload: unknown): boolean {
  if (status === 404) return true;

  const record = asRecord(payload);
  if (!record) return false;
  if (record.found === false || record.exists === false) return true;

  const message = messageFrom(record);
  if (/not\s*found|no\s+(matching\s+)?(certificate|record)|unknown coa/i.test(message)) {
    return true;
  }

  if (record.success === false && (record.status === 404 || record.code === 404)) {
    return true;
  }

  if (record.data === null && (record.success === false || record.found === false)) {
    return true;
  }

  return false;
}

const RESOURCE_KEYS = [
  "pdfUrl",
  "fileUrl",
  "certificateUrl",
  "downloadUrl",
  "documentUrl",
  "signedUrl",
  "previewUrl",
  "viewUrl",
  "pdfPath",
  "filePath",
  "documentPath",
  "pdf",
  "file",
  "url",
  "href",
  "path",
];

function looksLikeResource(value: string): boolean {
  return (
    value.startsWith("/") ||
    /^https?:\/\//i.test(value) ||
    value.startsWith("data:") ||
    value.startsWith("blob:")
  );
}

function pickResource(node: unknown, depth = 0): string | null {
  if (depth > 6 || node == null) return null;
  if (typeof node === "string" && looksLikeResource(node.trim())) {
    return node.trim();
  }

  if (Array.isArray(node)) {
    for (const item of node) {
      const found = pickResource(item, depth + 1);
      if (found) return found;
    }
    return null;
  }

  const record = asRecord(node);
  if (!record) return null;

  for (const key of RESOURCE_KEYS) {
    const value = record[key];
    if (typeof value === "string" && looksLikeResource(value.trim())) {
      return value.trim();
    }
    if (value && typeof value === "object") {
      const nested = pickResource(value, depth + 1);
      if (nested) return nested;
    }
  }

  for (const key of ["data", "certificate", "result", "record", "document", "asset", "files"]) {
    const nested = pickResource(record[key], depth + 1);
    if (nested) return nested;
  }

  return null;
}

function pickCoaNumber(payload: unknown, fallback: string): string {
  const record = asRecord(payload);
  const nested =
    record &&
    (asRecord(record.data) ||
      asRecord(record.certificate) ||
      asRecord(record.result) ||
      asRecord(record.record));

  const candidates = [record, nested];
  for (const candidate of candidates) {
    if (!candidate) continue;
    for (const key of ["coaNumber", "coaId", "coa", "reportNumber", "id"]) {
      const value = candidate[key];
      if (typeof value === "string" && value.trim()) {
        return normalizeCoaNumber(value) || value.trim();
      }
      if (typeof value === "number" && Number.isFinite(value)) {
        return String(value);
      }
    }
  }

  return fallback;
}

function previewKindFromUrl(url: string): CertificatePreviewKind {
  const path = url.split("?")[0]?.toLowerCase() ?? "";
  if (path.startsWith("data:image/") || /\.(png|jpe?g|webp|gif|svg)$/.test(path)) {
    return "image";
  }
  if (path.startsWith("data:application/pdf") || path.endsWith(".pdf") || path.includes("/pdf")) {
    return "pdf";
  }
  return "pdf";
}

function withDownloadParam(url: string): string {
  if (url.startsWith("data:") || url.startsWith("blob:")) return url;
  if (url.startsWith("/")) {
    const parsed = new URL(url, "http://site.local");
    parsed.searchParams.set("download", "1");
    return `${parsed.pathname}${parsed.search}`;
  }
  try {
    const parsed = new URL(url);
    parsed.searchParams.set("download", "1");
    return parsed.toString();
  } catch {
    return url;
  }
}

function fallbackFileUrl(coaNumber: string): string | null {
  if (!coaNumber) return null;
  return `/api/certificates/${encodeURIComponent(coaNumber)}/pdf`;
}

/** Hides Chrome's built-in PDF Drive / download / print toolbar in the viewer. */
export function withHiddenPdfToolbar(url: string): string {
  const flags = "toolbar=0&navpanes=0";
  const hashIndex = url.indexOf("#");
  if (hashIndex === -1) return `${url}#${flags}`;

  const base = url.slice(0, hashIndex);
  const hash = url.slice(hashIndex + 1);
  if (/(?:^|&)toolbar=/.test(hash)) return url;
  return `${base}#${hash ? `${hash}&` : ""}${flags}`;
}

export function parseCertificateLookup(
  payload: unknown,
  requestedCoa: string,
): CertificateLookupResult | null {
  const record = asRecord(payload);
  if (!record) return null;

  if (record.success === false && !isCertificateNotFound(200, payload)) {
    return null;
  }

  const hasRecord =
    record.found === true ||
    record.exists === true ||
    record.success === true ||
    asRecord(record.data) != null ||
    asRecord(record.certificate) != null ||
    asRecord(record.result) != null ||
    asRecord(record.record) != null ||
    typeof record.coaNumber === "string" ||
    typeof record.id === "string";

  if (!hasRecord && pickResource(payload) == null) {
    return null;
  }

  const coaNumber = pickCoaNumber(payload, requestedCoa);
  const resource = pickResource(payload) ?? fallbackFileUrl(coaNumber);

  return {
    coaNumber,
    viewUrl: resource,
    downloadUrl: resource ? withDownloadParam(resource) : null,
    previewKind: resource ? previewKindFromUrl(resource) : "unknown",
  };
}
