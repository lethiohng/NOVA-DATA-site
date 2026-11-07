"use client";

import { useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";
import { useLang } from "@/lib/i18n";

type Activity = { kind: "signup" | "premium" | "course"; display_name: string; course: string | null; created_at: string };

const SHOW_MS = 5000;
const GAP_MS = 2500;

function ago(iso: string, vi: boolean) {
  const min = Math.max(1, Math.round((Date.now() - new Date(iso).getTime()) / 60000));
  if (min < 60) return vi ? `${min} phút trước` : `${min} min ago`;
  const h = Math.round(min / 60);
  if (h < 24) return vi ? `${h} giờ trước` : `${h} h ago`;
  const d = Math.round(h / 24);
  return vi ? `${d} ngày trước` : `${d} d ago`;
}

function message(a: Activity, vi: boolean) {
  if (a.kind === "premium") return vi ? "vừa mua gói Premium" : "just bought Premium";
  if (a.kind === "course") return vi ? `vừa mua khóa ${a.course ?? ""}` : `just enrolled in ${a.course ?? ""}`;
  return vi ? "vừa đăng ký thành viên" : "just joined";
}

/* Khung thông báo góc dưới: lần lượt hiện các đăng ký, mua Premium, mua khóa học gần đây lấy từ bảng activity_events. */
export default function ActivityToast() {
  const { lang } = useLang();
  const vi = lang === "vi";
  const [supabase] = useState(() => createSupabaseBrowserClient());
  const [items, setItems] = useState<Activity[]>([]);
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    supabase
      .from("activity_events")
      .select("kind, display_name, course, created_at")
      .order("created_at", { ascending: false })
      .limit(30)
      .then(({ data }) => setItems((data as Activity[]) ?? []));
  }, [supabase]);

  // Hiện một thông báo rồi ẩn, sau đó chuyển sang thông báo tiếp theo (quay vòng).
  useEffect(() => {
    if (items.length === 0 || closed) return;
    let timer: ReturnType<typeof setTimeout>;
    if (visible) {
      timer = setTimeout(() => setVisible(false), SHOW_MS);
    } else {
      timer = setTimeout(() => {
        setIndex((i) => (i + 1) % items.length);
        setVisible(true);
      }, GAP_MS);
    }
    return () => clearTimeout(timer);
  }, [items, visible, closed, index]);

  if (closed || items.length === 0) return null;
  const a = items[index];

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed bottom-4 left-4 z-40 relative flex max-w-xs items-start gap-3 rounded-xl border border-slate-200 bg-white p-3 pr-8 text-sm shadow-lg transition duration-500 dark:border-slate-800 dark:bg-slate-900 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <span
        aria-hidden="true"
        className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${a.kind === "signup" ? "bg-emerald-500" : a.kind === "premium" ? "bg-violet-500" : "bg-sky-500"}`}
      />
      <div>
        <p className="text-slate-800 dark:text-slate-200">
          <span className="font-semibold">{a.display_name}</span> {message(a, vi)}
        </p>
        <p className="mt-0.5 text-xs text-slate-500">{ago(a.created_at, vi)}</p>
      </div>
      <button
        type="button"
        aria-label={vi ? "Đóng" : "Close"}
        onClick={() => setClosed(true)}
        className="absolute right-2 top-2 rounded-md px-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
      >
        ×
      </button>
    </div>
  );
}
