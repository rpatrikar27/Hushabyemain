'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { Heart, ShieldCheck, Sparkles, Leaf } from 'lucide-react';

const stories = [
  {
    title: "The Purity of Milk",
    subtitle: "Inspired by Grandma's Wisdom",
    description: "In every Indian home, milk is more than just food—it's a symbol of pure nourishment. We've harnessed the power of milk protein to create a range that's as gentle as a mother's touch.",
    image: "https://picsum.photos/seed/milk-baby/600/800",
    icon: Sparkles,
    color: "bg-blue-50"
  },
  {
    title: "Aloe & Neem Protection",
    subtitle: "Nature's Shield for Delicate Skin",
    description: "Our diapers and wipes are infused with the soothing properties of Aloe Vera and the antibacterial power of Neem, ensuring your baby stays rash-free and happy all day long.",
    image: "https://picsum.photos/seed/aloe-baby/600/800",
    icon: ShieldCheck,
    color: "bg-emerald-50"
  },
  {
    title: "Tear-Free Bath Time",
    subtitle: "Making Every Moment Joyful",
    description: "Bath time shouldn't be a struggle. Our pH-balanced, tear-free formulas ensure that your baby's eyes stay bright and their skin stays soft, making every splash a memory to cherish.",
    image: "https://picsum.photos/seed/bath-baby/600/800",
    icon: Heart,
    color: "bg-rose-50"
  }
];

export default function BrandStories() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">Our Legacy</span>
          <h2 className="text-4xl md:text-6xl font-serif font-medium text-slate-900">Stories of Love & Care</h2>
          <p className="text-lg text-slate-500">Crafted specifically for the unique needs of Indian babies, blending traditional secrets with modern science.</p>
        </div>

        <div className="space-y-32">
          {stories.map((story, idx) => (
            <div 
              key={idx} 
              className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-24`}
            >
              <motion.div 
                initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="w-full lg:w-1/2"
              >
                <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl">
                  <Image
                    src={story.image}
                    alt={story.title}
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: idx % 2 === 0 ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="w-full lg:w-1/2 space-y-8"
              >
                <div className={`inline-flex h-16 w-16 items-center justify-center rounded-3xl ${story.color} text-primary`}>
                  <story.icon className="h-8 w-8" />
                </div>
                <div className="space-y-4">
                  <span className="text-sm font-bold text-primary uppercase tracking-widest">{story.subtitle}</span>
                  <h3 className="text-3xl md:text-5xl font-serif font-medium text-slate-900">{story.title}</h3>
                  <p className="text-lg text-slate-600 leading-relaxed">{story.description}</p>
                </div>
                <div className="pt-4">
                  <button className="group flex items-center gap-3 text-sm font-bold text-slate-900">
                    <span className="h-px w-8 bg-primary transition-all group-hover:w-12" />
                    Learn More About Our Ingredients
                  </button>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
