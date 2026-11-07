// Kiểm tra hàm chấm: câu đúng, câu sai, câu lỗi, và đáp án có ORDER BY.
import { readFileSync } from "node:fs";
import path from "node:path";
import { createSandbox } from "../src/lib/sql-sandbox";
import { manufacturingExercises } from "./manufacturing/exercises";

async function main() {
  const sb = createSandbox(async () => readFileSync(path.join(process.cwd(), "public", "data", "manufacturing.sql"), "utf8"));
  const ex = manufacturingExercises[0];
  console.log("đúng (đáp án):", await sb.check(ex.solution, ex.solution));
  console.log("đúng (viết khác alias):", await sb.check("SELECT line_code AS code, location AS loc FROM production_lines ORDER BY 1", ex.solution.replace("ORDER BY line_code", "ORDER BY line_code")));
  console.log("sai (thiếu dòng):", await sb.check("SELECT line_code, location FROM production_lines WHERE line_id = 1", ex.solution));
  console.log("lỗi cú pháp:", await sb.check("SELEC * FROM production_lines", ex.solution));
  const big = manufacturingExercises.find((e) => e.id === "mfg-090")!;
  const t0 = Date.now();
  console.log("OEE đáp án tự chấm:", (await sb.check(big.solution, big.solution)).status, `${Date.now() - t0} ms`);
}
main().catch((e) => {
  console.error(e);
  process.exit(1);
});
