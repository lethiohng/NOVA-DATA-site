import { notFound } from "next/navigation";
import { getRoadmap, getRoadmapSlugs } from "@/lib/data";
import RoadmapView from "./RoadmapView";

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await getRoadmapSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function RoadmapPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const roadmap = await getRoadmap(slug);
  if (!roadmap) notFound();
  return <RoadmapView roadmap={roadmap} />;
}
