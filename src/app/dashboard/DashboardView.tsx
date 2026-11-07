"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { sqlCourses, type Category, type Level } from "@/lib/content";
import { useLang, useT, type Bi } from "@/lib/i18n";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";
import { fetchMyCourses, fetchMyProgress, type MyCourses, type MyProgress } from "@/lib/progress";
import { COURSE_CATALOG, PAID_COURSE_KEYS } from "@/lib/course-catalog";
import { PageHeader, Section, Stat } from "@/components/ui";

const LEVELS: Level[] = ["Beginner", "Intermediate", "Advanced"];

type Course = { key: string; title: Bi; topicSlugs: string[] };

/** Gom các chủ đề đã xuất bản thành khóa học: khóa SQL chia theo cấp độ, danh mục khác là một khóa. Khớp với seed course_topics. */
function buildCourses(categories: Category[]): Course[] {
  const courses: Course[] = [];
  for (const c of categories) {
    if (c.slug === "sql-database") {
      for (const level of LEVELS) {
        const slugs = c.topics.filter((t) => t.level === level && t.status === "published").map((t) => t.slug);
        if (slugs.length) courses.push({ key: `sql-${level.toLowerCase()}`, title: sqlCourses[level].title, topicSlugs: slugs });
      }
    } else {
      const slugs = c.topics.filter((t) => t.status === "published").map((t) => t.slug);
      if (slugs.length) courses.push({ key: c.slug, title: c.title, topicSlugs: slugs });
    }
  }
  return courses;
}

function Bar({ value, total }: { value: number; total: number }) {
  const pct = total ? Math.round((value / total) * 100) : 0;
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
      <div className="h-2 rounded-full bg-sky-600 transition-all" style={{ width: `${pct}%` }} />
    </div>
  );
}

export default function DashboardView({
  categories,
  exerciseTotal,
  counts,
}: {
  categories: Category[];
  exerciseTotal: number;
  counts: Record<string, number>;
}) {
  const t = useT();
  const { lang } = useLang();
  const vi = lang === "vi";
  const [supabase] = useState(() => createSupabaseBrowserClient());
  const [signedIn, setSignedIn] = useState<boolean | null>(null);
  const [progress, setProgress] = useState<MyProgress>({ topics: [], exercises: [] });
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
      <>
        <PageHeader eyebrow="Dashboard" title={vi ? "Tiến độ học" : "My progress"} />
        <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
          {vi ? "Đăng nhập để xem tiến độ học của bạn." : "Sign in to see your progress."}{" "}
          <Link href="/login" className="font-semibold text-sky-600 hover:underline dark:text-sky-400">
            {vi ? "Đăng nhập" : "Sign in"}
          </Link>
        </div>
      </>
    );
  }

  const courses = buildCourses(categories);
  const allPublished = new Set(courses.flatMap((c) => c.topicSlugs));
  const done = new Set(progress.topics);
  const topicsDone = [...allPublished].filter((s) => done.has(s)).length;
  const coursesDone = courses.filter((c) => c.topicSlugs.every((s) => done.has(s))).length;
  const exercisesDone = progress.exercises.length;

  return (
    <>
      <PageHeader
        eyebrow="Dashboard"
        title={vi ? "Tiến độ học" : "My progress"}
        description={vi ? "Theo dõi các chủ đề và bài SQL bạn đã hoàn thành, và so với những học viên khác." : "Track the topics and SQL exercises you have completed, and compare with other learners."}
      />
      {error && <p className="mb-6 text-sm text-rose-600">{error}</p>}

      <div className="mb-12 grid grid-cols-2 gap-4 md:grid-cols-3">
        <Stat icon="topic" value={`${topicsDone}/${allPublished.size}`} label={vi ? "Chủ đề đã học" : "Topics completed"} />
        <Stat icon="path" value={`${exercisesDone}/${exerciseTotal}`} label={vi ? "Bài SQL đã giải" : "SQL exercises solved"} />
        <Stat icon="category" value={`${coursesDone}/${courses.length}`} label={vi ? "Khóa đã hoàn thành" : "Courses completed"} />
      </div>

      {(
        <Section title={vi ? "Tiến độ khóa học" : "Course progress"}>
          <div className="space-y-4">
            {COURSE_CATALOG.filter((c) => c.free || myCourses.keys.includes(c.key)).map((c) => {
              const learned = myCourses.lessons.filter((l) => l.course_key === c.key).length;
              return (
                <div key={c.key} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-semibold text-slate-900 dark:text-white">{t(c.title)}</h3>
                    <span className="text-sm text-slate-500">
                      {learned}/{c.totalLessons} {vi ? "bài đã học" : "lessons completed"}
                    </span>
                  </div>
                  <div className="mt-3">
                    <Bar value={learned} total={c.totalLessons} />
                  </div>
                  <Link href={c.href} className="mt-4 inline-block text-sm font-semibold text-sky-600 hover:underline dark:text-sky-400">
                    {vi ? "Tiếp tục học →" : "Continue learning →"}
                  </Link>
                </div>
              );
            })}
          </div>
        </Section>
      )}

      <Section title={vi ? "Tiến độ từng khóa" : "Progress by course"}>
        <div className="space-y-4">
          {courses.map((c) => {
            const finished = c.topicSlugs.filter((s) => done.has(s)).length;
            const learners = counts[c.key] ?? 0;
            return (
              <div key={c.key} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-semibold text-slate-900 dark:text-white">{t(c.title)}</h3>
                  <span className="text-sm text-slate-500">
                    {finished}/{c.topicSlugs.length} {vi ? "chủ đề" : "topics"}
                  </span>
                </div>
                <div className="mt-3">
                  <Bar value={finished} total={c.topicSlugs.length} />
                </div>
                <p className="mt-3 text-xs text-slate-500">
                  {vi ? `${learners} học viên đã hoàn thành khóa này` : `${learners} learners have completed this course`}
                </p>
              </div>
            );
          })}
        </div>
      </Section>

      <Section title={vi ? "Bài tập SQL" : "SQL exercises"}>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-700 dark:text-slate-300">{vi ? "Đã giải đúng" : "Solved correctly"}</span>
            <span className="font-semibold text-slate-900 dark:text-white">
              {exercisesDone}/{exerciseTotal}
            </span>
          </div>
          <div className="mt-3">
            <Bar value={exercisesDone} total={exerciseTotal} />
          </div>
          <Link href="/practice/sql" className="mt-4 inline-block text-sm font-semibold text-sky-600 hover:underline dark:text-sky-400">
            {vi ? "Tiếp tục luyện tập →" : "Keep practicing →"}
          </Link>
        </div>
      </Section>
    </>
  );
}
