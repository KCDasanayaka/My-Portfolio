"use client";

import {
  useEffect,
  useState,
  type CSSProperties,
} from "react";
import styles from "../../styles/PortfolioPreloader.module.css";

const WORDS = [
  "Hello",
  "Ayubowan",
  "Hola",
  "Bonjour",
  "Ciao",
  "こんにちは",
  "مرحبا",
];

interface PortfolioPreloaderProps {
  onComplete: () => void;
}

type PreloaderPhase =
  | "words"
  | "cover"
  | "reveal";

export default function PortfolioPreloader({
  onComplete,
}: PortfolioPreloaderProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const [phase, setPhase] =
    useState<PreloaderPhase>("words");

  const currentWord = WORDS[wordIndex];
  const isArabic = currentWord === "مرحبا";

  /* Change displayed greeting */
  useEffect(() => {
    if (phase !== "words") {
      return;
    }

    if (wordIndex < WORDS.length - 1) {
      const wordTimer = window.setTimeout(() => {
        setWordIndex((current) => current + 1);
      }, 430);

      return () => {
        window.clearTimeout(wordTimer);
      };
    }

    /*
     * Keep the final greeting visible slightly longer
     * before starting the blue curtain animation.
     */
    const finalWordTimer = window.setTimeout(() => {
      setPhase("cover");
    }, 650);

    return () => {
      window.clearTimeout(finalWordTimer);
    };
  }, [wordIndex, phase]);

  /* Move from blue cover to page reveal */
  useEffect(() => {
    if (phase !== "cover") {
      return;
    }

    const coverTimer = window.setTimeout(() => {
      setPhase("reveal");
    }, 900);

    return () => {
      window.clearTimeout(coverTimer);
    };
  }, [phase]);

  /* Remove preloader after the blue curtain exits */
  useEffect(() => {
    if (phase !== "reveal") {
      return;
    }

    const revealTimer = window.setTimeout(() => {
      onComplete();
    }, 1050);

    return () => {
      window.clearTimeout(revealTimer);
    };
  }, [phase, onComplete]);

  return (
    <div
      className={[
        styles.preloader,
        phase === "cover" ? styles.coverPhase : "",
        phase === "reveal" ? styles.revealPhase : "",
      ].join(" ")}
      role="status"
      aria-live="polite"
      aria-label={`Loading portfolio. ${currentWord}`}
    >
      {/* Initial black background */}
      <div className={styles.blackBackground} />

      {/* Animated greeting */}
      <div className={styles.wordStage}>
        <div
          key={currentWord}
          className={styles.wordRow}
          dir={isArabic ? "rtl" : "ltr"}
          style={
            {
              "--word-index": wordIndex,
            } as CSSProperties
          }
        >
          <span
            className={styles.wordDot}
            aria-hidden="true"
          />

          <span className={styles.word}>
            {currentWord}
          </span>
        </div>
      </div>

      {/* Small progress indicator */}
      <div
        className={styles.progress}
        aria-hidden="true"
      >
        <span className={styles.progressCurrent}>
          {String(wordIndex + 1).padStart(2, "0")}
        </span>

        <span className={styles.progressDivider}>
          /
        </span>

        <span className={styles.progressTotal}>
          {String(WORDS.length).padStart(2, "0")}
        </span>
      </div>

      {/* Curved blue transition layer */}
      <div
        className={styles.blueCurtain}
        aria-hidden="true"
      />
    </div>
  );
}