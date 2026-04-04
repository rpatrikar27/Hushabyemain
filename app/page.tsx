import type { Metadata } from 'next';
import HomeContent from '@/src/components/home/HomeContent';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Premium Indian baby care brand providing gentle and effective products for your little ones.',
  keywords: ['baby care', 'diapers', 'shampoo', 'lotion', 'india'],
};

export default function HomePage() {
  return <HomeContent />;
}
