
"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { QrCode, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import LazyImage from '@/components/lazy/LazyImage';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-180px)] sm:min-h-[calc(100vh-200px)] text-center p-2 sm:p-4 -mt-6 sm:-mt-8"> {/* Adjust for header/footer height */}
      <Card className="w-full max-w-sm sm:max-w-md shadow-xl glass-card card-hover">
        <CardHeader className="items-center pb-3 sm:pb-4">
          <QrCode className="w-12 h-12 sm:w-16 sm:h-16 text-primary mb-3 sm:mb-4 animate-pulse-glow" />
          <CardTitle className="text-3xl sm:text-4xl font-headline text-primary">Welcome to ByteEat!</CardTitle>
          <CardDescription className="text-md sm:text-lg text-foreground/80">
            The easiest way to order your meal.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4 sm:gap-6 px-4 sm:px-6 pb-4 sm:pb-6">
          {/* Replace placeholder with QR code */}
          <LazyImage
            src="https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=ByteEatDemo"
            alt="Demo QR Code"
            width={160}
            height={160}
            className="rounded-lg shadow-md sm:w-48 sm:h-48 animate-float border border-dashed border-primary/40 bg-white/10 p-2"
            priority={true}
          />
          <p className="text-sm sm:text-base text-muted-foreground">
            Simply scan the QR code on your table to view the menu and place your order directly from your device.
          </p>
          <Link href="/menu" passHref className="w-full">
            <Button className="w-full text-md sm:text-lg shadow-lg hover:shadow-primary/30 transition-shadow animate-slide-in">
              Scan QR & View Menu
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </Link>
        </CardContent>
      </Card>
      {/* Remove the QR code below the card */}
    </div>
  );
}
