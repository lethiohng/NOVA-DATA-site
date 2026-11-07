import Link from "next/link";
import { BASIC_LESSONS, BASIC_MODULES, lessonNumber, moduleNumber } from "@/lib/sql-basic";
import { PageHeader, Section } from "@/components/ui";

export default function SqlBasicPage() {
  return (
    <>
      <PageHeader
        eyebrow="SQL · Beginner"
        title="SQL Basic"
        description={`${BASIC_LESSONS.length} bài học SQL cơ bản trên bộ dữ liệu NOVA MANUFACTURING. Mỗi bài có giải thích, ví dụ, tình huống nhà máy và bài tập có gợi ý.`}
      />

      {BASIC_MODULES.map((m) => (
        <Section key={m.number} title={`Module ${moduleNumber(m.number)}: ${m.title}`}>
          <p className="mb-4 text-slate-600 dark:text-slate-400">{m.description}</p>
          <ol className="space-y-2">
            {BASIC_LESSONS.filter((l) => l.module === m.number).map((l) => (
              <li key={l.id}>
                <Link
                  href={`/sql-basic/${l.id}`}
                  className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm transition hover:border-sky-400 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-sky-600"
                >
                  <span className="min-w-0">
                    <span className="mr-3 font-mono text-xs text-slate-500">{lessonNumber(l)}</span>
                    <span className="font-medium text-slate-900 dark:text-white">{l.title}</span>
                  </span>
                  <span className="shrink-0 text-xs text-slate-500">{l.minutes} phút</span>
                </Link>
              </li>
            ))}
          </ol>
        </Section>
      ))}

      <p className="mt-8 text-sm">
        <Link href="/learn/sql-database" className="hover:text-sky-600">
          ← Khóa SQL
        </Link>
      </p>
    </>
  );
}
