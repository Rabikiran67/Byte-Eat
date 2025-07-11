"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';

interface LazyImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  onLoad?: () => void;
  onError?: () => void;
  [key: string]: any; // Allow additional props like data-ai-hint
}

export default function LazyImage({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
  onLoad,
  onError,
  ...props
}: LazyImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const startTime = useRef<number | null>(null);

  useEffect(() => {
    if (priority || typeof window === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          startTime.current = performance.now();
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px 0px',
        threshold: 0.1
      }
    );

    const element = document.getElementById(`lazy-image-${src}`);
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [src, priority]);

  const handleLoad = () => {
    setIsLoading(false);
    const loadTime = performance.now() - (startTime.current || 0);
    
    // Add performance tracking attributes
    if (typeof window !== 'undefined') {
      const imgElement = document.querySelector(`[data-lazy-image="${src}"]`);
      if (imgElement) {
        imgElement.setAttribute('data-loaded', 'true');
        imgElement.setAttribute('data-load-time', loadTime.toString());
      }
    }
    
    onLoad?.();
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    
    // Add error tracking
    if (typeof window !== 'undefined') {
      const imgElement = document.querySelector(`[data-lazy-image="${src}"]`);
      if (imgElement) {
        imgElement.setAttribute('data-error', 'true');
      }
    }
    
    onError?.();
  };

  if (hasError) {
    return (
      <div 
        className={`flex items-center justify-center bg-muted ${className}`}
        style={{ width, height }}
      >
        <span className="text-muted-foreground text-sm">Image unavailable</span>
      </div>
    );
  }

  if (!isInView) {
    return (
      <div id={`lazy-image-${src}`} className={className} data-lazy-image={src}>
        <Skeleton className="w-full h-full" />
      </div>
    );
  }

  return (
    <div className={`relative ${className}`} data-lazy-image={src}>
      {isLoading && (
        <Skeleton className="absolute inset-0 z-10" />
      )}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'} w-full h-full object-cover rounded-lg`}
        onLoad={handleLoad}
        onError={handleError}
        loading={priority ? 'eager' : 'lazy'}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        style={{ height: 'auto' }}
        {...props}
      />
    </div>
  );
} 