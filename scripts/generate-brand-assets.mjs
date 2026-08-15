/**
 * Generates Biotech Laboratory favicon + OG rasters from the brand mark SVG.
 * Run: node scripts/generate-brand-assets.mjs
 */
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const publicDir = join(root, "public");
const appDir = join(root, "src", "app");

const NAVY = "#091628";
const BLUE = "#1E5BD9";

const markSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64" fill="none">
  <rect width="64" height="64" rx="16" fill="${NAVY}"/>
  <path d="M32 18.5V28.2M32 35.8V45.5M22.2 39.2 29.4 34.6M34.6 29.4 41.8 24.8M22.2 24.8 29.4 29.4M34.6 34.6 41.8 39.2"
    stroke="rgba(255,255,255,0.88)" stroke-width="2.4" stroke-linecap="round"/>
  <circle cx="32" cy="16.5" r="4.1" fill="${BLUE}"/>
  <circle cx="32" cy="47.5" r="4.1" fill="#ffffff"/>
  <circle cx="20" cy="22.5" r="3.7" fill="#ffffff"/>
  <circle cx="44" cy="22.5" r="3.7" fill="#ffffff"/>
  <circle cx="20" cy="41.5" r="3.7" fill="#ffffff"/>
  <circle cx="44" cy="41.5" r="3.7" fill="#ffffff"/>
  <circle cx="32" cy="32" r="5.1" fill="${BLUE}"/>
  <circle cx="32" cy="32" r="2.1" fill="#ffffff"/>
</svg>`;

const ogSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <rect width="1200" height="630" fill="${NAVY}"/>
  <circle cx="1120" cy="40" r="260" fill="${BLUE}" fill-opacity="0.16"/>
  <circle cx="60" cy="580" r="200" fill="${BLUE}" fill-opacity="0.1"/>
  <g transform="translate(170,235)">
    <rect width="120" height="120" rx="30" fill="#13283f"/>
    <g transform="translate(12,12) scale(1.5)">
      <path d="M32 18.5V28.2M32 35.8V45.5M22.2 39.2 29.4 34.6M34.6 29.4 41.8 24.8M22.2 24.8 29.4 29.4M34.6 34.6 41.8 39.2"
        stroke="rgba(255,255,255,0.88)" stroke-width="2.4" stroke-linecap="round"/>
      <circle cx="32" cy="16.5" r="4.1" fill="${BLUE}"/>
      <circle cx="32" cy="47.5" r="4.1" fill="#ffffff"/>
      <circle cx="20" cy="22.5" r="3.7" fill="#ffffff"/>
      <circle cx="44" cy="22.5" r="3.7" fill="#ffffff"/>
      <circle cx="20" cy="41.5" r="3.7" fill="#ffffff"/>
      <circle cx="44" cy="41.5" r="3.7" fill="#ffffff"/>
      <circle cx="32" cy="32" r="5.1" fill="${BLUE}"/>
      <circle cx="32" cy="32" r="2.1" fill="#ffffff"/>
    </g>
  </g>
  <text x="330" y="310" fill="#ffffff" font-family="Arial Black, Helvetica Neue, Arial, sans-serif" font-size="72" font-weight="800" letter-spacing="-2.4">BIOTECH</text>
  <text x="334" y="362" fill="#b7cdf7" font-family="Helvetica Neue, Arial, sans-serif" font-size="26" font-weight="700" letter-spacing="8">LABORATORY</text>
  <text x="330" y="430" fill="rgba(255,255,255,0.55)" font-family="Helvetica Neue, Arial, sans-serif" font-size="22" font-weight="500" letter-spacing="0.5">Specialty analytical testing</text>
</svg>`;

/** PNG-in-ICO container (supported by modern browsers). */
function pngToIco(pngBuffer, size = 32) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(1, 4);

  const entry = Buffer.alloc(16);
  entry.writeUInt8(size >= 256 ? 0 : size, 0);
  entry.writeUInt8(size >= 256 ? 0 : size, 1);
  entry.writeUInt8(0, 2);
  entry.writeUInt8(0, 3);
  entry.writeUInt16LE(1, 4);
  entry.writeUInt16LE(32, 6);
  entry.writeUInt32LE(pngBuffer.length, 8);
  entry.writeUInt32LE(22, 12);

  return Buffer.concat([header, entry, pngBuffer]);
}

async function main() {
  const png32 = await sharp(Buffer.from(markSvg)).resize(32, 32).png().toBuffer();
  const png48 = await sharp(Buffer.from(markSvg)).resize(48, 48).png().toBuffer();
  const png180 = await sharp(Buffer.from(markSvg)).resize(180, 180).png().toBuffer();
  const png512 = await sharp(Buffer.from(markSvg)).resize(512, 512).png().toBuffer();

  // App Router file conventions — Next injects correct <link> tags
  writeFileSync(join(appDir, "icon.png"), png48);
  writeFileSync(join(appDir, "apple-icon.png"), png180);
  console.log("✓ src/app/icon.png");
  console.log("✓ src/app/apple-icon.png");

  // Public fallbacks (direct /favicon.ico requests + cached bookmarks)
  writeFileSync(join(publicDir, "favicon.ico"), pngToIco(png32, 32));
  writeFileSync(join(publicDir, "favicon-32x32.png"), png32);
  writeFileSync(join(publicDir, "apple-touch-icon.png"), png180);
  writeFileSync(join(publicDir, "icon.png"), png512);
  console.log("✓ public/favicon.ico (real ICO)");
  console.log("✓ public/favicon-32x32.png");
  console.log("✓ public/apple-touch-icon.png");
  console.log("✓ public/icon.png");

  writeFileSync(
    join(publicDir, "og-image.png"),
    await sharp(Buffer.from(ogSvg)).png().toBuffer(),
  );
  console.log("✓ public/og-image.png");

  // Keep a copy of the mark SVG for design handoff only if needed — skip unused logos
  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
