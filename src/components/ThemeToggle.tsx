"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/ui";
import { saveTheme } from "@/lib/theme";
import { useLang } from "@/lib/i18n";

/* Nút đổi nhanh giữa sáng và tối trên thanh menu. Chọn "theo hệ thống" thì vẫn đổi được ở trang Cài đặt. */
export default function ThemeToggle() {
  const { lang } = useLang();
  const vi = lang === "vi";
  const [dark, setDark] = useState<boolean | null>(null);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  if (dark === null) return <span className="h-9 w-9" />;

  const toggle = () => {
    const next = !dark;
    setDark(next);
    saveTheme(next ? "dark" : "light");
  };
  const label = dark ? (vi ? "Chuyển sang giao diện sáng" : "Switch to light mode") : vi ? "Chuyển sang giao diện tối" : "Switch to dark mode";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="flex h-9 w-9 items-center justify-center rounded-lg text-amber-500 transition hover:bg-slate-100 dark:text-amber-300 dark:hover:bg-slate-800"
    >
      <Icon name={dark ? "moon" : "sun"} className="h-5 w-5" />
    </button>
  );
}
