import Link from "next/link";
import { notFound } from "next/navigation";
import {
  INTERMEDIATE_LESSONS,
  INTERMEDIATE_MODULES,
  getIntermediateLesson,
  intermediateLessonNumber,
  intermediateModuleNumber,
} from "@/lib/sql-intermediate";
import samples from "@/lib/sql-intermediate/sample-tables.json";
import { Badge, CodeBlock, Section, TableWrap } from "@/components/ui";
import { SqlEditor } from "@/components/SqlLab";
import PremiumGate from "@/components/PremiumGate";
import LessonDoneButton from "@/components/LessonDoneButton";
import LessonVideo from "@/components/LessonVideo";
import LessonSidebar from "@/components/LessonSidebar";
import LessonHeader from "@/components/LessonHeader";
import { formatVnd, sqlCourses } from "@/lib/content";

type SampleTable = { table: string; columns: { name: string; type: string }[]; rows: string[][] };
const SAMPLES = samples as Record<string, SampleTable[]>;

// Chỉ dựng các bài có trong danh sách; mã bài khác trả về 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return INTERMEDIATE_LESSONS.map((l) => ({ id: l.id }));
}

export default async function SqlIntermediateLessonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lesson = getIntermediateLesson(id);
  if (!lesson) notFound();

  const idx = INTERMEDIATE_LESSONS.findIndex((l) => l.id === id);
  const prev = INTERMEDIATE_LESSONS[idx - 1];
  const next = INTERMEDIATE_LESSONS[idx + 1];

  return (
    <div className="lg:grid lg:grid-cols-[240px_minmax(0,1fr)] lg:items-start lg:gap-8">
      <LessonSidebar
        heading="Danh sách bài học"
        modules={INTERMEDIATE_MODULES.map((m) => ({ number: m.number, label: `Module ${intermediateModuleNumber(m.number)}`, title: m.title }))}
        lessons={INTERMEDIATE_LESSONS.map((x) => ({ id: x.id, number: intermediateLessonNumber(x), title: x.title, module: x.module, minutes: x.minutes }))}
        currentId={id}
        hrefBase="/sql-intermediate"
      />

      <article className="min-w-0 max-w-3xl">
        <LessonHeader
          course={{ title: "SQL Intermediate", href: "/sql-intermediate" }}
          moduleLabel={`Module ${intermediateModuleNumber(lesson.module)}`}
          number={intermediateLessonNumber(lesson)}
          title={lesson.title}
          minutes={lesson.minutes}
          level="Intermediate"
          access={{ label: `Premium · ${formatVnd(sqlCourses.Intermediate.price ?? 0)}`, tone: "violet" }}
          totalLessons={INTERMEDIATE_LESSONS.length}
          totalMinutes={INTERMEDIATE_LESSONS.reduce((s, x) => s + x.minutes, 0)}
        />

        <PremiumGate course="sql-intermediate" courseTitle="SQL Intermediate" price={sqlCourses.Intermediate.price}>
          <LessonDoneButton courseKey="sql-intermediate" lessonId={lesson.id} />
        <div className="mt-8">
          <LessonVideo courseKey="sql-intermediate" lessonId={lesson.id} title={lesson.title} />
        </div>
        <div className="mt-8 space-y-10">
          <Section title="Mục tiêu">
            <ul className="list-disc space-y-1 pl-6">
              {lesson.objectives.map((o) => (
                <li key={o}>{o}</li>
              ))}
            </ul>
          </Section>

          <Section title="Kiến thức cần có">
            <p className="leading-relaxed">{lesson.prerequisites}</p>
          </Section>

          <Section title="Giải thích">
            <div className="space-y-3">
              {lesson.explanation.map((p) => (
                <p key={p} className="leading-relaxed">{p}</p>
              ))}
            </div>
          </Section>

          <Section title="Cú pháp">
            <CodeBlock code={lesson.syntax} />
          </Section>

          <Section title="Ví dụ">
            <CodeBlock code={lesson.example.sql} />
            <ul className="mt-4 list-disc space-y-1 pl-6 text-sm text-slate-700 dark:text-slate-300">
              {lesson.example.explain.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          </Section>

          <Section title="Tình huống nhà máy">
            <p className="leading-relaxed">{lesson.factory}</p>
          </Section>

          <Section title="Bài tập">
            {(SAMPLES[lesson.id] ?? []).map((s) => (
              <div key={s.table} className="mb-6">
                <p className="mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Bảng dữ liệu: <span className="font-mono">{s.table}</span>
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
              {lesson.practice.map((p, i) => (
                <div key={p.question} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <p className="font-semibold text-slate-900 dark:text-white">
                    {i === 0 ? "Bài 1 (có gợi ý)" : "Bài 2 (tự làm)"}: {p.question}
                  </p>
                  <div className="mt-4">
                    <SqlEditor placeholder="-- Viết truy vấn của bạn ở đây" expected={p.solution} />
                  </div>
                  <details className="mt-3">
                    <summary className="cursor-pointer text-sm font-medium text-sky-600 dark:text-sky-400">Gợi ý</summary>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{p.hint}</p>
                  </details>
                  <details className="mt-2">
                    <summary className="cursor-pointer text-sm font-medium text-sky-600 dark:text-sky-400">Xem đáp án</summary>
                    <div className="mt-3">
                      <CodeBlock code={p.solution} />
                    </div>
                  </details>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Lỗi thường gặp">
            <ul className="list-disc space-y-2 pl-6">
              {lesson.mistakes.map((m) => (
                <li key={m} className="leading-relaxed">{m}</li>
              ))}
            </ul>
          </Section>

          <Section title="Tóm tắt">
            <ul className="list-disc space-y-1 pl-6">
              {lesson.summary.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </Section>
        </div>
        </PremiumGate>

        <div className="mt-10 flex items-center justify-between gap-4 border-t border-slate-200 pt-6 text-sm dark:border-slate-800">
          {prev ? (
            <Link href={`/sql-intermediate/${prev.id}`} className="font-medium text-sky-600 hover:underline dark:text-sky-400">← {intermediateLessonNumber(prev)}. {prev.title}</Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link href={`/sql-intermediate/${next.id}`} className="text-right font-medium text-sky-600 hover:underline dark:text-sky-400">{intermediateLessonNumber(next)}. {next.title} →</Link>
          ) : (
            <span />
          )}
        </div>
      </article>
    </div>
  );
}
