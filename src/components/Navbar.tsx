'use client';
import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession, signOut } from 'next-auth/react';
import { ShoppingBag, ChevronDown, User, Package, LogOut, Search, X, Menu, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { RootState } from '@/redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { setMode } from '@/redux/modeSlice';
import axios from 'axios';

interface ISuggestion {
  _id: string;
  name: string;
  category: string;
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<ISuggestion[]>([]);
  const [isSuggesting, setIsSuggesting] = useState(false);

  const user = session?.user;
  const tag = user?.role || "customer";
  
  const { cartData } = useSelector((state: RootState) => state.cart);
  const currentMode = useSelector((state: RootState) => state.mode.currentMode); // 'gold' | 'platinum'
  const isPlatinum = currentMode === 'platinum';

  // 🎨 Suggestion box layout configuration
  // Gold -> Remains unchanged (perfect rich brown aesthetic)
  // Platinum -> Upgraded to high-contrast deep neutral tones for perfect visibility over white background
  const theme = {
    bg: isPlatinum ? 'bg-[#F1FAFF]' : 'bg-[#F5DBCE]',
    text: isPlatinum ? 'text-[#4A3B32]' : 'text-[#4C2B12]',
    textHover: isPlatinum ? 'hover:opacity-70' : 'hover:text-[#4C2B12]/70',
    accentBg: isPlatinum ? 'bg-[#D4AF37]' : 'bg-[#4C2B12]', 
    accentText: isPlatinum ? 'text-white' : 'text-[#F5DBCE]', 
    border: isPlatinum ? 'border-[#4A3B32]/10' : 'border-[#4C2B12]/10',
    inputBg: isPlatinum ? 'bg-[#4A3B32]/5' : 'bg-[#4C2B12]/5',
    inputFocus: isPlatinum ? 'focus:border-[#4A3B32]' : 'focus:border-[#4C2B12]',
    
    // Dynamic Dropdown Styles
    dropdownBg: isPlatinum ? 'bg-white' : 'bg-[#4C2B12]',
    dropdownBorder: isPlatinum ? 'border-neutral-200' : 'border-white/10',
    dropdownText: isPlatinum ? 'text-neutral-900 font-semibold' : 'text-white',
    dropdownTextMuted: isPlatinum ? 'text-neutral-500 font-medium' : 'text-neutral-300/70',
    dropdownItemHover: isPlatinum ? 'hover:bg-neutral-100/70' : 'hover:bg-white/10',
    dropdownDivider: isPlatinum ? 'border-neutral-200' : 'border-white/10',
    dropdownBadgeBg: isPlatinum ? 'bg-neutral-100' : 'bg-white/10',
    dropdownHoverText: isPlatinum ? 'group-hover:text-black' : 'group-hover:text-white',
    dropdownIcon: isPlatinum ? 'text-neutral-500 group-hover:text-black' : 'text-neutral-300/70 group-hover:text-white'
  };

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSuggestions([]);
      setIsSuggesting(false);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      setIsSuggesting(true);
      try {
        const res = await axios.get('/api/suggestions', {
          params: {
            q: searchQuery.trim(),
            mode: String(currentMode).toLowerCase().trim()
          }
        });
        setSuggestions(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Autocomplete fetch cycle failed:", err);
        setSuggestions([]);
      } finally {
        setIsSuggesting(false);
      }
    }, 200);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, currentMode]);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setSuggestions([]);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    closeSearchWorkspace();
    router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
  };

  const handleSuggestionClick = (productId: string) => {
    closeSearchWorkspace();
    router.push(`/product/${productId}`);
  };

  const closeSearchWorkspace = () => {
    setIsSearchOpen(false);
    setSearchQuery('');
    setSuggestions([]);
  };

  const toggleMode = (targetMode: 'gold' | 'platinum') => {
    dispatch(setMode(targetMode));
    if (pathname.startsWith('/cart') || pathname.startsWith('/profile') || pathname.startsWith('/orders') || pathname.startsWith('/search')) {
      return;
    }
    if (pathname.startsWith('/platinum') && targetMode === 'gold') {
      router.push('/gold');
    } else if ((pathname === '/' || pathname.startsWith('/gold')) && targetMode === 'platinum') {
      router.push('/platinum');
    }
  };

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

  const showSuggestionsDropdown = isSearchOpen && searchQuery.trim().length > 0;

  return (
    <nav className={`w-full ${theme.bg} ${theme.border} border-b px-4 sm:px-6 md:px-16 py-4 md:py-5 flex justify-between items-center z-[100] fixed top-0 left-0 shadow-sm select-none transition-colors duration-500`}>
      
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`absolute inset-0 z-[110] ${theme.bg} flex items-center px-4 sm:px-6 md:px-16 gap-4`}
            ref={searchContainerRef}
          >
            <div className="relative flex-1 max-w-xl mx-auto flex flex-col">
              <form onSubmit={handleSearchSubmit} className="w-full flex items-center gap-3">
                <div className="relative flex-1">
                  <input
                    autoFocus
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={`Search Furniture within ${isPlatinum ? 'Luxury Segment' : 'Premium Catalog'}...`}
                    className={`w-full py-2 pl-11 pr-4 rounded-full text-xs font-light tracking-wide outline-none border ${theme.border} ${theme.inputBg} ${theme.text} placeholder-current/40 ${theme.inputFocus} focus:bg-transparent transition-all`}
                  />
                  <Search size={14} className={`absolute left-4 top-1/2 -translate-y-1/2 ${theme.text} opacity-60`} />
                </div>
                <button 
                  type="submit" 
                  className={`px-4 py-2 rounded-full text-[10px] font-semibold tracking-widest uppercase cursor-pointer ${theme.accentBg} ${theme.accentText} transition-all opacity-95 hover:opacity-100 shadow-sm`}
                >
                  Search
                </button>
              </form>

              <AnimatePresence>
                {showSuggestionsDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className={`absolute left-0 right-0 top-[45px] ${theme.dropdownBg} rounded-2xl shadow-[0_15px_30px_rgba(0,0,0,0.15)] border ${theme.dropdownBorder} p-5 z-[120] max-h-[320px] overflow-y-auto`}
                  >
                    <div className="flex flex-col gap-4">
                      <div className={`flex items-center justify-between border-b pb-1.5 ${theme.dropdownDivider}`}>
                        <span className={`text-[9px] uppercase tracking-widest ${theme.dropdownTextMuted} font-bold`}>
                          {isSuggesting ? "Scanning Furniture Catalog..." : "Suggested Matches"}
                        </span>
                        <span className={`text-[8px] ${theme.dropdownTextMuted} font-mono tracking-wider uppercase ${theme.dropdownBadgeBg} px-1.5 py-0.5 rounded font-semibold`}>
                          {isPlatinum ? "Luxury Room" : "Standard Room"}
                        </span>
                      </div>

                      {suggestions.length === 0 && !isSuggesting ? (
                        <p className={`text-[11px] font-serif font-light ${theme.dropdownTextMuted} italic py-2`}>
                          No furniture items found matching &ldquo;{searchQuery}&rdquo; in this segment.
                        </p>
                      ) : (
                        <div className="flex flex-col gap-1">
                          {suggestions.map((item) => (
                            <div
                              key={item._id}
                              onClick={() => handleSuggestionClick(item._id)}
                              className={`flex items-center justify-between p-2.5 rounded-lg ${theme.dropdownItemHover} group transition-all duration-150 cursor-pointer`}
                            >
                              <div className="flex flex-col gap-0.5 max-w-[90%]">
                                <p className={`text-xs ${theme.dropdownText} ${theme.dropdownHoverText} transition-colors line-clamp-1`}>
                                  {item.name}
                                </p>
                                <span className={`text-[8px] uppercase tracking-wider ${theme.dropdownTextMuted}`}>
                                  {item.category}
                                </span>
                              </div>
                              <ArrowUpRight size={12} className={`transition-all group-hover:translate-x-0.5 ${theme.dropdownIcon}`} />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button 
              onClick={closeSearchWorkspace} 
              className={`p-2 ${theme.text} hover:opacity-60 cursor-pointer transition-opacity`}
            >
              <X size={18} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-3 md:gap-8">
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`p-1.5 ${theme.text} md:hidden block cursor-pointer ${theme.textHover}`}
          aria-label="Toggle Navigation Menu"
        >
          <Menu size={20} />
        </button>

        <div className={`hidden md:flex items-center gap-8 text-[11px] font-sans tracking-[0.25em] uppercase ${theme.text} font-bold`}>
          <Link href={isPlatinum ? "/platinum" : "/gold"} className={`${theme.textHover} cursor-pointer transition-colors`}>Home</Link>
          <Link href="/story" className={`${theme.textHover} cursor-pointer transition-colors`}>Our Story</Link>
        </div>
      </div>

      <div className="md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 text-center z-10">
        <Link href={isPlatinum ? "/platinum" : "/gold"} className={`text-xl sm:text-2xl md:text-3xl font-serif font-light tracking-[0.15em] ${theme.text} uppercase cursor-pointer transition-all`}>
          VANAURA
        </Link>
      </div>

      <div className="flex items-center gap-2 sm:gap-4 md:gap-8 z-20">
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

        <div className={`flex items-center gap-1 sm:gap-2 md:gap-4 ${theme.text}`}>
          <button onClick={() => setIsSearchOpen(true)} className={`p-1 sm:p-1.5 ${theme.textHover} cursor-pointer transition-colors`} aria-label="Search">
            <Search size={18} strokeWidth={1.5} />
          </button>

          {!mounted || status === "loading" ? (
            <div className="w-5 h-5 rounded-full border border-current/20 border-t-current animate-spin" />
          ) : status === "authenticated" ? (
            <div className="relative" ref={profileRef}>
              <button 
                type="button"
                onClick={() => setIsOpen(!isOpen)} 
                className={`flex items-center gap-1 p-1 rounded-full border ${theme.border} cursor-pointer hover:bg-black/5 transition-all`}
              >
                <div className={`relative w-5 h-5 sm:w-6 sm:h-6 rounded-full overflow-hidden flex items-center justify-center bg-[#4A3B32] text-white font-bold text-[9px] sm:text-[10px]`}>
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
                      <Link href="/profile" className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium tracking-wider uppercase cursor-pointer hover:bg-black/5 rounded-lg transition-all"><User size={13} /> Profile</Link>
                      <Link href="/orders" className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium tracking-wider uppercase cursor-pointer hover:bg-black/5 rounded-lg transition-all"><Package size={13} /> Orders</Link>
                      <button 
                        type="button"
                        onClick={() => signOut()} 
                        className="w-full flex items-center gap-2.5 px-3 py-2 mt-0.5 text-xs font-bold tracking-wider uppercase text-red-500 cursor-pointer hover:bg-red-50/10 rounded-lg transition-all text-left"
                      >
                        <LogOut size={13} /> Sign Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link href="/signin" className={`p-1 sm:p-1.5 ${theme.textHover} cursor-pointer transition-colors inline-flex items-center justify-center`}>
              <User size={18} strokeWidth={1.5} />
            </Link>
          )}

          <Link href="/cart" className={`p-1.5 flex items-center gap-1.5 ${theme.textHover} cursor-pointer transition-colors`}>
            <span className="text-[10px] font-semibold tracking-widest uppercase hidden lg:inline">Cart</span>
            <div className="relative">
              <ShoppingBag size={18} strokeWidth={1.5} />
              <span className={`absolute -top-1 -right-1 ${isPlatinum ? 'bg-[#4A3B32] text-white' : 'bg-[#4C2B12] text-[#F5DBCE]'} text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold shadow-sm`}>
                {cartData ? cartData.length : 0}
              </span>
            </div>
          </Link>
        </div>
      </div>
    </nav> 
  );
}