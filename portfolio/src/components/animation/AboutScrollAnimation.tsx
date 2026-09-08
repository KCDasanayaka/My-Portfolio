"use client";

import { useEffect, useRef } from "react";
import {
  animate,
  motionValue,
  scroll,
} from "motion";
import styles from "@/styles/AboutScrollAnimation.module.css";

const slides = [
  {
    number: "01",
    label: "THE FIRST STEP",
    title: "THINK",
    description:
      "Understanding the problem before designing the solution. I explore users, business goals, context and opportunities to discover what actually needs to be solved.",
    tags: ["Research", "Users", "Strategy"],
    type: "think",
  },
  {
    number: "02",
    label: "MAKE IT CLEAR",
    title: "PLAN",
    description:
      "Turning ideas into meaningful experiences through information architecture, user flows and clear interaction logic.",
    tags: ["User Flows", "Architecture", "Logic"],
    type: "structure",
  },
  {
    number: "03",
    label: "CREATE THE EXPERIENCE",
    title: "DESIGN",
    description:
      "Creating interfaces that feel simple, intentional and visually engaging while maintaining consistency across the entire experience.",
    tags: ["UI Design", "Systems", "Prototype"],
    type: "design",
  },
  {
    number: "04",
    label: "BRING IT TO LIFE",
    title: "BUILD",
    description:
      "Connecting design and technology to create experiences that are practical, responsive and ready for the real world.",
    tags: ["Development", "Interaction", "Experience"],
    type: "build",
  },
];

