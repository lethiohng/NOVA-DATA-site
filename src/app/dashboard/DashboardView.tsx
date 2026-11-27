"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { sqlCourses, type Category, type Level } from "@/lib/content";
import { useLang, useT, type Bi } from "@/lib/i18n";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";
import { fetchMyCourses, fetchMyProgress, type MyCourses, type MyProgress } from "@/lib/progress";
import { COURSE_CATALOG, PAID_COURSE_KEYS } from "@/lib/course-catalog";
import { activeDaySet, currentStreak, longestStreak, monthWeeks, dayKey } from "@/lib/activity";
import { Icon, type IconName, Section } from "@/components/ui";

const LEVELS: Level[] = ["Beginner", "Intermediate", "Advanced"];

type TopicCourse = { key: string; title: Bi; topicSlugs: string[] };

/** Gom các chủ đề đã xuất bản thành khóa theo chủ đề. Khóa SQL không nằm ở đây vì tiến độ của chúng tính theo bài (lesson_progress). */
function buildTopicCourses(categories: Category[]): TopicCourse[] {
  const courses: TopicCourse[] = [];
  for (const c of categories) {
    if (c.slug === "sql-database") continue;
    const slugs = c.topics.filter((t) => t.status === "published").map((t) => t.slug);
    if (slugs.length) courses.push({ key: c.slug, title: c.title, topicSlugs: slugs });
  }
  return courses;
}

/* Icon và màu nền cho từng khóa. Khóa chưa có cấu hình thì dùng icon mặc định. */
const COURSE_ICON: Record<string, IconName> = {
  "sql-basic": "database",
  "sql-intermediate": "chart",
  "sql-advanced": "code",
  "data-digitalization": "database",
  "production-management": "factory",
  "industrial-engineering": "antenna",
  "quality-management": "shield",
};
const TILE_TONES = [
  "bg-sky-100 text-sky-600 dark:bg-sky-950 dark:text-sky-400",
  "bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400",
  "bg-violet-100 text-violet-600 dark:bg-violet-950 dark:text-violet-400",
  "bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400",
  "bg-rose-100 text-rose-600 dark:bg-rose-950 dark:text-rose-400",
  "bg-cyan-100 text-cyan-600 dark:bg-cyan-950 dark:text-cyan-400",
];

function Bar({ value, total }: { value: number; total: number }) {
  const pct = total ? Math.round((value / total) * 100) : 0;
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
      <div className="h-2 rounded-full bg-sky-600 transition-all" style={{ width: `${pct}%` }} />
    </div>
  );
}

type Row = { key: string; title: string; done: number; total: number; unit: string; href: string };

