// Kiểm tra lớp sân chơi SQL trong Node (cùng mã với trình duyệt, chỉ khác cách nạp file).
import { readFileSync } from "node:fs";
import path from "node:path";
import { createSandbox } from "../src/lib/sql-sandbox";

async function main() {
  const sb = createSandbox(async () => readFileSync(path.join(process.cwd(), "public", "data", "manufacturing.sql"), "utf8"));
  const ok = await sb.run("SELECT line_code, location FROM production_lines ORDER BY line_code");
  console.log("select:", ok.error ?? `${ok.rowCount} dòng`, ok.columns);
  const bad = await sb.run("SELECT no_such_column FROM production_lines");
  console.log("lỗi đúng:", bad.error);
  await sb.run("DELETE FROM production_lines");
  const after = await sb.run("SELECT COUNT(*)::int AS n FROM production_lines");
  console.log("sau DELETE (phải còn 4):", after.rows[0]);
  const tables = await sb.listTables();
  console.log("số bảng:", tables.length, tables.map((t) => `${t.name}(${t.rowCount})`).join(", "));
}
main().catch((e) => {
  console.error(e);
  process.exit(1);
});
