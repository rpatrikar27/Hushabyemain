'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ShoppingCart, User, Search, Heart } from 'lucide-react';
import { useCartStore } from '@/src/store/cartStore';
import { useAuthStore } from '@/src/store/authStore';
import { cn } from '@/src/lib/utils';

import Image from 'next/image';

interface HeaderProps {
  isTransparent?: boolean;
}

export default function Header({ isTransparent = false }: HeaderProps) {
  const cartItems = useCartStore((state) => state.items);
  const user = useAuthStore((state) => state.user);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const navLinks = [
    { name: 'Shampoo', href: '/collections/shampoo' },
    { name: 'Diaper', href: '/collections/diaper' },
    { name: 'Lotion', href: '/collections/lotion' },
    { name: 'Combo', href: '/collections/combo' },
  ];

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-300",
      isTransparent 
        ? "bg-transparent border-none" 
        : "border-b border-primary/5 bg-background/80 backdrop-blur-xl"
    )}>
      <div className="container mx-auto flex h-24 md:h-32 items-center px-4">
        {/* Left: Navigation */}
        <div className="flex-1 flex justify-start">
          <nav className={cn(
            "flex items-center gap-3 md:gap-8 text-[9px] md:text-[13px] font-bold uppercase tracking-widest",
            isTransparent ? "text-white" : "text-muted-foreground"
          )}>
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className={cn(
                  "transition-all hover:scale-110 whitespace-nowrap",
                  isTransparent ? "hover:text-accent" : "hover:text-primary"
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Center: Logo */}
        <div className="flex-none flex justify-center">
          <Link href="/" className="flex items-center">
            <div className="relative h-16 w-16 md:h-24 md:w-24 overflow-hidden rounded-xl transition-all hover:scale-105">
              <Image 
                src="https://hushabye.in/cdn/shop/files/hushabay_logo.png" 
                alt="Hushabye Logo" 
                fill 
                className="object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
          </Link>
        </div>

        {/* Right: Icons */}
        <div className="flex-1 flex justify-end items-center gap-1 md:gap-2">
          <button className={cn(
            "p-2 md:p-3 rounded-full transition-colors",
            isTransparent ? "text-white hover:bg-white/10" : "hover:bg-primary/5 text-foreground/70"
          )}>
            <Search className="h-4 w-4 md:h-5 md:w-5" />
          </button>
          <Link href="/account" className={cn(
            "p-2 md:p-3 rounded-full transition-colors",
            isTransparent ? "text-white hover:bg-white/10" : "hover:bg-primary/5 text-foreground/70"
          )}>
            <User className="h-4 w-4 md:h-5 md:w-5" />
          </Link>
          <Link href="/cart" className={cn(
            "relative p-2 md:p-3 rounded-full transition-colors",
            isTransparent ? "text-white hover:bg-white/10" : "hover:bg-primary/5 text-foreground/70"
          )}>
            <ShoppingCart className="h-4 w-4 md:h-5 md:w-5" />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 md:top-2 md:right-2 flex h-3 w-3 md:h-4 md:w-4 items-center justify-center rounded-full bg-primary text-[8px] md:text-[9px] font-bold text-white shadow-sm">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
