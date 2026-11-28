import type { SupabaseClient } from "@supabase/supabase-js";
import { MILESTONES, MISSION, type Milestone } from "@/app/about/milestones";

/* Nội dung trang About: đọc từ database; nếu chưa có thì dùng nội dung mặc định trong mã nguồn. */
export type Mission = { vi: string; en: string };

export async function loadAbout(supabase: SupabaseClient): Promise<{ milestones: Milestone[]; mission: Mission[] }> {
  const [m, s] = await Promise.all([
    supabase.from("about_milestones").select("data").order("position"),
    supabase.from("about_mission").select("vi, en").order("position"),
  ]);
  const milestones = m.data && m.data.length ? (m.data as { data: Milestone }[]).map((r) => r.data) : MILESTONES;
  const mission = s.data && s.data.length ? (s.data as Mission[]) : MISSION;
  return { milestones, mission };
}
