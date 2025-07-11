"use client";

import { useState, useEffect, useRef, useCallback } from 'react';

interface UseLazyLoadingOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

interface UseLazyLoadingReturn {
  isVisible: boolean;
  isLoaded: boolean;
  ref: React.RefObject<HTMLDivElement>;
  load: () => void;
}

export function useLazyLoading(options: UseLazyLoadingOptions = {}): UseLazyLoadingReturn {
  const {
    threshold = 0.1,
    rootMargin = '50px 0px',
    triggerOnce = true
  } = options;

  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const load = useCallback(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.disconnect();
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce]);

  return {
    isVisible,
    isLoaded,
    ref,
    load
  };
}

// Hook for lazy loading images with performance tracking
export function useLazyImage(src: string, priority = false) {
  const [isLoaded, setIsLoaded] = useState(priority);
  const [hasError, setHasError] = useState(false);
  const [loadTime, setLoadTime] = useState<number | null>(null);
  const startTime = useRef<number | null>(null);

  const handleLoad = useCallback(() => {
    if (startTime.current) {
      const endTime = performance.now();
      setLoadTime(endTime - startTime.current);
    }
    setIsLoaded(true);
  }, []);

  const handleError = useCallback(() => {
    setHasError(true);
    setIsLoaded(true);
  }, []);

  const startLoading = useCallback(() => {
    if (!isLoaded && !hasError) {
      startTime.current = performance.now();
    }
  }, [isLoaded, hasError]);

  return {
    isLoaded,
    hasError,
    loadTime,
    handleLoad,
    handleError,
    startLoading
  };
}

// Hook for lazy loading components with Suspense
export function useLazyComponent() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadComponent = useCallback(async (componentLoader: () => Promise<any>) => {
    try {
      setIsLoading(true);
      setError(null);
      await componentLoader();
      setIsLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load component'));
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    error,
    loadComponent
  };
} 