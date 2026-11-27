import { getCategories, getSqlExercises } from "@/lib/data";
import DashboardView from "./DashboardView";

// Tiến độ là dữ liệu cá nhân, đọc trên trình duyệt; trang chỉ cần danh mục và số bài tập.
export const revalidate = 300;

export default async function DashboardPage() {
  const [categories, exercises] = await Promise.all([getCategories(), getSqlExercises()]);
  return <DashboardView categories={categories} exerciseTotal={exercises.length} />;
}
