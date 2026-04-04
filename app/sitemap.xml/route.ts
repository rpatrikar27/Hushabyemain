import { NextResponse } from 'next/server';
import seedData from '@/src/data/seed.json';

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hushabye.in';
  
  const staticPages = [
    '',
    '/collections/all',
    '/pages/about',
    '/pages/contact',
    '/blog',
  ];

  const productPages = seedData.products.map(p => `/products/${p.slug}`);
  const categoryPages = seedData.categories.map(c => `/collections/${c.slug}`);

  const allPages = [...staticPages, ...productPages, ...categoryPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${allPages.map(page => `
        <url>
          <loc>${siteUrl}${page}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>daily</changefreq>
          <priority>${page === '' ? '1.0' : '0.8'}</priority>
        </url>
      `).join('')}
    </urlset>
  `;

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
