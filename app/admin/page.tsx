'use client';

import { 
  TrendingUp, 
  ShoppingBag, 
  Users, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight,
  Clock,
  AlertCircle
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import AdminSidebar from '@/src/components/layout/AdminSidebar';
import { Badge } from '@/src/components/ui/Badge';
import { cn } from '@/lib/utils';

const revenueData = [
  { name: 'Mon', value: 4000 },
  { name: 'Tue', value: 3000 },
  { name: 'Wed', value: 2000 },
  { name: 'Thu', value: 2780 },
  { name: 'Fri', value: 1890 },
  { name: 'Sat', value: 2390 },
  { name: 'Sun', value: 3490 },
];

const topProducts = [
  { name: 'Baby Shampoo', sales: 120, revenue: 59880 },
  { name: 'Baby Wipes', sales: 450, revenue: 89550 },
  { name: 'Diaper Pants XL', sales: 85, revenue: 33915 },
  { name: 'Baby Lotion', sales: 95, revenue: 37905 },
];

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdminSidebar />
      
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
            <p className="text-slate-500">Welcome back, here&apos;s what&apos;s happening today.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg text-sm font-medium">
              <Clock className="h-4 w-4 text-slate-400" /> Last 7 Days
            </div>
            <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold shadow-sm hover:bg-primary/90">
              Download Report
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="p-6 rounded-2xl bg-white border shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                <DollarSign className="h-6 w-6" />
              </div>
              <div className="flex items-center gap-1 text-green-600 text-xs font-bold">
                <ArrowUpRight className="h-3 w-3" /> +12.5%
              </div>
            </div>
            <p className="text-sm text-slate-500 mb-1">Total Revenue</p>
            <h3 className="text-2xl font-bold text-slate-900">₹1,28,430</h3>
          </div>

          <div className="p-6 rounded-2xl bg-white border shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="h-10 w-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
                <ShoppingBag className="h-6 w-6" />
              </div>
              <div className="flex items-center gap-1 text-green-600 text-xs font-bold">
                <ArrowUpRight className="h-3 w-3" /> +8.2%
              </div>
            </div>
            <p className="text-sm text-slate-500 mb-1">Total Orders</p>
            <h3 className="text-2xl font-bold text-slate-900">342</h3>
          </div>

          <div className="p-6 rounded-2xl bg-white border shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="h-10 w-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600">
                <Users className="h-6 w-6" />
              </div>
              <div className="flex items-center gap-1 text-red-600 text-xs font-bold">
                <ArrowDownRight className="h-3 w-3" /> -2.4%
              </div>
            </div>
            <p className="text-sm text-slate-500 mb-1">New Customers</p>
            <h3 className="text-2xl font-bold text-slate-900">128</h3>
          </div>

          <div className="p-6 rounded-2xl bg-white border shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="h-10 w-10 rounded-xl bg-green-50 flex items-center justify-center text-green-600">
                <TrendingUp className="h-6 w-6" />
              </div>
              <div className="flex items-center gap-1 text-green-600 text-xs font-bold">
                <ArrowUpRight className="h-3 w-3" /> +5.1%
              </div>
            </div>
            <p className="text-sm text-slate-500 mb-1">Avg. Order Value</p>
            <h3 className="text-2xl font-bold text-slate-900">₹375</h3>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Revenue Chart */}
          <div className="lg:col-span-2 p-6 rounded-2xl bg-white border shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-slate-900">Revenue Overview</h3>
              <select className="text-xs border rounded-lg px-2 py-1 focus:outline-none">
                <option>Weekly</option>
                <option>Monthly</option>
              </select>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} dx={-10} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #f1f5f9', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    itemStyle={{ color: '#ff8fa3', fontWeight: 'bold' }}
                  />
                  <Line type="monotone" dataKey="value" stroke="#ff8fa3" strokeWidth={3} dot={{ r: 4, fill: '#ff8fa3', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Low Stock Alerts */}
          <div className="lg:col-span-1 p-6 rounded-2xl bg-white border shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-slate-900">Low Stock Alerts</h3>
              <AlertCircle className="h-5 w-5 text-orange-500" />
            </div>
            <div className="space-y-4">
              {[
                { name: 'Baby Wipes 72pcs', stock: 8, threshold: 10 },
                { name: 'Baby Shampoo 200ml', stock: 5, threshold: 10 },
                { name: 'Diaper Pants XL', stock: 2, threshold: 5 },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div>
                    <p className="text-sm font-bold text-slate-800">{item.name}</p>
                    <p className="text-xs text-slate-500">Stock: {item.stock} / Threshold: {item.threshold}</p>
                  </div>
                  <Badge variant="destructive" className="text-[10px]">Restock</Badge>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-2 text-sm font-bold text-primary hover:underline">
              View All Inventory
            </button>
          </div>
        </div>

        {/* Recent Orders Table */}
        <div className="p-6 rounded-2xl bg-white border shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-900">Recent Orders</h3>
            <button className="text-sm font-bold text-primary hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b">
                  <th className="pb-4 px-4">Order ID</th>
                  <th className="pb-4 px-4">Customer</th>
                  <th className="pb-4 px-4">Date</th>
                  <th className="pb-4 px-4">Status</th>
                  <th className="pb-4 px-4">Total</th>
                  <th className="pb-4 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {[
                  { id: '#ORD-9821', customer: 'Rahul Sharma', date: 'Oct 12, 2023', status: 'Delivered', total: '₹1,299' },
                  { id: '#ORD-9822', customer: 'Priya Singh', date: 'Oct 12, 2023', status: 'Processing', total: '₹499' },
                  { id: '#ORD-9823', customer: 'Amit Patel', date: 'Oct 11, 2023', status: 'Shipped', total: '₹850' },
                  { id: '#ORD-9824', customer: 'Sneha Gupta', date: 'Oct 11, 2023', status: 'Pending', total: '₹1,599' },
                ].map((order, idx) => (
                  <tr key={idx} className="text-sm hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-4 font-bold text-slate-900">{order.id}</td>
                    <td className="py-4 px-4 text-slate-600">{order.customer}</td>
                    <td className="py-4 px-4 text-slate-500">{order.date}</td>
                    <td className="py-4 px-4">
                      <Badge 
                        variant="secondary" 
                        className={cn(
                          "text-[10px] border-none",
                          order.status === 'Delivered' ? "bg-green-100 text-green-700" :
                          order.status === 'Processing' ? "bg-blue-100 text-blue-700" :
                          order.status === 'Shipped' ? "bg-purple-100 text-purple-700" :
                          "bg-orange-100 text-orange-700"
                        )}
                      >
                        {order.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-4 font-bold text-slate-900">{order.total}</td>
                    <td className="py-4 px-4 text-right">
                      <button className="text-primary hover:underline font-bold text-xs">Details</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
