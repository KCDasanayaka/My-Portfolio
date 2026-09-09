import type { Project } from "@/data/projects";

import styles from "@/styles/ProjectIntro.module.css";

type ProjectIntroProps = {
  project: Project;
};

export default function ProjectIntro({
  project,
}: ProjectIntroProps) {
  return (
    <section
      className={styles.intro}
    >
      <div
        className={styles.container}
      >

        <div
          className={styles.heading}
        >
          <span
            className={styles.kicker}
          >
            PROJECT
          </span>

          <h2>
            {project.title}
          </h2>

          <p
            className={
              styles.subtitle
            }
          >
            {project.subtitle}
          </p>
        </div>

        <div
          className={styles.contentGrid}
        >

          <div
            className={
              styles.description
            }
          >
            <p>
              {project.description}
            </p>
          </div>

          <div
            className={styles.meta}
          >

            <div
              className={styles.metaItem}
            >
              <span>ROLE</span>

              <strong>
                {project.role}
              </strong>
            </div>

            <div
              className={styles.metaItem}
            >
              <span>CATEGORY</span>

              <strong>
                {project.category}
              </strong>
            </div>

          </div>

        </div>

        <div
          className={styles.links}
        >

          {project.links
            .behance && (
            <a
              href={
                project.links
                  .behance
              }
              target="_blank"
              rel="noreferrer"
            >
              <span>
                BEHANCE
              </span>

              <span>↗</span>
            </a>
          )}

          {project.links
            .dribbble && (
            <a
              href={
                project.links
                  .dribbble
              }
              target="_blank"
              rel="noreferrer"
            >
              <span>
                DRIBBBLE
              </span>

              <span>↗</span>
            </a>
          )}

          {project.links
            .github && (
            <a
              href={
                project.links.github
              }
              target="_blank"
              rel="noreferrer"
            >
              <span>
                GITHUB
              </span>

              <span>↗</span>
            </a>
          )}

          {project.links.live && (
            <a
              href={
                project.links.live
              }
              target="_blank"
              rel="noreferrer"
            >
              <span>
                LIVE PROJECT
              </span>

              <span>↗</span>
            </a>
          )}

        </div>

      </div>
    </section>
  );
}