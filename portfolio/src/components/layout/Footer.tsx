import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/Footer.module.css";

/* ── Quick nav links ── */
const NAV_LINKS = [
  { label: "Home",     href: "/" },
  { label: "About",    href: "/about" },
  { label: "Work",     href: "/projects" },
  { label: "Services", href: "/#services" },
];

/* ── Social links — row 1 & row 2 ── */
const SOCIAL_ROW_1 = [
  { label: "Whatsapp", href: "https://wa.me/94711258917" },
  { label: "Facebook", href: "https://www.facebook.com/share/1DmmQuKeEU/" },
];

const SOCIAL_ROW_2 = [
  { label: "Behance",  href: "https://www.behance.net/KavinduDasanayaka" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/kavindu-dasanayaka-6a6735285/" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>

      {/* ── Watermark logo — ghost bottom-left ── */}
    <div className={styles.watermark}>
      <Image
        src="/footer.png"
        alt=""
        width={220}
        height={220}
        style={{ width: "100%", height: "auto", display: "block" }}
        aria-hidden="true"
      />
    </div>

      {/* ── Main row ── */}
      <div className={styles.mainRow}>

        {/* LEFT — quick links */}
        <div className={styles.block}>
          <p className={styles.blockLabel}>© Quick links</p>
          <nav className={styles.quickLinks} aria-label="Footer navigation">
            {NAV_LINKS.map((link, i) => (
              <span key={link.href} style={{ display: "flex", alignItems: "center" }}>
                <Link href={link.href} className={styles.navLink}>
                  {link.label}
                </Link>
                {i < NAV_LINKS.length - 1 && (
                  <span className={styles.separator} aria-hidden="true">
                    {" | "}
                  </span>
                )}
              </span>
            ))}
          </nav>
        </div>

        {/* RIGHT — social links */}
        <div className={`${styles.block} ${styles.rightBlock}`}>
          <p className={styles.blockLabel}>Connect With me</p>
          <div className={styles.socialRows}>

            {/* Row 1: Whatsapp | Instagram */}
            <div className={styles.socialRow}>
              {SOCIAL_ROW_1.map((social, i) => (
                <span key={social.href} style={{ display: "flex", alignItems: "center" }}>
                  <a
                    href={social.href}
                    className={styles.socialLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {social.label}
                  </a>
                  {i < SOCIAL_ROW_1.length - 1 && (
                    <span className={styles.separator} aria-hidden="true">
                      {" | "}
                    </span>
                  )}
                </span>
              ))}
            </div>

            {/* Row 2: Dribble | LinkedIn */}
            <div className={styles.socialRow}>
              {SOCIAL_ROW_2.map((social, i) => (
                <span key={social.href} style={{ display: "flex", alignItems: "center" }}>
                  <a
                    href={social.href}
                    className={styles.socialLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {social.label}
                  </a>
                  {i < SOCIAL_ROW_2.length - 1 && (
                    <span className={styles.separator} aria-hidden="true">
                      {" | "}
                    </span>
                  )}
                </span>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* ── Bottom copyright bar ── */}
      <div className={styles.bottomBar}>
        <p className={styles.copyright}>
          © VISONEXT STUDIOS BY KAVINDU | {year}
        </p>
      </div>

    </footer>
  );
}
