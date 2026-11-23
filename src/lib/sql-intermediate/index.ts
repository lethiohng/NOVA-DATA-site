import type { IntermediateLesson, IntermediateModule } from "./types";
import { module07 } from "./module07";
import { module08 } from "./module08";
import { module09 } from "./module09";
import { module10 } from "./module10";
import { module11 } from "./module11";
import { module12 } from "./module12";

export type { IntermediateLesson, IntermediateModule } from "./types";

export const INTERMEDIATE_MODULES: IntermediateModule[] = [
  { number: 7, title: "Joins", description: "Quan hệ giữa các bảng, INNER, LEFT, RIGHT/FULL OUTER, ghép nhiều bảng và self JOIN." },
  { number: 8, title: "Subqueries", description: "Subquery trong WHERE và FROM, correlated subquery, EXISTS, UNION, INTERSECT và EXCEPT." },
  { number: 9, title: "CTE", description: "WITH, nhiều CTE, CTE với JOIN và tổng hợp, so sánh CTE với subquery." },
  { number: 10, title: "Functions", description: "Hàm chuỗi, ngày giờ, số, xử lý NULL, CASE WHEN và tổng hợp có điều kiện." },
  { number: 11, title: "Window Functions", description: "OVER và PARTITION BY, ROW_NUMBER/RANK, LAG/LEAD, tổng lũy kế, FIRST/LAST_VALUE." },
  { number: 12, title: "Thao tác dữ liệu và kỹ thuật báo cáo", description: "INSERT/UPDATE/DELETE, GENERATE_SERIES, PIVOT bằng Conditional Aggregation, ép kiểu và định dạng ngày, CASE WHEN nâng cao, FILTER." },
];

export const INTERMEDIATE_LESSONS: IntermediateLesson[] = [...module07, ...module08, ...module09, ...module10, ...module11, ...module12];

export function getIntermediateLesson(id: string): IntermediateLesson | undefined {
  return INTERMEDIATE_LESSONS.find((l) => l.id === id);
}

/** Số thứ tự hiển thị của bài trong khóa (1 đến 31). */
export function intermediateLessonNumber(lesson: IntermediateLesson): number {
  return INTERMEDIATE_LESSONS.indexOf(lesson) + 1;
}

/** Số hiển thị của module (1 đến 5) thay cho mã 7 đến 11. */
export function intermediateModuleNumber(module: IntermediateLesson["module"] | IntermediateModule["number"]): number {
  return module - 6;
}
