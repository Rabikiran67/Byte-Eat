"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { UtensilsCrossed, ShoppingCart, ArrowRight, Star, Clock, Users } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function QRMenuPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-800">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center space-y-6">
          {/* Logo and Title */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <UtensilsCrossed className="h-12 w-12 text-primary" />
            <h1 className="text-4xl sm:text-6xl font-bold font-headline text-primary">
              ByteEat
            </h1>
          </div>
          
          <h2 className="text-2xl sm:text-3xl font-semibold text-foreground">
            Welcome to Our Restaurant
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our delicious fusion of Indian and Italian cuisine. 
            Scan this QR code to browse our menu and start ordering!
          </p>

          {/* Restaurant Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto mt-8">
            <Card className="text-center">
              <CardContent className="pt-6">
                <Clock className="h-8 w-8 mx-auto mb-2 text-primary" />
                <h3 className="font-semibold">Open Now</h3>
                <p className="text-sm text-muted-foreground">11:00 AM - 10:00 PM</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6">
                <Star className="h-8 w-8 mx-auto mb-2 text-primary" />
                <h3 className="font-semibold">4.8/5 Rating</h3>
                <p className="text-sm text-muted-foreground">500+ Happy Customers</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6">
                <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
                <h3 className="font-semibold">Quick Service</h3>
                <p className="text-sm text-muted-foreground">15-20 min delivery</p>
              </CardContent>
            </Card>
          </div>

          {/* Featured Dishes Preview */}
          <div className="mt-12">
            <h3 className="text-xl font-semibold mb-6">Featured Dishes</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
              {/* Butter Chicken */}
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-32">
                  <Image
                    src="https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=300&h=200&fit=crop&crop=center"
                    alt="Butter Chicken"
                    fill
                    className="object-cover"
                  />
                  <Badge className="absolute top-2 right-2 bg-primary">₹650</Badge>
                </div>
                <CardContent className="p-3">
                  <h4 className="font-semibold text-sm">Butter Chicken</h4>
                  <p className="text-xs text-muted-foreground">Creamy tomato gravy</p>
                </CardContent>
              </Card>

              {/* Neapolitan Pizza */}
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-32">
                  <Image
                    src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300&h=200&fit=crop&crop=center"
                    alt="Neapolitan Pizza"
                    fill
                    className="object-cover"
                  />
                  <Badge className="absolute top-2 right-2 bg-primary">₹550</Badge>
                </div>
                <CardContent className="p-3">
                  <h4 className="font-semibold text-sm">Neapolitan Pizza</h4>
                  <p className="text-xs text-muted-foreground">Wood-fired Margherita</p>
                </CardContent>
              </Card>

              {/* Truffle Risotto */}
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-32">
                  <Image
                    src="https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=300&h=200&fit=crop&crop=center"
                    alt="Truffle Risotto"
                    fill
                    className="object-cover"
                  />
                  <Badge className="absolute top-2 right-2 bg-primary">₹850</Badge>
                </div>
                <CardContent className="p-3">
                  <h4 className="font-semibold text-sm">Truffle Risotto</h4>
                  <p className="text-xs text-muted-foreground">Creamy Arborio rice</p>
                </CardContent>
              </Card>

              {/* Tandoori Pizza */}
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-32">
                  <Image
                    src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300&h=200&fit=crop&crop=center"
                    alt="Tandoori Pizza"
                    fill
                    className="object-cover"
                  />
                  <Badge className="absolute top-2 right-2 bg-primary">₹650</Badge>
                </div>
                <CardContent className="p-3">
                  <h4 className="font-semibold text-sm">Tandoori Pizza</h4>
                  <p className="text-xs text-muted-foreground">Fusion special</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Start Ordering Button */}
          <div className="mt-12 space-y-4">
            <Link href="/menu">
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 h-auto bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <ShoppingCart className="mr-3 h-6 w-6" />
                Start Ordering Now
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
            </Link>
            
            <p className="text-sm text-muted-foreground">
              🚀 Quick & Easy • 🍕 Fresh Ingredients • ⭐ 4.8/5 Rating
            </p>
          </div>

          {/* Additional Info */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UtensilsCrossed className="h-5 w-5" />
                  Our Cuisine
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Experience the perfect blend of authentic Indian spices and traditional Italian flavors. 
                  From creamy Butter Chicken to wood-fired Neapolitan Pizza, every dish is crafted with love.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  Easy Ordering
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Customize your order, add special instructions, and track your delivery in real-time. 
                  Secure payment options and contactless delivery available.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 