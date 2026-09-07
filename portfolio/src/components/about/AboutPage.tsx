"use client";

import Image from "next/image";
import AboutScrollAnimation from "@/components/animation/AboutScrollAnimation";
import AboutTimeline from "@/components/about/AboutTimeline";
import styles from "@/styles/AboutPage.module.css";

export default function AboutPage() {
  return (
    <main className={styles.aboutPage}>

      {/* =====================================================
          HERO / WHO AM I
      ===================================================== */}

      <section className={styles.introSection}>

        <div className={styles.introHeader}>
          <span className={styles.sectionNumber}>01</span>
          <h1 className={styles.sectionTitle}>
            WHO AM I?
          </h1>
        </div>


        <div className={styles.introGrid}>
          {/* PHOTO */}
          <div className={styles.photoColumn}>
            <div className={styles.photoWrapper}>
              <Image
                src="/profilePic.jpg"
                alt="Kavindu Chathuranga"
                fill
                priority
                sizes="(max-width: 768px) 90vw, 42vw"
                className={styles.profileImage}
              />
              <div className={styles.photoNumber}>
                01
              </div>
            </div>
            <p className={styles.photoCaption}>
              DESIGN × TECHNOLOGY
            </p>
          </div>


          {/* INTRODUCTION */}
          <div className={styles.introContent}>
            <p className={styles.introEyebrow}>
              I'M KAVINDU CHATHURANGA
            </p>
            <h2 className={styles.introHeading}>
              I design digital experiences
              <span> with purpose.</span>
            </h2>
            <p className={styles.introText}>
              I'm a UI/UX Engineer and designer who enjoys turning
              ideas into meaningful digital experiences. My work sits
              at the intersection of design, technology and creativity.
            </p>



            {/* EDUCATION */}
            <div className={styles.educationBlock}>
              <span className={styles.blockLabel}>
                EDUCATION
              </span>
              <div className={styles.educationItem}>
                <h3>
                  BSc (Hons) in Computing & Information Systems
                </h3>
                <p>
                  Sabaragamuwa University of Sri Lanka
                </p>
                <span>
                  2020 / 2021 BATCH
                </span>
              </div>
              <div className={styles.educationItem}>
                <h3>
                  School Education
                </h3>
                <p>
                  DHAMMISSARA NATIONAL COLLEGE NATTANDIYA
                </p>
              </div>
            </div>
          </div>
        </div>

      </section>


      {/* =====================================================
          SCROLL STORY
      ===================================================== */}
      <AboutScrollAnimation />
      {/* =====================================================
          TIMELINE
      ===================================================== */}
      <AboutTimeline />
      {/* =====================================================
          CONTACT
      ===================================================== */}
      <section className={styles.contactSection}>
        <div className={styles.contactTop}>
          <span className={styles.sectionNumber}>
            04
          </span>
          <span className={styles.contactLabel}>
            LET'S WORK TOGETHER
          </span>
        </div>


        <div className={styles.contactContent}>

          <h2>
            Have an idea
            <br />
            worth building?
          </h2>

          <p>
            Let's turn it into something meaningful.
          </p>

          <a
            href="mailto:sakcdasanayaka@gmail.com"
            className={styles.contactButton}
          >
            CONTACT ME
            <span>↗</span>
          </a>

        </div>

      </section>

    </main>
  );
}