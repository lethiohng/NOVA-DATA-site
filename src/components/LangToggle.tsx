"use client";

import { useLang, type Lang } from "@/lib/i18n";

/* Nút đổi nhanh ngôn ngữ trên thanh menu: viên thuốc hai ô VI | EN. Ô đang chọn có nền trắng. */
export default function LangToggle() {
  const { lang, setLang } = useLang();
  const options: { code: Lang; label: string; name: string }[] = [
    { code: "vi", label: "VI", name: "Tiếng Việt" },
    { code: "en", label: "EN", name: "English" },
  ];

  return (
    <div role="radiogroup" aria-label={lang === "vi" ? "Ngôn ngữ" : "Language"} className="flex items-center rounded-full bg-slate-100 p-0.5 text-xs font-bold dark:bg-slate-800">
      {options.map((o) => {
        const active = o.code === lang;
        return (
          <button
            key={o.code}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={o.name}
            title={o.name}
            onClick={() => setLang(o.code)}
            className={`rounded-full px-2.5 py-1 transition ${
              active ? "bg-sky-600 text-white shadow-sm dark:bg-sky-500" : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            }`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
