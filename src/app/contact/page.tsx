"use client";

import { useLang } from "@/lib/i18n";
import { ContactIcon, PageHeader, Section } from "@/components/ui";

const EMAIL = "lethihonghanh299@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/nova-hồng-hạnh-6586411ba";
const FACEBOOK = "https://www.facebook.com/NovaManufacturingBIE";
const ZALO = "0328772486";

export default function ContactPage() {
  const { lang } = useLang();
  const vi = lang === "vi";
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title={vi ? "Liên hệ" : "Contact"}
        description={
          vi
            ? "Góp ý nội dung, đề xuất dự án hoặc hợp tác. Bạn có thể gửi email hoặc kết nối qua LinkedIn."
            : "Send feedback, project ideas or collaboration requests by email, or connect on LinkedIn."
        }
      />
      <Section title={vi ? "Kênh liên hệ" : "Get in touch"}>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <a
            href={`mailto:${EMAIL}`}
            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-400 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
          >
            <ContactIcon kind="mail" />
            <p className="mt-4 text-sm font-medium text-slate-500">Email</p>
            <p className="mt-1 break-all font-semibold text-slate-900 group-hover:text-sky-600 dark:text-white">{EMAIL}</p>
          </a>
          <a
            href={LINKEDIN}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-400 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
          >
            <ContactIcon kind="linkedin" />
            <p className="mt-4 text-sm font-medium text-slate-500">LinkedIn</p>
            <p className="mt-1 font-semibold text-slate-900 group-hover:text-sky-600 dark:text-white">Nova Hồng Hạnh</p>
          </a>
          <a
            href={FACEBOOK}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-400 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
          >
            <ContactIcon kind="facebook" />
            <p className="mt-4 text-sm font-medium text-slate-500">Facebook</p>
            <p className="mt-1 break-all font-semibold text-slate-900 group-hover:text-sky-600 dark:text-white">NovaManufacturingBIE</p>
          </a>
          <a
            href={`https://zalo.me/${ZALO}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-400 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
          >
            <ContactIcon kind="zalo" />
            <p className="mt-4 text-sm font-medium text-slate-500">Zalo</p>
            <p className="mt-1 font-semibold text-slate-900 group-hover:text-sky-600 dark:text-white">{ZALO}</p>
          </a>
        </div>
      </Section>
    </>
  );
}
