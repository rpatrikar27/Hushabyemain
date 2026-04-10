'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ShoppingCart, User, Search, Heart, Menu, X } from 'lucide-react';
import { useCartStore } from '@/src/store/cartStore';
import { useAuthStore } from '@/src/store/authStore';
import { cn } from '@/src/lib/utils';
import { motion, AnimatePresence } from 'motion/react';

import Image from 'next/image';

interface HeaderProps {
  isTransparent?: boolean;
}

export default function Header({ isTransparent = false }: HeaderProps) {
  const cartItems = useCartStore((state) => state.items);
  const user = useAuthStore((state) => state.user);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Shampoo', href: '/collections/shampoo' },
    { name: 'Diaper', href: '/collections/diaper' },
    { name: 'Lotion', href: '/collections/lotion' },
    { name: 'Combo', href: '/collections/combo' },
  ];

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-300",
      isTransparent && !isMenuOpen
        ? "bg-transparent border-none" 
        : "border-b border-primary/5 bg-background/80 backdrop-blur-xl"
    )}>
      <div className="container mx-auto flex h-20 md:h-28 items-center px-4">
        {/* Left: Mobile Menu Toggle & Desktop Nav */}
        <div className="flex-1 flex justify-start items-center">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={cn(
              "md:hidden p-2 rounded-full transition-colors",
              isTransparent && !isMenuOpen ? "text-white hover:bg-white/10" : "hover:bg-primary/5 text-foreground/70"
            )}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          <nav className={cn(
            "hidden md:flex items-center gap-8 text-[13px] font-bold uppercase tracking-widest",
            isTransparent && !isMenuOpen ? "text-white" : "text-muted-foreground"
          )}>
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className={cn(
                  "transition-all hover:scale-110 whitespace-nowrap",
                  isTransparent && !isMenuOpen ? "hover:text-accent" : "hover:text-primary"
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
            <div className="relative h-12 w-12 md:h-20 md:w-20 overflow-hidden rounded-xl transition-all hover:scale-105">
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
            isTransparent && !isMenuOpen ? "text-white hover:bg-white/10" : "hover:bg-primary/5 text-foreground/70"
          )}>
            <Search className="h-5 w-5" />
          </button>
          <Link href="/account" className={cn(
            "hidden sm:flex p-2 md:p-3 rounded-full transition-colors",
            isTransparent && !isMenuOpen ? "text-white hover:bg-white/10" : "hover:bg-primary/5 text-foreground/70"
          )}>
            <User className="h-5 w-5" />
          </Link>
          <Link href="/cart" className={cn(
            "relative p-2 md:p-3 rounded-full transition-colors",
            isTransparent && !isMenuOpen ? "text-white hover:bg-white/10" : "hover:bg-primary/5 text-foreground/70"
          )}>
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 md:top-2 md:right-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-white shadow-sm">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-100 overflow-hidden"
          >
            <nav className="flex flex-col p-6 space-y-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-lg font-bold text-slate-900 hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                <Link 
                  href="/account" 
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-2 text-sm font-medium text-slate-600"
                >
                  <User className="h-5 w-5" /> My Account
                </Link>
                <Link 
                  href="/wishlist" 
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-2 text-sm font-medium text-slate-600"
                >
                  <Heart className="h-5 w-5" /> Wishlist
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
