"use client";

import Link from "next/link";
import type { Roadmap } from "@/lib/content";
import { useLang, useT } from "@/lib/i18n";
import { Badge, PageHeader } from "@/components/ui";

const labels = {
  vi: { knowledge: "Kiến thức cần đạt", lessons: "Bài học liên quan", practice: "Bài thực hành", status: "Trạng thái" },
  en: { knowledge: "Expected knowledge", lessons: "Related lessons", practice: "Practice", status: "Status" },
};

export default function RoadmapView({ roadmap }: { roadmap: Roadmap }) {
  const t = useT();
  const { lang } = useLang();
  const L = labels[lang];

  return (
    <>
      <PageHeader eyebrow="Learning Path" title={t(roadmap.title)} description={t(roadmap.description)} />
      <ol className="space-y-4">
        {roadmap.modules.map((m, i) => (
          <li key={m.title.vi} className="rounded-xl border border-slate-200 p-5 dark:border-slate-800">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="font-semibold">
                {i + 1}. {t(m.title)}
              </h2>
              {m.status === "published" ? <Badge tone="green">{lang === "vi" ? "Đã có nội dung" : "Available"}</Badge> : <Badge tone="amber">{lang === "vi" ? "Đang soạn" : "In progress"}</Badge>}
            </div>
            <dl className="mt-3 grid gap-2 text-sm md:grid-cols-[10rem_1fr]">
              <dt className="font-medium text-slate-500">{L.knowledge}</dt>
              <dd>{t(m.knowledge)}</dd>
              <dt className="font-medium text-slate-500">{L.lessons}</dt>
              <dd className="flex flex-wrap gap-2">
                {m.lessons.length === 0 && <span className="text-slate-400">—</span>}
                {m.lessons.map((l) => (
                  <span key={l} className="rounded bg-slate-100 px-2 py-0.5 dark:bg-slate-800">
                    {l}
                  </span>
                ))}
              </dd>
              <dt className="font-medium text-slate-500">{L.practice}</dt>
              <dd>{t(m.practice)}</dd>
            </dl>
          </li>
        ))}
      </ol>
      <p className="mt-8 text-sm">
        <Link href="/learn" className="text-slate-500 hover:text-sky-600">← Learn</Link>
      </p>
    </>
  );
}
