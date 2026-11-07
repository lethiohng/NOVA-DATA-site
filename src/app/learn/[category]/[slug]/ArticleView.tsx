"use client";

import { useState } from "react";
import Link from "next/link";
import type { Article, Category } from "@/lib/content";
import { useLang, useT } from "@/lib/i18n";
import { Badge, CodeBlock, Section } from "@/components/ui";
import TopicDoneButton from "@/components/TopicDoneButton";

const labels = {
  vi: {
    overview: "Overview – Giới thiệu",
    objectives: "Learning Objectives – Mục tiêu học",
    explanation: "Explanation – Giải thích",
    example: "Practical Example – Ví dụ thực tế",
    formula: "Code / Formula – SQL hoặc công thức",
    exercise: "Exercise – Bài tập",
    answer: "Đáp án",
    showAnswer: "Xem đáp án",
    hideAnswer: "Ẩn đáp án",
    related: "Related Topics – Chủ đề liên quan",
  },
  en: {
    overview: "Overview",
    objectives: "Learning Objectives",
    explanation: "Explanation",
    example: "Practical Example",
    formula: "Code / Formula",
    exercise: "Exercise",
    answer: "Answer key",
    showAnswer: "Show answer",
    hideAnswer: "Hide answer",
    related: "Related Topics",
  },
};

/** Đoạn văn: xuống dòng theo ký tự xuống dòng và trước mỗi mục đánh số (1), (2), ... Dòng dạng ![mô tả](đường dẫn) hiện thành ảnh. */
function Paragraphs({ text, className = "leading-relaxed" }: { text: string; className?: string }) {
  const parts = text
    .split(/\n|\s+(?=\(\d+\)\s)/)
    .map((s) => s.trim())
    .filter(Boolean);
  return (
    <>
      {parts.map((p, i) => {
        const img = p.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
        if (img) {
          return (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={i} src={img[2]} alt={img[1]} className="mt-4 w-full rounded-2xl border border-slate-200 bg-white p-2 shadow-sm dark:border-slate-800" />
          );
        }
        return (
          <p key={i} className={`${className} ${parts.length > 1 ? "mt-2 first:mt-0" : ""}`}>
            {p}
          </p>
        );
      })}
    </>
  );
}

export default function ArticleView({ article, category, relatedPublished }: { article: Article; category: Category; relatedPublished: string[] }) {
  const { lang } = useLang();
  const t = useT();

  const L = labels[lang];
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div className="lg:grid lg:grid-cols-[240px_minmax(0,1fr)] lg:items-start lg:gap-8">
      {/* Danh sách chủ đề trong danh mục, bên trái, giống trang SQL Basic */}
      <aside className="hidden lg:sticky lg:top-24 lg:block lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto">
        <p className="mb-3 px-3 text-xs font-bold uppercase tracking-wider text-slate-500">{lang === "vi" ? "Danh sách bài học" : "Lessons"}</p>
        <nav aria-label={lang === "vi" ? "Danh sách bài học" : "Lessons"}>
          <ul className="space-y-0.5 border-l border-slate-200 dark:border-slate-800">
            {category.topics.map((tp) => {
              const current = tp.slug === article.slug;
              const published = tp.status === "published";
              const base = `-ml-px block truncate border-l-2 py-1 pl-4 pr-2 text-sm transition ${
                current ? "border-sky-600 font-semibold text-sky-700 dark:text-sky-300" : "border-transparent text-slate-600 dark:text-slate-400"
              }`;
              return (
                <li key={tp.slug}>
                  {published ? (
                    <Link
                      href={`/learn/${category.slug}/${tp.slug}`}
                      aria-current={current ? "page" : undefined}
                      className={`${base} hover:border-sky-500 hover:text-sky-700 dark:hover:text-sky-300`}
                    >
                      {t(tp.title)}
                    </Link>
                  ) : (
                    <span className={`${base} opacity-50`}>{t(tp.title)}</span>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

    <article className="min-w-0 max-w-3xl">
      <nav className="mb-4 text-sm text-slate-500">
        <Link href="/learn" className="hover:text-sky-600">Learn</Link> / <Link href={`/learn/${category.slug}`} className="hover:text-sky-600">{t(category.title)}</Link>
      </nav>
      <div className="mb-3 flex gap-2">
        <Badge tone="sky">{article.difficulty}</Badge>
      </div>
      <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{t(article.title)}</h1>
      <p className="mt-3 text-lg text-slate-600 dark:text-slate-400">{t(article.summary)}</p>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {article.thumbnail && <img src={article.thumbnail} alt="" className="mt-8 w-full rounded-2xl border border-slate-200 object-cover shadow-sm dark:border-slate-800" />}

      <div className="mt-8 space-y-10">
        <Section title={L.overview}>
          <Paragraphs text={t(article.overview)} />
        </Section>

        <Section title={L.objectives}>
          <ul className="list-disc space-y-1 pl-6">
            {article.objectives.map((o) => (
              <li key={o.vi}>{t(o)}</li>
            ))}
          </ul>
        </Section>

        <Section title={L.explanation}>
          <Paragraphs text={t(article.explanation)} />
        </Section>

        {article.extraSections?.map((s) => (
          <Section key={s.title.vi} title={t(s.title)}>
            <Paragraphs text={t(s.body)} />
          </Section>
        ))}

        <Section title={L.example}>
          <Paragraphs text={t(article.practicalExample)} />
        </Section>

        <Section title={L.formula}>
          <div className="space-y-4">
            {article.formula.map((f) => (
              <div key={f.label}>
                <p className="mb-2 text-sm font-medium text-slate-500">{f.label}</p>
                <CodeBlock code={f.code} />
              </div>
            ))}
          </div>
        </Section>

        <Section title={L.exercise}>
          <div className="rounded-lg border border-sky-200 bg-sky-50 p-4 dark:border-sky-900 dark:bg-sky-950/40">
            <Paragraphs text={t(article.exercise)} />
          </div>
          {article.answer && (
            <div className="mt-4">
              <button
                type="button"
                onClick={() => setShowAnswer((v) => !v)}
                aria-expanded={showAnswer}
                className="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium hover:border-sky-500 dark:border-slate-700"
              >
                {showAnswer ? L.hideAnswer : L.showAnswer}
              </button>
              {showAnswer && (
                <div className="mt-3 rounded-lg border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900 dark:bg-emerald-950/40">
                  <p className="mb-2 text-sm font-semibold text-emerald-800 dark:text-emerald-300">{L.answer}</p>
                  <Paragraphs text={t(article.answer)} />
                </div>
              )}
            </div>
          )}
        </Section>

        <TopicDoneButton slug={article.slug} />

        <Section title={L.related}>
          <div className="flex flex-wrap gap-2">
            {article.relatedTopics.map((topic) => {
              const chip = "rounded-full border border-slate-300 px-3 py-1 text-sm dark:border-slate-700";
              return relatedPublished.includes(topic) ? (
                <Link key={topic} href={`/learn/${category.slug}/${topic}`} className={`${chip} hover:border-sky-500`}>
                  {topic}
                </Link>
              ) : (
                <span key={topic} className={`${chip} text-slate-500`}>
                  {topic}
                </span>
              );
            })}
          </div>
        </Section>
      </div>
    </article>
    </div>
  );
}
