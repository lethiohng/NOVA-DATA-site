"use client";

import { useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";
import { useLang } from "@/lib/i18n";
import FlowerBurst from "@/components/FlowerBurst";
import { playChime } from "@/lib/sound";

/* Nút đánh dấu đã học một bài trong khóa đã đăng ký. Đặt trong PremiumGate nên chỉ người có quyền mới thấy. */
export default function LessonDoneButton({ courseKey, lessonId }: { courseKey: string; lessonId: string }) {
  const { lang } = useLang();
  const vi = lang === "vi";
  const [supabase] = useState(() => createSupabaseBrowserClient());
  const [userId, setUserId] = useState<string | null>(null);
  const [done, setDone] = useState<boolean | null>(null);
  const [busy, setBusy] = useState(false);
  const [burst, setBurst] = useState(0); // tăng mỗi lần vừa hoàn thành bài, để bắn hiệu ứng hoa
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      const { data: auth } = await supabase.auth.getUser();
      if (!alive) return;
      if (!auth.user) {
        setDone(false);
        return;
      }
      setUserId(auth.user.id);
      const { data, error: readErr } = await supabase
        .from("lesson_progress")
        .select("lesson_id")
        .eq("course_key", courseKey)
        .eq("lesson_id", lessonId)
        .maybeSingle();
      if (!alive) return;
      if (readErr) setError(readErr.message);
      setDone(Boolean(data));
    })();
    return () => {
      alive = false;
    };
  }, [supabase, courseKey, lessonId]);

  if (!userId || done === null) return null;

  const toggle = async () => {
    setBusy(true);
    setError(null);
    if (done) {
      const { error: delErr } = await supabase.from("lesson_progress").delete().eq("course_key", courseKey).eq("lesson_id", lessonId);
      if (delErr) setError(delErr.message);
      else setDone(false);
    } else {
      const { error: insErr } = await supabase.from("lesson_progress").upsert({ user_id: userId, course_key: courseKey, lesson_id: lessonId }, { onConflict: "user_id,course_key,lesson_id" });
      if (insErr) {
        setError(insErr.message);
      } else {
        setDone(true);
        setBurst((n) => n + 1);
        playChime();
      }
    }
    setBusy(false);
  };

  return (
    <>
    <FlowerBurst trigger={burst} />
    <button
      type="button"
      onClick={toggle}
      disabled={busy}
      aria-pressed={done}
      className={`mb-6 inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition disabled:opacity-60 ${
        done
          ? "bg-emerald-600 text-white hover:bg-emerald-700"
          : "border border-slate-300 bg-white text-slate-800 hover:border-sky-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
      }`}
    >
      {done ? (vi ? "✓ Đã học" : "✓ Completed") : vi ? "Đánh dấu đã học" : "Mark as completed"}
    </button>
    {error && <p className="-mt-4 mb-6 text-sm text-rose-600">{vi ? "Không lưu được tiến độ: " : "Could not save progress: "}{error}</p>}
    </>
  );
}
