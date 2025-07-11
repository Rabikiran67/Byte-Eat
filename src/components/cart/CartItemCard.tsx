
"use client";

import type { CartItemType } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCartStore } from '@/hooks/useCartStore';
import LazyImage from '@/components/lazy/LazyImage';

interface CartItemCardProps {
  item: CartItemType;
}

export default function CartItemCard({ item }: CartItemCardProps) {
  const { updateQuantity, removeFromCart, generateCustomizationSignature } = useCartStore();
  const customizationSignature = generateCustomizationSignature(item.selectedCustomizations);

  const handleQuantityChange = (newQuantity: number) => {
    const quantity = Math.max(0, newQuantity); // Ensure quantity is not negative
    updateQuantity(item.id, customizationSignature, quantity);
  };

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 p-2 sm:p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow bg-card">
      <LazyImage
        src={item.imageUrl}
        alt={item.name}
        width={64}
        height={64}
        className="rounded-md object-cover w-full h-32 sm:w-20 sm:h-20 self-center sm:self-auto"
        data-ai-hint={item.dataAiHint || "food item"}
      />
      <div className="flex-grow py-1 sm:py-0">
        <h3 className="text-md sm:text-lg font-semibold font-headline text-primary">{item.name}</h3>
        {item.selectedCustomizations && item.selectedCustomizations.length > 0 && (
          <ul className="text-xs text-muted-foreground list-disc list-inside mt-0.5">
            {item.selectedCustomizations.map(cust => (
              <li key={`${cust.optionId}-${cust.choiceName}`}>
                {cust.optionName}: {cust.choiceName} 
                {cust.priceModifier !== 0 && ` (${cust.priceModifier > 0 ? '+' : ''}₹${cust.priceModifier.toFixed(0)})`}
              </li>
            ))}
          </ul>
        )}
        <p className="text-xs sm:text-sm text-foreground mt-0.5 sm:mt-1">
          Unit Price: ₹{item.finalPrice.toFixed(0)}
        </p>
      </div>
      <div className="flex items-center justify-between sm:justify-start gap-1 sm:gap-2 mt-2 sm:mt-0">
        <div className="flex items-center gap-1">
          <Button
            onClick={() => handleQuantityChange(item.quantity - 1)}
            aria-label={`Decrease quantity of ${item.name}`}
            disabled={item.quantity <= 1}
            className="h-8 w-8 sm:h-9 sm:w-9 border border-input bg-background hover:bg-accent hover:text-accent-foreground"
          >
            <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
          <Input
            type="number"
            value={item.quantity}
            onChange={(e) => handleQuantityChange(parseInt(e.target.value, 10))}
            className="w-12 h-8 sm:w-14 sm:h-9 text-center text-sm"
            aria-label={`Quantity of ${item.name}`}
            min="1"
          />
          <Button
            onClick={() => handleQuantityChange(item.quantity + 1)}
            aria-label={`Increase quantity of ${item.name}`}
            className="h-8 w-8 sm:h-9 sm:w-9 border border-input bg-background hover:bg-accent hover:text-accent-foreground"
          >
            <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
        </div>
        <p className="w-auto sm:w-20 text-right font-semibold text-md sm:text-lg text-primary ml-2 sm:ml-0">
          ₹{(item.finalPrice * item.quantity).toFixed(0)}
        </p>
        <Button
          className="text-destructive hover:bg-destructive/10 h-8 w-8 sm:h-9 sm:w-9 ml-1 sm:ml-2"
          onClick={() => removeFromCart(item.id, customizationSignature)}
          aria-label={`Remove ${item.name} from cart`}
        >
          <Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
        </Button>
      </div>
    </div>
  );
}
