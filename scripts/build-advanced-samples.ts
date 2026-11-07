// Tạo src/lib/sql-advanced/sample-tables.json: với mỗi bài SQL Advanced, lấy MỌI bảng được dùng trong ví dụ và bài tập,
// kèm tên cột, kiểu dữ liệu và 5 dòng đầu. Chạy lại khi đổi ví dụ hoặc bài tập: npx tsx scripts/build-advanced-samples.ts
import { PGlite } from "@electric-sql/pglite";
import { readFileSync, writeFileSync } from "node:fs";
import { ADVANCED_LESSONS } from "../src/lib/sql-advanced";
import { tablesIn } from "../src/lib/dataset-tables";

type Sample = { table: string; columns: { name: string; type: string }[]; rows: string[][] };

const fmt = (v: unknown): string => {
  if (v === null || v === undefined) return "NULL";
  if (v instanceof Date) return v.toISOString().replace("T", " ").slice(0, 16);
  return String(v);
};

(async () => {
  const db = new PGlite();
  await db.exec(readFileSync("public/data/manufacturing.sql", "utf8"));
  const out: Record<string, Sample[]> = {};

  for (const lesson of ADVANCED_LESSONS) {
    const sqls = [lesson.example.sql, ...lesson.practice.map((p) => p.solution)];
    const tables = [...new Set(sqls.flatMap((s) => tablesIn(s)))];
    out[lesson.id] = [];
    for (const table of tables) {
      const cols = await db.query<{ column_name: string; data_type: string }>(
        `SELECT column_name, data_type FROM information_schema.columns
         WHERE table_schema = 'public' AND table_name = $1 ORDER BY ordinal_position`,
        [table],
      );
      const names = cols.rows.map((c) => c.column_name);
      const data = await db.query<Record<string, unknown>>(`SELECT * FROM ${table} ORDER BY 1 LIMIT 5`);
      out[lesson.id].push({
        table,
        columns: cols.rows.map((c) => ({ name: c.column_name, type: c.data_type })),
        rows: data.rows.map((r) => names.map((n) => fmt(r[n]))),
      });
    }
  }

  writeFileSync("src/lib/sql-advanced/sample-tables.json", JSON.stringify(out, null, 2));
  await db.close();
  console.log("written:", Object.keys(out).length, "bài");
})();
