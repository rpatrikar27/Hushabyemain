'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronLeft, CreditCard, Truck, ShieldCheck, MapPin, Phone, User, Mail } from 'lucide-react';
import Header from '@/src/components/layout/Header';
import Footer from '@/src/components/layout/Footer';
import { Button } from '@/src/components/ui/Button';
import { useCartStore } from '@/src/store/cartStore';
import { loadRazorpay } from '@/src/lib/razorpay';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, total, clearCart } = useCartStore();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const shipping = total >= 499 ? 0 : 49;
  const grandTotal = total + shipping;

  const handlePayment = async () => {
    setLoading(true);
    const res = await loadRazorpay();

    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      setLoading(false);
      return;
    }

    // In a real app, you'd create an order on the server first
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: grandTotal * 100, // amount in the smallest currency unit
      currency: 'INR',
      name: 'Hushabye',
      description: 'Order Payment',
      handler: function (response: any) {
        console.log('Payment successful:', response);
        clearCart();
        router.push(`/orders/order_${Math.random().toString(36).substr(2, 9)}/success`);
      },
      prefill: {
        name: 'John Doe',
        email: 'john@example.com',
        contact: '9999999999',
      },
      theme: {
        color: '#ff8fa3',
      },
    };

    const paymentObject = new (window as any).Razorpay(options);
    paymentObject.open();
    setLoading(false);
  };

  if (items.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <Link href="/collections/all">
          <Button>Go to Shop</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/cart" className="p-2 hover:bg-white rounded-full transition-colors">
            <ChevronLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-3xl font-bold text-slate-900">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Checkout Steps */}
          <div className="lg:col-span-2 space-y-8">
            {/* Step 1: Contact Info */}
            <div className={`p-6 rounded-2xl border bg-white shadow-sm transition-all ${step === 1 ? 'ring-2 ring-primary' : 'opacity-70'}`}>
              <div className="flex items-center gap-4 mb-6">
                <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold ${step === 1 ? 'bg-primary text-white' : 'bg-slate-100 text-slate-500'}`}>1</div>
                <h2 className="text-xl font-bold">Contact Information</h2>
              </div>
              
              {step === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                      <User className="h-4 w-4" /> Full Name
                    </label>
                    <input type="text" placeholder="John Doe" className="w-full rounded-lg border-slate-200 focus:border-primary focus:ring-primary" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                      <Mail className="h-4 w-4" /> Email Address
                    </label>
                    <input type="email" placeholder="john@example.com" className="w-full rounded-lg border-slate-200 focus:border-primary focus:ring-primary" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                      <Phone className="h-4 w-4" /> Phone Number
                    </label>
                    <input type="tel" placeholder="+91 99999 99999" className="w-full rounded-lg border-slate-200 focus:border-primary focus:ring-primary" />
                  </div>
                  <div className="flex items-end">
                    <Button onClick={() => setStep(2)} className="w-full rounded-lg h-11">Next Step</Button>
                  </div>
                </div>
              )}
            </div>

            {/* Step 2: Shipping Address */}
            <div className={`p-6 rounded-2xl border bg-white shadow-sm transition-all ${step === 2 ? 'ring-2 ring-primary' : 'opacity-70'}`}>
              <div className="flex items-center gap-4 mb-6">
                <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold ${step === 2 ? 'bg-primary text-white' : 'bg-slate-100 text-slate-500'}`}>2</div>
                <h2 className="text-xl font-bold">Shipping Address</h2>
              </div>
              
              {step === 2 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                      <MapPin className="h-4 w-4" /> Address Line 1
                    </label>
                    <input type="text" placeholder="House No, Street Name" className="w-full rounded-lg border-slate-200 focus:border-primary focus:ring-primary" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">City</label>
                      <input type="text" placeholder="Mumbai" className="w-full rounded-lg border-slate-200 focus:border-primary focus:ring-primary" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">State</label>
                      <select className="w-full rounded-lg border-slate-200 focus:border-primary focus:ring-primary">
                        <option>Maharashtra</option>
                        <option>Delhi</option>
                        <option>Karnataka</option>
                        <option>Tamil Nadu</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Pincode</label>
                      <input type="text" placeholder="400001" className="w-full rounded-lg border-slate-200 focus:border-primary focus:ring-primary" />
                    </div>
                    <div className="flex items-end">
                      <Button onClick={() => setStep(3)} className="w-full rounded-lg h-11">Next Step</Button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Step 3: Payment */}
            <div className={`p-6 rounded-2xl border bg-white shadow-sm transition-all ${step === 3 ? 'ring-2 ring-primary' : 'opacity-70'}`}>
              <div className="flex items-center gap-4 mb-6">
                <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold ${step === 3 ? 'bg-primary text-white' : 'bg-slate-100 text-slate-500'}`}>3</div>
                <h2 className="text-xl font-bold">Payment Method</h2>
              </div>
              
              {step === 3 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button className="flex items-center gap-4 p-4 rounded-xl border-2 border-primary bg-primary/5 text-left transition-all">
                      <CreditCard className="h-6 w-6 text-primary" />
                      <div>
                        <span className="font-bold block">Online Payment</span>
                        <span className="text-xs text-slate-500">Cards, UPI, NetBanking</span>
                      </div>
                    </button>
                    <button className="flex items-center gap-4 p-4 rounded-xl border-2 border-slate-100 hover:border-slate-200 text-left transition-all">
                      <Truck className="h-6 w-6 text-slate-400" />
                      <div>
                        <span className="font-bold block">Cash on Delivery</span>
                        <span className="text-xs text-slate-500">Pay when you receive</span>
                      </div>
                    </button>
                  </div>
                  <Button 
                    onClick={handlePayment} 
                    disabled={loading}
                    className="w-full rounded-full h-12 text-lg font-bold mt-4"
                  >
                    {loading ? 'Processing...' : `Pay ₹${grandTotal}`}
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="rounded-2xl border bg-white p-6 shadow-sm sticky top-24">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-slate-600">{item.name} x {item.quantity}</span>
                    <span className="font-bold">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
              
              <div className="space-y-3 pt-6 border-t text-sm">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span>₹{total}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-slate-900 pt-3 border-t">
                  <span>Total</span>
                  <span>₹{grandTotal}</span>
                </div>
              </div>
              
              <div className="mt-8 p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                <ShieldCheck className="h-8 w-8 text-primary" />
                <div className="text-[10px] text-slate-500 font-medium">
                  Your payment is secure. We use industry-standard encryption to protect your data.
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
