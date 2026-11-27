"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";
import { PageHeader, Section } from "@/components/ui";

/* Trang quản trị nội dung: chỉ tài khoản có is_admin = true mới sửa được (RLS trong migration_013 kiểm tra lại ở database). */

type Lang = "vi" | "en";
type Tab = "articles" | "projects";

type ArticleRow = {
  id: string;
  slug: string;
  status: "Draft" | "Published";
  difficulty: string | null;
  content_translations: { language_code: Lang; title: string; summary: string | null; sections: unknown }[];
};

type ProjectRow = {
  id: string;
  slug: string;
  status: "Draft" | "Published";
  project_translations: {
    language_code: Lang;
    title: string;
    summary: string | null;
    business_problem: string | null;
    data_structure: string | null;
    solution: string | null;
    dashboard: string | null;
    business_value: string | null;
  }[];
};

const PROJECT_FIELDS = [
  { key: "title", label: "Tiêu đề" },
  { key: "summary", label: "Tóm tắt" },
  { key: "business_problem", label: "Bài toán kinh doanh" },
  { key: "data_structure", label: "Cấu trúc dữ liệu" },
  { key: "solution", label: "Giải pháp" },
  { key: "dashboard", label: "Dashboard" },
  { key: "business_value", label: "Giá trị kinh doanh" },
] as const;

