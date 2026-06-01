import CategorySliderClassic from "@/components/CategorySliderClassic";
import ClassicFooter from "@/components/ClassicFooter";
import ClassicHero from "@/components/ClassicHero";
import Navbar from "@/components/Navbar";
import MostViewedClassic from "@/components/MostViewedClassic";
import connectDB from "@/lib/db";
import Product from "@/models/productModel";

export default async function ClassicPage() {
    await connectDB();
    const res = await Product.find({ isLuxury: false }).sort({ views: -1 }).limit(3);
    const plainRes = JSON.parse(JSON.stringify(res)); 

    return (
        <div className="min-h-screen bg-white flex flex-col justify-between">
            <div>
                <Navbar />
                <ClassicHero />
                <CategorySliderClassic />
                <MostViewedClassic products={plainRes} />
            </div>

            <ClassicFooter />
        </div>
    );
}