'use client';
import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import ClassicFooter from '@/components/ClassicFooter'; // Ensure this matches your component location
import EliteFooter from '@/components/EliteFooter';     // Ensure this matches your component location
import Link from 'next/link';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  
  // Read active layer state from Redux Mode Slice
  const currentMode = useSelector((state: RootState) => state.mode.currentMode);
  const isPlatinum = currentMode === 'platinum';

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Dynamic layout color mapping for header elements only
  const layoutTheme = {
    headerBg: isPlatinum ? 'bg-[#F1FAFF]' : 'bg-[#F5DBCE]',
    text: isPlatinum ? 'text-[#4A3B32]' : 'text-[#4C2B12]',
    border: isPlatinum ? 'border-[#4A3B32]/10' : 'border-[#4C2B12]/10',
    accentBg: isPlatinum ? 'bg-[#4A3B32]' : 'bg-[#4C2B12]',
    accentText: isPlatinum ? 'text-white' : 'text-[#F5DBCE]'
  };

  useEffect(() => {
    if (!query) return;

    const fetchSearchResults = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/product/search?q=${query}&mode=${currentMode}`);
        setProducts(res.data);
      } catch (err) {
        console.error("Failed to load search feed catalog:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query, currentMode]);

  return (
    <div className={`min-h-screen ${layoutTheme.headerBg} ${layoutTheme.text} transition-colors duration-500 flex flex-col`}>
      <Navbar />

      {/* TOP SECTION: DYNAMIC SHOWROOM DETAILS (WITH FIXED SPACING MATRIX) */}
      <header className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-16 pt-28 md:pt-36 pb-10">
        <p className="text-[10px] uppercase tracking-[0.3em] opacity-60 mb-2">Search Results</p>
        <h1 className="text-xl sm:text-2xl font-serif font-light tracking-wide flex flex-wrap items-center gap-x-2 gap-y-1">
          <span>Showing results for</span>
          <span className="font-normal italic">&ldquo;{query}&rdquo;</span>
          <span>inside</span>
          <span className="font-semibold uppercase tracking-wider text-[10px] px-2.5 py-1 rounded-full bg-black/5 border border-current/10 select-none inline-block">
            {currentMode} room
          </span>
        </h1>
      </header>

      {/* PRODUCT MATRIX CONTENT CONTAINER: ALWAYS FORCED ABSOLUTE WHITE BACKGROUND */}
      <section className="bg-white flex-1 border-t border-neutral-100 py-12 md:py-16 shadow-[inner_0_4px_12px_rgba(0,0,0,0.01)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          
          {loading ? (
            /* STYLISH TIMEOUT LOADING SKELETON PLACEHOLDERS */
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="animate-pulse flex flex-col gap-4 p-5 bg-neutral-50/50 rounded-2xl border border-neutral-100">
                  <div className="aspect-square w-full bg-neutral-200/60 rounded-xl" />
                  <div className="h-4 bg-neutral-200/60 rounded-md w-3/4 mt-2" />
                  <div className="h-3 bg-neutral-200/40 rounded-md w-1/2" />
                  <div className="h-10 bg-neutral-200/50 rounded-xl w-full mt-4" />
                </div>
              ))}
            </div>
          ) : (
            <AnimatePresence mode="wait">
              {products.length === 0 ? (
                /* EMPTY SEARCH PLACEHOLDER PLATFORM */
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-16 flex flex-col items-center justify-center gap-4"
                >
                  <div className="p-4 rounded-full bg-neutral-50 ring-1 ring-neutral-200/60">
                    <ShoppingBag size={24} className="text-neutral-400" strokeWidth={1.5} />
                  </div>
                  <p className="font-serif font-light text-sm text-neutral-500 tracking-wide">
                    No matching interior items found inside this collection tier.
                  </p>
                  <Link 
                    href={isPlatinum ? '/platinum' : '/gold'}
                    className={`mt-2 px-6 py-2.5 text-[10px] font-medium tracking-widest uppercase rounded-xl transition-all duration-300 opacity-90 hover:opacity-100 ${layoutTheme.accentBg} ${layoutTheme.accentText} shadow-sm cursor-pointer`}
                  >
                    Back to Showroom
                  </Link>
                </motion.div>
              ) : (
                /* CORE LUXURY PRODUCT CARD GRID RENDER WINDOW */
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8"
                >
                  {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          )}

        </div>
      </section>

      {/* 🚀 DYNAMIC FOOTER SWITCH ARCHITECTURE */}
      {isPlatinum ? <ClassicFooter /> : <EliteFooter />}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="fixed inset-0 bg-white flex items-center justify-center text-neutral-400 text-xs tracking-[0.2em] font-light uppercase animate-pulse">Loading Collection Architecture...</div>}>
      <SearchContent />
    </Suspense>
  );
}
