"use client";

import { useEffect, useState } from "react";
import { displayCell, sandbox, type QueryResult, type Verdict } from "@/lib/sql-sandbox";
import { useLang } from "@/lib/i18n";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";
import { markExerciseSolved } from "@/lib/progress";

const MAX_ROWS = 100;

/** Thông báo đúng / sai sau khi chạy, so với đáp án của bài. */
function VerdictBanner({ verdict }: { verdict: Verdict }) {
  const { lang } = useLang();
  const vi = lang === "vi";

  const tone =
    verdict.status === "ok"
      ? "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300"
      : verdict.status === "ok-no-result"
        ? "border-sky-200 bg-sky-50 text-sky-800 dark:border-sky-900 dark:bg-sky-950/40 dark:text-sky-300"
        : "border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-300";

  const text = {
    ok: vi ? "Chính xác! Kết quả khớp với đáp án." : "Correct! Your result matches the answer.",
    wrong: vi
      ? `Chưa đúng.${verdict.message ? ` ${verdict.message}.` : " Kiểm tra lại điều kiện, cột và thứ tự."}`
      : "Not quite. Check the conditions, columns and order.",
    error: vi ? "Câu lệnh có lỗi, xem thông báo bên dưới." : "The query has an error, see the message below.",
    "ok-no-result": vi ? "Câu lệnh chạy được. Bài này không có bảng kết quả để so sánh." : "The query runs. This exercise has no result table to compare.",
  }[verdict.status];

  return (
    <p role="status" className={`rounded-lg border px-3 py-2 text-sm font-medium ${tone}`}>
      {text}
    </p>
  );
}

/** Bảng kết quả truy vấn (tối đa 100 dòng hiển thị). */
export function ResultView({ result }: { result: QueryResult }) {
  const { lang } = useLang();
  const vi = lang === "vi";

  if (result.error) {
    return (
      <div className="rounded-lg border border-rose-200 bg-rose-50 p-3 font-mono text-sm text-rose-700 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300">
        {result.error}
      </div>
    );
  }
  if (!result.columns.length) {
    return <p className="text-sm text-slate-500">{vi ? "Truy vấn đã chạy (không có kết quả để hiển thị)." : "Query ran (no result rows to show)."}</p>;
  }

  const shown = result.rows.slice(0, MAX_ROWS);
  return (
    <div>
      <p className="mb-2 text-xs text-slate-500">
        {vi ? `${result.rowCount} dòng · ${result.ms} ms` : `${result.rowCount} rows · ${result.ms} ms`}
        {result.rowCount > MAX_ROWS && (vi ? ` · hiển thị ${MAX_ROWS} dòng đầu` : ` · showing first ${MAX_ROWS}`)}
      </p>
      <div className="max-h-96 overflow-auto rounded-lg border border-slate-200 dark:border-slate-800">
        <table className="w-full text-left text-xs">
          <thead className="sticky top-0 bg-slate-100 dark:bg-slate-800">
            <tr>
              {result.columns.map((c) => (
                <th key={c} className="whitespace-nowrap px-3 py-2 font-semibold">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {shown.map((row, i) => (
              <tr key={i} className="border-t border-slate-100 dark:border-slate-800">
                {result.columns.map((c) => (
                  <td key={c} className="whitespace-nowrap px-3 py-1.5 font-mono">
                    {row[c] === null ? <span className="text-slate-400">NULL</span> : displayCell(row[c])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/** Kết quả của câu đáp án trên dữ liệu mẫu, để người học so với kết quả của mình. */
export function AnswerResult({ sql }: { sql: string }) {
  const { lang } = useLang();
  const vi = lang === "vi";
  const [result, setResult] = useState<QueryResult | null>(null);

  useEffect(() => {
    let alive = true;
    sandbox.run(sql).then((r) => {
      if (alive) setResult(r);
    });
    return () => {
      alive = false;
    };
  }, [sql]);

  return (
    <div>
      <p className="mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300">{vi ? "Kết quả đúng" : "Expected result"}</p>
      {result ? <ResultView result={result} /> : <p className="text-sm text-slate-500">{vi ? "Đang tải…" : "Loading…"}</p>}
    </div>
  );
}

/** Ô soạn SQL: gõ truy vấn, bấm Chạy (hoặc Ctrl+Enter) để xem kết quả. Có `expected` thì chấm đúng sai so với đáp án. */
export function SqlEditor({
  initial = "",
  placeholder,
  expected,
  exerciseId,
}: {
  initial?: string;
  placeholder?: string;
  expected?: string;
  exerciseId?: string; // có thì ghi nhận tiến độ khi người học giải đúng
}) {
  const { lang } = useLang();
  const vi = lang === "vi";
  const [supabase] = useState(() => createSupabaseBrowserClient());
  const [sql, setSql] = useState(initial);
  const [result, setResult] = useState<QueryResult | null>(null);
  const [verdict, setVerdict] = useState<Verdict | null>(null);
  const [running, setRunning] = useState(false);

  const run = async () => {
    if (!sql.trim() || running) return;
    setRunning(true);
    setVerdict(null);
    setResult(await sandbox.run(sql));
    if (expected) {
      const v = await sandbox.check(sql, expected);
      setVerdict(v);
      if (v.status === "ok" && exerciseId) markExerciseSolved(supabase, exerciseId).catch(() => {});
    }
    setRunning(false);
  };

  return (
    <div className="space-y-3">
      <textarea
        value={sql}
        onChange={(e) => setSql(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
            e.preventDefault();
            run();
          }
        }}
        rows={6}
        spellCheck={false}
        placeholder={placeholder ?? "SELECT * FROM production_lines;"}
        aria-label="SQL"
        className="w-full rounded-xl border border-slate-300 bg-slate-950 p-3 font-mono text-sm leading-relaxed text-slate-100 placeholder:text-slate-500 focus:border-sky-500 focus:outline-none dark:border-slate-700"
      />
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={run}
          disabled={running}
          className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700 disabled:opacity-60"
        >
          {running ? (vi ? "Đang chạy…" : "Running…") : vi ? "Chạy SQL" : "Run SQL"}
        </button>
        <span className="text-xs text-slate-500">{vi ? "Ctrl + Enter để chạy nhanh" : "Ctrl + Enter to run"}</span>
      </div>
      {verdict && <VerdictBanner verdict={verdict} />}
      {result && <ResultView result={result} />}
    </div>
  );
}

