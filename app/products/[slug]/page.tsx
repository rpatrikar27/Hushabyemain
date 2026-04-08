import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import seedData from '@/src/data/seed.json';
import ProductContent from '@/src/components/product/ProductContent';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = seedData.products.find(p => p.slug === slug);
  if (!product) return { title: 'Product Not Found' };

  return {
    title: product.name,
    description: product.seo_description || product.short_description || product.description,
    keywords: product.tags,
    openGraph: {
      title: product.name,
      description: product.seo_description || product.short_description,
      images: [{ url: product.images[0]?.url }],
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = seedData.products.find(p => p.slug === slug);

  if (!product) notFound();

  return <ProductContent product={product} />;
}
