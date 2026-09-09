"use client";

import { useEffect, useRef } from "react";
import styles from "../../styles/CursorFollower.module.css";

export default function CursorFollower() {
  const cursorRef = useRef<HTMLDivElement>(null);

  const mouseX = useRef(0);
  const mouseY = useRef(0);

  const currentX = useRef(0);
  const currentY = useRef(0);

  const animationFrame = useRef<number | null>(null);

  useEffect(() => {
    const cursor = cursorRef.current;

    if (!cursor) return;

    // Don't run on touch devices
    const isTouchDevice =
      window.matchMedia("(pointer: coarse)").matches;

    if (isTouchDevice) {
      cursor.style.display = "none";
      return;
    }

    cursor.classList.add(styles.visible);

    const moveCursor = (event: MouseEvent) => {
      mouseX.current = event.clientX;
      mouseY.current = event.clientY;
    };

    const animate = () => {
      // Smooth interpolation
      currentX.current +=
        (mouseX.current - currentX.current) * 0.18;

      currentY.current +=
        (mouseY.current - currentY.current) * 0.18;

      cursor.style.transform = `
        translate3d(
          ${currentX.current}px,
          ${currentY.current}px,
          0
        )
        translate(-50%, -50%)
      `;

      animationFrame.current =
        requestAnimationFrame(animate);
    };

    const handleMouseOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      const interactable =
        target.closest("[data-cursor], a, button");

      if (interactable) {
        cursor.classList.add(styles.isActive);

        const cursorType =
          interactable.getAttribute("data-cursor");

        cursor.setAttribute(
          "data-type",
          cursorType || "link"
        );
      }
    };

    const handleMouseOut = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      const interactable =
        target.closest("[data-cursor], a, button");

      if (
        interactable &&
        event.relatedTarget instanceof Node &&
        interactable.contains(event.relatedTarget)
      ) {
        return;
      }

      cursor.classList.remove(styles.isActive);
      cursor.setAttribute("data-type", "");
    };

    window.addEventListener(
      "mousemove",
      moveCursor
    );

    window.addEventListener(
      "mouseover",
      handleMouseOver
    );

    window.addEventListener(
      "mouseout",
      handleMouseOut
    );

    animationFrame.current =
      requestAnimationFrame(animate);

    return () => {
      window.removeEventListener(
        "mousemove",
        moveCursor
      );

      window.removeEventListener(
        "mouseover",
        handleMouseOver
      );

      window.removeEventListener(
        "mouseout",
        handleMouseOut
      );

      if (animationFrame.current) {
        cancelAnimationFrame(
          animationFrame.current
        );
      }
    };
  }, []);

  return (
  <div
    ref={cursorRef}
    className={styles.cursor}
    data-type=""
    aria-hidden="true"
  >
    <svg
      className={styles.arrow}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 19L19 5"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      <path
        d="M8 5H19V16"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </div>
);
}