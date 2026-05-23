'use client';
import Navbar from '@/components/Navbar';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PackagePlus, LayoutGrid, X } from 'lucide-react';
import AddProduct from '@/components/AddProduct';

export default function AdminPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#2A3439]">
      <Navbar />

      <div className="max-w-4xl mx-auto pt-28 px-4 sm:px-6">
        
        {!isFormOpen ? (
          /* CARD GRID SELECTION VIEW */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            
            {/* BOX 1: ADD NEW PRODUCT TRIGGER */}
            <button
              onClick={() => setIsFormOpen(true)}
              className="bg-white border border-black/5 rounded-[40px] p-8 sm:p-10 flex flex-col items-start text-left shadow-[0_15px_40px_rgba(0,0,0,0.015)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.03)] transition-all duration-300 group cursor-pointer w-full focus:outline-none"
            >
              <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center text-red-500 mb-8 group-hover:scale-105 transition-transform duration-300">
                <PackagePlus size={24} strokeWidth={2} />
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-black mb-3">
                Add New Product
              </h2>
              <p className="text-gray-400 text-sm font-medium leading-relaxed">
                Deploy fresh stock lines, detailed material descriptions, dynamic pricing, and canvas visual assets directly to the store.
              </p>
            </button>

            {/* BOX 2: PLACEHOLDER FOR ANOTHER ADMIN FUNCTION */}
            <div className="bg-white border border-black/5 rounded-[40px] p-8 sm:p-10 flex flex-col items-start text-left shadow-[0_15px_40px_rgba(0,0,0,0.015)] transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-8">
                <LayoutGrid size={24} strokeWidth={2} />
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-black mb-3">
                View Collections
              </h2>
              <p className="text-gray-400 text-sm font-medium leading-relaxed">
                Monitor live product distribution metrics, modify active item specifications, or clear completely depleted lines from production.
              </p>
            </div>

          </div>
        ) : (
          /* EXPANDED FORM STATE SHELL */
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white border border-black/5 rounded-[40px] p-8 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.02)] max-w-2xl mx-auto"
          >
            <div className="flex items-center justify-between border-b border-black/5 pb-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-red-500">
                  <PackagePlus size={16} strokeWidth={2.5} />
                </div>
                <span className="text-xs font-black uppercase tracking-widest text-black">New Product Pipeline</span>
              </div>
              <button 
                onClick={() => setIsFormOpen(false)}
                className="p-1.5 rounded-full hover:bg-black/5 transition-colors cursor-pointer text-gray-400 hover:text-black"
              >
                <X size={18} strokeWidth={2.5} />
              </button>
            </div>

            {/* Render your component here in place of the placeholder */}
            <AddProduct />
            
          </motion.div>
        )}

      </div>
    </div>
  );
}