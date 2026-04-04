'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Calendar, User, ArrowRight } from 'lucide-react';
import Header from '@/src/components/layout/Header';
import Footer from '@/src/components/layout/Footer';
import SEOHead from '@/src/components/seo/SEOHead';

const mockPosts = [
  { id: 1, title: 'Tips for Gentle Baby Bathing', slug: 'gentle-baby-bathing', excerpt: 'Learn how to make bath time a soothing and safe experience for your baby.', date: 'Oct 10, 2023', author: 'Dr. Aditi Rao', image: 'https://picsum.photos/seed/bath/800/400' },
  { id: 2, title: 'Choosing the Right Diaper', slug: 'choosing-right-diaper', excerpt: 'A guide to selecting the best diaper for your baby\'s skin and comfort.', date: 'Oct 5, 2023', author: 'Sarah Kapoor', image: 'https://picsum.photos/seed/diaper-blog/800/400' },
  { id: 3, title: 'The Benefits of Milk-Infused Wipes', slug: 'milk-infused-wipes', excerpt: 'Why milk-infused wipes are a game-changer for sensitive baby skin.', date: 'Sep 28, 2023', author: 'Dr. Aditi Rao', image: 'https://picsum.photos/seed/wipes-blog/800/400' },
];

export default function BlogListPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SEOHead title="Blog" description="Expert advice and tips for baby care from Hushabye." />
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Hushabye Blog</h1>
          <p className="text-lg text-slate-500 mb-12">Expert advice, parenting tips, and baby care guides.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {mockPosts.map((post) => (
              <Link 
                key={post.id} 
                href={`/blog/${post.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border bg-white shadow-sm transition-all hover:shadow-lg"
              >
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-4 text-xs text-slate-400 mb-3">
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {post.date}</span>
                    <span className="flex items-center gap-1"><User className="h-3 w-3" /> {post.author}</span>
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors">{post.title}</h2>
                  <p className="text-sm text-slate-500 line-clamp-3 mb-4 flex-1">{post.excerpt}</p>
                  <div className="flex items-center text-sm font-bold text-primary group-hover:underline">
                    Read More <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
