"use client";

import { useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";

/* Kích hoạt quyền truy cập cho người dùng: gói Premium (mở mọi khóa trả phí) hoặc từng khóa riêng.
   Quyền được RLS kiểm tra ở database (migration_020), chỉ admin mới đổi được. */

type User = { id: string; display_name: string | null; email: string | null; is_premium: boolean; created_at: string };

const PAID = [
  { key: "sql-intermediate", label: "SQL Intermediate" },
  { key: "sql-advanced", label: "SQL Advanced" },
];

export default function UsersAdmin() {
  const [supabase] = useState(() => createSupabaseBrowserClient());
  const [users, setUsers] = useState<User[]>([]);
  const [access, setAccess] = useState<Set<string>>(new Set()); // "userId|course"
  const [q, setQ] = useState("");
  const [busy, setBusy] = useState<string | null>(null);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  async function load() {
    const [u, a] = await Promise.all([
      supabase.from("profiles").select("id, display_name, email, is_premium, created_at").order("created_at", { ascending: false }).limit(300),
      supabase.from("course_access").select("user_id, course"),
    ]);
    if (u.error) return setMsg({ ok: false, text: `Không tải được người dùng: ${u.error.message}` });
    if (a.error) return setMsg({ ok: false, text: `Không tải được quyền khóa: ${a.error.message}` });
    setUsers((u.data ?? []) as User[]);
    setAccess(new Set((a.data ?? []).map((r: { user_id: string; course: string }) => `${r.user_id}|${r.course}`)));
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supabase]);

  async function togglePremium(u: User) {
    setBusy(u.id);
    setMsg(null);
    const { data, error } = await supabase.from("profiles").update({ is_premium: !u.is_premium }).eq("id", u.id).select("id");
    setBusy(null);
    if (error || !data?.length) return setMsg({ ok: false, text: error ? error.message : "Không đổi được: không có quyền." });
    setUsers(users.map((x) => (x.id === u.id ? { ...x, is_premium: !u.is_premium } : x)));
    setMsg({ ok: true, text: `Đã ${!u.is_premium ? "bật" : "tắt"} Premium cho ${u.email ?? u.display_name ?? "người dùng"}.` });
  }

  async function toggleCourse(u: User, course: string) {
    const k = `${u.id}|${course}`;
    const has = access.has(k);
    setBusy(k);
    setMsg(null);
    const res = has
      ? await supabase.from("course_access").delete().eq("user_id", u.id).eq("course", course).select("user_id")
      : await supabase.from("course_access").insert({ user_id: u.id, course }).select("user_id");
    setBusy(null);
    if (res.error || !res.data?.length) return setMsg({ ok: false, text: res.error ? res.error.message : "Không đổi được: không có quyền." });
    const next = new Set(access);
    if (has) next.delete(k);
    else next.add(k);
    setAccess(next);
    setMsg({ ok: true, text: `Đã ${has ? "thu hồi" : "cấp"} quyền ${course} cho ${u.email ?? u.display_name ?? "người dùng"}.` });
  }

  const term = q.trim().toLowerCase();
  const shown = users.filter((u) => !term || (u.email ?? "").toLowerCase().includes(term) || (u.display_name ?? "").toLowerCase().includes(term));

  return (
    <section className="space-y-4">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Tìm theo email hoặc tên…"
        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-sky-500 focus:outline-none dark:border-slate-700 dark:bg-slate-950"
      />
      {msg && <p className={`text-sm ${msg.ok ? "text-emerald-600" : "text-rose-600"}`}>{msg.text}</p>}
      <p className="text-xs text-slate-500">Premium mở mọi khóa trả phí. Có thể cấp riêng từng khóa nếu không bật Premium. Hiển thị {shown.length} / {users.length} người dùng.</p>

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 text-xs uppercase text-slate-500 dark:border-slate-800">
            <tr>
              <th className="px-3 py-2">Người dùng</th>
              <th className="px-3 py-2 text-center">Premium</th>
              {PAID.map((c) => (
                <th key={c.key} className="px-3 py-2 text-center">
                  {c.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {shown.map((u) => (
              <tr key={u.id} className="border-b border-slate-100 last:border-0 dark:border-slate-800">
                <td className="px-3 py-2">
                  <div className="font-semibold text-slate-900 dark:text-white">{u.display_name ?? "(chưa có tên)"}</div>
                  <div className="text-xs text-slate-500">{u.email}</div>
                </td>
                <td className="px-3 py-2 text-center">
                  <input type="checkbox" checked={u.is_premium} disabled={busy === u.id} onChange={() => togglePremium(u)} className="h-4 w-4 accent-sky-600" aria-label="Premium" />
                </td>
                {PAID.map((c) => {
                  const k = `${u.id}|${c.key}`;
                  const has = access.has(k);
                  return (
                    <td key={c.key} className="px-3 py-2 text-center">
                      <input
                        type="checkbox"
                        checked={has || u.is_premium}
                        disabled={u.is_premium || busy === k}
                        onChange={() => toggleCourse(u, c.key)}
                        className="h-4 w-4 accent-sky-600 disabled:opacity-50"
                        aria-label={c.label}
                        title={u.is_premium ? "Đã có qua Premium" : undefined}
                      />
                    </td>
                  );
                })}
              </tr>
            ))}
            {shown.length === 0 && (
              <tr>
                <td colSpan={2 + PAID.length} className="px-3 py-6 text-center text-slate-500">
                  Không có người dùng.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
