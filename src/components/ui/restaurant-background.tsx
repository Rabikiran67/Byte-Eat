"use client";
import React, { useEffect, useState } from "react";

interface Dot {
  left: number;
  top: number;
  delay: number;
  duration: number;
}

export default function RestaurantBackground() {
  const [dots, setDots] = useState<Dot[]>([]);

  useEffect(() => {
    // Only runs on client
    const newDots: Dot[] = Array.from({ length: 20 }).map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 4,
    }));
    setDots(newDots);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Animated background gradient (light & dark) */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-orange-50 animate-pulse dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-950 dark:to-gray-800" />
      
      {/* Floating food icons with enhanced animations */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Top section */}
        <div className="food-emoji absolute top-10 left-10 text-4xl drop-shadow-lg dark:drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]" style={{ animationDelay: '0s' }}>🍕</div>
        <div className="food-emoji absolute top-20 right-20 text-3xl drop-shadow-lg dark:drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]" style={{ animationDelay: '1s' }}>🍜</div>
        <div className="food-emoji absolute top-40 left-1/4 text-2xl drop-shadow-lg dark:drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]" style={{ animationDelay: '2s' }}>🍣</div>
        <div className="food-emoji absolute top-60 right-1/3 text-3xl drop-shadow-lg dark:drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]" style={{ animationDelay: '3s' }}>🍔</div>
        <div className="food-emoji absolute top-80 left-1/3 text-2xl drop-shadow-lg dark:drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]" style={{ animationDelay: '4s' }}>🍛</div>
        <div className="food-emoji absolute top-32 right-1/4 text-3xl drop-shadow-lg dark:drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]" style={{ animationDelay: '5s' }}>🥘</div>
        {/* Middle section */}
        <div className="food-emoji absolute top-1/2 left-10 text-2xl drop-shadow-lg dark:drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]" style={{ animationDelay: '0.5s' }}>🥗</div>
        <div className="food-emoji absolute top-1/2 right-10 text-3xl drop-shadow-lg dark:drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]" style={{ animationDelay: '1.5s' }}>🍖</div>
        <div className="food-emoji absolute top-1/3 left-1/2 text-2xl drop-shadow-lg dark:drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]" style={{ animationDelay: '2.5s' }}>🍗</div>
        <div className="food-emoji absolute top-2/3 right-1/2 text-3xl drop-shadow-lg dark:drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]" style={{ animationDelay: '3.5s' }}>🥩</div>
        {/* Bottom section */}
        <div className="food-emoji absolute bottom-20 left-20 text-3xl drop-shadow-lg dark:drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]" style={{ animationDelay: '0.5s' }}>🍰</div>
        <div className="food-emoji absolute bottom-40 right-1/4 text-2xl drop-shadow-lg dark:drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]" style={{ animationDelay: '1.5s' }}>🍦</div>
        <div className="food-emoji absolute bottom-60 left-1/3 text-3xl drop-shadow-lg dark:drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]" style={{ animationDelay: '2.5s' }}>☕</div>
        <div className="food-emoji absolute bottom-80 right-1/3 text-2xl drop-shadow-lg dark:drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]" style={{ animationDelay: '3.5s' }}>🍹</div>
        <div className="food-emoji absolute bottom-32 left-1/2 text-2xl drop-shadow-lg dark:drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]" style={{ animationDelay: '4.5s' }}>🍪</div>
        <div className="food-emoji absolute bottom-50 right-1/2 text-3xl drop-shadow-lg dark:drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]" style={{ animationDelay: '5.5s' }}>🧁</div>
      </div>
      {/* Subtle pattern overlay (light & dark) */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231E88E5' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>
      {/* Animated gradient overlay (light & dark) */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-100/20 to-transparent animate-pulse dark:bg-gradient-to-r dark:from-transparent dark:via-gray-800/40 dark:to-transparent" />
      {/* Interactive floating dots (client only, visible in both modes) */}
      <div className="absolute inset-0">
        {dots.map((dot, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full animate-float bg-primary/30 dark:bg-white/20"
            style={{
              left: `${dot.left}%`,
              top: `${dot.top}%`,
              animationDelay: `${dot.delay}s`,
              animationDuration: `${dot.duration}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
} 