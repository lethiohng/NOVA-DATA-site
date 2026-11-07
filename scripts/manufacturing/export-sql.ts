// Xuất schema + dữ liệu NOVA MANUFACTURING thành file SQL để trình duyệt nạp vào PGlite.
// Chạy: npx tsx scripts/manufacturing/export-sql.ts  → public/data/manufacturing.sql
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { generateManufacturingData, MANUFACTURING_TABLES, type Row } from "./data";

const lit = (v: string | number | null) => {
  if (v === null || v === undefined) return "NULL";
  if (typeof v === "number") return String(v);
  return `'${String(v).replace(/'/g, "''")}'`;
};

const schema = readFileSync(path.join(process.cwd(), "supabase", "manufacturing_schema.sql"), "utf8");
const tables = generateManufacturingData();
const parts: string[] = [schema, ""];

for (const name of MANUFACTURING_TABLES) {
  const rows = tables[name] as Row[];
  if (!rows.length) continue;
  const cols = Object.keys(rows[0]);
  for (let i = 0; i < rows.length; i += 500) {
    const values = rows.slice(i, i + 500).map((r) => `(${cols.map((c) => lit(r[c])).join(", ")})`);
    parts.push(`INSERT INTO ${name} (${cols.join(", ")}) VALUES\n${values.join(",\n")};`);
  }
}

const out = path.join(process.cwd(), "public", "data", "manufacturing.sql");
writeFileSync(out, parts.join("\n") + "\n", "utf8");
console.log("Đã ghi", out);
