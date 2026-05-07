"use client";

import {
  useRef,
  useEffect,
  useState,
  ReactNode,
  CSSProperties,
} from "react";

interface ScrollStackItemProps {
  children: ReactNode;
  index: number;
  total: number;
  activeIndex: number;
}

function ScrollStackItem({
  children,
  index,
  total,
  activeIndex,
}: ScrollStackItemProps) {
  const isActive   = index === activeIndex;
  const isPast     = index < activeIndex;
  const isFuture   = index > activeIndex;
  const stackDepth = index - activeIndex; // positive = in front

  // Cards behind stack up with slight scale+translate
  const scale     = isPast ? 1 - (activeIndex - index) * 0.04 : 1;
  const translateY = isPast
    ? -(activeIndex - index) * 12   // stack peek above
    : isFuture
    ? 0                              // waiting below (scrolled into view)
    : 0;
  const opacity = isPast
    ? Math.max(0, 1 - (activeIndex - index) * 0.25)
    : 1;
  const zIndex = total - Math.abs(stackDepth);

  return (
    <div
      style={{
        position: "sticky",
        top: `${80 + index * 8}px`,
        zIndex,
        transform: `scale(${scale}) translateY(${translateY}px)`,
        opacity,
        transition: "transform 0.4s cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s ease",
        transformOrigin: "top center",
        marginBottom: "2px",
      }}
    >
      {children}
    </div>
  );
}

/* ── Container ── */
interface ScrollStackProps {
  items: {
    id: string | number;
    content: ReactNode;
    style?: CSSProperties;
  }[];
  className?: string;
}

export default function ScrollStack({ items, className = "" }: ScrollStackProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cards = Array.from(
      container.querySelectorAll("[data-scroll-card]")
    ) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute("data-index"));
            setActiveIndex(idx);
          }
        });
      },
      { root: null, threshold: 0.55 }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [items]);

  return (
    <div ref={containerRef} className={className} style={{ position: "relative" }}>
      {items.map((item, i) => (
        <div key={item.id} data-scroll-card data-index={i}>
          <ScrollStackItem
            index={i}
            total={items.length}
            activeIndex={activeIndex}
          >
            <div style={item.style}>{item.content}</div>
          </ScrollStackItem>
        </div>
      ))}
    </div>
  );
}
