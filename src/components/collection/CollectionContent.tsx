'use client';

import Link from 'next/link';
import { useState, useMemo } from 'react';
import { ChevronRight, Filter, SlidersHorizontal, Check } from 'lucide-react';
import Header from '@/src/components/layout/Header';
import Footer from '@/src/components/layout/Footer';
import ProductCard from '@/src/components/product/ProductCard';
import seedData from '@/src/data/seed.json';
import { cn } from '@/src/lib/utils';

interface CollectionContentProps {
  slug: string;
  category: any;
  products: any[];
}

export default function CollectionContent({ slug, category, products }: CollectionContentProps) {
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('featured');

  // Extract unique tags from products
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    products.forEach(product => {
      product.tags?.forEach((tag: string) => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [products]);

  // Extract unique brands (assuming first word of name is brand)
  const allBrands = useMemo(() => {
    const brands = new Set<string>();
    products.forEach(product => {
      const brand = product.name.split(' ')[0];
      if (brand) brands.add(brand);
    });
    return Array.from(brands).sort();
  }, [products]);

  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  // Filtering logic
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by Price
    if (selectedPriceRanges.length > 0) {
      result = result.filter(product => {
        return selectedPriceRanges.some(range => {
          if (range === 'under-500') return product.price < 500;
          if (range === '500-1000') return product.price >= 500 && product.price <= 1000;
          if (range === 'over-1000') return product.price > 1000;
          return true;
        });
      });
    }

    // Filter by Tags
    if (selectedTags.length > 0) {
      result = result.filter(product => 
        selectedTags.some(tag => product.tags?.includes(tag))
      );
    }

    // Filter by Brands
    if (selectedBrands.length > 0) {
      result = result.filter(product => 
        selectedBrands.some(brand => product.name.startsWith(brand))
      );
    }

    // Sort
    if (sortBy === 'price-low-high') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high-low') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'newest') {
      // Assuming index is a proxy for newest if no date
      result.reverse();
    }

    return result;
  }, [products, selectedPriceRanges, selectedTags, selectedBrands, sortBy]);

  const togglePriceRange = (range: string) => {
    setSelectedPriceRanges(prev => 
      prev.includes(range) ? prev.filter(r => r !== range) : [...prev, range]
    );
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

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
              <h3 className="font-bold mb-4 flex items-center gap-2 text-slate-900">
                <Filter className="h-4 w-4" /> Categories
              </h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li key="all">
                  <Link 
                    href="/collections/all"
                    className={cn(
                      "hover:text-primary transition-colors",
                      slug === 'all' ? 'text-primary font-bold' : ''
                    )}
                  >
                    All Products
                  </Link>
                </li>
                {seedData.categories.map(cat => (
                  <li key={cat.slug}>
                    <Link 
                      href={`/collections/${cat.slug}`}
                      className={cn(
                        "hover:text-primary transition-colors",
                        slug === cat.slug ? 'text-primary font-bold' : ''
                      )}
                    >
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {allBrands.length > 0 && (
              <div>
                <h3 className="font-bold mb-4 text-slate-900">Brands</h3>
                <div className="space-y-2">
                  {allBrands.map(brand => (
                    <label key={brand} className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer group">
                      <div 
                        onClick={() => toggleBrand(brand)}
                        className={cn(
                          "h-4 w-4 rounded border flex items-center justify-center transition-all",
                          selectedBrands.includes(brand) ? "bg-primary border-primary" : "border-slate-300 group-hover:border-primary"
                        )}
                      >
                        {selectedBrands.includes(brand) && <Check className="h-3 w-3 text-white" />}
                      </div>
                      <span>{brand}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h3 className="font-bold mb-4 text-slate-900">Price Range</h3>
              <div className="space-y-2">
                {[
                  { id: 'under-500', label: 'Under ₹500' },
                  { id: '500-1000', label: '₹500 - ₹1000' },
                  { id: 'over-1000', label: 'Over ₹1000' }
                ].map(range => (
                  <label key={range.id} className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer group">
                    <div 
                      onClick={() => togglePriceRange(range.id)}
                      className={cn(
                        "h-4 w-4 rounded border flex items-center justify-center transition-all",
                        selectedPriceRanges.includes(range.id) ? "bg-primary border-primary" : "border-slate-300 group-hover:border-primary"
                      )}
                    >
                      {selectedPriceRanges.includes(range.id) && <Check className="h-3 w-3 text-white" />}
                    </div>
                    <span>{range.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {allTags.length > 0 && (
              <div>
                <h3 className="font-bold mb-4 text-slate-900">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {allTags.map(tag => (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={cn(
                        "px-3 py-1 rounded-full text-xs font-medium transition-all",
                        selectedTags.includes(tag) 
                          ? "bg-primary text-white shadow-sm" 
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      )}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 capitalize mb-1">
                  {category?.name || (slug === 'all' ? 'All Products' : slug)}
                </h1>
                <p className="text-sm text-slate-500">
                  Showing {filteredProducts.length} of {products.length} products
                </p>
              </div>
              
              <div className="flex items-center gap-4 self-end md:self-auto">
                <div className="relative group">
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-white border rounded-lg pl-10 pr-8 py-2 text-sm font-medium cursor-pointer hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="featured">Featured</option>
                    <option value="newest">Newest Arrivals</option>
                    <option value="price-low-high">Price: Low to High</option>
                    <option value="price-high-low">Price: High to Low</option>
                  </select>
                  <SlidersHorizontal className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                </div>
              </div>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product, idx) => (
                  <ProductCard key={idx} product={{ ...product, id: String(idx) }} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 text-center bg-slate-50 rounded-[2rem] border border-dashed border-slate-200">
                <div className="h-24 w-24 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm">
                  <Filter className="h-12 w-12 text-slate-300" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">No products found</h3>
                <p className="text-slate-500 max-w-xs mx-auto mt-2">
                  We couldn&apos;t find any products matching your current filters. Try clearing some filters.
                </p>
                <button 
                  onClick={() => {
                    setSelectedPriceRanges([]);
                    setSelectedTags([]);
                    setSelectedBrands([]);
                  }}
                  className="mt-6 text-primary font-bold hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
