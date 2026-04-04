'use client';

import { useState } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Truck, 
  CheckCircle2, 
  XCircle, 
  Clock,
  ChevronRight,
  MoreVertical
} from 'lucide-react';
import AdminSidebar from '@/src/components/layout/AdminSidebar';
import { Button } from '@/src/components/ui/Button';
import { Badge } from '@/src/components/ui/Badge';
import { cn } from '@/lib/utils';

const mockOrders = [
  { id: 'ORD-9821', customer: 'Rahul Sharma', email: 'rahul@example.com', date: 'Oct 12, 2023', status: 'Delivered', payment: 'Paid', total: '₹1,299', method: 'Razorpay' },
  { id: 'ORD-9822', customer: 'Priya Singh', email: 'priya@example.com', date: 'Oct 12, 2023', status: 'Processing', payment: 'Paid', total: '₹499', method: 'UPI' },
  { id: 'ORD-9823', customer: 'Amit Patel', email: 'amit@example.com', date: 'Oct 11, 2023', status: 'Shipped', total: '₹850', method: 'Razorpay' },
  { id: 'ORD-9824', customer: 'Sneha Gupta', email: 'sneha@example.com', date: 'Oct 11, 2023', status: 'Pending', payment: 'Pending', total: '₹1,599', method: 'COD' },
  { id: 'ORD-9825', customer: 'Vikram Rao', email: 'vikram@example.com', date: 'Oct 10, 2023', status: 'Cancelled', payment: 'Refunded', total: '₹2,100', method: 'Razorpay' },
];

export default function AdminOrders() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdminSidebar />
      
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Orders</h1>
            <p className="text-slate-500">Track and manage customer orders.</p>
          </div>
          <Button variant="outline" className="rounded-lg bg-white font-bold">
            <Download className="mr-2 h-4 w-4" /> Export CSV
          </Button>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'All Orders', count: 1254, icon: ShoppingBag, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Pending', count: 42, icon: Clock, color: 'text-orange-600', bg: 'bg-orange-50' },
            { label: 'Shipped', count: 156, icon: Truck, color: 'text-purple-600', bg: 'bg-purple-50' },
            { label: 'Delivered', count: 1024, icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50' },
          ].map((stat, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-white border shadow-sm flex items-center gap-4">
              <div className={cn("h-10 w-10 rounded-lg flex items-center justify-center", stat.bg, stat.color)}>
                <stat.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">{stat.label}</p>
                <p className="text-lg font-bold text-slate-900">{stat.count}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by Order ID, Customer..." 
              className="w-full pl-10 pr-4 py-2 rounded-lg border-slate-200 focus:border-primary focus:ring-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="rounded-lg bg-white">
              <Filter className="mr-2 h-4 w-4" /> Status
            </Button>
            <Button variant="outline" className="rounded-lg bg-white">
              <Filter className="mr-2 h-4 w-4" /> Date
            </Button>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b bg-slate-50/50">
                  <th className="py-4 px-6">Order ID</th>
                  <th className="py-4 px-6">Customer</th>
                  <th className="py-4 px-6">Date</th>
                  <th className="py-4 px-6">Payment</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6">Total</th>
                  <th className="py-4 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {mockOrders.map((order, idx) => (
                  <tr key={idx} className="text-sm hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-6 font-bold text-slate-900">{order.id}</td>
                    <td className="py-4 px-6">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900">{order.customer}</span>
                        <span className="text-xs text-slate-500">{order.email}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-slate-500">{order.date}</td>
                    <td className="py-4 px-6">
                      <div className="flex flex-col gap-1">
                        <Badge 
                          variant="secondary" 
                          className={cn(
                            "text-[10px] border-none w-fit",
                            order.payment === 'Paid' ? "bg-green-100 text-green-700" :
                            order.payment === 'Pending' ? "bg-orange-100 text-orange-700" :
                            "bg-red-100 text-red-700"
                          )}
                        >
                          {order.payment}
                        </Badge>
                        <span className="text-[10px] text-slate-400 font-medium uppercase">{order.method}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <Badge 
                        variant="secondary" 
                        className={cn(
                          "text-[10px] border-none",
                          order.status === 'Delivered' ? "bg-green-100 text-green-700" :
                          order.status === 'Processing' ? "bg-blue-100 text-blue-700" :
                          order.status === 'Shipped' ? "bg-purple-100 text-purple-700" :
                          order.status === 'Cancelled' ? "bg-slate-100 text-slate-700" :
                          "bg-orange-100 text-orange-700"
                        )}
                      >
                        {order.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-6 font-bold text-slate-900">{order.total}</td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-primary transition-colors">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors">
                          <MoreVertical className="h-4 w-4" />
                        </button>
                      </div>
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

import { ShoppingBag } from 'lucide-react';
