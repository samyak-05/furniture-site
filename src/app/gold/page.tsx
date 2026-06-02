import ClassicHero from "@/components/ClassicHero";
import Navbar from "@/components/Navbar";
import CategorySliderElite from "@/components/CategorySliderElite";
import EliteFooter from "@/components/EliteFooter";
import connectDB from "@/lib/db";
import Product from "@/models/productModel";
import MostViewedClassic from "@/components/MostViewedClassic";

export default async function ElitePage() {
    await connectDB();
    const res = await Product.find({ isLuxury: false }).sort({ views: -1 }).limit(3);
    const plainRes = JSON.parse(JSON.stringify(res)); 
    return (
        <div>
           <Navbar />
           <ClassicHero />
           <CategorySliderElite />
           <MostViewedClassic products={plainRes} titleColor="text-black" buttonColor="bg-[#D4AF37]" />
           <EliteFooter />
        </div >
    );
}