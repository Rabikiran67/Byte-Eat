import React from 'react';

export default function FoodSpinner({ size = 64, className = '' }: { size?: number; className?: string }) {
  return (
    <div className={`flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="animate-spin-slow"
      >
        {/* Pizza slice base */}
        <path
          d="M32 6C18 8 8 20 8 34c0 10 8 18 24 24 16-6 24-14 24-24C56 20 46 8 32 6z"
          fill="#FFD580"
          stroke="#E09B3D"
          strokeWidth="2"
        />
        {/* Pizza crust */}
        <path
          d="M32 6c14 2 24 14 24 28 0 10-8 18-24 24"
          stroke="#E09B3D"
          strokeWidth="4"
          strokeLinecap="round"
        />
        {/* Cheese drips */}
        <ellipse cx="20" cy="32" rx="2" ry="3" fill="#FFF2B2" />
        <ellipse cx="44" cy="38" rx="2.5" ry="2" fill="#FFF2B2" />
        {/* Pepperoni */}
        <circle cx="24" cy="24" r="2.5" fill="#E94F37" />
        <circle cx="36" cy="28" r="2" fill="#E94F37" />
        <circle cx="40" cy="18" r="1.5" fill="#E94F37" />
        <circle cx="28" cy="38" r="1.5" fill="#E94F37" />
        {/* Shadow for depth */}
        <ellipse cx="32" cy="58" rx="16" ry="3" fill="#000" fillOpacity="0.08" />
      </svg>
    </div>
  );
} 