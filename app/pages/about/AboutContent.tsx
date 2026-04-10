'use client';

import Image from 'next/image';
import Header from '@/src/components/layout/Header';
import Footer from '@/src/components/layout/Footer';
import { motion } from 'motion/react';
import { Heart, ShieldCheck, Sparkles, Leaf } from 'lucide-react';

export default function AboutContent() {
  return (
    <div className="flex min-h-screen flex-col bg-[#fdfcf8]">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section - Editorial Style */}
        <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
          <Image
            src="https://picsum.photos/seed/mother-baby/1920/1080?blur=2"
            alt="Mother and Baby"
            fill
            className="object-cover opacity-40"
            referrerPolicy="no-referrer"
          />
          <div className="container relative z-10 text-center px-4">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs font-bold uppercase tracking-[0.3em] text-primary mb-4 block"
            >
              The Hushabye Journey
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-7xl font-serif font-medium text-slate-900 leading-tight"
            >
              Inspired by <span className="italic text-primary">Tradition</span>,<br />
              Perfected by <span className="italic text-primary">Science</span>.
            </motion.h1>
          </div>
        </section>

        {/* The Story Section */}
        <section className="py-24 container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl font-serif font-medium text-slate-900">It started with a mother&apos;s search for <span className="italic">purity</span>.</h2>
              <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                <p>
                  In every Indian household, there&apos;s a treasure trove of wisdom—the &apos;Nuskhas&apos; passed down through generations. From the soothing touch of Almond oil to the healing power of Turmeric, these traditions have nurtured us for centuries.
                </p>
                <p>
                  Hushabye was born from the desire to bring this ancient wisdom into the modern nursery. We realized that while traditional ingredients were powerful, they needed the precision of modern science to be truly safe and effective for today&apos;s delicate baby skin.
                </p>
                <p>
                  We spent years collaborating with dermatologists and traditional healers to create a range that is as gentle as a mother&apos;s touch and as reliable as a doctor&apos;s advice.
                </p>
              </div>
            </div>
            <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl">
              <Image
                src="https://picsum.photos/seed/indian-tradition/800/1000"
                alt="Traditional Ingredients"
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </section>

        {/* Values - Icon Grid */}
        <section className="bg-white py-24 border-y border-primary/5">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
              <h2 className="text-4xl font-serif font-medium text-slate-900">Our Pure Promise</h2>
              <p className="text-slate-500">We believe that what goes on your baby&apos;s skin is just as important as what goes into their body.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              {[
                {
                  icon: Leaf,
                  title: "100% Natural Extracts",
                  desc: "Sourced from the finest organic farms across India, ensuring maximum potency and purity."
                },
                {
                  icon: ShieldCheck,
                  title: "Dermatologically Tested",
                  desc: "Every product undergoes rigorous clinical trials to ensure it's safe for even the most sensitive skin."
                },
                {
                  icon: Sparkles,
                  title: "Tear-Free Formulas",
                  desc: "Bath time should be about giggles, not tears. Our pH-balanced formulas are gentle on little eyes."
                },
                {
                  icon: Heart,
                  title: "Made with Love",
                  desc: "As an Indian brand, we understand the unique needs of babies in our climate and environment."
                }
              ].map((value, idx) => (
                <div key={idx} className="flex flex-col items-center text-center space-y-4 p-8 rounded-3xl bg-[#fdfcf8] border border-transparent hover:border-primary/10 transition-colors">
                  <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                    <value.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{value.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Meet the Founders / Community Section */}
        <section className="py-24 container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-primary rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden">
            <div className="relative z-10 space-y-8">
              <h2 className="text-4xl md:text-5xl font-serif font-medium leading-tight">Join a community of <span className="italic text-accent">10,000+</span> happy Indian moms.</h2>
              <p className="text-xl text-white/80 leading-relaxed">
                &quot;Hushabye isn&apos;t just a brand; it&apos;s a promise I made to my own daughter. A promise of safety, purity, and the best of our heritage.&quot;
              </p>
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-accent">
                  <Image
                    src="https://picsum.photos/seed/founder/100/100"
                    alt="Founder"
                    width={64}
                    height={64}
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-bold">Ananya Sharma</p>
                  <p className="text-sm text-white/60">Founder & Fellow Mom</p>
                </div>
              </div>
            </div>
            {/* Organic background shapes */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
