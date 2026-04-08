import type { Metadata } from 'next';
import { Inter, Outfit, Playfair_Display } from 'next/font/google';
import Chatbot from '@/src/components/Chatbot';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-display',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
});

export const metadata: Metadata = {
  title: {
    default: 'Hushabye - Premium Baby Care | Gentle & Natural Products',
    template: '%s | Hushabye',
  },
  description: 'Hushabye offers premium Indian baby care products inspired by nature. Shop our gentle diapers, tear-free shampoos, and milky soft lotions for your little ones.',
  keywords: ['baby care', 'premium baby products', 'gentle diapers', 'tear-free shampoo', 'baby lotion', 'natural baby care', 'Hushabye India'],
  authors: [{ name: 'Hushabye' }],
  creator: 'Hushabye',
  publisher: 'Hushabye',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://hushabye.in',
    siteName: 'Hushabye',
    title: 'Hushabye - Premium Baby Care',
    description: 'Gentle, natural, and dermatologically tested baby care products for your little ones.',
    images: [
      {
        url: 'https://hushabye.in/cdn/shop/files/hushabay_logo.png',
        width: 800,
        height: 600,
        alt: 'Hushabye Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hushabye - Premium Baby Care',
    description: 'Gentle, natural, and dermatologically tested baby care products for your little ones.',
    images: ['https://hushabye.in/cdn/shop/files/hushabay_logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} ${playfair.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning className="min-h-screen flex flex-col">
        {children}
        <Chatbot />
      </body>
    </html>
  );
}
