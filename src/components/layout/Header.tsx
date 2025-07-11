
"use client";

import Link from 'next/link';
import { ShoppingCart, UtensilsCrossed, Sun, Moon, QrCode } from 'lucide-react';
import { useCartStore } from '@/hooks/useCartStore';
import { Badge } from '@/components/ui/badge';
import { useEffect, useState } from 'react';
import { useAdmin } from '@/contexts/AdminContext';
import AdminLogin from '@/components/admin/AdminLogin';
import { usePathname } from 'next/navigation';

function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // On mount, check localStorage or system preference
    const saved = localStorage.getItem('theme');
    if (saved === 'dark' || !saved) { // Default to dark if not set
      document.documentElement.classList.add('dark');
      setIsDark(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    }
  }, []);

  const toggle = () => {
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/10 text-white transition-colors duration-200 hover:bg-white/20 border border-black"
      type="button"
    >
      {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
}

export default function Header() {
  const { getItemCount } = useCartStore();
  const { isAdmin } = useAdmin();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  const itemCount = mounted ? getItemCount() : 0;
  
  // Only show admin login on home page
  const isHomePage = pathname === '/';
  const isMenuPage = pathname === '/menu';

  return (
    <header className="bg-gray-900 text-white sticky top-0 z-50">
      <div className="container mx-auto px-2 sm:px-4 py-2 sm:py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-1 sm:gap-2 hover:opacity-80 transition-opacity">
          <UtensilsCrossed size={28} />
          <h1 className="text-2xl sm:text-3xl font-bold font-headline">ByteEat</h1>
        </Link>
        <nav className="flex items-center gap-2">
          {isAdmin && (
            <Link href="/qr-generator" className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gray-800 text-white font-semibold transition-colors duration-200 hover:bg-gray-700">
              <QrCode className="w-5 h-5" />
              QR Generator
            </Link>
          )}
          {isHomePage && <AdminLogin />}
          <DarkModeToggle />
          {isMenuPage && (
            <Link href="/cart" className="relative flex items-center gap-2 px-5 py-2 rounded-xl bg-gray-800 text-white font-semibold transition-colors duration-200 hover:bg-gray-700" aria-label={`View Cart, ${itemCount} items`}>
              <ShoppingCart className="w-5 h-5" />
              Cart
              {mounted && itemCount > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-6 w-6 flex items-center justify-center text-xs font-bold shadow-lg">
                  {itemCount}
                </Badge>
              )}
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
