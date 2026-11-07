// Vẽ sơ đồ ERD thật của bộ dữ liệu NOVA từ schema trong public/data/manufacturing.sql (cùng schema đã load vào Supabase).
// Kết quả: public/images/erd-manufacturing.svg. Chạy lại khi đổi schema: npx tsx scripts/build-erd.ts
import { PGlite } from "@electric-sql/pglite";
import { readFileSync, writeFileSync } from "node:fs";

type Col = { name: string; type: string; pk: boolean; fk: boolean };
type Table = { name: string; cols: Col[]; x: number; y: number; h: number };

// Bố cục theo nhóm nghiệp vụ, mỗi cột là một nhóm.
const LAYOUT: string[][] = [
  ["departments", "shifts", "employees", "production_lines", "machines", "products"],
  ["production_orders", "production_records", "machine_cycles"],
  ["defect_types", "quality_inspections", "downtime_reasons", "downtime_events"],
  ["materials", "material_transactions"],
];
const COL_W = 300;
const GAP_X = 60;
const GAP_Y = 36;
const HEAD = 34;
const ROW = 20;
const PAD_X = 40;
const PAD_Y = 40;

(async () => {
  const db = new PGlite();
  await db.exec(readFileSync("public/data/manufacturing.sql", "utf8"));

  const colsRes = await db.query<{ table_name: string; column_name: string; type: string }>(`
    SELECT c.relname AS table_name, a.attname AS column_name, format_type(a.atttypid, a.atttypmod) AS type
    FROM pg_attribute a JOIN pg_class c ON c.oid = a.attrelid JOIN pg_namespace n ON n.oid = c.relnamespace
    WHERE n.nspname = 'public' AND c.relkind = 'r' AND a.attnum > 0 AND NOT a.attisdropped
    ORDER BY c.relname, a.attnum`);
  const pkRes = await db.query<{ table_name: string; column_name: string }>(`
    SELECT c.relname AS table_name, a.attname AS column_name
    FROM pg_constraint k JOIN pg_class c ON c.oid = k.conrelid JOIN pg_attribute a ON a.attrelid = c.oid AND a.attnum = ANY(k.conkey)
    WHERE k.contype = 'p'`);
  const fkRes = await db.query<{ table_name: string; column_name: string; ref_table: string; ref_column: string }>(`
    SELECT c.relname AS table_name, a.attname AS column_name, rc.relname AS ref_table, ra.attname AS ref_column
    FROM pg_constraint k JOIN pg_class c ON c.oid = k.conrelid JOIN pg_class rc ON rc.oid = k.confrelid
    JOIN pg_attribute a ON a.attrelid = c.oid AND a.attnum = k.conkey[1]
    JOIN pg_attribute ra ON ra.attrelid = rc.oid AND ra.attnum = k.confkey[1]
    WHERE k.contype = 'f'`);

  const pk = new Set(pkRes.rows.map((r) => `${r.table_name}.${r.column_name}`));
  const fk = new Set(fkRes.rows.map((r) => `${r.table_name}.${r.column_name}`));
  const byName = new Map<string, Col[]>();
  for (const r of colsRes.rows) {
    if (!byName.has(r.table_name)) byName.set(r.table_name, []);
    byName.get(r.table_name)!.push({ name: r.column_name, type: r.type, pk: pk.has(`${r.table_name}.${r.column_name}`), fk: fk.has(`${r.table_name}.${r.column_name}`) });
  }

  const tables: Table[] = [];
  LAYOUT.forEach((group, gi) => {
    let y = PAD_Y;
    for (const name of group) {
      const cols = byName.get(name) ?? [];
      const h = HEAD + cols.length * ROW + 10;
      tables.push({ name, cols, x: PAD_X + gi * (COL_W + GAP_X), y, h });
      y += h + GAP_Y;
    }
  });
  const placed = new Set(tables.map((t) => t.name));
  const missing = [...byName.keys()].filter((n) => !placed.has(n));
  if (missing.length) throw new Error("Bảng chưa có trong bố cục: " + missing.join(", "));

  const center = (t: Table) => ({ x: t.x + COL_W / 2, y: t.y + t.h / 2 });
  const T = new Map(tables.map((t) => [t.name, t]));
  const width = PAD_X * 2 + LAYOUT.length * COL_W + (LAYOUT.length - 1) * GAP_X;
  const height = Math.max(...tables.map((t) => t.y + t.h)) + PAD_Y;

  const lines = fkRes.rows.map((r) => {
    const a = T.get(r.table_name)!;
    const b = T.get(r.ref_table)!;
    const ca = center(a);
    const cb = center(b);
    // Đường nối từ cạnh gần nhất của bảng con tới bảng cha.
    const ax = ca.x < cb.x ? a.x + COL_W : a.x;
    const bx = ca.x < cb.x ? b.x : b.x + COL_W;
    return `<path d="M${ax} ${ca.y} C${(ax + bx) / 2} ${ca.y}, ${(ax + bx) / 2} ${cb.y}, ${bx} ${cb.y}" fill="none" stroke="#94a3b8" stroke-width="1.5"/>`;
  });

  const boxes = tables.map((t) => {
    const rows = t.cols
      .map((c, i) => {
        const y = t.y + HEAD + i * ROW + 14;
        const mark = c.pk ? "PK" : c.fk ? "FK" : "";
        const markColor = c.pk ? "#e11d48" : "#0284c7";
        return `<text x="${t.x + 12}" y="${y}" font-size="12" fill="#0f172a" font-family="Consolas, monospace">${esc(c.name)}</text>
<text x="${t.x + COL_W - 12}" y="${y}" font-size="11" text-anchor="end" fill="#64748b" font-family="Consolas, monospace">${esc(c.type)}</text>
${mark ? `<text x="${t.x + COL_W - 90}" y="${y}" font-size="10" font-weight="700" fill="${markColor}" font-family="Consolas, monospace">${mark}</text>` : ""}`;
      })
      .join("\n");
    return `<g>
<rect x="${t.x}" y="${t.y}" width="${COL_W}" height="${t.h}" rx="10" fill="#ffffff" stroke="#cbd5e1"/>
<rect x="${t.x}" y="${t.y}" width="${COL_W}" height="${HEAD}" rx="10" fill="#0f172a"/>
<rect x="${t.x}" y="${t.y + HEAD - 10}" width="${COL_W}" height="10" fill="#0f172a"/>
<text x="${t.x + 12}" y="${t.y + 22}" font-size="13" font-weight="700" fill="#ffffff" font-family="Arial, sans-serif">${esc(t.name)}</text>
${rows}
</g>`;
  });

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
<rect width="100%" height="100%" fill="#f8fafc"/>
${lines.join("\n")}
${boxes.join("\n")}
</svg>
`;
  writeFileSync("public/images/erd-manufacturing.svg", svg);
  console.log("bảng:", tables.length, "| khóa ngoại:", fkRes.rows.length, "| kích thước:", width, "x", height);
  await db.close();
})();

function esc(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
