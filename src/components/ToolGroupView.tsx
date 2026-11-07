"use client";

import Link from "next/link";
import type { Category } from "@/lib/content";
import { useLang, useT } from "@/lib/i18n";
import { Badge, Card, PageHeader } from "@/components/ui";
import type { TopicGroup } from "@/lib/tool-group";

/* Trang liệt kê các bài trong một nhóm; mỗi thẻ mở bài riêng. */
export default function ToolGroupView({ category, group }: { category: Category; group: TopicGroup }) {
  const t = useT();
  const { lang } = useLang();
  const vi = lang === "vi";
  const items = group.topicSlugs
    .map((s) => category.topics.find((tp) => tp.slug === s))
    .filter((tp): tp is NonNullable<typeof tp> => Boolean(tp));

  return (
    <>
      <PageHeader eyebrow="Learn" title={t(group.title)} description={t(group.description)} />
      <div className="grid gap-4 sm:grid-cols-2">
        {items.map((item, i) => (
          <Card key={item.slug} href={item.status === "published" ? `/learn/${category.slug}/${item.slug}` : undefined}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="font-mono text-xs text-slate-400">{String(i + 1).padStart(2, "0")}</span>
                <h2 className="mt-1 font-semibold">{t(item.title)}</h2>
              </div>
              {item.status === "published" && <Badge tone="green">{vi ? "Đã có bài" : "Available"}</Badge>}
            </div>
          </Card>
        ))}
      </div>
      <p className="mt-8 text-sm text-slate-500">
        <Link href={`/learn/${category.slug}`} className="hover:text-sky-600">
          ← {t(category.title)}
        </Link>
      </p>
    </>
  );
}
