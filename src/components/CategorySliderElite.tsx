'use client'
import React, { useRef } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

import premSit from '../assets/premSit.avif'
import premHall from '../assets/premHall.webp'
import premDining from '../assets/premDining.webp'
import premBed from '../assets/premBed.avif'

function CategorySliderElite() {
    // Reference to the scrollable container
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const categories = [
        { id: 1, name: 'drawing room', icon: premHall, hoverBg: 'hover:bg-amber-50/40 hover:border-amber-200' },
        { id: 2, name: 'bedroom', icon: premBed, hoverBg: 'hover:bg-orange-50/40 hover:border-orange-200' },
        { id: 3, name: 'dining', icon: premDining, hoverBg: 'hover:bg-stone-100/80 hover:border-stone-300' },
        { id: 4, name: 'sit out', icon: premSit, hoverBg: 'hover:bg-yellow-50/30 hover:border-yellow-200' },
    ];

    const luxuryEase = [0.16, 1, 0.3, 1];

    // Scroll handler function
    const handleScroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            // Scroll by roughly the width of one card + gap
            const scrollAmount = 460; 
            
            container.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.12,
                delayChildren: 0.1,
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 40, scale: 0.98 },
        visible: { 
            opacity: 1, 
            y: 0, 
            scale: 1,
            transition: { duration: 0.9, ease: luxuryEase }
        }
    };

    return (
        <motion.div 
            className="w-[95%] max-w-[1440px] mx-auto mt-20 relative flex flex-col gap-12 select-none"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
        >
            {/* Header Area with Navigation Buttons */}
            <div className="flex items-end justify-between pr-4 relative pl-2 overflow-hidden">
                <div className="relative pb-2">
                    <motion.h2 
                        className="text-xl md:text-2xl font-light tracking-[0.2em] text-stone-800 uppercase"
                        variants={{
                            hidden: { opacity: 0, x: -15 },
                            visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: luxuryEase } }
                        }}
                    >
                        Shop By Category
                    </motion.h2>
                    <motion.div 
                        className="absolute left-0 bottom-0 h-[1px] bg-stone-400" 
                        variants={{
                            hidden: { width: 0 },
                            visible: { width: '2rem', transition: { delay: 0.4, duration: 0.8, ease: luxuryEase } }
                        }}
                    />
                </div>

                {/* Minimalist Premium Slide Buttons */}
                <div className="flex gap-3 pb-1">
                    <button 
                        onClick={() => handleScroll('left')}
                        className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center text-stone-600 bg-white/60 backdrop-blur-sm transition-all duration-300 hover:bg-stone-900 hover:text-white hover:border-stone-900 active:scale-95"
                        aria-label="Previous Category"
                    >
                        ←
                    </button>
                    <button 
                        onClick={() => handleScroll('right')}
                        className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center text-stone-600 bg-white/60 backdrop-blur-sm transition-all duration-300 hover:bg-stone-900 hover:text-white hover:border-stone-900 active:scale-95"
                        aria-label="Next Category"
                    >
                        →
                    </button>
                </div>
            </div>

            {/* Added ref={scrollContainerRef} to enable programming control over scroll positions */}
            <div 
                ref={scrollContainerRef}
                className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide scroll-smooth snap-x"
            >
                {categories.map((category) => (
                    <motion.div 
                        key={category.id} 
                        variants={cardVariants}
                        whileHover={{ 
                            y: -8,
                            transition: { duration: 0.4, ease: luxuryEase }
                        }}
                        whileTap={{ scale: 0.98 }}
                        className={`group flex flex-col gap-4 min-w-[320px] sm:min-w-[380px] md:min-w-[440px] p-4 rounded-xl bg-stone-50/40 border border-stone-100 cursor-pointer snap-start transition-all duration-500 ease-out hover:shadow-xl hover:shadow-stone-200/40 ${category.hoverBg}`}
                    >
                        <div className="w-full aspect-[4/3] relative rounded-lg overflow-hidden bg-stone-100 shadow-inner">
                            <Image 
                                src={category.icon} 
                                alt={category.name} 
                                fill
                                sizes="(max-width: 640px) 320px, (max-width: 768px) 380px, 440px"
                                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" 
                            />
                        </div>
                        
                        <div className="flex items-center justify-between px-1">
                            <h3 className="text-xs md:text-sm font-light tracking-widest uppercase text-stone-700 transition-colors duration-300 group-hover:text-stone-900">
                                {category.name}
                            </h3>
                            
                            <span className="text-xs font-light text-stone-400 opacity-0 -translate-x-3 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-x-0">
                                →
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    )
}

export default CategorySliderElite;