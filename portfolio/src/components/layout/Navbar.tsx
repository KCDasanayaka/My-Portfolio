"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/Navbar.module.css";

const NAV_LINKS = [
  { label: "Home",     href: "/" },
  { label: "About",    href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Blog",     href: "/blog" },
  { label: "Contact",  href: "/contact" },
];

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);

  /* ── Scroll detection ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Lock body scroll when overlay is open ── */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      {/* ══════════════════════════════════════
          NAVBAR BAR
      ══════════════════════════════════════ */}
      <header className={styles.navWrapper}>
        <nav
          className={[
            styles.navBar,
            scrolled ? styles.navBarScrolled : "",
          ].join(" ")}
        >
          {/* ── Logo ── */}
          <Link href="/" className={styles.logo}>
            <div className={styles.logoImage}>
              <Image
                src="/logo.png"
                alt="KavinduChathuranga logo"
                fill
                priority
                style={{ objectFit: "contain" }}
              />
            </div>
            <div className={styles.logoText}>
              <span className={styles.logoName}>KavinduChathuranga</span>
              <span className={styles.logoSub}>By VISONEXT STUDIOS</span>
            </div>
          </Link>

          {/* ── Menu trigger ── */}
          <button
            className={styles.menuBtn}
            onClick={() => setMenuOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={menuOpen}
            aria-controls="nav-overlay"
          >
            menu
          </button>
        </nav>
      </header>

      {/* ══════════════════════════════════════
          FULL-SCREEN OVERLAY MENU
      ══════════════════════════════════════ */}
      <div
        id="nav-overlay"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={[
          styles.overlay,
          menuOpen ? styles.overlayOpen : "",
        ].join(" ")}
      >
        {/* ── Top row: logo + close ── */}
        <div className={styles.overlayTop}>
          <Link
            href="/"
            className={styles.logo}
            onClick={() => setMenuOpen(false)}
          >
            <div className={styles.logoImage}>
              <Image
                src="/logo.png"
                alt="KavinduChathuranga logo"
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
            <div className={styles.logoText}>
              <span className={styles.logoName}>KavinduChathuranga</span>
              <span
                className={styles.logoSub}
                style={{ color: "rgba(255,255,255,0.55)" }}
              >
                By VISONEXT STUDIOS
              </span>
            </div>
          </Link>

          <button
            className={styles.closeBtn}
            onClick={() => setMenuOpen(false)}
            aria-label="Close navigation menu"
          >
            close
          </button>
        </div>

        {/* ── Nav links ── */}
        <ul className={styles.navLinks}>
          {NAV_LINKS.map(({ label, href }, i) => (
            <li key={href} className={styles.navItem}>
              <Link
                href={href}
                className={styles.navLink}
                onClick={() => setMenuOpen(false)}
              >
                <span className={styles.navIndex}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className={styles.navLinkLabel}>{label}</span>
                <span className={styles.navArrow} aria-hidden="true">→</span>
              </Link>
            </li>
          ))}
        </ul>

        {/* ── Footer ── */}
        <div className={styles.overlayFooter}>
          <p className={styles.footerCopy}>
            © {new Date().getFullYear()} KavinduChathuranga · VISONEXT STUDIOS
          </p>
          <div className={styles.socialLinks}>
            {[
              { label: "Dribbble",  href: "#" },
              { label: "LinkedIn",  href: "#" },
              { label: "GitHub",    href: "#" },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className={styles.socialLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {label}
              </a>
            ))}
          </div>
        </div>

        {/* ── Blue accent bar ── */}
        <div className={styles.overlayAccent} />
      </div>
    </>
  );
}
