'use client';
import { useEffect, useState } from 'react';

export default function Footer() {
  const [currentYear, setCurrentYear] = useState<number | null>(null);
  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);
  return (
    <footer className="bg-gray-900 text-white py-6 text-center">
      <div className="container mx-auto px-4">
        <p className="text-sm">
          &copy; {currentYear ?? ''} ByteEat. All rights reserved with RK.
        </p>
        <p className="text-xs mt-1">
          Enjoy your meal!
        </p>
      </div>
    </footer>
  );
}
