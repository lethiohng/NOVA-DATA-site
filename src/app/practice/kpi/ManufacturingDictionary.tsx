"use client";

import { useState } from "react";
import { useLang } from "@/lib/i18n";
import { MFG_CONFUSIONS, MFG_DICTIONARY } from "@/lib/manufacturing-dictionary";
import { Section, TableWrap } from "@/components/ui";

/* Từ điển viết tắt trong nhà máy: tìm kiếm theo viết tắt, tên đầy đủ hoặc ý nghĩa, nhóm theo chủ đề. */
export default function ManufacturingDictionary() {
  const { lang } = useLang();
  const vi = lang === "vi";
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();
  const groups = MFG_DICTIONARY.map((g) => ({
    ...g,
    terms: g.terms.filter((t) => !q || t.abbr.toLowerCase().includes(q) || t.full.toLowerCase().includes(q) || t.meaning.toLowerCase().includes(q)),
  })).filter((g) => g.terms.length);

  return (
    <Section id="manufacturing-dictionary" title={vi ? "Manufacturing Dictionary: từ viết tắt trong nhà máy" : "Manufacturing Dictionary: abbreviations on the factory floor"}>
      <p className="mb-4 text-sm text-slate-600 dark:text-slate-400">
        {vi
          ? "Các từ viết tắt thường gặp trong sản xuất, chất lượng, bảo trì, kho và dữ liệu nhà máy. Tên đầy đủ giữ tiếng Anh, ý nghĩa bằng tiếng Việt."
          : "Common abbreviations used in production, quality, maintenance, warehousing and factory data. Full names stay in English; meanings are in Vietnamese."}
      </p>
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={vi ? "Tìm viết tắt, tên đầy đủ hoặc ý nghĩa (OEE, PM, ERP...)" : "Search abbreviation, full name or meaning (OEE, PM, ERP...)"}
        className="mb-6 w-full rounded-lg border border-slate-300 bg-transparent px-4 py-2.5 outline-none focus:border-sky-500 dark:border-slate-700"
      />

      <div className="space-y-8">
        {groups.map((g) => (
          <div key={g.title}>
            <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">{g.title}</h3>
            <TableWrap>
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 dark:bg-slate-800">
                  <tr>
                    <th className="whitespace-nowrap px-4 py-2.5 font-semibold">{vi ? "Viết tắt" : "Abbreviation"}</th>
                    <th className="px-4 py-2.5 font-semibold">{vi ? "Tên đầy đủ" : "Full name"}</th>
                    <th className="px-4 py-2.5 font-semibold">{vi ? "Ý nghĩa" : "Meaning"}</th>
                  </tr>
                </thead>
                <tbody>
                  {g.terms.map((t) => (
                    <tr key={`${g.title}-${t.abbr}-${t.full}`} className="border-t border-slate-100 dark:border-slate-800">
                      <td className="whitespace-nowrap px-4 py-2.5 font-mono font-semibold text-slate-900 dark:text-white">{t.abbr}</td>
                      <td className="px-4 py-2.5 text-slate-700 dark:text-slate-300">{t.full}</td>
                      <td className="px-4 py-2.5 text-slate-600 dark:text-slate-400">{t.meaning}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </TableWrap>
          </div>
        ))}
        {!groups.length && <p className="text-sm text-slate-500">{vi ? "Không tìm thấy thuật ngữ phù hợp." : "No matching terms."}</p>}
      </div>

      <h3 className="mb-3 mt-10 text-sm font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
        {vi ? "Những thuật ngữ nên phân biệt" : "Terms that are easy to confuse"}
      </h3>
      <TableWrap>
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 dark:bg-slate-800">
            <tr>
              <th className="px-4 py-2.5 font-semibold">{vi ? "Cặp thuật ngữ" : "Pair"}</th>
              <th className="px-4 py-2.5 font-semibold">{vi ? "Khác nhau" : "Difference"}</th>
            </tr>
          </thead>
          <tbody>
            {MFG_CONFUSIONS.map((c) => (
              <tr key={c.pair} className="border-t border-slate-100 dark:border-slate-800">
                <td className="whitespace-nowrap px-4 py-2.5 font-mono font-semibold text-slate-900 dark:text-white">{c.pair}</td>
                <td className="px-4 py-2.5 text-slate-600 dark:text-slate-400">{c.difference}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableWrap>
    </Section>
  );
}
