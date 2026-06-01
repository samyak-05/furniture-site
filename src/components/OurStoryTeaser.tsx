'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function OurStoryTeaser() {
  const router = useRouter();

  return (
    <section 
      onClick={() => router.push('/story')}
      className="w-full bg-[#121212] text-white py-24 md:py-36 select-none border-b border-white/10 cursor-pointer group/story transition-colors duration-500 hover:bg-[#161616]"
    >
      <div className="w-[90%] max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-center">
        
        {/* LEFT COPY BLOCK */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="md:col-span-5 flex flex-col gap-6 md:gap-8"
        >
          <div className="flex flex-col gap-3">
            <span className="text-[10px] md:text-[11px] font-sans tracking-[0.3em] uppercase text-[#D4AF37] font-bold">
              The Atelier Philosophy
            </span>
            <div className="flex items-center gap-4">
              <h2 className="text-3xl md:text-5xl font-serif font-light tracking-wide uppercase leading-tight">
                Our Story
              </h2>
              <div className="p-2 border border-white/20 rounded-full transition-all duration-500 group-hover/story:bg-[#D4AF37] group-hover/story:text-[#121212] group-hover/story:translate-x-1 group-hover/story:-translate-y-1">
                <ArrowUpRight size={20} strokeWidth={1.2} />
              </div>
            </div>
          </div>

          <p className="text-sm font-sans font-light tracking-wide leading-relaxed text-white/70">
            Born out of a desire to eliminate structural noise and clutter, VANAURA curates living structures designed for generational peace. Every fabric, stone asset, and layout vector tells a story of pure artistic intent.
          </p>

          <p className="text-sm font-sans font-light tracking-wide leading-relaxed text-white/70">
            We bridge pure hand-sculpted artisan techniques with cutting-edge layouts to configure bespoke, timeless architecture. Click anywhere to explore our full legacy.
          </p>
        </motion.div>

        {/* RIGHT FRAMED ASSETS */}
        <div className="md:col-span-7 grid grid-cols-12 gap-4 relative">
          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="col-span-8 relative aspect-[4/5] bg-white/5 rounded-lg overflow-hidden shadow-2xl"
          >
            <Image
              src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1000"
              alt="Artisan Studio Workshop"
              fill
              className="object-cover opacity-70 group-hover/story:scale-[1.02] transition-transform duration-700 ease-out"
            />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="col-span-4 absolute bottom-[-10%] right-0 w-[40%] aspect-[3/4] bg-white/5 rounded-lg overflow-hidden shadow-2xl border-4 border-[#121212]"
          >
            <Image
              src="https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&q=80&w=500"
              alt="Minimalist Architecture Detail"
              fill
              className="object-cover opacity-80"
            />
          </motion.div>
        </div>

      </div>
    </section>
  );
}