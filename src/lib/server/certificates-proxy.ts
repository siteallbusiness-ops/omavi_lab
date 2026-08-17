import { normalizeCoaNumber } from "@/lib/coa";

const DEFAULT_API_ORIGIN = "https://api.omavilabs.com";
const UPSTREAM_TIMEOUT_MS = 25_000;
const CERTIFICATES_PREFIX = "/api/certificates";

function certificatesApiOrigin(): string {
  const raw = process.env.CERTIFICATES_API_BASE_URL ?? DEFAULT_API_ORIGIN;
  try {
    return new URL(raw).origin;
  } catch {
    throw new Error("Invalid CERTIFICATES_API_BASE_URL");
  }
}

function certificatesApiHost(): string {
  return new URL(certificatesApiOrigin()).hostname.toLowerCase();
}

function extraFileHosts(): Set<string> {
  const hosts = new Set<string>([certificatesApiHost()]);
  const extra = process.env.CERTIFICATES_FILE_HOSTS ?? "";
  for (const host of extra.split(",")) {
    const trimmed = host.trim().toLowerCase();
    if (trimmed) hosts.add(trimmed);
  }
  return hosts;
}

function isPrivateHostname(hostname: string): boolean {
  const host = hostname.toLowerCase().replace(/^\[|\]$/g, "");
  if (host === "localhost" || host.endsWith(".localhost") || host.endsWith(".local")) {
    return true;
  }
  if (host === "::1" || host === "0.0.0.0") return true;

  const ipv4 = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/.exec(host);
  if (ipv4) {
    const parts = ipv4.slice(1).map(Number);
    if (parts.some((part) => part > 255)) return true;
    const [a, b] = parts;
    if (a === 10 || a === 127 || a === 0) return true;
    if (a === 169 && b === 254) return true;
    if (a === 172 && b >= 16 && b <= 31) return true;
    if (a === 192 && b === 168) return true;
  }

  return false;
}

function isAllowedUpstreamUrl(url: URL): boolean {
  if (url.protocol !== "https:" && url.protocol !== "http:") return false;
  if (isPrivateHostname(url.hostname)) return false;
  return extraFileHosts().has(url.hostname.toLowerCase());
}

function jsonResponse(status: number, body: Record<string, unknown>): Response {
  return Response.json(body, { status });
}

function isJsonContentType(contentType: string | null): boolean {
  if (!contentType) return false;
  const mime = contentType.split(";")[0]?.trim().toLowerCase() ?? "";
  return mime === "application/json" || mime.endsWith("+json");
}

function isRelativeFilePath(value: string): boolean {
  if (!value.startsWith("/") || value.startsWith("//") || value.includes("..")) {
    return false;
  }
  if (value.startsWith(CERTIFICATES_PREFIX)) return false;
  const path = value.split("?")[0] ?? "";
  return (
    /\.(pdf|png|jpe?g|webp|gif)$/i.test(path) ||
    /\/(storage|uploads|files|certificates|media|download|pdf)\b/i.test(path)
  );
}

function assetProxyPath(pathname: string, search: string, hostname?: string): string {
  const params = new URLSearchParams();
  params.set("path", `${pathname}${search}`);
  if (hostname && hostname.toLowerCase() !== certificatesApiHost()) {
    params.set("host", hostname);
  }
  return `${CERTIFICATES_PREFIX}/asset?${params.toString()}`;
}

function rewriteUpstreamString(value: string): string {
  if (isRelativeFilePath(value)) {
    const [pathname, search = ""] = value.split("?");
    return assetProxyPath(pathname ?? value, search ? `?${search}` : "");
  }

  if (!/^https?:\/\//i.test(value)) return value;

  try {
    const url = new URL(value);
    if (!isAllowedUpstreamUrl(url)) return value;

    if (
      url.hostname.toLowerCase() === certificatesApiHost() &&
      url.pathname.startsWith(CERTIFICATES_PREFIX)
    ) {
      return `${url.pathname}${url.search}${url.hash}`;
    }

    return assetProxyPath(url.pathname, url.search, url.hostname);
  } catch {
    return value;
  }
}

function rewriteUpstreamPayload(value: unknown): unknown {
  if (typeof value === "string") return rewriteUpstreamString(value);
  if (Array.isArray(value)) return value.map(rewriteUpstreamPayload);
  if (value && typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>).map(
      ([key, nested]) => [key, rewriteUpstreamPayload(nested)] as const,
    );
    return Object.fromEntries(entries);
  }
  return value;
}

