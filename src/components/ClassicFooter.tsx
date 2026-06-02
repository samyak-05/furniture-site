import React from 'react'

export default function ClassicFooter() {
  return (
    <footer className="w-full bg-[#F1FAFF] text-[#4A3B32] mt-32 border-t border-[#4A3B32]/10 font-medium select-none">
      <div className="w-[90%] max-w-[1440px] mx-auto py-20 md:py-28 flex flex-col gap-16">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8">
          
          {/* LEFT: BRAND DESCRIPTION */}
          <div className="md:col-span-5 flex flex-col gap-6">
            <h2 className="text-2xl md:text-3xl font-light tracking-[0.15em] text-[#4A3B32] font-serif uppercase">
              VANAURA <span className="text-xs uppercase font-sans tracking-[0.3em] ml-2 text-[#4A3B32] font-black opacity-30">Platinum</span>
            </h2>
            <p className="text-sm tracking-wide leading-relaxed text-[#4A3B32]/80 max-w-sm font-sans font-light">
              Handcrafted legacy furniture curated in natural royal fabrics, architectural stones, and flawless brushed golden frames. Shaping spaces for generational comfort.
            </p>
          </div>

          <div className="hidden md:block md:col-span-1"></div>

          {/* CENTER LINKS */}
          <div className="md:col-span-3 flex flex-col gap-5">
            <h3 className="text-xs tracking-[0.25em] uppercase font-black tracking-widest text-[#4A3B32]">
              Collections
            </h3>
            <ul className="flex flex-col gap-3.5 text-sm font-sans text-[#4A3B32]/90">
              <li className="hover:opacity-65 hover:translate-x-1 transition-all duration-300 cursor-pointer">Drawing Room</li>
              <li className="hover:opacity-65 hover:translate-x-1 transition-all duration-300 cursor-pointer">Bedroom Sanctuary</li>
              <li className="hover:opacity-65 hover:translate-x-1 transition-all duration-300 cursor-pointer">Dining & Lounge</li>
              <li className="hover:opacity-65 hover:translate-x-1 transition-all duration-300 cursor-pointer">Veranda Sit Out</li>
            </ul>
          </div>

          {/* RIGHT LINKS */}
          <div className="md:col-span-3 flex flex-col gap-5">
            <h3 className="text-xs tracking-[0.25em] uppercase font-black tracking-widest text-[#4A3B32]">
              The Studio
            </h3>
            <ul className="flex flex-col gap-3.5 text-sm font-sans text-[#4A3B32]/90">
              <li className="hover:opacity-65 hover:translate-x-1 transition-all duration-300 cursor-pointer">Our Artisan Philosophy</li>
              <li className="hover:opacity-65 hover:translate-x-1 transition-all duration-300 cursor-pointer">Bespoke Curation</li>
              <li className="hover:opacity-65 hover:translate-x-1 transition-all duration-300 cursor-pointer">Contact Atelier</li>
            </ul>
          </div>

        </div>

        {/* CLEAN SEPARATION DIVIDER LINE */}
        <div className="w-full h-[1px] bg-[#4A3B32]/10" />

        {/* BOTTOM METADATA BAR */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 text-[11px] tracking-[0.2em] text-[#4A3B32]/70 uppercase font-sans font-semibold">
          <div>
            © {new Date().getFullYear()} VANAURA LIVING. ALL RIGHTS RESERVED.
          </div>
          <div className="flex gap-10">
            <span className="hover:opacity-65 transition-colors duration-300 cursor-pointer">Privacy</span>
            <span className="hover:opacity-65 transition-colors duration-300 cursor-pointer">Terms</span>
          </div>
        </div>

      </div>
    </footer>
  )
}