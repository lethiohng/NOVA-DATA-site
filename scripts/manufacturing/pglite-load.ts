// Nạp schema và dữ liệu vào PostgreSQL trong bộ nhớ (PGlite) để kiểm tra bài tập.
import { readFileSync } from "node:fs";
import path from "node:path";
import { PGlite } from "@electric-sql/pglite";
import { generateManufacturingData, MANUFACTURING_TABLES, type Tables } from "./data";

export async function loadIntoPglite(): Promise<{ db: PGlite; tables: Tables }> {
  const db = new PGlite();
  const schema = readFileSync(path.join(process.cwd(), "supabase", "manufacturing_schema.sql"), "utf8");
  await db.exec(schema);

  const tables = generateManufacturingData();
  for (const name of MANUFACTURING_TABLES) {
    const rows = tables[name];
    if (!rows.length) continue;
    const cols = Object.keys(rows[0]);
    const BATCH = 200;
    for (let i = 0; i < rows.length; i += BATCH) {
      const slice = rows.slice(i, i + BATCH);
      const params: (string | number | null)[] = [];
      const values = slice.map((row) => {
        const marks = cols.map((c) => {
          params.push(row[c]);
          return `$${params.length}`;
        });
        return `(${marks.join(", ")})`;
      });
      await db.query(`INSERT INTO ${name} (${cols.join(", ")}) OVERRIDING SYSTEM VALUE VALUES ${values.join(", ")}`, params);
    }
  }
  return { db, tables };
}
