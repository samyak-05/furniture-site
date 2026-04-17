'use client';
import React from 'react';
import { motion, Variants } from "framer-motion";
import backgroundImage from '../assets/bgImage.jpeg';

export default function Welcome() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen text-center p-6 overflow-hidden bg-[#1a1a1a]">
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage.src})` }}
      />
      
      <div className="absolute inset-0 bg-black/40 z-10" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-20 max-w-4xl mx-auto"
      >
        <motion.span
          variants={itemVariants}
          className="text-sm md:text-base text-[#D4C3B3] tracking-[0.2em] uppercase mb-4 block font-medium"
        >
          Curated Living
        </motion.span>

        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl font-serif text-[#F9F6F0] mb-6 leading-tight"
        >
          Elevate Your Space with Timeless Design.
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-[#D1C7BD] mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          Discover handcrafted pieces that blend modern aesthetics with everyday comfort. Turn your house into a home.
        </motion.p>

        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-4"
        >
          <button className="w-full sm:w-auto px-8 py-4 border border-[#D4C3B3] text-[#D4C3B3] hover:bg-[#D4C3B3] hover:text-[#4A3728] transition-colors duration-300 font-medium text-lg tracking-wide">
            Everyday Essentials
          </button>
          
          <button className="w-full sm:w-auto px-8 py-4 bg-[#F9F6F0] text-[#4A3728] hover:bg-[#E8E0D5] transition-colors duration-300 font-medium text-lg tracking-wide shadow-lg hover:shadow-xl">
            The Luxury Edit
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}