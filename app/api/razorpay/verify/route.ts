import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();

    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keySecret) {
      return NextResponse.json({ error: 'RAZORPAY_KEY_SECRET is not set' }, { status: 500 });
    }

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', keySecret)
      .update(body.toString())
      .digest('hex');

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // Database update logic here
      return NextResponse.json({ status: 'success', message: 'Payment verified successfully' });
    } else {
      return NextResponse.json({ status: 'failure', message: 'Invalid signature' }, { status: 400 });
    }
  } catch (error: any) {
    console.error('Error verifying payment:', error);
    return NextResponse.json(
      { error: 'Verification failed', details: error.message },
      { status: 500 }
    );
  }
}
