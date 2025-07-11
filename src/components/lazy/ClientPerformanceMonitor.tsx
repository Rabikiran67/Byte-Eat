"use client";

import dynamic from 'next/dynamic';

const PerformanceMonitor = dynamic(() => import('@/components/lazy/PerformanceMonitor'), {
  ssr: false
});

export default function ClientPerformanceMonitor() {
  return <PerformanceMonitor />;
} 