export default function DashboardView({ categories, exerciseTotal }: { categories: Category[]; exerciseTotal: number }) {
  const t = useT();
  const { lang } = useLang();
  const vi = lang === "vi";
  const [supabase] = useState(() => createSupabaseBrowserClient());
  const [signedIn, setSignedIn] = useState<boolean | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [progress, setProgress] = useState<MyProgress>({ topics: [], exercises: [], topicAt: [], exerciseAt: [] });
  const [myCourses, setMyCourses] = useState<MyCourses>({ keys: [], lessons: [] });
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
      const meta = data.user.user_metadata as { full_name?: string; name?: string } | undefined;
      setName(meta?.full_name ?? meta?.name ?? null);
      try {
        const p = await fetchMyProgress(supabase);
        const c = await fetchMyCourses(supabase, PAID_COURSE_KEYS);
        if (alive) {
          setProgress(p);
          setMyCourses(c);
        }
      } catch {
        if (alive) setError(vi ? "Không tải được tiến độ." : "Could not load your progress.");
      }
    });
    return () => {
      alive = false;
    };
  }, [supabase, vi]);

  if (signedIn === null) return <p className="text-sm text-slate-500">{vi ? "Đang tải…" : "Loading…"}</p>;

  if (!signedIn) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
        {vi ? "Đăng nhập để xem tiến độ học của bạn." : "Sign in to see your progress."}{" "}
        <Link href="/login" className="font-semibold text-sky-600 hover:underline dark:text-sky-400">
          {vi ? "Đăng nhập" : "Sign in"}
        </Link>
      </div>
    );
  }

  // Khóa SQL: đếm bài đã đánh dấu học trong lesson_progress, chỉ hiện khóa miễn phí hoặc khóa đã có quyền.
  const sqlRows: Row[] = COURSE_CATALOG.filter((c) => c.key.startsWith("sql-") && (c.free || myCourses.keys.includes(c.key))).map((c) => ({
    key: c.key,
    title: t(c.title),
    done: myCourses.lessons.filter((l) => l.course_key === c.key).length,
    total: c.totalLessons,
    unit: vi ? "bài" : "lessons",
    href: c.href,
  }));

  // Các khóa theo chủ đề: đếm chủ đề đã đánh dấu trong topic_progress.
  const done = new Set(progress.topics);
  const topicRows: Row[] = buildTopicCourses(categories).map((c) => ({
    key: c.key,
    title: t(c.title),
    done: c.topicSlugs.filter((s) => done.has(s)).length,
    total: c.topicSlugs.length,
    unit: vi ? "chủ đề" : "topics",
    href: `/learn/${c.key}`,
  }));

  const rows = [...sqlRows, ...topicRows];
  const exercisesDone = progress.exercises.length;
  const totalDone = rows.reduce((s, r) => s + r.done, 0);

  // Ngày học: mọi thời điểm hoàn thành bài, chủ đề và bài tập.
  const allTimes = [...myCourses.lessons.map((l) => l.completed_at), ...progress.topicAt.map((x) => x.at), ...progress.exerciseAt.map((x) => x.at)];
  const days = activeDaySet(allTimes);
  const streak = currentStreak(days);
  const best = longestStreak(days);
  const now = new Date();
  const weeks = monthWeeks(now.getFullYear(), now.getMonth());
  const todayKey = dayKey(now);
  const monthLabel = now.toLocaleDateString(vi ? "vi-VN" : "en-US", { month: "long", year: "numeric" });
  const weekdays = vi ? ["T2", "T3", "T4", "T5", "T6", "T7", "CN"] : ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

  // Gợi ý: khóa đang học dở trước, nếu không có thì khóa chưa bắt đầu đầu tiên (dùng cho nút ở banner).
  const suggestion = rows.find((r) => r.done > 0 && r.done < r.total) ?? rows.find((r) => r.done === 0);
  const greetName = name ? name.split(" ").slice(-1)[0] : null;

  return (
    <>
      {/* Lời chào và nút bắt đầu */}
      <div className="mb-8 rounded-3xl border border-slate-200 bg-gradient-to-r from-sky-50 to-amber-50 p-6 shadow-sm dark:border-slate-800 dark:from-slate-900 dark:to-slate-900">
        <span className="inline-block rounded-full bg-white px-3 py-1 text-xs font-semibold text-sky-700 shadow-sm dark:bg-slate-800 dark:text-sky-300">Dashboard</span>
        <h1 className="mt-3 text-2xl font-bold text-slate-900 dark:text-white">
          {vi ? `Xin chào${greetName ? ` ${greetName}` : ""}!` : `Hello${greetName ? ` ${greetName}` : ""}!`}
        </h1>
        <p className="mt-1 text-slate-600 dark:text-slate-400">
          {vi ? "Cùng học BI, SQL và dữ liệu sản xuất để phát triển kỹ năng của bạn nhé." : "Keep building your BI, SQL and manufacturing data skills."}
        </p>
        {suggestion && (
          <Link href={suggestion.href} className="mt-4 inline-flex items-center gap-2 rounded-xl bg-amber-400 px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm hover:bg-amber-500">
            ▶ {suggestion.done ? (vi ? "Tiếp tục học" : "Continue learning") : vi ? "Bắt đầu học ngay" : "Start learning now"} →
          </Link>
        )}
      </div>

      {error && <p className="mb-6 text-sm text-rose-600">{error}</p>}

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Section title={vi ? "Khóa học của bạn" : "Your courses"}>
            <div className="space-y-3">
              {rows.map((r, i) => (
                <div key={r.key} className="flex flex-wrap items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${TILE_TONES[i % TILE_TONES.length]}`}>
                    <Icon name={COURSE_ICON[r.key] ?? "book"} className="h-6 w-6" />
                  </span>
                  <div className="min-w-[10rem] flex-1">
                    <h3 className="font-semibold text-slate-900 dark:text-white">{r.title}</h3>
                  </div>
                  <div className="flex w-full items-center gap-3 sm:w-auto sm:min-w-[14rem]">
                    <div className="flex-1">
                      <Bar value={r.done} total={r.total} />
                    </div>
                    <span className="whitespace-nowrap text-sm text-slate-500">
                      {r.done}/{r.total} {r.unit} · {r.total ? Math.round((r.done / r.total) * 100) : 0}%
                    </span>
                  </div>
                  <Link href={r.href} className="rounded-lg border border-sky-300 px-3 py-1.5 text-sm font-semibold text-sky-700 hover:bg-sky-50 dark:border-sky-700 dark:text-sky-300 dark:hover:bg-slate-800">
                    {r.done ? (vi ? "Tiếp tục học →" : "Continue →") : vi ? "Bắt đầu →" : "Start →"}
                  </Link>
                </div>
              ))}
            </div>
          </Section>
        </div>

        <div className="space-y-6">
          {/* Chuỗi ngày học và lịch tháng */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="font-semibold text-slate-900 dark:text-white">🔥 {vi ? "Chuỗi học tập" : "Learning streak"}</h2>
            <p className="mt-2 text-4xl font-bold text-amber-500">
              {streak} <span className="text-base font-semibold text-slate-600 dark:text-slate-400">{vi ? "ngày liên tiếp" : "days in a row"}</span>
            </p>
            <p className="mt-1 text-xs text-slate-500">{vi ? "Hoàn thành bài, chủ đề hoặc bài tập mỗi ngày để giữ chuỗi." : "Complete a lesson, topic or exercise each day to keep the streak."}</p>

            <p className="mt-4 text-sm font-semibold capitalize text-slate-700 dark:text-slate-300">{monthLabel}</p>
            <table className="mt-2 w-full table-fixed text-center text-xs">
              <thead>
                <tr className="text-slate-500">
                  {weekdays.map((w) => (
                    <th key={w} className="py-1 font-medium">
                      {w}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {weeks.map((week, wi) => (
                  <tr key={wi}>
                    {week.map((d, di) => {
                      if (d === null) return <td key={di} className="py-1" />;
                      const key = dayKey(new Date(now.getFullYear(), now.getMonth(), d, 12));
                      const active = days.has(key);
                      const isToday = key === todayKey;
                      return (
                        <td key={di} className="py-1">
                          <span
                            className={`mx-auto flex h-7 w-7 items-center justify-center rounded-full ${
                              active ? "bg-emerald-500 font-semibold text-white" : "text-slate-600 dark:text-slate-400"
                            } ${isToday ? "ring-2 ring-amber-400" : ""}`}
                          >
                            {d}
                          </span>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-3 flex flex-wrap gap-3 text-xs text-slate-500">
              <span className="inline-flex items-center gap-1">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" /> {vi ? "Đã học" : "Studied"}
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="h-2.5 w-2.5 rounded-full ring-2 ring-amber-400" /> {vi ? "Hôm nay" : "Today"}
              </span>
            </div>
          </div>

          {/* Thành tích */}
          <div className="grid grid-cols-3 gap-2 rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div>
              <p className="text-xl font-bold text-slate-900 dark:text-white">{best}</p>
              <p className="text-xs text-slate-500">{vi ? "Chuỗi dài nhất" : "Longest streak"}</p>
            </div>
            <div>
              <p className="text-xl font-bold text-slate-900 dark:text-white">{days.size}</p>
              <p className="text-xs text-slate-500">{vi ? "Ngày có học" : "Active days"}</p>
            </div>
            <div>
              <p className="text-xl font-bold text-slate-900 dark:text-white">{totalDone}</p>
              <p className="text-xs text-slate-500">{vi ? "Mục đã hoàn thành" : "Items completed"}</p>
            </div>
          </div>

        </div>
      </div>

      <div className="mt-10">
        <Section title={vi ? "Bài tập SQL" : "SQL exercises"}>
          <div className="flex flex-wrap items-center justify-between gap-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="min-w-[14rem] flex-1">
              <p className="text-sm text-slate-500">{vi ? "Đã giải đúng" : "Solved correctly"}</p>
              <p className="text-3xl font-bold text-slate-900 dark:text-white">
                {exercisesDone}/{exerciseTotal}
              </p>
              <div className="mt-3 max-w-md">
                <Bar value={exercisesDone} total={exerciseTotal} />
              </div>
            </div>
            <Link href="/practice/sql" className="rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-violet-700">
              {vi ? "Luyện tập ngay →" : "Practice now →"}
            </Link>
          </div>
        </Section>
      </div>
    </>
  );
}
