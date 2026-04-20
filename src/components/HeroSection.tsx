'use client';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';

const slides = [
  {
    id: 1,
    title: "The Artisanal Estate",
    subtitle: "Handcrafted legacy furniture curated in deep forest olives and sun-soaked beige.",
    btnText: "Explore Collection",
    bg: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop", 
  },
  {
    id: 2,
    title: "Organic Grandeur",
    subtitle: "Where minimalist aesthetics meet the timeless comfort of earthy tones.",
    btnText: "View Lookbook",
    bg: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=2000&auto=format&fit=crop",
  }
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#1a1c14]">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={slides[current].bg}
            alt={slides[current].title}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a1c14] via-[#1a1c14]/70 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1c14]/50 via-transparent to-transparent z-10" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-20 h-full flex flex-col justify-center px-6 md:px-24 max-w-7xl">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="space-y-4 md:space-y-8"
        >
          <div className="inline-block px-4 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-[#A3B18A] text-[9px] font-bold tracking-[0.6em] uppercase mb-4 shadow-2xl">
            RAAS ESTATE EDITION
          </div>

          <h1 className="text-6xl md:text-[9rem] font-serif text-[#F5F5DC] leading-[0.85] tracking-tighter italic">
            {slides[current].title.split(' ').map((word, i) => (
              <motion.span 
                key={i}
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 + i * 0.1, duration: 1.2 }}
                className="block"
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 1.4, duration: 1 }}
            className="text-[#EAE7D9] text-lg md:text-xl max-w-xl font-light pt-4"
          >
            {slides[current].subtitle}
          </motion.p>

          <div className="pt-10 flex items-center gap-8">
            <button className="group relative px-12 py-5 bg-[#3A5A40] text-[#F5F5DC] overflow-hidden rounded-full transition-all duration-700 hover:shadow-[0_0_50px_rgba(58,90,64,0.5)]">
              <div className="absolute inset-0 bg-[#A3B18A] translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500" />
              <span className="relative z-10 flex items-center gap-3 font-bold uppercase text-[11px] tracking-widest group-hover:text-[#1a1c14] transition-colors">
                {slides[current].btnText} <ArrowUpRight size={18} />
              </span>
            </button>
            <div className="flex gap-4">
              {slides.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)} className={`h-[1px] transition-all duration-1000 ${current === i ? 'w-16 bg-[#A3B18A]' : 'w-6 bg-white/20'}`} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}