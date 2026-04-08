import { NextResponse } from 'next/server';
import { getRazorpayInstance } from '@/src/lib/razorpay-server';

export async function POST(req: Request) {
  try {
    const { amount, currency, receipt } = await req.json();

    const razorpay = getRazorpayInstance();

    const options = {
      amount: amount * 100, // amount in the smallest currency unit
      currency: currency || 'INR',
      receipt: receipt || `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json(order);
  } catch (error: any) {
    console.error('Razorpay order creation failed:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
