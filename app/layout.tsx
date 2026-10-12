import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import PwaInstallPrompt from '@/components/PwaInstallPrompt';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-serif',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#1C1917',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: 'NAZIM — Fine Jewellery from Charminar, Hyderabad',
  description: 'Discover beautiful jewelry, bracelets, earrings and accessories at NAZIM. Handcrafted Hyderabadi polki, pearls, and royal heirlooms.',
  applicationName: 'NAZIM',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'NAZIM',
  },
  icons: {
    icon: [
      { url: '/favicon.png', sizes: '64x64', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon.png',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    title: 'NAZIM — Fine Jewellery from Charminar, Hyderabad',
    description: 'Discover beautiful jewelry, bracelets, earrings and accessories at NAZIM.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NAZIM — Fine Jewellery from Charminar, Hyderabad',
    description: 'Discover beautiful jewelry, bracelets, earrings and accessories at NAZIM.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jakarta.variable}`}>
      <body className="min-h-screen bg-[#FAF8F5] text-stone-900 selection:bg-[#EAD7BA] selection:text-stone-900" suppressHydrationWarning>
        {children}
        <PwaInstallPrompt />
      </body>
    </html>
  );
}
