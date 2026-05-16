import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import seedData from '@/src/data/seed.json';
import CollectionContent from '@/src/components/collection/CollectionContent';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug: rawSlug } = await params;
  const slug = rawSlug.toLowerCase();
  const category = seedData.categories.find(c => c.slug.toLowerCase() === slug);
  const title = category?.name || (slug === 'all' ? 'All Products' : slug.charAt(0).toUpperCase() + slug.slice(1));
  
  return {
    title: `${title} | Hushabye Baby Care`,
    description: category?.description || `Browse our collection of ${title} products for your baby.`,
  };
}

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug: rawSlug } = await params;
  const slug = rawSlug.toLowerCase();
  
  // Find category by slug (case insensitive)
  const category = seedData.categories.find(c => c.slug.toLowerCase() === slug);
  
  const products = slug === 'all' 
    ? seedData.products 
    : seedData.products.filter(p => {
        // Find category for the product
        const productCategory = seedData.categories.find(c => c.id === p.category_id);
        const categoryMatches = productCategory?.slug.toLowerCase() === slug;
        
        // Also check direct tags match
        const tagMatches = p.tags?.some(tag => tag.toLowerCase() === slug);
        
        return categoryMatches || tagMatches;
      });

  if (slug !== 'all' && !category && products.length === 0) {
    notFound();
  }

  return <CollectionContent slug={slug} category={category} products={products} />;
}
