
"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import type { CartItemType } from '@/types';
import { CheckCircle, Home, ShoppingBag, MessageSquare, Utensils } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface OrderDetails {
  items: CartItemType[];
  total: number;
}

export default function ConfirmationPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [tableNumber, setTableNumber] = useState<string | null>(null);
  const [reviewText, setReviewText] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  useEffect(() => {
    const storedOrder = localStorage.getItem('lastOrder');
    const storedTableNumber = localStorage.getItem('tableNumber');

    if (storedOrder) {
      try {
        setOrderDetails(JSON.parse(storedOrder) as OrderDetails);
        localStorage.removeItem('lastOrder'); 
      } catch (error) {
        console.error("Failed to parse order details:", error);
        router.replace('/'); 
      }
    } else {
      const timer = setTimeout(() => {
        if (!localStorage.getItem('lastOrder')) { 
             router.replace('/');
        }
      }, 500);
      return () => clearTimeout(timer);
    }

    if (storedTableNumber) {
      setTableNumber(storedTableNumber);
    }
  }, [router]);

  const handleReviewSubmit = () => {
    if (!reviewText.trim()) {
      toast({
        title: "Empty Review",
        description: "Please write something before submitting.",
        variant: "destructive",
      });
      return;
    }
    console.log("Review submitted:", reviewText, "for table:", tableNumber);
    setReviewSubmitted(true);
    toast({
      title: "Review Submitted!",
      description: "Thank you for your feedback.",
      variant: "default",
    });
  };

  if (!orderDetails) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-180px)] sm:min-h-[calc(100vh-200px)] text-center p-4">
        <p className="text-lg text-muted-foreground">Loading confirmation...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-180px)] sm:min-h-[calc(100vh-200px)] text-center p-2 sm:p-4 -mt-6 sm:-mt-8">
      <Card className="w-full max-w-md sm:max-w-lg shadow-xl bg-card/90 backdrop-blur-sm">
        <CardHeader className="items-center p-4 sm:p-6">
          <CheckCircle className="w-16 h-16 sm:w-20 sm:h-20 text-green-500 mb-3 sm:mb-4" />
          <CardTitle className="text-3xl sm:text-4xl font-headline text-primary">Order Confirmed!</CardTitle>
          <CardDescription className="text-md sm:text-lg text-foreground/80">
            Thank you for your purchase. Your delicious meal is being prepared!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6 pt-0">
          <div className="text-left bg-background/50 p-3 sm:p-4 rounded-md">
            <h4 className="font-semibold text-md sm:text-lg mb-1 sm:mb-2 text-accent flex items-center">
              <Utensils className="mr-2 h-4 w-4 sm:h-5 sm:w-5" /> Order Summary
            </h4>
            {tableNumber && (
              <p className="text-xs sm:text-sm text-muted-foreground mb-1 sm:mb-2">
                For Table: <span className="font-semibold text-primary">{tableNumber}</span>
              </p>
            )}
            {orderDetails.items.map(item => (
              <div key={`${item.id}-${item.selectedCustomizations?.map(c=>c.choiceName).join('-') || 'default'}`} className="flex justify-between text-xs sm:text-sm mb-0.5 sm:mb-1">
                <span>{item.name} x {item.quantity}</span>
                <span>₹{(item.finalPrice * item.quantity).toFixed(0)}</span>
              </div>
            ))}
            <hr className="my-1 sm:my-2 border-border" />
            <div className="flex justify-between font-bold text-sm sm:text-md">
              <span>Total Paid:</span>
              <span>₹{orderDetails.total.toFixed(0)}</span>
            </div>
          </div>

          {!reviewSubmitted ? (
            <div className="space-y-2 sm:space-y-3 pt-1 sm:pt-2">
              <Label htmlFor="reviewText" className="text-sm sm:text-md font-semibold text-accent flex items-center">
                <MessageSquare className="mr-2 h-4 w-4 sm:h-5 sm:w-5" /> How was your experience?
              </Label>
              <Textarea
                id="reviewText"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Tell us about your meal and service..."
                rows={3}
                className="bg-background/50 text-sm sm:text-base"
              />
              <Button onClick={handleReviewSubmit} className="w-full text-sm sm:text-base">
                Submit Review
              </Button>
            </div>
          ) : (
            <p className="text-sm sm:text-md text-green-600 font-semibold p-2 sm:p-3 bg-green-500/10 rounded-md">
              Thanks for your feedback!
            </p>
          )}
          
          <p className="text-xs sm:text-sm text-muted-foreground pt-1 sm:pt-2">
            You will receive updates about your order status soon. (This is a simulation)
          </p>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-2 sm:gap-3 p-4 sm:p-6 pt-2 sm:pt-4">
            <Link href="/menu" passHref className="flex-1 w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full text-sm sm:text-base">
                <ShoppingBag className="mr-2 h-4 w-4 sm:h-5 sm:w-5" /> Place Another Order
              </Button>
            </Link>
            <Link href="/" passHref className="flex-1 w-full sm:w-auto">
              <Button size="lg" className="w-full text-sm sm:text-base">
                <Home className="mr-2 h-4 w-4 sm:h-5 sm:w-5" /> Back to Home
              </Button>
            </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
