import CategorySliderClassic from "@/components/CategorySliderClassic";
import ClassicFooter from "@/components/ClassicFooter";
import ClassicHero from "@/components/ClassicHero";
import Navbar from "@/components/Navbar";
import react from 'react';
export default function ClassicPage() {
    return (
        <div>
            <Navbar />
            <ClassicHero />
            <CategorySliderClassic />
            <ClassicFooter />

        </div>
    );
}