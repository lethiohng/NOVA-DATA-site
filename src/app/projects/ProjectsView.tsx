"use client";

import type { Project } from "@/lib/content";
import { useT } from "@/lib/i18n";
import { Badge, Card, PageHeader } from "@/components/ui";

export default function ProjectsView({ projects }: { projects: Project[] }) {
  const t = useT();
  return (
    <>
      <PageHeader
        eyebrow="04 · Projects"
        title="Thư viện dự án"
        description="Dự án dùng dữ liệu giả lập hoặc đã ẩn danh. Không đưa dữ liệu nội bộ, thông tin khách hàng hay hình ảnh chưa được phép công bố."
      />
      <div className="grid gap-4 md:grid-cols-2">
        {projects.map((p) => (
          <Card key={p.slug} href={`/projects/${p.slug}`}>
            <h2 className="font-semibold">{t(p.title)}</h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{t(p.summary)}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {p.tags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
