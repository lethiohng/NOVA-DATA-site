"use client";

import { useState } from "react";
import type { Kpi } from "@/lib/content";
import { useLang, useT } from "@/lib/i18n";
import { PageHeader } from "@/components/ui";
import ManufacturingDictionary from "./ManufacturingDictionary";

export default function KpiDictionaryView({ kpis }: { kpis: Kpi[] }) {
  const { lang } = useLang();
  const t = useT();
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();
  const filtered = kpis.filter(
    (k) =>
      !q ||
      k.abbr.toLowerCase().includes(q) ||
      t(k.name).toLowerCase().includes(q) ||
      t(k.description).toLowerCase().includes(q) ||
      k.formula.toLowerCase().includes(q),
  );

  return (
    <>
      <PageHeader eyebrow="Practice · KPI" title="KPI Dictionary" description="Định nghĩa, công thức và dữ liệu cần có cho từng chỉ số." />
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={lang === "vi" ? "Tìm KPI (OEE, yield, downtime...)" : "Search KPI (OEE, yield, downtime...)"}
        className="mb-6 w-full rounded-lg border border-slate-300 bg-transparent px-4 py-2.5 outline-none focus:border-sky-500 dark:border-slate-700"
      />
      <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 dark:bg-slate-900">
            <tr>
              <th className="px-4 py-3 font-semibold">KPI</th>
              <th className="px-4 py-3 font-semibold">{lang === "vi" ? "Mô tả" : "Description"}</th>
              <th className="px-4 py-3 font-semibold">{lang === "vi" ? "Công thức" : "Formula"}</th>
              <th className="px-4 py-3 font-semibold">{lang === "vi" ? "Đơn vị" : "Unit"}</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((k) => (
              <tr key={k.slug} className="border-t border-slate-200 align-top dark:border-slate-800">
                <td className="px-4 py-3">
                  <div className="font-semibold">{k.abbr}</div>
                  <div className="text-xs text-slate-500">{t(k.name)}</div>
                </td>
                <td className="px-4 py-3">{t(k.description)}</td>
                <td className="px-4 py-3">
                  <div>{k.formula}</div>
                  <div className="mt-1 text-xs text-slate-500">Data: {k.dataNeeded.join(", ")}</div>
                </td>
                <td className="px-4 py-3">{k.unit}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-slate-500">
                  {lang === "vi" ? "Không tìm thấy KPI phù hợp." : "No matching KPI."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-12">
        <ManufacturingDictionary />
      </div>
    </>
  );
}
