"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navItems } from "@/lib/nav";
import Logo from "@/components/Logo";
import AuthButton from "@/components/AuthButton";
import ThemeToggle from "@/components/ThemeToggle";
import LangToggle from "@/components/LangToggle";
import { Icon, type IconName } from "@/components/ui";
import { useLang, useT } from "@/lib/i18n";

/* Icon cho từng mục menu, theo đường dẫn. */
const NAV_ICONS: Record<string, IconName> = {
  "/": "home",
  "/learn": "chart",
  "/projects": "folder",
  "/career": "briefcase",
  "/about": "info",
};

export default function Header() {
  const [open, setOpen] = useState(false);
  const { lang } = useLang();
  const vi = lang === "vi";
  const t = useT();
  const pathname = usePathname();

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const settingsLabel = vi ? "Cài đặt" : "Settings";

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/85 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/85">
      <div className="relative mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        {/* Bên trái: logo và menu chính */}
        <div className="flex min-w-0 items-center gap-4">
          <Link href="/" aria-label="NovaData" className="flex shrink-0 items-center">
            <Logo />
          </Link>
          <span className="hidden h-6 w-px bg-slate-200 lg:block dark:bg-slate-800" />

          {/* Điều hướng desktop: có icon, trang đang mở có nền xanh nhạt */}
          <nav className="hidden items-center gap-1 text-sm lg:flex" aria-label="Main">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 font-medium transition ${
                    active
                      ? "bg-sky-100 text-sky-700 dark:bg-sky-950/60 dark:text-sky-300"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
                  }`}
                >
                  <Icon name={NAV_ICONS[item.href] ?? "book"} className="h-4 w-4" />
                  {t(item.label)}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bên phải: ngôn ngữ, giao diện, cài đặt, tài khoản */}
        <div className="flex items-center gap-1">
          <div className="hidden sm:block">
            <LangToggle />
          </div>
          <ThemeToggle />

          {/* Cài đặt tách riêng khỏi nút giao diện, có tooltip khi di chuột hoặc focus */}
          <div className="group relative">
            <Link
              href="/settings"
              aria-label={settingsLabel}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
            >
              <Icon name="settings" className="h-5 w-5" />
            </Link>
            <span
              role="tooltip"
              className="pointer-events-none absolute right-0 top-full z-50 mt-2 whitespace-nowrap rounded-md bg-slate-900 px-2 py-1 text-xs font-medium text-white opacity-0 shadow transition group-hover:opacity-100 group-focus-within:opacity-100 dark:bg-slate-700"
            >
              {settingsLabel}
            </span>
          </div>

          <div className="ml-2 hidden lg:block">
            <AuthButton />
          </div>

          {/* Menu cho mobile */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="ml-1 flex h-9 w-9 items-center justify-center rounded-lg border border-slate-300 text-slate-700 transition hover:bg-slate-100 lg:hidden dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <Icon name={open ? "close" : "menu"} className="h-5 w-5" />
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" className="relative border-t border-slate-200 bg-white px-4 py-3 lg:hidden dark:border-slate-800 dark:bg-slate-950" aria-label="Mobile">
          <div className="mb-2 border-b border-slate-200 pb-2 dark:border-slate-800">
            <AuthButton mobile />
          </div>
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`block rounded-lg px-3 py-2 font-medium ${
                    isActive(item.href) ? "bg-sky-50 text-sky-700 dark:bg-sky-950/60 dark:text-sky-300" : "hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  {t(item.label)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
