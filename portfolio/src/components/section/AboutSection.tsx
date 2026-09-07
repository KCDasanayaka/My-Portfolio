"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import styles from "../../styles/AboutSection.module.css";

function ArrowSVG() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function AboutSection() {
  /* ── Scroll-reveal: add .visible when element enters viewport ── */
  const titleRef = useRef<HTMLDivElement>(null);
  const bodyRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const targets = [titleRef.current, bodyRef.current].filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
            observer.unobserve(entry.target); // fire once
          }
        });
      },
      { threshold: 0.15 }
    );

    targets.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.about} id="about">

      {/* ── Top meta bar ── */}
      <div className={styles.metaBar}>
        <span className={styles.metaLeft}>
          UI/UX
          <span className={styles.metaDot}> · </span>
          Frontend
          <span className={styles.metaDot}> · </span>
          Branding
        </span>
        <span className={styles.metaRight}>Sri Lanka</span>
      </div>

      {/* ── Giant outline display title ── */}
      <div
        ref={titleRef}
        className={`${styles.titleWrap} ${styles.fadeUp}`}
      >
        <span
          className={styles.displayTitle}
          aria-label="About Me"
        >
          aboutMe
        </span>
      </div>

      {/* ── Body paragraph ── */}
      <div
        ref={bodyRef}
        className={`${styles.bodyWrap} ${styles.fadeUp}`}
      >
        <p className={styles.bodyText}>
          A UI/UX Engineer passionate about crafting meaningful digital
          experiences through thoughtful design and clean frontend
          development. I blend user-centered design, visual storytelling,
          and engineering precision to build interfaces that feel intuitive
          and impactful
        </p>
        <div className={styles.mobileCtaRow}>
            <Link href="/about" className={styles.ctaPill}>
              <span className={styles.arrowCircle}>
                <ArrowSVG />
              </span>
              <span className={styles.ctaLabel}>About Me</span>
            </Link>
          </div>
      </div>

    </section>
  );
}
