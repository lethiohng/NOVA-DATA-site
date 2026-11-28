"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/lib/i18n";
import type { Milestone } from "@/app/about/milestones";

/* Cửa sổ chi tiết một mốc trong hành trình. Đóng bằng nút X, phím ESC, hoặc bấm ra ngoài. */
export default function TimelineModal({ milestone, onClose }: { milestone: Milestone; onClose: () => void }) {
  const { lang } = useLang();
  const vi = lang === "vi";
  const d = milestone.detail!;
  const [shown, setShown] = useState(false);

  // Hiệu ứng vào: bật sau khi đã vẽ khung, để chuyển động mượt.
  useEffect(() => {
    const id = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // ESC để đóng và khóa cuộn trang phía sau.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const sectionCls = "space-y-3";
  const h = "text-sm font-semibold uppercase tracking-wider text-sky-700 dark:text-sky-400";

  return (
    <div
      className={`fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-slate-900/50 p-4 backdrop-blur-sm transition-opacity duration-200 sm:items-center ${shown ? "opacity-100" : "opacity-0"}`}
      onMouseDown={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="timeline-title"
        onMouseDown={(e) => e.stopPropagation()}
        className={`relative my-8 w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-xl transition duration-200 sm:p-8 dark:border-slate-800 dark:bg-slate-900 ${shown ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={vi ? "Đóng" : "Close"}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white"
        >
          ✕
        </button>

        <span className="inline-flex rounded-full bg-sky-50 px-3 py-0.5 text-xs font-semibold text-sky-700 dark:bg-sky-950/50 dark:text-sky-300">
          {milestone.period[lang]}
        </span>
        <h2 id="timeline-title" className="mt-3 pr-10 text-2xl font-bold text-slate-900 dark:text-white">
          {milestone.title[lang]}
        </h2>
        <p className="mt-1 text-sm font-medium text-sky-700 dark:text-sky-400">{milestone.sub[lang]}</p>

        <div className="mt-6 space-y-7 leading-relaxed text-slate-700 dark:text-slate-300">
          <section className={sectionCls}>
            <h3 className={h}>{vi ? "Tổng quan" : "Overview"}</h3>
            <p>{d.overview[lang]}</p>
          </section>

          <section className={sectionCls}>
            <h3 className={h}>{d.workTitle[lang]}</h3>
            <ul className="list-disc space-y-1.5 pl-5">
              {d.work.map((w) => (
                <li key={w.en}>{w[lang]}</li>
              ))}
            </ul>
          </section>

          {d.projects && (
            <section className={sectionCls}>
              <h3 className={h}>{vi ? "Dự án chính" : "Key Projects"}</h3>
              <div className="grid gap-3 sm:grid-cols-3">
                {d.projects.map((p) => (
                  <div key={p.name.en} className="rounded-xl border border-slate-200 p-4 dark:border-slate-800">
                    <p className="font-semibold text-slate-900 dark:text-white">{p.name[lang]}</p>
                    <ul className="mt-2 list-disc space-y-1 pl-4 text-sm">
                      {p.points.map((pt) => (
                        <li key={pt.en}>{pt[lang]}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section className={sectionCls}>
            <h3 className={h}>{vi ? "Kỹ năng & công cụ" : "Skills & Technologies"}</h3>
            <div className="flex flex-wrap gap-2">
              {d.skills.map((s) => (
                <span key={s} className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                  {s}
                </span>
              ))}
            </div>
          </section>

          <section className={sectionCls}>
            <h3 className={h}>{vi ? "Điều rút ra" : "Key Learning"}</h3>
            <p className="rounded-xl border-l-4 border-sky-500 bg-sky-50/60 p-4 dark:bg-sky-950/30">{d.learning[lang]}</p>
          </section>
        </div>
      </div>
    </div>
  );
}
