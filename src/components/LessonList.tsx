"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";
import { useLang } from "@/lib/i18n";

export type LessonListItem = { id: string; href: string; number: string | number; title: string; minutes: number };

/* Danh sách bài học của một module. Bài đã đánh dấu học (lesson_progress) hiển thị màu xanh kèm dấu tích. */
export default function LessonList({ courseKey, items }: { courseKey: string; items: LessonListItem[] }) {
  const { lang } = useLang();
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
