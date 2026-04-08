'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Star, ShoppingCart, ShieldCheck, Heart, Info, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import Header from '@/src/components/layout/Header';
import Footer from '@/src/components/layout/Footer';
import { Button } from '@/src/components/ui/Button';
import { Badge } from '@/src/components/ui/Badge';
import { useCartStore } from '@/src/store/cartStore';
import Link from 'next/link';

interface ProductContentProps {
  product: any;
}

export default function ProductContent({ product }: ProductContentProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [quantity, setQuantity] = useState(1);

  const discount = product.compare_at_price 
    ? Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100)
    : 0;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.images.map((img: any) => img.url),
    description: product.description,
    sku: product.slug,
    brand: {
      '@type': 'Brand',
      name: 'Hushabye',
    },
    offers: {
      '@type': 'Offer',
      url: `https://hushabye.in/products/${product.slug}`,
      priceCurrency: 'INR',
      price: product.price,
      availability: 'https://schema.org/InStock',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '120',
    },
  };

  return (
    <div className="flex min-h-screen flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
          <Link href="/">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/collections/all">Products</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-slate-900 font-medium truncate">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-2xl border bg-slate-50">
              <Image
                src={product.images[0]?.url || 'https://picsum.photos/seed/product/800/800'}
                alt={product.images[0]?.alt || product.name}
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
              {discount > 0 && (
                <Badge className="absolute top-4 left-4 bg-red-500 text-sm px-3 py-1">
                  {discount}% OFF
                </Badge>
              )}
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img: any, idx: number) => (
                <div key={idx} className="relative aspect-square overflow-hidden rounded-lg border bg-slate-50 cursor-pointer hover:border-primary">
                  <Image
                    src={img.url}
                    alt={img.alt}
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">{product.name}</h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                  <span className="text-sm text-slate-500 ml-1">4.8 (120 reviews)</span>
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-700 border-none">In Stock</Badge>
              </div>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold text-slate-900">₹{product.price}</span>
              {product.compare_at_price && (
                <span className="text-xl text-slate-400 line-through">₹{product.compare_at_price}</span>
              )}
            </div>

            <p className="text-slate-600 leading-relaxed">
              {product.short_description || product.description}
            </p>

            {/* Attributes */}
            {product.attributes && product.attributes.length > 0 && (
              <div className="space-y-3">
                <span className="text-sm font-bold text-slate-900 uppercase tracking-wider">Specifications</span>
                <div className="grid grid-cols-2 gap-4">
                  {product.attributes.map((attr: any, idx: number) => (
                    <div key={idx} className="flex flex-col p-3 rounded-lg bg-slate-50 border">
                      <span className="text-xs text-slate-500">{attr.key}</span>
                      <span className="font-semibold text-slate-800">{attr.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity and Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <div className="flex items-center border rounded-full px-4 py-2 w-fit">
                <button 
                  className="p-1 hover:text-primary disabled:opacity-50"
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="w-12 text-center font-bold">{quantity}</span>
                <button 
                  className="p-1 hover:text-primary"
                  onClick={() => setQuantity(q => q + 1)}
                >
                  +
                </button>
              </div>
              <Button 
                className="flex-1 rounded-full h-12 text-lg font-bold"
                onClick={() => {
                  addItem({
                    id: String(product.slug),
                    name: product.name,
                    price: product.price,
                    quantity: quantity,
                    image: product.images[0]?.url,
                  });
                }}
              >
                <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t">
              <div className="flex flex-col items-center text-center gap-2">
                <ShieldCheck className="h-6 w-6 text-primary" />
                <span className="text-[10px] font-bold uppercase text-slate-500">Dermatologically Tested</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <Heart className="h-6 w-6 text-primary" />
                <span className="text-[10px] font-bold uppercase text-slate-500">Paraben Free</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <Info className="h-6 w-6 text-primary" />
                <span className="text-[10px] font-bold uppercase text-slate-500">Tear-Free Formula</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs / Detailed Description */}
        <div className="mt-16 pt-16 border-t">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Product Description</h2>
            <div className="prose prose-slate max-w-none text-slate-600">
              {product.description}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
