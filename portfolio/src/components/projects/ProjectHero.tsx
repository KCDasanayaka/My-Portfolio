"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import {
  motionValue,
  scroll,
} from "motion";

import type { Project } from "@/data/projects";

import styles from "@/styles/ProjectHero.module.css";

type ProjectHeroProps = {
  project: Project;
};

export default function ProjectHero({
  project,
}: ProjectHeroProps) {
  const sectionRef =
    useRef<HTMLElement | null>(null);

  const imageRef =
    useRef<HTMLDivElement | null>(null);

  const contentRef =
    useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const content = contentRef.current;

    if (!section || !image || !content) {
      return;
    }

    const imageScale = motionValue(1.12);
    const contentOpacity = motionValue(1);
    const contentY = motionValue(0);

    const unsubscribeImage =
      imageScale.on(
        "change",
        (value) => {
          image.style.transform =
            `scale(${value})`;
        }
      );

    const unsubscribeOpacity =
      contentOpacity.on(
        "change",
        (value) => {
          content.style.opacity =
            String(value);
        }
      );

    const unsubscribeY =
      contentY.on(
        "change",
        (value) => {
          content.style.transform =
            `translate3d(0, ${value}px, 0)`;
        }
      );

    imageScale.set(1.12);

    const cancelScroll = scroll(
      (progress: number) => {
        /*
         * IMAGE
         *
         * 1.12 -> 1.00
         */

        const imageProgress =
          Math.min(
            Math.max(progress, 0),
            1
          );

        const scale =
          1.12 -
          imageProgress * 0.12;

        imageScale.set(scale);

        /*
         * CONTENT
         *
         * Gradually fades and moves upward.
         */

        const fadeProgress =
          Math.min(
            Math.max(progress / 0.7, 0),
            1
          );

        contentOpacity.set(
          1 - fadeProgress * 0.9
        );

        contentY.set(
          -fadeProgress * 80
        );
      },
      {
        target: section,
      }
    );

    return () => {
      cancelScroll();

      unsubscribeImage();
      unsubscribeOpacity();
      unsubscribeY();

      imageScale.destroy();
      contentOpacity.destroy();
      contentY.destroy();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.hero}
    >
      <div className={styles.sticky}>
        <div
          ref={imageRef}
          className={styles.image}
        >
          <Image
            src={project.heroImage}
            alt={project.title}
            fill
            priority
            sizes="100vw"
            style={{
              objectFit: "cover",
              objectPosition:
                project.heroPosition ||
                "center",
            }}
          />

          <div
            className={styles.overlay}
          />
        </div>

        <div
          ref={contentRef}
          className={styles.heroContent}
        >
          <span
            className={styles.eyebrow}
          >
            {project.category}
          </span>

          <h1>
            {project.title}
          </h1>

          <p>
            {project.subtitle}
          </p>

          <div
            className={styles.scrollIndicator}
          >
            <span>
              SCROLL TO EXPLORE
            </span>

            <span className={styles.arrow}>
              ↓
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}