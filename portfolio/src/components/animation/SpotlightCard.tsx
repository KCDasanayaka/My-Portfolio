"use client";

import { useRef, MouseEvent, ReactNode, CSSProperties } from "react";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  spotlightColor?: string;
  spotlightSize?: number;
}

export default function SpotlightCard({
  children,
  className = "",
  style,
  spotlightColor = "rgba(44, 80, 247, 0.18)",
  spotlightSize = 350,
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !overlayRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    overlayRef.current.style.background = `radial-gradient(${spotlightSize}px circle at ${x}px ${y}px, ${spotlightColor}, transparent 70%)`;
    overlayRef.current.style.opacity = "1";
  };

  const handleMouseLeave = () => {
    if (!overlayRef.current) return;
    overlayRef.current.style.opacity = "0";
  };

  return (
    <div
      ref={cardRef}
      className={className}
      style={{ position: "relative", overflow: "hidden", ...style }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Spotlight overlay */}
      <div
        ref={overlayRef}
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0,
          pointerEvents: "none",
          zIndex: 1,
          transition: "opacity 0.3s ease",
          borderRadius: "inherit",
        }}
      />
      {/* Content above overlay */}
      <div style={{ position: "relative", zIndex: 2 }}>{children}</div>
    </div>
  );
}
