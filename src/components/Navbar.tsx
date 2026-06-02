'use client';
import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession, signOut } from 'next-auth/react';
import { ShoppingBag, ChevronDown, User, Package, LogOut, Search, X, Menu } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  
  const isPlatinum = pathname.startsWith('/platinum');
  const user = session?.user;
  const tag = user?.role || "customer";

  // STYLING INVERSION: 
  // isPlatinum now gets the lighter blue palette (formerly classic).
  // The fallback (Gold) gets the warm terracotta/brown palette (formerly elite).
  const theme = {
    bg: isPlatinum ? 'bg-[#F1FAFF]' : 'bg-[#F5DBCE]',
    text: isPlatinum ? 'text-[#4A3B32]' : 'text-[#4C2B12]',
    textHover: isPlatinum ? 'hover:opacity-70' : 'hover:text-[#4C2B12]/70',
    accentBg: isPlatinum ? 'bg-[#D4AF37]' : 'bg-[#4C2B12]', 
    accentText: isPlatinum ? 'text-white' : 'text-[#F5DBCE]', 
    border: isPlatinum ? 'border-[#4A3B32]/10' : 'border-[#4C2B12]/10',
    inputBg: isPlatinum ? 'bg-[#4A3B32]/5' : 'bg-[#4C2B12]/5',
    inputFocus: isPlatinum ? 'focus:border-[#4A3B32]' : 'focus:border-[#4C2B12]'
  };

  const toggleMode = (targetMode: 'gold' | 'platinum') => {
    if (targetMode === 'platinum' && !isPlatinum) {
      router.push('/platinum');
    } else if (targetMode === 'gold' && isPlatinum) {
      router.push('/gold');
    }
  };

  // Ensure client-side values match server initial state by delaying auth section mounting
  useEffect(() => {
    setMounted(true);
  }, []);

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
    <nav className={`w-full ${theme.bg} ${theme.border} border-b px-4 sm:px-6 md:px-16 py-4 md:py-5 flex justify-between items-center z-[100] fixed top-0 left-0 shadow-sm select-none transition-colors duration-500`}>
      
      {/* MOBILE SEARCH OVERLAY PANEL */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`absolute inset-0 z-[110] ${theme.bg} flex items-center px-4 sm:px-6 gap-4`}
          >
            <div className="relative flex-1 max-w-xl mx-auto">
              <input
                autoFocus
                type="text"
                placeholder="Search Collection..."
                className={`w-full py-2 pl-12 pr-4 rounded-full text-sm font-light tracking-wide outline-none border ${theme.border} ${theme.inputBg} ${theme.text} placeholder-current/45 ${theme.inputFocus} focus:bg-transparent transition-all`}
              />
              <Search size={16} className={`absolute left-4 top-1/2 -translate-y-1/2 ${theme.text} opacity-70`} />
            </div>
            <button onClick={() => setIsSearchOpen(false)} className={`p-2 ${theme.text} hover:opacity-60`}>
              <X size={20} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* LEFT AREA: DESKTOP NAVIGATION & MOBILE HAMBURGER BUTTON */}
      <div className="flex items-center gap-3 md:gap-8">
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`p-1.5 ${theme.text} md:hidden block ${theme.textHover}`}
          aria-label="Toggle Navigation Menu"
        >
          <Menu size={20} />
        </button>

        <div className={`hidden md:flex items-center gap-8 text-[11px] font-sans tracking-[0.25em] uppercase ${theme.text} font-bold`}>
          <Link href="/" className={`${theme.textHover} transition-colors`}>Home</Link>
          <Link href="/story" className={`${theme.textHover} transition-colors`}>Our Story</Link>
        </div>
      </div>

      {/* CENTER AREA: VANAURA LOGO */}
      <div className="md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 text-center z-10">
        <Link href="/" className={`text-xl sm:text-2xl md:text-3xl font-serif font-light tracking-[0.15em] ${theme.text} uppercase transition-all`}>
          VANAURA
        </Link>
      </div>

      {/* RIGHT AREA: TOGGLER SHIELDS & UTILITIES CLUSTER */}
      <div className="flex items-center gap-2 sm:gap-4 md:gap-8 z-20">
        
        {/* RESPONSIVE MODE CONTROLLER */}
        {tag === "customer" && (
          <div className={`flex items-center gap-0.5 sm:gap-1 bg-black/5 border ${theme.border} p-0.5 sm:p-1 rounded-full text-[9px] sm:text-[10px] font-medium tracking-widest uppercase ${theme.text}`}>
            <button 
              type="button"
              className={`px-2 sm:px-3 py-1 cursor-pointer rounded-full transition-all duration-300 ${!isPlatinum ? `${theme.accentBg} ${theme.accentText} font-black shadow-sm` : 'opacity-80 hover:opacity-100'}`} 
              onClick={() => toggleMode('gold')}
            >
              Gold
            </button>
            <button 
              type="button"
              className={`px-2 sm:px-3 py-1 cursor-pointer rounded-full transition-all duration-300 ${isPlatinum ? `${theme.accentBg} ${theme.accentText} font-bold shadow-sm` : 'opacity-80 hover:opacity-100'}`} 
              onClick={() => toggleMode('platinum')}
            >
              Platinum
            </button>
          </div>
        )}

        {/* UTILITY ICONS ACTION GROUP */}
        <div className={`flex items-center gap-1 sm:gap-2 md:gap-4 ${theme.text}`}>
          
          <button onClick={() => setIsSearchOpen(true)} className={`p-1 sm:p-1.5 ${theme.textHover} transition-colors`} aria-label="Search">
            <Search size={18} strokeWidth={1.5} />
          </button>

          {!mounted || status === "loading" ? (
            <div className="w-5 h-5 rounded-full border border-current/20 border-t-current animate-spin" />
          ) : status === "authenticated" ? (
            <div className="relative" ref={profileRef}>
              <button 
                type="button"
                onClick={() => setIsOpen(!isOpen)} 
                className={`flex items-center gap-1 p-1 rounded-full border ${theme.border} hover:bg-black/5 transition-all`}
              >
                <div className={`relative w-5 h-5 sm:w-6 sm:h-6 rounded-full overflow-hidden flex items-center justify-center ${isPlatinum ? 'bg-[#4A3B32] text-white' : 'bg-[#4C2B12] text-[#F5DBCE]'} font-bold text-[9px] sm:text-[10px]`}>
                  {user?.image ? (
                    <Image src={user.image} alt="Profile" fill className="object-cover" />
                  ) : user?.name?.[0].toUpperCase() || 'U'}
                </div>
                <ChevronDown size={10} className="transition-transform duration-300 hidden sm:block" />
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    className={`absolute right-0 mt-3 w-48 sm:w-56 overflow-hidden rounded-xl shadow-xl border ${theme.border} ${isPlatinum ? 'bg-[#F1FAFF]' : 'bg-[#F5DBCE]'} ${theme.text}`}
                  >
                    <div className="px-4 py-3 border-b border-current/10 bg-current/5">
                      <p className="text-xs font-bold truncate leading-tight text-current">{user?.name}</p>
                      <p className="text-[9px] opacity-75 truncate mt-0.5 text-current">{user?.email}</p>
                    </div>
                    
                    <div className="p-1.5 flex flex-col gap-0.5">
                      <Link href="/profile" className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium tracking-wider uppercase hover:bg-black/5 rounded-lg transition-all"><User size={13} /> Profile</Link>
                      <Link href="/orders" className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium tracking-wider uppercase hover:bg-black/5 rounded-lg transition-all"><Package size={13} /> Orders</Link>
                      <button 
                        type="button"
                        onClick={() => signOut()} 
                        className="w-full flex items-center gap-2.5 px-3 py-2 mt-0.5 text-xs font-bold tracking-wider uppercase text-red-500 hover:bg-red-50/10 rounded-lg transition-all text-left"
                      >
                        <LogOut size={13} /> Sign Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link href="/signin" className={`p-1 sm:p-1.5 ${theme.textHover} transition-colors inline-flex items-center justify-center`}>
              <User size={18} strokeWidth={1.5} />
            </Link>
          )}

          {/* DESKTOP-ONLY CART VIEW (HIDDEN ON MOBILE SCREEN OVERLAPS) */}
          <Link href="/cart" className={`hidden md:flex p-1.5 items-center gap-1.5 ${theme.textHover} transition-colors`}>
            <span className="text-[10px] font-semibold tracking-widest uppercase hidden lg:inline">Cart</span>
            <div className="relative">
              <ShoppingBag size={18} strokeWidth={1.5} />
              <span className={`absolute -top-1 -right-1 ${isPlatinum ? 'bg-[#4A3B32] text-white' : 'bg-[#4C2B12] text-[#F5DBCE]'} text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold shadow-sm`}>
                0
              </span>
            </div>
          </Link>
          
        </div>

      </div>

      {/* MOBILE EXPANDABLE SLIDE DRAWER MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop Layer */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black z-[120] md:hidden block"
            />
            {/* Side Menu Drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={`fixed top-0 left-0 bottom-0 w-[280px] sm:w-[320px] ${theme.bg} border-r ${theme.border} z-[130] p-6 flex flex-col justify-between md:hidden block shadow-2xl`}
            >
              <div className="flex flex-col gap-8">
                <div className="flex justify-between items-center border-b pb-4">
                  <span className={`text-xl font-serif tracking-wider ${theme.text} uppercase`}>Vanaura Menu</span>
                  <button onClick={() => setIsMobileMenuOpen(false)} className={theme.text}>
                    <X size={20} />
                  </button>
                </div>
                
                <div className={`flex flex-col gap-6 text-sm font-sans tracking-[0.2em] uppercase ${theme.text} font-semibold`}>
                  <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="hover:pl-2 transition-all">Home</Link>
                  
                  {/* MOBILE CART INTEGRATION INSIDE SIDEBAR */}
                  <Link 
                    href="/cart" 
                    onClick={() => setIsMobileMenuOpen(false)} 
                    className="flex items-center justify-between border-y border-current/10 py-3 hover:pl-2 transition-all group"
                  >
                    <span className="flex items-center gap-2">
                      <ShoppingBag size={16} strokeWidth={1.5} />
                      Cart Collection
                    </span>
                    <span className={`text-[10px] ${isPlatinum ? 'bg-[#4A3B32] text-white' : 'bg-[#4C2B12] text-[#F5DBCE]'} px-2 py-0.5 rounded-full font-bold`}>
                      0
                    </span>
                  </Link>

                  <div className="flex flex-col gap-3">
                    <span className="text-current opacity-50 text-xs tracking-widest">Collections</span>
                    <Link href="/collections/drawing" onClick={() => setIsMobileMenuOpen(false)} className="pl-4 text-xs normal-case tracking-wide opacity-90 hover:pl-6 transition-all">→ Drawing Room</Link>
                    <Link href="/collections/bedroom" onClick={() => setIsMobileMenuOpen(false)} className="pl-4 text-xs normal-case tracking-wide opacity-90 hover:pl-6 transition-all">→ Bedroom Sanctuary</Link>
                    <Link href="/collections/dining" onClick={() => setIsMobileMenuOpen(false)} className="pl-4 text-xs normal-case tracking-wide opacity-90 hover:pl-6 transition-all">→ Dining & Lounge</Link>
                  </div>
                  
                  <Link href="/story" onClick={() => setIsMobileMenuOpen(false)} className="hover:pl-2 transition-all">Our Story</Link>
                </div>
              </div>

              <div className="text-[10px] tracking-widest uppercase opacity-50 mt-auto pt-6 border-t">
                © {new Date().getFullYear()} VANAURA LIVING.
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}