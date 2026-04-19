'use client';
import React, { useEffect, useState, useRef } from 'react'; // useRef yahan import kiya
import { motion, AnimatePresence } from 'framer-motion';
import { useSession, signOut } from 'next-auth/react';
import { ShoppingBag, ChevronDown, User, Package, LogOut, ArrowRightLeft, Search, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  // Ref hook ko sahi se initialize kiya
  const profileRef = useRef<HTMLDivElement>(null);

  // Click Outside Logic - FIXED
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Agar click profileRef ke bahar hua hai, toh dropdown band kardo
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]); // Jab isOpen change ho, tabhi listener trigger ho
  
  const isRaas = pathname === '/raas';
  const user = session?.user;

  return (
    <nav className={`fixed top-0 w-full z-[100] flex justify-between items-center px-4 md:px-12 py-3 md:py-4 transition-all duration-700 ${
      isRaas ? 'bg-[#0A0A0A] text-[#D4AF37]' : 'bg-[#FAF9F6]/95 backdrop-blur-md text-black border-b border-black/5'
    }`}>
      
      {/* MOBILE SEARCH OVERLAY */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className={`absolute inset-0 z-[110] flex items-center px-4 gap-4 ${isRaas ? 'bg-[#0A0A0A]' : 'bg-[#FAF9F6]'}`}
          >
            <div className="relative flex-1">
              <input
                autoFocus
                type="text"
                placeholder="Search..."
                className={`w-full py-2 pl-10 pr-4 rounded-full text-sm outline-none border ${
                  isRaas ? 'bg-[#1A1A1A] border-[#D4AF37]/20 text-[#D4AF37]' : 'bg-black/5 border-black/10'
                }`}
              />
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 opacity-50" />
            </div>
            <button onClick={() => setIsSearchOpen(false)} className="p-2">
              <X size={20} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* LEFT: LOGO & SWITCHER */}
      <div className="flex items-center gap-2 md:gap-8 shrink-0">
        <Link href="/" className={`text-xl md:text-2xl tracking-tighter shrink-0 ${isRaas ? 'font-serif italic tracking-[0.2em]' : 'font-black'}`}>
          {isRaas ? "R A A S" : "mood."}
        </Link>

        <Link href={isRaas ? "/mood" : "/raas"}>
          <motion.div 
            whileTap={{ scale: 0.95 }}
            className={`flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
              isRaas ? 'border-[#D4AF37]/30 text-[#D4AF37]' : 'border-black/10 text-black'
            }`}
          >
            <ArrowRightLeft size={10} strokeWidth={3} className="shrink-0" />
            <span className="text-[7px] font-black uppercase tracking-tighter sm:hidden">
              {isRaas ? "Mood" : "Raas"}
            </span>
            <span className="text-[9px] font-black uppercase tracking-widest hidden sm:inline">
              {isRaas ? "To Mood" : "To Raas"}
            </span>
          </motion.div>
        </Link>
      </div>

      {/* CENTER: SEARCH BAR (Desktop) */}
      <div className="hidden lg:flex flex-1 max-w-md mx-8">
        <div className="relative w-full group">
          <input
            type="text"
            placeholder={`Search ${isRaas ? 'Raas' : 'Mood'}...`}
            className={`w-full py-2.5 pl-11 pr-4 rounded-full text-xs font-medium outline-none transition-all duration-500 border ${
              isRaas 
              ? 'bg-[#1A1A1A] border-[#D4AF37]/20 text-[#D4AF37] focus:bg-[#222]' 
              : 'bg-black/5 border-black/5 text-black focus:bg-white'
            }`}
          />
          <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40" />
        </div>
      </div>

      {/* RIGHT: ACTIONS */}
      <div className="flex items-center gap-2 md:gap-6 shrink-0">
        <button onClick={() => setIsSearchOpen(true)} className="lg:hidden p-2 opacity-70">
          <Search size={20} />
        </button>

        <Link href="/cart" className="hidden sm:block p-2 relative">
          <ShoppingBag size={20} strokeWidth={isRaas ? 1.5 : 2.5} />
          <span className={`absolute top-1 right-1 w-1.5 h-1.5 rounded-full ${isRaas ? 'bg-[#D4AF37]' : 'bg-black'}`} />
        </Link>

        {status === "authenticated" ? (
          <div className="relative" ref={profileRef}> {/* Ref yaha apply kiya */}
            <button onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-1.5 md:gap-2 p-1 pr-2 rounded-full border border-current/10">
              <div className={`w-7 h-7 md:w-8 md:h-8 rounded-full overflow-hidden flex items-center justify-center text-[9px] font-bold ${
                isRaas ? 'bg-[#D4AF37] text-black' : 'bg-black text-white'
              }`}>
                {user?.image ? <img src={user.image} alt="Avatar" className="w-full h-full object-cover" /> : user?.name?.[0].toUpperCase()}
              </div>
              <ChevronDown size={12} className={isOpen ? 'rotate-180' : ''} />
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className={`absolute right-0 mt-4 w-56 md:w-64 rounded-2xl shadow-2xl border ${isRaas ? 'bg-[#121212] border-[#D4AF37]/20 text-[#D4AF37]' : 'bg-white border-black/10 text-black'}`}
                >
                  <div className="px-5 py-4 border-b border-current/5">
                    <p className="text-sm font-bold truncate">{user?.name}</p>
                    <p className="text-[10px] opacity-40">{user?.email}</p>
                  </div>
                  <div className="p-2 flex flex-col gap-1">
                    <Link href="/cart" className="sm:hidden flex items-center gap-3 px-4 py-2.5 text-xs font-bold uppercase hover:bg-current/5 rounded-xl"><ShoppingBag size={14} /> My Cart</Link>
                    <Link href="/profile" className="flex items-center gap-3 px-4 py-2.5 text-xs font-bold uppercase hover:bg-current/5 rounded-xl"><User size={14} /> Profile</Link>
                    <Link href="/orders" className="flex items-center gap-3 px-4 py-2.5 text-xs font-bold uppercase hover:bg-current/5 rounded-xl"><Package size={14} /> My Orders</Link>
                    <button onClick={() => signOut()} className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-black uppercase text-red-500 hover:bg-red-500/10 rounded-xl text-left"><LogOut size={14} /> Sign Out</button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <Link href="/login" className={`px-5 md:px-8 py-2 md:py-2.5 rounded-full text-[9px] md:text-[10px] font-black tracking-widest uppercase transition-all shadow-lg ${
              isRaas ? 'bg-[#D4AF37] text-black hover:bg-[#B8860B]' : 'bg-black text-white hover:bg-gray-800'
          }`}>Sign In</Link>
        )}
      </div>
    </nav>
  );
}