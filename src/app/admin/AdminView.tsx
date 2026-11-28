"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";
import { PageHeader, Section } from "@/components/ui";
import LessonVideos from "./LessonVideos";
import { CareerEditor, PracticeEditor } from "./ExtraContent";
import UsersAdmin from "./UsersAdmin";
import { youtubeId } from "@/lib/youtube";

/* Trang quản trị nội dung: chỉ tài khoản có is_admin = true mới sửa được (RLS trong migration_013 kiểm tra lại ở database). */

type Lang = "vi" | "en";
type Tab = "articles" | "projects" | "courses" | "career" | "practice" | "users";

/* Kiểm tra link YouTube nhập vào. Để trống thì lưu null (xóa video). */
function cleanYoutube(v: string): { value: string | null; error: string | null } {
  const s = v.trim();
  if (!s) return { value: null, error: null };
  if (!youtubeId(s)) return { value: null, error: "Link YouTube không hợp lệ. Dùng dạng youtube.com/watch?v=... hoặc youtu.be/..." };
  return { value: s, error: null };
}

/* Ô nhập link YouTube, dùng chung cho bài viết, dự án và khóa học. */
function YoutubeInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const bad = value.trim() !== "" && !youtubeId(value);
  return (
    <label className="block text-sm">
      <span className="mb-1 block font-medium text-slate-700 dark:text-slate-300">Link YouTube (không bắt buộc)</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="https://www.youtube.com/watch?v=..."
        className={`w-full rounded-lg border bg-white px-3 py-2 text-sm focus:border-sky-500 focus:outline-none dark:bg-slate-950 ${bad ? "border-rose-400" : "border-slate-300 dark:border-slate-700"}`}
      />
      {bad && <span className="mt-1 block text-xs text-rose-600">Link không hợp lệ.</span>}
    </label>
  );
}

// Khóa học theo chủ đề (danh mục) và các bài thuộc khóa đó.
type CourseRow = {
  id: string;
  slug: string;
  category_translations: { language_code: Lang; title: string; description: string | null }[];
  content_items: { id: string; slug: string; status: string }[];
  youtube_url: string | null;
};

type ArticleRow = {
  id: string;
  slug: string;
  status: "Draft" | "Published";
  difficulty: string | null;
  category_id: string | null;
  youtube_url: string | null;
  content_translations: { language_code: Lang; title: string; summary: string | null; sections: unknown }[];
};

