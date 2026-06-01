'use client';
import ProductCard from "@/components/ProductCard";
import { motion } from 'framer-motion';

interface IProduct {
  _id: string;
  name: string;
  price: string;
  description: string;
  category: string;
  isLuxury: boolean;
  image: string[];
  views: number;
  genre: string;
}

interface MostViewedSectionProps {
  products: IProduct[];
  titleColor?: string;     // 👈 Prop for the heading color
  buttonColor?: string;    // 👈 Prop for the accent underline / indicator color
}

export default function MostViewedSection({ 
  products, 
  titleColor = "text-[#0F2C59]", // Defaults to your current Royal Blue
  buttonColor = "bg-[#D4AF37]"   // Defaults to your current Gold Accent
}: MostViewedSectionProps) {
  const luxuryEase = [0.16, 1, 0.3, 1];

  return (
    <motion.section 
      className="w-[90%] max-w-[1440px] mx-auto mt-20 md:mt-28 relative flex flex-col gap-8 md:gap-10 select-none bg-white"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
      }}
    >
      {/* HEADER AREA - SYMMETRIC TRACK ALIGNMENT */}
      <div className="flex items-end justify-between relative overflow-hidden bg-white w-full pb-1 pl-1">
        <div className="relative pb-3.5 bg-white">
          <motion.h2 
            // 👈 Uses the dynamic titleColor prop here
            className={`text-xl sm:text-2xl md:text-3xl font-normal font-serif tracking-[0.15em] uppercase ${titleColor}`}
            variants={{
              hidden: { opacity: 0, x: -15 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: luxuryEase } }
            }}
          >
            Most Viewed
          </motion.h2>
          
          {/* Accent indicator bar - 👈 Uses the dynamic buttonColor prop here */}
          <div className={`absolute left-0 bottom-0 h-[2px] w-14 ${buttonColor}`} />
        </div>
      </div>

      {/* PRODUCT GRID - FLUSH WITH SLIDER CONTAINERS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full pb-8">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </motion.section>
  );
}