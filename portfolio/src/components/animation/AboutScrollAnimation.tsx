"use client";

import { useEffect, useRef } from "react";
import { animate, scroll, spring } from "motion";
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
    title: "STRUCTURE",
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
    track.querySelectorAll("[data-scroll-title]")
  );

  if (!items.length) return;

  /*
   * Horizontal movement
   */
  const horizontalAnimation = animate(
    track,
    {
      transform: [
        "translateX(0vw)",
        `translateX(-${(items.length - 1) * 100}vw)`,
      ],
    },
    {
      easing: "linear",
    }
  );

  const cancelHorizontal = scroll(horizontalAnimation, {
    target: section,
  });

  /*
   * Individual title movement
   */
  const segmentLength = 1 / items.length;

  const cancelTitles = headers.map((header, index) => {
    const start = index * segmentLength;
    const end = (index + 1) * segmentLength;

    const titleAnimation = animate(
      header,
      {
        transform: [
          "translateX(18vw)",
          "translateX(-18vw)",
        ],
      },
      {
        easing: "linear",
      }
    );

    return scroll(titleAnimation, {
      target: section,
      offset: [
        [start, 1],
        [end, 0],
      ],
    });
  });

  return () => {
    cancelHorizontal();

    cancelTitles.forEach((cancel) => {
      cancel();
    });
  };
}, []);

  return (
    <section
      ref={sectionRef}
      className={styles.scrollSection}
    >
      <div className={styles.stickyViewport}>
        {/* Background details */}
        <div className={styles.gridBackground} />
        <div className={styles.blueGlow} />

        {/* Top information */}
        <div className={styles.topBar}>
          <div className={styles.sectionInfo}>
        
            <p>HOW I WORK</p>
          </div>

          <div className={styles.scrollHint}>
            <span>SCROLL TO EXPLORE</span>
            <div className={styles.scrollArrow}>↓</div>
          </div>
        </div>

        {/* Horizontal content */}
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
                {/* Left information */}
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
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>

                {/* Right visual */}
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
                      <>
                        <div className={styles.structureBox}>
                          <span>USER</span>
                        </div>
                        <div className={styles.structureLine} />
                        <div className={styles.structureBox}>
                          <span>FLOW</span>
                        </div>
                        <div className={styles.structureLine} />

                        <div className={styles.structureBox}>
                          <span>PRODUCT</span>
                        </div>
                      </>
                    )}

                    {/* DESIGN */}
                    {slide.type === "design" && (
                      <>
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
                      </>
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

        {/* Bottom progress */}
        <div className={styles.bottomBar}>
          <div className={styles.progressTrack}>
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