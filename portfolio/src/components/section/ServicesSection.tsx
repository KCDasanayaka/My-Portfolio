"use client";

import {
  useEffect,
  useRef,
  type CSSProperties,
  type ReactNode,
} from "react";
import Link from "next/link";
import styles from "../../styles/ServicesSection.module.css";

/* ─────────────────────────────────────────
   Service icons
   ───────────────────────────────────────── */

const IconCoil = () => (
  <svg
    viewBox="0 0 120 90"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    {[0, 14, 28, 42, 56, 70].map((y, index) => (
      <ellipse
        key={index}
        cx="60"
        cy={12 + y}
        rx="52"
        ry="10"
        stroke="currentColor"
        strokeWidth="2.2"
      />
    ))}

    <line
      x1="8"
      y1="12"
      x2="8"
      y2="82"
      stroke="currentColor"
      strokeWidth="2.2"
    />

    <line
      x1="112"
      y1="12"
      x2="112"
      y2="82"
      stroke="currentColor"
      strokeWidth="2.2"
    />
  </svg>
);

const IconAtom = () => (
  <svg
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <circle
      cx="60"
      cy="60"
      r="7"
      stroke="currentColor"
      strokeWidth="2.2"
    />

    <ellipse
      cx="60"
      cy="60"
      rx="52"
      ry="18"
      stroke="currentColor"
      strokeWidth="2.2"
    />

    <ellipse
      cx="60"
      cy="60"
      rx="52"
      ry="18"
      stroke="currentColor"
      strokeWidth="2.2"
      transform="rotate(60 60 60)"
    />

    <ellipse
      cx="60"
      cy="60"
      rx="52"
      ry="18"
      stroke="currentColor"
      strokeWidth="2.2"
      transform="rotate(120 60 60)"
    />
  </svg>
);

const IconLayers = () => (
  <svg
    viewBox="0 0 120 110"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    {[0, 10, 20, 30, 40].map((offset, index) => {
      const y = 70 - offset;

      return (
        <polygon
          key={index}
          points={`60,${y - 16} 108,${y} 60,${y + 16} 12,${y}`}
          stroke="currentColor"
          strokeWidth="2.2"
          fill="none"
        />
      );
    })}
  </svg>
);

/* ─────────────────────────────────────────
   Types and data
   ───────────────────────────────────────── */

interface Service {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: ReactNode;
  items: string[];
  href?: string;
}

const SERVICES: Service[] = [
  {
    id: "uiux",
    number: "01",
    title: "UI/UX DESIGN",
    description:
      "Designing intuitive digital experiences through research, structured user journeys, and scalable visual systems.",
    icon: <IconCoil />,
    items: [
      "Competitive and market research",
      "User flows and product logic definition",
      "UX architecture for mobile and desktop apps",
      "Research-driven wireframes and prototypes",
      "Usability testing and scalable interface design",
    ],
  },
  {
    id: "web",
    number: "02",
    title: "WEB DESIGN",
    description:
      "Creating responsive, visually engaging websites that communicate clearly and provide a seamless experience across devices.",
    icon: <IconAtom />,
    items: [
      "Website and mobile wireframes",
      "Interactive Figma prototypes",
      "Responsive user interface design",
      "Typography, color, and component systems",
      "Developer-ready design handoff",
    ],
  },
  {
    id: "brand",
    number: "03",
    title: "BRAND DESIGN",
    description:
      "Building distinct visual identities that help brands communicate consistently and create meaningful audience connections.",
    icon: <IconLayers />,
    items: [
      "Brand identity design",
      "Logo and visual direction",
      "Social media and campaign assets",
      "Marketing and promotional materials",
      "Packaging and brand applications",
    ],
  },
];

/* ─────────────────────────────────────────
   Component
   ───────────────────────────────────────── */

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const revealTargets = section.querySelectorAll(
      `.${styles.fadeUp}`,
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add(styles.visible);
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -60px 0px",
      },
    );

    revealTargets.forEach((target) => observer.observe(target));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.services}
      id="services"
    >
      <div className={styles.metaBar}>
        <span className={styles.metaLeft}>© Services</span>
        <span className={styles.metaRight}>Digital Execution</span>
      </div>

      {/* ── Section title ── */}
      <div className={`${styles.titleWrap} ${styles.fadeUp}`}>
        <span className={styles.sectionTitle}>services</span>
      </div>
      

      

      {/* Sticky service-card stack */}
      <div className={styles.serviceStack}>
  {SERVICES.map((service, index) => {
    const cardStyle = {
      "--card-index": index,
    } as React.CSSProperties;

    return (
      <article
        key={service.id}
        id={`service-${service.id}`}
        className={styles.serviceCard}
        style={cardStyle}
      >
        {/* Sticky title strip */}
        <header className={styles.cardHeader}>
          <h3 className={styles.serviceTitle}>
            {service.title}
          </h3>
        </header>

        {/* Service content */}
        <div className={styles.cardBody}>
          <div className={styles.serviceInformation}>
            <p className={styles.serviceDescription}>
              {service.description}
            </p>

            <ul className={styles.serviceList}>
              {service.items.map((item, itemIndex) => (
                <li
                  key={`${service.id}-${itemIndex}`}
                  className={styles.serviceItem}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div
            className={styles.largeIcon}
            aria-hidden="true"
          >
            {service.icon}
          </div>
        </div>
      </article>
    );
  })}

  {/* Controls how long the final stacked state remains */}
  <div
    className={styles.stackRelease}
    aria-hidden="true"
  />
</div>

      {/* CV banner */}
      <div className={`${styles.ctaBanner} ${styles.fadeUp}`}>
        <div className={styles.ctaText}>
          <p className={styles.ctaHeading}>
            Interested in my experience and skills?
          </p>

          <p className={styles.ctaSubtitle}>
            Download my CV to explore my professional journey.
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
          <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </section>
  );
}