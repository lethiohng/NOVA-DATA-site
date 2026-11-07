import { getCategories, getCourseCompletionCounts, getSqlExercises } from "@/lib/data";
import DashboardView from "./DashboardView";

// Số học viên hoàn thành khóa thay đổi theo thời gian, nên làm mới sau 5 phút.
export const revalidate = 300;

export default async function DashboardPage() {
  const [categories, exercises, counts] = await Promise.all([getCategories(), getSqlExercises(), getCourseCompletionCounts()]);
  return <DashboardView categories={categories} exerciseTotal={exercises.length} counts={counts} />;
}
