/**
 * Certificate archive viewer — structural match to BioSynteq’s
 * certificate-demo + document-sheet, with an SVG certificate document.
 */
export function CertificateViewer() {
  return (
    <div
      className="overflow-hidden border border-[color:var(--line)] bg-paper shadow-elevated"
      aria-label="Certificate lookup interface illustration"
    >
      <div className="flex flex-col gap-2 border-b border-[color:var(--line)] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-5 sm:px-5 sm:py-[17px]">
        <div className="grid gap-[3px]">
          <span className="inline-flex items-center gap-2.5 text-[0.63rem] font-semibold tracking-[0.06em] text-[#065f46] uppercase">
            <i
              className="inline-block size-[7px] rounded-full bg-[#065f46] shadow-[0_0_0_5px_rgba(6,95,70,0.12)]"
              aria-hidden="true"
            />
            Archive record
          </span>
          <strong className="font-display text-[0.86rem] font-semibold text-navy">
            Certificate viewer
          </strong>
        </div>
        <span className="shrink-0 text-[0.68rem] font-semibold text-navy">
          Issued record
        </span>
      </div>

      <div
        className="grid min-h-[320px] place-items-center px-4 py-6 sm:min-h-[420px] sm:px-[18px] sm:py-8 md:min-h-[510px] md:px-[50px] md:py-[50px]"
        style={{
          backgroundColor: "#e2e8f0",
          backgroundImage:
            "linear-gradient(rgba(9,22,40,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(9,22,40,0.04) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      >
        <CertificateDocumentSvg />
      </div>

      <div className="flex flex-col gap-1 border-t border-[color:var(--line)] px-4 py-4 text-[0.64rem] text-muted sm:flex-row sm:items-center sm:justify-between sm:gap-5 sm:px-5 sm:py-[17px]">
        <span>Original certificate file</span>
        <span>Fit to viewer · Unobstructed</span>
      </div>
    </div>
  );
}

function CertificateDocumentSvg() {
  const W = 300;
  const H = 388;
  const x = 30;
  const inner = W - 60; // 240

  // Meta grid: 1fr / 1.25fr
  const metaGap = 3;
  const metaCol1 = (inner - metaGap) * (1 / 2.25);
  const metaCol2 = (inner - metaGap) * (1.25 / 2.25);
  const metaTop = 38 + 17 + 24 + 10 + 28; // brand + mb + title + mb ≈ 117

  // Table grid: 0.7fr / 1.3fr
  const tableGap = 3;
  const tableCol1 = (inner - tableGap) * 0.35;
  const tableCol2 = (inner - tableGap) * 0.65;
  const tableTop = metaTop + 28 * 2 + metaGap + 34;

  const rowH = 28;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label="Illustrative certificate of analysis document"
      className="h-auto w-[min(300px,78%)]"
      style={{ aspectRatio: "0.773" }}
    >
      <defs>
        <pattern
          id="coaSealStripes"
          patternUnits="userSpaceOnUse"
          width="6"
          height="6"
          patternTransform="rotate(45)"
        >
          <rect width="3" height="6" fill="#091628" />
          <rect x="3" width="3" height="6" fill="#ffffff" />
        </pattern>
      </defs>

      {/* Sheet */}
      <rect
        width={W}
        height={H}
        fill="#ffffff"
        style={{ filter: "drop-shadow(0 22px 55px rgba(9,22,40,0.14))" }}
      />

      {/* Brand bar */}
      <rect x={x} y="38" width={inner * 0.44} height="17" fill="#94a3b8" />

      {/* Title bar */}
      <rect x={x} y="79" width={inner * 0.72} height="10" fill="#091628" />

      {/* Meta — 2 rows × 2 cols */}
      <rect x={x} y={metaTop} width={metaCol1} height={rowH} fill="#475569" />
      <rect
        x={x + metaCol1 + metaGap}
        y={metaTop}
        width={metaCol2}
        height={rowH}
        fill="#cbd5e1"
      />
      <rect
        x={x}
        y={metaTop + rowH + metaGap}
        width={metaCol1}
        height={rowH}
        fill="#475569"
      />
      <rect
        x={x + metaCol1 + metaGap}
        y={metaTop + rowH + metaGap}
        width={metaCol2}
        height={rowH}
        fill="#cbd5e1"
      />

      {/* Table — 2 rows × 2 cols (narrower left) */}
      <rect x={x} y={tableTop} width={tableCol1} height={rowH} fill="#475569" />
      <rect
        x={x + tableCol1 + tableGap}
        y={tableTop}
        width={tableCol2}
        height={rowH}
        fill="#cbd5e1"
      />
      <rect
        x={x}
        y={tableTop + rowH + tableGap}
        width={tableCol1}
        height={rowH}
        fill="#475569"
      />
      <rect
        x={x + tableCol1 + tableGap}
        y={tableTop + rowH + tableGap}
        width={tableCol2}
        height={rowH}
        fill="#cbd5e1"
      />

      {/* Signature rule */}
      <rect
        x={x}
        y={H - 38 - 34}
        width={inner * 0.38}
        height="3"
        fill="#091628"
      />

      {/* Security seal */}
      <rect
        x={W - 30 - 54}
        y={H - 38 - 54}
        width="54"
        height="54"
        fill="url(#coaSealStripes)"
      />
    </svg>
  );
}
