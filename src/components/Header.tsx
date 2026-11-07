"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navItems } from "@/lib/nav";
import Logo from "@/components/Logo";
import AuthButton from "@/components/AuthButton";
import { Icon } from "@/components/ui";
import { useLang, useT } from "@/lib/i18n";

export default function Header() {
  const [open, setOpen] = useState(false);
  const { lang } = useLang();
  const t = useT();
  const pathname = usePathname();

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/70 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <Link href="/" aria-label="NovaData" className="flex items-center">
          <Logo />
        </Link>

        {/* Điều hướng desktop */}
        <nav className="hidden items-center gap-1 text-sm lg:flex" aria-label="Main">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-md px-3 py-1.5 font-medium transition ${
                  active
                    ? "bg-sky-50 text-sky-700 dark:bg-sky-950/60 dark:text-sky-300"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
                }`}
              >
                {t(item.label)}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden lg:block">
            <AuthButton />
          </div>

          {/* Cài đặt, gồm ngôn ngữ hiển thị. Đổi ngôn ngữ ở trang này thay vì nút VI/EN trên thanh menu. */}
          <Link
            href="/settings"
            aria-label={lang === "vi" ? "Cài đặt" : "Settings"}
            title={lang === "vi" ? "Cài đặt" : "Settings"}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            <Icon name="settings" className="h-5 w-5" />
          </Link>

          {/* Menu cho mobile */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-300 text-slate-700 transition hover:bg-slate-100 lg:hidden dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
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
