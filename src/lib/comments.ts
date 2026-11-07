import type { SupabaseClient } from "@supabase/supabase-js";

/* Bình luận bài tập SQL: đọc và ghi trực tiếp từ trình duyệt, RLS trong migration_005 kiểm soát quyền. */

export type ExerciseComment = {
  id: string;
  body: string;
  createdAt: string;
  userId: string;
  name: string;
  avatar: string | null;
};

type Row = { id: string; body: string; created_at: string; user_id: string };
type Profile = { id: string; display_name: string | null; avatar_url: string | null };

export async function fetchComments(supabase: SupabaseClient, exerciseId: string): Promise<ExerciseComment[]> {
  const { data, error } = await supabase
    .from("exercise_comments")
    .select("id, body, created_at, user_id")
    .eq("exercise_id", exerciseId)
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  const rows = (data ?? []) as Row[];
  if (!rows.length) return [];

  const ids = [...new Set(rows.map((r) => r.user_id))];
  const { data: profiles, error: pErr } = await supabase.from("public_profiles").select("id, display_name, avatar_url").in("id", ids);
  if (pErr) throw new Error(pErr.message);
  const byId = new Map(((profiles ?? []) as Profile[]).map((p) => [p.id, p]));

  return rows.map((r) => {
    const p = byId.get(r.user_id);
    return {
      id: r.id,
      body: r.body,
      createdAt: r.created_at,
      userId: r.user_id,
      name: p?.display_name || "",
      avatar: p?.avatar_url ?? null,
    };
  });
}

export async function addComment(supabase: SupabaseClient, exerciseId: string, body: string) {
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) throw new Error("not signed in");
  const { error } = await supabase.from("exercise_comments").insert({ exercise_id: exerciseId, user_id: auth.user.id, body });
  if (error) throw new Error(error.message);
}

export async function deleteComment(supabase: SupabaseClient, id: string) {
  const { error } = await supabase.from("exercise_comments").delete().eq("id", id);
  if (error) throw new Error(error.message);
}
