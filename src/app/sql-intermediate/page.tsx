import Link from "next/link";
import { INTERMEDIATE_LESSONS, INTERMEDIATE_MODULES, intermediateLessonNumber, intermediateModuleNumber } from "@/lib/sql-intermediate";
import { PageHeader, Section } from "@/components/ui";
import { DatasetNote } from "@/components/DatasetNote";
import LessonList from "@/components/LessonList";

export default function SqlIntermediatePage() {
  return (
    <>
      <PageHeader
        eyebrow="SQL · Intermediate"
        title="SQL Intermediate"
        description={`${INTERMEDIATE_LESSONS.length} bài học SQL trung cấp trên bộ dữ liệu NOVA MANUFACTURING: JOIN, subquery, CTE, hàm và window function.`}
      />

      <DatasetNote />

      {INTERMEDIATE_MODULES.map((m) => (
        <Section key={m.number} title={`Module ${intermediateModuleNumber(m.number)}: ${m.title}`}>
          <p className="mb-4 text-slate-600 dark:text-slate-400">{m.description}</p>
          <LessonList
            courseKey="sql-intermediate"
            items={INTERMEDIATE_LESSONS.filter((l) => l.module === m.number).map((l) => ({
              id: l.id,
              href: `/sql-intermediate/${l.id}`,
              number: intermediateLessonNumber(l),
              title: l.title,
              minutes: l.minutes,
            }))}
          />
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
