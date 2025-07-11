"use client";

import { Suspense, lazy, ComponentType } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface LazyPageProps {
  component: () => Promise<{ default: ComponentType<any> }>;
  fallback?: React.ReactNode;
  className?: string;
}

export default function LazyPage({ 
  component, 
  fallback,
  className = "" 
}: LazyPageProps) {
  const LazyComponent = lazy(component);

  const defaultFallback = (
    <div className={`w-full ${className}`}>
      <div className="space-y-4">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-64 w-full" />
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <Suspense fallback={fallback || defaultFallback}>
      <LazyComponent />
    </Suspense>
  );
}

// Predefined lazy page components for common pages
export const LazyMenuPage = () => import('@/app/menu/page');
export const LazyCartPage = () => import('@/app/cart/page');
export const LazyCheckoutPage = () => import('@/app/checkout/page');
export const LazyConfirmationPage = () => import('@/app/confirmation/page'); 