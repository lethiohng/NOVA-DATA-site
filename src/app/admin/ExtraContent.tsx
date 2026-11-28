"use client";

import { useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";

/* Hai mục admin thêm mới: bước Career và bài tập SQL (Luyện tập). Quyền ghi được RLS kiểm tra ở database (migration_019). */

const inputCls = "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-sky-500 focus:outline-none dark:border-slate-700 dark:bg-slate-950";

function Input({ label, value, onChange, multiline = false, rows = 3, mono = false, type = "text" }: { label: string; value: string | number; onChange: (v: string) => void; multiline?: boolean; rows?: number; mono?: boolean; type?: string }) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block font-medium text-slate-700 dark:text-slate-300">{label}</span>
      {multiline ? (
        <textarea rows={rows} value={String(value)} onChange={(e) => onChange(e.target.value)} spellCheck={!mono} className={`${inputCls} ${mono ? "font-mono text-xs" : ""}`} />
      ) : (
        <input type={type} value={String(value)} onChange={(e) => onChange(e.target.value)} className={inputCls} />
      )}
    </label>
  );
}

function Msg({ m }: { m: { ok: boolean; text: string } | null }) {
  if (!m) return null;
  return <p className={`text-sm ${m.ok ? "text-emerald-600" : "text-rose-600"}`}>{m.text}</p>;
}

const BTN_PRI = "rounded-xl bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-700 disabled:opacity-60";
const BTN_DEL = "rounded-xl border border-rose-300 px-5 py-2.5 text-sm font-semibold text-rose-600 hover:bg-rose-50 disabled:opacity-60 dark:border-rose-800 dark:hover:bg-slate-800";

/* ---------------- Career ---------------- */

type Step = { id: string; position: number; text_vi: string; text_en: string };

