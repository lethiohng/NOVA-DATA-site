// Áp nội dung Data Fundamentals theo Blueprint v1.0 vào src/lib/content.ts.
// Mỗi bài: thay các trường nội dung từ overview đến trước relatedTopics. Tiêu đề, tóm tắt, ảnh bìa, độ khó giữ nguyên.
// Trước khi ghi: chạy thử từng câu lệnh của mọi formula PostgreSQL trên PGlite; có lỗi thì dừng, không ghi.
import { readFileSync, writeFileSync } from "node:fs";
import { PGlite } from "@electric-sql/pglite";
import { E1 } from "./fundamentals-v2-1.mjs";
import { E2 } from "./fundamentals-v2-2.mjs";
import { E3 } from "./fundamentals-v2-3.mjs";

const ALL = { ...E1, ...E2, ...E3 };
const ORDER = ["database", "database-systems", "relational-database", "data-types", "keys", "relationships", "constraints", "normalization", "erd", "database-design", "etl", "data-warehouse"];

// 1) Kiểm tra SQL trước khi ghi (chạy từng câu lệnh, không gộp, vì exec gộp sẽ thành một giao dịch).
const bad = [];
for (const slug of ORDER) {
  for (const f of ALL[slug].formula ?? []) {
    if (!f.label.startsWith("PostgreSQL")) continue;
    const stmts = f.code
      .split(";\n")
      .map((s) => s.split("\n").filter((l) => !l.trim().startsWith("--")).join("\n").trim())
      .filter(Boolean);
    const db = new PGlite();
    try {
      for (const s of stmts) await db.exec(s);
    } catch (e) {
      bad.push(`${slug}: ${String(e.message ?? e)}`);
    }
    await db.close();
  }
}
if (bad.length) {
  console.error("SQL lỗi, chưa ghi file:\n" + bad.join("\n"));
  process.exit(1);
}

// 2) Dựng khối TypeScript cho mỗi bài.
const ind = "    ";
const q = (s) => JSON.stringify(s);
function block(d) {
  const out = [];
  out.push(`${ind}overview: {`, `      vi: ${q(d.overview.vi)},`, `      en: ${q(d.overview.en)},`, `${ind}},`);
  out.push(`${ind}objectives: [`);
  d.objectives.vi.forEach((v, i) => out.push(`      { vi: ${q(v)}, en: ${q(d.objectives.en[i])} },`));
  out.push(`${ind}],`);
  out.push(`${ind}explanation: {`, `      vi: ${q(d.explanation.vi)},`, `      en: ${q(d.explanation.en)},`, `${ind}},`);
  if (d.extraSections?.length) {
    out.push(`${ind}extraSections: [`);
    for (const s of d.extraSections) {
      out.push(`      {`, `        title: { vi: ${q(s.title.vi)}, en: ${q(s.title.en)} },`, `        body: {`, `          vi: ${q(s.body.vi)},`, `          en: ${q(s.body.en)},`, `        },`, `      },`);
    }
    out.push(`${ind}],`);
  }
  out.push(`${ind}practicalExample: {`, `      vi: ${q(d.practicalExample.vi)},`, `      en: ${q(d.practicalExample.en)},`, `${ind}},`);
  out.push(`${ind}formula: [`);
  for (const f of d.formula) out.push(`      { label: ${q(f.label)}, code: ${q(f.code)} },`);
  out.push(`${ind}],`);
  out.push(`${ind}exercise: {`, `      vi: ${q(d.exercise.vi)},`, `      en: ${q(d.exercise.en)},`, `${ind}},`);
  out.push(`${ind}answer: {`, `      vi: ${q(d.answer.vi)},`, `      en: ${q(d.answer.en)},`, `${ind}},`);
  return out;
}

// 3) Ghi vào content.ts.
const path = "src/lib/content.ts";
const lines = readFileSync(path, "utf8").split("\n");
let done = 0;
for (const slug of ORDER) {
  const d = ALL[slug];
  const s = lines.findIndex((l) => l === `    slug: "${slug}",`);
  if (s < 0) throw new Error("không thấy bài " + slug);
  const from = lines.findIndex((l, i) => i > s && l === `${ind}overview: {`);
  const to = lines.findIndex((l, i) => i > from && l.startsWith(`${ind}relatedTopics:`));
  if (from < 0 || to < 0) throw new Error("cấu trúc bài " + slug + " khác dự kiến");
  lines.splice(from, to - from, ...block(d));
  done++;
}
writeFileSync(path, lines.join("\n"));
console.log("đã cập nhật bài:", done, "| SQL đã chạy thử từng câu: OK");
