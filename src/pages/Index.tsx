import React from "react";
import HeroSection from "@/components/HeroSection";
import CategorySection from "@/components/CategorySection";
import FeaturedArticles from "@/components/FeaturedArticles";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="relative z-10">
        <HeroSection />
        <FeaturedArticles showOnlyHeadlines={true} />
        <CategorySection />
      </div>
    </div>
  );
};

export default Index;
