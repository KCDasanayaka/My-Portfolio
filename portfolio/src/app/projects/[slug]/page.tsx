import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import ProjectPage from "@/components/projects/ProjectPage";
import { getProjectBySlug, projects } from "@/data/projects";

type ProjectRouteProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectRoute({
  params,
}: ProjectRouteProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <ProjectPage project={project} />
      <Footer />
    </>
  );
}
