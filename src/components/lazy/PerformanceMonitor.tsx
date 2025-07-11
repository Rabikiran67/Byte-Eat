"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface PerformanceMetrics {
  totalImages: number;
  loadedImages: number;
  failedImages: number;
  averageLoadTime: number;
  totalLoadTime: number;
}

export default function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    totalImages: 0,
    loadedImages: 0,
    failedImages: 0,
    averageLoadTime: 0,
    totalLoadTime: 0
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show in development mode and ensure we're on client side
    if (process.env.NODE_ENV !== 'development' || typeof window === 'undefined') {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('performance-monitor');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const updateMetrics = () => {
      // Get all lazy images
      const lazyImages = document.querySelectorAll('[data-lazy-image]');
      const loadedImages = document.querySelectorAll('[data-lazy-image][data-loaded="true"]');
      const failedImages = document.querySelectorAll('[data-lazy-image][data-error="true"]');
      
      // Calculate load times
      const loadTimes: number[] = [];
      loadedImages.forEach((img) => {
        const loadTime = img.getAttribute('data-load-time');
        if (loadTime) {
          loadTimes.push(parseFloat(loadTime));
        }
      });

      const totalLoadTime = loadTimes.reduce((sum, time) => sum + time, 0);
      const averageLoadTime = loadTimes.length > 0 ? totalLoadTime / loadTimes.length : 0;

      setMetrics({
        totalImages: lazyImages.length,
        loadedImages: loadedImages.length,
        failedImages: failedImages.length,
        averageLoadTime,
        totalLoadTime
      });
    };

    // Update metrics every second when visible
    const interval = setInterval(updateMetrics, 1000);
    updateMetrics(); // Initial update

    return () => clearInterval(interval);
  }, [isVisible]);

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div id="performance-monitor" className="fixed bottom-4 right-4 z-50">
      <Card className="w-80 bg-background/95 backdrop-blur-sm border-2">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            🚀 Performance Monitor
            <Badge className="text-xs border border-input bg-background">
              Dev Mode
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-xs">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <span className="text-muted-foreground">Total Images:</span>
              <span className="ml-1 font-semibold">{metrics.totalImages}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Loaded:</span>
              <span className="ml-1 font-semibold text-green-600">{metrics.loadedImages}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Failed:</span>
              <span className="ml-1 font-semibold text-red-600">{metrics.failedImages}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Success Rate:</span>
              <span className="ml-1 font-semibold">
                {metrics.totalImages > 0 
                  ? `${((metrics.loadedImages / metrics.totalImages) * 100).toFixed(1)}%`
                  : '0%'
                }
              </span>
            </div>
          </div>
          <div className="pt-1 border-t">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Avg Load Time:</span>
              <span className="font-semibold">{metrics.averageLoadTime.toFixed(0)}ms</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Load Time:</span>
              <span className="font-semibold">{metrics.totalLoadTime.toFixed(0)}ms</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 