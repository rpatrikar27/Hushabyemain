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
    default: 'Hushabye - Premium Baby Care',
    template: '%s | Hushabye',
  },
  description: 'Premium Indian baby care brand providing gentle and effective products for your little ones.',
  keywords: ['baby care', 'diapers', 'shampoo', 'lotion', 'india'],
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