export default function AboutScrollAnimation() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
  const section = sectionRef.current;
  const track = trackRef.current;

  if (!section || !track) return;

  const items = Array.from(track.querySelectorAll("li"));

  const headers = Array.from(
    track.querySelectorAll<HTMLElement>("[data-scroll-title]")
  );

  if (!items.length) return;

  /*
   * ----------------------------------------
   * RESPONSIVE
   * ----------------------------------------
   */

  const mobileQuery = window.matchMedia("(max-width: 600px)");
  const isMobile = mobileQuery.matches;

  /*
   * ----------------------------------------
   * SCROLL TIMING
   * ----------------------------------------
   *
   * INITIAL_X
   *
   * Controls where the first slide appears
   * when the section becomes sticky.
   *
   * Desktop:
   * -45vw = THINK is already partly leaving
   *
   * Mobile:
   * 0vw = THINK starts normally
   */

  const INITIAL_X = isMobile ? 0 : 0;

  /*
   * ----------------------------------------
   * START / END TIMING
   * ----------------------------------------
   *
   * 0.00 = section enters
   * 1.00 = section leaves
   *
   * Horizontal movement happens only
   * between START_PROGRESS and END_PROGRESS.
   */

  const START_PROGRESS = 0.00;

  const END_PROGRESS = 1;
  /*
   * ----------------------------------------
   * FINAL POSITION
   * ----------------------------------------
   *
   * Normally:
   *
   * -(4 - 1) * 100 = -300vw
   *
   * But -300 would completely bring BUILD
   * into the viewport.
   *
   * -270 means BUILD starts entering,
   * but the animation finishes before
   * BUILD becomes fully visible.
   */

  const FINAL_X = isMobile ? -300 : -300;

  /*
   * ----------------------------------------
   * HELPERS
   * ----------------------------------------
   */

  const clamp = (
    value: number,
    min: number,
    max: number
  ) => {
    return Math.min(Math.max(value, min), max);
  };

  const lerp = (
    start: number,
    end: number,
    progress: number
  ) => {
    return start + (end - start) * progress;
  };

  /*
   * ----------------------------------------
   * HORIZONTAL POSITION
   * ----------------------------------------
   */

  const horizontalX = motionValue(INITIAL_X);

  const updateHorizontalPosition = (value: number) => {
    track.style.transform =
      `translate3d(${value}vw, 0, 0)`;
  };

  const unsubscribeHorizontal =
    horizontalX.on(
      "change",
      updateHorizontalPosition
    );

  /*
   * Set initial position immediately.
   */

  horizontalX.set(INITIAL_X);

  /*
   * ----------------------------------------
   * SCROLL-LINKED ANIMATION
   * ----------------------------------------
   */

  const cancelScroll = scroll(
    (progress: number) => {

      /*
       * Convert the full section scroll
       * into our custom animation range.
       *
       * Example:
       *
       * 0%   -> 0
       * 40%  -> 0.5
       * 80%  -> 1
       * 100% -> 1
       */

      const animationProgress = clamp(
        (progress - START_PROGRESS) /
          (END_PROGRESS - START_PROGRESS),
        0,
        1
      );

      /*
       * ------------------------------------
       * HORIZONTAL SLIDE
       * ------------------------------------
       */

      const currentX = lerp(
        INITIAL_X,
        FINAL_X,
        animationProgress
      );

      horizontalX.set(currentX);

      /*
       * ------------------------------------
       * TITLE ANIMATION
       * ------------------------------------
       *
       * Each title gets its own section
       * of the horizontal animation.
       *
       * THINK
       * 0   -> 25%
       *
       * PLAN
       * 25% -> 50%
       *
       * DESIGN
       * 50% -> 75%
       *
       * BUILD
       * 75% -> 100%
       */

      headers.forEach((header, index) => {

        const slideStart =
          index / items.length;

        const slideEnd =
          (index + 1) / items.length;

        const titleProgress = clamp(
          (animationProgress - slideStart) /
            (slideEnd - slideStart),
          0,
          1
        );

        /*
         * Desktop:
         *
         * -8vw -> -18vw
         *
         * Mobile:
         *
         * 0 -> 0
         *
         * This prevents title clipping.
         */

        const titleStartX =
          isMobile ? 0 : 8;

        const titleEndX =
          isMobile ? 0 : -18;

        const titleX = lerp(
          titleStartX,
          titleEndX,
          titleProgress
        );

        header.style.transform =
          `translate3d(${titleX}vw, 0, 0)`;
      });
    },
    {
      target: section,
    }
  );

  /*
   * ----------------------------------------
   * CLEANUP
   * ----------------------------------------
   */

  return () => {
    cancelScroll();
    unsubscribeHorizontal();
    horizontalX.destroy();
  };

}, []);

  return (
    <section
      ref={sectionRef}
      className={styles.scrollSection}
    >
      <div className={styles.stickyViewport}>

        {/* --------------------------------
            BACKGROUND
        -------------------------------- */}

        <div className={styles.gridBackground} />
        <div className={styles.blueGlow} />

        {/* --------------------------------
            TOP BAR
        -------------------------------- */}

        <div className={styles.topBar}>
          <div className={styles.sectionInfo}>
            <p>HOW I WORK</p>
          </div>
          <div className={styles.scrollHint}>
            <span>SCROLL TO EXPLORE</span>
            <div className={styles.scrollArrow}>
              ↓
            </div>
          </div>
        </div>

        {/* --------------------------------
            HORIZONTAL CONTENT
        -------------------------------- */}

        <ul
          ref={trackRef}
          className={styles.horizontalTrack}
        >
          {slides.map((slide) => (
            <li
              key={slide.number}
              className={styles.slide}
            >
              <div className={styles.slideContent}>

                {/* --------------------------------
                    TEXT
                -------------------------------- */}

                <div className={styles.textArea}>

                  <div className={styles.slideNumber}>
                    {slide.number}
                  </div>

                  <div className={styles.slideLabel}>
                    {slide.label}
                  </div>

                  <h2 data-scroll-title>
                    {slide.title}
                  </h2>

                  <p className={styles.description}>
                    {slide.description}
                  </p>

                  <div className={styles.tags}>
                    {slide.tags.map((tag) => (
                      <span key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>

                </div>

                {/* --------------------------------
                    VISUAL
                -------------------------------- */}

                <div className={styles.visualArea}>
                  <div
                    className={`${styles.visual} ${styles[slide.type]}`}
                  >

                    {/* THINK */}

                    {slide.type === "think" && (
                      <>
                        <div className={styles.thinkCircle} />

                        <div className={styles.thinkLine} />

                        <div className={styles.thinkDot} />

                        <div className={styles.thinkDotTwo} />

                        <span className={styles.visualWord}>
                          WHY?
                        </span>
                      </>
                    )}

                    {/* STRUCTURE */}

                    {slide.type === "structure" && (
                      <div className={styles.structureDiagram}>

                        <div className={styles.structureBox}>
                          <span>USER</span>
                        </div>

                        <div className={styles.structureLine} />

                        <div className={styles.structureBox}>
                          <span>FLOW</span>
                        </div>

                        <div className={styles.structureLine} />

                        <div
                          className={`${styles.structureBox} ${styles.structureBoxActive}`}
                        >
                          <span>PRODUCT</span>
                        </div>

                      </div>
                    )}

                    {/* DESIGN */}

                    {slide.type === "design" && (
                      <div className={styles.designWindow}>

                        <div className={styles.windowHeader}>
                          <span />
                          <span />
                          <span />
                        </div>

                        <div className={styles.designBody}>

                          <div className={styles.designSidebar} />

                          <div className={styles.designContent}>

                            <div className={styles.designHero} />

                            <div className={styles.designCards}>
                              <span />
                              <span />
                              <span />
                            </div>

                          </div>

                        </div>

                      </div>
                    )}

                    {/* BUILD */}

                    {slide.type === "build" && (
                      <>
                        <div className={styles.buildShape}>
                          <div />
                          <div />
                          <div />
                        </div>

                        <div className={styles.buildCode}>
                          <span>{"<design />"}</span>
                          <span>{"<build />"}</span>
                          <span>{"<experience />"}</span>
                        </div>
                      </>
                    )}

                  </div>
                </div>

              </div>
            </li>
          ))}
        </ul>

        {/* --------------------------------
            BOTTOM PROGRESS
        -------------------------------- */}

        <div className={styles.bottomBar}>

          <div className={styles.progressTrack}>

            <div className={styles.progressLine} />

            <div className={styles.progressSegments}>

              {slides.map((slide) => (
                <span key={slide.number}>
                  {slide.number}
                </span>
              ))}

            </div>

          </div>

          <span className={styles.bottomText}>
            DESIGN × TECHNOLOGY
          </span>

        </div>

      </div>
    </section>
  );
}