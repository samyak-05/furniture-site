'use client';
import React from 'react';
import mongoose from 'mongoose';
import Image from 'next/image';
import { motion } from 'framer-motion'; 
import { useRouter } from 'next/navigation';
import { AppDispatch } from '@/redux/store';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/redux/cartSlice';

interface IProduct {
  _id?: mongoose.Types.ObjectId;
  name: string;
  price: string;
  description: string;
  category: string;
  isLuxury: boolean;
  createdAt?: Date;
  image: Array<string>;
  model3d?: string;
  views: number;
  genre: string;
}

function ProductCard({ product }: { product: IProduct }) {
  const router = useRouter();
  const productId = product._id?.toString();
  const dispatch = useDispatch<AppDispatch>();

  const navigateToProduct = () => {
    if (!productId) return;

    fetch(`/api/product/${productId}/view`, {
      method: 'PATCH',
    }).catch((err) => console.error("Failed to update views tracking:", err));
    
    router.push(`/product/${productId}`);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="group relative bg-white rounded-2xl p-5 flex flex-col justify-between ring-1 ring-black/[0.04] hover:bg-[#FBFBFA] hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] transition-all duration-500 select-none"
    >
      <div>
        {/* ULTRA-CLEAN IMAGE ASPECT FRAME */}
        <div className="w-full aspect-[4/4] relative overflow-hidden rounded-xl bg-[#F6F6F5] ring-1 ring-black/[0.02]">
          {product.image && product.image[0] && (
            <>
              <Image 
                src={product.image[0]} 
                alt={product.name} 
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover object-center scale-[1.01] group-hover:scale-[1.04] transition-transform duration-1000 ease-[0.16, 1, 0.3, 1]" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/[0.02] to-transparent pointer-events-none" />
            </>
          )}
        </div>

        {/* METADATA & TYPOGRAPHY SECTION */}
        <div className="flex flex-col gap-2 mt-5 px-0.5">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-semibold text-neutral-400 uppercase tracking-[0.2em] block">
              {product.category}
            </span>
            {product.isLuxury && (
              <span className="text-[8px] font-medium text-amber-700/80 uppercase bg-amber-50 px-2 py-0.5 rounded-full tracking-wider border border-amber-200/40">
                Limited Edition
              </span>
            )}
          </div>
          
          <h2 className="text-base font-medium text-neutral-800 tracking-tight line-clamp-1 group-hover:text-black transition-colors duration-300">
            {product.name}
          </h2>
          
          <p className="text-xs text-neutral-400 font-light line-clamp-2 leading-relaxed tracking-wide">
            {product.description}
          </p>
        </div>
      </div>

      {/* FOOTER & BUTTON CONTROLS */}
      <div className="flex flex-col gap-4 mt-6 px-0.5">
        <div className="flex items-baseline justify-between pt-4 border-t border-neutral-100">
          <span className="text-[10px] font-light text-neutral-400 uppercase tracking-widest">Value</span>
          <span className="text-base font-semibold text-neutral-900 tracking-tight">
            ₹{Number(product.price).toLocaleString('en-IN')}
          </span>
        </div>

        {/* INTERACTION LAYOUT */}
        <div className="flex items-center gap-2 w-full pt-1">
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={navigateToProduct}
            className="flex-1 py-3 text-[11px] font-medium tracking-wider uppercase text-neutral-800 bg-transparent rounded-xl border border-neutral-200/70 hover:border-neutral-900 hover:text-neutral-950 transition-all duration-300 text-center cursor-pointer"
          >
            Explore Product
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => dispatch(addToCart({ ...product, quantity: 1 }))} 
            aria-label="Add to Cart"
            className="p-3 bg-neutral-950 hover:bg-neutral-800 text-white rounded-xl transition-colors duration-300 flex items-center justify-center shadow-sm aspect-square cursor-pointer"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none"
              viewBox="0 0 24 24" 
              strokeWidth={1.6} 
              stroke="currentColor" 
              className="w-4 h-4"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" 
              />
            </svg>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default ProductCard;