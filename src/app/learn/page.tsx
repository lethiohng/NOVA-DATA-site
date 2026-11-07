import { getCategories, getResources, getRoadmaps } from "@/lib/data";
import LearnView from "./LearnView";

export default async function LearnPage() {
  const [categories, roadmaps, resources] = await Promise.all([getCategories(), getRoadmaps(), getResources()]);
  return <LearnView categories={categories} roadmaps={roadmaps} resources={resources} />;
}

export const revalidate = 3600;
