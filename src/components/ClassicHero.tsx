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
}

export default function HeroSectionClassic() {
  const router = useRouter();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  
  const luxuryEase = [0.16, 1, 0.3, 1];

  useEffect(() => {
    async function fetchClassicProducts() {
      try {
        const response = await fetch('/api/product/classic-hero');
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        }
      } catch (err) {
        console.error("Failed to load classic lookbook media assets:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchClassicProducts();
  }, []);

  useEffect(() => {
    if (products.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
    }, 10000); // Strict 10-second automatic carousel loop
    return () => clearInterval(interval);
  }, [products]);

  if (loading) {
    return (
      <div className="w-full h-screen bg-[#0F2C59] flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-white/20 border-t-[#D4AF37] rounded-full animate-spin" />
      </div>
    );
  }

  const activeProduct = products[currentIndex] || {
    _id: "default",
    name: "Classic Heirloom Curation",
    description: "Generational luxury furniture items configured in natural royal blues, white premium linen fabrics, and pristine golden frames.",
    image: ["https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop"]
  };

  return (
    <section className="relative w-full h-screen bg-[#0F2C59] overflow-hidden flex flex-col justify-between pt-24 select-none">
      
      {/* BACKGROUND IMAGE SLIDE FRAME */}
      <div className="absolute inset-0 w-full h-full z-0 bg-[#0F2C59]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.01 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: luxuryEase }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={activeProduct.image[0]} 
              alt={activeProduct.name}
              fill
              priority // Forces high-priority immediate loading
              unoptimized // 👈 Bypasses local server compression and forces full raw Cloudinary resolution
              sizes="100vw" // 👈 Explicitly tells the framework the asset takes up the full browser viewport
              className="object-cover object-center filter brightness-[0.78] contrast-[1.05]"
            />
            {/* Royal blue vignette overlay integration */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0F2C59]/30 via-transparent to-[#0F2C59]/80 z-10" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* TOP COMPOSITION - BALANCED PRODUCT TITLE IN PURE WHITE */}
      <div className="relative z-20 w-full flex flex-col items-center text-center px-6 mt-16 md:mt-24 max-w-6xl mx-auto">
        <div className="h-32 md:h-48 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.h1 
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 1, ease: luxuryEase }}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-light text-white tracking-wide leading-tight uppercase filter drop-shadow-md text-center"
            >
              {activeProduct.name}
            </motion.h1>
          </AnimatePresence>
        </div>
        
        <motion.p 
          initial={{ opacity: 0, tracking: "0.2em" }}
          animate={{ opacity: 0.9, tracking: "0.4em" }}
          transition={{ delay: 0.3, duration: 1.2, ease: luxuryEase }}
          className="text-xs sm:text-sm font-semibold text-white uppercase pl-[0.4em] mt-4 tracking-[0.4em] drop-shadow-sm opacity-80"
        >
          THE NEW COLLECTION
        </motion.p>
      </div>

      {/* BOTTOM LAYOUT SYSTEM PANEL */}
      <div className="relative z-20 w-full max-w-[1440px] mx-auto px-6 md:px-16 pb-16 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-8 mt-auto">
        
        {/* Left Column: Fixed description block in White Text */}
        <div className="max-w-xs md:max-w-xl h-20 flex flex-col justify-end">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.5, ease: luxuryEase }}
            >
              <p className="text-xs sm:text-sm font-light leading-relaxed text-white/90 drop-shadow-md font-sans line-clamp-3">
                {activeProduct.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Column: Progress Indicators & Golden Click Buttons */}
        <div className="flex flex-col items-start sm:items-end gap-6 w-full sm:w-auto shrink-0">
          
          {/* Ticker dots rendered explicitly in Pure White */}
          {products.length > 1 && (
            <div className="flex gap-2.5 mb-1">
              {products.map((_, index) => (
                <div 
                  key={index} 
                  className={`h-[2px] rounded-full transition-all duration-1000 ${
                    currentIndex === index ? 'w-12 bg-white' : 'w-4 bg-white/30'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Golden Focal Point Trigger Action Elements */}
          <div className="flex items-center gap-6 sm:gap-8 w-full sm:w-auto justify-between sm:justify-end">
            <button 
              onClick={() => router.push(`/product/${activeProduct._id}`)}
              className="px-8 py-3.5 bg-[#D4AF37] text-white rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 hover:bg-[#B8942A] hover:shadow-2xl hover:shadow-[#D4AF37]/40 shadow-lg active:scale-95 whitespace-nowrap"
            >
              Shop Now
            </button>
          </div>
          
        </div>

      </div>

    </section>
  );
}