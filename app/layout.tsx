'use client';

import { HelmetProvider } from 'react-helmet-async';
import Chatbot from '@/src/components/Chatbot';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <HelmetProvider>
          {children}
          <Chatbot />
        </HelmetProvider>
      </body>
    </html>
  );
}
