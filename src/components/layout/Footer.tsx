import Link from 'next/link';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-primary">Hushabye</h3>
            <p className="text-sm text-slate-600">
              Premium Indian baby care brand providing gentle and effective products for your little ones.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-slate-400 hover:text-primary"><Facebook className="h-5 w-5" /></Link>
              <Link href="#" className="text-slate-400 hover:text-primary"><Instagram className="h-5 w-5" /></Link>
              <Link href="#" className="text-slate-400 hover:text-primary"><Twitter className="h-5 w-5" /></Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><Link href="/collections/all" className="hover:text-primary">Shop All</Link></li>
              <li><Link href="/pages/about" className="hover:text-primary">About Us</Link></li>
              <li><Link href="/blog" className="hover:text-primary">Blog</Link></li>
              <li><Link href="/pages/contact" className="hover:text-primary">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Policies</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><Link href="/pages/privacy-policy" className="hover:text-primary">Privacy Policy</Link></li>
              <li><Link href="/pages/terms-and-conditions" className="hover:text-primary">Terms & Conditions</Link></li>
              <li><Link href="/pages/return-policy" className="hover:text-primary">Return Policy</Link></li>
              <li><Link href="/pages/shipping-policy" className="hover:text-primary">Shipping Policy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> support@hushabye.in</li>
              <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> +91 98765 43210</li>
              <li className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Mumbai, India</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t text-center text-sm text-slate-500">
          © {new Date().getFullYear()} Hushabye Baby Care. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
