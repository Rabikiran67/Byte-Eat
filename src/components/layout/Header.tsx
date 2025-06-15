
"use client";

import Link from 'next/link';
import { ShoppingCart, UtensilsCrossed } from 'lucide-react';
import { useCartStore } from '@/hooks/useCartStore.tsx';
import { Badge } from '@/components/ui/badge';

export default function Header() {
  const { getItemCount } = useCartStore();
  const itemCount = getItemCount();

  return (
    <header className="bg-primary text-primary-foreground shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-2 sm:px-4 py-2 sm:py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-1 sm:gap-2 hover:opacity-80 transition-opacity">
          <UtensilsCrossed size={28} className="sm:size-8" />
          <h1 className="text-2xl sm:text-3xl font-bold font-headline">ByteEat</h1>
        </Link>
        <nav>
          <Link href="/cart" className="relative flex items-center gap-1 sm:gap-2 hover:bg-primary/80 p-1 sm:p-2 rounded-md transition-colors" aria-label={`View Cart, ${itemCount} items`}>
            <ShoppingCart size={24} className="sm:size-7" />
            <span className="hidden sm:inline text-sm sm:text-base">Cart</span>
            {itemCount > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-accent text-accent-foreground rounded-full h-5 w-5 sm:h-6 sm:w-6 flex items-center justify-center text-xs"
              >
                {itemCount}
              </Badge>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
