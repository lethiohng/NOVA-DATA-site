// Thay bài "Cải tiến liên tục" bằng 6 bài công cụ cải tiến trong src/lib/content.ts (chạy một lần).
import { readFileSync, writeFileSync } from "node:fs";
import { TOOL_ARTICLES, TOOL_TOPICS } from "./tools-articles-v1.mjs";

const path = "src/lib/content.ts";
const lines = readFileSync(path, "utf8").split("\n");

if (lines.some((l) => l.includes('slug: "pareto"'))) {
  console.log("đã có bài pareto, không chèn lại");
  process.exit(0);
}

// 1) Xóa chủ đề continuous-improvement trong danh mục.
const topicIdx = lines.findIndex((l) => l.includes('{ slug: "continuous-improvement"'));
if (topicIdx < 0) throw new Error("không thấy chủ đề continuous-improvement");
lines.splice(topicIdx, 1);

// 2) Thêm 6 chủ đề sau chủ đề attainment.
const att = lines.findIndex((l) => l.includes('{ slug: "attainment"'));
if (att < 0) throw new Error("không thấy chủ đề attainment");
const topicLines = TOOL_TOPICS.map(
  (t) => `      { slug: ${JSON.stringify(t.slug)}, title: { vi: ${JSON.stringify(t.title.vi)}, en: ${JSON.stringify(t.title.en)} }, status: ${JSON.stringify(t.status)} },`,
);
lines.splice(att + 1, 0, ...topicLines);

// 3) Xóa bài continuous-improvement trong mảng articles (object JSON bắt đầu bằng "  {" và kết thúc bằng "  },").
const key = lines.findIndex((l) => l === '    "slug": "continuous-improvement",');
if (key < 0) throw new Error("không thấy bài continuous-improvement");
let start = key;
while (lines[start] !== "  {") start--;
let stop = key;
while (lines[stop] !== "  },") stop++;
lines.splice(start, stop - start + 1);

// 4) Thêm 6 bài vào cuối mảng articles.
const arr = lines.findIndex((l) => l.startsWith("export const articles: Article[] = ["));
const end = lines.findIndex((l, i) => i > arr && l === "];");
if (arr < 0 || end < 0) throw new Error("không thấy mảng articles");
const articleLines = TOOL_ARTICLES.flatMap((a) => ("  " + JSON.stringify(a, null, 2).split("\n").join("\n  ") + ",").split("\n"));
lines.splice(end, 0, ...articleLines);

writeFileSync(path, lines.join("\n"));
console.log("đã thay bài cải tiến liên tục bằng 6 bài công cụ");
