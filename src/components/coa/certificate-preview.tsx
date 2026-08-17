"use client";

import { useEffect, useRef, useState } from "react";

type PreviewStatus = "loading" | "ready" | "error";
type PreviewKind = "pdf" | "image";

export function CertificatePreview({
  src,
  title,
}: {
  src: string;
  title: string;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pagesRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<PreviewStatus>("loading");
  const [kind, setKind] = useState<PreviewKind>("pdf");
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const pages = pagesRef.current;
    if (!wrapper || !pages) return;
    const pageHost = pages;
    const widthHost = wrapper;

    const cancelled = { current: false };
    const objectUrls: string[] = [];
    let pdfDocument: { cleanup: (keepLoadedFonts?: boolean) => Promise<unknown> } | null =
      null;

    async function render() {
      setStatus("loading");
      setImageUrl(null);
      pageHost.replaceChildren();

      try {
        const response = await fetch(src, { cache: "no-store" });
        if (!response.ok) throw new Error("preview-fetch-failed");

        const buffer = await response.arrayBuffer();
        const bytes = new Uint8Array(buffer);
        const contentType = response.headers.get("content-type") ?? "";
        const detected = detectKind(contentType, bytes);

        if (cancelled.current) return;

        if (detected === "image") {
          const blob = new Blob([buffer], {
            type: contentType.startsWith("image/") ? contentType : "image/png",
          });
          const url = URL.createObjectURL(blob);
          objectUrls.push(url);
          setKind("image");
          setImageUrl(url);
          setStatus("ready");
          return;
        }

        const pdfjs = await import("pdfjs-dist");
        pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

        const pdf = await pdfjs.getDocument({
          data: bytes,
          disableRange: true,
          disableStream: true,
        }).promise;
        pdfDocument = pdf;
        if (cancelled.current) {
          await pdf.cleanup();
          return;
        }

        const width = Math.max(widthHost.clientWidth || 320, 240);
        const dpr = Math.min(window.devicePixelRatio || 1, 2);

        for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
          const page = await pdf.getPage(pageNumber);
          const base = page.getViewport({ scale: 1 });
          const viewport = page.getViewport({
            scale: (width * dpr) / base.width,
          });
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          if (!context) throw new Error("preview-canvas-failed");

          canvas.width = viewport.width;
          canvas.height = viewport.height;
          canvas.setAttribute("class", "block h-auto w-full bg-white");
          await page.render({
            canvas,
            canvasContext: context,
            viewport,
          }).promise;
          if (cancelled.current) return;
          pageHost.append(canvas);
        }

        setKind("pdf");
        setStatus("ready");
      } catch {
        if (!cancelled.current) {
          pageHost.replaceChildren();
          setStatus("error");
        }
      }
    }

    void render();

    return () => {
      cancelled.current = true;
      pdfDocument?.cleanup().catch(() => undefined);
      for (const url of objectUrls) URL.revokeObjectURL(url);
    };
  }, [src]);

  return (
    <div ref={wrapperRef} className="overflow-hidden rounded-md bg-white">
      {status === "loading" ? (
        <p className="m-0 px-4 py-16 text-center text-sm text-muted">
          Loading certificate…
        </p>
      ) : null}

      {status === "error" ? (
        <p className="m-0 px-4 py-16 text-center text-sm text-muted">
          Preview isn’t available here. Use View certificate or Download PDF.
        </p>
      ) : null}

      {kind === "image" && imageUrl && status === "ready" ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={imageUrl} alt={title} className="h-auto w-full" />
      ) : null}

      <div
        ref={pagesRef}
        className={
          status === "ready" && kind === "pdf"
            ? "w-full bg-white"
            : "h-0 w-full overflow-hidden"
        }
        aria-label={title}
      />
    </div>
  );
}

function detectKind(contentType: string, bytes: Uint8Array): PreviewKind {
  const mime = contentType.split(";")[0]?.trim().toLowerCase() ?? "";
  if (mime.startsWith("image/")) return "image";
  if (mime.includes("pdf")) return "pdf";
  if (
    bytes.length >= 4 &&
    bytes[0] === 0x25 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x44 &&
    bytes[3] === 0x46
  ) {
    return "pdf";
  }
  if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
    return "image";
  }
  if (
    bytes.length >= 8 &&
    bytes[0] === 0x89 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x4e &&
    bytes[3] === 0x47
  ) {
    return "image";
  }
  return "pdf";
}
