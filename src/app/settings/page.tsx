"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { User } from "@supabase/supabase-js";
import { useLang, type Lang } from "@/lib/i18n";
import { applyTheme, readTheme, saveTheme, type Theme } from "@/lib/theme";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";
import { Icon, type IconName, PageHeader } from "@/components/ui";

/* Một nhóm cài đặt: tiêu đề, mô tả ngắn và phần điều khiển bên phải. */
function SettingCard({ title, desc, children }: { title: string; desc: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h2 className="font-semibold text-slate-900 dark:text-white">{title}</h2>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{desc}</p>
      <div className="mt-5">{children}</div>
    </section>
  );
}

/* Nhóm nút chọn một trong các lựa chọn (giống thanh chuyển đổi). */
function Segmented<T extends string>({
  value,
  options,
  onChange,
  label,
}: {
  value: T;
  options: { value: T; label: string; icon?: IconName }[];
  onChange: (v: T) => void;
  label: string;
}) {
  return (
    <div role="radiogroup" aria-label={label} className="inline-flex w-full flex-wrap gap-1 rounded-xl bg-slate-100 p-1 sm:w-auto dark:bg-slate-800">
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(o.value)}
            className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition sm:flex-none ${
              active ? "bg-white text-sky-700 shadow-sm dark:bg-slate-900 dark:text-sky-300" : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            }`}
          >
            {o.icon && <Icon name={o.icon} className="h-4 w-4" />}
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

export default function SettingsPage() {
  const { lang, setLang } = useLang();
  const vi = lang === "vi";
  const [supabase] = useState(() => createSupabaseBrowserClient());
  const [user, setUser] = useState<User | null>(null);
  const [checked, setChecked] = useState(false);
  const [theme, setTheme] = useState<Theme>("system");

  useEffect(() => {
    let alive = true;
    supabase.auth.getUser().then(({ data }) => {
      if (!alive) return;
      setUser(data.user);
      setChecked(true);
    });
    return () => {
      alive = false;
    };
  }, [supabase]);

  // Đọc chế độ đã lưu. Khi chọn "Theo hệ thống", đổi theo cài đặt của hệ điều hành ngay lúc đang mở trang.
  useEffect(() => {
    const saved = readTheme();
    setTheme(saved);
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      if (readTheme() === "system") applyTheme("system");
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const changeTheme = (next: Theme) => {
    setTheme(next);
    saveTheme(next);
  };

  const name = (user?.user_metadata?.full_name as string | undefined) ?? user?.email ?? "";
  const initial = name.trim().charAt(0).toUpperCase() || "?";

  const themeOptions: { value: Theme; label: string; icon: IconName }[] = [
    { value: "light", label: vi ? "Sáng" : "Light", icon: "sun" },
    { value: "dark", label: vi ? "Tối" : "Dark", icon: "moon" },
    { value: "system", label: vi ? "Theo hệ thống" : "System", icon: "monitor" },
  ];
  const langOptions: { value: Lang; label: string }[] = [
    { value: "vi", label: "Tiếng Việt" },
    { value: "en", label: "English" },
  ];

  return (
    <>
      <PageHeader eyebrow={vi ? "Cài đặt" : "Settings"} title={vi ? "Cài đặt" : "Settings"} description={vi ? "Giao diện, ngôn ngữ và tài khoản của bạn." : "Appearance, language and your account."} />

      <div className="grid gap-6 lg:grid-cols-2">
        <SettingCard title={vi ? "Giao diện" : "Appearance"} desc={vi ? "Chọn sáng, tối, hoặc theo cài đặt của thiết bị. Lựa chọn được lưu trên trình duyệt này." : "Choose light, dark, or follow your device. The choice is saved in this browser."}>
          <Segmented value={theme} options={themeOptions} onChange={changeTheme} label={vi ? "Giao diện" : "Appearance"} />
        </SettingCard>

        <SettingCard title={vi ? "Ngôn ngữ" : "Language"} desc={vi ? "Áp dụng cho toàn bộ trang web. Lựa chọn được lưu trên trình duyệt này." : "Applies to the whole site. The choice is saved in this browser."}>
          <Segmented value={lang} options={langOptions} onChange={setLang} label={vi ? "Ngôn ngữ" : "Language"} />
        </SettingCard>
      </div>

      <div className="mt-6">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="font-semibold text-slate-900 dark:text-white">{vi ? "Tài khoản" : "Account"}</h2>
          <div className="mt-5">
            {!checked ? (
              <p className="text-sm text-slate-500">{vi ? "Đang tải…" : "Loading…"}</p>
            ) : user ? (
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-sky-100 text-lg font-bold text-sky-700 dark:bg-sky-950 dark:text-sky-300">{initial}</span>
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-slate-900 dark:text-white">{name}</p>
                    <p className="truncate text-sm text-slate-600 dark:text-slate-400">{user.email}</p>
                  </div>
                </div>
                <Link href="/dashboard" className="inline-flex items-center gap-2 rounded-xl border border-sky-300 px-4 py-2 text-sm font-semibold text-sky-700 hover:bg-sky-50 dark:border-sky-700 dark:text-sky-300 dark:hover:bg-slate-800">
                  <Icon name="user" className="h-4 w-4" />
                  {vi ? "Xem tiến độ học" : "View my progress"}
                </Link>
              </div>
            ) : (
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {vi ? "Bạn chưa đăng nhập." : "You are not signed in."}{" "}
                <Link href="/login" className="font-semibold text-sky-600 hover:underline dark:text-sky-400">
                  {vi ? "Đăng nhập" : "Sign in"}
                </Link>
              </p>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
