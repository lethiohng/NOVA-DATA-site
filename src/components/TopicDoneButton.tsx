"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";
import { fetchMyProgress, setTopicDone } from "@/lib/progress";
import { useLang } from "@/lib/i18n";

/** Nút đánh dấu chủ đề đã học xong. Khách chưa đăng nhập thấy liên kết đăng nhập. */
export default function TopicDoneButton({ slug }: { slug: string }) {
  const { lang } = useLang();
  const vi = lang === "vi";
  const [supabase] = useState(() => createSupabaseBrowserClient());
  const [signedIn, setSignedIn] = useState<boolean | null>(null);
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    supabase.auth.getUser().then(async ({ data }) => {
      if (!alive) return;
      if (!data.user) {
        setSignedIn(false);
        return;
      }
      setSignedIn(true);
      try {
        const p = await fetchMyProgress(supabase);
        if (alive) setDone(p.topics.includes(slug));
      } catch {
        // Không đọc được tiến độ thì vẫn hiện nút, trạng thái mặc định là chưa học xong.
      }
    });
    return () => {
      alive = false;
    };
  }, [supabase, slug]);

  const toggle = async () => {
    setBusy(true);
    setError(null);
    try {
      await setTopicDone(supabase, slug, !done);
      setDone(!done);
    } catch {
      setError(vi ? "Không lưu được tiến độ. Thử lại sau." : "Could not save progress. Try again.");
    }
    setBusy(false);
  };

  if (signedIn === null) return null;

  if (!signedIn) {
    return (
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">
        {vi ? "Đăng nhập để lưu tiến độ học của bạn." : "Sign in to save your progress."}{" "}
        <Link href="/login" className="font-semibold text-sky-600 hover:underline dark:text-sky-400">
          {vi ? "Đăng nhập" : "Sign in"}
        </Link>
      </div>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={toggle}
        disabled={busy}
        aria-pressed={done}
        className={`rounded-lg px-4 py-2 text-sm font-semibold shadow-sm transition disabled:opacity-60 ${
          done ? "border border-emerald-300 bg-emerald-50 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300" : "bg-sky-600 text-white hover:bg-sky-700"
        }`}
      >
        {done ? (vi ? "✓ Đã học xong (bỏ đánh dấu)" : "✓ Completed (undo)") : vi ? "Đánh dấu đã học xong" : "Mark as completed"}
      </button>
      {error && <p className="mt-2 text-sm text-rose-600">{error}</p>}
    </div>
  );
}
