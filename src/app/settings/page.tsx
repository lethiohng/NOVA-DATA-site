"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { User } from "@supabase/supabase-js";
import { useLang } from "@/lib/i18n";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";
import { PageHeader, Section } from "@/components/ui";

const LANGUAGES = [
  { code: "vi", label: "Tiếng Việt" },
  { code: "en", label: "English" },
] as const;

export default function SettingsPage() {
  const { lang, setLang } = useLang();
  const vi = lang === "vi";
  const [supabase] = useState(() => createSupabaseBrowserClient());
  const [user, setUser] = useState<User | null>(null);
  const [checked, setChecked] = useState(false);

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

  const name = (user?.user_metadata?.full_name as string | undefined) ?? user?.email ?? "";

  return (
    <>
      <PageHeader eyebrow={vi ? "Cài đặt" : "Settings"} title={vi ? "Cài đặt" : "Settings"} description={vi ? "Ngôn ngữ hiển thị và thông tin tài khoản của bạn." : "Display language and your account details."} />

      <Section title={vi ? "Ngôn ngữ" : "Language"}>
        <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between dark:border-slate-800 dark:bg-slate-900">
          <div>
            <p className="font-semibold text-slate-900 dark:text-white">{vi ? "Ngôn ngữ hiển thị" : "Display language"}</p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              {vi ? "Áp dụng cho toàn bộ trang web. Lựa chọn được lưu trên trình duyệt này." : "Applies to the whole site. The choice is saved in this browser."}
            </p>
          </div>
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value as "vi" | "en")}
            aria-label={vi ? "Ngôn ngữ hiển thị" : "Display language"}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium focus:border-sky-500 focus:outline-none dark:border-slate-700 dark:bg-slate-950"
          >
            {LANGUAGES.map((l) => (
              <option key={l.code} value={l.code}>
                {l.label}
              </option>
            ))}
          </select>
        </div>
      </Section>

      <Section title={vi ? "Tài khoản" : "Account"}>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          {!checked ? (
            <p className="text-sm text-slate-500">{vi ? "Đang tải…" : "Loading…"}</p>
          ) : user ? (
            <div className="space-y-2 text-sm">
              <p>
                <span className="text-slate-500">{vi ? "Tên: " : "Name: "}</span>
                <span className="font-semibold text-slate-900 dark:text-white">{name}</span>
              </p>
              <p>
                <span className="text-slate-500">Email: </span>
                <span className="text-slate-900 dark:text-white">{user.email}</span>
              </p>
              <Link href="/dashboard" className="inline-block pt-2 font-semibold text-sky-600 hover:underline dark:text-sky-400">
                {vi ? "Xem tiến độ học →" : "View my progress →"}
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
      </Section>
    </>
  );
}
