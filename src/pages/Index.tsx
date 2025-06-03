
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
        {/* Header Widgets Row - positioned exactly as in screenshot */}
        <div className="absolute top-16 left-0 right-0 z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-start gap-8">
              {/* Left side - Advertising Widget */}
              <div className="w-72 animate-slide-in-left">
                <div className="bg-gradient-to-br from-green-500/90 to-emerald-600/90 backdrop-blur-lg rounded-2xl p-4 border border-green-400/40 shadow-2xl hover:shadow-green-400/30 transition-all duration-500 hover:scale-105 hover:rotate-1 group animate-float">
                  <div className="flex items-center justify-center gap-3">
                    <div className="bg-white/20 p-2 rounded-xl">
                      <div className="text-white text-lg">📢</div>
                    </div>
                    <div className="text-white">
                      <div className="font-bold text-lg group-hover:text-green-100 transition-colors duration-300">
                        Advertise With Us
                      </div>
                      <div className="text-xs opacity-90">✨ Boost Your Business</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right side - Weather Widget */}
              <div className="w-96 animate-slide-in-right">
                <WeatherWidget />
              </div>
            </div>
          </div>
        </div>
        
        <HeroSection />
        <FeaturedArticles showOnlyHeadlines={true} />
        <CategorySection />
      </div>
      
      {/* Floating Advertising CTA */}
      <AdvertisingCTA />
    </div>
  );
};

export default Index;
