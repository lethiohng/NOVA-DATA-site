"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Avatar from "@/components/Avatar";
import { useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";
import { useLang } from "@/lib/i18n";

/** Header: khi chưa đăng nhập hiện nút "Đăng nhập" (mở trang /login); khi đã đăng nhập hiện tên và nút đăng xuất. */
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

  const base = mobile ? "block w-full rounded-lg px-3 py-2 text-left font-medium" : "rounded-lg px-3 py-1.5 text-sm font-medium";

  if (!ready) return <span className={`${base} text-slate-400`}>…</span>;

  if (user) {
    const name = (user.user_metadata?.full_name as string | undefined) ?? user.email ?? "";
    const avatar = user.user_metadata?.avatar_url as string | undefined;
    return (
      <div className={`flex items-center gap-2 ${mobile ? "px-3 py-2" : ""}`}>
        <Avatar src={avatar} name={name} className="h-7 w-7" />
        {!mobile && <span className="max-w-[9rem] truncate text-sm text-slate-700 dark:text-slate-300">{name}</span>}
        <Link href="/dashboard" className={`${base} text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800`}>
          {vi ? "Tiến độ" : "Progress"}
        </Link>
        <button type="button" onClick={signOut} className={`${base} text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800`}>
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
