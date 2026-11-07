"use client";

import { useEffect, useState } from "react";
import { sandbox, type TableInfo } from "@/lib/sql-sandbox";
import { useLang } from "@/lib/i18n";

export { DATASET_TABLES, tablesIn } from "@/lib/dataset-tables";

// Danh sách bảng chỉ truy vấn một lần, dùng chung cho mọi bài tập trên trang.
let tablesPromise: Promise<TableInfo[]> | null = null;
const loadTables = () => (tablesPromise ??= sandbox.listTables());

/**
 * Xem bảng dữ liệu: cột, kiểu dữ liệu và 5 dòng mẫu.
 * Truyền `names` để chỉ hiện các bảng liên quan (mở sẵn). Không truyền thì hiện tất cả (thu gọn).
 */
export function SchemaPanel({ names }: { names?: string[] }) {
  const { lang } = useLang();
  const vi = lang === "vi";
  const [tables, setTables] = useState<TableInfo[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState<Set<string>>(() => new Set(names ?? []));

  useEffect(() => {
    loadTables()
      .then(setTables)
      .catch((e: Error) => setError(e.message));
  }, []);

  if (error) return <p className="text-sm text-rose-600">{error}</p>;
  if (!tables) {
    return <p className="text-sm text-slate-500">{vi ? "Đang nạp dữ liệu mẫu (lần đầu có thể mất vài giây)…" : "Loading sample data (first load may take a few seconds)…"}</p>;
  }

  const shown = names ? tables.filter((t) => names.includes(t.name)) : tables;
  if (!shown.length) return null;

  const toggle = (name: string) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });

  return (
    <div className="grid gap-4">
      {shown.map((t) => {
        const isOpen = open.has(t.name);
        return (
          <div key={t.name} className="rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
            <button
              type="button"
              onClick={() => toggle(t.name)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between px-4 py-3 text-left"
            >
              <span className="font-mono text-sm font-semibold text-slate-900 dark:text-white">{t.name}</span>
              <span className="text-xs text-slate-500">
                {t.rowCount.toLocaleString()} {vi ? "dòng" : "rows"} {isOpen ? "▴" : "▾"}
              </span>
            </button>
            {isOpen && (
              <div className="space-y-3 border-t border-slate-200 p-4 dark:border-slate-800">
                <div className="flex flex-wrap gap-1.5">
                  {t.columns.map((c) => (
                    <span key={c.name} className="rounded-md bg-slate-100 px-2 py-0.5 font-mono text-xs dark:bg-slate-800">
                      {c.name} <span className="text-slate-400">{c.type}</span>
                    </span>
                  ))}
                </div>
                {t.sample.length > 0 && (
                  <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-slate-50 dark:bg-slate-800">
                        <tr>
                          {t.columns.map((c) => (
                            <th key={c.name} className="whitespace-nowrap px-3 py-2 font-semibold">
                              {c.name}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {t.sample.map((row, i) => (
                          <tr key={i} className="border-t border-slate-100 dark:border-slate-800">
                            {t.columns.map((c) => (
                              <td key={c.name} className="whitespace-nowrap px-3 py-2 font-mono">
                                {row[c.name] === null ? <span className="text-slate-400">NULL</span> : String(row[c.name])}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
