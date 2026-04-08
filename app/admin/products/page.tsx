'use client';

import { useState, useEffect } from 'react';
import seedData from '@/src/data/seed.json';
import { supabase } from '@/src/lib/supabase';
import { 
  Search, 
  Filter, 
  Plus, 
  Edit2, 
  Trash2, 
  Globe, 
  Eye,
  CheckCircle2,
  AlertCircle,
  Loader2
} from 'lucide-react';
import Image from 'next/image';

export default function AdminProducts() {
  const [activeTab, setActiveTab] = useState<'all' | 'seo'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState<any[]>(seedData.products);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.from('products').select('*');
      if (error) throw error;
      if (data && data.length > 0) {
        setProducts(data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteProduct(id: string) {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    try {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) throw error;
      setProducts(products.filter(p => p.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product. Make sure Supabase is configured.');
    }
  }

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex p-1 bg-slate-100 rounded-xl">
          <button 
            onClick={() => setActiveTab('all')}
            className={`px-6 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === 'all' ? 'bg-white text-primary shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            All Products
          </button>
          <button 
            onClick={() => setActiveTab('seo')}
            className={`px-6 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === 'seo' ? 'bg-white text-primary shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            SEO Optimization
          </button>
        </div>
        <button className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all hover:scale-105">
          <Plus className="h-4 w-4" /> Add Product
        </button>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search products by name or slug..." 
            className="h-12 w-full rounded-xl border border-slate-200 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button className="flex h-12 items-center gap-2 rounded-xl border border-slate-200 px-6 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">
            <Filter className="h-4 w-4" /> Filter
          </button>
        </div>
      </div>

      <div className="rounded-3xl bg-white shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">Product</th>
              {activeTab === 'all' ? (
                <>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">Price</th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">Status</th>
                </>
              ) : (
                <>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">SEO Title</th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">Meta Description</th>
                </>
              )}
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filteredProducts.map((product) => (
              <tr key={product.slug} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="relative h-12 w-12 rounded-lg overflow-hidden bg-slate-100">
                      <Image src={product.images[0]?.url} alt={product.name} fill className="object-cover" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{product.name}</p>
                      <p className="text-xs text-slate-400">/{product.slug}</p>
                    </div>
                  </div>
                </td>
                {activeTab === 'all' ? (
                  <>
                    <td className="px-6 py-4">
                      <p className="text-sm font-bold text-slate-900">₹{product.price}</p>
                      <p className="text-[10px] text-slate-400 line-through">₹{product.compare_at_price}</p>
                    </td>
                    <td className="px-6 py-4">
                      {product.seo_description ? (
                        <div className="flex items-center gap-1.5 text-emerald-500">
                          <CheckCircle2 className="h-4 w-4" />
                          <span className="text-xs font-bold">Optimized</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-amber-500">
                          <AlertCircle className="h-4 w-4" />
                          <span className="text-xs font-bold">Incomplete</span>
                        </div>
                      )}
                    </td>
                  </>
                ) : (
                  <>
                    <td className="px-6 py-4">
                      <p className="text-xs text-slate-600 max-w-[200px] truncate">{product.seo_title || 'N/A'}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-xs text-slate-500 max-w-[300px] line-clamp-1">{product.seo_description || 'No description set'}</p>
                    </td>
                  </>
                )}
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 hover:bg-primary/10 rounded-lg text-primary transition-colors" title="Edit SEO">
                      <Globe className="h-4 w-4" />
                    </button>
                    <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors" title="Edit Product">
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => deleteProduct(product.id)}
                      className="p-2 hover:bg-red-50 rounded-lg text-red-600 transition-colors" 
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
