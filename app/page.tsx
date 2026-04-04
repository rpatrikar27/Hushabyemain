'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { ChevronRight, Truck, ShieldCheck, Heart } from 'lucide-react';
import Header from '@/src/components/layout/Header';
import Footer from '@/src/components/layout/Footer';
import ProductCard from '@/src/components/product/ProductCard';
import SEOHead from '@/src/components/seo/SEOHead';
import seedData from '@/src/data/seed.json';

export default function HomePage() {
  const featuredProducts = seedData.products.filter(p => p.is_featured);
  const categories = seedData.categories;

  return (
    <div className="flex min-h-screen flex-col">
      <SEOHead 
        title="Home" 
        description="Premium Indian baby care brand providing gentle and effective products for your little ones." 
        keywords={['baby care', 'diapers', 'shampoo', 'lotion', 'india']}
      />
      <div className="bg-primary py-2 text-center text-xs font-medium text-white">
        Free Shipping on orders above ₹499! 🚚
      </div>
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[400px] md:h-[600px] w-full overflow-hidden">
          <Image
            src="https://picsum.photos/seed/hushabye-hero/1920/1080"
            alt="Hushabye Hero"
            fill
            className="object-cover"
            priority
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/20" />
          <div className="container relative mx-auto flex h-full flex-col justify-center px-4 text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-xl space-y-4"
            >
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                Gentle Care for Your Little One
              </h1>
              <p className="text-lg md:text-xl text-white/90">
                Premium Indian baby care products inspired by nature and backed by science.
              </p>
              <div className="flex gap-4 pt-4">
                <Link 
                  href="/collections/all" 
                  className="inline-flex h-12 items-center justify-center rounded-full bg-white px-8 text-sm font-bold text-primary transition-colors hover:bg-slate-100"
                >
                  Shop Now
                </Link>
                <Link 
                  href="/pages/about" 
                  className="inline-flex h-12 items-center justify-center rounded-full border-2 border-white px-8 text-sm font-bold text-white transition-colors hover:bg-white/10"
                >
                  Our Story
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="container mx-auto px-4 py-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-slate-900">Shop by Category</h2>
            <Link href="/collections/all" className="flex items-center text-sm font-semibold text-primary hover:underline">
              View All <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {categories.map((category) => (
              <Link 
                key={category.slug} 
                href={`/collections/${category.slug}`}
                className="group flex flex-col items-center gap-3 text-center"
              >
                <div className="relative h-24 w-24 md:h-32 md:w-32 overflow-hidden rounded-full border-2 border-slate-100 transition-all group-hover:border-primary">
                  <Image
                    src={category.image_url}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="text-sm font-bold text-slate-700 group-hover:text-primary">{category.name}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Features Bar */}
        <section className="bg-slate-50 py-12 border-y">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Truck className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold">Fast Delivery</h4>
                  <p className="text-sm text-slate-500">Across India in 3-5 days</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold">Safe & Gentle</h4>
                  <p className="text-sm text-slate-500">Dermatologically tested</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Heart className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold">Made with Love</h4>
                  <p className="text-sm text-slate-500">Indian brand for Indian babies</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="container mx-auto px-4 py-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-slate-900">Featured Products</h2>
            <Link href="/collections/all" className="flex items-center text-sm font-semibold text-primary hover:underline">
              View All <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, idx) => (
              <ProductCard key={idx} product={{ ...product, id: String(idx) }} />
            ))}
          </div>
        </section>

        {/* Promotional Banner */}
        <section className="container mx-auto px-4 py-8">
          <div className="relative h-[300px] w-full overflow-hidden rounded-2xl">
            <Image
              src="https://picsum.photos/seed/hushabye-promo/1200/400"
              alt="Promotion"
              fill
              className="object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex flex-col justify-center px-8 md:px-16 text-white">
              <h3 className="text-3xl font-bold mb-2">Ultimate Baby Care Combo</h3>
              <p className="text-lg text-white/90 mb-6 max-w-md">Get 20% OFF on our best-selling 4-pack combo. Limited time offer!</p>
              <Link 
                href="/products/combo-lotion-wash-shampoo-talcum-4-pack" 
                className="inline-flex h-10 w-fit items-center justify-center rounded-full bg-white px-6 text-sm font-bold text-primary transition-colors hover:bg-slate-100"
              >
                Shop Combo
              </Link>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="bg-primary py-16 text-white">
          <div className="container mx-auto px-4 text-center max-w-2xl">
            <h2 className="text-3xl font-bold mb-4">Join the Hushabye Family</h2>
            <p className="text-white/80 mb-8">Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 rounded-full px-6 py-3 text-slate-900 focus:outline-none"
                required
              />
              <button className="rounded-full bg-slate-900 px-8 py-3 font-bold transition-colors hover:bg-slate-800">
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
