"use client";

import Link from "next/link";
import Logo from "@/components/Logo";
import { Icon } from "@/components/ui";
import { useLang } from "@/lib/i18n";

const EMAIL = "lethihonghanh299@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/nova-hồng-hạnh-6586411ba";
const FACEBOOK = "https://www.facebook.com/NovaManufacturingBIE";

function FooterLinks({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div className="text-sm">
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-white">{title}</p>
      <ul className="mt-4 space-y-2.5 text-slate-500 dark:text-slate-400">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="transition hover:text-sky-600 dark:hover:text-sky-400">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const { lang } = useLang();
  const vi = lang === "vi";

  return (
    <footer className="mt-auto border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-[2fr_1fr_1fr_1.3fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-500 dark:text-slate-400">
            {vi
              ? "Học BI, SQL và phân tích sản xuất qua kiến thức có cấu trúc, bài tập thực hành và dự án thực tế."
              : "Learn BI, SQL and manufacturing analytics through structured lessons, hands-on exercises and real projects."}
          </p>
        </div>

        <FooterLinks
          title={vi ? "Học" : "Learn"}
          links={[
            { href: "/learn", label: vi ? "Kiến thức" : "Knowledge" },
            { href: "/practice/sql", label: vi ? "Bài tập SQL" : "SQL Exercises" },
            { href: "/projects", label: vi ? "Dự án" : "Projects" },
            { href: "/career", label: vi ? "Nghề nghiệp" : "Career" },
          ]}
        />

        <FooterLinks
          title={vi ? "Khác" : "More"}
          links={[
            { href: "/about", label: vi ? "Giới thiệu" : "About" },
            { href: "/contact", label: vi ? "Liên hệ" : "Contact" },
          ]}
        />

        <div className="text-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-white">{vi ? "Kết nối" : "Connect"}</p>
          <ul className="mt-4 space-y-2.5 text-slate-500 dark:text-slate-400">
            <li>
              <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 transition hover:text-sky-600 dark:hover:text-sky-400">
                <img src="https://mvhzyhdwmhdgossmpblj.supabase.co/storage/v1/object/public/brand/icons/linkedin.png" alt="" width={20} height={20} className="h-5 w-5 shrink-0" />
                LinkedIn
              </a>
            </li>
            <li>
              <a href={FACEBOOK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 transition hover:text-sky-600 dark:hover:text-sky-400">
                <img src="https://mvhzyhdwmhdgossmpblj.supabase.co/storage/v1/object/public/brand/icons/facebook.png" alt="" width={20} height={20} className="h-5 w-5 shrink-0" />
                Facebook
              </a>
            </li>
            <li>
              <a href="https://zalo.me/0328772486" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 transition hover:text-sky-600 dark:hover:text-sky-400">
                <img src="https://mvhzyhdwmhdgossmpblj.supabase.co/storage/v1/object/public/brand/icons/zalo.png" alt="" width={20} height={20} className="h-5 w-5 shrink-0" />
                Zalo: 0328772486
              </a>
            </li>
            <li>
              <a href="https://wa.me/84328772486" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 transition hover:text-sky-600 dark:hover:text-sky-400">
                <span aria-hidden className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#3b86d1] text-[10px] font-bold text-white">W</span>
                WhatsApp: 0328772486
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-200 px-4 py-5 text-center text-xs text-slate-500 dark:border-slate-800">
        © NOVA DATA · Learn · Practice · Build
      </div>
    </footer>
  );
}
