'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Package, 
  Users, 
  Tag, 
  Star, 
  Search, 
  Settings, 
  BarChart3, 
  Bell, 
  LogOut,
  ChevronRight,
  Boxes
} from 'lucide-react';
import { cn } from '@/lib/utils';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
  { icon: ShoppingBag, label: 'Orders', href: '/admin/orders' },
  { icon: Package, label: 'Products', href: '/admin/products' },
  { icon: Boxes, label: 'Inventory', href: '/admin/inventory' },
  { icon: Users, label: 'Customers', href: '/admin/customers' },
  { icon: Tag, label: 'Coupons', href: '/admin/coupons' },
  { icon: Star, label: 'Reviews', href: '/admin/reviews' },
  { icon: Search, label: 'SEO Manager', href: '/admin/seo' },
  { icon: BarChart3, label: 'Reports', href: '/admin/reports' },
  { icon: Settings, label: 'Settings', href: '/admin/settings' },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r bg-white flex flex-col h-screen sticky top-0">
      <div className="p-6 border-b flex items-center gap-3">
        <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold">H</div>
        <span className="text-xl font-bold tracking-tight text-slate-900">Hushabye Admin</span>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={cn(
                "flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all group",
                isActive 
                  ? "bg-primary/10 text-primary" 
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon className={cn("h-5 w-5", isActive ? "text-primary" : "text-slate-400 group-hover:text-slate-600")} />
                {item.label}
              </div>
              {isActive && <ChevronRight className="h-4 w-4" />}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t space-y-4">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold">AD</div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-slate-900 truncate">Admin User</p>
            <p className="text-xs text-slate-500 truncate">admin@hushabye.in</p>
          </div>
          <button className="p-1 hover:bg-slate-100 rounded-full text-slate-400 hover:text-destructive">
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
