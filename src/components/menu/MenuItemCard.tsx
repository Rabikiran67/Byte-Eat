
"use client";

import type { MenuItemType } from '@/types';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Edit3 } from 'lucide-react';
import { useCartStore } from '@/hooks/useCartStore';
import { useState } from 'react';
import ItemCustomizationDialog from './ItemCustomizationDialog';
import { useToast } from '@/hooks/use-toast';
import LazyImage from '@/components/lazy/LazyImage';

interface MenuItemCardProps {
  item: MenuItemType;
  priority?: boolean;
}

export default function MenuItemCard({ item, priority = false }: MenuItemCardProps) {
  const { addToCart } = useCartStore();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddToCartDirectly = () => {
    if (item.customizationOptions && item.customizationOptions.some(opt => opt.required)) {
      setIsDialogOpen(true);
    } else {
      addToCart(item, 1, []);
      toast({
        title: `${item.name} added to cart!`,
        description: "You can adjust quantity in your cart.",
        variant: "default",
      });
    }
  };

  const imageUnavailable = !item.imageUrl;

  return (
    <div className="h-full min-h-[340px] sm:min-h-[380px] bg-gray-900 text-white rounded-2xl shadow-md p-4 w-full max-w-xs mx-auto flex flex-col items-center">
      {/* Image section */}
      <div className="bg-gray-800 h-48 w-full flex items-center justify-center rounded-lg mb-4 overflow-hidden">
        {imageUnavailable ? (
          <span className="text-gray-400">Image unavailable</span>
        ) : (
          <LazyImage
            src={item.imageUrl}
            alt={item.name}
            width={400}
            height={192}
            className="w-full h-full object-cover rounded-lg"
            data-ai-hint={item.dataAiHint || "food item"}
            priority={priority}
          />
        )}
      </div>

      {/* Text section */}
      <div className="flex-1 flex flex-col items-center justify-center text-center w-full">
        <h3 className="text-xl font-semibold mb-1">{item.name}</h3>
        <p className="text-sm text-gray-400 mb-2">
          {item.description}
        </p>
        <p className="text-lg text-cyan-400 font-semibold">₹{item.price.toFixed(0)}</p>
      </div>

      {/* Button */}
      <div className="w-full flex flex-col gap-2 mt-4">
        {item.customizationOptions && item.customizationOptions.length > 0 && (
          <Button onClick={() => setIsDialogOpen(true)} className="w-full border border-input bg-background hover:bg-accent hover:text-accent-foreground min-h-[40px] py-2 rounded-lg text-sm flex items-center justify-center">
            <Edit3 className="mr-2 h-4 w-4" /> Customize
          </Button>
        )}
        <Button
          onClick={handleAddToCartDirectly}
          className="w-full bg-yellow-400 text-black font-semibold py-2 px-4 rounded-lg flex items-center justify-center hover:bg-yellow-300 transition min-h-[40px] text-base"
        >
          <ShoppingCart className="w-5 h-5 mr-2" /> Add to Cart
        </Button>
      </div>

      {item.customizationOptions && item.customizationOptions.length > 0 && (
        <ItemCustomizationDialog
          isOpen={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          item={item}
        />
      )}
    </div>
  );
}
