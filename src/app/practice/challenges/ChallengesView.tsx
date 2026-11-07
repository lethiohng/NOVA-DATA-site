"use client";

import Link from "next/link";
import type { getChallenges, getPlaygroundFiles } from "@/lib/data";
import { useLang, useT } from "@/lib/i18n";
import { Badge, Card, PageHeader } from "@/components/ui";

export default function ChallengesView({ challenges, playgroundFiles }: { challenges: Awaited<ReturnType<typeof getChallenges>>; playgroundFiles: Awaited<ReturnType<typeof getPlaygroundFiles>> }) {
  const { lang } = useLang();
  const t = useT();
  return (
    <>
      <PageHeader
        eyebrow="Practice · Challenges"
        title="BI Challenges"
        description={lang === "vi" ? "Case study kèm file dữ liệu. Tự phân tích rồi so sánh với hướng dẫn." : "Case studies with data files. Analyze on your own, then compare with the guidance."}
      />
      <div className="space-y-4">
        {challenges.map((c) => (
          <Card key={c.slug}>
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-semibold">{t(c.title)}</h2>
              <Badge tone="sky">{c.level}</Badge>
            </div>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{t(c.brief)}</p>
            <p className="mt-3 text-sm">
              {lang === "vi" ? "Dữ liệu: " : "Data: "}
              {playgroundFiles.map((f) => (
                <a key={f.href} href={f.href} className="text-sky-600 underline">
                  {f.name}
                </a>
              ))}
            </p>
          </Card>
        ))}
      </div>
      <p className="mt-8 text-sm">
        <Link href="/learn" className="text-slate-500 hover:text-sky-600">← Learn</Link>
      </p>
    </>
  );
}
