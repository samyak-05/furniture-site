import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import React from "react";
import CategorySliderElite from "@/components/CategorySliderElite";
import EliteFooter from "@/components/EliteFooter";

export default function ElitePage() {
    return (
        <div>
           <Navbar />
           <HeroSection />
           <CategorySliderElite />
           <EliteFooter />
        </div>
    );
}