"use client";

import type { getPlaygroundFiles } from "@/lib/data";
import { useLang, useT } from "@/lib/i18n";
import { Card, PageHeader } from "@/components/ui";

export default function PlaygroundView({ playgroundFiles }: { playgroundFiles: Awaited<ReturnType<typeof getPlaygroundFiles>> }) {
  const { lang } = useLang();
  const t = useT();
  return (
    <>
      <PageHeader
        eyebrow="Practice · Playground"
        title="Data Playground"
        description={lang === "vi" ? "Tải file CSV mẫu và tự phân tích bằng Excel, Power BI hoặc SQL." : "Download sample CSV files and analyze them with Excel, Power BI or SQL."}
      />
      <div className="grid gap-4">
        {playgroundFiles.map((f) => (
          <Card key={f.href}>
            <h2 className="font-semibold">{f.name}</h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{t(f.description)}</p>
            <a href={f.href} download className="mt-3 inline-block rounded-md bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700">
              {lang === "vi" ? "Tải CSV" : "Download CSV"}
            </a>
          </Card>
        ))}
      </div>
    </>
  );
}
