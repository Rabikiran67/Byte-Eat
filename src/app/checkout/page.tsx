
"use client";

import { useCartStore } from '@/hooks/useCartStore.tsx';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CreditCard, Lock, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function CheckoutPage() {
  const { items, getCartTotal, clearCart, getItemCount } = useCartStore();
  const router = useRouter();
  const { toast } = useToast();
  const total = getCartTotal();
  const itemCount = getItemCount();
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (itemCount === 0 && !isProcessing) {
      router.replace('/menu'); 
    }
  }, [itemCount, router, isProcessing]);

  if (itemCount === 0 && !isProcessing) { 
    return <div className="text-center py-20"><p>Loading cart...</p></div>;
  }
  
  const handlePayment = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2500));

    const paymentSuccess = Math.random() > 0.1; 

    if (paymentSuccess) {
      toast({
        title: "Payment Successful!",
        description: "Your order is confirmed.",
        variant: "default",
      });
      const orderDetails = { items, total }; 
      localStorage.setItem('lastOrder', JSON.stringify(orderDetails)); 
      clearCart();
      router.push('/confirmation');
    } else {
      toast({
        title: "Payment Failed",
        description: "There was an issue with your payment. Please try again.",
        variant: "destructive",
      });
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-5xl font-bold font-headline text-primary">Checkout</h1>
        <p className="text-lg text-muted-foreground">Securely complete your purchase.</p>
      </div>

      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-headline">Order Summary</CardTitle>
          <CardDescription>Review your items before payment.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {items.map(item => (
            <div key={`${item.id}-${item.selectedCustomizations?.map(c=>c.choiceName).join('-') || 'default'}`} className="flex justify-between items-start text-sm">
              <div>
                <span className="font-medium">{item.name}</span> <span className="text-muted-foreground">x {item.quantity}</span>
                {item.selectedCustomizations && item.selectedCustomizations.length > 0 && (
                  <ul className="text-xs text-muted-foreground list-disc list-inside ml-4">
                    {item.selectedCustomizations.map(cust => (
                      <li key={`${cust.optionId}-${cust.choiceName}`}>{cust.optionName}: {cust.choiceName}</li>
                    ))}
                  </ul>
                )}
              </div>
              <span className="font-medium">₹{(item.finalPrice * item.quantity).toFixed(0)}</span>
            </div>
          ))}
          <Separator />
          <div className="flex justify-between text-xl font-bold">
            <span>Total Amount</span>
            <span className="text-primary">₹{total.toFixed(0)}</span>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <div className="my-2 text-center">
            <p className="text-sm font-medium text-muted-foreground mb-2">Accepted Payment Methods (Demo)</p>
            <div className="flex justify-center items-center gap-3 text-muted-foreground">
              <CreditCard className="h-6 w-6" />
              <span className="text-xs">Visa</span>
              <span className="text-xs">Mastercard</span>
              <span className="text-xs">Amex</span>
              <span className="text-xs">UPI</span>
            </div>
          </div>
          <Separator />
          <p className="text-xs text-muted-foreground text-center flex items-center justify-center pt-2">
            <Lock className="h-3 w-3 mr-1" /> This is a secure SSL encrypted payment (simulation).
          </p>
          <Button 
            size="lg" 
            className="w-full text-lg shadow-lg hover:shadow-primary/30" 
            onClick={handlePayment}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              <>
                <CreditCard className="mr-2 h-5 w-5" /> Pay ₹{total.toFixed(0)} Now
              </>
            )}
          </Button>
          {!isProcessing && (
            <Link href="/cart" passHref className="w-full">
              <Button variant="outline" className="w-full">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Cart
              </Button>
            </Link>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
