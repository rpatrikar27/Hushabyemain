'use client';

import { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Target, 
  Plus, 
  Play, 
  Pause, 
  Settings, 
  TrendingUp, 
  Users, 
  MousePointer2,
  DollarSign,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Facebook,
  Instagram,
  ChevronRight
} from 'lucide-react';
import { motion } from 'motion/react';

export default function MetaAdsManager() {
  const [isLoading, setIsLoading] = useState(true);
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    // Simulate fetching campaigns
    setTimeout(() => {
      setCampaigns([
        {
          id: 'camp_1',
          name: 'Newborn Essentials - Awareness',
          status: 'ACTIVE',
          objective: 'OUTCOME_AWARENESS',
          budget: 5000,
          spent: 1240,
          impressions: 45000,
          clicks: 1200,
          ctr: 2.67,
          platforms: ['facebook', 'instagram']
        },
        {
          id: 'camp_2',
          name: 'Diaper Subscription - Conversion',
          status: 'PAUSED',
          objective: 'OUTCOME_SALES',
          budget: 10000,
          spent: 8500,
          impressions: 120000,
          clicks: 3400,
          ctr: 2.83,
          platforms: ['instagram']
        }
      ]);
      setIsLoading(false);
    }, 1500);
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-slate-900">Meta Ads Manager</h1>
          <p className="text-slate-500">Manage your Facebook and Instagram campaigns directly.</p>
        </div>
        <button 
          onClick={() => setIsCreating(true)}
          className="flex items-center gap-2 rounded-xl bg-[#1877F2] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition-all hover:scale-105"
        >
          <Plus className="h-4 w-4" /> Create Campaign
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Spent', value: '₹9,740', icon: DollarSign, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Reach', value: '165K', icon: Users, color: 'text-purple-600', bg: 'bg-purple-50' },
          { label: 'Link Clicks', value: '4,600', icon: MousePointer2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Avg. CTR', value: '2.75%', icon: TrendingUp, color: 'text-amber-600', bg: 'bg-amber-50' },
        ].map((stat, i) => (
          <div key={i} className="rounded-3xl bg-white p-6 shadow-sm border border-slate-100">
            <div className="flex items-center gap-4">
              <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${stat.bg} ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">{stat.label}</p>
                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Campaigns Table */}
      <div className="rounded-3xl bg-white shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-900">Active Campaigns</h3>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Live Sync</span>
          </div>
        </div>
        
        {isLoading ? (
          <div className="p-20 flex flex-col items-center justify-center text-slate-400">
            <Loader2 className="h-10 w-10 animate-spin mb-4" />
            <p className="text-sm font-medium">Fetching Meta Ads data...</p>
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">Campaign</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">Status</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">Budget</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">Results</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {campaigns.map((camp) => (
                <tr key={camp.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex -space-x-2">
                        {camp.platforms.includes('facebook') && (
                          <div className="h-6 w-6 rounded-full bg-[#1877F2] flex items-center justify-center text-white border-2 border-white">
                            <Facebook className="h-3 w-3" />
                          </div>
                        )}
                        {camp.platforms.includes('instagram') && (
                          <div className="h-6 w-6 rounded-full bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] flex items-center justify-center text-white border-2 border-white">
                            <Instagram className="h-3 w-3" />
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">{camp.name}</p>
                        <p className="text-[10px] text-slate-400 uppercase tracking-widest">{camp.objective.replace('OUTCOME_', '')}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-bold uppercase tracking-widest ${camp.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
                      {camp.status === 'ACTIVE' ? <Play className="h-2 w-2 fill-current" /> : <Pause className="h-2 w-2 fill-current" />}
                      {camp.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-slate-900">₹{camp.budget.toLocaleString()}</p>
                    <p className="text-[10px] text-slate-400">Spent: ₹{camp.spent.toLocaleString()}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="text-xs font-bold text-slate-900">{camp.clicks.toLocaleString()}</p>
                        <p className="text-[10px] text-slate-400">Clicks</p>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900">{camp.ctr}%</p>
                        <p className="text-[10px] text-slate-400">CTR</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors">
                        <BarChart3 className="h-4 w-4" />
                      </button>
                      <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors">
                        <Settings className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Create Campaign Modal (Simplified) */}
      {isCreating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-2xl overflow-hidden"
          >
            <div className="p-8 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-serif font-bold text-slate-900">Create New Campaign</h3>
                <p className="text-sm text-slate-500">Set up your Meta Ads campaign in 3 easy steps.</p>
              </div>
              <button 
                onClick={() => setIsCreating(false)}
                className="h-10 w-10 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 transition-colors"
              >
                <Plus className="h-6 w-6 rotate-45" />
              </button>
            </div>
            
            <div className="p-8 space-y-6">
              <div className="space-y-4">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Campaign Objective</label>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { id: 'AWARENESS', label: 'Awareness', icon: Target, desc: 'Reach more people' },
                    { id: 'SALES', label: 'Sales', icon: DollarSign, desc: 'Drive conversions' },
                  ].map((obj) => (
                    <button key={obj.id} className="flex items-start gap-4 p-4 rounded-2xl border-2 border-slate-100 hover:border-blue-500 transition-all text-left group">
                      <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600">
                        <obj.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">{obj.label}</p>
                        <p className="text-xs text-slate-500">{obj.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Campaign Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Summer Sale 2026" 
                  className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Daily Budget (₹)</label>
                  <input 
                    type="number" 
                    placeholder="500" 
                    className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Target Audience</label>
                  <select className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-white">
                    <option>New Parents (0-2 years)</option>
                    <option>Expecting Parents</option>
                    <option>Custom Audience: Past Buyers</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="p-8 bg-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-400">
                <AlertCircle className="h-4 w-4" />
                <span className="text-xs font-medium">Meta Ads API connection required for live deployment.</span>
              </div>
              <button className="rounded-xl bg-[#1877F2] px-8 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition-all hover:scale-105">
                Next: Ad Creative
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
