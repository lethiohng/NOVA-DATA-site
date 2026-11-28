"use client";

import { useLang } from "@/lib/i18n";
import ZaloContact from "@/components/ZaloContact";

/* Trang gói Pro trọn đời: song ngữ theo ngôn ngữ đang chọn. */

const T = {
  vi: {
    title: "Trả một lần. Học mãi mãi.",
    subtitle: "Một lần thanh toán, học không giới hạn.",
    intro: "Truy cập trọn đời toàn bộ nội dung Nova Data và nhận các bài học, tài liệu mới được cập nhật trong tương lai.",
    badges: ["Truy cập trọn đời", "Cập nhật nội dung mới", "Thanh toán một lần"],
    priceLabel: "Giá trọn đời",
    priceNote: "Không thu phí định kỳ. Tài khoản thường vẫn xem được các mục miễn phí.",
    benefitsTitle: "Bạn nhận được",
    benefits: [
      "Xem toàn bộ bài học SQL Basic, Intermediate và Advanced",
      "Xem toàn bộ bài viết trong Kiến thức và các khóa chủ đề",
      "Làm toàn bộ bài tập SQL trong mục Luyện tập",
      "Xem toàn bộ dự án",
      "Nội dung mới được thêm vào sau này",
    ],
    stepsTitle: "Cách đăng ký",
    steps: [
      "Đăng nhập bằng Google để có tài khoản.",
      "Nhắn Zalo cho Nova Data (số hoặc mã QR bên dưới) và cho biết email tài khoản của bạn.",
      "Chuyển khoản 499.000đ theo hướng dẫn. Nova Data sẽ kích hoạt Pro cho tài khoản của bạn sau khi nhận được thanh toán.",
    ],
  },
  en: {
    title: "Pay Once. Learn Forever.",
    subtitle: "One payment. Unlimited learning.",
    intro: "Lifetime access to all Nova Data content, plus new lessons and materials added in the future.",
    badges: ["Lifetime access", "Future content updates", "One-time payment"],
    priceLabel: "Lifetime price",
    priceNote: "No recurring fees. Free accounts can still open the free items.",
    benefitsTitle: "What you get",
    benefits: [
      "All SQL Basic, Intermediate and Advanced lessons",
      "All articles in Learn and the topic courses",
      "All SQL exercises in Practice",
      "All projects",
      "New content added later",
    ],
    stepsTitle: "How to sign up",
    steps: [
      "Sign in with Google to create your account.",
      "Message Nova Data on Zalo (number or QR code below) and tell us your account email.",
      "Transfer 499,000 VND as instructed. Nova Data will activate Pro after receiving the payment.",
    ],
  },
} as const;

export default function ProView() {
  const { lang } = useLang();
  const c = T[lang];
  return (
    <div className="mx-auto max-w-3xl">
      <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-sky-50 via-white to-violet-50 p-8 shadow-sm dark:border-slate-800 dark:from-slate-900 dark:via-slate-900 dark:to-violet-950/40">
        <div className="flex flex-wrap gap-2">
          {c.badges.map((b) => (
            <span key={b} className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-sky-700 shadow-sm ring-1 ring-sky-100 dark:bg-slate-800 dark:text-sky-300 dark:ring-slate-700">
              {b}
            </span>
          ))}
        </div>
        <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl dark:text-white">{c.title}</h1>
        <p className="mt-2 text-lg font-medium text-slate-700 dark:text-slate-300">{c.subtitle}</p>
        <p className="mt-3 text-slate-600 dark:text-slate-400">{c.intro}</p>

        <div className="mt-6 rounded-2xl border border-violet-200 bg-white p-5 dark:border-violet-900 dark:bg-slate-900">
          <p className="text-sm font-semibold text-violet-700 dark:text-violet-300">{c.priceLabel}</p>
          <p className="mt-1 text-4xl font-bold text-slate-900 dark:text-white">499.000đ</p>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{c.priceNote}</p>
        </div>
      </div>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">{c.benefitsTitle}</h2>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700 dark:text-slate-300">
          {c.benefits.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">{c.stepsTitle}</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-6 text-slate-700 dark:text-slate-300">
          {c.steps.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>
        <div className="mt-6">
          <ZaloContact />
        </div>
      </section>
    </div>
  );
}
