"use client";

import { useEffect, useState } from "react";
import { playChime } from "@/lib/sound";

/* Đồng hồ đếm ngược theo thời lượng ước tính của bài: Bắt đầu, Tạm dừng, Đặt lại. */
export default function LessonTimer({ minutes }: { minutes: number }) {
  const total = minutes * 60;
  const [left, setLeft] = useState(total);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    if (left <= 0) {
      setRunning(false);
      playChime();
      return;
    }
    const id = window.setTimeout(() => setLeft((s) => s - 1), 1000);
    return () => window.clearTimeout(id);
  }, [running, left]);

  const mm = String(Math.floor(Math.max(left, 0) / 60)).padStart(2, "0");
  const ss = String(Math.max(left, 0) % 60).padStart(2, "0");
  const finished = left <= 0;

  return (
    <div className="mb-6 flex flex-wrap items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-900">
      <span
        role="timer"
        aria-live="off"
        className={`font-mono text-2xl font-bold tabular-nums ${finished ? "text-emerald-600" : "text-slate-900 dark:text-white"}`}
      >
        {mm}:{ss}
      </span>
      <span className="text-sm text-slate-500">{finished ? "Hết thời gian dự kiến, bạn làm rất tốt!" : "Thời gian dự kiến"}</span>
      <div className="ml-auto flex gap-2">
        {!finished && (
          <button
            type="button"
            onClick={() => setRunning((r) => !r)}
            className="rounded-lg bg-sky-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-sky-700"
          >
            {running ? "Tạm dừng" : left === total ? "Bắt đầu" : "Tiếp tục"}
          </button>
        )}
        <button
          type="button"
          onClick={() => {
            setRunning(false);
            setLeft(total);
          }}
          className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium hover:border-sky-500 dark:border-slate-700"
        >
          Đặt lại
        </button>
      </div>
    </div>
  );
}
