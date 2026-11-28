"use client";

import { useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";
import { MILESTONES, MISSION, type Milestone, type MilestoneDetail } from "@/app/about/milestones";
import type { Bi } from "@/lib/i18n";

/* Admin sửa trang About: các mốc hành trình và đoạn Sứ mệnh. Dữ liệu lưu ở migration_022. */

type Row = { id: string; position: number; data: Milestone };
type MissionRow = { id: string; position: number; vi: string; en: string };

const inputCls = "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-sky-500 focus:outline-none dark:border-slate-700 dark:bg-slate-950";
const BTN = "rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 disabled:opacity-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800";

function Text({ label, value, onChange, rows = 1 }: { label: string; value: string; onChange: (v: string) => void; rows?: number }) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block text-slate-600 dark:text-slate-400">{label}</span>
      {rows > 1 ? (
        <textarea rows={rows} value={value} onChange={(e) => onChange(e.target.value)} className={inputCls} />
      ) : (
        <input value={value} onChange={(e) => onChange(e.target.value)} className={inputCls} />
      )}
    </label>
  );
}

/* Hai ô VI và EN cạnh nhau cho một trường song ngữ. */
function Bilingual({ label, value, onChange, rows = 1 }: { label: string; value: Bi; onChange: (v: Bi) => void; rows?: number }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <Text label={`${label} (VI)`} value={value.vi} onChange={(v) => onChange({ ...value, vi: v })} rows={rows} />
      <Text label={`${label} (EN)`} value={value.en} onChange={(v) => onChange({ ...value, en: v })} rows={rows} />
    </div>
  );
}

/* Danh sách song ngữ: mỗi dòng là một mục, dòng thứ i ở ô VI và ô EN khớp nhau. */
function linesToBi(vi: string, en: string): Bi[] {
  const a = vi.split("\n");
  const b = en.split("\n");
  const n = Math.max(a.length, b.length);
  const out: Bi[] = [];
  for (let i = 0; i < n; i++) {
    const item = { vi: (a[i] ?? "").trim(), en: (b[i] ?? "").trim() };
    if (item.vi || item.en) out.push(item);
  }
  return out;
}
const biToVi = (xs: Bi[]) => xs.map((x) => x.vi).join("\n");
const biToEn = (xs: Bi[]) => xs.map((x) => x.en).join("\n");

function emptyDetail(): MilestoneDetail {
  return { overview: { vi: "", en: "" }, workTitle: { vi: "", en: "" }, work: [], skills: [], learning: { vi: "", en: "" } };
}

