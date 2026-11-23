import type { BasicLessonEn, BasicLessonEnText } from "../types";
import { EXAMPLE_EN } from "./examples-en";
import { module04En } from "./module04-en";
import { module05En } from "./module05-en";
import { module06En } from "./module06-en";
import { module07En } from "./module07-en";

/* Bản tiếng Anh của toàn bộ bài SQL Basic, theo mã bài ("1" đến "32"). */
const ALL_TEXT: Record<string, BasicLessonEnText> = {
  ...module04En,
  ...module05En,
  ...module06En,
  ...module07En,
};

export const BASIC_EN: Record<string, BasicLessonEn> = Object.fromEntries(
  Object.entries(ALL_TEXT).map(([id, text]) => [id, { ...text, example: { explain: EXAMPLE_EN[id] ?? [] } }]),
);

/** Tên và mô tả module bằng tiếng Anh, theo số module trong dữ liệu (4 đến 7). */
export const BASIC_MODULES_EN: Record<number, { title: string; description: string }> = {
  4: { title: "SQL Basic Queries", description: "SELECT, column selection, DISTINCT, alias, LIMIT, NULL and comments." },
  5: { title: "Filtering & Sorting", description: "Filter with WHERE, comparison operators, AND/OR/NOT, IN, BETWEEN, LIKE and ORDER BY." },
  6: { title: "SQL Aggregation", description: "COUNT, SUM, AVG, MIN, MAX, GROUP BY and HAVING." },
  7: { title: "Operators & Data Types", description: "Arithmetic operators, IS NULL and IS NOT NULL, type casting with CAST and ::, string joins with || and COALESCE." },
};
