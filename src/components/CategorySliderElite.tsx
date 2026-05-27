'use client'
import React, { useRef } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

import premSit from '../assets/premSit.avif'
import premHall from '../assets/premHall.webp'
import premDining from '../assets/premDining.webp'
import premBed from '../assets/premBed.avif'

function CategorySliderElite() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const categories = [
        { id: 1, name: 'drawing room', icon: premHall },
        { id: 2, name: 'bedroom', icon: premBed },
        { id: 3, name: 'dining', icon: premDining },
        { id: 4, name: 'sit out', icon: premSit },
    ];

    const luxuryEase = [0.16, 1, 0.3, 1];

    const handleScroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            const scrollAmount = 460; 
            
            container.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <motion.div 
            className="w-[90%] max-w-[1440px] mx-auto mt-32 relative flex flex-col gap-10 select-none bg-transparent"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
            }}
        >
            {/* Header Content Section - Rendered perfectly via Black */}
            <div className="flex items-end justify-between pr-2 relative pl-1 overflow-hidden">
                <div className="relative pb-3">
                    <motion.h2 
                        className="text-2xl md:text-3xl font-light font-serif tracking-[0.15em] text-black uppercase drop-shadow-sm"
                        variants={{
                            hidden: { opacity: 0, x: -15 },
                            visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: luxuryEase } }
                        }}
                    >
                        FEATURED HEIRLOOM PIECES
                    </motion.h2>
                    <div className="absolute left-0 bottom-0 h-[1.5px] bg-black w-16" />
                </div>

                {/* Fine Minimal Navigation Round Buttons mapped in Peach Cream canvas */}
                <div className="flex gap-3 pb-1">
                    <button 
                        onClick={() => handleScroll('left')}
                        className="w-11 h-11 rounded-full border border-black/20 flex items-center justify-center text-black bg-[#F5DBCE]/40 backdrop-blur-sm transition-all duration-300 hover:bg-black hover:text-[#F5DBCE]"
                    >
                        <span className="text-sm font-semibold">←</span>
                    </button>
                    <button 
                        onClick={() => handleScroll('right')}
                        className="w-11 h-11 rounded-full border border-black/20 flex items-center justify-center text-black bg-[#F5DBCE]/40 backdrop-blur-sm transition-all duration-300 hover:bg-black hover:text-[#F5DBCE]"
                    >
                        <span className="text-sm font-semibold">→</span>
                    </button>
                </div>
            </div>

            {/* Seamless Borderless Track items as shown in image_66e27c.jpg */}
            <div ref={scrollContainerRef} className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide scroll-smooth snap-x">
                {categories.map((category) => (
                    <motion.div 
                        key={category.id} 
                        whileHover={{ y: -6, transition: { duration: 0.4, ease: luxuryEase } }}
                        whileTap={{ scale: 0.99 }}
                        variants={{
                            hidden: { opacity: 0, y: 40 },
                            visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: luxuryEase } }
                        }}
                        className="group flex flex-col gap-5 min-w-[300px] sm:min-w-[360px] md:min-w-[400px] p-2 bg-transparent border-none snap-start transition-all duration-500 cursor-pointer"
                    >
                        {/* Curved Frame Overlays */}
                        <div className="w-full aspect-[4/3] relative rounded-3xl overflow-hidden bg-black/5 shadow-sm">
                            <Image 
                                src={category.icon} 
                                alt={category.name} 
                                fill
                                sizes="(max-width: 640px) 300px, (max-width: 768px) 360px, 400px"
                                className="object-cover transition-transform duration-700 ease-out group-hover:scale-102" 
                            />
                        </div>
                        
                        {/* Title indices matching lookbook layout patterns */}
                        <div className="flex items-center justify-between px-2 pb-1">
                          <h3 className="text-xs md:text-sm font-medium tracking-[0.15em] uppercase text-black">
                              {category.name}
                          </h3>
                          <div className="text-black text-xs opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                              →
                          </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    )
}

export default CategorySliderElite;