export default function AdminView() {
  const [supabase] = useState(() => createSupabaseBrowserClient());
  const [status, setStatus] = useState<"loading" | "signed-out" | "forbidden" | "ready">("loading");
  const [tab, setTab] = useState<Tab>("articles");
  const [articles, setArticles] = useState<ArticleRow[]>([]);
  const [projects, setProjects] = useState<ProjectRow[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);
  const [saving, setSaving] = useState(false);

  // Form bài viết và dự án đang sửa. Giữ dạng chuỗi để người dùng gõ tự do; phần JSON được kiểm tra khi lưu.
  const [artForm, setArtForm] = useState<{ status: string; difficulty: string; vi: { title: string; summary: string; sections: string }; en: { title: string; summary: string; sections: string } } | null>(null);
  const [projForm, setProjForm] = useState<{ status: string; vi: Record<string, string>; en: Record<string, string> } | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      const { data: auth } = await supabase.auth.getUser();
      if (!alive) return;
      if (!auth.user) {
        setStatus("signed-out");
        return;
      }
      const { data: profile } = await supabase.from("profiles").select("is_admin").eq("id", auth.user.id).maybeSingle();
      if (!alive) return;
      if (!profile?.is_admin) {
        setStatus("forbidden");
        return;
      }
      await reload();
      if (alive) setStatus("ready");
    })();
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supabase]);

  async function reload() {
    const [a, p] = await Promise.all([
      supabase.from("content_items").select("id, slug, status, difficulty, content_translations(language_code, title, summary, sections)").order("slug"),
      supabase
        .from("projects")
        .select("id, slug, status, project_translations(language_code, title, summary, business_problem, data_structure, solution, dashboard, business_value)")
        .order("slug"),
    ]);
    if (a.error) setMessage({ ok: false, text: `Không tải được bài viết: ${a.error.message}` });
    if (p.error) setMessage({ ok: false, text: `Không tải được dự án: ${p.error.message}` });
    setArticles((a.data ?? []) as unknown as ArticleRow[]);
    setProjects((p.data ?? []) as unknown as ProjectRow[]);
  }

  function openArticle(row: ArticleRow) {
    const pick = (lang: Lang) => {
      const t = row.content_translations.find((x) => x.language_code === lang);
      return { title: t?.title ?? "", summary: t?.summary ?? "", sections: t?.sections ? JSON.stringify(t.sections, null, 2) : "" };
    };
    setArtForm({ status: row.status, difficulty: row.difficulty ?? "", vi: pick("vi"), en: pick("en") });
    setProjForm(null);
    setEditing(row.id);
    setMessage(null);
  }

  function openProject(row: ProjectRow) {
    const pick = (lang: Lang) => {
      const t = row.project_translations.find((x) => x.language_code === lang);
      const out: Record<string, string> = {};
      for (const f of PROJECT_FIELDS) out[f.key] = (t?.[f.key] as string | null | undefined) ?? "";
      return out;
    };
    setProjForm({ status: row.status, vi: pick("vi"), en: pick("en") });
    setArtForm(null);
    setEditing(row.id);
    setMessage(null);
  }

  /* Lưu bài viết: cập nhật trạng thái, độ khó và hai bản dịch. Kiểm tra JSON trước khi gửi. */
  async function saveArticle(id: string) {
    if (!artForm) return;
    let sVi: unknown;
    let sEn: unknown;
    try {
      sVi = artForm.vi.sections.trim() ? JSON.parse(artForm.vi.sections) : null;
      sEn = artForm.en.sections.trim() ? JSON.parse(artForm.en.sections) : null;
    } catch {
      setMessage({ ok: false, text: "Phần nội dung (sections) không đúng định dạng JSON. Kiểm tra dấu ngoặc và dấu phẩy." });
      return;
    }
    setSaving(true);
    setMessage(null);
    const { data: upd, error: e1 } = await supabase
      .from("content_items")
      .update({ status: artForm.status, difficulty: artForm.difficulty || null, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select("id");
    if (e1 || !upd?.length) {
      setSaving(false);
      setMessage({ ok: false, text: e1 ? e1.message : "Không lưu được: không có quyền sửa bài này." });
      return;
    }
    for (const [lang, f, sections] of [
      ["vi", artForm.vi, sVi],
      ["en", artForm.en, sEn],
    ] as const) {
      const { error } = await supabase
        .from("content_translations")
        .update({ title: f.title, summary: f.summary || null, sections })
        .eq("content_id", id)
        .eq("language_code", lang);
      if (error) {
        setSaving(false);
        setMessage({ ok: false, text: `Lỗi khi lưu bản ${lang}: ${error.message}` });
        return;
      }
    }
    setSaving(false);
    setMessage({ ok: true, text: "Đã lưu bài viết." });
    await reload();
  }

  /* Lưu dự án: trạng thái và các trường mô tả của hai ngôn ngữ. */
  async function saveProject(id: string) {
    if (!projForm) return;
    setSaving(true);
    setMessage(null);
    const { data: upd, error: e1 } = await supabase.from("projects").update({ status: projForm.status }).eq("id", id).select("id");
    if (e1 || !upd?.length) {
      setSaving(false);
      setMessage({ ok: false, text: e1 ? e1.message : "Không lưu được: không có quyền sửa dự án này." });
      return;
    }
    for (const lang of ["vi", "en"] as const) {
      const f = projForm[lang];
      const payload: Record<string, string | null> = {};
      for (const k of PROJECT_FIELDS) payload[k.key] = f[k.key] || null;
      const { error } = await supabase.from("project_translations").update(payload).eq("project_id", id).eq("language_code", lang);
      if (error) {
        setSaving(false);
        setMessage({ ok: false, text: `Lỗi khi lưu bản ${lang}: ${error.message}` });
        return;
      }
    }
    setSaving(false);
    setMessage({ ok: true, text: "Đã lưu dự án." });
    await reload();
  }

  if (status === "loading") return <p className="text-sm text-slate-500">Đang tải…</p>;

  if (status === "signed-out") {
    return (
      <p className="text-sm text-slate-600 dark:text-slate-400">
        Đăng nhập để vào trang quản trị.{" "}
        <Link href="/login" className="font-semibold text-sky-600 hover:underline dark:text-sky-400">
          Đăng nhập
        </Link>
      </p>
    );
  }

  if (status === "forbidden") {
    return <p className="text-sm text-rose-600">Tài khoản này không có quyền quản trị.</p>;
  }

  const inputCls = "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-sky-500 focus:outline-none dark:border-slate-700 dark:bg-slate-950";

  return (
    <>
      <PageHeader eyebrow="Admin" title="Quản trị nội dung" description="Sửa bài viết và dự án. Bấm Lưu để cập nhật trực tiếp trên Supabase." />

      <div className="mb-6 flex gap-2">
        {(["articles", "projects"] as Tab[]).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => {
              setTab(t);
              setEditing(null);
              setMessage(null);
            }}
            className={`rounded-xl px-4 py-2 text-sm font-semibold ${tab === t ? "bg-sky-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"}`}
          >
            {t === "articles" ? `Bài viết (${articles.length})` : `Dự án (${projects.length})`}
          </button>
        ))}
      </div>

      {message && <p className={`mb-4 text-sm ${message.ok ? "text-emerald-600" : "text-rose-600"}`}>{message.text}</p>}

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-2 lg:col-span-1">
          {tab === "articles" &&
            articles.map((a) => (
              <button
                key={a.id}
                type="button"
                onClick={() => openArticle(a)}
                className={`block w-full rounded-xl border p-3 text-left text-sm transition ${editing === a.id ? "border-sky-500 bg-sky-50 dark:bg-slate-800" : "border-slate-200 bg-white hover:border-sky-300 dark:border-slate-800 dark:bg-slate-900"}`}
              >
                <span className="block font-semibold text-slate-900 dark:text-white">{a.content_translations.find((t) => t.language_code === "vi")?.title ?? a.slug}</span>
                <span className="text-xs text-slate-500">
                  {a.slug} · {a.status}
                </span>
              </button>
            ))}
          {tab === "projects" &&
            projects.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => openProject(p)}
                className={`block w-full rounded-xl border p-3 text-left text-sm transition ${editing === p.id ? "border-sky-500 bg-sky-50 dark:bg-slate-800" : "border-slate-200 bg-white hover:border-sky-300 dark:border-slate-800 dark:bg-slate-900"}`}
              >
                <span className="block font-semibold text-slate-900 dark:text-white">{p.project_translations.find((t) => t.language_code === "vi")?.title ?? p.slug}</span>
                <span className="text-xs text-slate-500">
                  {p.slug} · {p.status}
                </span>
              </button>
            ))}
        </div>

        <div className="lg:col-span-2">
          {!editing && <p className="text-sm text-slate-500">Chọn một mục bên trái để sửa.</p>}

          {editing && artForm && (
            <Section title="Sửa bài viết">
              <div className="space-y-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block text-sm">
                    <span className="mb-1 block font-medium text-slate-700 dark:text-slate-300">Trạng thái</span>
                    <select className={inputCls} value={artForm.status} onChange={(e) => setArtForm({ ...artForm, status: e.target.value })}>
                      <option value="Draft">Nháp</option>
                      <option value="Published">Đã xuất bản</option>
                    </select>
                  </label>
                  <label className="block text-sm">
                    <span className="mb-1 block font-medium text-slate-700 dark:text-slate-300">Độ khó</span>
                    <select className={inputCls} value={artForm.difficulty} onChange={(e) => setArtForm({ ...artForm, difficulty: e.target.value })}>
                      <option value="">—</option>
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </label>
                </div>

                {(["vi", "en"] as const).map((lang) => (
                  <div key={lang} className="space-y-3 border-t border-slate-200 pt-4 dark:border-slate-800">
                    <p className="text-sm font-bold uppercase text-sky-700 dark:text-sky-400">{lang === "vi" ? "Tiếng Việt" : "English"}</p>
                    <label className="block text-sm">
                      <span className="mb-1 block font-medium text-slate-700 dark:text-slate-300">Tiêu đề</span>
                      <input className={inputCls} value={artForm[lang].title} onChange={(e) => setArtForm({ ...artForm, [lang]: { ...artForm[lang], title: e.target.value } })} />
                    </label>
                    <label className="block text-sm">
                      <span className="mb-1 block font-medium text-slate-700 dark:text-slate-300">Tóm tắt</span>
                      <textarea rows={2} className={inputCls} value={artForm[lang].summary} onChange={(e) => setArtForm({ ...artForm, [lang]: { ...artForm[lang], summary: e.target.value } })} />
                    </label>
                    <label className="block text-sm">
                      <span className="mb-1 block font-medium text-slate-700 dark:text-slate-300">Nội dung (sections, định dạng JSON)</span>
                      <textarea
                        rows={12}
                        spellCheck={false}
                        className={`${inputCls} font-mono text-xs`}
                        value={artForm[lang].sections}
                        onChange={(e) => setArtForm({ ...artForm, [lang]: { ...artForm[lang], sections: e.target.value } })}
                      />
                    </label>
                  </div>
                ))}

                <button
                  type="button"
                  disabled={saving}
                  onClick={() => saveArticle(editing)}
                  className="rounded-xl bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-700 disabled:opacity-60"
                >
                  {saving ? "Đang lưu…" : "Lưu"}
                </button>
              </div>
            </Section>
          )}

          {editing && projForm && (
            <Section title="Sửa dự án">
              <div className="space-y-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <label className="block text-sm sm:w-1/2">
                  <span className="mb-1 block font-medium text-slate-700 dark:text-slate-300">Trạng thái</span>
                  <select className={inputCls} value={projForm.status} onChange={(e) => setProjForm({ ...projForm, status: e.target.value })}>
                    <option value="Draft">Nháp</option>
                    <option value="Published">Đã xuất bản</option>
                  </select>
                </label>

                {(["vi", "en"] as const).map((lang) => (
                  <div key={lang} className="space-y-3 border-t border-slate-200 pt-4 dark:border-slate-800">
                    <p className="text-sm font-bold uppercase text-sky-700 dark:text-sky-400">{lang === "vi" ? "Tiếng Việt" : "English"}</p>
                    {PROJECT_FIELDS.map((f) => (
                      <label key={f.key} className="block text-sm">
                        <span className="mb-1 block font-medium text-slate-700 dark:text-slate-300">{f.label}</span>
                        <textarea
                          rows={f.key === "title" ? 1 : 3}
                          className={inputCls}
                          value={projForm[lang][f.key]}
                          onChange={(e) => setProjForm({ ...projForm, [lang]: { ...projForm[lang], [f.key]: e.target.value } })}
                        />
                      </label>
                    ))}
                  </div>
                ))}

                <button
                  type="button"
                  disabled={saving}
                  onClick={() => saveProject(editing)}
                  className="rounded-xl bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-700 disabled:opacity-60"
                >
                  {saving ? "Đang lưu…" : "Lưu"}
                </button>
              </div>
            </Section>
          )}
        </div>
      </div>
    </>
  );
}
