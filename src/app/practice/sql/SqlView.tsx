"use client";

import { useState } from "react";
import type { SqlExercise } from "@/lib/content";
import { useLang, useT } from "@/lib/i18n";
import { Badge, CodeBlock, PageHeader, Section } from "@/components/ui";
import { AnswerResult, SqlEditor } from "@/components/SqlLab";
import { SchemaPanel, tablesIn } from "@/components/SchemaPanel";
import ExerciseComments from "@/components/ExerciseComments";

const LEVELS = ["All", "Beginner", "Intermediate", "Advanced", "Manufacturing"] as const;

const LEVEL_LABEL: Record<string, { vi: string; en: string }> = {
  All: { vi: "Tất cả", en: "All" },
  Beginner: { vi: "Beginner", en: "Beginner" },
  Intermediate: { vi: "Intermediate", en: "Intermediate" },
  Advanced: { vi: "Advanced", en: "Advanced" },
  Manufacturing: { vi: "Manufacturing Analytics", en: "Manufacturing Analytics" },
};

export default function SqlExercisesView({ sqlExercises }: { sqlExercises: SqlExercise[] }) {
  const { lang } = useLang();
  const t = useT();
  const vi = lang === "vi";
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [level, setLevel] = useState<(typeof LEVELS)[number]>("All");

  const visible = level === "All" ? sqlExercises : sqlExercises.filter((ex) => ex.level === level);
  const titleOf = (ex: SqlExercise, i: number) => (ex.title ? t(ex.title) : `${vi ? "Bài" : "Problem"} ${i + 1}`);

  // Nhóm theo chủ đề (SELECT, WHERE, JOIN, ...), giữ thứ tự xuất hiện trong danh sách bài.
  const groups = visible.reduce<Record<string, { ex: SqlExercise; i: number }[]>>((acc, ex, i) => {
    const key = ex.topic || (vi ? "Khác" : "Other");
    (acc[key] ??= []).push({ ex, i });
    return acc;
  }, {});

  return (
    <div className="lg:grid lg:grid-cols-[220px_minmax(0,1fr)] lg:items-start lg:gap-8">
      {/* Danh mục bên trái, nhóm theo chủ đề SQL, giống mục SQL TUTORIAL của W3Schools */}
      <aside className="hidden lg:sticky lg:top-24 lg:block lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto">
        <p className="mb-3 px-3 text-xs font-bold uppercase tracking-wider text-slate-500">{vi ? "Danh mục bài tập" : "Exercise list"}</p>
        <nav aria-label={vi ? "Danh mục bài tập" : "Exercise list"} className="space-y-4">
          {Object.entries(groups).map(([topic, items]) => (
            <div key={topic}>
              <p className="px-3 pb-1 text-sm font-semibold text-slate-900 dark:text-white">{topic}</p>
              <ul className="space-y-0.5 border-l border-slate-200 dark:border-slate-800">
                {items.map(({ ex, i }) => (
                  <li key={ex.id}>
                    <a
                      href={`#ex-${ex.id}`}
                      className="-ml-px block truncate border-l-2 border-transparent py-1 pl-4 pr-2 text-sm text-slate-600 transition hover:border-sky-500 hover:text-sky-700 dark:text-slate-400 dark:hover:text-sky-300"
                    >
                      {titleOf(ex, i)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>

      <div className="min-w-0">
        <PageHeader
          eyebrow="Practice · SQL"
          title="SQL Exercises"
          description={
            vi
              ? `${sqlExercises.length} bài tập trên bộ dữ liệu NOVA MANUFACTURING. Xem các bảng liên quan, viết truy vấn vào ô SQL rồi bấm Chạy. Chạy trực tiếp trên trình duyệt bằng PostgreSQL.`
              : `${sqlExercises.length} exercises on the NOVA MANUFACTURING dataset. Look at the related tables, write your query and press Run. Runs in your browser on PostgreSQL.`
          }
        />

        <Section title={vi ? "Thử SQL tự do" : "Free SQL"}>
          <SqlEditor initial="SELECT * FROM production_lines;" />
          <details className="mt-6">
            <summary className="cursor-pointer text-sm font-medium text-sky-700 dark:text-sky-300">{vi ? "Xem tất cả bảng dữ liệu" : "View all tables"}</summary>
            <div className="mt-4">
              <SchemaPanel />
            </div>
          </details>
        </Section>

        <Section title={vi ? "Bài tập" : "Exercises"}>
          <div className="mb-6 flex flex-wrap gap-2" role="group" aria-label="Level">
            {LEVELS.map((l) => {
              const count = l === "All" ? sqlExercises.length : sqlExercises.filter((ex) => ex.level === l).length;
              return (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLevel(l)}
                  aria-pressed={level === l}
                  className={`rounded-full border px-3 py-1 text-sm transition ${
                    level === l ? "border-sky-600 bg-sky-600 text-white" : "border-slate-300 bg-white hover:border-sky-500 dark:border-slate-700 dark:bg-slate-900"
                  }`}
                >
                  {LEVEL_LABEL[l][lang]} ({count})
                </button>
              );
            })}
          </div>

          <div className="space-y-6">
            {visible.map((ex, i) => (
              <div
                key={ex.id}
                id={`ex-${ex.id}`}
                className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <span className="font-semibold text-slate-900 dark:text-white">{titleOf(ex, i)}</span>
                  <Badge tone="sky">{ex.level}</Badge>
                  {ex.topic && <Badge>{ex.topic}</Badge>}
                </div>
                <p className="mb-4 leading-relaxed text-slate-700 dark:text-slate-300">{t(ex.question)}</p>

                {tablesIn(ex.solution).length > 0 && (
                  <div className="mb-5">
                    <p className="mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300">{vi ? "Bảng liên quan" : "Related tables"}</p>
                    <SchemaPanel names={tablesIn(ex.solution)} />
                  </div>
                )}

                <SqlEditor placeholder={vi ? "-- Viết truy vấn của bạn ở đây" : "-- Write your query here"} expected={ex.solution} exerciseId={ex.id} />

                <button
                  type="button"
                  onClick={() => setRevealed((r) => ({ ...r, [ex.id]: !r[ex.id] }))}
                  className="mt-5 rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium hover:border-sky-500 dark:border-slate-700"
                  aria-expanded={!!revealed[ex.id]}
                >
                  {revealed[ex.id] ? (vi ? "Ẩn đáp án" : "Hide answer") : vi ? "Xem đáp án" : "Show answer"}
                </button>
                {revealed[ex.id] && (
                  <div className="mt-4 space-y-3">
                    <CodeBlock code={ex.solution} />
                    <AnswerResult sql={ex.solution} />
                    {ex.explanation && <p className="text-sm text-slate-600 dark:text-slate-400">{t(ex.explanation)}</p>}
                  </div>
                )}

                <ExerciseComments exerciseId={ex.id} />
              </div>
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
}
