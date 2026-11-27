import { supabase } from "./supabase";
import type { Bi } from "./i18n";
import type {
  Article,
  Category,
  Kpi,
  Level,
  Project,
  Roadmap,
  SqlExercise,
} from "./content";

/*
 * Lớp đọc dữ liệu từ Supabase (chỉ dùng trong server component).
 * Trả về đúng kiểu của content.ts nên giao diện không cần đổi nhiều.
 * Cache theo route: mỗi trang có revalidate = 3600 (đổi dữ liệu thì tối đa 1 giờ mới thấy).
 */

type Row = Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any

function db() {
  if (!supabase) throw new Error("Chưa cấu hình NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY");
  return supabase;
}

function ok<T>(label: string, res: { data: T | null; error: { message: string } | null }): T {
  if (res.error) throw new Error(`${label}: ${res.error.message}`);
  return (res.data ?? []) as T;
}

/** Ghép bản dịch dạng hàng (language_code, field) thành Bi. */
function biFromRows(rows: Row[] | null | undefined, field: string): Bi {
  const out: Bi = { vi: "", en: "" };
  for (const r of rows ?? []) {
    if (r.language_code === "vi" || r.language_code === "en") out[r.language_code as "vi" | "en"] = r[field] ?? "";
  }
  return out;
}

/** Ghép cột song ngữ dạng title_vi / title_en. */
function biFromCols(row: Row, base: string): Bi {
  return { vi: row[`${base}_vi`] ?? "", en: row[`${base}_en`] ?? "" };
}

/* ------------------------------------------------------------------ */
/* 01. LEARN                                                           */
/* ------------------------------------------------------------------ */

export async function getCategories(): Promise<Category[]> {
  const res = await db()
    .from("categories")
    .select("slug, position, youtube_url, category_translations(language_code, title, description), content_items(slug, status, position, thumbnail_url, difficulty, content_translations(language_code, title))")
    .order("position");
  return ok<Row[]>("categories", res).map((c) => ({
    slug: c.slug,
    title: biFromRows(c.category_translations, "title"),
    description: biFromRows(c.category_translations, "description"),
    youtube: c.youtube_url ?? undefined,
    topics: [...(c.content_items ?? [])]
      .sort((a, b) => a.position - b.position)
      .map((t) => ({
        slug: t.slug,
        title: biFromRows(t.content_translations, "title"),
        status: t.status === "Published" ? ("published" as const) : ("draft" as const),
        thumbnail: t.thumbnail_url ?? undefined,
        level: (t.difficulty as Level | null) ?? undefined,
      })),
  }));
}

export async function getCategory(slug: string): Promise<Category | null> {
  const all = await getCategories();
  return all.find((c) => c.slug === slug) ?? null;
}

export async function getCategorySlugs(): Promise<string[]> {
  return (await getCategories()).map((c) => c.slug);
}

export async function getArticle(categorySlug: string, slug: string): Promise<Article | null> {
  const res = await db()
    .from("content_items")
    .select("slug, difficulty, thumbnail_url, youtube_url, categories!inner(slug), content_translations(language_code, title, summary, sections)")
    .eq("slug", slug)
    .eq("status", "Published")
    .eq("categories.slug", categorySlug)
    .maybeSingle();
  if (res.error) throw new Error(`article: ${res.error.message}`);
  const row = res.data as Row | null;
  if (!row) return null;

  const vi = row.content_translations.find((t: Row) => t.language_code === "vi")?.sections;
  const en = row.content_translations.find((t: Row) => t.language_code === "en")?.sections;
  if (!vi || !en) return null;

  return {
    slug: row.slug,
    categorySlug,
    title: biFromRows(row.content_translations, "title"),
    summary: biFromRows(row.content_translations, "summary"),
    difficulty: row.difficulty,
    overview: { vi: vi.overview, en: en.overview },
    objectives: vi.objectives.map((o: string, i: number) => ({ vi: o, en: en.objectives[i] ?? "" })),
    explanation: { vi: vi.explanation, en: en.explanation },
    practicalExample: { vi: vi.practicalExample, en: en.practicalExample },
    formula: vi.formula,
    exercise: { vi: vi.exercise, en: en.exercise },
    answer: vi.answer ? { vi: vi.answer, en: en.answer ?? "" } : undefined,
    extraSections: (vi.extraSections ?? []).map((s: { title: string; body: string }, i: number) => ({
      title: { vi: s.title, en: en.extraSections?.[i]?.title ?? "" },
      body: { vi: s.body, en: en.extraSections?.[i]?.body ?? "" },
    })),
    relatedTopics: vi.relatedTopics ?? [],
    thumbnail: row.thumbnail_url ?? undefined,
    youtube: row.youtube_url ?? undefined,
  };
}

export async function getArticleKeys(): Promise<{ category: string; slug: string }[]> {
  const res = await db()
    .from("content_items")
    .select("slug, categories!inner(slug)")
    .eq("status", "Published");
  return ok<Row[]>("article keys", res).map((r) => ({ category: r.categories.slug, slug: r.slug }));
}

/* ------------------------------------------------------------------ */
/* 02. LEARNING PATH                                                   */
/* ------------------------------------------------------------------ */