type ProjectRow = {
  id: string;
  slug: string;
  status: "Draft" | "Published";
  youtube_url: string | null;
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

/* Nội dung một bài viết theo từng ngôn ngữ, dạng văn bản để gõ như trong Word.
   Mỗi đoạn cách nhau bằng một dòng trống. Danh sách mục tiêu: mỗi dòng một mục. */
type Draft = {
  overview: string;
  objectives: string;
  explanation: string;
  practicalExample: string;
  formula: { label: string; code: string }[];
  exercise: string;
  answer: string;
  extraSections: { title: string; body: string }[];
  relatedTopics: string; // chỉ dùng cho tiếng Việt, cách nhau bằng dấu phẩy
};

type LangForm = { title: string; summary: string; draft: Draft };

function emptyDraft(): Draft {
  return { overview: "", objectives: "", explanation: "", practicalExample: "", formula: [], exercise: "", answer: "", extraSections: [], relatedTopics: "" };
}

/* Chuyển cột sections (JSON trong database) sang dạng form. */
function toDraft(s: unknown): Draft {
  if (!s || typeof s !== "object") return emptyDraft();
  const o = s as Record<string, unknown>;
  const str = (v: unknown) => (typeof v === "string" ? v : "");
  const arr = (v: unknown) => (Array.isArray(v) ? v : []);
  return {
    overview: str(o.overview),
    objectives: arr(o.objectives).map((x) => String(x)).join("\n"),
    explanation: str(o.explanation),
    practicalExample: str(o.practicalExample),
    formula: arr(o.formula).map((f) => {
      const r = f as Record<string, unknown>;
      return { label: str(r.label), code: str(r.code) };
    }),
    exercise: str(o.exercise),
    answer: str(o.answer),
    extraSections: arr(o.extraSections).map((x) => {
      const r = x as Record<string, unknown>;
      return { title: str(r.title), body: str(r.body) };
    }),
    relatedTopics: arr(o.relatedTopics).map((x) => String(x)).join(", "),
  };
}

/* Chuyển form về đúng cấu trúc sections mà trang bài viết đọc. Bản tiếng Anh không có relatedTopics. */
function toSections(d: Draft, isVi: boolean): Record<string, unknown> {
  const out: Record<string, unknown> = {
    overview: d.overview.trim(),
    objectives: d.objectives.split("\n").map((s) => s.trim()).filter(Boolean),
    explanation: d.explanation.trim(),
    practicalExample: d.practicalExample.trim(),
    formula: d.formula.filter((f) => f.label.trim() || f.code.trim()),
    exercise: d.exercise.trim(),
  };
  if (d.answer.trim()) out.answer = d.answer.trim();
  const extra = d.extraSections.filter((x) => x.title.trim() || x.body.trim());
  if (extra.length) out.extraSections = extra;
  if (isVi) out.relatedTopics = d.relatedTopics.split(",").map((s) => s.trim()).filter(Boolean);
  return out;
}

const WORD_HINT = "Gõ như trong Word: mỗi đoạn cách nhau bằng một dòng trống. Dòng dạng ![mô tả](đường-dẫn-ảnh) sẽ hiện thành ảnh.";

const IMAGE_BUCKET = "content-images";
const MAX_IMAGE_MB = 5;

/* Tải ảnh lên kho ảnh trong Supabase và trả về đường dẫn công khai. */
async function uploadContentImage(file: File): Promise<string> {
  const supabase = createSupabaseBrowserClient();
  const safeName = file.name.toLowerCase().replace(/[^a-z0-9.-]+/g, "-");
  const path = `articles/${Date.now()}-${safeName}`;
  const { error } = await supabase.storage.from(IMAGE_BUCKET).upload(path, file, { contentType: file.type, upsert: false });
  if (error) throw new Error(error.message);
  return supabase.storage.from(IMAGE_BUCKET).getPublicUrl(path).data.publicUrl;
}

/* Nút chọn ảnh từ máy. Sau khi tải lên, chèn dòng ![mô tả](đường dẫn) vào cuối ô nhập. */
function ImageButton({ onInsert }: { onInsert: (markdown: string) => void }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pick = async (file: File) => {
    setError(null);
    if (!file.type.startsWith("image/")) return setError("Chỉ chọn file ảnh.");
    if (file.size > MAX_IMAGE_MB * 1024 * 1024) return setError(`Ảnh tối đa ${MAX_IMAGE_MB} MB.`);
    setBusy(true);
    try {
      const url = await uploadContentImage(file);
      const alt = file.name.replace(/\.[^.]+$/, "").replace(/[[\]()]/g, "");
      onInsert(`\n\n![${alt}](${url})\n\n`);
    } catch (e) {
      setError(`Không tải được ảnh: ${(e as Error).message}`);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mt-2 flex flex-wrap items-center gap-2">
      <label className={`${SMALL_BTN} cursor-pointer ${busy ? "pointer-events-none opacity-60" : ""}`}>
        {busy ? "Đang tải ảnh…" : "+ Chèn ảnh"}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          disabled={busy}
          onChange={(e) => {
            const f = e.target.files?.[0];
            e.target.value = ""; // cho phép chọn lại cùng một file
            if (f) void pick(f);
          }}
        />
      </label>
      {error && <span className="text-xs text-rose-600">{error}</span>}
    </div>
  );
}

/* Ô nhập nhiều dòng cho một phần nội dung. onImage: nếu có thì hiện nút chèn ảnh. */
function Field({ label, value, onChange, rows = 4, hint, mono = false, onImage }: { label: string; value: string; onChange: (v: string) => void; rows?: number; hint?: string; mono?: boolean; onImage?: (markdown: string) => void }) {
  return (
    <div className="block text-sm">
      <span className="mb-1 block font-medium text-slate-700 dark:text-slate-300">{label}</span>
      <textarea
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        spellCheck={!mono}
        className={`w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm leading-relaxed focus:border-sky-500 focus:outline-none dark:border-slate-700 dark:bg-slate-950 ${mono ? "font-mono text-xs" : ""}`}
      />
      {onImage && <ImageButton onInsert={(md) => onImage(md)} />}
      {hint && <span className="mt-1 block text-xs text-slate-500">{hint}</span>}
    </div>
  );
}

const SMALL_BTN = "rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800";

/* Form soạn nội dung một ngôn ngữ của bài viết. */
function DraftEditor({ d, onChange, isVi }: { d: Draft; onChange: (d: Draft) => void; isVi: boolean }) {
  const set = <K extends keyof Draft>(k: K, v: Draft[K]) => onChange({ ...d, [k]: v });
  return (
    <div className="space-y-5">
      <p className="rounded-lg bg-sky-50 px-3 py-2 text-xs text-sky-800 dark:bg-slate-800 dark:text-sky-300">{WORD_HINT}</p>

      <Field label={isVi ? "Tổng quan" : "Overview"} value={d.overview} onChange={(v) => set("overview", v)} rows={3} onImage={(md) => set("overview", d.overview + md)} />
      <Field label={isVi ? "Mục tiêu (mỗi dòng một mục)" : "Objectives (one per line)"} value={d.objectives} onChange={(v) => set("objectives", v)} rows={4} />
      <Field label={isVi ? "Giải thích" : "Explanation"} value={d.explanation} onChange={(v) => set("explanation", v)} rows={8} onImage={(md) => set("explanation", d.explanation + md)} />
      <Field label={isVi ? "Ví dụ thực tế" : "Practical example"} value={d.practicalExample} onChange={(v) => set("practicalExample", v)} rows={6} onImage={(md) => set("practicalExample", d.practicalExample + md)} />

      {/* Công thức: mỗi công thức gồm tên và nội dung */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{isVi ? "Công thức" : "Formulas"}</span>
          <button type="button" className={SMALL_BTN} onClick={() => set("formula", [...d.formula, { label: "", code: "" }])}>
            {isVi ? "+ Thêm công thức" : "+ Add formula"}
          </button>
        </div>
        {d.formula.map((f, i) => (
          <div key={i} className="space-y-2 rounded-xl border border-slate-200 p-3 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <input
                value={f.label}
                placeholder={isVi ? "Tên công thức" : "Formula name"}
                onChange={(e) => set("formula", d.formula.map((x, j) => (j === i ? { ...x, label: e.target.value } : x)))}
                className="flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950"
              />
              <button type="button" className={SMALL_BTN} onClick={() => set("formula", d.formula.filter((_, j) => j !== i))}>
                {isVi ? "Xóa" : "Remove"}
              </button>
            </div>
            <Field label={isVi ? "Nội dung công thức" : "Formula content"} value={f.code} onChange={(v) => set("formula", d.formula.map((x, j) => (j === i ? { ...x, code: v } : x)))} rows={2} mono />
          </div>
        ))}
      </div>

      <Field label={isVi ? "Bài tập" : "Exercise"} value={d.exercise} onChange={(v) => set("exercise", v)} rows={4} onImage={(md) => set("exercise", d.exercise + md)} />
      <Field label={isVi ? "Đáp án (không bắt buộc)" : "Answer key (optional)"} value={d.answer} onChange={(v) => set("answer", v)} rows={4} onImage={(md) => set("answer", d.answer + md)} />

      {/* Mục bổ sung: mỗi mục có tiêu đề và nội dung */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{isVi ? "Mục bổ sung" : "Extra sections"}</span>
          <button type="button" className={SMALL_BTN} onClick={() => set("extraSections", [...d.extraSections, { title: "", body: "" }])}>
            {isVi ? "+ Thêm mục" : "+ Add section"}
          </button>
        </div>
        {d.extraSections.map((x, i) => (
          <div key={i} className="space-y-2 rounded-xl border border-slate-200 p-3 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <input
                value={x.title}
                placeholder={isVi ? "Tiêu đề mục" : "Section title"}
                onChange={(e) => set("extraSections", d.extraSections.map((y, j) => (j === i ? { ...y, title: e.target.value } : y)))}
                className="flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950"
              />
              <button type="button" className={SMALL_BTN} onClick={() => set("extraSections", d.extraSections.filter((_, j) => j !== i))}>
                {isVi ? "Xóa" : "Remove"}
              </button>
            </div>
            <Field
              label={isVi ? "Nội dung" : "Content"}
              value={x.body}
              onChange={(v) => set("extraSections", d.extraSections.map((y, j) => (j === i ? { ...y, body: v } : y)))}
              rows={5}
              onImage={(md) => set("extraSections", d.extraSections.map((y, j) => (j === i ? { ...y, body: y.body + md } : y)))}
            />
          </div>
        ))}
      </div>

      {isVi && <Field label="Chủ đề liên quan (mã chủ đề, cách nhau bằng dấu phẩy)" value={d.relatedTopics} onChange={(v) => set("relatedTopics", v)} rows={1} />}
    </div>
  );
}

// Ba khóa SQL có nội dung trong code; admin chỉ nhập link video từng bài ở đây.
const SQL_COURSE_LIST: { key: "sql-basic" | "sql-intermediate" | "sql-advanced"; label: string }[] = [
  { key: "sql-basic", label: "SQL Basic" },
  { key: "sql-intermediate", label: "SQL Intermediate" },
  { key: "sql-advanced", label: "SQL Advanced" },
];

export default function AdminView() {
  const [supabase] = useState(() => createSupabaseBrowserClient());
  const [status, setStatus] = useState<"loading" | "signed-out" | "forbidden" | "ready">("loading");
  const [tab, setTab] = useState<Tab>("articles");
  const [articles, setArticles] = useState<ArticleRow[]>([]);
  const [projects, setProjects] = useState<ProjectRow[]>([]);
  const [courses, setCourses] = useState<CourseRow[]>([]);
  const [sqlCourse, setSqlCourse] = useState<"sql-basic" | "sql-intermediate" | "sql-advanced" | null>(null);
  const [artSearch, setArtSearch] = useState(""); // ô tìm bài viết
  const [projNew, setProjNew] = useState<{ slug: string; titleVi: string; titleEn: string } | null>(null); // form tạo dự án mới
  const [newArt, setNewArt] = useState({ slug: "", difficulty: "", titleVi: "", titleEn: "" }); // form tạo bài mới trong khóa
  const [courseForm, setCourseForm] = useState<{ id: string; slug: string; vi: { title: string; description: string }; en: { title: string; description: string }; topics: CourseRow["content_items"]; youtube: string } | null>(null);
  const [editing, setEditing] = useState<string | null>(null);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);
  const [saving, setSaving] = useState(false);

  // Form bài viết và dự án đang sửa. Giữ dạng chuỗi để người dùng gõ tự do; phần JSON được kiểm tra khi lưu.
  const [artForm, setArtForm] = useState<{ status: string; difficulty: string; youtube: string; vi: LangForm; en: LangForm } | null>(null);
  const [artLang, setArtLang] = useState<Lang>("vi"); // ngôn ngữ đang soạn trong form bài viết
  const [projForm, setProjForm] = useState<{ status: string; youtube: string; vi: Record<string, string>; en: Record<string, string> } | null>(null);

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
      const data = await reload();
      // Mở từ nút "Chỉnh sửa nội dung khóa học" trên trang khóa học: /admin?course=<slug>
      const want = new URLSearchParams(window.location.search).get("course");
      const row = want ? data.courses.find((c) => c.slug === want) : undefined;
      if (row && alive) {
        setTab("courses");
        openCourse(row);
      }
      if (alive) setStatus("ready");
    })();
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supabase]);

  async function reload() {
    const [a, p, c] = await Promise.all([
      supabase.from("content_items").select("id, slug, status, difficulty, category_id, youtube_url, content_translations(language_code, title, summary, sections)").order("slug"),
      supabase
        .from("projects")
        .select("id, slug, status, youtube_url, project_translations(language_code, title, summary, business_problem, data_structure, solution, dashboard, business_value)")
        .order("slug"),
      supabase
        .from("categories")
        .select("id, slug, youtube_url, category_translations(language_code, title, description), content_items(id, slug, status)")
        .neq("slug", "sql-database")
        .order("slug"),
    ]);
    if (a.error) setMessage({ ok: false, text: `Không tải được bài viết: ${a.error.message}` });
    if (p.error) setMessage({ ok: false, text: `Không tải được dự án: ${p.error.message}` });
    if (c.error) setMessage({ ok: false, text: `Không tải được khóa học: ${c.error.message}` });
    const data = {
      articles: (a.data ?? []) as unknown as ArticleRow[],
      projects: (p.data ?? []) as unknown as ProjectRow[],
      courses: (c.data ?? []) as unknown as CourseRow[],
    };
    setArticles(data.articles);
    setProjects(data.projects);
    setCourses(data.courses);
    return data;
  }

  function openArticle(row: ArticleRow) {
    const pick = (lang: Lang): LangForm => {
      const t = row.content_translations.find((x) => x.language_code === lang);
      return { title: t?.title ?? "", summary: t?.summary ?? "", draft: toDraft(t?.sections) };
    };
    setArtForm({ status: row.status, difficulty: row.difficulty ?? "", youtube: row.youtube_url ?? "", vi: pick("vi"), en: pick("en") });
    setArtLang("vi");
    setProjForm(null);
    setEditing(row.id);
    setMessage(null);
  }

  /* Tạo dự án mới ở trạng thái nháp, rồi mở để soạn nội dung. */
  async function createProject() {
    if (!projNew) return;
    const slug = projNew.slug.trim().toLowerCase();
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) {
      setMessage({ ok: false, text: "Slug chỉ gồm chữ thường không dấu, số và dấu gạch ngang, ví dụ: bao-cao-oee." });
      return;
    }
    if (!projNew.titleVi.trim() || !projNew.titleEn.trim()) {
      setMessage({ ok: false, text: "Nhập tên dự án cả tiếng Việt và tiếng Anh." });
      return;
    }
    setSaving(true);
    setMessage(null);
    const { data: item, error: e1 } = await supabase
      .from("projects")
      .insert({ slug, status: "Draft", position: projects.length + 1, tags: [] })
      .select("id")
      .single();
    if (e1 || !item) {
      setSaving(false);
      setMessage({ ok: false, text: e1 ? e1.message : "Không tạo được dự án." });
      return;
    }
    const { error: e2 } = await supabase.from("project_translations").insert([
      { project_id: item.id, language_code: "vi", title: projNew.titleVi.trim() },
      { project_id: item.id, language_code: "en", title: projNew.titleEn.trim() },
    ]);
    if (e2) {
      setSaving(false);
      setMessage({ ok: false, text: `Đã tạo dự án nhưng lỗi khi lưu bản dịch: ${e2.message}` });
      return;
    }
    const data = await reload();
    setSaving(false);
    setProjNew(null);
    const row = data.projects.find((p) => p.id === item.id);
    if (row) openProject(row);
    setMessage({ ok: true, text: "Đã tạo dự án mới ở trạng thái nháp. Soạn nội dung rồi bấm Lưu." });
  }

  function openProject(row: ProjectRow) {
    setProjNew(null);
    const pick = (lang: Lang) => {
      const t = row.project_translations.find((x) => x.language_code === lang);
      const out: Record<string, string> = {};
      for (const f of PROJECT_FIELDS) out[f.key] = (t?.[f.key] as string | null | undefined) ?? "";
      return out;
    };
    setProjForm({ status: row.status, youtube: row.youtube_url ?? "", vi: pick("vi"), en: pick("en") });
    setArtForm(null);
    setEditing(row.id);
    setMessage(null);
  }

  /* Lưu bài viết: cập nhật trạng thái, độ khó và hai bản dịch. */
  async function saveArticle(id: string) {
    if (!artForm) return;
    const sVi = toSections(artForm.vi.draft, true);
    const sEn = toSections(artForm.en.draft, false);
    const yt = cleanYoutube(artForm.youtube);
    if (yt.error) {
      setMessage({ ok: false, text: yt.error });
      return;
    }
    setSaving(true);
    setMessage(null);
    const { data: upd, error: e1 } = await supabase
      .from("content_items")
      .update({ status: artForm.status, difficulty: artForm.difficulty || null, youtube_url: yt.value, updated_at: new Date().toISOString() })
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
    const yt = cleanYoutube(projForm.youtube);
    if (yt.error) {
      setMessage({ ok: false, text: yt.error });
      return;
    }
    const { data: upd, error: e1 } = await supabase.from("projects").update({ status: projForm.status, youtube_url: yt.value }).eq("id", id).select("id");
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

  /* Mở khóa học để sửa tên, mô tả và xem danh sách bài trong khóa. */
  function openCourse(row: CourseRow) {
    const pick = (lang: Lang) => {
      const t = row.category_translations.find((x) => x.language_code === lang);
      return { title: t?.title ?? "", description: t?.description ?? "" };
    };
    setCourseForm({ id: row.id, slug: row.slug, vi: pick("vi"), en: pick("en"), topics: row.content_items, youtube: row.youtube_url ?? "" });
    setSqlCourse(null);
    setArtForm(null);
    setProjForm(null);
    setEditing(row.id);
    setMessage(null);
  }

  /* Lưu tên và mô tả khóa học của hai ngôn ngữ. */
  async function saveCourse(id: string) {
    if (!courseForm) return;
    const yt = cleanYoutube(courseForm.youtube);
    if (yt.error) {
      setMessage({ ok: false, text: yt.error });
      return;
    }
    setSaving(true);
    setMessage(null);
    const { data: catUpd, error: catErr } = await supabase.from("categories").update({ youtube_url: yt.value }).eq("id", id).select("id");
    if (catErr || !catUpd?.length) {
      setSaving(false);
      setMessage({ ok: false, text: catErr ? catErr.message : "Không lưu được link video: không có quyền sửa khóa này." });
      return;
    }
    for (const lang of ["vi", "en"] as const) {
      const f = courseForm[lang];
      const { data: upd, error } = await supabase
        .from("category_translations")
        .update({ title: f.title, description: f.description || null })
        .eq("category_id", id)
        .eq("language_code", lang)
        .select("category_id");
      if (error || !upd?.length) {
        setSaving(false);
        setMessage({ ok: false, text: error ? `Lỗi khi lưu bản ${lang}: ${error.message}` : `Không lưu được bản ${lang}: không có quyền sửa khóa này.` });
        return;
      }
    }
    setSaving(false);
    setMessage({ ok: true, text: "Đã lưu khóa học." });
    await reload();
  }

  /* Tạo bài viết mới trong khóa đang mở, ở trạng thái nháp, rồi mở bài để soạn nội dung. */
  async function createArticle(categoryId: string, position: number) {
    const slug = newArt.slug.trim().toLowerCase();
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) {
      setMessage({ ok: false, text: "Slug chỉ gồm chữ thường không dấu, số và dấu gạch ngang, ví dụ: loi-dong-may." });
      return;
    }
    if (!newArt.titleVi.trim() || !newArt.titleEn.trim()) {
      setMessage({ ok: false, text: "Nhập tiêu đề cả tiếng Việt và tiếng Anh." });
      return;
    }
    setSaving(true);
    setMessage(null);
    const { data: item, error: e1 } = await supabase
      .from("content_items")
      .insert({ slug, category_id: categoryId, content_type: "Article", status: "Draft", difficulty: newArt.difficulty || null, position })
      .select("id")
      .single();
    if (e1 || !item) {
      setSaving(false);
      setMessage({ ok: false, text: e1 ? e1.message : "Không tạo được bài." });
      return;
    }
    const { error: e2 } = await supabase.from("content_translations").insert([
      { content_id: item.id, language_code: "vi", title: newArt.titleVi.trim(), summary: null, sections: toSections(emptyDraft(), true) },
      { content_id: item.id, language_code: "en", title: newArt.titleEn.trim(), summary: null, sections: toSections(emptyDraft(), false) },
    ]);
    if (e2) {
      setSaving(false);
      setMessage({ ok: false, text: `Đã tạo bài nhưng lỗi khi lưu bản dịch: ${e2.message}` });
      return;
    }
    const data = await reload();
    setSaving(false);
    setNewArt({ slug: "", difficulty: "", titleVi: "", titleEn: "" });
    const row = data.articles.find((a) => a.id === item.id);
    if (row) {
      setTab("articles");
      openArticle(row);
    }
    setMessage({ ok: true, text: "Đã tạo bài mới ở trạng thái nháp. Soạn nội dung rồi bấm Lưu." });
  }

  // Gom bài viết theo khóa học (danh mục). Khóa đang mở hoặc khi đang tìm kiếm thì tự mở ra.
  const q = artSearch.trim().toLowerCase();
  const titleVi = (a: ArticleRow) => a.content_translations.find((t) => t.language_code === "vi")?.title ?? a.slug;
  const courseTitle = (id: string | null) => {
    if (!id) return "Chưa thuộc khóa";
    return courses.find((c) => c.id === id)?.category_translations.find((t) => t.language_code === "vi")?.title ?? "Khóa khác";
  };
  const groupMap = new Map<string, ArticleRow[]>();
  for (const a of articles) {
    if (q && !a.slug.includes(q) && !titleVi(a).toLowerCase().includes(q)) continue;
    const k = a.category_id ?? "none";
    groupMap.set(k, [...(groupMap.get(k) ?? []), a]);
  }
  const articleGroups = [...groupMap.entries()]
    .map(([k, items]) => ({
      key: k,
      title: courseTitle(k === "none" ? null : k),
      items: [...items].sort((x, y) => x.slug.localeCompare(y.slug)),
      open: Boolean(q) || items.some((a) => a.id === editing),
    }))
    .sort((x, y) => x.title.localeCompare(y.title));

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
        {(["articles", "projects", "courses", "career", "practice", "users"] as Tab[]).map((t) => (
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
            {t === "articles"
              ? `Bài viết (${articles.length})`
              : t === "projects"
                ? `Dự án (${projects.length})`
                : t === "courses"
                  ? `Khóa học (${courses.length})`
                  : t === "career"
                    ? "Career"
                    : t === "practice"
                      ? "Luyện tập SQL"
                      : "Người dùng"}
          </button>
        ))}
      </div>

      {message && <p className={`mb-4 text-sm ${message.ok ? "text-emerald-600" : "text-rose-600"}`}>{message.text}</p>}

      {tab === "career" && <CareerEditor />}
      {tab === "practice" && <PracticeEditor />}
      {tab === "users" && <UsersAdmin />}

      <div className={tab === "career" || tab === "practice" || tab === "users" ? "hidden" : "grid gap-6 lg:grid-cols-3"}>
        <div className="space-y-2 lg:col-span-1">
          {tab === "articles" && (
            <>
              <input
                value={artSearch}
                onChange={(e) => setArtSearch(e.target.value)}
                placeholder="Tìm theo tên hoặc slug…"
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-sky-500 focus:outline-none dark:border-slate-700 dark:bg-slate-950"
              />
              {articleGroups.length === 0 && <p className="text-sm text-slate-500">Không có bài nào.</p>}
              {articleGroups.map((g) => (
                <details key={`${g.key}-${g.open}`} open={g.open} className="rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
                  <summary className="cursor-pointer select-none px-3 py-2 text-sm font-semibold text-slate-800 dark:text-slate-200">
                    {g.title} <span className="font-normal text-slate-500">({g.items.length})</span>
                  </summary>
                  <div className="space-y-2 p-2 pt-0">
                    {g.items.map((a) => (
                      <button
                        key={a.id}
                        type="button"
                        onClick={() => openArticle(a)}
                        className={`block w-full rounded-lg border p-2.5 text-left text-sm transition ${editing === a.id ? "border-sky-500 bg-sky-50 dark:bg-slate-800" : "border-slate-200 hover:border-sky-300 dark:border-slate-800"}`}
                      >
                        <span className="block font-medium text-slate-900 dark:text-white">{titleVi(a)}</span>
                        <span className="text-xs text-slate-500">
                          {a.slug} · {a.status === "Published" ? "Đã xuất bản" : "Nháp"}
                        </span>
                      </button>
                    ))}
                    {courses.some((c) => c.id === g.key) && (
                      <button
                        type="button"
                        onClick={() => {
                          const row = courses.find((c) => c.id === g.key);
                          if (!row) return;
                          setTab("courses");
                          setSqlCourse(null);
                          openCourse(row);
                        }}
                        className="w-full rounded-lg border border-dashed border-emerald-400 py-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-50 dark:text-emerald-300 dark:hover:bg-slate-800"
                      >
                        + Thêm bài mới vào khóa này
                      </button>
                    )}
                  </div>
                </details>
              ))}
            </>
          )}
          {tab === "courses" &&
            SQL_COURSE_LIST.map((c) => (
              <button
                key={c.key}
                type="button"
                onClick={() => {
                  setSqlCourse(c.key);
                  setEditing(null);
                  setCourseForm(null);
                  setMessage(null);
                }}
                className={`block w-full rounded-xl border p-3 text-left text-sm transition ${sqlCourse === c.key ? "border-sky-500 bg-sky-50 dark:bg-slate-800" : "border-slate-200 bg-white hover:border-sky-300 dark:border-slate-800 dark:bg-slate-900"}`}
              >
                <span className="block font-semibold text-slate-900 dark:text-white">{c.label}</span>
                <span className="text-xs text-slate-500">{c.key} · link video từng bài</span>
              </button>
            ))}
          {tab === "courses" &&
            courses.map((c) => {
              const vi = c.category_translations.find((t) => t.language_code === "vi")?.title ?? c.slug;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => openCourse(c)}
                  className={`block w-full rounded-xl border p-3 text-left text-sm transition ${editing === c.id ? "border-sky-500 bg-sky-50 dark:bg-slate-800" : "border-slate-200 bg-white hover:border-sky-300 dark:border-slate-800 dark:bg-slate-900"}`}
                >
                  <span className="block font-semibold text-slate-900 dark:text-white">{vi}</span>
                  <span className="text-xs text-slate-500">
                    {c.slug} · {c.content_items.length} bài
                  </span>
                </button>
              );
            })}
          {tab === "projects" && (
            <button
              type="button"
              onClick={() => {
                setProjNew({ slug: "", titleVi: "", titleEn: "" });
                setEditing(null);
                setProjForm(null);
                setArtForm(null);
                setCourseForm(null);
                setMessage(null);
              }}
              className="w-full rounded-xl border border-dashed border-sky-400 py-2 text-sm font-semibold text-sky-700 hover:bg-sky-50 dark:text-sky-300 dark:hover:bg-slate-800"
            >
              + Thêm dự án mới
            </button>
          )}
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
          {tab === "courses" && sqlCourse && <LessonVideos course={sqlCourse} />}
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

                <YoutubeInput value={artForm.youtube} onChange={(v) => setArtForm({ ...artForm, youtube: v })} />

                {/* Chọn ngôn ngữ đang soạn */}
                <div className="flex gap-2 border-t border-slate-200 pt-4 dark:border-slate-800">
                  {(["vi", "en"] as const).map((lang) => (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => setArtLang(lang)}
                      className={`rounded-lg px-4 py-1.5 text-sm font-semibold ${artLang === lang ? "bg-sky-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"}`}
                    >
                      {lang === "vi" ? "Tiếng Việt" : "English"}
                    </button>
                  ))}
                </div>

                <div className="space-y-4">
                  <Field label={artLang === "vi" ? "Tiêu đề" : "Title"} value={artForm[artLang].title} onChange={(v) => setArtForm({ ...artForm, [artLang]: { ...artForm[artLang], title: v } })} rows={1} />
                  <Field label={artLang === "vi" ? "Tóm tắt" : "Summary"} value={artForm[artLang].summary} onChange={(v) => setArtForm({ ...artForm, [artLang]: { ...artForm[artLang], summary: v } })} rows={2} />
                  <DraftEditor
                    isVi={artLang === "vi"}
                    d={artForm[artLang].draft}
                    onChange={(d) => setArtForm({ ...artForm, [artLang]: { ...artForm[artLang], draft: d } })}
                  />
                </div>

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

          {tab === "projects" && projNew && (
            <Section title="Dự án mới">
              <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <label className="block text-sm">
                  <span className="mb-1 block font-medium text-slate-700 dark:text-slate-300">Slug (đường dẫn, ví dụ bao-cao-oee)</span>
                  <input value={projNew.slug} onChange={(e) => setProjNew({ ...projNew, slug: e.target.value })} className={inputCls} />
                </label>
                <label className="block text-sm">
                  <span className="mb-1 block font-medium text-slate-700 dark:text-slate-300">Tên dự án (tiếng Việt)</span>
                  <input value={projNew.titleVi} onChange={(e) => setProjNew({ ...projNew, titleVi: e.target.value })} className={inputCls} />
                </label>
                <label className="block text-sm">
                  <span className="mb-1 block font-medium text-slate-700 dark:text-slate-300">Tên dự án (tiếng Anh)</span>
                  <input value={projNew.titleEn} onChange={(e) => setProjNew({ ...projNew, titleEn: e.target.value })} className={inputCls} />
                </label>
                <button type="button" disabled={saving} onClick={createProject} className="rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 disabled:opacity-60">
                  {saving ? "Đang tạo…" : "+ Tạo dự án nháp"}
                </button>
              </div>
            </Section>
          )}

          {editing && courseForm && (
            <Section title="Chỉnh sửa nội dung khóa học">
              <div className="space-y-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <YoutubeInput value={courseForm.youtube} onChange={(v) => setCourseForm({ ...courseForm, youtube: v })} />
                {(["vi", "en"] as const).map((lang) => (
                  <div key={lang} className="space-y-3">
                    <p className="text-sm font-bold uppercase text-sky-700 dark:text-sky-400">{lang === "vi" ? "Tiếng Việt" : "English"}</p>
                    <Field label={lang === "vi" ? "Tên khóa học" : "Course name"} value={courseForm[lang].title} onChange={(v) => setCourseForm({ ...courseForm, [lang]: { ...courseForm[lang], title: v } })} rows={1} />
                    <Field label={lang === "vi" ? "Mô tả" : "Description"} value={courseForm[lang].description} onChange={(v) => setCourseForm({ ...courseForm, [lang]: { ...courseForm[lang], description: v } })} rows={3} />
                  </div>
                ))}

                <button
                  type="button"
                  disabled={saving}
                  onClick={() => saveCourse(editing)}
                  className="rounded-xl bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-700 disabled:opacity-60"
                >
                  {saving ? "Đang lưu…" : "Lưu khóa học"}
                </button>

                <div className="border-t border-slate-200 pt-4 dark:border-slate-800">
                  <p className="mb-3 text-sm font-semibold text-slate-700 dark:text-slate-300">Bài trong khóa ({courseForm.topics.length})</p>
                  <ul className="space-y-2">
                    {courseForm.topics.map((tp) => {
                      const article = articles.find((a) => a.id === tp.id);
                      return (
                        <li key={tp.id}>
                          <button
                            type="button"
                            disabled={!article}
                            onClick={() => {
                              if (!article) return;
                              setTab("articles");
                              openArticle(article);
                            }}
                            className="flex w-full items-center justify-between rounded-lg border border-slate-200 px-3 py-2 text-left text-sm hover:border-sky-300 disabled:opacity-60 dark:border-slate-800"
                          >
                            <span className="font-medium text-slate-800 dark:text-slate-200">{tp.slug}</span>
                            <span className="text-xs text-slate-500">{tp.status === "Published" ? "Đã xuất bản" : "Nháp"} · Sửa bài →</span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div className="space-y-3 border-t border-slate-200 pt-4 dark:border-slate-800">
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">Thêm bài mới vào khóa này</p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <label className="block text-sm">
                      <span className="mb-1 block text-slate-600 dark:text-slate-400">Slug (đường dẫn, ví dụ loi-dong-may)</span>
                      <input
                        value={newArt.slug}
                        onChange={(e) => setNewArt({ ...newArt, slug: e.target.value })}
                        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950"
                      />
                    </label>
                    <label className="block text-sm">
                      <span className="mb-1 block text-slate-600 dark:text-slate-400">Độ khó</span>
                      <select
                        value={newArt.difficulty}
                        onChange={(e) => setNewArt({ ...newArt, difficulty: e.target.value })}
                        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950"
                      >
                        <option value="">—</option>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                      </select>
                    </label>
                    <label className="block text-sm">
                      <span className="mb-1 block text-slate-600 dark:text-slate-400">Tiêu đề (tiếng Việt)</span>
                      <input
                        value={newArt.titleVi}
                        onChange={(e) => setNewArt({ ...newArt, titleVi: e.target.value })}
                        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950"
                      />
                    </label>
                    <label className="block text-sm">
                      <span className="mb-1 block text-slate-600 dark:text-slate-400">Tiêu đề (tiếng Anh)</span>
                      <input
                        value={newArt.titleEn}
                        onChange={(e) => setNewArt({ ...newArt, titleEn: e.target.value })}
                        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950"
                      />
                    </label>
                  </div>
                  <button
                    type="button"
                    disabled={saving}
                    onClick={() => createArticle(courseForm.id, courseForm.topics.length + 1)}
                    className="rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 disabled:opacity-60"
                  >
                    {saving ? "Đang tạo…" : "+ Tạo bài nháp"}
                  </button>
                </div>
              </div>
            </Section>
          )}

          {editing && projForm && (
            <Section title="Sửa dự án">
              <div className="space-y-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <YoutubeInput value={projForm.youtube} onChange={(v) => setProjForm({ ...projForm, youtube: v })} />
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
