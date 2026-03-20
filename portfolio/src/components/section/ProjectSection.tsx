"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/ProjectsSection.module.css";
import { projects } from "../../data/projects";


/* ── Rows layout from the design:
   Row 1: projects[0], projects[1]   — 2-col
   Row 2: projects[2], projects[3]   — 2-col
   Row 3: projects[4], projects[5]   — 3-col (+ CTA)
── */

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

export default function ProjectsSection() {
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

  const row1 = projects.slice(0, 2);
  const row2 = projects.slice(2, 4);
  const row3 = projects.slice(4, 6);

  return (
    <section className={styles.projects} id="projects" ref={sectionRef}>

      {/* ── Top meta bar ── */}
      <div className={styles.metaBar}>
        <span className={styles.metaLeft}>© Featured Projects</span>
        <span className={styles.metaRight}>Digital Showcase</span>
      </div>

      {/* ── Section title ── */}
      <div className={`${styles.titleWrap} ${styles.fadeUp}`}>
        <span className={styles.sectionTitle}>work</span>
      </div>

      {/* ── Row 1: 2-col ── */}
      <div className={styles.gridRow2}>
        {row1.map((p) => (
          <div key={p.id} className={styles.fadeUp}>
            <ProjectCard {...p} />
          </div>
        ))}
      </div>

      {/* ── Row 2: 2-col ── */}
      <div className={styles.gridRow2}>
        {row2.map((p) => (
          <div key={p.id} className={styles.fadeUp}>
            <ProjectCard {...p} />
          </div>
        ))}
      </div>

      {/* ── Row 3: 3-col (2 cards + CTA) ── */}
      <div className={styles.gridRow3}>
        {row3.map((p) => (
          <div key={p.id} className={styles.fadeUp}>
            <ProjectCard {...p} />
          </div>
        ))}

        {/* Blue CTA card */}
        <Link
          href="/projects"
          className={`${styles.ctaCard} ${styles.fadeUp}`}
          aria-label="View all projects"
        >
          <span className={styles.ctaLabel}>View all projects</span>
        </Link>
      </div>

    </section>
  );
}
