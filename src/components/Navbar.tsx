'use client';
import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession, signOut } from 'next-auth/react';
import { ShoppingBag, ChevronDown, User, Package, LogOut, Search, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  
  const isElite = pathname.startsWith('/elite');
  const user = session?.user;
  const tag = user?.role || "customer";

  const toggleMode = (targetMode: 'classic' | 'elite') => {
    if (targetMode === 'elite' && !isElite) {
      router.push('/elite');
    } else if (targetMode === 'classic' && isElite) {
      router.push('/classic');
    }
  };

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
    <nav className="w-full bg-[#F5DBCE] border-b border-black/10 px-4 md:px-16 py-5 flex justify-between items-center z-[100] fixed top-0 left-0 shadow-sm select-none">
      
      {/* MOBILE SEARCH OVERLAY PANEL */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute inset-0 z-[110] bg-[#F5DBCE] flex items-center px-6 gap-4"
          >
            <div className="relative flex-1 max-w-xl mx-auto">
              <input
                autoFocus
                type="text"
                placeholder="Search Collection..."
                className="w-full py-2 pl-12 pr-4 rounded-full text-sm font-light tracking-wide outline-none border border-black/20 bg-white/30 text-black placeholder-black/50 focus:border-black/60 focus:bg-[#F5DBCE] transition-all"
              />
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-black/60" />
            </div>
            <button onClick={() => setIsSearchOpen(false)} className="p-2 text-black hover:opacity-60">
              <X size={20} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* LEFT: LINKS IN BLACK TEXT */}
      <div className="hidden md:flex items-center gap-8 text-[11px] font-sans tracking-[0.25em] uppercase text-black">
        <Link href="/" className="hover:opacity-60 transition-opacity">Home</Link>
        <div className="relative group cursor-pointer flex items-center gap-1">
          <span className="hover:opacity-60 transition-opacity">Collections</span>
          <span className="text-[7px] opacity-50">▼</span>
        </div>
        <Link href="/story" className="hover:opacity-60 transition-opacity">Our Story</Link>
      </div>

      {/* CENTER: WEBSITE BRANDING IN BLACK */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <Link href="/" className="text-2xl md:text-3xl font-serif font-light tracking-[0.15em] text-black drop-shadow-sm uppercase">
          WEBSITE
        </Link>
      </div>

      {/* RIGHT: MODE SWITCHER & USER CONTROL */}
      <div className="flex items-center gap-4 md:gap-8 ml-auto md:ml-0">
        
        {/* SLIDER CONTROLLER IN BLACK BLOCKS */}
        {tag === "customer" && (
          <div className="flex items-center gap-1 bg-black/5 border border-black/10 p-1 rounded-full text-[10px] font-medium tracking-widest uppercase text-black">
            <button 
              type="button"
              className={`px-3 py-1 rounded-full transition-all duration-300 ${!isElite ? 'bg-black text-[#F5DBCE] font-semibold' : 'opacity-60 hover:opacity-100'}`} 
              onClick={() => toggleMode('classic')}
            >
              Classic
            </button>
            <button 
              type="button"
              className={`px-3 py-1 rounded-full transition-all duration-300 ${isElite ? 'bg-black text-[#F5DBCE] font-semibold' : 'opacity-60 hover:opacity-100'}`} 
              onClick={() => toggleMode('elite')}
            >
              Elite
            </button>
          </div>
        )}

        {/* UTILITY MODULES */}
        <div className="flex items-center gap-2 md:gap-4 text-black">
          
          <button onClick={() => setIsSearchOpen(true)} className="p-1.5 hover:opacity-60 transition-opacity" aria-label="Search">
            <Search size={18} strokeWidth={1.5} />
          </button>

          {status === "loading" ? (
            <div className="w-5 h-5 rounded-full border border-current/10 border-t-transparent animate-spin" />
          ) : status === "authenticated" ? (
            <div className="relative" ref={profileRef}>
              <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="flex items-center gap-1.5 p-1 pr-2 rounded-full border border-black/20 hover:bg-black/5 transition-all"
              >
                <div className="relative w-6 h-6 rounded-full overflow-hidden flex items-center justify-center bg-black text-[#F5DBCE] font-bold text-[10px]">
                  {user?.image ? (
                    <Image src={user.image} alt="Avatar" fill className="object-cover" />
                  ) : user?.name?.[0].toUpperCase() || 'U'}
                </div>
                <ChevronDown size={11} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    className="absolute right-0 mt-3 w-56 overflow-hidden rounded-xl shadow-xl border border-black/10 bg-[#F5DBCE] text-black"
                  >
                    <div className="px-4 py-3 border-b border-black/10 bg-black/10">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-xs font-bold truncate leading-tight">{user?.name}</p>
                        {tag === "admin" && (
                          <span className="text-[7px] font-black uppercase tracking-widest px-1.5 py-0.5 bg-red-600 text-white rounded">Admin</span>
                        )}
                      </div>
                      <p className="text-[9px] opacity-70 truncate mt-0.5">{user?.email}</p>
                    </div>
                    
                    <div className="p-1.5 flex flex-col gap-0.5">
                      {tag === "customer" && (
                        <>
                          <Link href="/profile" className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium tracking-wider uppercase hover:bg-black/5 rounded-lg transition-all"><User size={13} /> Profile</Link>
                          <Link href="/orders" className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium tracking-wider uppercase hover:bg-black/5 rounded-lg transition-all"><Package size={13} /> Orders</Link>
                        </>
                      )}
                      {tag === "admin" && (
                        <Link href="/admin" className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium tracking-wider uppercase hover:bg-black/5 rounded-lg transition-all"><User size={13} /> Admin Panel</Link>
                      )}
                      <button 
                        onClick={() => signOut()} 
                        className="w-full flex items-center gap-2.5 px-3 py-2 mt-0.5 text-xs font-bold tracking-wider uppercase text-red-700 hover:bg-red-50 rounded-lg transition-all text-left"
                      >
                        <LogOut size={13} /> Sign Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link href="/signin" className="p-1.5 hover:opacity-60 transition-opacity">
              <User size={18} strokeWidth={1.5} />
            </Link>
          )}

          {tag === "customer" && (
            <Link href="/cart" className="p-1.5 flex items-center gap-1.5 hover:opacity-60 transition-opacity">
              <span className="text-[10px] font-semibold tracking-widest uppercase hidden lg:inline">Cart</span>
              <div className="relative">
                <ShoppingBag size={18} strokeWidth={1.5} />
                <span className="absolute -top-1 -right-1 bg-black text-[#F5DBCE] text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
                  0
                </span>
              </div>
            </Link>
          )}
          
        </div>

      </div>
    </nav>
  );
}