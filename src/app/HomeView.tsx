"use client";

import Link from "next/link";
import type { Category, Project, Roadmap } from "@/lib/content";
import { useLang, useT } from "@/lib/i18n";
import { Card, CardArrow, IconBox, type IconName } from "@/components/ui";

const CATEGORY_ICONS: Record<string, IconName> = {
  "data-fundamentals": "database",
  "sql-database": "code",
  "business-intelligence": "chart",
  "manufacturing-analytics": "factory",
  "industrial-iot": "antenna",
  "digital-manufacturing": "monitor",
};

/* Tiêu đề mục: thanh đỏ bên trái, liên kết "xem tất cả" bên phải. */
function SectionHead({ title, href, linkLabel }: { title: string; href?: string; linkLabel?: string }) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <h2 className="flex items-center gap-3 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
        <span aria-hidden className="h-6 w-1 rounded-full bg-sky-600" />
        {title}
      </h2>
      {href && linkLabel && (
        <Link href={href} className="shrink-0 text-sm font-semibold text-sky-600 transition hover:underline dark:text-sky-400">
          {linkLabel} →
        </Link>
      )}
    </div>
  );
}

export default function HomeView({ categories, roadmaps, projects }: { categories: Category[]; roadmaps: Roadmap[]; projects: Project[] }) {
  const t = useT();
  const { lang } = useLang();
  const vi = lang === "vi";

  return (
    <div className="space-y-20">
      {/* Hero */}
      <section className="grid items-center gap-12 md:grid-cols-2">
        <div>
          <span className="inline-flex rounded-full bg-sky-50 px-3 py-1 text-sm font-semibold text-sky-700 ring-1 ring-sky-100 dark:bg-sky-950/50 dark:text-sky-300 dark:ring-sky-900">
            Manufacturing Data Platform
          </span>
          <h1 className="mt-6 text-5xl font-bold leading-[1.1] tracking-tight md:text-6xl">
            <span className="block text-navy-900 dark:text-white">Learn Data.</span>
            <span className="block text-navy-900 dark:text-white">Analyze Production.</span>
            <span className="block text-sky-600 dark:text-sky-400">Build Solutions.</span>
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-slate-600 dark:text-slate-400">
            {vi
              ? "Thư viện kiến thức BI và SQL, lộ trình học, 100 bài tập trên bộ dữ liệu sản xuất giả lập và các dự án phân tích thực tế."
              : "A knowledge hub on BI and SQL, learning paths, 100 exercises on a simulated manufacturing dataset, and real analytics projects."}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/learn" className="rounded-xl bg-sky-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700">
              {vi ? "Bắt đầu học" : "Start learning"} →
            </Link>
            <Link
              href="/projects"
              className="rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 transition hover:border-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            >
              {vi ? "Xem dự án" : "Explore projects"}
            </Link>
          </div>
        </div>
        <div className="overflow-hidden rounded-3xl border border-slate-200 shadow-xl dark:border-slate-800">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://mvhzyhdwmhdgossmpblj.supabase.co/storage/v1/object/public/brand/hero/home-hero.png" alt="" className="aspect-video w-full object-cover" />
        </div>
      </section>


      {/* Kiến thức nổi bật */}
      <section>
        <SectionHead title={vi ? "Kiến thức nổi bật" : "Featured knowledge"} href="/learn" linkLabel={vi ? "Xem tất cả" : "View all"} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <Card key={c.slug} href={`/learn/${c.slug}`}>
              <IconBox name={CATEGORY_ICONS[c.slug] ?? "book"} />
              <h3 className="font-semibold text-slate-900 dark:text-white">{t(c.title)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{t(c.description)}</p>
              <div className="mt-5 flex items-center justify-between border-t border-slate-200 pt-4 text-sm dark:border-slate-800">
                <span className="text-slate-500">
                  {c.topics.length} {vi ? "chủ đề" : "topics"}
                </span>
                <CardArrow />
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Lộ trình học tập */}
      <section>
        <SectionHead title={vi ? "Lộ trình học tập" : "Learning paths"} href="/learn" linkLabel={vi ? "Khám phá lộ trình" : "Explore paths"} />
        <div className="grid gap-5 md:grid-cols-2">
          {roadmaps.map((r) => (
            <Card key={r.slug} href={`/roadmap/${r.slug}`}>
              <IconBox name="map" />
              <h3 className="font-semibold text-slate-900 dark:text-white">{t(r.title)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{t(r.description)}</p>
              <div className="mt-5 flex items-center justify-between border-t border-slate-200 pt-4 text-sm dark:border-slate-800">
                <span className="text-slate-500">
                  {r.modules.length} {vi ? "module" : "modules"}
                </span>
                <CardArrow />
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Dự án tiêu biểu */}
      <section>
        <SectionHead title={vi ? "Dự án tiêu biểu" : "Featured projects"} href="/projects" linkLabel={vi ? "Xem tất cả dự án" : "View all projects"} />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.slice(0, 3).map((p) => (
            <Card key={p.slug} href={`/projects/${p.slug}`}>
              <h3 className="font-semibold text-slate-900 dark:text-white">{t(p.title)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{t(p.summary)}</p>
              <CardArrow />
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
