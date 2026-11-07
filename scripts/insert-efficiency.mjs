import { readFileSync, writeFileSync } from "node:fs";
import { EFF_ARTICLE, EFF_TOPIC } from "./efficiency-v1.mjs";
const path = "src/lib/content.ts";
const lines = readFileSync(path, "utf8").split("\n");
if (lines.some((l) => l.includes('slug: "efficiency"'))) { console.log("đã có bài efficiency"); process.exit(0); }
const cat = lines.findIndex((l) => l === '    slug: "manufacturing-analytics",');
const fm = lines.findIndex((l, i) => i > cat && l.includes('{ slug: "manufacturing-formulas"'));
if (cat < 0 || fm < 0) throw new Error("không thấy topic manufacturing-formulas");
lines.splice(fm + 1, 0, `      { slug: ${JSON.stringify(EFF_TOPIC.slug)}, title: { vi: ${JSON.stringify(EFF_TOPIC.title.vi)}, en: ${JSON.stringify(EFF_TOPIC.title.en)} }, status: ${JSON.stringify(EFF_TOPIC.status)} },`);
const arr = lines.findIndex((l) => l.startsWith("export const articles: Article[] = ["));
const end = lines.findIndex((l, i) => i > arr && l === "];");
lines.splice(end, 0, ...("  " + JSON.stringify(EFF_ARTICLE, null, 2).split("\n").join("\n  ") + ",").split("\n"));
writeFileSync(path, lines.join("\n"));
console.log("đã chèn bài efficiency");
