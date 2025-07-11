"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { QrCode, Camera, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface QRScannerProps {
  onScan?: (result: string) => void;
}

export default function QRScanner({ onScan }: QRScannerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const router = useRouter();

  const startScanning = async () => {
    try {
      setError(null);
      setIsScanning(true);
      
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
      }
    } catch (err) {
      setError('Unable to access camera. Please ensure camera permissions are granted.');
      setIsScanning(false);
    }
  };

  const stopScanning = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsScanning(false);
  };

  const handleScan = (result: string) => {
    stopScanning();
    setIsOpen(false);
    
    // Handle different QR code formats
    if (result.startsWith('http')) {
      // External URL
      window.open(result, '_blank');
    } else if (result.startsWith('/')) {
      // Internal route
      router.push(result);
    } else if (result.toLowerCase().includes('menu')) {
      // Menu-related QR code
      router.push('/menu');
    } else {
      // Default to menu
      router.push('/menu');
    }
    
    onScan?.(result);
  };

  useEffect(() => {
    if (isOpen && isScanning) {
      startScanning();
    } else if (!isOpen) {
      stopScanning();
    }
  }, [isOpen, isScanning]);

  useEffect(() => {
    return () => {
      stopScanning();
    };
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          className="flex items-center gap-2"
        >
          <QrCode className="h-4 w-4" />
          Scan QR
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Camera className="h-5 w-5" />
            QR Code Scanner
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {error && (
            <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md text-destructive text-sm">
              {error}
            </div>
          )}
          
          <div className="relative aspect-square bg-black rounded-lg overflow-hidden">
            {isScanning ? (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                <div className="text-center">
                  <Camera className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Camera will start when scanning begins</p>
                </div>
              </div>
            )}
            
            {/* QR Code overlay */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-2 border-white rounded-lg">
                <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-white"></div>
                <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-white"></div>
                <div className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-white"></div>
                <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-white"></div>
              </div>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button 
              onClick={() => setIsScanning(!isScanning)}
              className="flex-1"
              disabled={!!error}
            >
              {isScanning ? 'Stop Scanning' : 'Start Scanning'}
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="text-xs text-muted-foreground text-center">
            Point your camera at a QR code to scan and navigate to the menu
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 