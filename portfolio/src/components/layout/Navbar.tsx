"use client";

import {
  type CSSProperties,
} from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/Navbar.module.css";
import menuvector from "../../../public/menu-vector.svg";

const NAV_LINKS = [
  { label: "Home",     href: "/" },
  { label: "About",    href: "/#about" },
  { label: "Projects", href: "/#projects" },
  { label: "Services",     href: "/#services" },
  { label: "Contact",  href: "/#contact" },
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
  aria-hidden={!menuOpen}
  className={[
    styles.overlay,
    menuOpen ? styles.overlayOpen : "",
  ].join(" ")}
>
  {/* Decorative left panel */}
  <div className={styles.overlayArtwork} aria-hidden="true">
    <Image
      src={menuvector}
      alt=""
    
     
      className={styles.overlayArtworkImage}
    />
  </div>

  {/* Main navigation */}
  <div className={styles.overlayNavigation}>
    <nav
      className={styles.overlayNav}
      aria-label="Overlay navigation"
    >
      <ul className={styles.overlayNavList}>
        {NAV_LINKS.map(({ label, href }, index) => (
          <li
            key={href}
            className={styles.overlayNavItem}
            style={
  {
    "--link-index": index,
  } as CSSProperties
}
          >
            <Link
              href={href}
              className={styles.overlayNavLink}
              onClick={() => setMenuOpen(false)}
            >
              {index !== 0 && (
                <span
                  className={styles.overlayHash}
                  aria-hidden="true"
                >
                  #
                </span>
              )}

              <span className={styles.overlayNavLabel}>
                {label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  </div>

  {/* Right information panel */}
  <aside className={styles.overlayAside}>
    <button
      type="button"
      className={styles.closeBtn}
      onClick={() => setMenuOpen(false)}
      aria-label="Close navigation menu"
    >
      close
    </button>

    <div className={styles.overlaySocials}>
      {[
        {
          label: "LinkedIn",
          href: "https://www.linkedin.com/",
        },
        {
          label: "Behance",
          href: "https://www.behance.net/",
        },
        {
          label: "Dribbble",
          href: "https://dribbble.com/",
        },
        {
          label: "Instagram",
          href: "https://www.instagram.com/",
        },
      ].map(({ label, href }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.overlaySocialLink}
        >
          <span>{label}</span>

          <span
            className={styles.externalIcon}
            aria-hidden="true"
          >
            ↗
          </span>
        </a>
      ))}
    </div>

    <div className={styles.overlayContact}>
      <p className={styles.contactMessage}>
        Ready to start a project?
        <br />
        Let&apos;s work together
      </p>

      <a
        href="mailto:sakcdasanayaka@gmail.com"
        className={styles.contactEmail}
      >
        sakcdasanayaka@gmail.com
      </a>
    </div>
  </aside>
</div>
    </>
  );
}
