// Tạo ảnh bìa minh họa cho các chủ đề Data Fundamentals rồi tải lên Supabase Storage (bucket "Data Fundamentals").
// Tên file: "Data Fundamentals_<slug>.jpg", khớp với cách đặt tên ảnh của bài Database.
// Chạy: npx tsx --env-file=.env.local scripts/make-topic-thumbs.ts
import sharp from "sharp";
import { createClient } from "@supabase/supabase-js";
import WebSocket from "ws";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const db = createClient(url, key, {
  auth: { persistSession: false },
  realtime: { transport: WebSocket as unknown as typeof globalThis.WebSocket },
});

const W = 1200;
const H = 675;

/* Hình minh họa trong vùng 400 x 300, sẽ được đặt bên phải ảnh. */

function table(x: number, y: number, w: number, rows: number, head: string) {
  const h = 28 + rows * 26;
  let s = `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="rgba(255,255,255,0.12)" stroke="#fff" stroke-width="2"/>`;
  s += `<rect x="${x}" y="${y}" width="${w}" height="28" rx="6" fill="rgba(255,255,255,0.35)"/>`;
  s += `<text x="${x + 12}" y="${y + 20}" font-size="15" font-weight="700" fill="#fff">${head}</text>`;
  for (let i = 0; i < rows; i++) {
    const ly = y + 28 + i * 26;
    s += `<line x1="${x}" y1="${ly}" x2="${x + w}" y2="${ly}" stroke="#fff" stroke-opacity="0.4"/>`;
  }
  return s;
}

function cylinder(x: number, y: number, w: number, h: number, label: string) {
  const rx = w / 2;
  return (
    `<path d="M${x} ${y + 12} L${x} ${y + h - 12} A${rx} 12 0 0 0 ${x + w} ${y + h - 12} L${x + w} ${y + 12} Z" fill="rgba(255,255,255,0.12)" stroke="#fff" stroke-width="2"/>` +
    `<ellipse cx="${x + rx}" cy="${y + 12}" rx="${rx}" ry="12" fill="rgba(255,255,255,0.3)" stroke="#fff" stroke-width="2"/>` +
    `<text x="${x + w / 2}" y="${y + h / 2 + 6}" text-anchor="middle" font-size="16" font-weight="700" fill="#fff">${label}</text>`
  );
}

function chip(x: number, y: number, label: string) {
  return (
    `<rect x="${x}" y="${y}" width="230" height="40" rx="20" fill="rgba(255,255,255,0.14)" stroke="#fff" stroke-width="2"/>` +
    `<text x="${x + 115}" y="${y + 26}" text-anchor="middle" font-size="17" font-weight="700" fill="#fff">${label}</text>`
  );
}

function node(cx: number, cy: number, label: string) {
  return (
    `<circle cx="${cx}" cy="${cy}" r="34" fill="rgba(255,255,255,0.14)" stroke="#fff" stroke-width="2"/>` +
    `<text x="${cx}" y="${cy + 6}" text-anchor="middle" font-size="16" font-weight="700" fill="#fff">${label}</text>`
  );
}

