'use client';

import { useState, useEffect } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  Download, 
  Filter, 
  Calendar,
  TrendingUp,
  Users,
  ShoppingBag,
  MousePointer2,
  Clock
} from 'lucide-react';
import { supabase } from '@/src/lib/supabase';

const data = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 500 },
  { name: 'Jun', value: 900 },
];

const COLORS = ['#108474', '#1d3686', '#fbcd0a', '#f43f5e', '#8b5cf6'];

export default function AdminAnalytics() {
  const [reports, setReports] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  async function fetchReports() {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.from('analytics_reports').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      setReports(data || []);
    } catch (error) {
      console.error('Error fetching reports:', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-serif font-bold text-slate-900">Live Analytics</h2>
          <p className="text-sm text-slate-500">Real-time performance tracking and reports.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex h-11 items-center gap-2 rounded-xl border border-slate-200 px-4 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">
            <Calendar className="h-4 w-4" /> Last 30 Days
          </button>
          <button className="flex h-11 items-center gap-2 rounded-xl bg-primary px-6 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all hover:scale-105">
            <Download className="h-4 w-4" /> Export Report
          </button>
        </div>
      </div>

      {/* Pro Option Banner */}
      <div className="rounded-[2rem] bg-gradient-to-r from-primary to-secondary p-8 text-white relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-[10px] font-bold uppercase tracking-widest">
              Pro Feature
            </div>
            <h3 className="text-2xl font-bold">Advanced Customer Insights</h3>
            <p className="text-white/80 max-w-md">Unlock deep-dive analytics into customer behavior, retention rates, and lifetime value.</p>
          </div>
          <button className="rounded-full bg-accent px-8 py-3 font-bold text-slate-900 shadow-xl transition-all hover:scale-105">
            Upgrade to Pro
          </button>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Traffic Source */}
        <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Traffic Sources</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: 'Direct', value: 400 },
                    { name: 'Social', value: 300 },
                    { name: 'Search', value: 300 },
                    { name: 'Referral', value: 200 },
                  ]}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {COLORS.map((color, index) => (
                    <Cell key={`cell-${index}`} fill={color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {['Direct', 'Social', 'Search', 'Referral'].map((source, i) => (
              <div key={source} className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                <span className="text-xs font-medium text-slate-600">{source}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Conversion Rate */}
        <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Conversion Rate</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#1d3686" strokeWidth={3} dot={{ r: 4, fill: '#1d3686' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Reports Table */}
      <div className="rounded-3xl bg-white shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-900">Generated Reports</h3>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">Report Type</th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">Date</th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">Status</th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {reports.length > 0 ? reports.map((report) => (
              <tr key={report.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4 text-sm font-bold text-slate-900">{report.report_type}</td>
                <td className="px-6 py-4 text-sm text-slate-500">{new Date(report.created_at).toLocaleDateString()}</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-[10px] font-bold text-emerald-600 uppercase tracking-widest">
                    Ready
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-primary hover:underline text-sm font-bold">Download</button>
                </td>
              </tr>
            ) ) : (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-slate-400 italic">
                  No reports generated yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
