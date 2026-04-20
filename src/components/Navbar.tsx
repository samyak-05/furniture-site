'use client';
import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession, signOut } from 'next-auth/react';
import { ShoppingBag, ChevronDown, User, Package, LogOut, ArrowRightLeft, Search, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

export default function Navbar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  
  const isRaas = pathname === '/raas';
  const user = session?.user;

  // Click Outside Logic - Dropdown band karne ke liye
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <nav className={`fixed top-0 w-full z-[100] flex justify-between items-center px-4 md:px-12 py-3 md:py-4 transition-all duration-700 ${
      isRaas ? 'bg-[#1a1c14] text-[#F5F5DC]' : 'bg-[#FAF9F6]/95 backdrop-blur-md text-black border-b border-black/5'
    }`}>
      
      {/* MOBILE SEARCH OVERLAY */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className={`absolute inset-0 z-[110] flex items-center px-4 gap-4 ${isRaas ? 'bg-[#1a1c14]' : 'bg-[#FAF9F6]'}`}
          >
            <div className="relative flex-1">
              <input
                autoFocus
                type="text"
                placeholder="Search the collection..."
                className={`w-full py-2 pl-10 pr-4 rounded-full text-sm outline-none border ${
                  isRaas ? 'bg-[#2a2e22] border-[#588157]/40 text-[#F5F5DC]' : 'bg-black/5 border-black/10'
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
            className={`flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1.5 rounded-full border transition-all cursor-pointer shadow-sm ${
              isRaas ? 'border-[#588157]/40 text-[#A3B18A] hover:bg-[#588157] hover:text-[#F5F5DC]' : 'border-black/10 text-black hover:bg-black hover:text-white'
            }`}
          >
            <ArrowRightLeft size={10} strokeWidth={3} className="shrink-0" />
            <span className="text-[7px] font-black uppercase tracking-tighter sm:hidden">Mood</span>
            <span className="text-[9px] font-black uppercase tracking-widest hidden sm:inline">To Mood</span>
          </motion.div>
        </Link>
      </div>

      {/* CENTER: SEARCH BAR (Desktop Only) */}
      <div className="hidden lg:flex flex-1 max-w-md mx-8">
        <div className="relative w-full">
          <input
            type="text"
            placeholder={`Search ${isRaas ? 'Raas' : 'Mood'}...`}
            className={`w-full py-2.5 pl-11 pr-4 rounded-full text-xs font-medium outline-none transition-all duration-500 border ${
              isRaas 
              ? 'bg-[#2a2e22] border-[#588157]/20 text-[#F5F5DC] focus:border-[#588157]/60 focus:bg-[#344e41]/30' 
              : 'bg-black/5 border-black/5 text-black focus:bg-white'
            }`}
          />
          <Search size={15} className={`absolute left-4 top-1/2 -translate-y-1/2 opacity-40 ${isRaas ? 'text-[#F5F5DC]' : ''}`} />
        </div>
      </div>

      {/* RIGHT: ACTIONS */}
      <div className="flex items-center gap-2 md:gap-6 shrink-0">
        {/* MOBILE SEARCH ICON */}
        <button onClick={() => setIsSearchOpen(true)} className="lg:hidden p-2 opacity-70">
          <Search size={20} />
        </button>

        {/* DESKTOP CART */}
        <Link href="/cart" className="hidden sm:block p-2 relative transition-transform hover:scale-110">
          <ShoppingBag size={20} strokeWidth={isRaas ? 1.5 : 2.5} />
          <span className={`absolute top-1 right-1 w-1.5 h-1.5 rounded-full ${isRaas ? 'bg-[#588157]' : 'bg-black'}`} />
        </Link>

        {status === "authenticated" ? (
          <div className="relative" ref={profileRef}>
            <button onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-1.5 md:gap-2 p-1 pr-2 rounded-full border border-current/10 hover:bg-current/5 transition-all">
              <div className="relative w-7 h-7 md:w-8 md:h-8 rounded-full overflow-hidden flex items-center justify-center bg-[#588157] text-[#F5F5DC] font-bold text-[9px] md:text-[10px]">
                {user?.image ? (
                  <Image src={user.image} alt="User Avatar" fill className="object-cover" />
                ) : user?.name?.[0].toUpperCase() || 'U'}
              </div>
              <ChevronDown size={12} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className={`absolute right-0 mt-4 w-56 md:w-64 overflow-hidden rounded-2xl shadow-2xl border ${isRaas ? 'bg-[#2a2e22] border-[#588157]/30 text-[#F5F5DC]' : 'bg-white border-black/10 text-black'}`}
                >
                  <div className="px-5 py-4 border-b border-current/5 bg-current/5">
                    <p className="text-sm font-bold truncate leading-tight">{user?.name}</p>
                    <p className="text-[10px] opacity-40 truncate">{user?.email}</p>
                  </div>
                  
                  <div className="p-2 flex flex-col gap-1">
                    <Link href="/cart" className="sm:hidden flex items-center gap-3 px-4 py-2.5 text-xs font-bold uppercase hover:bg-current/5 rounded-xl transition-all"><ShoppingBag size={14} /> My Cart</Link>
                    <Link href="/profile" className="flex items-center gap-3 px-4 py-2.5 text-xs font-bold uppercase hover:bg-current/5 rounded-xl transition-all"><User size={14} /> Profile</Link>
                    <Link href="/orders" className="flex items-center gap-3 px-4 py-2.5 text-xs font-bold uppercase hover:bg-current/5 rounded-xl transition-all"><Package size={14} /> My Orders</Link>
                    <button onClick={() => signOut()} className="w-full flex items-center gap-3 px-4 py-2.5 mt-1 text-xs font-black uppercase text-red-500 hover:bg-red-500/10 rounded-xl transition-all text-left"><LogOut size={14} /> Sign Out</button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <Link href="/login" className={`px-5 md:px-8 py-2 md:py-2.5 rounded-full text-[9px] md:text-[10px] font-black tracking-widest uppercase transition-all shadow-lg ${
              isRaas ? 'bg-[#588157] text-[#F5F5DC] hover:bg-[#344e41]' : 'bg-black text-white hover:bg-gray-800'
          }`}>Sign In</Link>
        )}
      </div>
    </nav>
  );
}