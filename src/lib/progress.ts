import type { SupabaseClient } from "@supabase/supabase-js";

/* Tiến độ học viên: đọc và ghi từ trình duyệt, RLS trong migration_006 chỉ cho người dùng sửa dữ liệu của chính mình. */

export type MyProgress = { topics: string[]; exercises: string[] };

export async function fetchMyProgress(supabase: SupabaseClient): Promise<MyProgress> {
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) return { topics: [], exercises: [] };
  const [topics, exercises] = await Promise.all([
    supabase.from("topic_progress").select("topic_slug"),
    supabase.from("exercise_progress").select("exercise_id"),
  ]);
  if (topics.error) throw new Error(topics.error.message);
  if (exercises.error) throw new Error(exercises.error.message);
  return {
    topics: (topics.data ?? []).map((r: { topic_slug: string }) => r.topic_slug),
    exercises: (exercises.data ?? []).map((r: { exercise_id: string }) => r.exercise_id),
  };
}

export async function setTopicDone(supabase: SupabaseClient, slug: string, done: boolean) {
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) throw new Error("not signed in");
  if (done) {
    const { error } = await supabase.from("topic_progress").upsert({ user_id: auth.user.id, topic_slug: slug }, { onConflict: "user_id,topic_slug" });
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase.from("topic_progress").delete().eq("topic_slug", slug);
    if (error) throw new Error(error.message);
  }
}

/** Ghi nhận bài SQL đã giải đúng. Khách chưa đăng nhập thì bỏ qua. */
export async function markExerciseSolved(supabase: SupabaseClient, exerciseId: string) {
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) return;
  const { error } = await supabase.from("exercise_progress").upsert({ user_id: auth.user.id, exercise_id: exerciseId }, { onConflict: "user_id,exercise_id" });
  if (error) throw new Error(error.message);
}

export type MyCourses = { keys: string[]; lessons: { course_key: string; lesson_id: string }[] };

/** Khóa đã đăng ký (Premium thì mở mọi khóa trả phí) và các bài đã đánh dấu học. */
export async function fetchMyCourses(supabase: SupabaseClient, paidKeys: string[]): Promise<MyCourses> {
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) return { keys: [], lessons: [] };
  const [profile, access, lessons] = await Promise.all([
    supabase.from("profiles").select("is_premium").eq("id", auth.user.id).maybeSingle(),
    supabase.from("course_access").select("course"),
    supabase.from("lesson_progress").select("course_key, lesson_id"),
  ]);
  if (access.error) throw new Error(access.error.message);
  if (lessons.error) throw new Error(lessons.error.message);
  const granted = (access.data ?? []).map((r: { course: string }) => r.course);
  return {
    keys: profile.data?.is_premium ? paidKeys : granted,
    lessons: lessons.data ?? [],
  };
}
