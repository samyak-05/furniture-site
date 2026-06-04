'use client';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { increaseQuantity, decreaseQuantity, setCartData } from '@/redux/cartSlice';
import Navbar from '@/components/Navbar';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Trash2, ArrowRight, ShoppingBag } from 'lucide-react';

export default function CartPage() {
  const dispatch = useDispatch();
  const { cartData } = useSelector((state: RootState) => state.cart);
  
  // Extract theme context parameters cleanly from Redux Mode Slice
  const currentMode = useSelector((state: RootState) => state.mode.currentMode);
  const isPlatinum = currentMode === 'platinum';

  const theme = {
    bg: isPlatinum ? 'bg-[#F1FAFF]' : 'bg-[#F5DBCE]',
    text: isPlatinum ? 'text-[#4A3B32]' : 'text-[#4C2B12]',
    border: isPlatinum ? 'border-[#4A3B32]/10' : 'border-[#4C2B12]/10',
    cardBg: 'bg-white/60 backdrop-blur-md',
    accentBg: isPlatinum ? 'bg-[#4A3B32]' : 'bg-[#4C2B12]',
    accentText: isPlatinum ? 'text-white' : 'text-[#F5DBCE]',
    btnHover: isPlatinum ? 'hover:bg-[#4A3B32]/90' : 'hover:bg-[#4C2B12]/90'
  };

  const subtotal = cartData.reduce((acc, item) => {
    const itemPrice = typeof item.price === 'string' ? parseFloat(item.price) : item.price;
    return acc + (itemPrice * item.quantity);
  }, 0);

  const shipping = subtotal > 50000 || subtotal === 0 ? 0 : 3500;
  const total = subtotal + shipping;

  const handleRemoveItem = (id: string) => {
    const updatedCart = cartData.filter((item) => item._id?.toString() !== id);
    dispatch(setCartData(updatedCart));
  };

  return (
    <div className={`min-h-screen ${theme.bg} ${theme.text} transition-colors duration-500 pb-24`}>
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 pt-28 md:pt-36">
        <h1 className="text-2xl sm:text-3xl font-serif font-light tracking-[0.15em] uppercase mb-8 md:mb-12">
          Your Collection
        </h1>

        <AnimatePresence mode="wait">
          {cartData.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center py-20 flex flex-col items-center justify-center gap-5"
            >
              <div className={`p-5 rounded-full bg-white/40 ring-1 ${theme.border}`}>
                <ShoppingBag size={32} strokeWidth={1} />
              </div>
              <p className="font-serif font-light tracking-wide text-sm opacity-80">
                Your cart collection is currently empty.
              </p>
              <Link
                href={isPlatinum ? "/platinum" : "/"}
                className={`mt-2 px-6 py-3 text-[11px] font-medium tracking-widest uppercase ${theme.accentBg} ${theme.accentText} rounded-xl shadow-sm transition-all ${theme.btnHover}`}
              >
                Continue Exploring
              </Link>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              
              {/* CART ITEMS MATRIX */}
              <div className="lg:col-span-7 flex flex-col gap-4">
                <AnimatePresence>
                  {cartData.map((item) => {
                    const priceNum = typeof item.price === 'string' ? parseFloat(item.price) : item.price;
                    return (
                      <motion.div
                        key={item._id?.toString()}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        layout
                        className={`flex gap-4 sm:gap-6 p-4 rounded-2xl ${theme.cardBg} border ${theme.border} items-center justify-between shadow-sm`}
                      >
                        <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-neutral-100 flex-shrink-0 border border-black/5">
                          <Image
                            src={item.image[0]}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>

                        <div className="flex-1 min-w-0 flex flex-col gap-1 sm:gap-2">
                          <h2 className="text-sm sm:text-base font-medium tracking-tight truncate">
                            {item.name}
                          </h2>
                          <p className="text-xs sm:text-sm font-semibold opacity-90">
                            ₹{priceNum.toLocaleString('en-IN')}
                          </p>

                          <div className="flex items-center gap-4 mt-1">
                            <div className={`flex items-center gap-3 bg-black/5 border ${theme.border} px-2 py-1 rounded-lg`}>
                              <button
                                onClick={() => dispatch(decreaseQuantity(item._id!.toString()))}
                                className="opacity-70 hover:opacity-100 transition-opacity"
                                aria-label="Decrease quantity"
                              >
                                <Minus size={12} strokeWidth={2.5} />
                              </button>
                              <span className="text-xs font-bold w-4 text-center select-none">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => dispatch(increaseQuantity(item._id!.toString()))}
                                className="opacity-70 hover:opacity-100 transition-opacity"
                                aria-label="Increase quantity"
                              >
                                <Plus size={12} strokeWidth={2.5} />
                              </button>
                            </div>

                            <button
                              onClick={() => handleRemoveItem(item._id!.toString())}
                              className="text-red-500/80 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50/50 transition-all"
                              aria-label="Remove item"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>

                        <div className="text-right hidden sm:block pl-2">
                          <span className="text-xs text-neutral-400 block uppercase tracking-wider font-light">
                            Total
                          </span>
                          <span className="text-sm font-bold">
                            ₹{(priceNum * item.quantity).toLocaleString('en-IN')}
                          </span>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>

              {/* FISCAL WRAPPER METRICS */}
              <div className="lg:col-span-5 lg:sticky lg:top-28">
                <div className={`p-6 sm:p-8 rounded-2xl ${theme.cardBg} border ${theme.border} shadow-sm flex flex-col gap-6`}>
                  <h3 className="text-sm font-bold tracking-widest uppercase border-b pb-4 opacity-90">
                    Order Summary
                  </h3>

                  <div className="flex flex-col gap-3 text-xs sm:text-sm tracking-wide">
                    <div className="flex justify-between items-center opacity-80">
                      <span>Subtotal</span>
                      <span className="font-semibold">₹{subtotal.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between items-center opacity-80">
                      <span>Premium Delivery</span>
                      <span className="font-semibold">
                        {shipping === 0 ? (
                          <span className="text-green-600 font-medium tracking-wider uppercase text-[11px]">Complimentary</span>
                        ) : (
                          `₹${shipping.toLocaleString('en-IN')}`
                        )}
                      </span>
                    </div>
                  </div>

                  <div className={`border-t ${theme.border} pt-4 flex justify-between items-baseline`}>
                    <span className="text-xs uppercase tracking-widest font-medium opacity-80">Estimated Total</span>
                    <span className="text-lg sm:text-xl font-bold tracking-tight">
                      ₹{total.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <button
                    type="button"
                    className={`w-full py-4 rounded-xl font-medium tracking-widest text-[11px] uppercase transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer ${theme.accentBg} ${theme.accentText} ${theme.btnHover} shadow-md`}
                  >
                    Proceed to Checkout
                    <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>

            </div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}