export async function getRoadmaps(): Promise<Roadmap[]> {
  const res = await db()
    .from("learning_paths")
    .select("slug, title_vi, title_en, description_vi, description_en, path_items(position, title_vi, title_en, expected_knowledge_vi, expected_knowledge_en, lessons, practice_vi, practice_en, status)")
    .order("slug");
  return ok<Row[]>("roadmaps", res).map((r) => ({
    slug: r.slug,
    title: biFromCols(r, "title"),
    description: biFromCols(r, "description"),
    modules: [...(r.path_items ?? [])]
      .sort((a, b) => a.position - b.position)
      .map((m) => ({
        title: biFromCols(m, "title"),
        knowledge: biFromCols(m, "expected_knowledge"),
        lessons: m.lessons ?? [],
        practice: biFromCols(m, "practice"),
        status: m.status === "Published" ? ("published" as const) : ("draft" as const),
      })),
  }));
}

export async function getRoadmap(slug: string): Promise<Roadmap | null> {
  return (await getRoadmaps()).find((r) => r.slug === slug) ?? null;
}

export async function getRoadmapSlugs(): Promise<string[]> {
  return (await getRoadmaps()).map((r) => r.slug);
}

/* ------------------------------------------------------------------ */
/* 03. PRACTICE                                                        */
/* ------------------------------------------------------------------ */

export async function getSqlExercises(): Promise<SqlExercise[]> {
  const res = await db()
    .from("exercises")
    .select("id, level, topic, title_vi, title_en, question, question_en, solution, explanation, explanation_en, position")
    .eq("exercise_type", "SQL")
    .order("position");
  return ok<Row[]>("sql exercises", res).map((e) => ({
    id: e.id,
    level: e.level ?? "Beginner",
    topic: e.topic ?? "",
    title: biFromCols(e, "title"),
    question: { vi: e.question, en: e.question_en ?? e.question },
    solution: e.solution ?? "",
    explanation: e.explanation ? { vi: e.explanation, en: e.explanation_en ?? e.explanation } : undefined,
  }));
}

export async function getKpis(): Promise<Kpi[]> {
  const res = await db().from("kpis").select("*").order("position");
  return ok<Row[]>("kpis", res).map((k) => ({
    slug: k.slug,
    name: biFromCols(k, "name"),
    abbr: k.abbr,
    formula: k.formula,
    unit: k.unit ?? "",
    description: biFromCols(k, "description"),
    dataNeeded: k.data_needed ?? [],
  }));
}

export async function getChallenges() {
  const res = await db()
    .from("exercises")
    .select("id, level, title_vi, title_en, question, question_en, created_at")
    .eq("exercise_type", "Challenge")
    .order("created_at");
  return ok<Row[]>("challenges", res).map((c) => ({
    slug: c.id as string,
    title: biFromCols(c, "title"),
    brief: { vi: c.question, en: c.question_en ?? "" },
    level: (c.level ?? "Intermediate") as "Beginner" | "Intermediate" | "Advanced",
  }));
}

/* ------------------------------------------------------------------ */
/* 04. PROJECTS                                                        */
/* ------------------------------------------------------------------ */

export async function getProjects(): Promise<Project[]> {
  const res = await db()
    .from("projects")
    .select("slug, position, tags, youtube_url, project_translations(language_code, title, summary, business_problem, data_structure, solution, dashboard, business_value)")
    .order("position");
  return ok<Row[]>("projects", res).map((p) => {
    const t = p.project_translations ?? [];
    return {
      slug: p.slug,
      title: biFromRows(t, "title"),
      summary: biFromRows(t, "summary"),
      businessProblem: biFromRows(t, "business_problem"),
      dataStructure: biFromRows(t, "data_structure"),
      solution: biFromRows(t, "solution"),
      dashboard: biFromRows(t, "dashboard"),
      businessValue: biFromRows(t, "business_value"),
      tags: p.tags ?? [],
      youtube: p.youtube_url ?? undefined,
    };
  });
}

export async function getProject(slug: string): Promise<Project | null> {
  return (await getProjects()).find((p) => p.slug === slug) ?? null;
}

export async function getProjectSlugs(): Promise<string[]> {
  return (await getProjects()).map((p) => p.slug);
}

/* ------------------------------------------------------------------ */
/* 05. RESOURCES                                                       */
/* ------------------------------------------------------------------ */

export async function getResources() {
  const res = await db().from("resources").select("*").order("created_at");
  return ok<Row[]>("resources", res).map((r) => ({
    title: { vi: r.title, en: r.title_en ?? r.title },
    type: r.resource_type as string,
    description: biFromCols(r, "description"),
    href: r.file_url ? (r.file_url as string) : undefined,
  }));
}

export async function getPlaygroundFiles() {
  return (await getResources())
    .filter((r) => r.type === "CSV" && r.href)
    .map((r) => ({ name: r.title.en, href: r.href as string, description: r.description }));
}

/* ------------------------------------------------------------------ */
/* 06. CAREER                                                          */
/* ------------------------------------------------------------------ */

/** Số học viên đã hoàn thành từng khóa, theo course_key (xem migration_006 và seed). */
export async function getCourseCompletionCounts(): Promise<Record<string, number>> {
  const res = await db().rpc("course_completion_counts");
  if (res.error) {
    // Chưa chạy migration_006 thì hàm chưa có: trả về 0 thay vì làm lỗi cả trang khi build.
    console.warn(`course completion: ${res.error.message}`);
    return {};
  }
  return Object.fromEntries(((res.data ?? []) as Row[]).map((r) => [r.course_key as string, Number(r.learners)]));
}

export async function getCareerSteps(): Promise<Bi[]> {
  const res = await db().from("career_steps").select("text_vi, text_en").order("position");
  return ok<Row[]>("career", res).map((s) => ({ vi: s.text_vi, en: s.text_en }));
}
