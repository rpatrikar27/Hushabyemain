export const loadRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

export const createRazorpayOrder = async (amount: number) => {
  // In a real app, this would call a backend endpoint to create an order
  // For this demo, we'll simulate it or assume the backend handles it via Supabase Edge Functions
  console.log('Creating Razorpay order for amount:', amount);
  return { id: 'order_' + Math.random().toString(36).substr(2, 9) };
};
