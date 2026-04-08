'use client';

import Link from 'next/link';
import { ChevronRight, Filter, SlidersHorizontal } from 'lucide-react';
import Header from '@/src/components/layout/Header';
import Footer from '@/src/components/layout/Footer';
import ProductCard from '@/src/components/product/ProductCard';
import seedData from '@/src/data/seed.json';

interface CollectionContentProps {
  slug: string;
  category: any;
  products: any[];
}

export default function CollectionContent({ slug, category, products }: CollectionContentProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
          <Link href="/">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-slate-900 font-medium capitalize">{slug.replace('-', ' ')}</span>
        </nav>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="hidden md:block w-64 space-y-8">
            <div>
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Filter className="h-4 w-4" /> Categories
              </h3>
              <ul className="space-y-2 text-sm text-slate-600">
                {seedData.categories.map(cat => (
                  <li key={cat.slug}>
                    <Link 
                      href={`/collections/${cat.slug}`}
                      className={`hover:text-primary ${slug === cat.slug ? 'text-primary font-bold' : ''}`}
                    >
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Price Range</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm text-slate-600">
                  <input type="checkbox" className="rounded border-slate-300 text-primary focus:ring-primary" />
                  Under ₹500
                </label>
                <label className="flex items-center gap-2 text-sm text-slate-600">
                  <input type="checkbox" className="rounded border-slate-300 text-primary focus:ring-primary" />
                  ₹500 - ₹1000
                </label>
                <label className="flex items-center gap-2 text-sm text-slate-600">
                  <input type="checkbox" className="rounded border-slate-300 text-primary focus:ring-primary" />
                  Over ₹1000
                </label>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold text-slate-900 capitalize">
                {category?.name || (slug === 'all' ? 'All Products' : slug)}
              </h1>
              <div className="flex items-center gap-4">
                <span className="text-sm text-slate-500">{products.length} Products</span>
                <div className="flex items-center gap-2 border rounded-lg px-3 py-1.5 text-sm font-medium cursor-pointer hover:bg-slate-50">
                  <SlidersHorizontal className="h-4 w-4" /> Sort By
                </div>
              </div>
            </div>

            {products.length > 0 ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product, idx) => (
                  <ProductCard key={idx} product={{ ...product, id: String(idx) }} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="h-24 w-24 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                  <Filter className="h-12 w-12 text-slate-300" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">No products found</h3>
                <p className="text-slate-500">Try adjusting your filters or search criteria.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
