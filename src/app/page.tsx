
"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { QrCode, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-180px)] sm:min-h-[calc(100vh-200px)] text-center p-2 sm:p-4 -mt-6 sm:-mt-8"> {/* Adjust for header/footer height */}
      <Card className="w-full max-w-sm sm:max-w-md shadow-xl bg-card/80 backdrop-blur-sm">
        <CardHeader className="items-center pb-3 sm:pb-4">
          <QrCode className="w-12 h-12 sm:w-16 sm:h-16 text-primary mb-3 sm:mb-4" />
          <CardTitle className="text-3xl sm:text-4xl font-headline text-primary">Welcome to ByteEat!</CardTitle>
          <CardDescription className="text-md sm:text-lg text-foreground/80">
            The easiest way to order your meal.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4 sm:gap-6 px-4 sm:px-6 pb-4 sm:pb-6">
          <Image 
            src="https://placehold.co/160x160.png" 
            alt="Scan QR code here"
            data-ai-hint="qr code"
            width={160} 
            height={160} 
            className="rounded-lg shadow-md sm:w-48 sm:h-48"
          />
          <p className="text-sm sm:text-base text-muted-foreground">
            Simply scan the QR code on your table to view the menu and place your order directly from your device.
          </p>
          <Link href="/menu" passHref className="w-full">
            <Button size="lg" className="w-full text-md sm:text-lg shadow-lg hover:shadow-primary/30 transition-shadow">
              Scan QR & View Menu
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
