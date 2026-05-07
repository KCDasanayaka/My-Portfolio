"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/ProjectsSection.module.css";
import { projects } from "../../data/projects";

/* ── Project card component ── */
function ProjectCard({
  title,
  subtitle,
  image,
  href,
}: {
  title: string;
  subtitle: string;
  image: string;
  href: string;
}) {
  return (
    <Link href={href} className={styles.card}>
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardSubtitle}>{subtitle}</p>
      <div className={styles.cardImageWrap}>
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 700px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={styles.cardImage}
        />
      </div>
    </Link>
  );
}

export default function ProjectsPage() {
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
    <section className={styles.projects} id="projects" ref={sectionRef}>
      {/* ── Top meta bar ── */}
      <div className={styles.metaBar}>
        <span className={styles.metaLeft}>© All Projects</span>
        <span className={styles.metaRight}>Portfolio Showcase</span>
      </div>

      {/* ── Section title ── */}
      <div className={`${styles.titleWrap} ${styles.fadeUp}`}>
        <span className={styles.sectionTitle}>work</span>
      </div>

      {/* ── All projects in 3-col grid ── */}
      <div className={styles.gridRow3}>
        {projects.map((p) => (
          <div key={p.id} className={styles.fadeUp}>
            <ProjectCard {...p} />
          </div>
        ))}
      </div>
    </section>
  );
}