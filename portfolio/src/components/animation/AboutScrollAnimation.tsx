"use client";

import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";

import { useRef } from "react";

import styles from "@/styles/AboutScrollAnimation.module.css";

export default function AboutScrollAnimation() {

  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });


  /*
   * Controls how much of the SVG path is visible.
   *
   * At the beginning:
   * 0% of the path is visible.
   *
   * At the end:
   * 100% of the path is visible.
   */
  const pathLength = useTransform(
    scrollYProgress,
    [0, 1],
    [0, 1]
  );


  /*
   * Text progression
   */
  const thinkOpacity = useTransform(
    scrollYProgress,
    [0, 0.12, 0.22],
    [1, 1, 0]
  );

  const structureOpacity = useTransform(
    scrollYProgress,
    [0.18, 0.30, 0.40],
    [0, 1, 0]
  );

  const designOpacity = useTransform(
    scrollYProgress,
    [0.36, 0.48, 0.58],
    [0, 1, 0]
  );

  const buildOpacity = useTransform(
    scrollYProgress,
    [0.55, 0.68, 0.80],
    [0, 1, 0]
  );

  const finalOpacity = useTransform(
    scrollYProgress,
    [0.76, 0.90, 1],
    [0, 1, 1]
  );


  /*
   * Text movement
   */
  const thinkY = useTransform(
    scrollYProgress,
    [0, 0.2],
    [0, -80]
  );

  const structureY = useTransform(
    scrollYProgress,
    [0.18, 0.4],
    [80, -60]
  );

  const designY = useTransform(
    scrollYProgress,
    [0.36, 0.58],
    [80, -60]
  );

  const buildY = useTransform(
    scrollYProgress,
    [0.55, 0.80],
    [80, -60]
  );

  const finalY = useTransform(
    scrollYProgress,
    [0.76, 1],
    [80, 0]
  );


  return (
    <section
      ref={sectionRef}
      className={styles.scrollSection}
    >

      {/* =================================================
          STICKY VIEWPORT
      ================================================= */}

      <div className={styles.stickyArea}>


        {/* BACKGROUND LABEL */}

        <div className={styles.backgroundLabel}>
          HOW I THINK
        </div>


        {/* =================================================
            SVG LINE
        ================================================= */}

        <svg
          className={styles.scrollSvg}
          viewBox="0 0 1000 1600"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >

          <motion.path
            d="
              M 500 0

              C 500 130
                160 160
                250 300

              C 340 440
                850 360
                720 520

              C 580 690
                130 600
                250 820

              C 390 1030
                870 900
                740 1100

              C 610 1290
                280 1180
                430 1400

              C 480 1470
                520 1520
                500 1600
            "

            stroke="#2C50F7"
            strokeWidth="5"
            strokeLinecap="round"

            style={{
              pathLength,
              opacity: 0.9,
            }}
          />

        </svg>


        {/* =================================================
            SCROLL WORDS
        ================================================= */}

        <div className={styles.wordContainer}>

          <motion.div
            className={styles.word}
            style={{
              opacity: thinkOpacity,
              y: thinkY,
            }}
          >
            THINK
          </motion.div>


          <motion.div
            className={styles.word}
            style={{
              opacity: structureOpacity,
              y: structureY,
            }}
          >
            STRUCTURE
          </motion.div>


          <motion.div
            className={styles.word}
            style={{
              opacity: designOpacity,
              y: designY,
            }}
          >
            DESIGN
          </motion.div>


          <motion.div
            className={styles.word}
            style={{
              opacity: buildOpacity,
              y: buildY,
            }}
          >
            BUILD
          </motion.div>


          <motion.div
            className={`${styles.word} ${styles.finalWord}`}
            style={{
              opacity: finalOpacity,
              y: finalY,
            }}
          >
            <span>THIS IS</span>
            HOW I WORK.
          </motion.div>

        </div>


        {/* =================================================
            SCROLL INDICATOR
        ================================================= */}

        <div className={styles.scrollIndicator}>

          <span>
            SCROLL
          </span>

          <div className={styles.scrollLine} />

        </div>


        {/* PROGRESS */}
        <motion.div
          className={styles.progress}
          style={{
            scaleX: scrollYProgress,
          }}
        />

      </div>

    </section>
  );
}