import React from 'react'

export default function EliteFooter() {
  return (
    <footer className="w-full bg-[#F5DBCE] text-black/80 mt-32 border-t border-black/10 font-light select-none">
      <div className="w-[90%] max-w-[1440px] mx-auto py-20 md:py-28 flex flex-col gap-16">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8">
          
          <div className="md:col-span-5 flex flex-col gap-6">
            <h2 className="text-2xl md:text-3xl font-light tracking-[0.15em] text-black font-serif uppercase">
              VANAURA <span className="text-xs uppercase font-sans tracking-[0.3em] ml-2 opacity-60">Elite</span>
            </h2>
            <p className="text-sm tracking-wide leading-relaxed text-black/70 max-w-sm font-sans">
              Handcrafted legacy furniture curated in natural peach cream clays, architectural stones, and rich wooden textures. Shaping spaces for generational comfort.
            </p>
          </div>

          <div className="hidden md:block md:col-span-1"></div>

          {/* Links structure mapped in clean Black */}
          <div className="md:col-span-3 flex flex-col gap-5">
            <h3 className="text-xs tracking-[0.25em] uppercase font-semibold text-black">
              Collections
            </h3>
            <ul className="flex flex-col gap-3.5 text-sm font-sans text-black/80">
              <li className="hover:text-black hover:translate-x-1 transition-all duration-300 cursor-pointer">Drawing Room</li>
              <li className="hover:text-black hover:translate-x-1 transition-all duration-300 cursor-pointer">Bedroom Sanctuary</li>
              <li className="hover:text-black hover:translate-x-1 transition-all duration-300 cursor-pointer">Dining & Lounge</li>
              <li className="hover:text-black hover:translate-x-1 transition-all duration-300 cursor-pointer">Veranda Sit Out</li>
            </ul>
          </div>

          <div className="md:col-span-3 flex flex-col gap-5">
            <h3 className="text-xs tracking-[0.25em] uppercase font-semibold text-black">
              The Studio
            </h3>
            <ul className="flex flex-col gap-3.5 text-sm font-sans text-black/80">
              <li className="hover:text-black hover:translate-x-1 transition-all duration-300 cursor-pointer">Our Artisan Philosophy</li>
              <li className="hover:text-black hover:translate-x-1 transition-all duration-300 cursor-pointer">Bespoke Curation</li>
              <li className="hover:text-black hover:translate-x-1 transition-all duration-300 cursor-pointer">Contact Atelier</li>
            </ul>
          </div>

        </div>

        {/* Divider line using clean black tint */}
        <div className="w-full h-[1px] bg-black/10" />

        {/* Bottom Metadata Block */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 text-[11px] tracking-[0.2em] text-black/60 uppercase font-sans">
          <div>
            © {new Date().getFullYear()} VANAURA LIVING. ALL RIGHTS RESERVED.
          </div>
          <div className="flex gap-10">
            <span className="hover:text-black transition-colors duration-300 cursor-pointer">Privacy</span>
            <span className="hover:text-black transition-colors duration-300 cursor-pointer">Terms</span>
          </div>
        </div>

      </div>
    </footer>
  )
}