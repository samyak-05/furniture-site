'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { addToCart } from '@/redux/cartSlice';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { 
  ShoppingBag, 
  ChevronRight, 
  ChevronLeft,
  Star
} from 'lucide-react';
import EliteFooter from '@/components/EliteFooter';
import ClassicFooter from '@/components/ClassicFooter';
import Navbar from '@/components/Navbar';

interface IUserReviewer {
  _id: string;
  name: string;
  image?: string;
}

interface IReview {
  _id: string;
  user: IUserReviewer;
  rating: number;
  comment: string;
  createdAt: string;
}

// 🚀 UPDATED: Added structural support for mapping your backend aggregation route response
interface IProduct {
  _id: string;
  name: string;
  price: string;
  description: string;
  category: string;
  isLuxury: boolean;
  image: Array<string>;
  views: number;
  genre: string;
  reviews: Array<IReview>; // Ensured strict type definition matching backend payload
}

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { status } = useSession();

  // State Management
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  // Review Form States
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState<string>('');
  const [submittingReview, setSubmittingReview] = useState<boolean>(false);
  const [reviewError, setReviewError] = useState<string>('');
  const [reviewSuccess, setReviewSuccess] = useState<string>('');

  // Redux Dynamic Store Configuration
  const currentMode = useSelector((state: RootState) => state.mode.currentMode);
  const isPlatinum = currentMode === 'platinum';

  // Strict Premium Design Tokens
  const theme = {
    text: isPlatinum ? 'text-[#4A3B32]' : 'text-[#4C2B12]',
    textLight: isPlatinum ? 'text-[#4A3B32]/70' : 'text-[#4C2B12]/70',
    accentBg: isPlatinum ? 'bg-[#D4AF37]' : 'bg-[#4C2B12]',
    accentText: isPlatinum ? 'text-white' : 'text-[#F5DBCE]',
    border: isPlatinum ? 'border-[#4A3B32]/10' : 'border-[#4C2B12]/10',
    badgeBg: isPlatinum ? 'bg-[#D4AF37]/10 text-[#D4AF37]' : 'bg-[#4C2B12]/10 text-[#4C2B12]',
    btnHover: isPlatinum ? 'hover:bg-[#C59B27]' : 'hover:bg-[#3A200D]'
  };

  const fetchProductData = async () => {
    try {
      const response = await axios.get(`/api/product/getProduct/${id}`);
      if (response.data?.success) {
        setProduct(response.data.data);
      }
    } catch (error) {
      console.error("Could not trace dynamic product information payload:", error);
    }
  };

  useEffect(() => {
    if (!id) return;

    const initialLoad = async () => {
      setLoading(true);
      await fetchProductData();
      setLoading(false);
    };

    initialLoad();
  }, [id]);

  // Image Navigation Handlers
  const handleNextImage = () => {
    if (!product) return;
    setActiveImageIdx((prev) => (prev + 1) % product.image.length);
  };

  const handlePrevImage = () => {
    if (!product) return;
    setActiveImageIdx((prev) => (prev - 1 + product.image.length) % product.image.length);
  };

  const handleAddToCartProtected = () => {
    if (status === 'authenticated') {
      dispatch(addToCart(product as any));
    } else {
      router.push('/signin');
    }
  };

  const handleReviewFormFocus = () => {
    if (status !== 'authenticated') {
      router.push('/signin');
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status !== 'authenticated') {
      router.push('/signin');
      return;
    }

    setReviewError('');
    setReviewSuccess('');

    if (!comment.trim()) {
      setReviewError('Please type your experiential thoughts down before saving.');
      return;
    }

    try {
      setSubmittingReview(true);
      const res = await axios.post('/api/reviews/postReviews', {
        productId: product?._id,
        rating,
        comment: comment.trim()
      });

      if (res.data?.success) {
        setReviewSuccess('Thank you for your feedback.');
        setComment('');
        setRating(5);
        // Refresh product data to bring down the newly added review instantly
        await fetchProductData();
      }
    } catch (err: any) {
      setReviewError(err.response?.data?.message || 'An operational framework error occurred.');
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-6 h-6 rounded-full border-2 border-neutral-200 border-t-neutral-800 animate-spin" />
          <p className="text-xs tracking-[0.3em] uppercase text-neutral-400 font-light">Loading Masterpiece</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="w-full min-h-screen bg-white flex flex-col items-center justify-center p-6">
        <h2 className="text-base font-serif font-light text-neutral-800 uppercase tracking-wider mb-4">Masterpiece Missing</h2>
        <button 
          onClick={() => router.push(isPlatinum ? '/platinum' : '/gold')}
          className="px-6 py-2.5 text-xs uppercase font-semibold tracking-widest bg-black text-white rounded-full"
        >
          Return to Showroom
        </button>
      </div>
    );
  }

  return (
    <div className="w-full bg-white flex flex-col min-h-screen">
      <Navbar />
      
      {/* Product Content Wrapper */}
      <main className="flex-1 w-full max-w-6xl mx-auto pt-32 pb-24 px-4 sm:px-6 lg:px-12 select-none flex flex-col gap-10">
        
        {/* 1. Breadcrumbs */}
        <div className="w-full flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">
          <span className="cursor-pointer transition-colors hover:text-black" onClick={() => router.push(isPlatinum ? '/platinum' : '/gold')}>Showroom</span>
          <ChevronRight size={12} />
          <span>{product.genre}</span>
          <ChevronRight size={12} />
          <span className="truncate max-w-[200px] text-neutral-800">{product.name}</span>
        </div>

        {/* Two Column Layout Grid (Splits Image Left / Title & Buy Now Right) */}
        <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-16 items-start">
          
          {/* Left Column: Media Presentation Canvas */}
          <div className="md:col-span-6 flex flex-col items-center">
            <div className="w-full aspect-square relative rounded-xl overflow-hidden bg-[#FAFAFA] border border-neutral-100 shadow-sm">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImageIdx}
                  initial={{ opacity: 0, scale: 1.01 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full relative"
                >
                  <Image
                    src={product.image[activeImageIdx]}
                    alt={product.name}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 460px"
                    className="object-contain p-6 object-center"
                  />
                </motion.div>
              </AnimatePresence>
              
              {/* Conditional navigation control arrow overlays (Only visible if multi-image array) */}
              {product.image.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePrevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 border border-neutral-100 shadow-xs text-neutral-700 hover:bg-white transition-colors cursor-pointer"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 border border-neutral-100 shadow-xs text-neutral-700 hover:bg-white transition-colors cursor-pointer"
                  >
                    <ChevronRight size={18} />
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Right Column: Heading, Price, and Buy Now Controls */}
          <div className="md:col-span-6 flex flex-col gap-6">
            
            {/* Title Block */}
            <div className="w-full flex flex-col gap-3">
              <div>
                <span className={`text-xs font-bold uppercase tracking-[0.2em] ${theme.badgeBg} px-3 py-1 rounded`}>
                  {product.category}
                </span>
              </div>

              <h1 className={`text-2xl sm:text-3xl font-serif font-light ${theme.text} tracking-tight leading-tight uppercase`}>
                {product.name}
              </h1>

              <div className={`text-xl sm:text-2xl font-semibold ${theme.text} tracking-tight`}>
                ₹{Number(product.price).toLocaleString('en-IN')}
              </div>
            </div>

            {/* Buy Now Controls Section */}
            <div className={`w-full pt-6 border-t ${theme.border} flex items-center`}>
              <motion.button
                whileTap={{ scale: 0.99 }}
                onClick={handleAddToCartProtected}
                className={`w-full py-4 text-xs font-bold tracking-widest uppercase ${theme.accentBg} ${theme.accentText} ${theme.btnHover} rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-xs`}
              >
                <ShoppingBag size={15} strokeWidth={2} />
                Buy Now
              </motion.button>
            </div>

          </div>
        </div>

        {/* 5. Product Description Segment explicitly at the very end */}
        <div className={`w-full pt-8 border-t ${theme.border} flex flex-col gap-3`}>
          <h3 className={`text-xs font-bold uppercase tracking-widest ${theme.text}`}>
            Product Details
          </h3>
          <p className="text-sm text-neutral-500 font-light leading-relaxed tracking-wide text-justify">
            {product.description}
          </p>
        </div>

        {/* 6. Review System Section Components */}
        <div className={`w-full pt-10 border-t ${theme.border} grid grid-cols-1 md:grid-cols-12 gap-10 items-start`}>
          
          {/* Sub-Column Left: User Review Creation Form */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <h3 className={`text-xs font-bold uppercase tracking-widest ${theme.text}`}>
              Share Your Experience
            </h3>

            <form onSubmit={handleSubmitReview} className="flex flex-col gap-4 w-full">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">Your Rating</label>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onFocus={handleReviewFormFocus}
                      onClick={() => {
                        handleReviewFormFocus();
                        setRating(star);
                      }}
                      className="text-neutral-300 transition-colors hover:scale-105"
                    >
                      <Star 
                        size={18} 
                        className={star <= rating ? 'fill-[#D4AF37] text-[#D4AF37]' : 'text-neutral-200'} 
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">Review Comments</label>
                <textarea
                  value={comment}
                  onFocus={handleReviewFormFocus}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder={status === 'authenticated' ? "Write your validation observations..." : "Sign in to document your observation details."}
                  rows={4}
                  className="w-full border border-neutral-200 rounded-xl p-3 text-sm focus:outline-hidden focus:ring-1 focus:ring-neutral-400 transition-all resize-none font-light placeholder:text-neutral-300 text-neutral-700 bg-neutral-50/50"
                />
              </div>

              {reviewError && <p className="text-xs font-medium text-red-500">{reviewError}</p>}
              {reviewSuccess && <p className="text-xs font-medium text-emerald-600">{reviewSuccess}</p>}

              <button
                type="submit"
                disabled={submittingReview}
                className={`py-3 text-[10px] font-bold tracking-widest uppercase rounded-xl transition-all duration-300 text-center cursor-pointer border ${
                  isPlatinum 
                    ? 'border-[#4A3B32] text-[#4A3B32] hover:bg-[#4A3B32] hover:text-white' 
                    : 'border-[#4C2B12] text-[#4C2B12] hover:bg-[#4C2B12] hover:text-[#F5DBCE]'
                } disabled:opacity-50`}
              >
                {submittingReview ? 'Submitting...' : 'Submit Review'}
              </button>
            </form>
          </div>

          {/* Sub-Column Right: Dynamic Reviews List Loop */}
          <div className="md:col-span-7 flex flex-col gap-4">
            <h3 className={`text-xs font-bold uppercase tracking-widest ${theme.text}`}>
              Customer Feedback ({product.reviews?.length || 0})
            </h3>

            {!product.reviews || product.reviews.length === 0 ? (
              <div className="w-full border border-dashed border-neutral-200 rounded-xl p-8 flex flex-col items-center justify-center">
                <p className="text-xs text-neutral-400 font-light tracking-wide">No evaluations logged for this item yet.</p>
              </div>
            ) : (
              <div className="w-full flex flex-col gap-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {product.reviews.map((rev) => (
                  <div 
                    key={rev._id} 
                    className="w-full p-4 border border-neutral-100 rounded-xl bg-white flex flex-col gap-2.5 shadow-2xs"
                  >
                    <div className="w-full flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-neutral-100 relative overflow-hidden border border-neutral-200/50 flex-shrink-0">
                          <Image
                            src={rev.user?.image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop'}
                            alt={rev.user?.name || 'Reviewer avatar'}
                            fill
                            sizes="28px"
                            className="object-cover"
                          />
                        </div>
                        <div className="flex flex-col">
                          <span className={`text-xs font-medium ${theme.text}`}>{rev.user?.name || 'Anonymous Collector'}</span>
                          <span className="text-[9px] text-neutral-400 font-mono">
                            {new Date(rev.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star 
                            key={i} 
                            size={11} 
                            className={i < rev.rating ? 'fill-[#D4AF37] text-[#D4AF37]' : 'text-neutral-100'} 
                          />
                        ))}
                      </div>
                    </div>

                    <p className="text-xs text-neutral-500 font-light leading-relaxed text-justify">
                      {rev.comment}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </main>

      {/* Dynamic Showroom Footer Layout */}
      <div className="w-full bg-white border-t border-neutral-100">
        {currentMode === 'gold' ? <EliteFooter /> : <ClassicFooter />}
      </div>

    </div>
  );
}
