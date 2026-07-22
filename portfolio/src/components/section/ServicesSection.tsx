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
  <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M100 195C152.467 195 195 152.467 195 100C195 47.5329 152.467 5 100 5C47.5329 5 5 47.5329 5 100C5 152.467 47.5329 195 100 195Z" fill="#2C50F7"/>
<path d="M162.52 98.4205H103.82L145.34 56.9005L143.1 54.6605L101.58 96.1805V37.4805H98.42V96.1805L56.9 54.6605L54.66 56.9005L96.18 98.4205H37.48V101.58H96.18L54.66 143.1L56.9 145.34L98.42 103.82V162.52H101.58V103.82L143.1 145.34L145.34 143.1L103.82 101.58H162.52V98.4205Z" fill="black"/>
</svg>

);

const IconAtom = () => (
  <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M188.4 4H108.6C104.42 4 101 7.42008 101 11.6V51.5003C101 25.2601 79.7399 4 53.5001 4C27.26 4 6 25.2601 6 51.5003C6 77.7404 27.26 99.0004 53.5001 99.0004C27.26 99.0004 6 120.26 6 146.501C6 172.741 27.26 194 53.5001 194C79.7399 194 101 172.741 101 146.501C101 172.741 122.26 194 148.5 194C174.74 194 196 172.741 196 146.501C196 120.26 174.74 99.0004 148.5 99.0004H188.4C192.58 99.0004 196 95.5805 196 91.4003V11.6C196 7.42008 192.58 4 188.4 4Z" fill="#2C50F7"/>
<path d="M127.92 30.9395V72.0997H169.08V30.9395H127.92ZM131.08 34.0995H165.92V68.9396H131.08V34.0995Z" fill="black"/>
</svg>

);

const IconLayers = () => (
  <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M147.5 100C173.74 100 195 78.74 195 52.5C195 26.26 173.74 5 147.5 5C121.26 5 100 26.26 100 52.5C100 26.26 78.74 5 52.5 5C26.26 5 5 26.26 5 52.5C5 78.74 26.26 100 52.5 100C26.26 100 5 121.26 5 147.5C5 173.74 26.26 195 52.5 195C78.74 195 100 173.74 100 147.5C100 173.74 121.26 195 147.5 195C173.74 195 195 173.74 195 147.5C195 121.26 173.74 100 147.5 100Z" fill="#2C50F7"/>
<path d="M109.34 90.6599C104.54 85.8599 101.6 79.2599 101.6 71.9599V70.3799H98.42V71.9599C98.42 79.2799 95.46 85.8799 90.68 90.6599C85.88 95.4599 79.28 98.3999 71.98 98.3999V101.56C79.3 101.56 85.9 104.52 90.68 109.3C95.48 114.1 98.42 120.7 98.42 128V129.58H101.6V128C101.6 120.68 104.56 114.08 109.34 109.3C114.14 104.5 120.74 101.56 128.04 101.56V98.3999C120.72 98.3999 114.12 95.4399 109.34 90.6599ZM100 118.56C97.06 109.84 90.16 102.94 81.44 99.9799C90.16 97.0199 97.04 90.1399 100 81.3999C102.94 90.1199 109.84 97.0199 118.56 99.9799C109.84 102.94 102.96 109.82 100 118.56Z" fill="#010101"/>
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