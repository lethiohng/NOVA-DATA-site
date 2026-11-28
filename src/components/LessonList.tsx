"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";
import { useLang } from "@/lib/i18n";
import { lessonKey, useAccess } from "@/lib/use-access";

export type LessonListItem = { id: string; href: string; number: string | number; title: string; minutes: number };

/* Danh sách bài học của một module. Bài đã đánh dấu học (lesson_progress) hiển thị màu xanh kèm dấu tích.
   Bài bị khóa (chưa được admin mở miễn phí, và người xem không phải Pro hay đã mua khóa) hiện 🔒 Pro. */
export default function LessonList({ courseKey, items }: { courseKey: string; items: LessonListItem[] }) {
  const { lang } = useLang();
  const access = useAccess();
  const vi = lang === "vi";
  const [supabase] = useState(() => createSupabaseBrowserClient());
  const [done, setDone] = useState<Set<string>>(new Set());

  useEffect(() => {
    let alive = true;
    (async () => {
      const { data: auth } = await supabase.auth.getUser();
      if (!auth.user) return;
      const { data } = await supabase.from("lesson_progress").select("lesson_id").eq("course_key", courseKey);
      if (alive && data) setDone(new Set(data.map((r: { lesson_id: string }) => r.lesson_id)));
    })();
    return () => {
      alive = false;
    };
  }, [supabase, courseKey]);

  return (
    <ol className="space-y-2">
      {items.map((it) => {
        const isDone = done.has(it.id);
        if (access.ready && access.isLocked("lesson", lessonKey(courseKey, it.id), courseKey)) {
          return (
            <li key={it.id}>
              <Link href="/pro" className="flex items-center justify-between gap-4 rounded-xl border border-dashed border-violet-300 bg-violet-50/50 px-4 py-3 text-sm transition hover:border-violet-500 dark:border-violet-900 dark:bg-violet-950/20">
                <span className="min-w-0 text-slate-500">
                  <span className="mr-3 font-mono text-xs">{it.number}</span>
                  <span className="font-medium">{it.title}</span>
                </span>
                <span className="inline-flex shrink-0 items-center gap-2 text-xs font-semibold text-violet-700 dark:text-violet-300">
                  🔒 Pro
                </span>
              </Link>
            </li>
          );
        }
        return (
          <li key={it.id}>
            <Link
              href={it.href}
              className={`flex items-center justify-between gap-4 rounded-xl border px-4 py-3 text-sm shadow-sm transition hover:shadow-md ${
                isDone
                  ? "border-emerald-400 bg-emerald-50 hover:border-emerald-500 dark:border-emerald-700 dark:bg-emerald-950/40"
                  : "border-slate-200 bg-white hover:border-sky-400 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-sky-600"
              }`}
            >
              <span className="min-w-0">
                <span className="mr-3 font-mono text-xs text-slate-500">{it.number}</span>
                <span className="font-medium text-slate-900 dark:text-white">{it.title}</span>
              </span>
              <span className="flex shrink-0 items-center gap-3 text-xs">
                {isDone && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-600 px-2 py-0.5 font-semibold text-white">
                    ✓ {vi ? "Đã học" : "Completed"}
                  </span>
                )}
                <span className="text-slate-500">
                  {it.minutes} {vi ? "phút" : "min"}
                </span>
              </span>
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
