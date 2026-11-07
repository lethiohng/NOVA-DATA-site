/* Cấu trúc một bài học SQL Basic. Nội dung giải thích viết bằng tiếng Việt, giữ thuật ngữ SQL tiếng Anh. */

export type BasicPractice = {
  question: string;
  hint: string;
  solution: string;
};

export type BasicLesson = {
  id: string; // ví dụ "04-01": số module và số thứ tự bài
  module: 4 | 5 | 6;
  title: string;
  minutes: number;
  objectives: string[];
  prerequisites: string;
  explanation: string[]; // mỗi phần tử là một đoạn văn
  syntax: string; // cú pháp chuẩn PostgreSQL
  example: { sql: string; explain: string[] };
  factory: string; // tình huống nhà máy
  practice: BasicPractice[]; // bài có gợi ý trước, bài sau tự làm
  mistakes: string[];
  quiz: { q: string; a: string }[];
  summary: string[];
  next: string;
};

export type BasicModule = { number: 4 | 5 | 6; title: string; description: string };
