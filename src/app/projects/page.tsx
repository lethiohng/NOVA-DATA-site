import { getProjects } from "@/lib/data";
import ProjectsView from "./ProjectsView";

export default async function ProjectsPage() {
  return <ProjectsView projects={await getProjects()} />;
}

export const revalidate = 60;
