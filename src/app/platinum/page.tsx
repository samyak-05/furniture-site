import CategorySliderClassic from "@/components/CategorySliderClassic";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import MostViewedClassic from "@/components/MostViewedClassic";
import connectDB from "@/lib/db";
import Product from "@/models/productModel";
import ClassicFooter from "@/components/ClassicFooter";

export default async function ClassicPage() {
    await connectDB();
    
    const res = await Product.find({ isLuxury: true }).sort({ views: -1 }).limit(3);
    const plainRes = JSON.parse(JSON.stringify(res));

    return (
        <div className="min-h-screen bg-white flex flex-col justify-between">
            <div>
                <Navbar />
                <HeroSection />
                <CategorySliderClassic />
                <MostViewedClassic products={plainRes} />
            </div>

            <ClassicFooter />
        </div>
    );
}