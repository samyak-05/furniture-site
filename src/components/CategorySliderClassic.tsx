'use client'
import React, { useRef } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

import premSit from '../assets/premSit.avif'
import premHall from '../assets/premHall.webp'
import premDining from '../assets/premDining.webp'
import premBed from '../assets/premBed.avif'

function CategorySliderClassic() {
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
            className="w-[90%] max-w-[1440px] mx-auto mt-32 relative flex flex-col gap-10 select-none bg-white"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
            }}
        >
            {/* HEADER AREA - BACKGROUND WHITE, TEXT ROYAL BLUE */}
            <div className="flex items-end justify-between pr-2 relative pl-1 overflow-hidden bg-white">
                <div className="relative pb-3 bg-white">
                    <motion.h2 
                        className="text-2xl md:text-3xl font-normal font-serif tracking-[0.15em] text-[#0F2C59] uppercase"
                        variants={{
                            hidden: { opacity: 0, x: -15 },
                            visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: luxuryEase } }
                        }}
                    >
                        FEATURED HEIRLOOM PIECES
                    </motion.h2>
                    {/* Golden focal bottom accent line */}
                    <div className="absolute left-0 bottom-0 h-[1.5px] bg-[#D4AF37] w-16" />
                </div>

                {/* ARROW CONTROLLERS - AS SHOWN IN THE IMAGE */}
                <div className="flex gap-3 pb-1 bg-white">
                    <button 
                        onClick={() => handleScroll('left')}
                        className="w-11 h-11 rounded-full flex items-center justify-center text-[#0F2C59] bg-[#F5DBCE]/40 transition-all duration-300 hover:bg-[#0F2C59] hover:text-white active:scale-95"
                    >
                        <span className="text-sm font-light">←</span>
                    </button>
                    <button 
                        onClick={() => handleScroll('right')}
                        className="w-11 h-11 rounded-full flex items-center justify-center text-[#0F2C59] bg-[#F5DBCE]/40 transition-all duration-300 hover:bg-[#0F2C59] hover:text-white active:scale-95"
                    >
                        <span className="text-sm font-light">→</span>
                    </button>
                </div>
            </div>

            {/* SEAMLESS TRACK - ABSOLUTELY BACKGROUND WHITE, BORDER-NONE */}
            <div ref={scrollContainerRef} className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide scroll-smooth snap-x bg-white">
                {categories.map((category) => (
                    <motion.div 
                        key={category.id} 
                        whileHover={{ y: -4, transition: { duration: 0.4, ease: luxuryEase } }}
                        whileTap={{ scale: 0.99 }}
                        variants={{
                            hidden: { opacity: 0, y: 30 },
                            visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: luxuryEase } }
                        }}
                        className="group flex flex-col gap-5 min-w-[300px] sm:min-w-[360px] md:min-w-[400px] p-0 bg-white border-none shadow-none snap-start cursor-pointer"
                    >
                        {/* IMAGE FRAMES WITH ROUNDED CORNERS */}
                        <div className="w-full aspect-[4/3] relative rounded-2xl overflow-hidden bg-neutral-100 shadow-sm">
                            <Image 
                                src={category.icon} 
                                alt={category.name} 
                                fill
                                sizes="(max-width: 640px) 300px, (max-width: 768px) 360px, 400px"
                                className="object-cover transition-transform duration-700 ease-out group-hover:scale-103" 
                            />
                        </div>
                        
                        {/* TEXT MODULES IN PURE ROYAL BLUE */}
                        <div className="flex items-center justify-between px-1 bg-white">
                            <h3 className="text-xs font-semibold tracking-[0.15em] uppercase text-[#0F2C59]">
                                {category.name}
                            </h3>
                            <div className="text-[#0F2C59] text-xs opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                                →
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    )
}

export default CategorySliderClassic;