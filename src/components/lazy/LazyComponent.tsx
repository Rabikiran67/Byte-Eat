"use client";

import React, { useState, useEffect, useRef, ReactNode } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface LazyComponentProps {
  children: ReactNode;
  fallback?: ReactNode;
  threshold?: number;
  rootMargin?: string;
  className?: string;
  height?: string | number;
}

export default function LazyComponent({
  children,
  fallback,
  threshold = 0.1,
  rootMargin = '50px 0px',
  className = "",
  height
}: LazyComponentProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const defaultFallback = (
    <div className={className} style={{ height }}>
      <Skeleton className="w-full h-full" />
    </div>
  );

  if (!isVisible) {
    return (
      <div ref={ref} className={className} style={{ height }}>
        {fallback || defaultFallback}
      </div>
    );
  }

  return (
    <div className={className} style={{ height }}>
      {children}
    </div>
  );
} 