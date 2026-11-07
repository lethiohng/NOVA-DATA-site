import Link from "next/link";

export type SidebarLesson = { id: string; number: number; title: string; module: number; minutes: number };
export type SidebarModule = { number: number; label: string; title: string };

/* Danh sách bài học bên trái: mỗi module là một mục gập/mở, module chứa bài đang xem tự mở sẵn. */
export default function LessonSidebar({
  heading,
  modules,
  lessons,
  currentId,
  hrefBase,
}: {
  heading: string;
  modules: SidebarModule[];
  lessons: SidebarLesson[];
  currentId: string;
  hrefBase: string;
}) {
  return (
    <aside className="hidden lg:sticky lg:top-24 lg:block lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto">
      <p className="mb-3 px-1 text-xs font-bold uppercase tracking-wider text-slate-500">{heading}</p>
      <nav aria-label={heading} className="space-y-2">
        {modules.map((m) => {
          const items = lessons.filter((x) => x.module === m.number);
          const open = items.some((x) => x.id === currentId);
          return (
            <details key={m.number} open={open} className="group rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-2 px-3 py-2.5 text-sm font-semibold text-slate-900 dark:text-white">
                <span className="min-w-0 truncate">
                  {m.label}: {m.title}
                </span>
                <span className="shrink-0 text-xs font-normal text-slate-500 transition group-open:rotate-180">▾</span>
              </summary>
              <ul className="space-y-0.5 border-t border-slate-100 p-2 dark:border-slate-800">
                {items.map((x) => {
                  const current = x.id === currentId;
                  return (
                    <li key={x.id}>
                      <Link
                        href={`${hrefBase}/${x.id}`}
                        aria-current={current ? "page" : undefined}
                        className={`flex items-center justify-between gap-2 rounded-lg px-2 py-1.5 text-sm transition ${
                          current
                            ? "bg-sky-50 font-semibold text-sky-700 dark:bg-sky-950/50 dark:text-sky-300"
                            : "text-slate-600 hover:bg-slate-50 hover:text-sky-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-sky-300"
                        }`}
                      >
                        <span className="min-w-0 truncate">
                          <span className="mr-1.5 font-mono text-xs text-slate-400">{x.number}.</span>
                          {x.title}
                        </span>
                        <span className="shrink-0 text-xs text-slate-400">{x.minutes}′</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </details>
          );
        })}
      </nav>
    </aside>
  );
}
