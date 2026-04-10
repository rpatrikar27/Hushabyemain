'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  Image as ImageIcon, 
  Layout,
  BarChart3, 
  Settings, 
  LogOut,
  Megaphone,
  Globe,
  Search
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

const sidebarLinks = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Listings (SEO)', href: '/admin/products', icon: Package },
  { name: 'Banners', href: '/admin/content?tab=banners', icon: ImageIcon },
  { name: 'Widgets', href: '/admin/content?tab=widgets', icon: Layout },
  { name: 'Meta Ads Manager', href: '/admin/meta-ads', icon: Megaphone },
  { name: 'Live Analytics', href: '/admin/analytics', icon: BarChart3 },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={
      <div className="flex h-screen w-screen items-center justify-center bg-slate-50">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    }>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </Suspense>
  );
}

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r bg-white">
        <div className="flex h-full flex-col">
          <div className="flex h-20 items-center border-b px-6">
            <Link href="/admin" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold">H</div>
              <span className="text-xl font-serif font-bold text-slate-900">Admin Pro</span>
            </Link>
          </div>

          <nav className="flex-1 space-y-1 px-4 py-6">
            {sidebarLinks.map((link) => {
              const [hrefPath, hrefQuery] = link.href.split('?');
              const isActive = pathname === hrefPath && (!hrefQuery || searchParams.toString().includes(hrefQuery));
              
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all",
                    isActive 
                      ? "bg-primary text-white shadow-lg shadow-primary/20" 
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  )}
                >
                  <link.icon className="h-5 w-5" />
                  {link.name}
                </Link>
              );
            })}
          </nav>

          <div className="border-t p-4">
            <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors">
              <LogOut className="h-5 w-5" />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1">
        {/* Topbar */}
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b bg-white/80 px-8 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-slate-900">
              {sidebarLinks.find(link => {
                const [hrefPath, hrefQuery] = link.href.split('?');
                return pathname === hrefPath && (!hrefQuery || searchParams.toString().includes(hrefQuery));
              })?.name || 'Admin'}
            </h1>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search anything..." 
                className="h-10 w-64 rounded-full bg-slate-100 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-bold text-slate-900">Rohit Admin</p>
                <p className="text-[10px] uppercase tracking-widest text-slate-400">Super Admin</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-slate-200 border-2 border-white shadow-sm overflow-hidden relative">
                <Image src="https://picsum.photos/seed/admin/40/40" alt="Admin" fill className="object-cover" />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
