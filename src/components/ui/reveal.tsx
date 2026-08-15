"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

type RevealVariant = "up" | "fade" | "left" | "right";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Motion style — keep subtle so layout stays intact. */
  variant?: RevealVariant;
  /** Extra delay in ms after the element enters view. */
  delay?: number;
  as?: ElementType;
  /** Fraction of element that must be visible (0–1). */
  threshold?: number;
};

/**
 * One-shot scroll reveal. Uses opacity + tiny translate only —
 * no height animation, so design and layout stay stable.
 */
export function Reveal({
  children,
  className,
  variant = "up",
  delay = 0,
  as: Tag = "div",
  threshold = 0.18,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    // Already in view on mount (above-the-fold) — reveal immediately
    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setVisible(true);
        observer.disconnect();
      },
      {
        threshold,
        rootMargin: "0px 0px -6% 0px",
      },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <Tag
      ref={ref}
      className={cn(
        "reveal",
        `reveal--${variant}`,
        visible && "reveal--in",
        className,
      )}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}

type RevealItemProps = {
  children: ReactNode;
  className?: string;
  variant?: RevealVariant;
  index?: number;
  as?: ElementType;
};

/** Child item for staggered groups — delay from index. */
export function RevealItem({
  children,
  className,
  variant = "up",
  index = 0,
  as: Tag = "div",
}: RevealItemProps) {
  return (
    <Reveal
      as={Tag}
      variant={variant}
      delay={index * 70}
      className={className}
    >
      {children}
    </Reveal>
  );
}
