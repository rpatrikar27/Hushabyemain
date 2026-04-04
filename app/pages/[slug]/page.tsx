'use client';

import { useParams } from 'next/navigation';
import Header from '@/src/components/layout/Header';
import Footer from '@/src/components/layout/Footer';
import SEOHead from '@/src/components/seo/SEOHead';

const pages: Record<string, { title: string, content: string }> = {
  'about': {
    title: 'About Hushabye',
    content: 'Hushabye is a premium Indian baby care brand dedicated to providing gentle and effective products for your little ones. Inspired by nature and backed by science, our products are dermatologically tested and paraben-free.'
  },
  'privacy-policy': {
    title: 'Privacy Policy',
    content: 'Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.'
  },
  'terms-and-conditions': {
    title: 'Terms & Conditions',
    content: 'By using our website, you agree to these terms and conditions.'
  },
  'return-policy': {
    title: 'Return Policy',
    content: 'We offer a 7-day return policy for unused and unopened products.'
  },
  'shipping-policy': {
    title: 'Shipping Policy',
    content: 'We offer free shipping on orders above ₹499. Standard delivery takes 3-5 business days.'
  },
  'contact': {
    title: 'Contact Us',
    content: 'Have questions? Reach out to us at support@hushabye.in or call us at +91 98765 43210.'
  }
};

export default function StaticPage() {
  const { slug } = useParams();
  const page = pages[slug as string];

  if (!page) return <div>Page not found</div>;

  return (
    <div className="flex min-h-screen flex-col">
      <SEOHead title={page.title} />
      <Header />
      <main className="flex-1 container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-slate-900 mb-8">{page.title}</h1>
          <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed">
            {page.content}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
