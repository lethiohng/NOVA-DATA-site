// Thay bài tổng "Công thức nhà máy" bằng 14 bài, mỗi công thức một bài (chạy một lần).
import { readFileSync, writeFileSync } from "node:fs";
import { FORMULA_ARTICLES } from "./formulas-articles-v1.mjs";

const path = "src/lib/content.ts";
const lines = readFileSync(path, "utf8").split("\n");

if (lines.some((l) => l.includes('slug: "cycle-time"'))) {
  console.log("đã có bài cycle-time, không chèn lại");
  process.exit(0);
}

// 1) Xóa chủ đề manufacturing-formulas trong danh mục.
const topicIdx = lines.findIndex((l) => l.includes('{ slug: "manufacturing-formulas"'));
if (topicIdx < 0) throw new Error("không thấy chủ đề manufacturing-formulas");
lines.splice(topicIdx, 1);

// 2) Thêm 14 chủ đề sau chủ đề attainment.
const att = lines.findIndex((l) => l.includes('{ slug: "attainment"'));
if (att < 0) throw new Error("không thấy chủ đề attainment");
const topicLines = FORMULA_ARTICLES.map(
  (a) => `      { slug: ${JSON.stringify(a.slug)}, title: { vi: ${JSON.stringify(a.title.vi)}, en: ${JSON.stringify(a.title.en)} }, status: "published" },`,
);
lines.splice(att + 1, 0, ...topicLines);

// 3) Xóa bài manufacturing-formulas trong mảng articles (object bắt đầu bằng "  {" và kết thúc bằng "  },").
const key = lines.findIndex((l) => l === '    "slug": "manufacturing-formulas",');
if (key < 0) throw new Error("không thấy bài manufacturing-formulas");
let start = key;
while (lines[start] !== "  {") start--;
let stop = key;
while (lines[stop] !== "  },") stop++;
lines.splice(start, stop - start + 1);

// 4) Thêm 14 bài vào cuối mảng articles.
const arr = lines.findIndex((l) => l.startsWith("export const articles: Article[] = ["));
const end = lines.findIndex((l, i) => i > arr && l === "];");
if (arr < 0 || end < 0) throw new Error("không thấy mảng articles");
const articleLines = FORMULA_ARTICLES.flatMap((a) => ("  " + JSON.stringify(a, null, 2).split("\n").join("\n  ") + ",").split("\n"));
lines.splice(end, 0, ...articleLines);

writeFileSync(path, lines.join("\n"));
console.log(`đã thay bài tổng bằng ${FORMULA_ARTICLES.length} bài công thức`);
