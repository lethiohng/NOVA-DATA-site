import { notFound } from "next/navigation";
import { getArticle, getArticleKeys, getCategory } from "@/lib/data";
import ArticleView from "./ArticleView";

export const revalidate = 3600;

export async function generateStaticParams() {
  const keys = await getArticleKeys();
  return keys.map((k) => ({ category: k.category, slug: k.slug }));
}

export default async function ArticlePage({ params }: { params: Promise<{ category: string; slug: string }> }) {
  const { category: categorySlug, slug } = await params;
  const [article, category, keys] = await Promise.all([
    getArticle(categorySlug, slug),
    getCategory(categorySlug),
    getArticleKeys(),
  ]);
  if (!article || !category) notFound();
  const relatedPublished = keys.filter((k) => k.category === categorySlug).map((k) => k.slug);
  return <ArticleView article={article} category={category} relatedPublished={relatedPublished} />;
}
