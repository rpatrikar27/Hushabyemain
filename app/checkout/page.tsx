'use client';

import { useState } from 'react';
import Script from 'next/script';

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    try {
      // 1. Create order on server
      const response = await fetch('/api/razorpay/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: 500, // Example amount in INR
        }),
      });

      const order = await response.json();

      if (!response.ok) {
        throw new Error(order.error || 'Failed to create order');
      }

      // 2. Open Razorpay Checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'Baby Care Store',
        description: 'Test Transaction',
        order_id: order.id,
        handler: async function (response: any) {
          try {
            // Verify payment on the server
            const verifyRes = await fetch('/api/razorpay/verify', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyRes.json();

            if (verifyRes.ok) {
              window.location.href = '/order-success';
            } else {
              throw new Error(verifyData.message || 'Verification failed');
            }
          } catch (err: any) {
            console.error('Verification Error:', err);
            alert('Payment verification failed: ' + err.message);
          }
        },
        prefill: {
          name: 'Customer Name',
          email: 'customer@example.com',
          contact: '9999999999',
        },
        theme: {
          color: '#2563eb',
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error: any) {
      console.error('Payment Error:', error);
      alert('Payment failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold mb-6">Payment Checkout</h1>
        <div className="border-t border-b py-4 mb-6">
          <div className="flex justify-between mb-2">
            <span>Product Alpha</span>
            <span>₹500.00</span>
          </div>
          <div className="flex justify-between font-bold text-lg mt-4">
            <span>Total</span>
            <span>₹500.00</span>
          </div>
        </div>
        
        <button
          onClick={handlePayment}
          disabled={loading}
          className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? 'Processing...' : 'Pay with Razorpay'}
        </button>
        
        <p className="text-xs text-gray-500 mt-4 text-center">
          Note: Ensure RAZORPAY_KEY_ID is set in environment.
        </p>
      </div>
    </div>
  );
}
