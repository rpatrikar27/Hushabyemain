import { NextRequest, NextResponse } from 'next/server';
import { getRazorpay } from '@/src/lib/razorpay';

export async function POST(req: NextRequest) {
  try {
    const { amount, currency = 'INR', receipt } = await req.json();

    if (!amount) {
      return NextResponse.json({ error: 'Amount is required' }, { status: 400 });
    }

    const razorpay = getRazorpay();
    const options = {
      amount: Math.round(amount * 100), // Razorpay expects amount in paise
      currency,
      receipt: receipt || `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json(order);
  } catch (error: any) {
    console.error('Error creating Razorpay order:', error);
    return NextResponse.json(
      { error: 'Failed to create payment order', details: error.message },
      { status: 500 }
    );
  }
}
