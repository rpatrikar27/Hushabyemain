import { Metadata } from 'next';
import AboutContent from './AboutContent';

export const metadata: Metadata = {
  title: 'Our Story | Hushabye Baby Care',
  description: 'Discover the heart behind Hushabye. Inspired by traditional Indian wisdom and backed by modern science, we create the purest care for your little ones.',
};

export default function AboutPage() {
  return <AboutContent />;
}
