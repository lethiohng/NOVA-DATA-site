"use client";

import Link from "next/link";
import { formatVnd, sqlCourses, type Category, type Level, type Topic } from "@/lib/content";
import { useLang, useT } from "@/lib/i18n";
import { Badge, Card, PageHeader } from "@/components/ui";
import { BASIC_LESSONS } from "@/lib/sql-basic";
import { INTERMEDIATE_LESSONS } from "@/lib/sql-intermediate";
import { ADVANCED_LESSONS } from "@/lib/sql-advanced";
import SqlHeaderArt from "@/components/SqlHeaderArt";
import { TOPIC_GROUPS, type TopicGroup } from "@/lib/tool-group";

const LEVELS: Level[] = ["Beginner", "Intermediate", "Advanced"];

/* Ảnh minh họa đầu trang cho một số danh mục (lưu trên Supabase). */
const CATEGORY_IMAGES: Record<string, string> = {
  "industrial-iot": "https://mvhzyhdwmhdgossmpblj.supabase.co/storage/v1/object/public/brand/tools/iiot-flow.png",
};
const LEVEL_TONE: Record<Level, "green" | "amber" | "sky"> = { Beginner: "green", Intermediate: "amber", Advanced: "sky" };

function TopicCard({ topic, categorySlug }: { topic: Topic; categorySlug: string }) {
  const t = useT();
  const published = topic.status === "published";
  return (
    <Card href={published ? `/learn/${categorySlug}/${topic.slug}` : undefined}>
      {topic.thumbnail && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={topic.thumbnail} alt="" loading="lazy" className="mb-4 aspect-video w-full rounded-xl border border-slate-200 object-cover dark:border-slate-800" />
      )}
      <div className="flex items-center justify-between">
        <h2 className="font-semibold">{t(topic.title)}</h2>
        {published && <Badge tone="green">Published</Badge>}
      </div>
    </Card>
  );
}

function ToolGroupCard({ group, categorySlug }: { group: TopicGroup; categorySlug: string }) {
  const t = useT();
  const { lang } = useLang();
  const vi = lang === "vi";
  return (
    <Card href={`/learn/${categorySlug}/${group.slug}`}>
      <div className="flex items-center justify-between gap-2">
        <h2 className="font-semibold">{t(group.title)}</h2>
        <Badge tone="sky">{group.topicSlugs.length} {vi ? "bài" : "lessons"}</Badge>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{t(group.description)}</p>
    </Card>
  );
}

export default function CategoryView({ category }: { category: Category }) {
  const t = useT();
  const { lang } = useLang();
  const vi = lang === "vi";

  // Danh mục SQL được chia thành 3 khóa học theo cấp độ (Beginner, Intermediate, Advanced).
  const isCourseCategory = category.slug === "sql-database" && category.topics.some((tp) => tp.level);

  if (!isCourseCategory) {
    // Mỗi nhóm của danh mục là một thẻ; chủ đề không thuộc nhóm nào vẫn hiện như thẻ thường.
    const groupsHere = TOPIC_GROUPS.filter((g) => g.categorySlug === category.slug);
    const groupedSlugs = new Set(groupsHere.flatMap((g) => g.topicSlugs));
    return (
      <>
        <PageHeader eyebrow="Learn" title={t(category.title)} description={t(category.description)} />
        {CATEGORY_IMAGES[category.slug] && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={CATEGORY_IMAGES[category.slug]} alt="" className="mb-8 w-full rounded-2xl border border-slate-200 bg-white object-contain shadow-sm dark:border-slate-800" />
        )}
        <div className="grid gap-4 sm:grid-cols-2">
          {groupsHere.map((group) => (
            <ToolGroupCard key={group.slug} group={group} categorySlug={category.slug} />
          ))}
          {category.topics
            .filter((topic) => !groupedSlugs.has(topic.slug))
            .map((topic) => (
              <TopicCard key={topic.slug} topic={topic} categorySlug={category.slug} />
            ))}
        </div>
        <p className="mt-8 text-sm text-slate-500">
          <Link href="/learn" className="hover:text-sky-600">← Learn</Link>
        </p>
      </>
    );
  }

  const groups = LEVELS.map((level) => ({ level, topics: category.topics.filter((tp) => tp.level === level) })).filter((g) => g.topics.length);

  return (
    <>
      <PageHeader eyebrow="Learn" title={t(category.title)} description={t(category.description)} art={<SqlHeaderArt />} />

      <div className="grid gap-6 md:grid-cols-3">
        {groups.map(({ level, topics }) => {
          const course = sqlCourses[level];
          return (
            <a
              key={level}
              href={level === "Beginner" ? "/sql-basic" : level === "Intermediate" ? "/sql-intermediate" : "/sql-advanced"}
              className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-sky-400 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-sky-600"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={course.cover} alt="" loading="lazy" className="aspect-video w-full border-b border-slate-200 object-cover dark:border-slate-800" />
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center justify-between gap-2">
                  <Badge tone={LEVEL_TONE[level]}>{level}</Badge>
                  {course.premium && <Badge tone="violet">Premium</Badge>}
                  {course.price && <span className="ml-auto text-sm font-bold text-slate-900 dark:text-white">{formatVnd(course.price)}</span>}
                </div>
                <h3 className="mt-3 text-lg font-semibold text-slate-900 dark:text-white">{t(course.title)}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{t(course.description)}</p>
                <div className="mt-5 flex items-center justify-between border-t border-slate-200 pt-4 text-sm dark:border-slate-800">
                  <span className="text-slate-500">
                    {level === "Beginner"
                      ? `${BASIC_LESSONS.length} ${vi ? "bài học" : "lessons"}`
                      : level === "Intermediate"
                        ? `${INTERMEDIATE_LESSONS.length} ${vi ? "bài học" : "lessons"}`
                        : `${ADVANCED_LESSONS.length} ${vi ? "bài học" : "lessons"}`}
                  </span>
                  <span className="font-semibold text-sky-600 transition group-hover:translate-x-1 dark:text-sky-400">
                    {vi ? "Xem khóa học" : "View course"} →
                  </span>
                </div>
              </div>
            </a>
          );
        })}
      </div>

      <p className="mt-10 text-sm text-slate-500">
        <Link href="/learn" className="hover:text-sky-600">← Learn</Link>
      </p>
    </>
  );
}
