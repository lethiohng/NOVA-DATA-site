// Chèn hai topic và hai bài mới của Manufacturing Analytics vào src/lib/content.ts (chạy một lần).
import { readFileSync, writeFileSync } from "node:fs";
import { MA_ARTICLES, MA_TOPICS } from "./manufacturing-analytics-v1.mjs";

const path = "src/lib/content.ts";
const lines = readFileSync(path, "utf8").split("\n");

if (lines.some((l) => l.includes('slug: "continuous-improvement"'))) {
  console.log("Đã có bài continuous-improvement, không chèn lại.");
  process.exit(0);
}

// 1) Topic vào danh mục manufacturing-analytics, sau dòng topic downtime.
const cat = lines.findIndex((l) => l === '    slug: "manufacturing-analytics",');
const dt = lines.findIndex((l, i) => i > cat && l.includes('{ slug: "downtime"'));
if (cat < 0 || dt < 0) throw new Error("không thấy danh mục manufacturing-analytics");
const topicLines = MA_TOPICS.map(
  (t) => `      { slug: ${JSON.stringify(t.slug)}, title: { vi: ${JSON.stringify(t.title.vi)}, en: ${JSON.stringify(t.title.en)} }, status: ${JSON.stringify(t.status)} },`,
);
lines.splice(dt + 1, 0, ...topicLines);

// 2) Bài vào cuối mảng articles.
const arr = lines.findIndex((l) => l.startsWith("export const articles: Article[] = ["));
const end = lines.findIndex((l, i) => i > arr && l === "];");
if (arr < 0 || end < 0) throw new Error("không thấy mảng articles");
const articleLines = MA_ARTICLES.flatMap((a) => ["  " + JSON.stringify(a, null, 2).split("\n").join("\n  ") + ","]);
lines.splice(end, 0, ...articleLines);

writeFileSync(path, lines.join("\n"));
console.log("đã chèn 2 topic và 2 bài");
