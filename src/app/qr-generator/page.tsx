"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { QrCode, Download, Copy, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

export default function QRGeneratorPage() {
  const [qrType, setQrType] = useState('menu-landing');
  const [customUrl, setCustomUrl] = useState('');
  const [baseUrl, setBaseUrl] = useState('');
  const { toast } = useToast();

  // Set base URL only on client side
  React.useEffect(() => {
    setBaseUrl(window.location.origin);
  }, []);

  const generateQRUrl = () => {
    if (!baseUrl) return '/qr-menu'; // Fallback for SSR
    
    switch (qrType) {
      case 'menu-landing':
        return `${baseUrl}/qr-menu`;
      case 'menu-direct':
        return `${baseUrl}/menu`;
      case 'custom':
        return customUrl.startsWith('http') ? customUrl : `${baseUrl}${customUrl}`;
      default:
        return `${baseUrl}/qr-menu`;
    }
  };

  const generateQRCode = () => {
    const url = generateQRUrl();
    const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(url)}`;
    
    // Create a temporary link to download the QR code
    const link = document.createElement('a');
    link.href = qrApiUrl;
    link.download = `qrcode-${qrType}-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "QR Code Downloaded",
      description: "The QR code has been downloaded successfully.",
    });
  };

  const copyQRUrl = () => {
    const url = generateQRUrl();
    navigator.clipboard.writeText(url);
    
    toast({
      title: "URL Copied",
      description: "The QR code URL has been copied to clipboard.",
    });
  };

  const getQRDescription = () => {
    switch (qrType) {
      case 'menu-landing':
        return 'Opens the restaurant landing page with "Start Ordering" button';
      case 'menu-direct':
        return 'Opens the menu page directly';
      case 'custom':
        return 'Custom URL or path';
      default:
        return 'Opens the restaurant landing page';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold font-headline text-primary">QR Code Generator</h1>
          <p className="text-lg text-muted-foreground">
            Generate QR codes for your restaurant that customers can scan to access the menu
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* QR Code Generator Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <QrCode className="h-5 w-5" />
                Generate QR Code
              </CardTitle>
              <CardDescription>
                Choose the type of QR code you want to generate
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="qr-type">QR Code Type</Label>
                <Select value={qrType} onValueChange={setQrType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select QR code type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="menu-landing">Restaurant Landing Page</SelectItem>
                    <SelectItem value="menu-direct">Direct Menu Page</SelectItem>
                    <SelectItem value="custom">Custom URL</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {qrType === 'custom' && (
                <div className="space-y-2">
                  <Label htmlFor="custom-url">Custom URL</Label>
                  <Input
                    id="custom-url"
                    placeholder="Enter URL or path (e.g., /menu or https://example.com)"
                    value={customUrl}
                    onChange={(e) => setCustomUrl(e.target.value)}
                  />
                </div>
              )}
              
              <div className="space-y-2">
                <Label>Generated URL</Label>
                <div className="p-3 bg-muted rounded-md text-sm font-mono break-all">
                  {generateQRUrl()}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Description</Label>
                <p className="text-sm text-muted-foreground">
                  {getQRDescription()}
                </p>
              </div>
              
              <div className="flex gap-2">
                <Button 
                  onClick={generateQRCode}
                  className="flex-1"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download QR
                </Button>
                <Button 
                  variant="outline"
                  onClick={copyQRUrl}
                >
                  <Copy className="mr-2 h-4 w-4" />
                  Copy URL
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Preview Section */}
          <Card>
            <CardHeader>
              <CardTitle>QR Code Preview</CardTitle>
              <CardDescription>
                Preview of the generated QR code
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="bg-white p-6 rounded-lg inline-block">
                <img 
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(generateQRUrl())}`}
                  alt="QR Code Preview"
                  className="mx-auto"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Scan this QR code to test it
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Usage Instructions */}
        <Card>
          <CardHeader>
            <CardTitle>How to Use These QR Codes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center">
                  <span className="text-primary font-bold">1</span>
                </div>
                <h3 className="font-semibold">Print QR Codes</h3>
                <p className="text-sm text-muted-foreground">
                  Download and print the QR codes to place on tables, menus, or promotional materials.
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center">
                  <span className="text-primary font-bold">2</span>
                </div>
                <h3 className="font-semibold">Customer Scans</h3>
                <p className="text-sm text-muted-foreground">
                  Customers scan the QR code with their phone camera to access the menu.
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center">
                  <span className="text-primary font-bold">3</span>
                </div>
                <h3 className="font-semibold">Start Ordering</h3>
                <p className="text-sm text-muted-foreground">
                  They see the landing page with featured dishes and can click "Start Ordering".
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* QR Code Types Explanation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Restaurant Landing Page</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Perfect for table QR codes. Shows restaurant info, featured dishes, and a prominent "Start Ordering" button.
              </p>
              <Link href="/qr-menu">
                <Button variant="outline" className="w-full">
                  Preview Landing Page
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Direct Menu Page</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Goes directly to the menu page. Best for customers who already know they want to order.
              </p>
              <Link href="/menu">
                <Button variant="outline" className="w-full">
                  Preview Menu Page
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 