export default function AboutAdmin() {
  const [supabase] = useState(() => createSupabaseBrowserClient());
  const [rows, setRows] = useState<Row[]>([]);
  const [mission, setMission] = useState<MissionRow[]>([]);
  const [sel, setSel] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  async function load() {
    const [m, s] = await Promise.all([
      supabase.from("about_milestones").select("id, position, data").order("position"),
      supabase.from("about_mission").select("id, position, vi, en").order("position"),
    ]);
    if (m.error || s.error) return setMsg({ ok: false, text: (m.error ?? s.error)!.message });
    setRows((m.data ?? []) as Row[]);
    setMission((s.data ?? []) as MissionRow[]);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supabase]);

  async function seedDefaults() {
    setBusy(true);
    setMsg(null);
    const { error: e1 } = await supabase.from("about_milestones").insert(MILESTONES.map((data, i) => ({ position: i + 1, data })));
    const { error: e2 } = await supabase.from("about_mission").insert(MISSION.map((p, i) => ({ position: i + 1, vi: p.vi, en: p.en })));
    setBusy(false);
    if (e1 || e2) return setMsg({ ok: false, text: (e1 ?? e2)!.message });
    setMsg({ ok: true, text: "Đã nạp nội dung mặc định. Bây giờ bạn có thể sửa." });
    load();
  }

  const current = rows.find((r) => r.id === sel) ?? null;

  function patch(data: Milestone) {
    if (!current) return;
    setRows(rows.map((r) => (r.id === current.id ? { ...r, data } : r)));
  }

  async function saveMilestone() {
    if (!current) return;
    setBusy(true);
    setMsg(null);
    const { data, error } = await supabase.from("about_milestones").update({ data: current.data, updated_at: new Date().toISOString() }).eq("id", current.id).select("id");
    setBusy(false);
    if (error || !data?.length) return setMsg({ ok: false, text: error ? error.message : "Không lưu được: không có quyền sửa." });
    setMsg({ ok: true, text: "Đã lưu mốc." });
  }

  async function addMilestone() {
    const position = rows.length ? Math.max(...rows.map((r) => r.position)) + 1 : 1;
    const data: Milestone = {
      period: { vi: "", en: "" },
      title: { vi: "", en: "" },
      sub: { vi: "", en: "" },
      short: { vi: "", en: "" },
      detail: emptyDetail(),
    };
    setBusy(true);
    const { data: ins, error } = await supabase.from("about_milestones").insert({ position, data }).select("id").single();
    setBusy(false);
    if (error || !ins) return setMsg({ ok: false, text: error ? error.message : "Không thêm được." });
    await load();
    setSel(ins.id);
  }

  async function removeMilestone() {
    if (!current || !window.confirm("Xóa mốc này?")) return;
    setBusy(true);
    const { data, error } = await supabase.from("about_milestones").delete().eq("id", current.id).select("id");
    setBusy(false);
    if (error || !data?.length) return setMsg({ ok: false, text: error ? error.message : "Không xóa được." });
    setSel(null);
    load();
  }

  // Đổi thứ tự: hoán đổi vị trí với mốc liền trên hoặc liền dưới.
  async function move(dir: -1 | 1) {
    if (!current) return;
    const idx = rows.findIndex((r) => r.id === current.id);
    const other = rows[idx + dir];
    if (!other) return;
    setBusy(true);
    const [a, b] = await Promise.all([
      supabase.from("about_milestones").update({ position: other.position }).eq("id", current.id).select("id"),
      supabase.from("about_milestones").update({ position: current.position }).eq("id", other.id).select("id"),
    ]);
    setBusy(false);
    if (a.error || b.error) return setMsg({ ok: false, text: (a.error ?? b.error)!.message });
    load();
  }

  async function saveMission() {
    setBusy(true);
    setMsg(null);
    for (const r of mission) {
      const { error } = await supabase.from("about_mission").update({ vi: r.vi, en: r.en }).eq("id", r.id);
      if (error) {
        setBusy(false);
        return setMsg({ ok: false, text: error.message });
      }
    }
    setBusy(false);
    setMsg({ ok: true, text: "Đã lưu phần Sứ mệnh." });
  }

  async function addMission() {
    const position = mission.length ? Math.max(...mission.map((m) => m.position)) + 1 : 1;
    const { error } = await supabase.from("about_mission").insert({ position, vi: "", en: "" });
    if (error) return setMsg({ ok: false, text: error.message });
    load();
  }

  async function removeMission(id: string) {
    const { error } = await supabase.from("about_mission").delete().eq("id", id);
    if (error) return setMsg({ ok: false, text: error.message });
    load();
  }

  const d = current?.data;

  return (
    <section className="space-y-8">
      {msg && <p className={`text-sm ${msg.ok ? "text-emerald-600" : "text-rose-600"}`}>{msg.text}</p>}

      {rows.length === 0 && (
        <div className="rounded-xl border border-dashed border-sky-400 p-5 text-sm">
          <p className="text-slate-700 dark:text-slate-300">Trang About chưa có nội dung trong database. Nạp nội dung mặc định để bắt đầu sửa.</p>
          <button type="button" disabled={busy} onClick={seedDefaults} className="mt-3 rounded-xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700 disabled:opacity-60">
            Nạp nội dung mặc định
          </button>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-2">
          <button type="button" disabled={busy} onClick={addMilestone} className="w-full rounded-xl border border-dashed border-sky-400 py-2 text-sm font-semibold text-sky-700 hover:bg-sky-50 dark:text-sky-300 dark:hover:bg-slate-800">
            + Thêm mốc
          </button>
          {rows.map((r, i) => (
            <button
              key={r.id}
              type="button"
              onClick={() => setSel(r.id)}
              className={`block w-full rounded-xl border p-3 text-left text-sm transition ${sel === r.id ? "border-sky-500 bg-sky-50 dark:bg-slate-800" : "border-slate-200 bg-white hover:border-sky-300 dark:border-slate-800 dark:bg-slate-900"}`}
            >
              <span className="mr-2 font-mono text-xs text-slate-500">{i + 1}</span>
              <span className="font-semibold text-slate-900 dark:text-white">{r.data.title.vi || "(chưa đặt tên)"}</span>
              <span className="block text-xs text-slate-500">{r.data.period.vi}{r.data.detail ? "" : " · không có chi tiết"}</span>
            </button>
          ))}
        </div>

        <div className="space-y-5 lg:col-span-2">
          {!current || !d && <p className="text-sm text-slate-500">Chọn một mốc bên trái để sửa.</p>}
          {current && d && (
            <div className="space-y-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex flex-wrap gap-2">
                <button type="button" className={BTN} disabled={busy} onClick={() => move(-1)}>
                  ↑ Lên
                </button>
                <button type="button" className={BTN} disabled={busy} onClick={() => move(1)}>
                  ↓ Xuống
                </button>
                <button type="button" className={`${BTN} text-rose-600`} disabled={busy} onClick={removeMilestone}>
                  Xóa mốc
                </button>
              </div>

              <Bilingual label="Thời gian" value={d.period} onChange={(v) => patch({ ...d, period: v })} />
              <Bilingual label="Tiêu đề" value={d.title} onChange={(v) => patch({ ...d, title: v })} />
              <Bilingual label="Dòng phụ (vai trò)" value={d.sub} onChange={(v) => patch({ ...d, sub: v })} />
              <Bilingual label="Mô tả ngắn" value={d.short} onChange={(v) => patch({ ...d, short: v })} rows={2} />

              <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                <input
                  type="checkbox"
                  checked={Boolean(d.detail)}
                  onChange={(e) => patch({ ...d, detail: e.target.checked ? emptyDetail() : undefined })}
                  className="h-4 w-4 accent-sky-600"
                />
                Có trang chi tiết (thẻ bấm được)
              </label>

              {d.detail && (
                <div className="space-y-5 border-t border-slate-200 pt-5 dark:border-slate-800">
                  <Bilingual label="Tổng quan" value={d.detail.overview} onChange={(v) => patch({ ...d, detail: { ...d.detail!, overview: v } })} rows={3} />
                  <Bilingual label="Tiêu đề phần công việc" value={d.detail.workTitle} onChange={(v) => patch({ ...d, detail: { ...d.detail!, workTitle: v } })} />

                  <div className="grid gap-3 sm:grid-cols-2">
                    <Text label="Công việc (VI, mỗi dòng một mục)" rows={5} value={biToVi(d.detail.work)} onChange={(v) => patch({ ...d, detail: { ...d.detail!, work: linesToBi(v, biToEn(d.detail!.work)) } })} />
                    <Text label="Công việc (EN, cùng số dòng)" rows={5} value={biToEn(d.detail.work)} onChange={(v) => patch({ ...d, detail: { ...d.detail!, work: linesToBi(biToVi(d.detail!.work), v) } })} />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Dự án chính</span>
                      <button
                        type="button"
                        className={BTN}
                        onClick={() => patch({ ...d, detail: { ...d.detail!, projects: [...(d.detail!.projects ?? []), { name: { vi: "", en: "" }, points: [] }] } })}
                      >
                        + Thêm dự án
                      </button>
                    </div>
                    {(d.detail.projects ?? []).map((p, pi) => (
                      <div key={pi} className="space-y-3 rounded-xl border border-slate-200 p-4 dark:border-slate-800">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex-1">
                            <Bilingual label="Tên dự án" value={p.name} onChange={(v) => {
                              const projects = [...d.detail!.projects!];
                              projects[pi] = { ...p, name: v };
                              patch({ ...d, detail: { ...d.detail!, projects } });
                            }} />
                          </div>
                          <button type="button" className={`${BTN} text-rose-600`} onClick={() => patch({ ...d, detail: { ...d.detail!, projects: d.detail!.projects!.filter((_, j) => j !== pi) } })}>
                            Xóa
                          </button>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2">
                          <Text label="Các ý (VI, mỗi dòng một ý)" rows={3} value={biToVi(p.points)} onChange={(v) => {
                            const projects = [...d.detail!.projects!];
                            projects[pi] = { ...p, points: linesToBi(v, biToEn(p.points)) };
                            patch({ ...d, detail: { ...d.detail!, projects } });
                          }} />
                          <Text label="Các ý (EN, cùng số dòng)" rows={3} value={biToEn(p.points)} onChange={(v) => {
                            const projects = [...d.detail!.projects!];
                            projects[pi] = { ...p, points: linesToBi(biToVi(p.points), v) };
                            patch({ ...d, detail: { ...d.detail!, projects } });
                          }} />
                        </div>
                      </div>
                    ))}
                  </div>

                  <Text
                    label="Kỹ năng & công cụ (ngăn cách bằng dấu phẩy)"
                    value={d.detail.skills.join(", ")}
                    onChange={(v) => patch({ ...d, detail: { ...d.detail!, skills: v.split(",").map((s) => s.trim()).filter(Boolean) } })}
                  />
                  <Bilingual label="Điều rút ra" value={d.detail.learning} onChange={(v) => patch({ ...d, detail: { ...d.detail!, learning: v } })} rows={3} />
                </div>
              )}

              <button type="button" disabled={busy} onClick={saveMilestone} className="rounded-xl bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-700 disabled:opacity-60">
                {busy ? "Đang lưu…" : "Lưu mốc"}
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-slate-900 dark:text-white">Sứ mệnh (mỗi đoạn là một mục)</h3>
          <button type="button" className={BTN} onClick={addMission}>
            + Thêm đoạn
          </button>
        </div>
        {mission.map((m, i) => (
          <div key={m.id} className="space-y-2 border-t border-slate-200 pt-3 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500">Đoạn {i + 1}</span>
              <button type="button" className={`${BTN} text-rose-600`} onClick={() => removeMission(m.id)}>
                Xóa
              </button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Text label="Tiếng Việt" rows={3} value={m.vi} onChange={(v) => setMission(mission.map((x) => (x.id === m.id ? { ...x, vi: v } : x)))} />
              <Text label="English" rows={3} value={m.en} onChange={(v) => setMission(mission.map((x) => (x.id === m.id ? { ...x, en: v } : x)))} />
            </div>
          </div>
        ))}
        <button type="button" disabled={busy} onClick={saveMission} className="rounded-xl bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-700 disabled:opacity-60">
          Lưu phần Sứ mệnh
        </button>
      </div>
    </section>
  );
}
