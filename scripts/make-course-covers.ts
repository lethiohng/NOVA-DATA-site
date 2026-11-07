// Tạo ảnh bìa cho 3 khóa SQL (Beginner, Intermediate, Advanced) rồi tải lên Supabase Storage (bucket "Data Fundamentals").
// Tên file: "Courses_sql-<level>.jpg". Chạy: npx tsx --env-file=.env.local scripts/make-course-covers.ts
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

function box(x: number, y: number, w: number, h: number) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="rgba(255,255,255,0.14)" stroke="#fff" stroke-width="2"/>`;
}
function bar(x: number, y: number, w: number) {
  return `<rect x="${x}" y="${y}" width="${w}" height="12" rx="6" fill="rgba(255,255,255,0.55)"/>`;
}
function dot(cx: number, cy: number, r = 12, fill = "#fff") {
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}"/>`;
}
const line = (x1: number, y1: number, x2: number, y2: number, dash = false) =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#fff" stroke-width="3" stroke-linecap="round"${dash ? ' stroke-dasharray="8 8"' : ""}/>`;

const motifs: Record<string, string> = {
  // Lọc dữ liệu: khung truy vấn, phễu lọc
  beginner:
    box(20, 20, 330, 240) +
    `<rect x="20" y="20" width="330" height="40" rx="10" fill="rgba(255,255,255,0.3)"/>` +
    bar(50, 110, 190) + bar(50, 150, 260) + bar(50, 190, 150) +
    `<polygon points="300,30 340,30 320,60 320,85 300,95 300,60" fill="#fff"/>`,
  // Kết hợp bảng: hai bảng nối bằng JOIN
  intermediate:
    box(20, 90, 150, 130) + bar(40, 120, 110) + bar(40, 150, 110) + bar(40, 180, 110) +
    box(230, 50, 150, 130) + bar(250, 80, 110) + bar(250, 110, 110) + bar(250, 140, 110) +
    line(170, 155, 230, 115) + dot(170, 155) + dot(230, 115) +
    line(170, 165, 260, 230, true) + dot(260, 230, 9),
  // Nâng cao: danh sách có thứ tự và mũi tên đi lên
  advanced:
    box(20, 40, 330, 210) +
    line(40, 70, 40, 200) +
    dot(40, 90, 14) + dot(40, 150, 14) + dot(40, 210, 14) +
    bar(70, 84, 220) + bar(70, 144, 180) + bar(70, 204, 140) +
    `<path d="M320 200 L320 110 M300 130 L320 110 L340 130" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>`,
};

const COURSES: { level: string; title: string }[] = [
  { level: "beginner", title: "SQL Basic" },
  { level: "intermediate", title: "SQL Intermediate" },
  { level: "advanced", title: "SQL Advanced" },
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
  <text x="80" y="150" font-family="Arial, sans-serif" font-size="30" font-weight="700" letter-spacing="6" fill="#fca5a5">SQL COURSE</text>
  <text x="80" y="330" font-family="Arial, sans-serif" font-size="84" font-weight="700" fill="#ffffff">${title}</text>
  <rect x="80" y="370" width="120" height="6" rx="3" fill="#ec3a3a"/>
  <text x="80" y="600" font-family="Arial, sans-serif" font-size="26" font-weight="700" letter-spacing="4" fill="rgba(255,255,255,0.7)">NOVA DATA</text>
  <g transform="translate(760,190)">${motif}</g>
</svg>`;
}

async function main() {
  for (const c of COURSES) {
    const jpg = await sharp(Buffer.from(cardSvg(c.title, motifs[c.level]))).jpeg({ quality: 88 }).toBuffer();
    const name = `Courses_sql-${c.level}.jpg`;
    const { error } = await db.storage.from("Data Fundamentals").upload(name, jpg, { contentType: "image/jpeg", upsert: true });
    if (error) throw new Error(`upload ${name}: ${error.message}`);
    console.log("ok", name);
  }
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
