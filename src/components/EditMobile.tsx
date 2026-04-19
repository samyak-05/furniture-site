'use client'

import { motion } from "motion/react"
import { Smartphone, ArrowRight } from 'lucide-react';
import { useState } from 'react'
import { useRouter } from "next/navigation";
import axios from "axios";

export default function EditMobile() {
  const [phone, setPhone] = useState("");
  const router = useRouter();

  // Indian standard: exactly 10 digits starting with 6-9
  const formValid = /^[6-9]\d{9}$/.test(phone);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ""); // Keep only digits
    if (value.length <= 10) {
      setPhone(value);
    }
  };

  const handleEditMobile = async () =>{
    try {
        const res = await axios.post('/api/user/editnumber', {newMobile: phone});
    } catch (err) {
        console.log('Error updating mobile number:', err);
    }
  }

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen px-6 py-10 bg-[#FAF9F6] overflow-hidden selection:bg-black selection:text-white">
      
      <div className="absolute top-[-10%] right-[-5%] w-125 h-125 bg-[#E8E1D9] rounded-full mix-blend-multiply filter blur-[120px] opacity-70 animate-pulse-slow"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-37.5 h-150 bg-[#E2E6E9] rounded-full mix-blend-multiply filter blur-[120px] opacity-60"></div>

      <div className="relative z-10 max-w-md w-full text-center mb-10 space-y-3">
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-4xl font-medium text-[#2A3439] font-['Playfair_Display',serif] tracking-[0.01em]"
        >
          Update Mobile
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
          className="text-[#6B7280] text-sm tracking-wide font-light"
        >
          Provide your 10-digit mobile number.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="relative z-10 w-full max-w-sm bg-white/40 backdrop-blur-xl p-8 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white/50"
      >
        <div className="flex flex-col gap-8">
          {/* Mobile Field */}
          <div className="group flex flex-col gap-2">
            <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 ml-1">
              Mobile Number
            </label>
            <div className="relative flex items-center border-b border-gray-200 group-focus-within:border-black transition-all duration-300">
              <Smartphone className="w-4 h-4 text-gray-400 group-focus-within:text-black transition-colors mr-2" />
              
              {/* Country Code Prefix */}
              <span className="text-sm font-semibold text-gray-500 mr-1">+91</span>
              
              <input
                type="tel"
                placeholder="00000 00000"
                autoFocus
                className="w-full py-3 bg-transparent outline-none placeholder:text-gray-300 text-base tracking-[0.2em] font-medium"
                onChange={handlePhoneChange}
                value={phone}
              />
            </div>
          </div>

          {/* Submit Button */}
          <motion.button onClick={handleEditMobile}
            whileHover={formValid ? { scale: 1.01 } : {}}
            whileTap={formValid ? { scale: 0.98 } : {}}
            className={`w-full py-4 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-500 shadow-xl flex items-center justify-center gap-2 ${
              formValid
                ? "bg-[#2A3439] text-white shadow-black/20 hover:bg-[#1F282C]"
                : "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
            }`}
            disabled={!formValid}
          >
            Update Number
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}