import type { BasicLesson, BasicModule } from "./types";
import { module04 } from "./module04";
import { module05 } from "./module05";
import { module06 } from "./module06";

export type { BasicLesson, BasicModule, BasicPractice } from "./types";

export const BASIC_MODULES: BasicModule[] = [
  { number: 4, title: "SQL Basic Queries", description: "SELECT, chọn cột, DISTINCT, alias, LIMIT, NULL và comment." },
  { number: 5, title: "Filtering & Sorting", description: "Lọc dữ liệu với WHERE, toán tử so sánh, AND/OR/NOT, IN, BETWEEN, LIKE và ORDER BY." },
  { number: 6, title: "SQL Aggregation", description: "COUNT, SUM, AVG, MIN, MAX, GROUP BY và HAVING." },
];

export const BASIC_LESSONS: BasicLesson[] = [...module04, ...module05, ...module06];

export function getBasicLesson(id: string): BasicLesson | undefined {
  return BASIC_LESSONS.find((l) => l.id === id);
}

/** Số thứ tự hiển thị của bài (1 đến 27). Mã như "04-01" chỉ dùng trong đường dẫn. */
export function lessonNumber(lesson: BasicLesson): number {
  return BASIC_LESSONS.indexOf(lesson) + 1;
}

/** Số hiển thị của module (1, 2, 3) thay cho mã 4, 5, 6. */
export function moduleNumber(module: BasicLesson["module"] | BasicModule["number"]): number {
  return module - 3;
}
