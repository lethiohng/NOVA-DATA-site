// Đưa nội dung từ src/lib/content.ts (nguồn gốc) vào Supabase.
// Chạy sau khi đã chạy schema.sql và migration_002_content_fields.sql.
// Chạy: npm run seed   (cần SUPABASE_SERVICE_ROLE_KEY trong .env.local)
import { createClient } from "@supabase/supabase-js";
import WebSocket from "ws";
import {
  articles,
  careerRoadmap,
  categories,
  challenges,
  kpis,
  playgroundFiles,
  projects,
  resources,
  roadmaps,

} from "../src/lib/content";
import { manufacturingExercises } from "./manufacturing/exercises";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) throw new Error("Thiếu NEXT_PUBLIC_SUPABASE_URL hoặc SUPABASE_SERVICE_ROLE_KEY");

const db = createClient(url, key, {
  auth: { persistSession: false },
  realtime: { transport: WebSocket as unknown as typeof globalThis.WebSocket },
});

const NIL = "00000000-0000-0000-0000-000000000000";

function check<T>(label: string, res: { data: T | null; error: { message: string } | null }) {
  if (res.error) throw new Error(`${label}: ${res.error.message}`);
  return res.data as T;
}

/** Xóa toàn bộ bảng tra cứu rồi ghi lại, để chạy nhiều lần không bị trùng. */
async function replaceAll(table: string, rows: Record<string, unknown>[]) {
  check(`${table} clear`, await db.from(table).delete().neq("id", NIL));
  if (rows.length) check(`${table} insert`, await db.from(table).insert(rows));
}

async function seedCategories() {
  const ids = new Map<string, string>();
  for (const c of categories) {
    const row = check<{ id: string }>(
      `categories ${c.slug}`,
      await db.from("categories").upsert({ slug: c.slug, position: categories.indexOf(c) + 1 }, { onConflict: "slug" }).select("id").single(),
    );
    ids.set(c.slug, row.id);
    for (const lang of ["vi", "en"] as const) {
      check(
        `category_translations ${c.slug} ${lang}`,
        await db.from("category_translations").upsert(
          { category_id: row.id, language_code: lang, title: c.title[lang], description: c.description[lang] },
          { onConflict: "category_id,language_code" },
        ),
      );
    }
  }
  return ids;
}

/** Mỗi chủ đề là một content_items. Chủ đề có bài viết thì Published, còn lại Draft. */
async function seedTopics(categoryIds: Map<string, string>) {
  for (const c of categories) {
    for (const [position, topic] of c.topics.entries()) {
      const article = articles.find((a) => a.slug === topic.slug && a.categorySlug === c.slug);
      const item = check<{ id: string }>(
        `content_items ${topic.slug}`,
        await db
          .from("content_items")
          .upsert(
            {
              slug: topic.slug,
              category_id: categoryIds.get(c.slug),
              content_type: "Article",
              difficulty: article?.difficulty ?? topic.level ?? null,
              thumbnail_url: article?.thumbnail ?? topic.thumbnail ?? null,
              position: position + 1,
              status: article ? "Published" : "Draft",
              updated_at: new Date().toISOString(),
            },
            { onConflict: "slug" },
          )
          .select("id")
          .single(),
      );

      // Một ID, nhiều bản dịch: chuyển ngôn ngữ không tạo bài trùng lặp.
      for (const lang of ["vi", "en"] as const) {
        const sections = article
          ? {
              overview: article.overview[lang],
              objectives: article.objectives.map((o) => o[lang]),
              explanation: article.explanation[lang],
              practicalExample: article.practicalExample[lang],
              formula: article.formula,
              exercise: article.exercise[lang],
              answer: article.answer?.[lang] ?? null,
              extraSections: (article.extraSections ?? []).map((s) => ({ title: s.title[lang], body: s.body[lang] })),
              relatedTopics: article.relatedTopics,
            }
          : null;
        check(
          `content_translations ${topic.slug} ${lang}`,
          await db.from("content_translations").upsert(
            {
              content_id: item.id,
              language_code: lang,
              title: (article?.title ?? topic.title)[lang],
              summary: article?.summary[lang] ?? null,
              seo_title: (article?.title ?? topic.title)[lang],
              seo_description: article?.summary[lang] ?? null,
              sections,
            },
            { onConflict: "content_id,language_code" },
          ),
        );
      }
    }
  }
}