function applyAuth(headers: Headers): void {
  const token = process.env.CERTIFICATES_API_TOKEN;
  if (token && !headers.has("authorization")) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const apiKey = process.env.CERTIFICATES_API_KEY;
  if (apiKey && !headers.has("x-api-key")) {
    headers.set("X-API-Key", apiKey);
  }
}

function outgoingHeaders(request: Request): Headers {
  const headers = new Headers();
  const accept = request.headers.get("accept");
  const contentType = request.headers.get("content-type");
  if (accept) headers.set("Accept", accept);
  if (contentType) headers.set("Content-Type", contentType);
  applyAuth(headers);
  return headers;
}

function incomingResponseHeaders(
  upstream: Response,
  searchParams: URLSearchParams,
  filenameHint: string,
): Headers {
  const headers = new Headers();
  const allow = [
    "content-type",
    "content-length",
    "content-disposition",
    "cache-control",
    "etag",
    "last-modified",
    "accept-ranges",
  ];

  for (const name of allow) {
    const value = upstream.headers.get(name);
    if (value) headers.set(name, value);
  }

  const contentType = headers.get("content-type") ?? "";
  const isFile =
    contentType.includes("pdf") ||
    contentType.startsWith("image/") ||
    contentType.includes("octet-stream") ||
    contentType.includes("application/zip");

  if (isFile) {
    const wantsDownload = searchParams.get("download") === "1";
    const filename = filenameFromDisposition(
      upstream.headers.get("content-disposition"),
      filenameHint,
    );
    headers.set(
      "Content-Disposition",
      `${wantsDownload ? "attachment" : "inline"}; filename="${filename}"`,
    );
  }

  headers.set("X-Content-Type-Options", "nosniff");
  return headers;
}

function filenameFromDisposition(header: string | null, fallback: string): string {
  if (header) {
    const utf = /filename\*=UTF-8''([^;]+)/i.exec(header);
    if (utf?.[1]) return safeFilename(decodeURIComponent(utf[1]));
    const ascii = /filename="?([^";]+)"?/i.exec(header);
    if (ascii?.[1]) return safeFilename(ascii[1]);
  }
  return fallback;
}

function safeFilename(name: string): string {
  const cleaned = name.replace(/[/\\?%*:|"<>]/g, "").trim();
  return cleaned || "certificate.pdf";
}

function isUnsafePathSegment(segment: string): boolean {
  return !segment || segment === "." || segment === ".." || segment.includes("\\");
}

async function readLookupBody(request: Request): Promise<{ body: string; error?: string }> {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return { body: "", error: "Request body must be JSON." };
  }

  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return { body: "", error: "Request body must be a JSON object." };
  }

  const record = payload as Record<string, unknown>;
  const raw =
    typeof record.coaNumber === "string"
      ? record.coaNumber
      : typeof record.coaId === "string"
        ? record.coaId
        : "";
  const coaNumber = normalizeCoaNumber(raw);

  if (!coaNumber) {
    return { body: "", error: "A COA number is required." };
  }

  return {
    body: JSON.stringify({
      ...record,
      coaNumber,
    }),
  };
}

async function fetchUpstream(
  url: URL,
  init: RequestInit,
): Promise<Response> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS);

  try {
    return await fetch(url, {
      ...init,
      signal: controller.signal,
      redirect: "follow",
      cache: "no-store",
    });
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error("UPSTREAM_TIMEOUT");
    }
    throw new Error("UPSTREAM_UNAVAILABLE");
  } finally {
    clearTimeout(timeout);
  }
}

