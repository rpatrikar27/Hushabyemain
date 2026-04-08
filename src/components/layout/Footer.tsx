import Link from 'next/link';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-24">
          <div className="space-y-6">
            <h3 className="text-3xl font-serif font-medium tracking-tight text-white">Hushabye</h3>
            <p className="text-sm text-background/60 leading-relaxed max-w-xs">
              Premium Indian baby care brand providing gentle and effective products for your little ones. Inspired by nature, backed by science.
            </p>
            <div className="flex space-x-6">
              <Link href="#" className="text-background/40 hover:text-white transition-colors"><Facebook className="h-5 w-5" /></Link>
              <Link href="#" className="text-background/40 hover:text-white transition-colors"><Instagram className="h-5 w-5" /></Link>
              <Link href="#" className="text-background/40 hover:text-white transition-colors"><Twitter className="h-5 w-5" /></Link>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-8">Quick Links</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link href="/collections/all" className="text-background/60 hover:text-white transition-colors">Shop All</Link></li>
              <li><Link href="/pages/about" className="text-background/60 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/blog" className="text-background/60 hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/pages/contact" className="text-background/60 hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-8">Policies</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link href="/pages/privacy-policy" className="text-background/60 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/pages/terms-and-conditions" className="text-background/60 hover:text-white transition-colors">Terms & Conditions</Link></li>
              <li><Link href="/pages/return-policy" className="text-background/60 hover:text-white transition-colors">Return Policy</Link></li>
              <li><Link href="/pages/shipping-policy" className="text-background/60 hover:text-white transition-colors">Shipping Policy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-8">Contact Info</h4>
            <ul className="space-y-6 text-sm font-medium">
              <li className="flex items-start gap-4">
                <Mail className="h-5 w-5 text-primary" />
                <span className="text-background/60">support@hushabye.in</span>
              </li>
              <li className="flex items-start gap-4">
                <Phone className="h-5 w-5 text-primary" />
                <span className="text-background/60">+91 98765 43210</span>
              </li>
              <li className="flex items-start gap-4">
                <MapPin className="h-5 w-5 text-primary" />
                <span className="text-background/60">Mumbai, Maharashtra, India</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-white/20">
          <span>© {new Date().getFullYear()} Hushabye Baby Care. All rights reserved.</span>
          <div className="flex gap-8">
            <span>Designed with Love</span>
            <span>Made in India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