async function seedPaths() {
  for (const r of roadmaps) {
    const path = check<{ id: string }>(
      `learning_paths ${r.slug}`,
      await db
        .from("learning_paths")
        .upsert(
          {
            slug: r.slug,
            status: "Published",
            title_vi: r.title.vi,
            title_en: r.title.en,
            description_vi: r.description.vi,
            description_en: r.description.en,
          },
          { onConflict: "slug" },
        )
        .select("id")
        .single(),
    );
    check(`path_items clear ${r.slug}`, await db.from("path_items").delete().eq("path_id", path.id));
    const items = r.modules.map((m, i) => ({
      path_id: path.id,
      position: i + 1,
      title_vi: m.title.vi,
      title_en: m.title.en,
      expected_knowledge_vi: m.knowledge.vi,
      expected_knowledge_en: m.knowledge.en,
      lessons: m.lessons,
      practice_vi: m.practice.vi,
      practice_en: m.practice.en,
      status: m.status === "published" ? "Published" : "Draft",
    }));
    if (items.length) check(`path_items ${r.slug}`, await db.from("path_items").insert(items));
  }
}

async function seedExercises() {
  // 100 bài tập NOVA MANUFACTURING (đã kiểm tra chạy đúng trên dữ liệu giả lập).
  const sql = manufacturingExercises.map((e, i) => ({
    exercise_type: "SQL",
    level: e.level,
    topic: e.topic,
    dataset: "nova_manufacturing",
    position: i + 1,
    title_vi: e.title.vi,
    title_en: e.title.en,
    question: e.question.vi,
    question_en: e.question.en,
    solution: e.solution,
  }));
  const brief = challenges.map((c, i) => ({
    position: i + 1,
    exercise_type: "Challenge",
    level: c.level,
    title_vi: c.title.vi,
    title_en: c.title.en,
    question: c.brief.vi,
    question_en: c.brief.en,
  }));
  await replaceAll("exercises", [...sql, ...brief]);
}

async function seedKpis() {
  await replaceAll(
    "kpis",
    kpis.map((k, i) => ({
      slug: k.slug,
      abbr: k.abbr,
      name_vi: k.name.vi,
      name_en: k.name.en,
      description_vi: k.description.vi,
      description_en: k.description.en,
      formula: k.formula,
      unit: k.unit,
      data_needed: k.dataNeeded,
      position: i + 1,
    })),
  );
}

async function seedCareer() {
  await replaceAll(
    "career_steps",
    careerRoadmap.map((s, i) => ({ position: i + 1, text_vi: s.vi, text_en: s.en })),
  );
}

async function seedResources() {
  const rows: Record<string, unknown>[] = resources.map((r) => ({
    title: r.title.vi,
    title_en: r.title.en,
    resource_type: r.type,
    description_vi: r.description.vi,
    description_en: r.description.en,
    file_url: "href" in r && r.href ? r.href : "",
  }));
  // Data Playground lấy các file CSV từ bảng resources (resource_type = 'CSV').
  for (const f of playgroundFiles) {
    if (!rows.some((r) => r.file_url === f.href)) {
      rows.push({
        title: f.name,
        title_en: f.name,
        resource_type: "CSV",
        description_vi: f.description.vi,
        description_en: f.description.en,
        file_url: f.href,
      });
    }
  }
  await replaceAll("resources", rows);
}

async function seedProjects() {
  for (const [position, p] of projects.entries()) {
    const proj = check<{ id: string }>(
      `projects ${p.slug}`,
      await db
        .from("projects")
        .upsert({ slug: p.slug, status: "Published", tags: p.tags, position: position + 1 }, { onConflict: "slug" })
        .select("id")
        .single(),
    );
    for (const lang of ["vi", "en"] as const) {
      check(
        `project_translations ${p.slug} ${lang}`,
        await db.from("project_translations").upsert(
          {
            project_id: proj.id,
            language_code: lang,
            title: p.title[lang],
            summary: p.summary[lang],
            business_problem: p.businessProblem[lang],
            data_structure: p.dataStructure[lang],
            solution: p.solution[lang],
            dashboard: p.dashboard[lang],
            business_value: p.businessValue[lang],
          },
          { onConflict: "project_id,language_code" },
        ),
      );
    }
  }
}

/** Khóa học và các chủ đề đã xuất bản thuộc khóa. Khóa SQL chia theo cấp độ; các danh mục khác là một khóa. */
async function seedCourseTopics() {
  const rows: { course_key: string; topic_slug: string }[] = [];
  for (const c of categories) {
    for (const topic of c.topics) {
      if (!articles.some((a) => a.slug === topic.slug && a.categorySlug === c.slug)) continue;
      const key = c.slug === "sql-database" && topic.level ? `sql-${topic.level.toLowerCase()}` : c.slug;
      rows.push({ course_key: key, topic_slug: topic.slug });
    }
  }
  check("course_topics clear", await db.from("course_topics").delete().neq("topic_slug", ""));
  if (rows.length) check("course_topics insert", await db.from("course_topics").insert(rows));
}

async function main() {
  const categoryIds = await seedCategories();
  await seedTopics(categoryIds);
  await seedCourseTopics();
  await seedPaths();
  await seedExercises();
  await seedKpis();
  await seedCareer();
  await seedResources();
  await seedProjects();
  console.log("Seed xong: danh mục, chủ đề, bài viết, lộ trình, bài tập, KPI, nghề nghiệp, tài nguyên, dự án.");
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
