"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navItems } from "@/lib/nav";
import Logo from "@/components/Logo";
import AuthButton from "@/components/AuthButton";
import ThemeToggle from "@/components/ThemeToggle";
import { Icon } from "@/components/ui";
import { useLang, useT } from "@/lib/i18n";

export default function Header() {
  const [open, setOpen] = useState(false);
  const { lang } = useLang();
  const vi = lang === "vi";
  const t = useT();
  const pathname = usePathname();

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const settingsLabel = vi ? "Cài đặt" : "Settings";

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/70 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <Link href="/" aria-label="NovaData" className="flex items-center">
          <Logo />
        </Link>

        {/* Điều hướng desktop: trang đang mở có chữ xanh và gạch dưới */}
        <nav className="hidden h-16 items-stretch gap-1 text-sm lg:flex" aria-label="Main">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`relative flex items-center px-3 font-medium transition ${
                  active ? "text-sky-600 dark:text-sky-400" : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                }`}
              >
                {t(item.label)}
                {active && <span className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-sky-600 dark:bg-sky-400" />}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1">
          <ThemeToggle />

          {/* Cài đặt: icon có tooltip khi di chuột hoặc focus bằng bàn phím */}
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

          <div className="ml-2 hidden border-l border-slate-200 pl-3 lg:block dark:border-slate-800">
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
        <nav id="mobile-nav" className="border-t border-slate-200 bg-white px-4 py-3 lg:hidden dark:border-slate-800 dark:bg-slate-950" aria-label="Mobile">
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
