'use client';

import { useState, useEffect } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar
} from 'recharts';
import Image from 'next/image';
import { 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Loader2
} from 'lucide-react';
import { supabase } from '@/src/lib/supabase';

const data = [
  { name: 'Mon', sales: 4000, visitors: 2400, ads: 2400 },
  { name: 'Tue', sales: 3000, visitors: 1398, ads: 2210 },
  { name: 'Wed', sales: 2000, visitors: 9800, ads: 2290 },
  { name: 'Thu', sales: 2780, visitors: 3908, ads: 2000 },
  { name: 'Fri', sales: 1890, visitors: 4800, ads: 2181 },
  { name: 'Sat', sales: 2390, visitors: 3800, ads: 2500 },
  { name: 'Sun', sales: 3490, visitors: 4300, ads: 2100 },
];

export default function AdminDashboard() {
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchLiveActivity();
  }, []);

  async function fetchLiveActivity() {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.from('orders').select('*').order('created_at', { ascending: false }).limit(5);
      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error('Error fetching live activity:', error);
    } finally {
      setIsLoading(false);
    }
  }

  const stats = [
    { name: 'Total Revenue', value: '₹4,25,000', change: '+12.5%', icon: DollarSign, trend: 'up' },
    { name: 'Active Users', value: '12,450', change: '+18.2%', icon: Users, trend: 'up' },
    { name: 'Total Orders', value: orders.length > 0 ? orders.length : '1,240', change: '-2.4%', icon: ShoppingBag, trend: 'down' },
    { name: 'Ad Conversion', value: '4.2%', change: '+5.4%', icon: TrendingUp, trend: 'up' },
  ];
  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <stat.icon className="h-6 w-6" />
              </div>
              <div className={`flex items-center gap-1 text-xs font-bold ${stat.trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}>
                {stat.change}
                {stat.trend === 'up' ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
              </div>
            </div>
            <p className="text-sm font-medium text-slate-500">{stat.name}</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Sales Chart */}
        <div className="lg:col-span-2 rounded-3xl bg-white p-8 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Sales Overview</h3>
              <p className="text-sm text-slate-500">Real-time revenue tracking</p>
            </div>
            <div className="flex gap-2">
              <button className="rounded-lg bg-slate-100 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-200 transition-colors">Weekly</button>
              <button className="rounded-lg bg-primary px-4 py-2 text-xs font-bold text-white shadow-lg shadow-primary/20">Monthly</button>
            </div>
          </div>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#108474" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#108474" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="sales" stroke="#108474" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Live Activity */}
        <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-100">
          <div className="flex items-center gap-2 mb-8">
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <h3 className="text-lg font-bold text-slate-900">Live Activity</h3>
          </div>
          <div className="space-y-6">
            {orders.length > 0 ? orders.map((order, i) => (
              <div key={order.id} className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-slate-100 overflow-hidden shrink-0 relative">
                  <Image src={`https://picsum.photos/seed/user${i}/40/40`} alt="User" fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-900 truncate">Order #{order.id.slice(0, 8)}</p>
                  <p className="text-xs text-slate-500">{new Date(order.created_at).toLocaleTimeString()} • {order.customer_email}</p>
                </div>
                <div className="text-sm font-bold text-emerald-500">+₹{order.total_amount}</div>
              </div>
            )) : [1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-slate-100 overflow-hidden shrink-0 relative">
                  <Image src={`https://picsum.photos/seed/user${i}/40/40`} alt="User" fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-900 truncate">New Order #124{i}</p>
                  <p className="text-xs text-slate-500">2 mins ago • Mumbai, IN</p>
                </div>
                <div className="text-sm font-bold text-emerald-500">+₹1,240</div>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 rounded-xl border border-slate-200 py-3 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors">
            View All Activity
          </button>
        </div>
      </div>

      {/* Meta Ads Preview Widget */}
      <div className="rounded-3xl bg-slate-900 p-8 text-white">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest">
              <Activity className="h-3 w-3" /> Meta Ads Integration
            </div>
            <h2 className="text-3xl font-serif font-medium">Deploy campaigns directly from your dashboard.</h2>
            <p className="text-white/60 max-w-xl">Connect your Meta Ad Account to manage budgets, creatives, and performance without leaving the Hushabye Admin Panel.</p>
          </div>
          <button className="rounded-full bg-primary px-8 py-4 font-bold text-white shadow-xl shadow-primary/20 transition-all hover:scale-105">
            Connect Meta Account
          </button>
        </div>
      </div>
    </div>
  );
}
