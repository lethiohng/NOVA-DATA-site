import type { AdvancedGroup, AdvancedLesson, AdvancedModule } from "./types";
import { group01 } from "./group01";
import { group02 } from "./group02";
import { group03 } from "./group03";
import { group04 } from "./group04";

export type { AdvancedGroup, AdvancedLesson, AdvancedModule } from "./types";

/* Khóa SQL Advanced: 4 nhóm, 11 module, 22 bài. Theo outline 11 module và bài tập thực tế nhà máy. */

export const ADVANCED_GROUPS: AdvancedGroup[] = [
  { number: 1, title: "Advanced Query Engineering: xử lý truy vấn phức tạp" },
  { number: 2, title: "Advanced Data Processing: làm sạch và biến đổi dữ liệu" },
  { number: 3, title: "Database & Performance: tổ chức và tối ưu database" },
  { number: 4, title: "Real-world BI Engineering: ứng dụng trong công việc" },
];

export const ADVANCED_MODULES: AdvancedModule[] = [
  { number: 1, group: 1, title: "Advanced Query Architecture", description: "JOIN nhiều bảng, nhiều CTE, tránh nhân dòng và tách truy vấn phức tạp." },
  { number: 2, group: 1, title: "Advanced Window Functions", description: "ROW_NUMBER, RANK, DENSE_RANK, LAG, LEAD, khung ROWS và trung bình trượt." },
  { number: 3, group: 1, title: "Recursive SQL & Hierarchical Data", description: "WITH RECURSIVE, cấu trúc cha-con (BOM), đường đi và phát hiện chu trình." },
  { number: 4, group: 2, title: "Advanced Data Transformation", description: "Tổng hợp có điều kiện, FILTER, pivot, JSON/JSONB, ARRAY và UNNEST." },
  { number: 5, group: 2, title: "Data Cleaning & Data Quality", description: "Phát hiện trùng, NULL và dữ liệu thiếu, bản ghi mới nhất, kiểm tra và đối chiếu." },
  { number: 6, group: 2, title: "Advanced Date & Time Analytics", description: "Cắt theo kỳ, ca đêm qua nửa đêm, thời lượng sự kiện và khoảng trống." },
  { number: 7, group: 3, title: "Database Modeling for BI", description: "Fact và dimension, star schema, độ chi tiết và lịch sử dữ liệu (SCD)." },
  { number: 8, group: 3, title: "Indexing & Query Optimization", description: "Chỉ mục B-tree, composite và partial index, EXPLAIN và tối ưu truy vấn." },
  { number: 9, group: 3, title: "Views, Materialized Views & Transactions", description: "View báo cáo, materialized view, INSERT ON CONFLICT và giao dịch ACID." },
  { number: 10, group: 4, title: "Advanced SQL Business Logic", description: "Plan vs Actual, tỷ lệ đạt, phân tích dừng máy và OEE." },
  { number: 11, group: 4, title: "Manufacturing BI Capstone Project", description: "Khảo sát nguồn, dựng KPI dataset và dashboard-ready dataset." },
];

export const ADVANCED_LESSONS: AdvancedLesson[] = [...group01, ...group02, ...group03, ...group04];

export function getAdvancedLesson(id: string): AdvancedLesson | undefined {
  return ADVANCED_LESSONS.find((l) => l.id === id);
}

/** Số thứ tự hiển thị của bài trong khóa (1 đến 22). */
export function advancedLessonNumber(lesson: AdvancedLesson): number {
  return ADVANCED_LESSONS.indexOf(lesson) + 1;
}
