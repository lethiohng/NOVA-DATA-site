// Kiểm tra toàn bộ đáp án trên dữ liệu NOVA MANUFACTURING (PostgreSQL trong bộ nhớ).
// Chạy: npm run manufacturing:verify
import { loadIntoPglite } from "./pglite-load";
import { manufacturingExercises } from "./exercises";

async function main() {
  const { db } = await loadIntoPglite();
  const counts: Record<string, number> = {};
  for (const ex of manufacturingExercises) counts[ex.level] = (counts[ex.level] ?? 0) + 1;
  console.log("Số bài theo nhóm:", counts, "tổng:", manufacturingExercises.length);

  const failures: string[] = [];
  for (const ex of manufacturingExercises) {
    try {
      const results = await db.exec(ex.solution);
      const last = results[results.length - 1];
      const rows = last?.rows?.length ?? 0;
      if (rows === 0 && !/^(CREATE|BEGIN|ROLLBACK|ANALYZE)/i.test(ex.solution.trim())) {
        failures.push(`${ex.id} ${ex.title.en}: 0 dòng trả về`);
      }
      console.log(`${ex.id}  ${String(rows).padStart(5)} dòng  ${ex.title.en}`);
    } catch (err) {
      failures.push(`${ex.id} ${ex.title.en}: ${(err as Error).message}`);
    }
  }
  if (failures.length) {
    console.log("\nLỖI:");
    for (const f of failures) console.log(" -", f);
    process.exit(1);
  }
  console.log("\nTất cả bài tập chạy thành công.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
