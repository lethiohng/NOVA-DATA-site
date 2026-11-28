"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { PageHeader, Section } from "@/components/ui";

import { useState } from "react";
import TimelineModal from "@/components/TimelineModal";
import { MILESTONES, MISSION } from "./milestones";
import { loadAbout, type Mission } from "./content";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";
import { useEffect } from "react";
import type { Milestone } from "./milestones";

export default function AboutPage() {
  const { lang } = useLang();
  const vi = lang === "vi";
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [supabase] = useState(() => createSupabaseBrowserClient());
  const [content, setContent] = useState<{ milestones: Milestone[]; mission: Mission[] }>({ milestones: MILESTONES, mission: MISSION });
  useEffect(() => {
    loadAbout(supabase).then(setContent);
  }, [supabase]);
  return (
    <>
      <PageHeader
        eyebrow="07 · About"
        title={vi ? "Về Nova Data" : "About Nova Data"}
        art={
          // Ảnh đặt ở bên phải thẻ, chỉ hiện trên màn hình vừa trở lên (xem PageHeader).
          <img
            src="https://mvhzyhdwmhdgossmpblj.supabase.co/storage/v1/object/public/brand/anhcua%20hanh.png"
            alt={vi ? "Hạnh Lê Thị Hồng" : "Hanh Le Thi Hong"}
            loading="lazy"
            className="ml-auto h-44 w-auto object-contain drop-shadow-md"
          />
        }
        description={
          vi
            ? "Mình xây dựng nơi này không phải vì mình đã biết tất cả, mà đơn giản là muốn chia sẻ những gì mình đã học, những gì mình đang làm và những kinh nghiệm thực tế mình tích lũy được trong công việc."
            : "I built this place not because I know everything, but simply to share what I have learned, what I am working on, and the practical experience I have gathered at work."
        }
      />

      <Section title={vi ? "Hành trình: từ Automation đến Data" : "My Journey: from Automation to Data"}>
        <ol className="relative space-y-8 border-l-2 border-sky-100 pl-8 dark:border-slate-800">
          {content.milestones.map((m, i) => {
            const card = (
              <>
                <span className="inline-flex rounded-full bg-sky-50 px-3 py-0.5 text-xs font-semibold text-sky-700 dark:bg-sky-950/50 dark:text-sky-300">
                  {m.period[lang]}
                </span>
                <h3 className="mt-3 text-lg font-semibold text-slate-900 dark:text-white">{m.title[lang]}</h3>
                <p className="text-sm font-medium text-sky-700 dark:text-sky-400">{m.sub[lang]}</p>
                <p className="mt-2 leading-relaxed text-slate-600 dark:text-slate-400">{m.short[lang]}</p>
                {m.detail && (
                  <p className="mt-4 text-sm font-semibold text-sky-600 dark:text-sky-400">{vi ? "Xem chi tiết →" : "View details →"}</p>
                )}
              </>
            );
            const cardCls = "block w-full rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition duration-200 dark:border-slate-800 dark:bg-slate-900";
            return (
              <li key={m.period.en} className="relative">
                <span
                  aria-hidden
                  className={`absolute -left-[41px] top-1 flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ring-4 ring-slate-50 dark:ring-slate-950 ${
                    i === content.milestones.length - 1 ? "bg-sky-600 text-white" : "bg-white text-sky-700 ring-sky-100 dark:bg-slate-900 dark:text-sky-300"
                  }`}
                >
                  {i + 1}
                </span>
                {m.detail ? (
                  <button
                    type="button"
                    onClick={() => setOpenIdx(i)}
                    aria-haspopup="dialog"
                    className={`${cardCls} cursor-pointer hover:-translate-y-0.5 hover:border-sky-300 hover:shadow-md focus-visible:outline-2 focus-visible:outline-sky-600`}
                  >
                    {card}
                  </button>
                ) : (
                  <div className={cardCls}>{card}</div>
                )}
              </li>
            );
          })}
        </ol>
      </Section>

      {openIdx !== null && content.milestones[openIdx]?.detail && (
        <TimelineModal milestone={content.milestones[openIdx]} onClose={() => setOpenIdx(null)} />
      )}

      <Section title={vi ? "Sứ mệnh" : "Our mission"}>
        <div className="space-y-4 leading-relaxed text-slate-600 dark:text-slate-400">
          {content.mission.map((p, i) => (
            <p key={i} className={i === content.mission.length - 1 ? "font-medium text-slate-800 dark:text-slate-200" : undefined}>
              {vi ? p.vi : p.en}
            </p>
          ))}
        </div>
      </Section>

      <p className="text-sm">
        <Link href="/contact" className="font-semibold text-sky-600 hover:underline">
          {vi ? "Liên hệ →" : "Contact →"}
        </Link>
      </p>
    </>
  );
}
