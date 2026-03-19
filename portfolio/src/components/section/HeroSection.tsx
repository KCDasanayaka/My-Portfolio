"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/HeroSection.module.css";

export default function HeroSection() {
  const titleRef = useRef<HTMLDivElement>(null);

  /* ── Subtle parallax on the giant title ── */
  useEffect(() => {
    const onScroll = () => {
      if (!titleRef.current) return;
      titleRef.current.style.transform = `translateY(${window.scrollY * 0.15}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className={styles.hero}>

      {/* ── Portrait photo ── */}
      <div className={styles.portrait}>
        <Image
          src="/hero-portrait.png" 
          alt="Kavindu Chathuranga"
          fill
          priority
          sizes="(max-width: 560px) 80vw, (max-width: 900px) 65vw, 47vw"
          style={{ objectFit: "cover", objectPosition: "top center" }}
        />
        {/* soft gradient fades portrait into black at the bottom */}
        <div className={styles.portraitFade} />
      </div>

      {/* ── Left copy block ── */}
      <div className={styles.leftBlock}>

        {/* "From [Vision to Interface]" badge row */}
        <div className={styles.badgeRow}>
          <span className={styles.fromLabel}>From</span>
          <span className={styles.badge}>Vision to Interface</span>
        </div>

        {/* Sub-tagline */}
        <p className={styles.tagline}>
          I turn design and code into{" "}
          <span className={styles.taglineAccent}>digital&nbsp;experiences</span>{" "}
          that help businesses grow
        </p>
      </div>

      {/* ── Right copy block ── */}
      <div className={styles.rightBlock}>
        <p className={styles.bio}>
          I&apos;m Kavindu Chathuranga — a UI/UX Engineer, Frontend Developer,
          and Brand Designer creating intuitive experiences, modern interfaces,
          and impactful brands
        </p>

        {/* Get in touch pill */}
        <Link href="/contact" className={styles.ctaPill}>
          <span className={styles.arrowCircle}>
            <svg
              viewBox="0 0 18 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17 7H1M1 7L7 1M1 7L7 13"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className={styles.ctaLabel}>Get in touch</span>
        </Link>
      </div>

      {/* ── Giant "IamKavindu" title ── */}
      <div ref={titleRef} className={styles.bigTitle}>
        <span>IamKavindu</span>
      </div>

      {/* ── Blue accent bar at bottom ── */}
      <div className={styles.accentBar} />

    </section>
  );
}
