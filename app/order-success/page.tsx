import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';

export default function OrderSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 p-3 rounded-full">
            <CheckCircle2 className="w-16 h-16 text-green-600" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
        <p className="text-gray-600 mb-8">
          Thank you for your purchase. Your baby care products will be delivered soon.
        </p>
        
        <div className="bg-gray-50 rounded-lg p-4 mb-8 text-left border border-gray-100">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-500">Order Status</span>
            <span className="font-semibold text-green-600 uppercase tracking-wider text-xs bg-green-50 px-2 py-0.5 rounded">Processing</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Estimated Delivery</span>
            <span className="text-gray-900 font-medium">3-5 Business Days</span>
          </div>
        </div>

        <div className="space-y-3">
          <Link 
            href="/"
            className="block w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-xl hover:bg-blue-700 transition shadow-sm"
          >
            Continue Shopping
          </Link>
          <p className="text-xs text-gray-400">
            A confirmation email has been sent to your registered address.
          </p>
        </div>
      </div>
    </div>
  );
}
