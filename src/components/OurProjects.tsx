'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const projects = [
  {
    title: 'CivicFlow Curation',
    category: 'Public Architectural Spaces',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800',
    desc: 'Streamlined minimalist design integrated into modern structural zones.'
  },
  {
    title: 'StayScape Domain',
    category: 'Luxury Vacation Suites',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=800',
    desc: 'Dynamic open layouts matching generational comfort frameworks.'
  },
  {
    title: 'WorkVerse Pavilion',
    category: 'Premium Studio Lounges',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=800',
    desc: 'Bespoke corporate installations with flawless brushed natural textures.'
  }
];

export default function OurProjects() {
  const router = useRouter();

  return (
    <section 
      onClick={() => router.push('/projects')}
      className="w-full bg-[#121212] text-white py-24 md:py-32 select-none overflow-hidden border-b border-white/10 cursor-pointer group/section transition-colors duration-500 hover:bg-[#161616]"
    >
      <div className="w-[90%] max-w-[1440px] mx-auto flex flex-col gap-12 md:gap-16">
        
        {/* HEADER BLOCK */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col gap-3">
            <span className="text-[10px] md:text-[11px] font-sans tracking-[0.3em] uppercase text-[#D4AF37] font-bold">
              Portfolio
            </span>
            <div className="flex items-center gap-4">
              <h2 className="text-3xl md:text-5xl font-serif font-light tracking-wide uppercase">
                Our Projects
              </h2>
              <div className="p-2 border border-white/20 rounded-full transition-all duration-500 group-hover/section:bg-[#D4AF37] group-hover/section:text-[#121212] group-hover/section:translate-x-1 group-hover/section:-translate-y-1">
                <ArrowUpRight size={20} strokeWidth={1.2} />
              </div>
            </div>
          </div>
          <p className="text-sm tracking-wide font-sans font-light max-w-md text-white/60 leading-relaxed">
            A meticulous showcase of structural architecture, combining natural elements with refined modern minimalism. Click anywhere to explore.
          </p>
        </div>

        {/* PROJECTS CARD ENGINE */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mt-4">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="flex flex-col gap-5"
            >
              <div className="relative w-full aspect-[4/5] bg-white/5 overflow-hidden rounded-lg shadow-2xl border border-white/5">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover opacity-75 group-hover/section:scale-[1.03] group-hover/section:opacity-95 transition-all duration-700 ease-out"
                />
              </div>

              <div className="flex flex-col gap-1.5 px-1 transition-opacity duration-500 group-hover/section:opacity-90">
                <span className="text-[10px] font-sans tracking-widest uppercase text-[#D4AF37]/80 font-semibold">
                  {project.category}
                </span>
                <h3 className="text-xl font-serif font-light tracking-wide uppercase text-white/95">
                  {project.title}
                </h3>
                <p className="text-xs font-sans font-light text-white/50 leading-relaxed mt-0.5">
                  {project.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}