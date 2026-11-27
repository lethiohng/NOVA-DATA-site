import Link from "next/link";
import { ADVANCED_GROUPS, ADVANCED_LESSONS, ADVANCED_MODULES, advancedLessonNumber } from "@/lib/sql-advanced";
import { PageHeader, Section } from "@/components/ui";
import { DatasetNote } from "@/components/DatasetNote";
import LessonList from "@/components/LessonList";

export default function SqlAdvancedPage() {
  return (
    <>
      <PageHeader
        eyebrow="SQL · Advanced"
        title="SQL Advanced"
        description={`${ADVANCED_LESSONS.length} bài học SQL nâng cao trên bộ dữ liệu NOVA MANUFACTURING: truy vấn phức tạp, xử lý dữ liệu, mô hình hóa và bài toán BI sản xuất thực tế.`}
      />

      <DatasetNote />

      {ADVANCED_GROUPS.map((g) => (
        <div key={g.number} className="mt-12 first:mt-8">
          <p className="mb-4 text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
            Nhóm {g.number}: {g.title}
          </p>
          {ADVANCED_MODULES.filter((m) => m.group === g.number).map((m) => (
            <Section key={m.number} title={`Module ${m.number}: ${m.title}`}>
              <p className="mb-4 text-slate-600 dark:text-slate-400">{m.description}</p>
              <LessonList
                courseKey="sql-advanced"
                items={ADVANCED_LESSONS.filter((l) => l.module === m.number).map((l) => ({
                  id: l.id,
                  href: `/sql-advanced/${l.id}`,
                  number: advancedLessonNumber(l),
                  title: l.title,
                  minutes: l.minutes,
                }))}
              />
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
