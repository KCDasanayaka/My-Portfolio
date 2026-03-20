"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import styles from "../../styles/ServicesSection.module.css";

/* ─────────────────────────────────────────
   Inline SVG icons — all blue (#2C50F7) stroke, no fill
   Matching the coil / atom / layers icons in the design
   ───────────────────────────────────────── */

const IconCoil = () => (
  /* Horizontal coil / spring — UI/UX Design */
  <svg viewBox="0 0 120 90" fill="none" xmlns="http://www.w3.org/2000/svg">
    {[0, 14, 28, 42, 56, 70].map((y, i) => (
      <ellipse
        key={i}
        cx="60"
        cy={12 + y}
        rx="52"
        ry="10"
        stroke="#2C50F7"
        strokeWidth="2.2"
      />
    ))}
    {/* vertical connecting lines */}
    <line x1="8"  y1="12" x2="8"  y2="82" stroke="#2C50F7" strokeWidth="2.2" />
    <line x1="112" y1="12" x2="112" y2="82" stroke="#2C50F7" strokeWidth="2.2" />
  </svg>
);

const IconAtom = () => (
  /* Atom — Web Design */
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* nucleus */}
    <circle cx="60" cy="60" r="7" stroke="#2C50F7" strokeWidth="2.2" />
    {/* orbit 1 — horizontal ellipse */}
    <ellipse cx="60" cy="60" rx="52" ry="18" stroke="#2C50F7" strokeWidth="2.2" />
    {/* orbit 2 — rotated 60° */}
    <ellipse
      cx="60" cy="60" rx="52" ry="18"
      stroke="#2C50F7" strokeWidth="2.2"
      transform="rotate(60 60 60)"
    />
    {/* orbit 3 — rotated 120° */}
    <ellipse
      cx="60" cy="60" rx="52" ry="18"
      stroke="#2C50F7" strokeWidth="2.2"
      transform="rotate(120 60 60)"
    />
  </svg>
);

const IconLayers = () => (
  /* Stacked layers / diamond stack — Brand Design */
  <svg viewBox="0 0 120 110" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* 5 stacked parallelogram layers, bottom to top */}
    {[0, 10, 20, 30, 40].map((offset, i) => {
      const y = 70 - offset;
      return (
        <polygon
          key={i}
          points={`60,${y - 16}  108,${y}  60,${y + 16}  12,${y}`}
          stroke="#2C50F7"
          strokeWidth="2.2"
          fill="none"
        />
      );
    })}
  </svg>
);

/* ─────────────────────────────────────────
   Services data
   ───────────────────────────────────────── */
const SERVICES = [
  {
    id: "uiux",
    title: "UI/UX DESIGN",
    icon: <IconCoil />,
    items: [
      "Competitive & market research",
      "User flows and product logic definition",
      "UX architecture for mobile and desktop apps",
      "Research-driven prototyping",
      "UX testing & scalable UI design for long-term growth",
    ],
  },
  {
    id: "web",
    title: "WEB DESIGN",
    icon: <IconAtom />,
    items: [
      "Web or mobile wireframes",
      "Interactive prototypes",
      "Full UI design in Figma",
      "Design system (typography, colors, components)",
      "Developer-ready handoff files",
    ],
  },
  {
    id: "brand",
    title: "BRAND DESIGN",
    icon: <IconLayers />,
    items: [
      "Identity Design",
      "Product Design",
      "Brand Assets",
      "Packaging",
    ],
  },
];

/* ─────────────────────────────────────────
   Component
   ───────────────────────────────────────── */
export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  /* Scroll-reveal */
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
    <section className={styles.services} id="services" ref={sectionRef}>

      {/* ── Meta bar ── */}
      <div className={styles.metaBar}>
        <span className={styles.metaLeft}>© Services</span>
        <span className={styles.metaRight}>Digital Execution</span>
      </div>

      {/* ── Section title ── */}
      <div className={`${styles.titleWrap} ${styles.fadeUp}`}>
        <span className={styles.sectionTitle}>services</span>
      </div>

      {/* ── Service rows ── */}
      {SERVICES.map((service) => (
        <div
          key={service.id}
          className={`${styles.serviceRow} ${styles.fadeUp}`}
        >
          {/* Left: title + bullet list */}
          <div className={styles.serviceContent}>
            <h3 className={styles.serviceTitle}>{service.title}</h3>
            <ul className={styles.serviceList}>
              {service.items.map((item, i) => (
                <li key={i} className={styles.serviceItem}>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: icon */}
          <div className={styles.iconWrap} aria-hidden="true">
            {service.icon}
          </div>
        </div>
      ))}

      {/* ── CTA Banner ── */}
      <div className={`${styles.ctaBanner} ${styles.fadeUp}`}>
        <div className={styles.ctaText}>
          <p className={styles.ctaHeading}>
            Interested in my experience and skills?
          </p>
          <p className={styles.ctaSubtitle}>
            Download my CV to explore my journey
          </p>
        </div>
        <Link
          href="/cv.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.ctaBtn}
          download
        >
          Get My CV
        </Link>
      </div>

    </section>
  );
}
