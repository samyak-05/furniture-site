'use client'
import { motion } from "motion/react"
import { Mail, Key, EyeClosed, Eye, ArrowRight, AlertCircle } from 'lucide-react';
import { useState } from 'react'
import Image from 'next/image'
import google from '@/assets/google.png'
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const session = useSession();
  console.log(session);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("Invalid email or password");
        setLoading(false);
        return;
      }

      if (res?.ok) {
        console.log("Sign-in successful");
        router.push("/");
        router.refresh(); 
      }
    } catch (err: any) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };
  const formValid = email !== "" && password !== "";

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen px-6 py-10 bg-[#FAF9F6] overflow-hidden selection:bg-black selection:text-white">

      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] right-[-5%] w-125 h-125 bg-[#E8E1D9] rounded-full mix-blend-multiply filter blur-[120px] opacity-70 animate-pulse-slow"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-37.5 h-150 bg-[#E2E6E9] rounded-full mix-blend-multiply filter blur-[120px] opacity-60"></div>

      {/* Header Section */}
      <div className="relative z-10 max-w-md w-full text-center mb-10 space-y-3">
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-4xl font-medium text-[#2A3439] font-['Playfair_Display',serif] tracking-[0.01em]"
        >
          Welcome Back!
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
          className="text-[#6B7280] text-sm tracking-wide font-light"
        >
          Join to save your favorite pieces and track orders.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="relative z-10 w-full max-w-sm bg-white/40 backdrop-blur-xl p-8 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white/50"
      >
        {/* Error Feedback */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 bg-red-50 text-red-600 p-3 rounded-lg mb-6 border border-red-100"
          >
            <AlertCircle className="w-4 h-4 shrink-0" />
            <p className="text-xs font-medium uppercase tracking-wider">{error}</p>
          </motion.div>
        )}

        <form className="flex flex-col gap-6" onSubmit={handleSignIn}>
          {/* Email Field */}
          <div className="group flex flex-col gap-1.5">
            <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-black transition-colors" />
              <input
                type="email"
                placeholder="hello@example.com"
                className="w-full pl-7 pr-4 py-2 bg-transparent border-b border-gray-200 focus:border-black outline-none transition-all duration-300 placeholder:text-gray-300 text-sm"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="group flex flex-col gap-1.5">
            <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 ml-1">Password</label>
            <div className="relative">
              <Key className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-black transition-colors" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full pl-7 pr-10 py-2 bg-transparent border-b border-gray-200 focus:border-black outline-none transition-all duration-300 placeholder:text-gray-300 text-sm"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
              >
                {showPassword ? <Eye className="w-4 h-4" /> : <EyeClosed className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <motion.button
            whileHover={formValid && !loading ? { scale: 1.01 } : {}}
            whileTap={formValid && !loading ? { scale: 0.98 } : {}}
            className={`w-full mt-4 py-4 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-500 shadow-xl flex items-center justify-center gap-2 ${formValid && !loading
              ? "bg-[#2A3439] text-white shadow-black/20 hover:bg-[#1F282C]"
              : "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
              }`}
            disabled={!formValid || loading}
          >
            {loading ? "Signing in..." : "Sign In"}
            {!loading && <ArrowRight className="w-4 h-4" />}
          </motion.button>

          <div className="relative flex items-center py-2">
            <div className="grow border-t border-gray-100"></div>
            <span className="shrink mx-4 text-[10px] font-bold text-gray-300 uppercase tracking-widest">or</span>
            <div className="grow border-t border-gray-100"></div>
          </div>

          <button type="button" className="w-full flex items-center justify-center gap-3 py-3.5 
          rounded-full border border-gray-200 text-gray-600 text-sm font-semibold 
          hover:bg-gray-50 transition-all duration-300 cursor-pointer" onClick={() => signIn("google", { callbackUrl: "/" })}>
            <Image src={google} width={18} height={18} alt="google" className="opacity-80" />
            Continue with Google
          </button>
        </form>
      </motion.div>

      {/* Footer link */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-8 text-sm text-gray-400 flex items-center gap-1"
      >
        Don't have an account?
        <button className="text-[#2A3439] font-semibold hover:underline underline-offset-4 
        decoration-1 cursor-pointer" onClick={() => router.push("/signup")}>
          Sign Up
        </button>
      </motion.div>
    </div>
  )
}