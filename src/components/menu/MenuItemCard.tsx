
"use client";

import type { MenuItemType } from '@/types';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingCart, Edit3 } from 'lucide-react';
import { useCartStore } from '@/hooks/useCartStore.tsx';
import { useState } from 'react';
import ItemCustomizationDialog from './ItemCustomizationDialog';
import { useToast } from '@/hooks/use-toast';

interface MenuItemCardProps {
  item: MenuItemType;
}

export default function MenuItemCard({ item }: MenuItemCardProps) {
  const { addToCart } = useCartStore();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddToCartDirectly = () => {
    if (item.customizationOptions && item.customizationOptions.some(opt => opt.required)) {
      setIsDialogOpen(true); // Force customization if required options exist
    } else {
      addToCart(item, 1, []); // Add with no customizations or default ones if applicable
      toast({
        title: `${item.name} added to cart!`,
        description: "You can adjust quantity in your cart.",
        variant: "default",
      });
    }
  };

  return (
    <>
      <Card className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
        <div className="relative w-full h-48">
          <Image
            src={item.imageUrl}
            alt={item.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            data-ai-hint={item.dataAiHint || "food item"}
          />
        </div>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-headline group-hover:text-primary transition-colors">{item.name}</CardTitle>
          <CardDescription className="text-sm text-muted-foreground h-12 overflow-hidden text-ellipsis">
            {item.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-2xl font-bold text-primary">
            ₹{item.price.toFixed(0)}
          </p>
        </CardContent>
        <CardFooter className="grid grid-cols-2 gap-2 p-4 pt-0">
          {item.customizationOptions && item.customizationOptions.length > 0 ? (
            <Button variant="outline" onClick={() => setIsDialogOpen(true)} className="w-full">
              <Edit3 className="mr-2 h-4 w-4" /> Customize
            </Button>
          ) : (
             <div className="col-span-1"></div> 
          )}
          <Button onClick={handleAddToCartDirectly} className={`w-full ${!(item.customizationOptions && item.customizationOptions.length > 0) ? 'col-span-2' : ''}`}>
            <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
          </Button>
        </CardFooter>
      </Card>
      {item.customizationOptions && item.customizationOptions.length > 0 && (
        <ItemCustomizationDialog
          isOpen={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          item={item}
        />
      )}
    </>
  );
}
