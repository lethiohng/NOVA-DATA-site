import Link from "next/link";
import type { ReactNode } from "react";
import CopyButton from "@/components/CopyButton";

/* Hệ thống giao diện dùng chung: một kiểu bo góc, một kiểu viền, một kiểu nhãn. */

export function PageHeader({
  eyebrow,
  title,
  description,
  art,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  art?: ReactNode; // hình trang trí bên phải, chỉ hiện trên màn hình vừa trở lên
}) {
  return (
    <header className="relative mb-10 overflow-hidden rounded-3xl border border-slate-200 bg-white px-6 py-8 shadow-sm md:px-10 dark:border-slate-800 dark:bg-slate-900">
      {/* Điểm nhấn trang trí góc phải, chỉ mang tính thị giác */}
      <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gradient-to-br from-sky-200/70 to-red-200/60 blur-3xl dark:from-sky-900/40 dark:to-red-900/30" />
      {art && <div aria-hidden className="pointer-events-none absolute bottom-4 right-6 hidden w-72 md:block lg:w-80">{art}</div>}
      <div className="relative">
        {eyebrow && (
          <span className="inline-flex items-center rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-sky-700 ring-1 ring-sky-100 dark:bg-sky-950/60 dark:text-sky-300 dark:ring-sky-900">
            {eyebrow}
          </span>
        )}
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl dark:text-white">{title}</h1>
        {description && <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-600 dark:text-slate-400">{description}</p>}
      </div>
    </header>
  );
}

export function Section({ title, children, id }: { title: string; children: ReactNode; id?: string }) {
  return (
    <section id={id} className="mb-12 scroll-mt-24">
      <h2 className="mb-5 flex items-center gap-3 text-xl font-semibold tracking-tight text-slate-900 dark:text-white">
        <span aria-hidden className="h-6 w-1 rounded-full bg-sky-500" />
        {title}
      </h2>
      {children}
    </section>
  );
}

const cardBase =
  "group block rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 dark:border-slate-800 dark:bg-slate-900";
const cardHover = "hover:-translate-y-0.5 hover:border-sky-400 hover:shadow-md dark:hover:border-sky-600";

export function Card({ href, children, className = "" }: { href?: string; children: ReactNode; className?: string }) {
  if (href) {
    return (
      <Link href={href} className={`${cardBase} ${cardHover} ${className}`}>
        {children}
      </Link>
    );
  }
  return <div className={`${cardBase} ${className}`}>{children}</div>;
}

export function CardArrow() {
  return (
    <span aria-hidden className="mt-4 inline-block text-sm font-medium text-sky-600 transition group-hover:translate-x-1 dark:text-sky-400">
      →
    </span>
  );
}

export function Badge({ children, tone = "slate" }: { children: ReactNode; tone?: "slate" | "green" | "amber" | "sky" | "violet" }) {
  const tones = {
    violet: "bg-violet-50 text-violet-700 ring-violet-200 dark:bg-violet-950/50 dark:text-violet-300 dark:ring-violet-900",
    slate: "bg-slate-100 text-slate-700 ring-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700",
    green: "bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:ring-emerald-900",
    amber: "bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:ring-amber-900",
    sky: "bg-sky-50 text-sky-700 ring-sky-200 dark:bg-sky-950/50 dark:text-sky-300 dark:ring-sky-900",
  };
  return (
    <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${tones[tone]}`}>
      {children}
    </span>
  );
}

export type StatIcon = "category" | "topic" | "path" | "project";

// Biểu tượng outline (kiểu Heroicons), vẽ bằng currentColor để đổi màu theo thẻ.
const STAT_ICON_PATHS: Record<StatIcon, string> = {
  category: "M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25",
  topic: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
  path: "M22 9L12 4 2 9l10 5 10-5zM6 11.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-4.5",
  project: "M8 21h8M12 17v4M7 4h10v5a5 5 0 01-10 0V4zM7 6H4v1a3 3 0 003 3M17 6h3v1a3 3 0 01-3 3",
};

export type IconName = "book" | "grid" | "map" | "factory" | "antenna" | "monitor" | "layers" | "cap" | "trophy" | "code" | "chart" | "database" | "cube" | "shield" | "file" | "download" | "mail" | "link" | "menu" | "close" | "settings" | "sun" | "moon" | "user" | "chevron" | "logout";

const ICON_PATHS: Record<IconName, string> = {
  book: STAT_ICON_PATHS.category,
  grid: STAT_ICON_PATHS.topic,
  map: STAT_ICON_PATHS.path,
  factory: "M2 21h20M4 21V9l6 4V9l6 4V5h4v16",
  antenna: "M12 12h.01M8 21h8M12 21v-9M8.5 8.5a5 5 0 000 7M15.5 8.5a5 5 0 010 7M5 5.5a9.5 9.5 0 000 13M19 5.5a9.5 9.5 0 010 13",
  monitor: "M3 4h18v12H3zM8 20h8M12 16v4",
  layers: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
  cap: "M22 9L12 4 2 9l10 5 10-5zM6 11.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-4.5",
  trophy: "M8 21h8M12 17v4M7 4h10v5a5 5 0 01-10 0V4zM7 6H4v1a3 3 0 003 3M17 6h3v1a3 3 0 01-3 3",
  code: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
  chart: "M3 3v18h18M7 14v4m5-8v8m5-12v12",
  database: "M4 7c0-1.657 3.582-3 8-3s8 1.343 8 3-3.582 3-8 3-8-1.343-8-3zm0 0v5c0 1.657 3.582 3 8 3s8-1.343 8-3V7M4 12v5c0 1.657 3.582 3 8 3s8-1.343 8-3v-5",
  cube: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
  shield: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  file: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  download: "M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V3",
  mail: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  link: "M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1",
  menu: "M4 6h16M4 12h16M4 18h16",
  close: "M6 18L18 6M6 6l12 12",
  settings: "M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4",
  sun: "M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z",
  moon: "M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z",
  user: "M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z",
  chevron: "M19 9l-7 7-7-7",
  logout: "M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75",
};

/** Biểu tượng outline dùng chung cho thẻ, menu và liên kết. Đổi màu bằng class text-*. */
export function Icon({ name, className = "h-5 w-5" }: { name: IconName; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d={ICON_PATHS[name]} />
    </svg>
  );
}

/** Icon đỏ đơn sắc, không có ô nền, đặt ở đầu thẻ. */
export function IconBox({ name }: { name: IconName }) {
  return (
    <span className="mb-4 flex h-10 w-10 shrink-0 items-center justify-center text-sky-600 dark:text-sky-400">
      <Icon name={name} className="h-10 w-10" />
    </span>
  );
}

/** Icon kênh liên hệ: email dùng icon chung, các mạng xã hội dùng ô màu thương hiệu với chữ viết tắt. */
const CONTACT_BRANDS = {
  linkedin: { label: "in", bg: "bg-[#0A66C2]" },
  facebook: { label: "f", bg: "bg-[#1877F2]" },
  zalo: { label: "Z", bg: "bg-[#0068FF]" },
} as const;

export function ContactIcon({ kind, className = "h-10 w-10" }: { kind: "mail" | keyof typeof CONTACT_BRANDS; className?: string }) {
  if (kind === "mail") {
    return (
      <span className={`flex shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-600 ring-1 ring-sky-100 dark:bg-slate-800 dark:text-sky-400 dark:ring-slate-700 ${className}`}>
        <Icon name="mail" />
      </span>
    );
  }
  const brand = CONTACT_BRANDS[kind];
  return (
    <span aria-hidden="true" className={`flex shrink-0 items-center justify-center rounded-xl text-sm font-bold text-white ${brand.bg} ${className}`}>
      {brand.label}
    </span>
  );
}

export function Stat({ value, label, icon }: { value: string | number; label: string; icon?: StatIcon }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white/80 p-5 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
      {icon && (
        <span className="mb-4 flex h-10 w-10 items-center justify-center text-sky-600 dark:text-sky-400">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10" aria-hidden="true">
            <path d={STAT_ICON_PATHS[icon]} />
          </svg>
        </span>
      )}
      {/* Số và nội dung nằm cùng một dòng, số đứng trước */}
      <div className="flex flex-wrap items-baseline gap-x-2">
        <span className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">{value}</span>
        <span className="text-sm text-slate-600 dark:text-slate-400">{label}</span>
      </div>
    </div>
  );
}

export function CodeBlock({ code }: { code: string }) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-950 shadow-sm">
      <div className="flex items-center gap-1.5 border-b border-slate-800 px-4 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
        <span className="ml-3 text-xs text-slate-500">SQL · PostgreSQL</span>
        <CopyButton text={code} />
      </div>
      {/* Xuống dòng thay vì cuộn ngang, để thấy hết câu lệnh dài. */}
      <pre className="whitespace-pre-wrap break-words p-4 text-sm leading-relaxed text-slate-100">
        <code>{code}</code>
      </pre>
    </div>
  );
}

/** Khung bảng có cuộn ngang trên màn hình nhỏ. */
export function TableWrap({ children }: { children: ReactNode }) {
  return <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">{children}</div>;
}
