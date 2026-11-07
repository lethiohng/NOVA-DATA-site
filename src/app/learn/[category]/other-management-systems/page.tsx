import { notFound } from "next/navigation";
import { getCategory } from "@/lib/data";
import { TOPIC_GROUPS } from "@/lib/tool-group";
import ToolGroupView from "@/components/ToolGroupView";

export const revalidate = 3600;

const GROUP = TOPIC_GROUPS.find((g) => g.slug === "other-management-systems")!;

export default async function ToolGroupPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: slug } = await params;
  const category = await getCategory(slug);
  if (!category || category.slug !== GROUP.categorySlug) notFound();
  return <ToolGroupView category={category} group={GROUP} />;
}
