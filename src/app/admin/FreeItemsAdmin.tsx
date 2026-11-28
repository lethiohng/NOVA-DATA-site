"use client";

import { useEffect, useMemo, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";
import { BASIC_LESSONS, lessonNumber as basicNo } from "@/lib/sql-basic";
import { INTERMEDIATE_LESSONS, intermediateLessonNumber } from "@/lib/sql-intermediate";
import { ADVANCED_LESSONS, advancedLessonNumber } from "@/lib/sql-advanced";

/* Admin chọn mục nào mở miễn phí cho tài khoản thường. Mục không được chọn sẽ khóa (trừ Pro hoặc người đã mua khóa). */

type ItemType = "lesson" | "article" | "exercise" | "project";
type Item = { type: ItemType; key: string; label: string; sub: string };
type Group = { title: string; items: Item[] };

const LESSON_COURSES: { key: string; title: string; list: { id: string; number: string; title: string }[] }[] = [
  { key: "sql-basic", title: "SQL Basic", list: BASIC_LESSONS.map((l) => ({ id: l.id, number: String(basicNo(l)), title: l.title })) },
  { key: "sql-intermediate", title: "SQL Intermediate", list: INTERMEDIATE_LESSONS.map((l) => ({ id: l.id, number: String(intermediateLessonNumber(l)), title: l.title })) },
  { key: "sql-advanced", title: "SQL Advanced", list: ADVANCED_LESSONS.map((l) => ({ id: l.id, number: String(advancedLessonNumber(l)), title: l.title })) },
];

export default function FreeItemsAdmin() {
  const [supabase] = useState(() => createSupabaseBrowserClient());
  const [groups, setGroups] = useState<Group[]>([]);
  const [free, setFree] = useState<Set<string>>(new Set()); // "type|key"
  const [q, setQ] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  async function load() {
    const [cats, arts, projs, exs, fr] = await Promise.all([
      supabase.from("categories").select("id, slug, category_translations(language_code, title)").neq("slug", "sql-database").order("slug"),
      supabase.from("content_items").select("id, slug, category_id, position, content_translations(language_code, title)").order("slug"),
      supabase.from("projects").select("slug, position, project_translations(language_code, title)").order("position"),
      supabase.from("exercises").select("id, title_vi, level, position").eq("exercise_type", "SQL").order("position"),
      supabase.from("free_items").select("item_type, item_key"),
    ]);
    const firstErr = cats.error ?? arts.error ?? projs.error ?? exs.error ?? fr.error;
    if (firstErr) return setMsg({ ok: false, text: `Không tải được dữ liệu: ${firstErr.message}` });

    const out: Group[] = [];
    for (const c of LESSON_COURSES) {
      out.push({
        title: `Bài ${c.title}`,
        items: c.list.map((l) => ({ type: "lesson" as ItemType, key: `${c.key}|${l.id}`, label: `${l.number}. ${l.title}`, sub: c.title })),
      });
    }
    const catName = new Map<string, string>();
    for (const c of (cats.data ?? []) as { id: string; category_translations: { language_code: string; title: string }[] }[]) {
      catName.set(c.id, c.category_translations.find((t) => t.language_code === "vi")?.title ?? "Khóa");
    }
    const byCat = new Map<string, Item[]>();
    for (const a of (arts.data ?? []) as { id: string; slug: string; category_id: string | null; content_translations: { language_code: string; title: string }[] }[]) {
      const k = a.category_id ?? "none";
      const title = a.content_translations.find((t) => t.language_code === "vi")?.title ?? a.slug;
      byCat.set(k, [...(byCat.get(k) ?? []), { type: "article", key: a.slug, label: title, sub: a.slug }]);
    }
    for (const [k, items] of byCat) {
      out.push({ title: `Kiến thức: ${k === "none" ? "Chưa thuộc khóa" : catName.get(k) ?? "Khóa"}`, items });
    }
    out.push({
      title: "Luyện tập SQL (bài tập)",
      items: ((exs.data ?? []) as { id: string; title_vi: string | null; level: string | null }[]).map((e) => ({
        type: "exercise" as ItemType,
        key: e.id,
        label: e.title_vi ?? "(không tên)",
        sub: e.level ?? "",
      })),
    });
    out.push({
      title: "Dự án",
      items: ((projs.data ?? []) as { slug: string; project_translations: { language_code: string; title: string }[] }[]).map((p) => ({
        type: "project" as ItemType,
        key: p.slug,
        label: p.project_translations.find((t) => t.language_code === "vi")?.title ?? p.slug,
        sub: p.slug,
      })),
    });

    setGroups(out);
    setFree(new Set(((fr.data ?? []) as { item_type: string; item_key: string }[]).map((r) => `${r.item_type}|${r.item_key}`)));
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supabase]);

  async function setItems(items: Item[], open: boolean) {
    const todo = items.filter((it) => free.has(`${it.type}|${it.key}`) !== open);
    if (!todo.length) return setMsg({ ok: true, text: "Không có gì thay đổi." });
    setBusy(true);
    setMsg(null);
    const res = open
      ? await supabase
          .from("free_items")
          .upsert(todo.map((it) => ({ item_type: it.type, item_key: it.key })), { onConflict: "item_type,item_key", ignoreDuplicates: true })
          .select("item_key")
      : await supabase.from("free_items").delete().in("item_type", [...new Set(todo.map((t) => t.type))]).in("item_key", todo.map((t) => t.key)).select("item_key");
    setBusy(false);
    if (res.error) return setMsg({ ok: false, text: res.error.message });
    const next = new Set(free);
    for (const it of todo) {
      if (open) next.add(`${it.type}|${it.key}`);
      else next.delete(`${it.type}|${it.key}`);
    }
    setFree(next);
    setMsg({ ok: true, text: `Đã ${open ? "mở miễn phí" : "khóa"} ${todo.length} mục.` });
  }

  async function toggle(it: Item) {
    await setItems([it], !free.has(`${it.type}|${it.key}`));
  }

  const term = q.trim().toLowerCase();
  const visibleGroups = useMemo(
    () =>
      groups
        .map((g) => ({ ...g, items: g.items.filter((it) => !term || it.label.toLowerCase().includes(term) || it.sub.toLowerCase().includes(term)) }))
        .filter((g) => g.items.length),
    [groups, term]
  );

  const inputCls = "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-sky-500 focus:outline-none dark:border-slate-700 dark:bg-slate-950";

  return (
    <section className="space-y-5">
      <p className="text-sm text-slate-600 dark:text-slate-400">
        Tick vào mục để mở miễn phí cho tài khoản thường. Mục không tick sẽ khóa 🔒. Pro và người đã mua khóa vẫn xem được tất cả.
      </p>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          disabled={busy}
          onClick={() => setItems(groups.flatMap((g) => g.items.slice(0, 5)), true)}
          className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-60"
        >
          Mở 5 mục đầu mỗi danh sách
        </button>
        <button
          type="button"
          disabled={busy}
          onClick={() => setItems(groups.flatMap((g) => g.items), false)}
          className="rounded-xl border border-rose-300 px-4 py-2 text-sm font-semibold text-rose-600 hover:bg-rose-50 disabled:opacity-60 dark:border-rose-800 dark:hover:bg-slate-800"
        >
          Khóa tất cả
        </button>
      </div>

      <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Tìm mục…" className={inputCls} />
      {msg && <p className={`text-sm ${msg.ok ? "text-emerald-600" : "text-rose-600"}`}>{msg.text}</p>}

      {visibleGroups.map((g) => (
        <details key={g.title} open={Boolean(term)} className="rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
          <summary className="cursor-pointer select-none px-4 py-3 text-sm font-semibold text-slate-800 dark:text-slate-200">
            {g.title}{" "}
            <span className="font-normal text-slate-500">
              ({g.items.filter((it) => free.has(`${it.type}|${it.key}`)).length}/{g.items.length} mở)
            </span>
          </summary>
          <ul className="divide-y divide-slate-100 px-4 dark:divide-slate-800">
            {g.items.map((it) => {
              const open = free.has(`${it.type}|${it.key}`);
              return (
                <li key={`${it.type}|${it.key}`} className="flex items-center justify-between gap-3 py-2 text-sm">
                  <span className="min-w-0">
                    <span className="block truncate text-slate-900 dark:text-white">{it.label}</span>
                    <span className="block truncate text-xs text-slate-500">{it.sub}</span>
                  </span>
                  <label className="flex shrink-0 items-center gap-2 text-xs font-semibold">
                    <input type="checkbox" checked={open} disabled={busy} onChange={() => toggle(it)} className="h-4 w-4 accent-emerald-600" />
                    <span className={open ? "text-emerald-700 dark:text-emerald-300" : "text-slate-500"}>{open ? "Miễn phí" : "🔒 Khóa"}</span>
                  </label>
                </li>
              );
            })}
          </ul>
        </details>
      ))}
    </section>
  );
}
