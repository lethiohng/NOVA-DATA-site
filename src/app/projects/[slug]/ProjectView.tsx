"use client";

import Link from "next/link";
import type { Project } from "@/lib/content";
import { useLang, useT } from "@/lib/i18n";
import { Badge, PageHeader, Section } from "@/components/ui";
import YouTubeEmbed from "@/components/YouTubeEmbed";

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
  const L = labels[lang];

  // Thứ tự theo chuẩn: Business Problem → Data Structure → Solution → Dashboard → Business Value
  const steps = [
    { title: L.problem, body: t(project.businessProblem) },
    { title: L.data, body: t(project.dataStructure) },
    { title: L.solution, body: t(project.solution) },
    { title: L.dashboard, body: t(project.dashboard) },
    { title: L.value, body: t(project.businessValue) },
  ];

  return (
    <>
      <PageHeader eyebrow="Project" title={t(project.title)} description={t(project.summary)} />
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
            <p className="leading-relaxed">{s.body}</p>
          </Section>
        ))}
      </div>
      <p className="mt-8 text-sm">
        <Link href="/projects" className="text-slate-500 hover:text-sky-600">{L.back}</Link>
      </p>
    </>
  );
}
