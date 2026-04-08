'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, ShieldCheck, Sparkles, Leaf, ChevronRight, ChevronLeft, Truck } from 'lucide-react';
import Header from '@/src/components/layout/Header';
import Footer from '@/src/components/layout/Footer';
import ProductCard from '@/src/components/product/ProductCard';
import BrandStories from '@/src/components/home/BrandStories';
import seedData from '@/src/data/seed.json';
import { supabase } from '@/src/lib/supabase';

export default function HomeContent() {
  const [products, setProducts] = useState(seedData.products);
  const [categories, setCategories] = useState(seedData.categories);
  const [banners, setBanners] = useState(seedData.banners.filter(b => b.position === 'hero' && b.is_active));
  const [smallBanners, setSmallBanners] = useState(seedData.banners.filter(b => b.position === 'small' && b.is_active));
  const [widgets, setWidgets] = useState(seedData.widgets || []);
  const [isLoading, setIsLoading] = useState(true);

  const featuredProducts = products.filter(p => p.is_featured);
  
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const [
          { data: dbProducts },
          { data: dbCategories },
          { data: dbBanners },
          { data: dbWidgets }
        ] = await Promise.all([
          supabase.from('products').select('*'),
          supabase.from('categories').select('*'),
          supabase.from('banners').select('*').eq('is_active', true),
          supabase.from('widgets').select('*')
        ]);

        if (dbProducts && dbProducts.length > 0) setProducts(dbProducts);
        if (dbCategories && dbCategories.length > 0) setCategories(dbCategories);
        if (dbBanners && dbBanners.length > 0) {
          setBanners(dbBanners.filter((b: any) => b.position === 'hero'));
          setSmallBanners(dbBanners.filter((b: any) => b.position === 'small'));
        }
        if (dbWidgets && dbWidgets.length > 0) setWidgets(dbWidgets);
      } catch (error) {
        console.error('Error fetching from Supabase, using seed data:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (banners.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [banners.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % banners.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Hushabye',
    url: 'https://hushabye.in',
    logo: 'https://hushabye.in/cdn/shop/files/hushabay_logo.png',
    sameAs: [
      'https://www.facebook.com/hushabye',
      'https://www.instagram.com/hushabye',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-98765-43210',
      contactType: 'customer service',
    },
  };

  return (
    <div className="flex min-h-screen flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      
      <main className="flex-1">
        {/* Hero Slider Section */}
        <section className="relative h-[70vh] md:h-screen w-full overflow-hidden bg-slate-900">
          {/* Overlay Header */}
          <div className="absolute top-0 left-0 right-0 z-50">
            <div className="bg-primary/20 backdrop-blur-sm py-2 text-center text-[10px] md:text-xs font-medium text-white border-b border-white/10">
              Free Shipping on orders above ₹499! 🚚
            </div>
            <Header isTransparent />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={banners[currentSlide].image_url}
                alt={`Hushabye Banner - ${banners[currentSlide].title}`}
                fill
                className="object-cover"
                priority
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
              
              <div className="container relative h-full flex flex-col justify-center">
                <div className="max-w-3xl space-y-4 md:space-y-8">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="inline-flex items-center gap-3 rounded-full bg-white/10 backdrop-blur-md px-3 py-1.5 md:px-4 md:py-2 border border-white/20"
                  >
                    <span className="h-1.5 w-1.5 md:h-2 md:w-2 rounded-full bg-accent animate-pulse" />
                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-white">
                      Pure • Gentle • Natural
                    </span>
                  </motion.div>
                  
                  <div className="space-y-2 md:space-y-4">
                    <motion.h1 
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.8 }}
                      className="text-3xl md:text-7xl lg:text-8xl font-serif font-medium leading-[1.1] text-white tracking-tight"
                    >
                      {banners[currentSlide].title.split(' ').map((word, i) => (
                        <span key={i} className={i === 1 ? "italic text-accent" : ""}>
                          {word}{' '}
                        </span>
                      ))}
                    </motion.h1>
                    <motion.p 
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.8 }}
                      className="text-sm md:text-2xl text-white/80 max-w-xl leading-relaxed font-light"
                    >
                      {banners[currentSlide].subtitle}
                    </motion.p>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.8 }}
                    className="flex flex-wrap gap-3 md:gap-4 pt-2 md:pt-4"
                  >
                    <Link 
                      href={banners[currentSlide].link_url} 
                      className="group relative inline-flex h-12 md:h-16 items-center justify-center overflow-hidden rounded-full bg-accent px-8 md:px-12 text-xs md:text-sm font-bold text-slate-900 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-accent/20"
                    >
                      <span className="relative z-10">Shop Now</span>
                      <div className="absolute inset-0 bg-white translate-y-full transition-transform group-hover:translate-y-0" />
                    </Link>
                    <Link 
                      href="/pages/about" 
                      className="inline-flex h-12 md:h-16 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-md px-8 md:px-12 text-xs md:text-sm font-bold text-white transition-all hover:bg-white hover:text-slate-900"
                    >
                      Our Story
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Slider Controls - Minimalist */}
          <div className="absolute bottom-6 right-6 md:bottom-12 md:right-12 flex items-center gap-4 md:gap-6 z-20">
            <div className="hidden md:flex gap-2">
              {banners.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className="group relative h-12 w-2"
                  aria-label={`Go to slide ${idx + 1}`}
                >
                  <div className={`absolute inset-0 rounded-full transition-all duration-500 ${currentSlide === idx ? 'bg-accent h-full' : 'bg-white/30 h-1/2 group-hover:h-3/4'}`} />
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <button 
                onClick={prevSlide}
                aria-label="Previous slide"
                className="flex h-10 w-10 md:h-14 md:w-14 items-center justify-center rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 transition-all hover:bg-white hover:text-slate-900"
              >
                <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
              </button>
              <button 
                onClick={nextSlide}
                aria-label="Next slide"
                className="flex h-10 w-10 md:h-14 md:w-14 items-center justify-center rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 transition-all hover:bg-white hover:text-slate-900"
              >
                <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
              </button>
            </div>
          </div>
        </section>

        {/* Categories Grid - Organic Shapes */}
        <section className="container mx-auto px-4 py-24">
          <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-4">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">Explore</span>
              <h2 className="text-4xl md:text-5xl font-serif font-medium text-foreground">Shop by Category</h2>
            </div>
            <Link href="/collections/all" className="group flex items-center gap-2 text-sm font-bold text-primary">
              Browse All Collections <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8">
            {categories.map((category, idx) => (
              <motion.div
                key={category.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Link 
                  href={`/collections/${category.slug}`}
                  className="group flex flex-col items-center gap-4 text-center"
                >
                  <div className="relative h-32 w-32 md:h-40 md:w-40 overflow-hidden rounded-[2.5rem] bg-accent/50 transition-all duration-500 group-hover:rounded-full group-hover:shadow-xl">
                    <Image
                      src={category.image_url}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <span className="text-sm font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">{category.name}</span>
                </Link>
              </motion.div>
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
        <section className="bg-white py-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-4">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-primary">Curated</span>
                <h2 className="text-4xl md:text-5xl font-serif font-medium text-foreground">Featured Essentials</h2>
              </div>
              <Link href="/collections/all" className="group flex items-center gap-2 text-sm font-bold text-primary">
                Shop All Products <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {featuredProducts.map((product, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <ProductCard product={{ ...product, id: String(idx) }} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Small Banners Section */}
        {smallBanners.length > 0 && (
          <section className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {smallBanners.map((banner, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="relative h-[250px] md:h-[350px] overflow-hidden rounded-[2.5rem] group"
                >
                  <Image
                    src={banner.image_url}
                    alt={banner.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-8 text-white">
                    <h3 className="text-2xl font-bold mb-2">{banner.title}</h3>
                    <p className="text-sm text-white/80 mb-4">{banner.subtitle}</p>
                    <Link 
                      href={banner.link_url}
                      className="inline-flex h-10 w-fit items-center justify-center rounded-full bg-white px-6 text-xs font-bold text-slate-900 transition-all hover:scale-105"
                    >
                      Explore Now
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Brand Stories Section */}
        <BrandStories />

        {/* Promotional Banner / Widgets */}
        {widgets.length > 0 ? (
          <section className="container mx-auto px-4 py-8 space-y-8">
            {widgets.map((widget: any, idx: number) => (
              <div key={idx} className="relative h-[250px] md:h-[350px] w-full overflow-hidden rounded-2xl md:rounded-[2.5rem]">
                <Image
                  src={widget.image_url}
                  alt={widget.title}
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent flex flex-col justify-center px-6 md:px-16 text-white">
                  <h3 className="text-2xl md:text-4xl font-bold mb-2 max-w-xs md:max-w-md">{widget.title}</h3>
                  <p className="text-sm md:text-lg text-white/90 mb-6 max-w-[200px] md:max-w-md line-clamp-2 md:line-clamp-none">{widget.subtitle}</p>
                  <Link 
                    href={widget.link_url} 
                    className="inline-flex h-10 md:h-12 w-fit items-center justify-center rounded-full bg-white px-6 md:px-8 text-xs md:text-sm font-bold text-primary transition-all hover:scale-105"
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
            ))}
          </section>
        ) : (
          <section className="container mx-auto px-4 py-8">
            <div className="relative h-[250px] md:h-[300px] w-full overflow-hidden rounded-2xl md:rounded-[2.5rem]">
              <Image
                src="https://cdn.shopify.com/s/files/1/0662/7960/4283/files/B_972x384_25a4473c-2187-4cf0-a673-27623227a740.jpg"
                alt="Promotion"
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent flex flex-col justify-center px-6 md:px-16 text-white">
                <h3 className="text-2xl md:text-4xl font-bold mb-2 max-w-xs md:max-w-md">Ultimate Baby Care Combo</h3>
                <p className="text-sm md:text-lg text-white/90 mb-6 max-w-[200px] md:max-w-md line-clamp-2 md:line-clamp-none">Get 20% OFF on our best-selling 4-pack combo. Limited time offer!</p>
                <Link 
                  href="/products/combo-lotion-wash-shampoo-talcum-4-pack" 
                  className="inline-flex h-10 md:h-12 w-fit items-center justify-center rounded-full bg-white px-6 md:px-8 text-xs md:text-sm font-bold text-primary transition-all hover:scale-105"
                >
                  Shop Combo
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Newsletter */}
        <section className="bg-primary py-16 text-white">
          <div className="container mx-auto px-4 text-center max-w-2xl">
            <h2 className="text-3xl font-serif font-bold mb-4">Join the Hushabye Family</h2>
            <p className="text-white/80 mb-8">Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
            <form className="flex flex-col sm:flex-row gap-2" suppressHydrationWarning>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 rounded-full px-6 py-3 text-slate-900 focus:outline-none"
                required
                suppressHydrationWarning
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
