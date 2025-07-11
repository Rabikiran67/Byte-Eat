"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { QrCode, Download, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface QRGeneratorProps {
  menuItem?: {
    id: string;
    name: string;
  };
}

export default function QRGenerator({ menuItem }: QRGeneratorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [qrType, setQrType] = useState('menu');
  const [customUrl, setCustomUrl] = useState('');
  const { toast } = useToast();

  const generateQRUrl = () => {
    const baseUrl = window.location.origin;
    
    switch (qrType) {
      case 'menu':
        return `${baseUrl}/menu`;
      case 'item':
        return menuItem ? `${baseUrl}/menu?item=${menuItem.id}` : `${baseUrl}/menu`;
      case 'custom':
        return customUrl.startsWith('http') ? customUrl : `${baseUrl}${customUrl}`;
      default:
        return `${baseUrl}/menu`;
    }
  };

  const generateQRCode = () => {
    const url = generateQRUrl();
    const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(url)}`;
    
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

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          className="flex items-center gap-2"
        >
          <QrCode className="h-4 w-4" />
          Generate QR
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <QrCode className="h-5 w-5" />
            QR Code Generator
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="qr-type">QR Code Type</Label>
            <Select value={qrType} onValueChange={setQrType}>
              <SelectTrigger>
                <SelectValue placeholder="Select QR code type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="menu">Menu Page</SelectItem>
                {menuItem && <SelectItem value="item">Specific Item</SelectItem>}
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
          
          <div className="flex gap-2">
            <Button 
              onClick={generateQRCode}
              className="flex-1"
            >
              <Download className="h-4 w-4 mr-2" />
              Download QR
            </Button>
            <Button 
              variant="outline"
              onClick={copyQRUrl}
            >
              <Copy className="h-4 w-4 mr-2" />
              Copy URL
            </Button>
          </div>
          
          <div className="text-xs text-muted-foreground text-center">
            {qrType === 'menu' && 'Generate a QR code that links to the menu page'}
            {qrType === 'item' && menuItem && `Generate a QR code that links to ${menuItem.name}`}
            {qrType === 'custom' && 'Generate a QR code for a custom URL'}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 