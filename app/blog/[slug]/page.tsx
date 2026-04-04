'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User, ChevronLeft } from 'lucide-react';
import Header from '@/src/components/layout/Header';
import Footer from '@/src/components/layout/Footer';
import SEOHead from '@/src/components/seo/SEOHead';

export default function BlogPostPage() {
  const { slug } = useParams();

  return (
    <div className="flex min-h-screen flex-col">
      <SEOHead title={slug?.toString().replace('-', ' ')} />
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <Link href="/blog" className="inline-flex items-center text-sm font-bold text-primary hover:underline mb-8">
            <ChevronLeft className="mr-2 h-4 w-4" /> Back to Blog
          </Link>

          <article>
            <div className="flex items-center gap-4 text-sm text-slate-400 mb-4">
              <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> Oct 10, 2023</span>
              <span className="flex items-center gap-1"><User className="h-4 w-4" /> Dr. Aditi Rao</span>
            </div>
            
            <h1 className="text-4xl font-bold text-slate-900 mb-8 leading-tight">
              Tips for Gentle Baby Bathing
            </h1>

            <div className="relative aspect-video overflow-hidden rounded-2xl mb-12 border">
              <Image
                src="https://picsum.photos/seed/bath/1200/600"
                alt="Bathing"
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-6">
              <p>
                Bath time is more than just a cleaning ritual; it&apos;s a special bonding time between you and your baby. 
                However, for many new parents, it can also be a source of anxiety. Here are some expert tips to make 
                bath time a gentle and safe experience.
              </p>
              <h2 className="text-2xl font-bold text-slate-900">1. Preparation is Key</h2>
              <p>
                Before you even pick up your baby, make sure everything you need is within arm&apos;s reach. This includes 
                a mild baby wash, a soft towel, a clean diaper, and fresh clothes. Never leave your baby unattended 
                in the bath, even for a second.
              </p>
              <h2 className="text-2xl font-bold text-slate-900">2. Check the Temperature</h2>
              <p>
                The water should be comfortably warm, not hot. Test it with your elbow or a bath thermometer. 
                The ideal temperature is around 37-38°C (98.6-100.4°F).
              </p>
              <h2 className="text-2xl font-bold text-slate-900">3. Use Gentle Products</h2>
              <p>
                A baby&apos;s skin is much thinner and more sensitive than an adult&apos;s. Use a mild, tear-free baby wash 
                like Hushabye Baby Wash that is pH balanced and free from harsh chemicals.
              </p>
            </div>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}
