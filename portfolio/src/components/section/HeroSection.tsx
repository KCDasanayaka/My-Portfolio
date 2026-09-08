"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/HeroSection.module.css";
import heroPortrait from "../../../public/hero-portrait.png";

const TEXTS = ["Vision to Interface.", "Code to Experience.", "Brand to Impact"];

export default function HeroSection() {
  const titleRef = useRef<HTMLDivElement>(null);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  /* ── Parallax – desktop only ── */
  useEffect(() => {
    const onScroll = () => {
      if (!titleRef.current || window.innerWidth < 768) return;
      titleRef.current.style.transform = `translateY(${window.scrollY * 0.15}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Rotating badge text ── */
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentTextIndex((prev) => (prev + 1) % TEXTS.length);
        setIsAnimating(false);
      }, 200);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  const ArrowSVG = () => (
    <svg viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M17 7H1M1 7L7 1M1 7L7 13"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <section className={styles.hero}>

      {/* ══════════════════════════════════════════
          MOBILE LAYOUT — shown only on < 768px
          Stacked: blue-bio → dark-tagline+title →
          full-width portrait → CTA pill
      ══════════════════════════════════════════ */}
      <div className={styles.mobileLayout}>

        {/* ① Blue top block with bio */}
        <div className={styles.mobileBioBlock}>
          <p className={styles.mobileBioText}>
            I&apos;m Kavindu Chathuranga – a UI/UX Engineer, Frontend
            Developer, and Brand Designer creating intuitive experiences,
            modern interfaces, and impactful brands
          </p>
        </div>

        {/* ② Dark block: tagline + role title */}
        <div className={styles.mobileDarkBlock}>
          <p className={styles.mobileTagline}>
            I turn design and code into{" "}
            <span className={styles.taglineAccent}>digital experiences</span>{" "}
            that help businesses grow
          </p>
          <h1 className={styles.mobileRoleTitle}>UIUX ENGINEER</h1>
        </div>

        {/* ③ Portrait – full width */}
        <div className={styles.mobilePortraitWrap}> 
          <div className={styles.mobilePortraitFade} />
          <Image
            src={heroPortrait}
            alt="Kavindu Chathuranga"
            fill
            priority
            style={{ objectFit: "cover", objectPosition: "top center" }}
          />
         
          {/* ④ CTA pill – centred at bottom of portrait */}
          <div className={styles.mobileCtaRow}>
            <Link href="/contact" className={styles.ctaPill}>
              <span className={styles.arrowCircle}>
                <ArrowSVG />
              </span>
              <span className={styles.ctaLabel}>Get in touch</span>
            </Link>
          </div>
        </div>

        
      </div>

      {/* ══════════════════════════════════════════
          DESKTOP LAYOUT — shown only on ≥ 768px
          Absolute-positioned, original design
      ══════════════════════════════════════════ */}
      <div className={styles.desktopLayout}>

        {/* Portrait centred */}
        <div className={styles.portrait}>
          <Image
            src={heroPortrait}
            alt="Kavindu Chathuranga"
            fill
            priority
            sizes="(max-width: 900px) 65vw, 47vw"
            style={{ objectFit: "cover", objectPosition: "top center" }}
          />
          <div className={styles.portraitFade} />
        </div>

        {/* Left copy */}
        <div className={styles.leftBlock}>
          <div className={styles.badgeRow}>
            <span className={styles.fromLabel}>From</span>
            <span
              className={`${styles.badge} ${isAnimating ? styles.badgeExit : styles.badgeEnter}`}
            >
              {TEXTS[currentTextIndex]}
            </span>
          </div>
          <p className={styles.tagline}>
            I turn design and code into{" "}
            <span className={styles.taglineAccent}>
              digital&nbsp;experiences
            </span>{" "}
            that help businesses grow
          </p>
        </div>

        {/* Right copy */}
        <div className={styles.rightBlock}>
          <p className={styles.bio}>
            I&apos;m Kavindu Chathuranga, a UI/UX Engineer, Frontend
            Developer, and Brand Designer creating intuitive experiences,
            modern interfaces, and impactful brands
          </p>
          <Link href="/#contact" className={styles.ctaPill}>
            <span className={styles.arrowCircle}>
              <ArrowSVG />
            </span>
            <span className={styles.ctaLabel}>Get in touch</span>
          </Link>
        </div>

        {/* Giant title */}
        <div ref={titleRef} className={styles.bigTitle}>
          <span>UIUX ENGINEER</span>
        </div>

        {/* Blue accent bar */}
        <div className={styles.accentBar} />
      </div>

    </section>
  );
}
