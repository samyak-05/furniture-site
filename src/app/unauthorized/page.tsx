'use client';
import React from 'react';
import { ShieldAlert, ArrowLeft, Home } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#FAF9F6] flex flex-col justify-center items-center px-6 selection:bg-black selection:text-white">
      {/* Background Decorative Element */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative max-w-md w-full text-center flex flex-col items-center">
        {/* Animated Icon Container */}
        <div className="relative mb-8 flex items-center justify-center w-24 h-24 rounded-full bg-red-50 text-red-500 animate-pulse border border-red-100 shadow-sm">
          <ShieldAlert size={44} strokeWidth={1.5} />
          {/* Subtle Outer Ring */}
          <div className="absolute -inset-2 rounded-full border border-red-200/40 animate-ping [animation-duration:3s]" />
        </div>

        {/* Text Content */}
        <span className="text-[10px] font-black tracking-widest text-red-500 uppercase bg-red-50 px-3 py-1 rounded-full border border-red-100 mb-4">
          Error 403: Forbidden
        </span>
        
        <h1 className="text-3xl font-black tracking-tight text-black sm:text-4xl mb-3">
          Restricted Access
        </h1>
        
        <p className="text-sm text-gray-500 font-medium leading-relaxed mb-10 max-w-sm">
          Hold up! This portal is strictly reserved for administrators. Your current credentials don't give you keys to this room.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
          <button
            onClick={() => router.back()}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider border border-black/10 bg-white text-black hover:bg-black hover:text-white transition-all duration-300 active:scale-95 shadow-sm"
          >
            <ArrowLeft size={14} strokeWidth={2.5} />
            Go Back
          </button>

          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest bg-black text-white hover:bg-gray-800 transition-all duration-300 active:scale-95 shadow-lg"
          >
            <Home size={14} />
            Back to Classic
          </Link>
        </div>
      </div>

      {/* Footer Branding */}
      <div className="absolute bottom-8 text-[11px] font-black uppercase tracking-[0.2em] text-black/20">
        classic. / elite.
      </div>
    </div>
  );
}