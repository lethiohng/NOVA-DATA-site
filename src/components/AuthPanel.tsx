"use client";

import Link from "next/link";
import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";
import { useLang } from "@/lib/i18n";
import Logo from "@/components/Logo";

/** Thẻ đăng nhập / đăng ký bằng Google. Cùng một luồng: tài khoản mới được tạo ở lần đăng nhập đầu tiên. */
export default function AuthPanel({ mode }: { mode: "login" | "register" }) {
  const { lang } = useLang();
  const vi = lang === "vi";
  const [supabase] = useState(() => createSupabaseBrowserClient());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isLogin = mode === "login";

  const signIn = async () => {
    setLoading(true);
    setError(null);
    const { error: err } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback?next=/learn` },
    });
    if (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const copy = isLogin
    ? {
        title: vi ? "Đăng nhập" : "Sign in",
        desc: vi ? "Đăng nhập nhanh chóng và an toàn bằng tài khoản Google của bạn." : "Sign in quickly and securely with your Google account.",
        button: vi ? "Đăng nhập với Google" : "Sign in with Google",
        switchText: vi ? "Chưa có tài khoản?" : "No account yet?",
        switchLink: vi ? "Đăng ký" : "Sign up",
        switchHref: "/register",
      }
    : {
        title: vi ? "Đăng ký" : "Sign up",
        desc: vi ? "Đăng ký nhanh chóng và an toàn bằng tài khoản Google của bạn." : "Sign up quickly and securely with your Google account.",
        button: vi ? "Đăng ký với Google" : "Sign up with Google",
        switchText: vi ? "Đã có tài khoản?" : "Already have an account?",
        switchLink: vi ? "Đăng nhập" : "Sign in",
        switchHref: "/login",
      };

  return (
    <div className="flex justify-center py-8">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex justify-center">
          <Logo height={48} />
        </div>

        <h1 className="mt-8 text-2xl font-bold tracking-tight text-navy-900 dark:text-white">{copy.title}</h1>
        <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-slate-600 dark:text-slate-400">{copy.desc}</p>

        <button
          type="button"
          onClick={signIn}
          disabled={loading}
          className="mt-8 flex w-full items-center justify-center gap-3 rounded-xl bg-navy-800 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-navy-700 disabled:opacity-60"
        >
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white">
            <svg width="14" height="14" viewBox="0 0 48 48" aria-hidden="true">
              <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.5l6.7-6.7C35.6 2.4 30.2 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.8 6.1C12.3 13.5 17.7 9.5 24 9.5z" />
              <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4 7.1-10 7.1-17.5z" />
              <path fill="#FBBC05" d="M10.4 28.7A14.5 14.5 0 0 1 9.5 24c0-1.6.3-3.2.9-4.7l-7.8-6.1A24 24 0 0 0 0 24c0 3.9.9 7.5 2.6 10.8l7.8-6.1z" />
              <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.5-5.8c-2.1 1.4-4.8 2.3-8.4 2.3-6.3 0-11.7-4.2-13.6-9.9l-7.8 6.1C6.5 42.6 14.6 48 24 48z" />
            </svg>
          </span>
          {loading ? (vi ? "Đang chuyển hướng…" : "Redirecting…") : copy.button}
        </button>

        {error && <p className="mt-4 text-sm text-rose-600">{error}</p>}

        <p className="mt-5 text-xs leading-relaxed text-slate-500">
          {vi
            ? `Bằng việc ${isLogin ? "đăng nhập" : "đăng ký"}, bạn đồng ý với điều khoản sử dụng của chúng tôi.`
            : `By ${isLogin ? "signing in" : "signing up"}, you agree to our terms of use.`}
        </p>

        <p className="mt-6 text-sm text-slate-600 dark:text-slate-400">
          {copy.switchText}{" "}
          <Link href={copy.switchHref} className="font-semibold text-sky-600 hover:underline dark:text-sky-400">
            {copy.switchLink}
          </Link>
        </p>
      </div>
    </div>
  );
}
