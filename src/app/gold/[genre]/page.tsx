'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import mongoose from 'mongoose';
import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard'; 
import EliteFooter from '@/components/EliteFooter'; // 🚀 Imported EliteFooter

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

export default function GoldGenreProductsPage() {
  const params = useParams();
  const genre = params?.genre as string;
  
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!genre || typeof genre !== 'string') return;

    const fetchGenreProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/product/genre/${genre.toLowerCase().trim()}`, {
          params: { mode: 'gold' }
        });
        setProducts(res.data);
      } catch (err) {
        console.error("Failed fetching gold matrix data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGenreProducts();
  }, [genre]);

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-[#F5DBCE]/10 flex items-center justify-center">
        <div className="w-6 h-6 rounded-full border-2 border-[#4C2B12]/20 border-t-[#4C2B12] animate-spin" />
      </div>
    );
  }

  return (
    <> {/* 🚀 Wrapped in a React Fragment to allow multiple top-level components */}
      <Navbar />
      
      <main className="w-full min-h-screen bg-[#F5DBCE]/10 px-4 sm:px-6 md:px-16 pt-32 pb-16">
        
        {/* 👑 Clean Editorial Gold Header Section */}
        <div className="flex flex-col gap-2 mb-12 border-b border-[#4C2B12]/10 pb-6">
          <h1 className="text-3xl md:text-4xl font-serif font-light tracking-[0.2em] text-[#4C2B12] uppercase">
            {genre === 'sitout' ? 'Sit Out' : genre} Catalog
          </h1>
          <p className="text-xs text-[#4C2B12]/60 font-sans tracking-widest uppercase">
            Premium Everyday Living Essentials
          </p>
        </div>

        {/* Product Grid Assembly Area */}
        {products.length === 0 ? (
          <div className="py-24 text-center">
            <p className="text-sm font-serif italic text-[#4C2B12]/50">
              No premium pieces found in the &ldquo;{genre}&rdquo; catalog at this time.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((item) => (
              <ProductCard key={item._id?.toString()} product={item} />
            ))}
          </div>
        )}
      </main>

      <EliteFooter />
    </>
  );
}