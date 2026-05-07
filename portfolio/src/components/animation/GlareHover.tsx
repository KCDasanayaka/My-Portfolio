"use client";

import { useRef, MouseEvent, ReactNode, CSSProperties } from "react";

interface GlareHoverProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  maxTilt?: number;           // degrees
  glareColor?: string;
  glareOpacity?: number;
  glareAngle?: number;        // base glare sweep angle deg
  scale?: number;
  transitionDuration?: number;
}

export default function GlareHover({
  children,
  className = "",
  style,
  maxTilt = 12,
  glareColor = "255,255,255",
  glareOpacity = 0.2,
  glareAngle = 45,
  scale = 1.03,
  transitionDuration = 400,
}: GlareHoverProps) {
  const cardRef  = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const isOver   = useRef(false);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    const glare = glareRef.current;
    if (!card || !glare) return;

    const rect = card.getBoundingClientRect();
    const cx = rect.width  / 2;
    const cy = rect.height / 2;
    const dx = e.clientX - rect.left - cx;
    const dy = e.clientY - rect.top  - cy;

    const rotX = (-dy / cy) * maxTilt;
    const rotY = ( dx / cx) * maxTilt;

    // Glare position: follows mouse
    const glareX = ((e.clientX - rect.left) / rect.width)  * 100;
    const glareY = ((e.clientY - rect.top)  / rect.height) * 100;

    card.style.transform  = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(${scale})`;
    card.style.transition = "none";

    glare.style.background = `
      radial-gradient(
        circle at ${glareX}% ${glareY}%,
        rgba(${glareColor}, ${glareOpacity}) 0%,
        transparent 60%
      )
    `;
    glare.style.opacity = "1";
  };

  const onEnter = () => {
    isOver.current = true;
    const card = cardRef.current;
    if (card) card.style.transition = "none";
  };

  const onLeave = () => {
    isOver.current = false;
    const card  = cardRef.current;
    const glare = glareRef.current;
    if (!card || !glare) return;
    card.style.transition  = `transform ${transitionDuration}ms cubic-bezier(0.23,1,0.32,1)`;
    card.style.transform   = "perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)";
    glare.style.opacity    = "0";
  };

  return (
    <div
      ref={cardRef}
      className={className}
      style={{
        position: "relative",
        willChange: "transform",
        transformStyle: "preserve-3d",
        ...style,
      }}
      onMouseMove={onMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {/* Glare overlay */}
      <div
        ref={glareRef}
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0,
          pointerEvents: "none",
          zIndex: 10,
          borderRadius: "inherit",
          transition: `opacity 0.3s ease`,
        }}
      />
      {children}
    </div>
  );
}
