
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
        
        {/* Widget Row - positioned below hero as shown in screenshot */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="flex justify-between items-start gap-6">
            {/* Left side - Advertising Widget */}
            <div className="w-80">
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-green-400/20 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in">
                <div className="text-center space-y-4">
                  <div className="text-green-400 font-semibold text-lg">Advertise With Us</div>
                  <div className="text-gray-300 text-sm">
                    Reach thousands of South African readers with your message
                  </div>
                  <div className="text-xs text-gray-400 mb-4">
                    Get noticed by our engaged audience
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right side - Weather Widget */}
            <div className="w-72">
              <WeatherWidget />
            </div>
          </div>
        </div>
        
        <FeaturedArticles showOnlyHeadlines={true} />
        <CategorySection />
      </div>
      
      {/* Floating Advertising CTA */}
      <AdvertisingCTA />
    </div>
  );
};

export default Index;
