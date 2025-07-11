'use client';
import FoodSpinner from '@/components/ui/FoodSpinner';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function GlobalLoadingOverlay() {
  const [loading, setLoading] = useState(true);
  const [routeLoading, setRouteLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setLoading(false); // Hide after initial mount
  }, []);

  // Show spinner briefly on route change
  useEffect(() => {
    if (!loading) {
      setRouteLoading(true);
      const timeout = setTimeout(() => setRouteLoading(false), 600); // 600ms spinner
      return () => clearTimeout(timeout);
    }
  }, [pathname, loading]);

  const showSpinner = loading || routeLoading;

  if (!showSpinner) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm transition-opacity animate-fade-in">
      <FoodSpinner size={96} />
    </div>
  );
} 