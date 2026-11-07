import type { Bi } from "@/lib/i18n";
import { sqlCourses } from "@/lib/content";
import { BASIC_LESSONS } from "@/lib/sql-basic";
import { INTERMEDIATE_LESSONS } from "@/lib/sql-intermediate";
import { ADVANCED_LESSONS } from "@/lib/sql-advanced";

/* Danh mục khóa học có theo dõi tiến độ bài học. Mã khóa khớp với bảng courses trong database.
   free = true: khóa miễn phí, ai đăng nhập cũng thấy tiến độ. Khóa còn lại cần quyền trong course_access (hoặc is_premium). */
export type CourseEntry = { key: string; title: Bi; href: string; totalLessons: number; free?: boolean };

export const COURSE_CATALOG: CourseEntry[] = [
  { key: "sql-basic", title: sqlCourses.Beginner.title, href: "/sql-basic", totalLessons: BASIC_LESSONS.length, free: true },
  { key: "sql-intermediate", title: sqlCourses.Intermediate.title, href: "/sql-intermediate", totalLessons: INTERMEDIATE_LESSONS.length },
  { key: "sql-advanced", title: sqlCourses.Advanced.title, href: "/sql-advanced", totalLessons: ADVANCED_LESSONS.length },
];

export const PAID_COURSE_KEYS = COURSE_CATALOG.filter((c) => !c.free).map((c) => c.key);
