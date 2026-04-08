import { MetadataRoute } from 'next';
import seedData from '@/src/data/seed.json';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://hushabye.in';

  // Base pages
  const routes = ['', '/collections/all', '/pages/about', '/pages/contact'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 1,
  }));

  // Product pages
  const productRoutes = seedData.products.map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Category pages
  const categoryRoutes = seedData.categories.map((category) => ({
    url: `${baseUrl}/collections/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...routes, ...productRoutes, ...categoryRoutes];
}
