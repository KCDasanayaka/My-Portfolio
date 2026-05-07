"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "../../../styles/ProjectsSection.module.css";
import { projects } from "../../../data/projects";

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = params;

  // Find project by slug (extract from href)
  const project = projects.find((p) => p.href === `/projects/${slug}`);

  if (!project) {
    notFound();
  }

  /* ── Scroll-reveal ── */
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const targets = sectionRef.current?.querySelectorAll(
      `.${styles.fadeUp}`
    );
    if (!targets) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.projects} id="project" ref={sectionRef}>
      {/* ── Top meta bar ── */}
      <div className={styles.metaBar}>
        <span className={styles.metaLeft}>© Project Details</span>
        <span className={styles.metaRight}>{project.title}</span>
      </div>

      {/* ── Section title ── */}
      <div className={`${styles.titleWrap} ${styles.fadeUp}`}>
        <span className={styles.sectionTitle}>{project.title.toLowerCase()}</span>
      </div>

      {/* ── Project details ── */}
      <div className={`${styles.projectDetails} ${styles.fadeUp}`}>
        <div className={styles.projectImageWrap}>
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 1200px) 100vw, 50vw"
            className={styles.projectImage}
          />
        </div>
        <div className={styles.projectInfo}>
          <h2 className={styles.projectTitle}>{project.title}</h2>
          <p className={styles.projectSubtitle}>{project.subtitle}</p>
          <div className={styles.projectDescription}>
            <p>
              This is a detailed description of the {project.title} project.
              It showcases the skills and technologies used in its development.
              The project demonstrates expertise in modern web development practices.
            </p>
            <p>
              Key features include responsive design, optimized performance,
              and user-centric interfaces. Built with cutting-edge technologies
              to deliver exceptional user experiences.
            </p>
          </div>
          <div className={styles.projectTech}>
            <h3>Technologies Used</h3>
            <ul>
              <li>React</li>
              <li>Next.js</li>
              <li>TypeScript</li>
              <li>CSS Modules</li>
            </ul>
          </div>
          <Link href="/projects" className={styles.backLink}>
            ← Back to Projects
          </Link>
        </div>
      </div>
    </section>
  );
}