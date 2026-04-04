'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Trash2, ShoppingBag, ArrowRight, Minus, Plus, ShieldCheck } from 'lucide-react';
import Header from '@/src/components/layout/Header';
import Footer from '@/src/components/layout/Footer';
import { Button } from '@/src/components/ui/Button';
import { useCartStore } from '@/src/store/cartStore';

export default function CartPage() {
  const { items, removeItem, updateQuantity, total } = useCartStore();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">Your Shopping Cart</h1>

        {items.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 rounded-xl border bg-white shadow-sm">
                  <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg border bg-slate-50">
                    <Image
                      src={item.image || 'https://picsum.photos/seed/product/200/200'}
                      alt={item.name}
                      fill
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-bold text-slate-800">{item.name}</h3>
                        <p className="text-sm text-slate-500">₹{item.price}</p>
                      </div>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="text-slate-400 hover:text-destructive transition-colors"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border rounded-full px-3 py-1">
                        <button 
                          className="p-1 hover:text-primary disabled:opacity-50"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center font-bold text-sm">{item.quantity}</span>
                        <button 
                          className="p-1 hover:text-primary"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <span className="font-bold text-slate-900">₹{item.price * item.quantity}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="rounded-2xl border bg-slate-50 p-6 sticky top-24">
                <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal</span>
                    <span>₹{total}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Shipping</span>
                    <span>{total >= 499 ? 'FREE' : '₹49'}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Tax (GST 18%)</span>
                    <span>₹{Math.round(total * 0.18)}</span>
                  </div>
                  <div className="pt-4 border-t flex justify-between text-lg font-bold text-slate-900">
                    <span>Total</span>
                    <span>₹{total + (total >= 499 ? 0 : 49)}</span>
                  </div>
                </div>
                
                <Link href="/checkout">
                  <Button className="w-full mt-8 rounded-full h-12 text-lg font-bold">
                    Proceed to Checkout <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                
                <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-500">
                  <ShieldCheck className="h-4 w-4" /> 100% Secure Payments
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="h-24 w-24 bg-slate-50 rounded-full flex items-center justify-center mb-4">
              <ShoppingBag className="h-12 w-12 text-slate-300" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Your cart is empty</h2>
            <p className="text-slate-500 mb-8">Looks like you haven&apos;t added anything to your cart yet.</p>
            <Link href="/collections/all">
              <Button className="rounded-full px-8">Start Shopping</Button>
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
