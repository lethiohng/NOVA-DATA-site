"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Avatar from "@/components/Avatar";
import { Icon } from "@/components/ui";
import { useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";
import { useLang } from "@/lib/i18n";

/* Menu tài khoản trên máy tính: bấm vào tên để mở. Đăng xuất nằm trong menu này. */
function AccountMenu({ name, email, avatar, onSignOut, vi }: { name: string; email: string; avatar?: string; onSignOut: () => void; vi: boolean }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const firstName = name.trim().split(" ").slice(-1)[0] ?? name;

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const item = "flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800";

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex items-center gap-2 rounded-full border border-sky-100 bg-sky-50 py-1 pl-1 pr-3 transition hover:border-sky-300 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-slate-600"
      >
        <Avatar src={avatar} name={name} className="h-8 w-8" />
        <span className="max-w-[8rem] truncate text-sm font-semibold text-slate-900 dark:text-white">{firstName}</span>
        <Icon name="chevron" className={`h-4 w-4 text-slate-500 transition ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div role="menu" className="absolute right-0 mt-2 w-60 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-lg dark:border-slate-800 dark:bg-slate-900">
          <div className="border-b border-slate-200 px-4 py-3 dark:border-slate-800">
            <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">{name}</p>
            <p className="truncate text-xs text-slate-500">{email}</p>
          </div>
          <Link role="menuitem" href="/dashboard" onClick={() => setOpen(false)} className={item}>
            <Icon name="chart" className="h-4 w-4 text-slate-500" />
            {vi ? "Tiến độ học" : "My progress"}
          </Link>
          <Link role="menuitem" href="/settings" onClick={() => setOpen(false)} className={item}>
            <Icon name="settings" className="h-4 w-4 text-slate-500" />
            {vi ? "Cài đặt" : "Settings"}
          </Link>
          <div className="my-1 border-t border-slate-200 dark:border-slate-800" />
          <button role="menuitem" type="button" onClick={onSignOut} className={`${item} text-rose-600 dark:text-rose-400`}>
            <Icon name="logout" className="h-4 w-4" />
            {vi ? "Đăng xuất" : "Sign out"}
          </button>
        </div>
      )}
    </div>
  );
}

/** Khu vực tài khoản trên thanh menu: khi chưa đăng nhập hiện nút "Đăng nhập"; khi đã đăng nhập hiện menu tài khoản (máy tính) hoặc danh sách (điện thoại). */
export default function AuthButton({ mobile = false }: { mobile?: boolean }) {
  const { lang } = useLang();
  const vi = lang === "vi";
  const router = useRouter();
  const [supabase] = useState(() => createSupabaseBrowserClient());
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setReady(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => setUser(session?.user ?? null));
    return () => sub.subscription.unsubscribe();
  }, [supabase]);

  const signOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  if (!ready) return <span className="px-3 py-1.5 text-sm text-slate-400">…</span>;

  if (user) {
    const name = (user.user_metadata?.full_name as string | undefined) ?? user.email ?? "";
    const avatar = user.user_metadata?.avatar_url as string | undefined;

    if (!mobile) {
      return <AccountMenu name={name} email={user.email ?? ""} avatar={avatar} onSignOut={signOut} vi={vi} />;
    }

    // Điện thoại: danh sách phẳng trong menu mở ra.
    return (
      <div className="space-y-1">
        <div className="flex items-center gap-3 px-3 py-2">
          <Avatar src={avatar} name={name} className="h-8 w-8" />
          <span className="min-w-0 truncate text-sm font-semibold text-slate-900 dark:text-white">{name}</span>
        </div>
        <Link href="/dashboard" className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">
          {vi ? "Tiến độ học" : "My progress"}
        </Link>
        <Link href="/settings" className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">
          {vi ? "Cài đặt" : "Settings"}
        </Link>
        <button type="button" onClick={signOut} className="block w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-rose-600 hover:bg-slate-100 dark:text-rose-400 dark:hover:bg-slate-800">
          {vi ? "Đăng xuất" : "Sign out"}
        </button>
      </div>
    );
  }

  return (
    <Link
      href="/login"
      className={`${mobile ? "block w-full text-center" : "inline-flex"} items-center rounded-lg bg-navy-800 px-4 py-1.5 text-sm font-semibold text-white shadow-sm transition hover:bg-navy-700`}
    >
      {vi ? "Đăng nhập" : "Sign in"}
    </Link>
  );
}
