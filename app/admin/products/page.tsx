'use client';

import { useState } from 'react';
import Image from 'next/image';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Eye, 
  Sparkles,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import AdminSidebar from '@/src/components/layout/AdminSidebar';
import { Button } from '@/src/components/ui/Button';
import { Badge } from '@/src/components/ui/Badge';
import seedData from '@/src/data/seed.json';
import { generateSEO } from '@/src/lib/gemini';
import { cn } from '@/lib/utils';

export default function AdminProducts() {
  const [products, setProducts] = useState(seedData.products);
  const [searchTerm, setSearchTerm] = useState('');
  const [isGeneratingSEO, setIsGeneratingSEO] = useState<string | null>(null);

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.sku?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAISuggestSEO = async (product: any) => {
    setIsGeneratingSEO(product.slug);
    try {
      const seo = await generateSEO(product.name, product.description);
      console.log('AI Suggested SEO:', seo);
      // In a real app, you'd update the product in the database here
      alert(`AI Suggested SEO for ${product.name}:\nTitle: ${seo.title}\nDescription: ${seo.description}`);
    } catch (error) {
      console.error('AI SEO Error:', error);
    } finally {
      setIsGeneratingSEO(null);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdminSidebar />
      
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Products</h1>
            <p className="text-slate-500">Manage your product catalog and inventory.</p>
          </div>
          <Button className="rounded-lg font-bold">
            <Plus className="mr-2 h-4 w-4" /> Add Product
          </Button>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by name, SKU..." 
              className="w-full pl-10 pr-4 py-2 rounded-lg border-slate-200 focus:border-primary focus:ring-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="rounded-lg bg-white">
              <Filter className="mr-2 h-4 w-4" /> Category
            </Button>
            <Button variant="outline" className="rounded-lg bg-white">
              <Filter className="mr-2 h-4 w-4" /> Status
            </Button>
          </div>
        </div>

        {/* Product Table */}
        <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b bg-slate-50/50">
                  <th className="py-4 px-6">Product</th>
                  <th className="py-4 px-6">Category</th>
                  <th className="py-4 px-6">Price</th>
                  <th className="py-4 px-6">Stock</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6">SEO Score</th>
                  <th className="py-4 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredProducts.map((product, idx) => {
                  const seoScore = product.seo_title && product.seo_description ? 100 : 40;
                  return (
                    <tr key={idx} className="text-sm hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="relative h-12 w-12 rounded-lg border bg-slate-50 overflow-hidden">
                            <Image 
                              src={product.images[0]?.url || 'https://picsum.photos/seed/product/100/100'} 
                              alt={product.name}
                              fill
                              className="object-cover"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <div className="flex flex-col">
                            <span className="font-bold text-slate-900 line-clamp-1">{product.name}</span>
                            <span className="text-xs text-slate-500 font-mono uppercase">{product.sku}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-slate-600">
                        {seedData.categories.find(c => c.id === product.category_id)?.name || 'Uncategorized'}
                      </td>
                      <td className="py-4 px-6 font-bold text-slate-900">₹{product.price}</td>
                      <td className="py-4 px-6">
                        <div className="flex flex-col">
                          <span className={cn("font-bold", product.stock_quantity < 10 ? "text-red-500" : "text-slate-900")}>
                            {product.stock_quantity}
                          </span>
                          {product.stock_quantity < 10 && (
                            <span className="text-[10px] text-red-400 font-bold uppercase">Low Stock</span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <Badge variant="secondary" className="bg-green-100 text-green-700 border-none text-[10px]">Active</Badge>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <div className="w-12 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div 
                              className={cn("h-full", seoScore === 100 ? "bg-green-500" : "bg-orange-400")} 
                              style={{ width: `${seoScore}%` }} 
                            />
                          </div>
                          <span className="text-xs font-bold text-slate-500">{seoScore}%</span>
                          {seoScore < 100 && (
                            <button 
                              onClick={() => handleAISuggestSEO(product)}
                              disabled={isGeneratingSEO === product.slug}
                              className="p-1 hover:bg-primary/10 rounded-full text-primary transition-colors"
                              title="Generate AI SEO"
                            >
                              <Sparkles className={cn("h-3.5 w-3.5", isGeneratingSEO === product.slug && "animate-pulse")} />
                            </button>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-destructive transition-colors">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
