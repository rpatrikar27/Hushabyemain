'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Star } from 'lucide-react';
import { Button } from '@/src/components/ui/Button';
import { Badge } from '@/src/components/ui/Badge';
import { useCartStore } from '@/src/store/cartStore';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    compare_at_price?: number;
    images: { url: string; alt: string }[];
    is_featured?: boolean;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  const discount = product.compare_at_price 
    ? Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100)
    : 0;

  return (
    <div className="group relative flex flex-col transition-all duration-500">
      <Link 
        href={`/products/${product.slug}`} 
        className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-white border border-slate-100 p-8"
      >
        <Image
          src={product.images[0]?.url || 'https://picsum.photos/seed/product/400/500'}
          alt={product.images[0]?.alt || product.name}
          fill
          className="object-contain p-8 transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/5" />
        
        {discount > 0 && (
          <div className="absolute top-4 left-4 rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-destructive shadow-sm">
            {discount}% OFF
          </div>
        )}

        <button 
          onClick={(e) => {
            e.preventDefault();
            addItem({
              id: product.id,
              name: product.name,
              price: product.price,
              quantity: 1,
              image: product.images[0]?.url,
            });
          }}
          className="absolute bottom-4 right-4 flex h-12 w-12 items-center justify-center rounded-full bg-white text-primary shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0"
        >
          <ShoppingCart className="h-5 w-5" />
        </button>
      </Link>
      
      <div className="mt-6 space-y-2 px-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-yellow-500">
            <Star className="h-3 w-3 fill-current" />
            <span className="text-[10px] font-bold tracking-tighter text-muted-foreground">4.8 (120)</span>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-primary/60">New Arrival</span>
        </div>
        
        <Link href={`/products/${product.slug}`} className="block">
          <h3 className="font-display text-lg font-medium text-foreground transition-colors group-hover:text-primary line-clamp-1">
            {product.name}
          </h3>
        </Link>
        
        <div className="flex items-baseline gap-2">
          <span className="text-xl font-bold text-primary">₹{product.price}</span>
          {product.compare_at_price && (
            <span className="text-sm text-muted-foreground line-through decoration-destructive/30">₹{product.compare_at_price}</span>
          )}
        </div>
      </div>
    </div>
  );
}
