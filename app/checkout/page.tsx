'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronLeft, CreditCard, Truck, ShieldCheck, MapPin, Phone, User, Mail } from 'lucide-react';
import Header from '@/src/components/layout/Header';
import Footer from '@/src/components/layout/Footer';
import { Button } from '@/src/components/ui/Button';
import { useCartStore } from '@/src/store/cartStore';
import { useAuthStore } from '@/src/store/authStore';
import { loadRazorpay, createRazorpayOrder } from '@/src/lib/razorpay';
import { orderService, OrderData } from '@/src/services/orderService';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, total, clearCart } = useCartStore();
  const { user } = useAuthStore();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [formData, setFormData] = useState({
    fullName: user?.full_name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: 'Maharashtra',
    pincode: '',
  });

  const shipping = total >= 499 ? 0 : 49;
  const grandTotal = total + shipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === 'email') setEmailError('');
  };

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (!validateEmail(formData.email)) {
        setEmailError('Please enter a valid email address');
        return;
      }
    }
    setStep(step + 1);
  };

  const handlePayment = async () => {
    setLoading(true);
    try {
      const sdkLoaded = await loadRazorpay();
      if (!sdkLoaded) {
        throw new Error('Razorpay SDK failed to load');
      }

      // 1. Create Razorpay Order on server
      const rzpOrder = await createRazorpayOrder(grandTotal);

      // 2. Create Order in Supabase
      const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
      const orderData: OrderData = {
        customer_id: user?.id,
        order_number: orderNumber,
        status: 'pending',
        payment_status: 'pending',
        payment_method: 'razorpay',
        razorpay_order_id: rzpOrder.id,
        shipping_address: {
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          address_line1: formData.address,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
        },
        billing_address: {
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          address_line1: formData.address,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
        },
        line_items: items.map((item) => ({
          product_id: item.id,
          name: item.name,
          qty: item.quantity,
          unit_price: item.price,
          total: item.price * item.quantity,
          image: item.image,
        })),
        subtotal: total,
        discount_amount: 0,
        shipping_amount: shipping,
        tax_amount: 0,
        total: grandTotal,
      };

      const supabaseOrder = await orderService.createOrder(orderData);

      // 3. Open Razorpay Checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: rzpOrder.amount,
        currency: rzpOrder.currency,
        name: 'Hushabye',
        description: 'Order Payment',
        order_id: rzpOrder.id,
        handler: async function (response: any) {
          console.log('Payment successful:', response);
          
          // 4. Update order in Supabase
          await orderService.updateOrder(supabaseOrder.id, {
            payment_status: 'paid',
            status: 'processing',
            razorpay_payment_id: response.razorpay_payment_id,
          });

          clearCart();
          router.push(`/orders/${supabaseOrder.id}/success`);
        },
        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: '#006d5b',
        },
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();
    } catch (error: any) {
      console.error('Payment failed:', error);
      alert(error.message || 'Something went wrong during payment');
    } finally {
      setLoading(false);
    }
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
          <h1 className="text-3xl font-serif font-bold text-slate-900">Checkout</h1>
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
                    <input 
                      type="text" 
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="John Doe" 
                      className="w-full rounded-lg border-slate-200 focus:border-primary focus:ring-primary" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                      <Mail className="h-4 w-4" /> Email Address
                    </label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com" 
                      className={`w-full rounded-lg border-slate-200 focus:border-primary focus:ring-primary ${emailError ? 'border-red-500 ring-red-500' : ''}`} 
                    />
                    {emailError && <p className="text-xs text-red-500 mt-1">{emailError}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                      <Phone className="h-4 w-4" /> Phone Number
                    </label>
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+91 99999 99999" 
                      className="w-full rounded-lg border-slate-200 focus:border-primary focus:ring-primary" 
                    />
                  </div>
                  <div className="flex items-end">
                    <Button onClick={handleNextStep} className="w-full rounded-lg h-11">Next Step</Button>
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
                    <input 
                      type="text" 
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="House No, Street Name" 
                      className="w-full rounded-lg border-slate-200 focus:border-primary focus:ring-primary" 
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">City</label>
                      <input 
                        type="text" 
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="Mumbai" 
                        className="w-full rounded-lg border-slate-200 focus:border-primary focus:ring-primary" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">State</label>
                      <select 
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border-slate-200 focus:border-primary focus:ring-primary"
                      >
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="Tamil Nadu">Tamil Nadu</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Pincode</label>
                      <input 
                        type="text" 
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        placeholder="400001" 
                        className="w-full rounded-lg border-slate-200 focus:border-primary focus:ring-primary" 
                      />
                    </div>
                    <div className="flex items-end">
                      <Button onClick={handleNextStep} className="w-full rounded-lg h-11">Next Step</Button>
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
