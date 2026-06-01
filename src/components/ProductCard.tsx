'use client';
import React from 'react';
import mongoose from 'mongoose';
import Image from 'next/image';
import { motion } from 'framer-motion'; 
import { useRouter } from 'next/navigation';

interface IProduct {
  _id?: mongoose.Types.ObjectId | string;
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

  const handleCardClick = async () => {
    const productId = product._id?.toString();
    if (!productId) return;

    try {
      // Send a non-blocking request to increment the view count in the database
      fetch(`/api/product/${productId}/view`, {
        method: 'PATCH',
      }).catch((err) => console.error("Failed to update views tracking:", err));
      
      // Navigate to the dynamic route immediately
      router.push(`/`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ scale: 1.03, y: -4 }} 
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: false, amount: 0.2 }}
      onClick={handleCardClick}
      className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-shadow duration-300 p-4 flex flex-col justify-between cursor-pointer border border-neutral-100 select-none group"
    >
      <div>
        {/* IMAGE CONTAINER */}
        <div className="w-full h-56 relative overflow-hidden rounded-lg mb-4 bg-neutral-50">
          {product.image && product.image[0] && (
            <Image 
              src={product.image[0]} 
              alt={product.name} 
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700" 
            />
          )}
        </div>

        {/* DETAILS SECTION */}
        <div className="flex flex-col gap-1 px-1">
          <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-widest">
            {product.category}
          </span>
          <h2 className="text-base font-medium text-neutral-800 tracking-tight line-clamp-1 group-hover:text-neutral-900">
            {product.name}
          </h2>
          <p className="text-xs text-neutral-500 line-clamp-2 leading-relaxed mt-0.5">
            {product.description}
          </p>
        </div>
      </div>

      {/* FOOTER VALUES UNITS */}
      <div className="flex items-center justify-between mt-5 px-1 pt-3 border-t border-neutral-100">
        <span className="text-sm font-semibold text-neutral-900">
          ₹{product.price}
        </span>
      </div>
        
    </motion.div>
  );
}

export default ProductCard;