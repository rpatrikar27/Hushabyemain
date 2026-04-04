'use client';

import Link from 'next/link';
import { ShoppingCart, User, Search, Menu } from 'lucide-react';
import { useCartStore } from '@/src/store/cartStore';
import { useAuthStore } from '@/src/store/authStore';

export default function Header() {
  const cartItems = useCartStore((state) => state.items);
  const user = useAuthStore((state) => state.user);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold tracking-tight text-primary">Hushabye</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/collections/shampoo" className="transition-colors hover:text-primary">Shampoo</Link>
            <Link href="/collections/diaper" className="transition-colors hover:text-primary">Diaper</Link>
            <Link href="/collections/lotion" className="transition-colors hover:text-primary">Lotion</Link>
            <Link href="/collections/combo" className="transition-colors hover:text-primary">Combo</Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-accent rounded-full">
            <Search className="h-5 w-5" />
          </button>
          <Link href="/account" className="p-2 hover:bg-accent rounded-full">
            <User className="h-5 w-5" />
          </Link>
          <Link href="/cart" className="relative p-2 hover:bg-accent rounded-full">
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-white">
                {cartCount}
              </span>
            )}
          </Link>
          <button className="md:hidden p-2 hover:bg-accent rounded-full">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
