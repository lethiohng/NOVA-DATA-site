/* Tên 15 bảng của NOVA MANUFACTURING và hàm tìm bảng trong câu SQL.
 * Tách riêng khỏi component client để server (trang bài học) cũng gọi được. */

/** 15 bảng của NOVA MANUFACTURING. */
export const DATASET_TABLES = [
  "departments",
  "shifts",
  "employees",
  "production_lines",
  "machines",
  "products",
  "production_orders",
  "production_records",
  "machine_cycles",
  "defect_types",
  "quality_inspections",
  "downtime_reasons",
  "downtime_events",
  "materials",
  "material_transactions",
];

/** Lấy tên các bảng được nhắc đến trong một câu SQL. */
export function tablesIn(sql: string): string[] {
  return DATASET_TABLES.filter((name) => new RegExp(`\\b${name}\\b`, "i").test(sql));
}
