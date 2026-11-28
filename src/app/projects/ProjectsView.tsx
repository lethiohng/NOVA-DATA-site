"use client";

import type { Project } from "@/lib/content";
import { useT } from "@/lib/i18n";
import { stripHtml } from "@/lib/rich";
import { useAccess } from "@/lib/use-access";
import { Badge, Card, PageHeader } from "@/components/ui";

export default function ProjectsView({ projects }: { projects: Project[] }) {
  const t = useT();
  const access = useAccess();
  return (
    <>
      <PageHeader
        eyebrow="04 · Projects"
        title="Thư viện dự án"
        description="Dự án dùng dữ liệu giả lập hoặc đã ẩn danh. Không đưa dữ liệu nội bộ, thông tin khách hàng hay hình ảnh chưa được phép công bố."
      />
      <div className="grid gap-4 md:grid-cols-2">
        {projects.map((p) =>
          access.ready && access.isLocked("project", p.slug) ? (
            <div key={p.slug} className="rounded-2xl border border-dashed border-violet-300 bg-violet-50/50 p-6 dark:border-violet-900 dark:bg-violet-950/20">
              <h2 className="font-semibold text-slate-500">{t(p.title)}</h2>
              <span className="mt-3 inline-flex text-xs font-semibold text-violet-700 dark:text-violet-300">🔒 Pro</span>
            </div>
          ) : (
            <Card key={p.slug} href={`/projects/${p.slug}`}>
              <h2 className="font-semibold">{t(p.title)}</h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{stripHtml(t(p.summary))}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {p.tags.map((tag) => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
              </div>
            </Card>
          )
        )}
      </div>
    </>
  );
}
