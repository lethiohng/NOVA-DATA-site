import Link from "next/link";
import { ADVANCED_GROUPS, ADVANCED_LESSONS, ADVANCED_MODULES, advancedLessonNumber } from "@/lib/sql-advanced";
import { PageHeader, Section } from "@/components/ui";

export default function SqlAdvancedPage() {
  return (
    <>
      <PageHeader
        eyebrow="SQL · Advanced"
        title="SQL Advanced"
        description={`${ADVANCED_LESSONS.length} bài học SQL nâng cao trên bộ dữ liệu NOVA MANUFACTURING: truy vấn phức tạp, xử lý dữ liệu, mô hình hóa và bài toán BI sản xuất thực tế.`}
      />

      {ADVANCED_GROUPS.map((g) => (
        <div key={g.number} className="mt-12 first:mt-8">
          <p className="mb-4 text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
            Nhóm {g.number}: {g.title}
          </p>
          {ADVANCED_MODULES.filter((m) => m.group === g.number).map((m) => (
            <Section key={m.number} title={`Module ${m.number}: ${m.title}`}>
              <p className="mb-4 text-slate-600 dark:text-slate-400">{m.description}</p>
              <ol className="space-y-2">
                {ADVANCED_LESSONS.filter((l) => l.module === m.number).map((l) => (
                  <li key={l.id}>
                    <Link
                      href={`/sql-advanced/${l.id}`}
                      className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm transition hover:border-sky-400 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-sky-600"
                    >
                      <span className="min-w-0">
                        <span className="mr-3 font-mono text-xs text-slate-500">{advancedLessonNumber(l)}</span>
                        <span className="font-medium text-slate-900 dark:text-white">{l.title}</span>
                      </span>
                      <span className="shrink-0 text-xs text-slate-500">{l.minutes} phút</span>
                    </Link>
                  </li>
                ))}
              </ol>
            </Section>
          ))}
        </div>
      ))}

      <p className="mt-8 text-sm">
        <Link href="/learn/sql-database" className="hover:text-sky-600">
          ← Khóa SQL
        </Link>
      </p>
    </>
  );
}
