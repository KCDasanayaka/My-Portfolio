import Link from "next/link";

import {
  getNextProject,
  getPreviousProject,
} from "@/data/projects";

import styles from "@/styles/ProjectNavigation.module.css";

type ProjectNavigationProps = {
  currentSlug: string;
};

export default function ProjectNavigation({
  currentSlug,
}: ProjectNavigationProps) {
  const previousProject =
    getPreviousProject(
      currentSlug
    );

  const nextProject =
    getNextProject(
      currentSlug
    );

  return (
    <section
      className={
        styles.navigation
      }
    >
      <div
        className={
          styles.container
        }
      >

        

        <div
          className={
            styles.projects
          }
        >

          {previousProject ? (
            <Link
              href={`/projects/${previousProject.slug}`}
              className={
                styles.project
              }
            >
              <div
                className={
                  styles.arrow
                }
              >
                ←
              </div>

              <div
                className={
                  styles.projectInfo
                }
              >
                <span>
                  PREVIOUS PROJECT
                </span>

                <strong>
                  {previousProject.title}
                </strong>
              </div>
            </Link>
          ) : (
            <div />
          )}

          {nextProject ? (
            <Link
              href={`/projects/${nextProject.slug}`}
              className={
                `${styles.project} ${styles.next}`
              }
            >
              <div
                className={
                  styles.projectInfo
                }
              >
                <span>
                  NEXT PROJECT
                </span>

                <strong>
                  {nextProject.title}
                </strong>
              </div>

              <div
                className={
                  styles.arrow
                }
              >
                →
              </div>
            </Link>
          ) : (
            <div />
          )}

        </div>

      </div>
    </section>
  );
}