import type { BasicPractice } from "@/lib/sql-basic/types";

/* Cấu trúc một bài học SQL Intermediate. Giải thích viết bằng tiếng Việt, giữ thuật ngữ SQL tiếng Anh. */

export type IntermediateLesson = {
  id: string; // số thứ tự toàn khóa, dùng trong đường dẫn: "1" đến "31"
  module: 7 | 8 | 9 | 10 | 11; // mã module theo roadmap (07 đến 11)
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
  quiz: { q: string; a: string }[];
  summary: string[];
  next: string;
};

export type IntermediateModule = { number: 7 | 8 | 9 | 10 | 11; title: string; description: string };
