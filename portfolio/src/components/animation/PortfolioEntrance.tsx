"use client";

import {
  useCallback,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import PortfolioPreloader from "./PortfolioPreloader";
import styles from "../../styles/PortfolioEntrance.module.css";

interface PortfolioEntranceProps {
  children: ReactNode;
}

const SHOW_ONCE_PER_SESSION = true;
const STORAGE_KEY = "portfolio-preloader-seen";

export default function PortfolioEntrance({
  children,
}: PortfolioEntranceProps) {
  /*
   * Start with the preloader visible.
   * This prevents the portfolio from flashing before hydration.
   */
  const [showPreloader, setShowPreloader] = useState(true);
  const [sessionChecked, setSessionChecked] = useState(false);

  useEffect(() => {
    if (!SHOW_ONCE_PER_SESSION) {
      setSessionChecked(true);
      return;
    }

    try {
      const alreadySeen =
        window.sessionStorage.getItem(STORAGE_KEY) === "true";

      if (alreadySeen) {
        setShowPreloader(false);
      }
    } catch {
      /*
       * Keep the preloader visible when sessionStorage
       * is unavailable.
       */
    } finally {
      setSessionChecked(true);
    }
  }, []);

  /*
   * Prevent page scrolling while the loading screen is active.
   */
  useEffect(() => {
    if (!showPreloader) {
      return;
    }

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow =
      document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow =
        previousHtmlOverflow;
    };
  }, [showPreloader]);

  const handlePreloaderComplete = useCallback(() => {
    if (SHOW_ONCE_PER_SESSION) {
      try {
        window.sessionStorage.setItem(STORAGE_KEY, "true");
      } catch {
        // Ignore storage errors.
      }
    }

    setShowPreloader(false);
  }, []);

  return (
    <div className={styles.entranceRoot}>
      {/* Portfolio content */}
      <div
        className={[
          styles.portfolioContent,
          showPreloader || !sessionChecked
            ? styles.portfolioHidden
            : styles.portfolioVisible,
        ].join(" ")}
        aria-hidden={showPreloader || !sessionChecked}
      >
        {children}
      </div>

      {/* Loading screen */}
      {showPreloader && (
        <PortfolioPreloader
          onComplete={handlePreloaderComplete}
        />
      )}
    </div>
  );
}