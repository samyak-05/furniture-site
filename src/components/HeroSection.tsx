'use client';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface IProduct {
  _id: string;
  name: string;
  price: string;
  description: string;
  category: string;
  isLuxury: boolean;
  image: string[];
  model3d?: string;
}

export default function HeroSection() {
  const router = useRouter();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  
  const luxuryEase = [0.16, 1, 0.3, 1];

  useEffect(() => {
    async function fetchHeroProducts() {
      try {
        const response = await fetch('/api/products/elite-hero');
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        }
      } catch (err) {
        console.error("Failed to fetch lookbook assets", err);
      } finally {
        setLoading(false);
      }
    }
    fetchHeroProducts();
  }, []);

  useEffect(() => {
    if (products.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
    }, 10000); // Dynamic 10s intervals
    return () => clearInterval(interval);
  }, [products]);

  if (loading) {
    return (
      <div className="w-full h-screen bg-[#F5DBCE] flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-black/20 border-t-black rounded-full animate-spin" />
      </div>
    );
  }

  const activeProduct = products[currentIndex] || {
    _id: "default",
    name: "Estate Curation",
    description: "Handcrafted legacy furniture curated in natural peach cream clays, architectural stones, and rich wooden textures.",
    image: ["https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop"]
  };

  return (
    <section className="relative w-full h-screen bg-[#F5DBCE] overflow-hidden flex flex-col justify-between pt-24 select-none">
      
      {/* BACKGROUND IMAGE SLIDER OVERLAYS */}
      <div className="absolute inset-0 w-full h-full z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: luxuryEase }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={activeProduct.image[0]} 
              alt={activeProduct.name}
              fill
              priority
              className="object-cover object-center filter brightness-[0.88]"
            />
            {/* Blended Peach Cream & Shadow masks */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#F5DBCE]/30 via-transparent to-black/40 z-10" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* TOP HEADER LAYER - FIXED STARK BLACK */}
      <div className="relative z-20 w-full flex flex-col items-center text-center px-4 mt-12 md:mt-16">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: luxuryEase }}
          className="text-6xl sm:text-7xl md:text-[8.5rem] font-serif font-light text-black tracking-[0.15em] leading-none drop-shadow-sm uppercase"
        >
        </motion.h1>

        <div className="h-32 md:h-48 flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    <motion.h1 
                      key={currentIndex}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 1, ease: luxuryEase }}
                      className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-light text-brown tracking-wide leading-tight uppercase filter drop-shadow-md text-center"
                    >
                      {activeProduct.name}
                    </motion.h1>
                  </AnimatePresence>
                </div>
        
        <motion.p 
          initial={{ opacity: 0, tracking: "0.1em" }}
          animate={{ opacity: 0.9, tracking: "0.45em" }}
          transition={{ delay: 0.4, duration: 1.2, ease: luxuryEase }}
          className="text-xs sm:text-sm font-light text-black uppercase pl-[0.45em] mt-4 tracking-[0.45em] drop-shadow-sm"
        >
          THE NEW COLLECTION
        </motion.p>
      </div>

      {/* BOTTOM CONTROL BLOCKS */}
      <div className="relative z-20 w-full max-w-[1440px] mx-auto px-6 md:px-16 pb-12 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-8 mt-auto">
        
        {/* Left Column: Descriptions remain cleanly overlayed in soft off-white text */}
        <div className="max-w-xs md:max-w-md h-24 flex flex-col justify-end">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.6, ease: luxuryEase }}
            >
              <p className="text-[12px] font-light leading-relaxed text-[#FFFDF9] mt-1.5 font-sans drop-shadow-sm line-clamp-3">
                {activeProduct.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Column: Dynamic Loops Indicators & Black Action Unit */}
        <div className="flex flex-col items-start sm:items-end gap-6 w-full sm:w-auto shrink-0">
          
          {/* Visual Progress indices mapped in stark Black */}
          {products.length > 1 && (
            <div className="flex gap-2.5 mb-2">
              {products.map((_, index) => (
                <div 
                  key={index} 
                  className={`h-[2px] rounded-full transition-all duration-1000 ${
                    currentIndex === index ? 'w-12 bg-black' : 'w-4 bg-black/30'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Action unit */}
          <div className="flex items-center gap-6 sm:gap-8 w-full sm:w-auto justify-between sm:justify-end">
            <button 
              onClick={() => router.push(`/product/${activeProduct._id}`)}
              className="px-8 py-3.5 bg-black text-[#F5DBCE] cursor-pointer rounded-full text-xs font-semibold tracking-widest uppercase transition-all duration-300 hover:bg-neutral-900 hover:shadow-2xl hover:shadow-black/40 shadow-lg active:scale-95"
            >
              Shop Now
            </button>
          </div>
          
        </div>

      </div>

    </section>
  );
}