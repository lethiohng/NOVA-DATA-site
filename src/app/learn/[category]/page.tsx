import { notFound } from "next/navigation";
import { getCategory, getCategorySlugs } from "@/lib/data";
import CategoryView from "./CategoryView";

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await getCategorySlugs();
  return slugs.map((category) => ({ category }));
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: slug } = await params;
  const category = await getCategory(slug);
  if (!category) notFound();
  return <CategoryView category={category} />;
}
