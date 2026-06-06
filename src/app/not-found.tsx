'use client';
import React, { useEffect } from 'react';

export default function NotFound() {
  
  // 🚀 BROWSER BACK BUTTON INTERCEPTOR
  // Agar user browser ka physical back button bhi dabata hai, toh use absolute native page clean shift par bhejenge
  useEffect(() => {
    const handleBrowserBack = (e: PopStateEvent) => {
      e.preventDefault();
      triggerSafeRedirect();
    };

    window.addEventListener('popstate', handleBrowserBack);
    return () => window.removeEventListener('popstate', handleBrowserBack);
  }, []);

  const triggerSafeRedirect = () => {
    if (typeof window !== 'undefined') {
      // Pichla valid path storage se nikalenge (e.g., '/platinum')
      const targetPath = sessionStorage.getItem('last_valid_showroom_path') || '/gold';
      
      // 🚀 THE MAGIC WAND: window.location.href Next.js router cache tree ko destroy karke fresh mount karta hai
      // Isse infinite loading spinner (Suspense freeze) humesha ke liye khatam ho jata hai!
      window.location.href = targetPath;
    }
  };

  return (
    <div className="w-full h-screen bg-[#121212] flex flex-col items-center justify-center text-white select-none">
      <h2 className="text-4xl font-serif font-light tracking-wider text-[#D4AF37] uppercase mb-4">
        404 - Page Not Found
      </h2>
      <p className="text-sm text-white/60 mb-8 max-w-xs text-center font-sans font-light">
        The architectural design or space you are looking for does not exist.
      </p>
      <div className="flex gap-4">
        <button 
          onClick={triggerSafeRedirect}
          className="border border-white/20 px-6 py-2.5 rounded-full text-xs tracking-widest uppercase font-semibold hover:bg-white hover:text-[#121212] transition-all duration-300 cursor-pointer"
        >
          Go Back to Showroom
        </button>
        <button 
          onClick={() => { window.location.href = '/gold'; }}
          className="bg-white text-[#121212] px-6 py-2.5 rounded-full text-xs tracking-widest uppercase font-semibold hover:bg-transparent hover:text-white border border-white transition-all duration-300 cursor-pointer"
        >
          Return Home
        </button>
      </div>
    </div>
  );
}