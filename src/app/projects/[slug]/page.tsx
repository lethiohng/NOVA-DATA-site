import { notFound } from "next/navigation";
import { getProject, getProjectSlugs } from "@/lib/data";
import ProjectView from "./ProjectView";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();
  return <ProjectView project={project} />;
}
