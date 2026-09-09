import type {
  ProjectDetails as ProjectDetailsType,
} from "@/data/projects";

import styles from "@/styles/ProjectDetails.module.css";

type ProjectDetailsProps = {
  details: ProjectDetailsType;
};

const detailSections = [
  {
    key: "overview",
    label: "OVERVIEW",
  },

  {
    key: "problem",
    label: "THE PROBLEM",
  },

  {
    key: "solution",
    label: "THE SOLUTION",
  },

  {
    key: "result",
    label: "THE RESULT",
  },
] as const;

export default function ProjectDetails({
  details,
}: ProjectDetailsProps) {
  return (
    <section
      className={styles.details}
    >
      <div
        className={styles.container}
      >

        {detailSections.map(
          (section) => {
            const text =
              details[section.key];

            if (!text) {
              return null;
            }

            return (
              <div
                key={section.key}
                className={
                  styles.detail
                }
              >
                <div
                  className={
                    styles.label
                  }
                >
                  {section.label}
                </div>

                <div
                  className={
                    styles.text
                  }
                >
                  <p>{text}</p>
                </div>
              </div>
            );
          }
        )}

      </div>
    </section>
  );
}