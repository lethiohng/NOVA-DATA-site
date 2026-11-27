"use client";

import { useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";
import { youtubeId } from "@/lib/youtube";
import { BASIC_LESSONS, lessonNumber as basicNumber } from "@/lib/sql-basic";
import { INTERMEDIATE_LESSONS, intermediateLessonNumber } from "@/lib/sql-intermediate";
import { ADVANCED_LESSONS, advancedLessonNumber } from "@/lib/sql-advanced";

/* Quản lý link YouTube cho từng bài SQL. Nội dung bài vẫn nằm trong code; ở đây chỉ nhập link video. */

type CourseKey = "sql-basic" | "sql-intermediate" | "sql-advanced";

const COURSES: { key: CourseKey; label: string; lessons: { id: string; number: string; title: string }[] }[] = [
  {
    key: "sql-basic",
    label: "SQL Basic",
    lessons: BASIC_LESSONS.map((l) => ({ id: l.id, number: String(basicNumber(l)), title: l.title })),
  },
  {
    key: "sql-intermediate",
    label: "SQL Intermediate",
    lessons: INTERMEDIATE_LESSONS.map((l) => ({ id: l.id, number: String(intermediateLessonNumber(l)), title: l.title })),
  },
  {
    key: "sql-advanced",
    label: "SQL Advanced",
    lessons: ADVANCED_LESSONS.map((l) => ({ id: l.id, number: String(advancedLessonNumber(l)), title: l.title })),
  },
];

const keyOf = (course: string, lesson: string) => `${course}|${lesson}`;

export default function LessonVideos() {
  const [supabase] = useState(() => createSupabaseBrowserClient());
  const [course, setCourse] = useState<CourseKey>("sql-basic");
  const [saved, setSaved] = useState<Record<string, string>>({}); // link đã lưu trong database
  const [drafts, setDrafts] = useState<Record<string, string>>({}); // link đang gõ
  const [busy, setBusy] = useState<string | null>(null);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);

  useEffect(() => {
    let alive = true;
    supabase
      .from("lesson_videos")
      .select("course_key, lesson_id, youtube_url")
      .then(({ data, error }) => {
        if (!alive) return;
        if (error) {
          setMessage({ ok: false, text: `Không tải được danh sách video: ${error.message}` });
          return;
        }
        const map: Record<string, string> = {};
        for (const r of (data ?? []) as { course_key: string; lesson_id: string; youtube_url: string }[]) {
          map[keyOf(r.course_key, r.lesson_id)] = r.youtube_url;
        }
        setSaved(map);
        setDrafts(map);
      });
    return () => {
      alive = false;
    };
  }, [supabase]);

  async function save(lessonId: string) {
    const k = keyOf(course, lessonId);
    const value = (drafts[k] ?? "").trim();
    if (value && !youtubeId(value)) {
      setMessage({ ok: false, text: "Link YouTube không hợp lệ. Dùng dạng youtube.com/watch?v=... hoặc youtu.be/..." });
      return;
    }
    setBusy(k);
    setMessage(null);
    if (value) {
      const { data, error } = await supabase
        .from("lesson_videos")
        .upsert({ course_key: course, lesson_id: lessonId, youtube_url: value, updated_at: new Date().toISOString() }, { onConflict: "course_key,lesson_id" })
        .select("lesson_id");
      if (error || !data?.length) {
        setBusy(null);
        setMessage({ ok: false, text: error ? error.message : "Không lưu được: không có quyền sửa." });
        return;
      }
      setSaved({ ...saved, [k]: value });
    } else {
      const { data, error } = await supabase.from("lesson_videos").delete().eq("course_key", course).eq("lesson_id", lessonId).select("lesson_id");
      if (error || !data?.length) {
        setBusy(null);
        setMessage({ ok: false, text: error ? error.message : "Không xóa được: không có quyền sửa." });
        return;
      }
      const next = { ...saved };
      delete next[k];
      setSaved(next);
    }
    setBusy(null);
    setMessage({ ok: true, text: value ? "Đã lưu link video." : "Đã xóa link video." });
  }

  const current = COURSES.find((c) => c.key === course)!;
  const inputCls = "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-sky-500 focus:outline-none dark:border-slate-700 dark:bg-slate-950";

  return (
    <section className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {COURSES.map((c) => (
          <button
            key={c.key}
            type="button"
            onClick={() => {
              setCourse(c.key);
              setMessage(null);
            }}
            className={`rounded-xl px-4 py-2 text-sm font-semibold ${course === c.key ? "bg-sky-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"}`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {message && <p className={`text-sm ${message.ok ? "text-emerald-600" : "text-rose-600"}`}>{message.text}</p>}

      <p className="text-xs text-slate-500">Dán link YouTube của bài. Để trống rồi bấm Lưu để xóa video của bài đó.</p>

      <ul className="space-y-3">
        {current.lessons.map((l) => {
          const k = keyOf(course, l.id);
          const draft = drafts[k] ?? "";
          const dirty = draft.trim() !== (saved[k] ?? "");
          const valid = !draft.trim() || Boolean(youtubeId(draft));
          return (
            <li key={l.id} className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
              <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                <span className="text-sm font-semibold text-slate-900 dark:text-white">
                  <span className="mr-2 font-mono text-xs text-slate-500">{l.number}</span>
                  {l.title}
                </span>
                {saved[k] && <span className="text-xs font-semibold text-emerald-600">● Đã có video</span>}
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <input
                  value={draft}
                  placeholder="https://www.youtube.com/watch?v=..."
                  onChange={(e) => setDrafts({ ...drafts, [k]: e.target.value })}
                  className={inputCls}
                />
                <button
                  type="button"
                  disabled={busy === k || !dirty || !valid}
                  onClick={() => save(l.id)}
                  className="shrink-0 rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700 disabled:opacity-50"
                >
                  {busy === k ? "Đang lưu…" : "Lưu"}
                </button>
              </div>
              {draft.trim() && !valid && <p className="mt-1 text-xs text-rose-600">Link không hợp lệ.</p>}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
