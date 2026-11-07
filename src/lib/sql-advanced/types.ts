import type { BasicPractice } from "@/lib/sql-basic/types";

/* Cấu trúc một bài học SQL Advanced. Giải thích viết bằng tiếng Việt, giữ thuật ngữ SQL tiếng Anh. */

export type AdvancedLesson = {
  id: string; // số thứ tự toàn khóa, dùng trong đường dẫn: "1" đến "22"
  module: number; // số module trong khóa: 1 đến 11
  title: string;
  minutes: number;
  objectives: string[];
  prerequisites: string;
  explanation: string[];
  syntax: string;
  example: { sql: string; explain: string[] };
  factory: string;
  practice: BasicPractice[];
  mistakes: string[];
  summary: string[];
};

export type AdvancedGroup = { number: number; title: string };

export type AdvancedModule = { number: number; group: number; title: string; description: string };
