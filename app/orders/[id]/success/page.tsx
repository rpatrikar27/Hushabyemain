'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, Package, Truck, Calendar, ArrowRight, ShoppingBag } from 'lucide-react';
import { motion } from 'motion/react';
import Header from '@/src/components/layout/Header';
import Footer from '@/src/components/layout/Footer';
import { Button } from '@/src/components/ui/Button';

export default function OrderSuccessPage() {
  const { id } = useParams();

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="mb-8 flex justify-center"
          >
            <div className="h-24 w-24 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
          </motion.div>

          <h1 className="text-4xl font-bold text-slate-900 mb-4">Thank You for Your Order!</h1>
          <p className="text-lg text-slate-600 mb-8">
            Your order <span className="font-bold text-primary">#{id}</span> has been placed successfully. 
            We&apos;ve sent a confirmation email to your registered address.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="p-6 rounded-2xl bg-white border shadow-sm flex flex-col items-center gap-3">
              <Package className="h-8 w-8 text-primary" />
              <div className="text-sm">
                <span className="block font-bold">Order Status</span>
                <span className="text-slate-500">Confirmed</span>
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-white border shadow-sm flex flex-col items-center gap-3">
              <Truck className="h-8 w-8 text-primary" />
              <div className="text-sm">
                <span className="block font-bold">Shipping</span>
                <span className="text-slate-500">Standard Delivery</span>
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-white border shadow-sm flex flex-col items-center gap-3">
              <Calendar className="h-8 w-8 text-primary" />
              <div className="text-sm">
                <span className="block font-bold">Est. Delivery</span>
                <span className="text-slate-500">3-5 Business Days</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/account">
              <Button variant="outline" className="rounded-full px-8 h-12">
                Track Order <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/collections/all">
              <Button className="rounded-full px-8 h-12">
                Continue Shopping <ShoppingBag className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
