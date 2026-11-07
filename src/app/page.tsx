import { getCategories, getProjects, getRoadmaps } from "@/lib/data";
import HomeView from "./HomeView";

export default async function HomePage() {
  const [categories, roadmaps, projects] = await Promise.all([getCategories(), getRoadmaps(), getProjects()]);
  return <HomeView categories={categories} roadmaps={roadmaps} projects={projects} />;
}

export const revalidate = 3600;
