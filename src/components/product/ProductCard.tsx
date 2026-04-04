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
    <div className="group relative flex flex-col overflow-hidden rounded-lg border bg-white transition-all hover:shadow-lg">
      <Link href={`/products/${product.slug}`} className="relative aspect-square overflow-hidden">
        <Image
          src={product.images[0]?.url || 'https://picsum.photos/seed/product/400/400'}
          alt={product.images[0]?.alt || product.name}
          fill
          className="object-cover transition-transform group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        {discount > 0 && (
          <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
            {discount}% OFF
          </Badge>
        )}
      </Link>
      
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center gap-1 text-yellow-400 mb-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-3 w-3 fill-current" />
          ))}
          <span className="text-xs text-slate-400 ml-1">(4.8)</span>
        </div>
        
        <Link href={`/products/${product.slug}`} className="flex-1">
          <h3 className="text-sm font-semibold text-slate-800 line-clamp-2 group-hover:text-primary">
            {product.name}
          </h3>
        </Link>
        
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-slate-900">₹{product.price}</span>
            {product.compare_at_price && (
              <span className="text-xs text-slate-400 line-through">₹{product.compare_at_price}</span>
            )}
          </div>
          <Button 
            size="icon" 
            variant="secondary" 
            className="h-8 w-8 rounded-full"
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
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
