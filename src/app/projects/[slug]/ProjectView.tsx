"use client";

import Link from "next/link";
import type { Project } from "@/lib/content";
import { useLang, useT } from "@/lib/i18n";
import { Badge, PageHeader, Section } from "@/components/ui";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import RichBlock from "@/components/RichBlock";
import { stripHtml } from "@/lib/rich";
import LockedNotice from "@/components/LockedNotice";
import { useAccess } from "@/lib/use-access";

const labels = {
  vi: {
    problem: "Business Problem – Vấn đề kinh doanh",
    data: "Data Structure – Cấu trúc dữ liệu",
    solution: "Solution – Giải pháp",
    dashboard: "Dashboard",
    value: "Business Value – Giá trị",
    back: "← Tất cả dự án",
  },
  en: {
    problem: "Business Problem",
    data: "Data Structure",
    solution: "Solution",
    dashboard: "Dashboard",
    value: "Business Value",
    back: "← All projects",
  },
};

export default function ProjectView({ project }: { project: Project }) {
  const t = useT();
  const { lang } = useLang();
  const access = useAccess();
  const L = labels[lang];

  // Thứ tự theo chuẩn: Business Problem → Data Structure → Solution → Dashboard → Business Value
  const steps = [
    { title: L.problem, body: t(project.businessProblem) },
    { title: L.data, body: t(project.dataStructure) },
    { title: L.solution, body: t(project.solution) },
    { title: L.dashboard, body: t(project.dashboard) },
    { title: L.value, body: t(project.businessValue) },
  ];

  if (access.ready && access.isLocked("project", project.slug)) {
    return (
      <div className="max-w-3xl">
        <p className="text-sm">
          <Link href="/projects" className="text-slate-500 hover:text-sky-600">
            ← {lang === "vi" ? "Thư viện dự án" : "Projects"}
          </Link>
        </p>
        <h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl dark:text-white">{t(project.title)}</h1>
        <div className="mt-6">
          <LockedNotice />
        </div>
      </div>
    );
  }

  return (
    <>
      <PageHeader eyebrow="Project" title={t(project.title)} description={stripHtml(t(project.summary))} />
      <div className="mb-8 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <Badge key={tag} tone="sky">
            {tag}
          </Badge>
        ))}
      </div>
      <div className="max-w-3xl">
        <YouTubeEmbed url={project.youtube} title={t(project.title)} />
      </div>
      <div className="max-w-3xl space-y-8">
        {steps.map((s, i) => (
          <Section key={s.title} title={`${i + 1}. ${s.title}`}>
            <RichBlock text={s.body} />
          </Section>
        ))}
      </div>
      <p className="mt-8 text-sm">
        <Link href="/projects" className="text-slate-500 hover:text-sky-600">{L.back}</Link>
      </p>
    </>
  );
}
