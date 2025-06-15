
"use client";

import CartItemCard from '@/components/cart/CartItemCard';
import { useCartStore } from '@/hooks/useCartStore.tsx';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { ShoppingCart, Trash2, ArrowRight, ArrowLeft, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

export default function CartPage() {
  const { items, getCartTotal, clearCart, getItemCount } = useCartStore();
  const total = getCartTotal();
  const itemCount = getItemCount();
  const [tableNumber, setTableNumber] = useState('');
  const [tableNumberError, setTableNumberError] = useState('');
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const storedTableNumber = localStorage.getItem('tableNumber');
    if (storedTableNumber) {
      setTableNumber(storedTableNumber);
    }
  }, []);

  const handleProceedToCheckout = () => {
    if (!tableNumber.trim()) {
      setTableNumberError('Please enter your table number.');
      toast({
        title: 'Table Number Required',
        description: 'Please enter your table number before proceeding.',
        variant: 'destructive',
      });
      return;
    }
    setTableNumberError('');
    localStorage.setItem('tableNumber', tableNumber.trim());
    router.push('/checkout');
  };

  if (itemCount === 0) {
    return (
      <div className="text-center py-12 sm:py-20">
        <ShoppingCart className="mx-auto h-20 w-20 sm:h-24 sm:w-24 text-muted-foreground mb-4 sm:mb-6" />
        <h1 className="text-3xl sm:text-4xl font-bold font-headline text-primary mb-3 sm:mb-4">Your Cart is Empty</h1>
        <p className="text-md sm:text-lg text-muted-foreground mb-6 sm:mb-8">
          Looks like you haven't added any items to your cart yet.
        </p>
        <Link href="/menu" passHref>
          <Button size="lg" className="shadow-lg text-sm sm:text-base">
            <ArrowLeft className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
            Start Ordering
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="text-center">
        <h1 className="text-3xl sm:text-5xl font-bold font-headline text-primary">Review Your Order</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        <div className="lg:col-span-2 space-y-3 sm:space-y-4">
          {items.map(item => (
            <CartItemCard key={`${item.id}-${item.selectedCustomizations?.map(c=>c.choiceName).join('-') || 'default'}`} item={item} />
          ))}
        </div>

        <Card className="lg:col-span-1 shadow-xl lg:sticky lg:top-24 lg:self-start">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-xl sm:text-2xl font-headline text-center">Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0">
            <div className="space-y-1 sm:space-y-2">
              <Label htmlFor="tableNumber" className="text-sm sm:text-md font-medium">Table Number <span className="text-destructive">*</span></Label>
              <Input
                id="tableNumber"
                type="text"
                value={tableNumber}
                onChange={(e) => {
                  setTableNumber(e.target.value);
                  if (e.target.value.trim()) setTableNumberError('');
                }}
                placeholder="Enter your table number"
                className={`${tableNumberError ? 'border-destructive ring-destructive' : ''} h-10 sm:h-auto`}
                aria-required="true"
                aria-describedby={tableNumberError ? "table-number-error" : undefined}
              />
              {tableNumberError && (
                <p id="table-number-error" className="text-xs sm:text-sm text-destructive flex items-center">
                  <AlertTriangle className="h-3 w-3 sm:h-4 sm:w-4 mr-1" /> {tableNumberError}
                </p>
              )}
            </div>
            <Separator />
            <div className="flex justify-between text-md sm:text-lg">
              <span>Subtotal ({itemCount} items)</span>
              <span className="font-semibold">₹{total.toFixed(0)}</span>
            </div>
            <Separator />
            <div className="flex justify-between text-xl sm:text-2xl font-bold text-primary">
              <span>Total</span>
              <span>₹{total.toFixed(0)}</span>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2 sm:gap-3 p-4 sm:p-6 pt-2 sm:pt-4">
            <Button 
              size="lg" 
              className="w-full shadow-md hover:shadow-primary/30 transition-shadow text-sm sm:text-base"
              onClick={handleProceedToCheckout}
            >
              Proceed to Checkout
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
            <Button
              variant="outline"
              onClick={clearCart}
              className="w-full text-destructive hover:border-destructive hover:bg-destructive/5 text-sm sm:text-base"
            >
              <Trash2 className="mr-2 h-3 w-3 sm:h-4 sm:w-4" /> Clear Cart
            </Button>
            <Link href="/menu" passHref className="w-full">
               <Button variant="ghost" className="w-full text-accent hover:text-accent/80 text-sm sm:text-base">
                <ArrowLeft className="mr-2 h-3 w-3 sm:h-4 sm:w-4" /> Continue Shopping
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
