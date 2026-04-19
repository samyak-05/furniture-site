'use client';
import React from 'react';
import { motion, Variants } from "framer-motion";
import { useRouter } from "next/navigation";
import backgroundImage from '../assets/bgImage.jpeg';

export default function Welcome() {
  const router = useRouter();
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
      
      <div className="absolute inset-0 bg-black/50 z-10" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-20 max-w-4xl mx-auto"
      >
        <motion.span
          variants={itemVariants}
          className="text-xs md:text-sm text-[#D4AF37] tracking-[0.4em] uppercase mb-4 block font-bold"
        >
          Premium Furniture Collective
        </motion.span>

        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-8xl font-serif text-[#F9F6F0] mb-6 leading-[1.1] tracking-tight"
        >
          Design Your <br /> <span className="italic">Legacy.</span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-[#D1C7BD] mb-10 max-w-2xl mx-auto leading-relaxed font-light"
        >
          Modern aesthetics meet royal comfort. Choose your vibe and redefine your living space.
        </motion.p>

        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-4"
        >
          <button 
            onClick={() => router.push('/mood')}
            className="group w-full sm:w-auto px-10 py-4 border border-white/30 
            text-white hover:bg-white hover:text-black transition-all duration-500 
            font-sans text-sm tracking-[0.2em] uppercase backdrop-blur-sm cursor-pointer"
          >
            Explore MOOD
          </button>
          
          {/* RAAS BUTTON - Bold, Royal, Luxury */}
          <button 
            onClick={() => router.push('/raas')}
            className="relative w-full sm:w-auto px-10 py-4 bg-[#D4AF37] text-black 
            font-['Playfair_Display'] text-lg font-bold tracking-[0.1em] 
            uppercase shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_35px_rgba(212,175,55,0.5)] 
            transition-all duration-500 hover:-translate-y-1 cursor-pointer"
          >
            Enter R A A S
            {/* Animated Underline for Luxe Feel */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-8 h-[1px] bg-black/40 group-hover:w-12 transition-all duration-500" />
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}