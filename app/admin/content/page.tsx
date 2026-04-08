'use client';

import { useState, useEffect } from 'react';
import seedData from '@/src/data/seed.json';
import { supabase } from '@/src/lib/supabase';
import { 
  Plus, 
  Image as ImageIcon, 
  Layout, 
  Trash2, 
  Edit2, 
  Eye,
  CheckCircle2,
  XCircle,
  Loader2
} from 'lucide-react';
import Image from 'next/image';

export default function AdminContent() {
  const [activeTab, setActiveTab] = useState<'banners' | 'widgets'>('banners');
  const [banners, setBanners] = useState<any[]>(seedData.banners);
  const [widgets, setWidgets] = useState<any[]>(seedData.widgets || []);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchContent();
  }, []);

  async function fetchContent() {
    setIsLoading(true);
    try {
      const [
        { data: dbBanners },
        { data: dbWidgets }
      ] = await Promise.all([
        supabase.from('banners').select('*'),
        supabase.from('widgets').select('*')
      ]);

      if (dbBanners && dbBanners.length > 0) setBanners(dbBanners);
      if (dbWidgets && dbWidgets.length > 0) setWidgets(dbWidgets);
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteBanner(id: string) {
    if (!confirm('Are you sure you want to delete this banner?')) return;
    
    try {
      const { error } = await supabase.from('banners').delete().eq('id', id);
      if (error) throw error;
      setBanners(banners.filter(b => b.id !== id));
    } catch (error) {
      console.error('Error deleting banner:', error);
      alert('Failed to delete banner.');
    }
  }

  async function deleteWidget(id: string) {
    if (!confirm('Are you sure you want to delete this widget?')) return;
    
    try {
      const { error } = await supabase.from('widgets').delete().eq('id', id);
      if (error) throw error;
      setWidgets(widgets.filter(w => w.id !== id));
    } catch (error) {
      console.error('Error deleting widget:', error);
      alert('Failed to delete widget.');
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex p-1 bg-slate-100 rounded-xl">
          <button 
            onClick={() => setActiveTab('banners')}
            className={`px-6 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === 'banners' ? 'bg-white text-primary shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Banners
          </button>
          <button 
            onClick={() => setActiveTab('widgets')}
            className={`px-6 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === 'widgets' ? 'bg-white text-primary shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Widgets
          </button>
        </div>
        <button className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all hover:scale-105">
          <Plus className="h-4 w-4" /> Add {activeTab === 'banners' ? 'Banner' : 'Widget'}
        </button>
      </div>

      {activeTab === 'banners' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {banners.map((banner, idx) => (
            <div key={idx} className="group relative rounded-3xl bg-white shadow-sm border border-slate-100 overflow-hidden">
              <div className="relative aspect-[16/9] w-full bg-slate-100">
                <Image 
                  src={banner.image_url} 
                  alt={banner.title} 
                  fill 
                  className="object-cover transition-transform duration-500 group-hover:scale-105" 
                />
                <div className="absolute top-4 right-4">
                  {banner.is_active ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/90 backdrop-blur-md px-3 py-1 text-[10px] font-bold text-white uppercase tracking-widest">
                      <CheckCircle2 className="h-3 w-3" /> Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full bg-slate-500/90 backdrop-blur-md px-3 py-1 text-[10px] font-bold text-white uppercase tracking-widest">
                      <XCircle className="h-3 w-3" /> Inactive
                    </span>
                  )}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary">{banner.position}</span>
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors">
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => deleteBanner(banner.id)}
                      className="p-2 hover:bg-red-50 rounded-lg text-red-600 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-1">{banner.title}</h4>
                <p className="text-sm text-slate-500 line-clamp-2">{banner.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {widgets.length > 0 ? widgets.map((widget, idx) => (
            <div key={idx} className="group relative rounded-3xl bg-white shadow-sm border border-slate-100 overflow-hidden">
              <div className="relative aspect-[16/9] w-full bg-slate-100">
                <Image 
                  src={widget.image_url} 
                  alt={widget.title} 
                  fill 
                  className="object-cover transition-transform duration-500 group-hover:scale-105" 
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary">{widget.type}</span>
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors">
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => deleteWidget(widget.id)}
                      className="p-2 hover:bg-red-50 rounded-lg text-red-600 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-1">{widget.title}</h4>
                <p className="text-sm text-slate-500 line-clamp-2">{widget.subtitle}</p>
              </div>
            </div>
          )) : (
            <div className="col-span-full rounded-3xl bg-white p-12 text-center border-2 border-dashed border-slate-200">
              <div className="h-20 w-20 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 mx-auto mb-6">
                <Layout className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">No Custom Widgets Yet</h3>
              <p className="text-slate-500 max-w-sm mx-auto mb-8">Create custom promotional widgets to display across your store pages.</p>
              <button className="rounded-xl bg-primary px-8 py-3 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all hover:scale-105">
                Create First Widget
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
