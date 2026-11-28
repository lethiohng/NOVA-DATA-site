"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";
import { useLang } from "@/lib/i18n";
import { formatVnd } from "@/lib/content";
import ZaloContact from "@/components/ZaloContact";
import { lessonKey, useAccess } from "@/lib/use-access";

type Access = "loading" | "allowed" | "login" | "upgrade";
// Mã khóa khớp với bảng courses trong database, ví dụ "sql-intermediate".

/* Chỉ hiện nội dung khi đã đăng nhập và có quyền khóa này: có dòng trong course_access hoặc is_premium = true (gói trọn bộ). */
export default function PremiumGate({
  children,
  course,
  courseTitle,
  price,
  lessonId,
}: {
  children: ReactNode;
  course: string;
  courseTitle?: string;
  price?: number;
  lessonId?: string; // bài này có thể được admin mở miễn phí
}) {
  const acc = useAccess();
  const freeOpen = Boolean(lessonId && acc.ready && acc.signedIn && acc.isFree("lesson", lessonKey(course, lessonId)));
  const { lang } = useLang();
  const vi = lang === "vi";
  const [supabase] = useState(() => createSupabaseBrowserClient());
  const [access, setAccess] = useState<Access>("loading");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data: auth } = await supabase.auth.getUser();
      if (!auth.user) {
        if (!cancelled) setAccess("login");
        return;
      }
      const uid = auth.user.id;
      const [{ data: profile }, { data: rows }] = await Promise.all([
        supabase.from("profiles").select("is_premium").eq("id", uid).maybeSingle(),
        supabase.from("course_access").select("course").eq("user_id", uid),
      ]);
      const owned = Boolean(profile?.is_premium) || (rows ?? []).some((r) => r.course === course);
      if (!cancelled) setAccess(owned ? "allowed" : "upgrade");
    })();
    return () => {
      cancelled = true;
    };
  }, [supabase, course]);

  if (access === "allowed" || freeOpen) return <>{children}</>;

  if (access === "loading") {
    return <p className="py-10 text-center text-sm text-slate-500">{vi ? "Đang kiểm tra quyền truy cập…" : "Checking access…"}</p>;
  }

  const login = access === "login";
  const priceText = price ? formatVnd(price) : "";
  const upgradeNote = vi
    ? `${courseTitle ? `Khóa ${courseTitle}` : "Khóa này"}${priceText ? ` có giá ${priceText}` : ""}. Để mở khóa, vui lòng kết bạn Zalo theo số hoặc mã QR bên dưới, rồi chuyển khoản theo hướng dẫn. Sau khi nhận được thanh toán, Nova Data sẽ kích hoạt quyền truy cập cho tài khoản của bạn.`
    : `${courseTitle ? `${courseTitle} course` : "This course"}${priceText ? ` costs ${priceText}` : ""}. To unlock it, add us on Zalo using the number or QR code below, then transfer the payment as instructed. Nova Data will activate your access after payment is received.`;
  return (
    <div className="rounded-2xl border border-violet-200 bg-violet-50 p-6 text-center dark:border-violet-900 dark:bg-violet-950/40">
      <span className="inline-flex rounded-full bg-violet-600 px-3 py-1 text-xs font-semibold text-white">Premium</span>
      <h2 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">
        {login
          ? vi
            ? "Đăng nhập để học khóa này"
            : "Sign in to take this course"
          : vi
            ? "Khóa này dành cho thành viên Premium"
            : "This course is for Premium members"}
      </h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
        {login
          ? vi
            ? "Nội dung bài học chỉ mở cho tài khoản đã đăng nhập và có gói Premium."
            : "Lesson content is only open to signed-in accounts with a Premium plan."
          : upgradeNote}
      </p>
      {login ? (
        <div className="mt-5">
          <Link href="/login" className="inline-flex rounded-lg bg-navy-800 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-navy-700">
            {vi ? "Đăng nhập" : "Sign in"}
          </Link>
        </div>
      ) : (
        <ZaloContact />
      )}
    </div>
  );
}
