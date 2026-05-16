import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Baby Care Store</h1>
      <p className="text-xl mb-8">Premium products for your little ones.</p>
      <Link 
        href="/checkout"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
      >
        Go to Checkout Demo
      </Link>
    </main>
  );
}
