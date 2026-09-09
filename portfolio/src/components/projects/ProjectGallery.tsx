"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

import type {
  ProjectImage,
} from "@/data/projects";

import styles from "@/styles/ProjectGallery.module.css";

type ProjectGalleryProps = {
  images: ProjectImage[];
};

export default function ProjectGallery({
  images,
}: ProjectGalleryProps) {
  const galleryRef =
    useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const gallery =
      galleryRef.current;

    if (!gallery) return;

    const items =
      Array.from(
        gallery.querySelectorAll<HTMLElement>(
          "[data-gallery-item]"
        )
      );

    const observer =
      new IntersectionObserver(
        (entries) => {
          entries.forEach(
            (entry) => {
              if (
                entry.isIntersecting
              ) {
                entry.target.classList.add(
                  styles.visible
                );
              }
            }
          );
        },
        {
          threshold: 0.12,
          rootMargin:
            "0px 0px -10% 0px",
        }
      );

    items.forEach((item) => {
      observer.observe(item);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={galleryRef}
      className={styles.gallery}
    >
      {images.map(
        (image, index) => (
          <figure
            key={image.src}
            data-gallery-item
            className={styles.item}
          >
            <div
              className={styles.imageWrapper}
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={0}
                height={0}
                sizes="(max-width: 768px) 94vw, 90vw"
                className={styles.image}
              />
            </div>

            {image.caption && (
              <figcaption
                className={
                  styles.caption
                }
              >
                <span>
                  {String(
                    index + 1
                  ).padStart(2, "0")}
                </span>

                <span>
                  {image.caption}
                </span>
              </figcaption>
            )}
          </figure>
        )
      )}
    </section>
  );
}