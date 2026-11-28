"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n";

/* Khung hiện thay cho nội dung bị khóa: mời đăng ký Pro trọn đời. */
export default function LockedNotice({ compact = false }: { compact?: boolean }) {
  const { lang } = useLang();
  const vi = lang === "vi";
  return (
    <div className={`rounded-2xl border border-violet-200 bg-violet-50 text-center dark:border-violet-900 dark:bg-violet-950/40 ${compact ? "p-4" : "p-6"}`}>
      <span className="inline-flex rounded-full bg-violet-600 px-3 py-1 text-xs font-semibold text-white">Pro</span>
      <h2 className={`mt-3 font-semibold text-slate-900 dark:text-white ${compact ? "text-base" : "text-lg"}`}>
        {vi ? "Mục này dành cho thành viên Pro" : "This item is for Pro members"}
      </h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
        {vi
          ? "Một số mục được mở miễn phí. Đăng ký Pro trọn đời để xem hết các bài và dự án."
          : "Some items are free. Get lifetime Pro to see all lessons and projects."}
      </p>
      <Link href="/pro" className="mt-4 inline-flex rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-violet-700">
        {vi ? "Xem gói Pro trọn đời →" : "See lifetime Pro →"}
      </Link>
    </div>
  );
}
