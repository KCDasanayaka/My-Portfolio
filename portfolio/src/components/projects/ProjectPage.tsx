import type { Project } from "@/data/projects";

import ProjectHero from "./ProjectHero";
import ProjectIntro from "./ProjectIntro";
import ProjectGallery from "./ProjectGallery";
import ProjectDetails from "./ProjectDetails";
import ProjectNavigation from "./ProjectNavigation";

import styles from "@/styles/ProjectPage.module.css";

type ProjectPageProps = {
  project: Project;
};

export default function ProjectPage({
  project,
}: ProjectPageProps) {
  return (
    <main
      className={styles.projectPage}
    >
      <ProjectHero
        project={project}
      />

      <ProjectIntro
        project={project}
      />

      <ProjectGallery
        images={project.images}
      />


      <ProjectNavigation
        currentSlug={project.slug}
      />
    </main>
  );
}