async function respondFromUpstream(
  upstream: Response,
  requestUrl: URL,
  filenameHint: string,
): Promise<Response> {
  const contentType = upstream.headers.get("content-type");

  if (isJsonContentType(contentType)) {
    const text = await upstream.text();
    if (!text) {
      return new Response(null, {
        status: upstream.status,
        headers: incomingResponseHeaders(upstream, requestUrl.searchParams, filenameHint),
      });
    }

    try {
      const parsed = JSON.parse(text) as unknown;
      const rewritten = rewriteUpstreamPayload(parsed);
      const headers = incomingResponseHeaders(
        upstream,
        requestUrl.searchParams,
        filenameHint,
      );
      headers.set("Content-Type", "application/json; charset=utf-8");
      headers.delete("content-length");
      return new Response(JSON.stringify(rewritten), {
        status: upstream.status,
        headers,
      });
    } catch {
      return new Response(text, {
        status: upstream.status,
        headers: incomingResponseHeaders(upstream, requestUrl.searchParams, filenameHint),
      });
    }
  }

  return new Response(upstream.body, {
    status: upstream.status,
    headers: incomingResponseHeaders(upstream, requestUrl.searchParams, filenameHint),
  });
}

function handleProxyError(error: unknown): Response {
  const code = error instanceof Error ? error.message : "";
  if (code === "UPSTREAM_TIMEOUT") {
    return jsonResponse(504, {
      error: "Certificate archive timed out. Please try again.",
    });
  }
  if (code === "Invalid CERTIFICATES_API_BASE_URL") {
    return jsonResponse(500, {
      error: "Certificate lookup is not configured.",
    });
  }
  return jsonResponse(502, {
    error: "Certificate archive is temporarily unavailable. Please try again.",
  });
}

async function proxyAsset(request: Request, requestUrl: URL): Promise<Response> {
  const encodedPath = requestUrl.searchParams.get("path");
  if (!encodedPath || !encodedPath.startsWith("/") || encodedPath.startsWith("//") || encodedPath.includes("..")) {
    return jsonResponse(400, { error: "Invalid file path." });
  }

  const requestedHost = requestUrl.searchParams.get("host")?.toLowerCase();
  const hostname = requestedHost || certificatesApiHost();
  if (requestedHost && !extraFileHosts().has(requestedHost)) {
    return jsonResponse(400, { error: "Invalid file path." });
  }

  let target: URL;
  try {
    const protocol = new URL(certificatesApiOrigin()).protocol;
    target = new URL(encodedPath, `${protocol}//${hostname}/`);
  } catch {
    return jsonResponse(400, { error: "Invalid file path." });
  }

  if (!isAllowedUpstreamUrl(target)) {
    return jsonResponse(400, { error: "Invalid file path." });
  }

  try {
    const upstream = await fetchUpstream(target, {
      method: "GET",
      headers: outgoingHeaders(request),
    });
    const filename = target.pathname.split("/").pop() || "certificate.pdf";
    return respondFromUpstream(upstream, requestUrl, safeFilename(filename));
  } catch (error) {
    return handleProxyError(error);
  }
}

export async function proxyCertificateRequest(
  request: Request,
  path: string[],
): Promise<Response> {
  if (path.some(isUnsafePathSegment)) {
    return jsonResponse(400, { error: "Invalid certificate path." });
  }

  const requestUrl = new URL(request.url);

  if (path.length === 1 && path[0] === "asset") {
    if (request.method !== "GET" && request.method !== "HEAD") {
      return jsonResponse(405, { error: "Method not allowed." });
    }
    return proxyAsset(request, requestUrl);
  }

  const upstreamPath = `${CERTIFICATES_PREFIX}/${path.map(encodeURIComponent).join("/")}`;
  const upstreamUrl = new URL(upstreamPath, `${certificatesApiOrigin()}/`);
  upstreamUrl.search = requestUrl.search;
  upstreamUrl.searchParams.delete("download");

  const headers = outgoingHeaders(request);
  const init: RequestInit = {
    method: request.method,
    headers,
  };

  const isLookup = path.length === 1 && path[0] === "lookup" && request.method === "POST";

  try {
    if (isLookup) {
      const { body, error } = await readLookupBody(request);
      if (error) return jsonResponse(400, { error });
      headers.set("Content-Type", "application/json");
      headers.set("Accept", headers.get("Accept") || "application/json");
      init.body = body;
    } else if (request.method !== "GET" && request.method !== "HEAD") {
      init.body = await request.arrayBuffer();
    }

    const upstream = await fetchUpstream(upstreamUrl, init);
    const filename = `${path[path.length - 1] || "certificate"}.pdf`;
    return respondFromUpstream(upstream, requestUrl, safeFilename(filename));
  } catch (error) {
    return handleProxyError(error);
  }
}
