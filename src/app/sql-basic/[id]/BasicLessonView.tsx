"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { CodeBlock, Section, TableWrap } from "@/components/ui";
import { SqlEditor } from "@/components/SqlLab";
import LessonDoneButton from "@/components/LessonDoneButton";
import LessonSidebar from "@/components/LessonSidebar";
import LessonHeader from "@/components/LessonHeader";
import type { BasicLesson, BasicLessonEn } from "@/lib/sql-basic/types";
import { BASIC_LESSONS, BASIC_MODULES, lessonNumber, moduleNumber } from "@/lib/sql-basic";
import { BASIC_EN, BASIC_MODULES_EN } from "@/lib/sql-basic/en";

type SampleTable = { table: string; columns: { name: string; type: string }[]; rows: string[][] };

const LABELS = {
  vi: {
    sidebar: "Danh sách bài học",
    objectives: "Mục tiêu",
    prerequisites: "Kiến thức cần có",
    explanation: "Giải thích",
    syntax: "Cú pháp",
    example: "Ví dụ",
    factory: "Tình huống nhà máy",
    exercises: "Bài tập",
    tableLabel: "Bảng dữ liệu:",
    practice1: "Bài 1 (có gợi ý)",
    practice2: "Bài 2 (tự làm)",
    hint: "Gợi ý",
    solution: "Xem đáp án",
    mistakes: "Lỗi thường gặp",
    summary: "Tóm tắt",
    placeholder: "-- Viết truy vấn của bạn ở đây",
    back: "← Khóa SQL",
    minutes: "phút",
    module: "Module",
    otherCourse: "Khóa SQL",
  },
  en: {
    sidebar: "Lessons",
    objectives: "Learning objectives",
    prerequisites: "Prerequisites",
    explanation: "Explanation",
    syntax: "Syntax",
    example: "Example",
    factory: "Factory scenario",
    exercises: "Exercises",
    tableLabel: "Data table:",
    practice1: "Exercise 1 (with hint)",
    practice2: "Exercise 2 (try it yourself)",
    hint: "Hint",
    solution: "Show answer",
    mistakes: "Common mistakes",
    summary: "Summary",
    placeholder: "-- Write your query here",
    back: "← SQL course",
    minutes: "min",
    module: "Module",
    otherCourse: "SQL course",
  },
} as const;

