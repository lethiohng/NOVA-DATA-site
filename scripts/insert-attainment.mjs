import { readFileSync, writeFileSync } from "node:fs";
import { ATT_ARTICLE, ATT_TOPIC } from "./attainment-v1.mjs";
const path = "src/lib/content.ts";
const lines = readFileSync(path, "utf8").split("\n");
if (lines.some((l) => l.includes('slug: "attainment"'))) { console.log("đã có bài attainment"); process.exit(0); }
const cat = lines.findIndex((l) => l === '    slug: "manufacturing-analytics",');
const ef = lines.findIndex((l, i) => i > cat && l.includes('{ slug: "efficiency"'));
if (cat < 0 || ef < 0) throw new Error("không thấy topic efficiency");
lines.splice(ef + 1, 0, `      { slug: ${JSON.stringify(ATT_TOPIC.slug)}, title: { vi: ${JSON.stringify(ATT_TOPIC.title.vi)}, en: ${JSON.stringify(ATT_TOPIC.title.en)} }, status: ${JSON.stringify(ATT_TOPIC.status)} },`);
const arr = lines.findIndex((l) => l.startsWith("export const articles: Article[] = ["));
const end = lines.findIndex((l, i) => i > arr && l === "];");
lines.splice(end, 0, ...("  " + JSON.stringify(ATT_ARTICLE, null, 2).split("\n").join("\n  ") + ",").split("\n"));
writeFileSync(path, lines.join("\n"));
console.log("đã chèn bài attainment");
