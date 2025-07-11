
import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { CartProvider } from '@/hooks/useCartStore';
import RestaurantBackground from '@/components/ui/restaurant-background';
import { AdminProvider } from '@/contexts/AdminContext';
import dynamic from 'next/dynamic';
import GlobalLoadingOverlay from '@/components/layout/GlobalLoadingOverlay';

// Lazy load header and footer components
const Header = dynamic(() => import('@/components/layout/Header'), {
  loading: () => <div className="h-16 bg-background border-b animate-pulse" />,
  ssr: true
});

const Footer = dynamic(() => import('@/components/layout/Footer'), {
  loading: () => <div className="h-20 bg-background border-t animate-pulse" />,
  ssr: true
});

// Performance monitor removed for now to avoid SSR issues

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ByteEat - Order Smart',
  description: 'Scan, customize, and pay for your restaurant order seamlessly.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        {/* Removed direct Google Fonts links as next/font handles optimization */}
        <link rel="icon" href="/favicon.png" type="image/png" sizes="72x72" />
      </head>
      <body className="font-body antialiased flex flex-col min-h-screen overflow-x-hidden">
        <RestaurantBackground />
        <AdminProvider>
          <CartProvider>
            <GlobalLoadingOverlay />
            <Header />
            <main className="flex-grow container mx-auto px-2 py-6 sm:px-4 sm:py-8">
              {children}
            </main>
            <Footer />
            <Toaster />
          </CartProvider>
        </AdminProvider>
      </body>
    </html>
  );
}
