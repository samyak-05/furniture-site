import React from 'react'

function EliteFooter() {
  return (
    <footer className="w-full bg-[#1a1c18] text-[#e4d9c4] mt-32 border-t border-[#3d5a45]/20 font-light select-none">
      <div className="w-[90%] max-w-[1440px] mx-auto py-16 md:py-24 flex flex-col gap-16">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          
          <div className="md:col-span-5 flex flex-col gap-6">
            <h2 className="text-2xl md:text-3xl font-normal tracking-[0.25em] text-white uppercase italic">
              Elite
            </h2>
            <p className="text-sm tracking-wide leading-relaxed text-[#e4d9c4]/70 max-w-sm">
              Handcrafted legacy furniture curated in deep forest olives, natural stones, and sun-soaked beige. Shaping spaces for generational comfort.
            </p>
          </div>

          {/* Spacer for wider screens */}
          <div className="hidden md:block md:col-span-1"></div>

          {/* Navigation Links Column */}
          <div className="md:col-span-3 flex flex-col gap-4">
            <h3 className="text-xs tracking-[0.2em] uppercase font-semibold text-[#3d5a45] mb-2">
              Collections
            </h3>
            <ul className="flex flex-col gap-3 text-sm tracking-wide text-[#e4d9c4]/80">
              <li className="hover:text-white transition-colors duration-300 cursor-pointer">Drawing Room</li>
              <li className="hover:text-white transition-colors duration-300 cursor-pointer">Bedroom Sanctuary</li>
              <li className="hover:text-white transition-colors duration-300 cursor-pointer">Dining & Lounge</li>
              <li className="hover:text-white transition-colors duration-300 cursor-pointer">Veranda Sit Out</li>
            </ul>
          </div>

          {/* Contact / Studio Column */}
          <div className="md:col-span-3 flex flex-col gap-4">
            <h3 className="text-xs tracking-[0.2em] uppercase font-semibold text-[#3d5a45] mb-2">
              The Studio
            </h3>
            <ul className="flex flex-col gap-3 text-sm tracking-wide text-[#e4d9c4]/80">
              <li className="hover:text-white transition-colors duration-300 cursor-pointer">Our Artisan Philosophy</li>
              <li className="hover:text-white transition-colors duration-300 cursor-pointer">Bespoke Curation</li>
              <li className="hover:text-white transition-colors duration-300 cursor-pointer">Contact Atelier</li>
            </ul>
          </div>

        </div>

        {/* Middle Divider Line */}
        <div className="w-full h-[1px] bg-[#e4d9c4]/10" />

        {/* Bottom Section: Copyright & Legal */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 text-xs tracking-widest text-[#e4d9c4]/40 uppercase">
          <div>
            © {new Date().getFullYear()} Elite Estate. All Rights Reserved.
          </div>
          <div className="flex gap-8">
            <span className="hover:text-[#e4d9c4] transition-colors duration-300 cursor-pointer">Privacy</span>
            <span className="hover:text-[#e4d9c4] transition-colors duration-300 cursor-pointer">Terms</span>
          </div>
        </div>

      </div>
    </footer>
  )
}

export default EliteFooter
