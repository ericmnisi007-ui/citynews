
import React from "react";
import HeroSection from "@/components/HeroSection";
import CategorySection from "@/components/CategorySection";
import FeaturedArticles from "@/components/FeaturedArticles";
import WeatherWidget from "@/components/WeatherWidget";
import AdvertisingCTA from "@/components/AdvertisingCTA";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">
      <div className="relative z-10">
        <HeroSection />
        
        {/* Weather Widget - positioned in header area */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="flex justify-end">
            <div className="w-72">
              <WeatherWidget />
            </div>
          </div>
        </div>
        
        <FeaturedArticles showOnlyHeadlines={true} />
        <CategorySection />
      </div>
      
      {/* Advertising CTA */}
      <AdvertisingCTA />
    </div>
  );
};

export default Index;
