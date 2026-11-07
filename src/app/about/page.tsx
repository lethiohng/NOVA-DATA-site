"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { PageHeader, Section } from "@/components/ui";

type Milestone = { period: string; org: string; role: string; detail: { vi: string; en: string } };

const MILESTONES: Milestone[] = [
  {
    period: "2020 – 2024",
    org: "Automation Education",
    role: "PLC · Control · Automation",
    detail: {
      vi: "Học tập và xây dựng nền tảng về PLC, điều khiển và tự động hóa.",
      en: "Studied and built a foundation in PLC, control and automation.",
    },
  },
  {
    period: "2023 – 2024",
    org: "Unilever Vietnam",
    role: "Process Engineering Intern",
    detail: {
      vi: "Power BI, 5S Dashboard và Maintenance Planning.",
      en: "Power BI, a 5S Dashboard and Maintenance Planning.",
    },
  },
  {
    period: "2024",
    org: "Milwaukee Tool",
    role: "BI Intern",
    detail: {
      vi: "Production Data Analysis và Power BI Dashboard.",
      en: "Production Data Analysis and Power BI Dashboards.",
    },
  },
  {
    period: "2025 – Nay",
    org: "BI Engineering",
    role: "Manufacturing Analytics",
    detail: {
      vi: "Andon, Total Yield và Digital MDI.",
      en: "Andon, Total Yield and Digital MDI.",
    },
  },
  {
    period: "2026 – Về sau",
    org: "NOVA DATA",
    role: "Chia sẻ & cộng đồng",
    detail: {
      vi: "Chia sẻ kiến thức, xây dựng tài liệu và phát triển cộng đồng học Data.",
      en: "Sharing knowledge, building learning materials and growing a community of Data learners.",
    },
  },
];

export default function AboutPage() {
  const { lang } = useLang();
  const vi = lang === "vi";
  return (
    <>
      <PageHeader
        eyebrow="07 · About"
        title={vi ? "Về Nova Data" : "About Nova Data"}
        description={
          vi
            ? "Mình xây dựng nơi này không phải vì mình đã biết tất cả, mà đơn giản là muốn chia sẻ những gì mình đã học, những gì mình đang làm và những kinh nghiệm thực tế mình tích lũy được trong công việc."
            : "I built this place not because I know everything, but simply to share what I have learned, what I am working on, and the practical experience I have gathered at work."
        }
      />

      <Section title={vi ? "Hành trình: từ Automation đến Data" : "My Journey: from Automation to Data"}>
        <ol className="relative space-y-8 border-l-2 border-sky-100 pl-8 dark:border-slate-800">
          {MILESTONES.map((m, i) => (
            <li key={m.period} className="relative">
              <span
                aria-hidden
                className={`absolute -left-[41px] top-1 flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ring-4 ring-slate-50 dark:ring-slate-950 ${
                  i === MILESTONES.length - 1 ? "bg-sky-600 text-white" : "bg-white text-sky-700 ring-sky-100 dark:bg-slate-900 dark:text-sky-300"
                }`}
              >
                {i + 1}
              </span>
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
                <span className="inline-flex rounded-full bg-sky-50 px-3 py-0.5 text-xs font-semibold text-sky-700 dark:bg-sky-950/50 dark:text-sky-300">
                  {m.period}
                </span>
                <h3 className="mt-3 text-lg font-semibold text-slate-900 dark:text-white">{m.org}</h3>
                <p className="text-sm font-medium text-sky-700 dark:text-sky-400">{m.role}</p>
                <p className="mt-2 leading-relaxed text-slate-600 dark:text-slate-400">{vi ? m.detail.vi : m.detail.en}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section title={vi ? "Sứ mệnh" : "Our mission"}>
        <div className="space-y-4 leading-relaxed text-slate-600 dark:text-slate-400">
          <p>
            {vi
              ? "Từ Automation đến Data, từ những kiến thức cơ bản đến các ứng dụng thực tế trong nhà máy, mình muốn hệ thống lại mọi thứ thành những bài học dễ hiểu, có lộ trình và có thể thực hành."
              : "From Automation to Data, from basic knowledge to real applications in the factory, I want to organize everything into easy-to-follow lessons with a clear path that you can practice."}
          </p>
          <p>
            {vi
              ? "Mình hy vọng NOVA DATA sẽ trở thành một nơi mà bạn có thể bắt đầu học Data, tìm thấy tài liệu hữu ích và cùng mình tiến bộ từng ngày."
              : "I hope NOVA DATA becomes a place where you can start learning Data, find useful materials, and grow with me day by day."}
          </p>
          <p className="font-medium text-slate-800 dark:text-slate-200">
            {vi
              ? "Không cần biết tất cả mới bắt đầu. Chúng ta có thể vừa học, vừa làm và cùng nhau phát triển. ❤️"
              : "You do not need to know everything before you start. We can learn, practice and grow together. ❤️"}
          </p>
        </div>
      </Section>

      <p className="text-sm">
        <Link href="/contact" className="font-semibold text-sky-600 hover:underline">
          {vi ? "Liên hệ →" : "Contact →"}
        </Link>
      </p>
    </>
  );
}