function box(x: number, y: number, w: number, h: number, label: string) {
  return (
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="rgba(255,255,255,0.14)" stroke="#fff" stroke-width="2"/>` +
    `<text x="${x + w / 2}" y="${y + h / 2 + 6}" text-anchor="middle" font-size="16" font-weight="700" fill="#fff">${label}</text>`
  );
}

const line = (x1: number, y1: number, x2: number, y2: number) =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#fff" stroke-width="3" stroke-linecap="round"/>`;

const motifs: Record<string, string> = {
  "database-systems": cylinder(40, 20, 200, 80, "OLTP") + cylinder(40, 110, 200, 80, "OLAP") + cylinder(40, 200, 200, 80, "NoSQL"),
  "relational-database": table(20, 40, 170, 4, "production_lines") + table(210, 120, 170, 4, "production_orders") + line(190, 70, 230, 120),
  "data-types": chip(60, 20, "INT") + chip(60, 80, "DECIMAL(10,2)") + chip(60, 140, "VARCHAR(20)") + chip(60, 200, "DATE") + chip(60, 260, "BOOLEAN"),
  keys:
    `<circle cx="110" cy="150" r="52" fill="none" stroke="#fff" stroke-width="10"/>` +
    line(160, 150, 340, 150) + line(280, 150, 280, 185) + line(320, 150, 320, 180) +
    `<text x="110" y="156" text-anchor="middle" font-size="22" font-weight="700" fill="#fff">PK</text>`,
  relationships:
    line(90, 70, 310, 70) + line(90, 70, 200, 250) + line(310, 70, 200, 250) +
    node(90, 70, "A") + node(310, 70, "B") + node(200, 250, "C"),
  constraints:
    `<path d="M200 30 L320 70 L320 160 Q320 240 200 285 Q80 240 80 160 L80 70 Z" fill="rgba(255,255,255,0.12)" stroke="#fff" stroke-width="3"/>` +
    `<path d="M150 160 L190 200 L262 118" fill="none" stroke="#fff" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/>`,
  normalization:
    table(20, 20, 360, 4, "output_flat") +
    `<path d="M200 170 L200 205" stroke="#fff" stroke-width="3"/><path d="M190 198 L200 212 L210 198" fill="none" stroke="#fff" stroke-width="3"/>` +
    table(20, 220, 170, 2, "lines_n") + table(210, 220, 170, 2, "output_n"),
  erd:
    table(20, 30, 150, 2, "PRODUCTS") + table(230, 30, 150, 2, "LINES") + table(125, 180, 150, 3, "ORDERS") +
    line(170, 70, 200, 180) + line(230, 70, 200, 180),
  "database-design":
    [0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => line(20 + i * 45, 20, 20 + i * 45, 280)).join("") +
    [0, 1, 2, 3, 4, 5, 6].map((i) => line(20, 20 + i * 45, 380, 20 + i * 45)).join("") +
    `<rect x="65" y="65" width="150" height="90" rx="8" fill="rgba(255,255,255,0.18)" stroke="#fff" stroke-width="3"/>` +
    `<rect x="215" y="155" width="120" height="80" rx="8" fill="rgba(255,255,255,0.18)" stroke="#fff" stroke-width="3"/>` +
    line(140, 155, 140, 195) + line(140, 195, 215, 195),
  database:
    cylinder(40, 60, 150, 110, "DB") + line(190, 115, 240, 115) +
    table(240, 60, 150, 4, "orders"),
  etl:
    box(10, 110, 110, 80, "Extract") + line(120, 150, 150, 150) +
    box(150, 110, 110, 80, "Transform") + line(260, 150, 290, 150) +
    box(290, 110, 100, 80, "Load"),
  "data-warehouse":
    cylinder(60, 20, 280, 100, "WAREHOUSE") +
    line(200, 120, 90, 200) + line(200, 120, 200, 200) + line(200, 120, 310, 200) +
    box(20, 200, 140, 56, "Sales") + box(230, 200, 150, 56, "Production"),
};

const TOPICS: { slug: string; title: string }[] = [
  { slug: "database", title: "Database" },
  { slug: "database-systems", title: "Database Systems" },
  { slug: "relational-database", title: "Relational Database" },
  { slug: "data-types", title: "Data Types" },
  { slug: "keys", title: "Keys" },
  { slug: "relationships", title: "Relationships" },
  { slug: "constraints", title: "Constraints" },
  { slug: "normalization", title: "Normalization" },
  { slug: "erd", title: "ERD" },
  { slug: "database-design", title: "Database Design" },
  { slug: "etl", title: "ETL" },
  { slug: "data-warehouse", title: "Data Warehouse" },
];

function cardSvg(title: string, motif: string) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0f1f3d"/>
      <stop offset="0.6" stop-color="#13264f"/>
      <stop offset="1" stop-color="#d71920"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <circle cx="1100" cy="80" r="220" fill="rgba(255,255,255,0.05)"/>
  <circle cx="60" cy="640" r="160" fill="rgba(255,255,255,0.04)"/>
  <text x="80" y="150" font-family="Arial, sans-serif" font-size="30" font-weight="700" letter-spacing="6" fill="#fca5a5">DATA FUNDAMENTALS</text>
  <text x="80" y="330" font-family="Arial, sans-serif" font-size="84" font-weight="700" fill="#ffffff">${title}</text>
  <rect x="80" y="370" width="120" height="6" rx="3" fill="#ec3a3a"/>
  <text x="80" y="600" font-family="Arial, sans-serif" font-size="26" font-weight="700" letter-spacing="4" fill="rgba(255,255,255,0.7)">NOVA DATA</text>
  <g transform="translate(760,190)">${motif}</g>
</svg>`;
}

async function main() {
  for (const t of TOPICS) {
    const name = `Data Fundamentals_${t.slug}.jpg`;
    if (t.slug === "database" && !process.env.SKIP_BACKUP) {
      // Sao lưu ảnh gốc (ảnh tải lên trước đó) trước khi ghi đè bằng ảnh cùng phong cách.
      const current = await fetch(`${url}/storage/v1/object/public/Data%20Fundamentals/${encodeURIComponent(name)}`);
      if (current.ok) {
        const backup = Buffer.from(await current.arrayBuffer());
        const { error: bErr } = await db.storage.from("Data Fundamentals").upload("Data Fundamentals_database-original.jpg", backup, { contentType: "image/jpeg", upsert: true });
        if (bErr) throw new Error(`backup: ${bErr.message}`);
        console.log("backup ok: Data Fundamentals_database-original.jpg");
      }
    }
    const jpg = await sharp(Buffer.from(cardSvg(t.title, motifs[t.slug]))).jpeg({ quality: 88 }).toBuffer();
    const { error } = await db.storage.from("Data Fundamentals").upload(name, jpg, { contentType: "image/jpeg", upsert: true });
    if (error) throw new Error(`upload ${name}: ${error.message}`);
    console.log("ok", name);
  }
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
