"use client";

import Link from "next/link";
import { BASIC_LESSONS, BASIC_MODULES, lessonNumber, moduleNumber } from "@/lib/sql-basic";
import { BASIC_EN, BASIC_MODULES_EN } from "@/lib/sql-basic/en";
import { PageHeader, Section } from "@/components/ui";
import { DatasetNote } from "@/components/DatasetNote";
import LessonList from "@/components/LessonList";
import { useLang } from "@/lib/i18n";

export default function SqlBasicPage() {
  const { lang } = useLang();
  const vi = lang === "vi";
  const modTitle = (n: number, fallback: string) => (!vi && BASIC_MODULES_EN[n]?.title) || fallback;
  const modDesc = (n: number, fallback: string) => (!vi && BASIC_MODULES_EN[n]?.description) || fallback;
  const lessonTitle = (id: string, fallback: string) => (!vi && BASIC_EN[id]?.title) || fallback;

  return (
    <>
      <PageHeader
        eyebrow="SQL · Beginner"
        title="SQL Basic"
        description={
          vi
            ? `${BASIC_LESSONS.length} bài học SQL cơ bản trên bộ dữ liệu NOVA MANUFACTURING. Mỗi bài có giải thích, ví dụ, tình huống nhà máy và bài tập có gợi ý.`
            : `${BASIC_LESSONS.length} SQL Basic lessons on the NOVA MANUFACTURING dataset. Each lesson has an explanation, an example, a factory scenario and exercises with hints.`
        }
      />

      <DatasetNote />

      {BASIC_MODULES.map((m) => (
        <Section key={m.number} title={`${vi ? "Module" : "Module"} ${moduleNumber(m.number)}: ${modTitle(m.number, m.title)}`}>
          <p className="mb-4 text-slate-600 dark:text-slate-400">{modDesc(m.number, m.description)}</p>
          <LessonList
            courseKey="sql-basic"
            items={BASIC_LESSONS.filter((l) => l.module === m.number).map((l) => ({
              id: l.id,
              href: `/sql-basic/${l.id}`,
              number: lessonNumber(l),
              title: lessonTitle(l.id, l.title),
              minutes: l.minutes,
            }))}
          />
        </Section>
      ))}

      <p className="mt-8 text-sm">
        <Link href="/learn/sql-database" className="hover:text-sky-600">
          {vi ? "← Khóa SQL" : "← SQL course"}
        </Link>
      </p>
    </>
  );
}