export function CareerEditor() {
  const [supabase] = useState(() => createSupabaseBrowserClient());
  const [steps, setSteps] = useState<Step[]>([]);
  const [sel, setSel] = useState<string | "new" | null>(null);
  const [form, setForm] = useState({ position: 1, text_vi: "", text_en: "" });
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  async function load() {
    const { data, error } = await supabase.from("career_steps").select("id, position, text_vi, text_en").order("position");
    if (error) return setMsg({ ok: false, text: `Không tải được bước nghề nghiệp: ${error.message}` });
    setSteps((data ?? []) as Step[]);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supabase]);

  function pick(s: Step) {
    setSel(s.id);
    setForm({ position: s.position, text_vi: s.text_vi, text_en: s.text_en });
    setMsg(null);
  }

  function startNew() {
    const next = steps.length ? Math.max(...steps.map((s) => s.position)) + 1 : 1;
    setSel("new");
    setForm({ position: next, text_vi: "", text_en: "" });
    setMsg(null);
  }

  async function save() {
    if (!form.text_vi.trim() || !form.text_en.trim()) return setMsg({ ok: false, text: "Nhập nội dung cả tiếng Việt và tiếng Anh." });
    setBusy(true);
    setMsg(null);
    const payload = { position: Number(form.position), text_vi: form.text_vi.trim(), text_en: form.text_en.trim() };
    const res =
      sel === "new"
        ? await supabase.from("career_steps").insert(payload).select("id")
        : await supabase.from("career_steps").update(payload).eq("id", sel as string).select("id");
    setBusy(false);
    if (res.error || !res.data?.length) return setMsg({ ok: false, text: res.error ? res.error.message : "Không lưu được: không có quyền sửa." });
    setMsg({ ok: true, text: "Đã lưu bước nghề nghiệp." });
    setSel(res.data[0].id);
    load();
  }

  async function remove() {
    if (sel === "new" || !sel) return;
    if (!window.confirm("Xóa bước này?")) return;
    setBusy(true);
    const { data, error } = await supabase.from("career_steps").delete().eq("id", sel).select("id");
    setBusy(false);
    if (error || !data?.length) return setMsg({ ok: false, text: error ? error.message : "Không xóa được: không có quyền." });
    setSel(null);
    setMsg({ ok: true, text: "Đã xóa bước." });
    load();
  }

  return (
    <section className="grid gap-6 lg:grid-cols-3">
      <div className="space-y-2">
        <button type="button" onClick={startNew} className="w-full rounded-xl border border-dashed border-sky-400 py-2 text-sm font-semibold text-sky-700 hover:bg-sky-50 dark:text-sky-300 dark:hover:bg-slate-800">
          + Thêm bước mới
        </button>
        {steps.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => pick(s)}
            className={`block w-full rounded-xl border p-3 text-left text-sm transition ${sel === s.id ? "border-sky-500 bg-sky-50 dark:bg-slate-800" : "border-slate-200 bg-white hover:border-sky-300 dark:border-slate-800 dark:bg-slate-900"}`}
          >
            <span className="mr-2 font-mono text-xs text-slate-500">{s.position}</span>
            <span className="text-slate-900 dark:text-white">{s.text_vi}</span>
          </button>
        ))}
      </div>

      <div className="lg:col-span-2">
        {!sel && <p className="text-sm text-slate-500">Chọn một bước bên trái, hoặc bấm “Thêm bước mới”.</p>}
        {sel && (
          <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h3 className="font-semibold text-slate-900 dark:text-white">{sel === "new" ? "Bước mới" : `Bước ${form.position}`}</h3>
            <Input label="Thứ tự (số nhỏ hiện trước)" type="number" value={form.position} onChange={(v) => setForm({ ...form, position: Number(v) })} />
            <Input label="Nội dung (tiếng Việt)" value={form.text_vi} onChange={(v) => setForm({ ...form, text_vi: v })} multiline rows={3} />
            <Input label="Nội dung (tiếng Anh)" value={form.text_en} onChange={(v) => setForm({ ...form, text_en: v })} multiline rows={3} />
            <Msg m={msg} />
            <div className="flex flex-wrap gap-2">
              <button type="button" disabled={busy} onClick={save} className={BTN_PRI}>
                {busy ? "Đang lưu…" : "Lưu"}
              </button>
              {sel !== "new" && (
                <button type="button" disabled={busy} onClick={remove} className={BTN_DEL}>
                  Xóa bước
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* ---------------- Bài tập SQL (Luyện tập) ---------------- */

type Exercise = {
  id: string;
  level: string | null;
  topic: string | null;
  title_vi: string | null;
  title_en: string | null;
  question: string;
  question_en: string | null;
  solution: string | null;
  explanation: string | null;
  explanation_en: string | null;
  position: number;
};

const emptyEx = { level: "Beginner", topic: "", title_vi: "", title_en: "", question: "", question_en: "", solution: "", explanation: "", explanation_en: "", position: 1 };

export function PracticeEditor() {
  const [supabase] = useState(() => createSupabaseBrowserClient());
  const [list, setList] = useState<Exercise[]>([]);
  const [sel, setSel] = useState<string | "new" | null>(null);
  const [form, setForm] = useState({ ...emptyEx });
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  async function load() {
    const { data, error } = await supabase
      .from("exercises")
      .select("id, level, topic, title_vi, title_en, question, question_en, solution, explanation, explanation_en, position")
      .eq("exercise_type", "SQL")
      .order("position");
    if (error) return setMsg({ ok: false, text: `Không tải được bài tập: ${error.message}` });
    setList((data ?? []) as Exercise[]);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supabase]);

  function pick(e: Exercise) {
    setSel(e.id);
    setForm({
      level: e.level ?? "Beginner",
      topic: e.topic ?? "",
      title_vi: e.title_vi ?? "",
      title_en: e.title_en ?? "",
      question: e.question ?? "",
      question_en: e.question_en ?? "",
      solution: e.solution ?? "",
      explanation: e.explanation ?? "",
      explanation_en: e.explanation_en ?? "",
      position: e.position,
    });
    setMsg(null);
  }

  function startNew() {
    const next = list.length ? Math.max(...list.map((e) => e.position)) + 1 : 1;
    setSel("new");
    setForm({ ...emptyEx, position: next });
    setMsg(null);
  }

  async function save() {
    if (!form.title_vi.trim() || !form.question.trim()) return setMsg({ ok: false, text: "Nhập tên bài và đề bài tiếng Việt." });
    setBusy(true);
    setMsg(null);
    const payload = {
      exercise_type: "SQL",
      level: form.level,
      topic: form.topic.trim() || null,
      title_vi: form.title_vi.trim(),
      title_en: form.title_en.trim() || null,
      question: form.question.trim(),
      question_en: form.question_en.trim() || null,
      solution: form.solution.trim() || null,
      explanation: form.explanation.trim() || null,
      explanation_en: form.explanation_en.trim() || null,
      position: Number(form.position),
    };
    const res =
      sel === "new"
        ? await supabase.from("exercises").insert(payload).select("id")
        : await supabase.from("exercises").update(payload).eq("id", sel as string).select("id");
    setBusy(false);
    if (res.error || !res.data?.length) return setMsg({ ok: false, text: res.error ? res.error.message : "Không lưu được: không có quyền sửa." });
    setMsg({ ok: true, text: "Đã lưu bài tập." });
    setSel(res.data[0].id);
    load();
  }

  async function remove() {
    if (sel === "new" || !sel) return;
    if (!window.confirm("Xóa bài tập này?")) return;
    setBusy(true);
    const { data, error } = await supabase.from("exercises").delete().eq("id", sel).select("id");
    setBusy(false);
    if (error || !data?.length) return setMsg({ ok: false, text: error ? error.message : "Không xóa được: không có quyền." });
    setSel(null);
    setMsg({ ok: true, text: "Đã xóa bài tập." });
    load();
  }

  const set = (k: keyof typeof form) => (v: string) => setForm({ ...form, [k]: v });

  return (
    <section className="grid gap-6 lg:grid-cols-3">
      <div className="space-y-2">
        <button type="button" onClick={startNew} className="w-full rounded-xl border border-dashed border-sky-400 py-2 text-sm font-semibold text-sky-700 hover:bg-sky-50 dark:text-sky-300 dark:hover:bg-slate-800">
          + Thêm bài tập mới
        </button>
        {list.map((e) => (
          <button
            key={e.id}
            type="button"
            onClick={() => pick(e)}
            className={`block w-full rounded-xl border p-3 text-left text-sm transition ${sel === e.id ? "border-sky-500 bg-sky-50 dark:bg-slate-800" : "border-slate-200 bg-white hover:border-sky-300 dark:border-slate-800 dark:bg-slate-900"}`}
          >
            <span className="mr-2 font-mono text-xs text-slate-500">#{e.position}</span>
            <span className="text-slate-900 dark:text-white">{e.title_vi ?? "(không tên)"}</span>
            <span className="block text-xs text-slate-500">{e.level}</span>
          </button>
        ))}
      </div>

      <div className="lg:col-span-2">
        {!sel && <p className="text-sm text-slate-500">Chọn một bài tập bên trái, hoặc bấm “Thêm bài tập mới”.</p>}
        {sel && (
          <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="grid gap-4 sm:grid-cols-3">
              <label className="block text-sm">
                <span className="mb-1 block font-medium text-slate-700 dark:text-slate-300">Cấp độ</span>
                <select value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value })} className={inputCls}>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </label>
              <Input label="Chủ đề" value={form.topic} onChange={set("topic")} />
              <Input label="Thứ tự" type="number" value={form.position} onChange={(v) => setForm({ ...form, position: Number(v) })} />
            </div>
            <Input label="Tên bài (tiếng Việt)" value={form.title_vi} onChange={set("title_vi")} />
            <Input label="Tên bài (tiếng Anh)" value={form.title_en} onChange={set("title_en")} />
            <Input label="Đề bài (tiếng Việt)" value={form.question} onChange={set("question")} multiline rows={4} />
            <Input label="Đề bài (tiếng Anh)" value={form.question_en} onChange={set("question_en")} multiline rows={4} />
            <Input label="Đáp án SQL" value={form.solution} onChange={set("solution")} multiline rows={5} mono />
            <Input label="Giải thích (tiếng Việt, không bắt buộc)" value={form.explanation} onChange={set("explanation")} multiline rows={3} />
            <Input label="Giải thích (tiếng Anh, không bắt buộc)" value={form.explanation_en} onChange={set("explanation_en")} multiline rows={3} />
            <Msg m={msg} />
            <div className="flex flex-wrap gap-2">
              <button type="button" disabled={busy} onClick={save} className={BTN_PRI}>
                {busy ? "Đang lưu…" : "Lưu"}
              </button>
              {sel !== "new" && (
                <button type="button" disabled={busy} onClick={remove} className={BTN_DEL}>
                  Xóa bài
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
