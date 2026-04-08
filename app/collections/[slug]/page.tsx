import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import seedData from '@/src/data/seed.json';
import CollectionContent from '@/src/components/collection/CollectionContent';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const category = seedData.categories.find(c => c.slug === slug);
  const title = category?.name || (slug === 'all' ? 'All Products' : slug);
  
  return {
    title: `${title} | Hushabye Baby Care`,
    description: category?.description || `Browse our collection of ${title} products for your baby.`,
  };
}

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = seedData.categories.find(c => c.slug === slug);
  
  const products = slug === 'all' 
    ? seedData.products 
    : seedData.products.filter(p => {
        const cat = seedData.categories.find(c => c.id === p.category_id);
        return cat?.slug === slug || p.tags?.includes(slug);
      });

  if (slug !== 'all' && !category && products.length === 0) {
    notFound();
  }

  return <CollectionContent slug={slug} category={category} products={products} />;
}
