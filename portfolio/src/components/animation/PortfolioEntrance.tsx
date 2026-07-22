"use client";

import {
  useCallback,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import PortfolioPreloader from "./PortfolioPreloader";

interface PortfolioEntranceProps {
  children: ReactNode;
}

/*
 * Change this to false when you need the preloader
 * to run after every refresh.
 */
const SHOW_ONCE_PER_SESSION = true;

const STORAGE_KEY = "portfolio-preloader-seen";

export default function PortfolioEntrance({
  children,
}: PortfolioEntranceProps) {
  const [isCheckingSession, setIsCheckingSession] =
    useState(true);

  const [showPreloader, setShowPreloader] =
    useState(false);

  useEffect(() => {
    if (!SHOW_ONCE_PER_SESSION) {
      setShowPreloader(true);
      setIsCheckingSession(false);
      return;
    }

    try {
      const alreadySeen =
        window.sessionStorage.getItem(STORAGE_KEY);

      setShowPreloader(alreadySeen !== "true");
    } catch {
      /*
       * Show the preloader when browser storage
       * is unavailable.
       */
      setShowPreloader(true);
    }

    setIsCheckingSession(false);
  }, []);

  /* Lock page scrolling while loading */
  useEffect(() => {
    if (isCheckingSession || !showPreloader) {
      return;
    }

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow =
        previousOverflow;
    };
  }, [isCheckingSession, showPreloader]);

  const handlePreloaderComplete =
    useCallback(() => {
      if (SHOW_ONCE_PER_SESSION) {
        try {
          window.sessionStorage.setItem(
            STORAGE_KEY,
            "true",
          );
        } catch {
          // Storage may be disabled.
        }
      }

      setShowPreloader(false);
    }, []);

  return (
    <>
      <div
        aria-hidden={
          showPreloader || isCheckingSession
        }
      >
        {children}
      </div>

      {!isCheckingSession && showPreloader && (
        <PortfolioPreloader
          onComplete={handlePreloaderComplete}
        />
      )}
    </>
  );
}