/* Nội dung bài học SQL Basic, hiển thị theo ngôn ngữ đang chọn. Bản tiếng Anh lấy từ BASIC_EN, thiếu thì dùng tiếng Việt. */
export default function BasicLessonView({
  lesson,
  prev,
  next,
  samples,
}: {
  lesson: BasicLesson;
  prev?: BasicLesson;
  next?: BasicLesson;
  samples: SampleTable[];
}) {
  const { lang } = useLang();
  const L = LABELS[lang];
  const en: BasicLessonEn | undefined = BASIC_EN[lesson.id];
  const isEn = lang === "en" && Boolean(en);

  const title = isEn ? en!.title : lesson.title;
  const objectives = isEn ? en!.objectives : lesson.objectives;
  const prerequisites = isEn ? en!.prerequisites : lesson.prerequisites;
  const explanation = isEn ? en!.explanation : lesson.explanation;
  const factory = isEn ? en!.factory : lesson.factory;
  const exampleExplain = isEn ? en!.example.explain : lesson.example.explain;
  const mistakes = isEn ? en!.mistakes : lesson.mistakes;
  const summary = isEn ? en!.summary : lesson.summary;
  const practice = lesson.practice.map((p, i) => ({
    question: isEn ? en!.practice[i]?.question ?? p.question : p.question,
    hint: isEn ? en!.practice[i]?.hint ?? p.hint : p.hint,
    solution: p.solution,
  }));

  const moduleTitle = (m: number) => (isEn ? BASIC_MODULES_EN[m]?.title : BASIC_MODULES.find((x) => x.number === m)?.title);
  const moduleDesc = (m: number) => (isEn ? BASIC_MODULES_EN[m]?.description : BASIC_MODULES.find((x) => x.number === m)?.description);
  const lessonTitle = (l: BasicLesson) => (lang === "en" && BASIC_EN[l.id] ? BASIC_EN[l.id].title : l.title);

  return (
    <div className="lg:grid lg:grid-cols-[240px_minmax(0,1fr)] lg:items-start lg:gap-8">
      <LessonSidebar
        heading={L.sidebar}
        modules={BASIC_MODULES.map((m) => ({ number: m.number, label: `${L.module} ${moduleNumber(m.number)}`, title: moduleTitle(m.number) ?? m.title }))}
        lessons={BASIC_LESSONS.map((x) => ({ id: x.id, number: lessonNumber(x), title: lessonTitle(x), module: x.module, minutes: x.minutes }))}
        currentId={lesson.id}
        hrefBase="/sql-basic"
      />

      <article className="min-w-0 max-w-3xl">
        <LessonHeader
          lang={lang}
          course={{ title: "SQL Basic", href: "/sql-basic" }}
          moduleLabel={`${L.module} ${moduleNumber(lesson.module)}`}
          number={lessonNumber(lesson)}
          title={title}
          minutes={lesson.minutes}
          level="Beginner"
          access={{ label: lang === "en" ? "Free" : "Miễn phí", tone: "green" }}
          totalLessons={BASIC_LESSONS.length}
          totalMinutes={BASIC_LESSONS.reduce((s, x) => s + x.minutes, 0)}
        />
        <div className="mt-6">
          <LessonDoneButton courseKey="sql-basic" lessonId={lesson.id} />
        </div>

        <div className="mt-8 space-y-10">
          <Section title={L.objectives}>
            <ul className="list-disc space-y-1 pl-6">
              {objectives.map((o) => (
                <li key={o}>{o}</li>
              ))}
            </ul>
          </Section>

          <Section title={L.prerequisites}>
            <p className="leading-relaxed">{prerequisites}</p>
          </Section>

          <Section title={L.explanation}>
            <div className="space-y-3">
              {explanation.map((p) => (
                <p key={p} className="leading-relaxed">{p}</p>
              ))}
            </div>
          </Section>

          <Section title={L.syntax}>
            <CodeBlock code={lesson.syntax} />
          </Section>

          <Section title={L.example}>
            <CodeBlock code={lesson.example.sql} />
            <ul className="mt-4 list-disc space-y-1 pl-6 text-sm text-slate-700 dark:text-slate-300">
              {exampleExplain.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          </Section>

          <Section title={L.factory}>
            <p className="leading-relaxed">{factory}</p>
          </Section>

          <Section title={L.exercises}>
            {samples.map((s) => (
              <div key={s.table} className="mb-6">
                <p className="mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                  {L.tableLabel} <span className="font-mono">{s.table}</span>
                </p>
                <div className="mb-3 flex flex-wrap gap-1.5">
                  {s.columns.map((c) => (
                    <span key={c.name} className="rounded-md bg-slate-100 px-2 py-0.5 font-mono text-xs dark:bg-slate-800">
                      {c.name} <span className="text-slate-400">{c.type}</span>
                    </span>
                  ))}
                </div>
                <TableWrap>
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 dark:bg-slate-800">
                      <tr>
                        {s.columns.map((c) => (
                          <th key={c.name} className="whitespace-nowrap px-3 py-2 font-semibold">
                            {c.name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {s.rows.map((row, i) => (
                        <tr key={i} className="border-t border-slate-100 dark:border-slate-800">
                          {row.map((v, j) => (
                            <td key={j} className="whitespace-nowrap px-3 py-2 font-mono">
                              {v === "NULL" ? <span className="text-slate-400">NULL</span> : v}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </TableWrap>
              </div>
            ))}
            <div className="space-y-4">
              {practice.map((p, i) => (
                <div key={lesson.practice[i].question} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <p className="font-semibold text-slate-900 dark:text-white">
                    {i === 0 ? L.practice1 : L.practice2}: {p.question}
                  </p>
                  <div className="mt-4">
                    <SqlEditor placeholder={L.placeholder} expected={p.solution} />
                  </div>
                  <details className="mt-3">
                    <summary className="cursor-pointer text-sm font-medium text-sky-600 dark:text-sky-400">{L.hint}</summary>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{p.hint}</p>
                  </details>
                  <details className="mt-2">
                    <summary className="cursor-pointer text-sm font-medium text-sky-600 dark:text-sky-400">{L.solution}</summary>
                    <div className="mt-3">
                      <CodeBlock code={p.solution} />
                    </div>
                  </details>
                </div>
              ))}
            </div>
          </Section>

          <Section title={L.mistakes}>
            <ul className="list-disc space-y-2 pl-6">
              {mistakes.map((m) => (
                <li key={m} className="leading-relaxed">{m}</li>
              ))}
            </ul>
          </Section>

          <Section title={L.summary}>
            <ul className="list-disc space-y-1 pl-6">
              {summary.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </Section>
        </div>

        <div className="mt-10 flex items-center justify-between gap-4 border-t border-slate-200 pt-6 text-sm dark:border-slate-800">
          {prev ? (
            <Link href={`/sql-basic/${prev.id}`} className="font-medium text-sky-600 hover:underline dark:text-sky-400">
              ← {lessonNumber(prev)}. {lessonTitle(prev)}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link href={`/sql-basic/${next.id}`} className="text-right font-medium text-sky-600 hover:underline dark:text-sky-400">
              {lessonNumber(next)}. {lessonTitle(next)} →
            </Link>
          ) : (
            <span />
          )}
        </div>
        <p className="mt-8 text-sm">
          <Link href="/learn/sql-database" className="hover:text-sky-600">
            {L.back}
          </Link>
        </p>
      </article>
    </div>
  );
}
