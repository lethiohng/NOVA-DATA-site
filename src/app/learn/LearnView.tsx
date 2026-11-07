"use client";

import Link from "next/link";
import type { Category, Roadmap } from "@/lib/content";
import type { getResources } from "@/lib/data";
import { useLang, useT } from "@/lib/i18n";
import { Badge, Card, Icon, IconBox, type IconName, PageHeader, Section } from "@/components/ui";

type Resource = Awaited<ReturnType<typeof getResources>>[number];

// Icon cho từng danh mục, theo slug trong content.ts. Danh mục lạ thì dùng icon sách.
const CATEGORY_ICONS: Record<string, IconName> = {
  "data-fundamentals": "database",
  "sql-database": "code",
  "business-intelligence": "chart",
  "manufacturing-analytics": "factory",
  "industrial-iot": "antenna",
  "digital-manufacturing": "monitor",
};

const practiceTools: { href: string; icon: IconName; title: { vi: string; en: string }; desc: { vi: string; en: string } }[] = [
  { href: "/practice/sql", icon: "code", title: { vi: "SQL Exercises", en: "SQL Exercises" }, desc: { vi: "100 bài SQL trên bộ dữ liệu sản xuất, có đáp án.", en: "100 SQL problems on a manufacturing dataset, with answers." } },
  { href: "/practice/kpi", icon: "chart", title: { vi: "KPI Dictionary", en: "KPI Dictionary" }, desc: { vi: "Định nghĩa, công thức và dữ liệu cần có của từng KPI.", en: "Definitions, formulas and required data for each KPI." } },
  { href: "/practice/challenges", icon: "shield", title: { vi: "BI Challenges", en: "BI Challenges" }, desc: { vi: "Case study có file dữ liệu để tự phân tích.", en: "Case studies with data files to analyze on your own." } },
  { href: "/practice/playground", icon: "database", title: { vi: "Data Playground", en: "Data Playground" }, desc: { vi: "Tải file CSV mẫu và tự phân tích.", en: "Download sample CSV files and analyze them yourself." } },
];

export default function LearnView({ categories, roadmaps, resources }: { categories: Category[]; roadmaps: Roadmap[]; resources: Resource[] }) {
  const t = useT();
  const { lang } = useLang();
  const vi = lang === "vi";

  return (
    <>
      <PageHeader
        eyebrow="Learn"
        title={vi ? "Học tập" : "Learn"}
        description={
          vi
            ? "Tài liệu đã sẵn sàng, bạn chỉ cần chọn chủ đề mình thích và bắt đầu học thôi. Cùng học Data với Nova nhé!"
            : "Knowledge by category, step-by-step learning paths, a practice area and reference materials. Pick a section below to start."
        }
      />

      <Section id="knowledge" title={vi ? "Kiến thức" : "Knowledge"}>
        <div className="grid gap-4 sm:grid-cols-2">
          {categories.map((c) => {
            // Danh mục mở được khi có chủ đề xuất bản hoặc có khóa học (chủ đề có cấp độ, ví dụ khóa SQL).
            return (
              <Card key={c.slug} href={`/learn/${c.slug}`}>
                <IconBox name={CATEGORY_ICONS[c.slug] ?? "book"} />
                <h3 className="font-semibold text-slate-900 dark:text-white">{t(c.title)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{t(c.description)}</p>
                <div className="mt-3 flex items-center gap-2 text-xs font-medium text-slate-500">
                  <span>
                    {c.topics.length} {vi ? "chủ đề" : "topics"}
                  </span>
                </div>
              </Card>
            );
          })}
        </div>
      </Section>

      <Section id="practice" title={vi ? "Luyện tập" : "Practice"}>
        <div className="grid gap-4 sm:grid-cols-2">
          {practiceTools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-sky-400 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-sky-600"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-600 ring-1 ring-sky-100 dark:bg-slate-800 dark:text-sky-400 dark:ring-slate-700">
                <Icon name={tool.icon} />
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-slate-900 dark:text-white">{tool.title[lang]}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{tool.desc[lang]}</p>
              </div>
              <span aria-hidden className="mt-1 text-sky-600 transition group-hover:translate-x-1 dark:text-sky-400">→</span>
            </Link>
          ))}
        </div>
      </Section>

      <Section id="resources" title={vi ? "Tài liệu & công cụ" : "Resources"}>
        <div className="grid gap-4 md:grid-cols-2">
          {resources.map((r) => (
            <div
              key={r.type + r.title.en}
              className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex items-start justify-between gap-3">
                <IconBox name="file" />
                <Badge tone="sky">{r.type}</Badge>
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white">{t(r.title)}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{t(r.description)}</p>
              {r.href && (
                <a href={r.href} download className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-sky-600 hover:underline dark:text-sky-400">
                  <Icon name="download" className="h-4 w-4" />
                  {vi ? "Tải xuống" : "Download"}
                </a>
              )}
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
