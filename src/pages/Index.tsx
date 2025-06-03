
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
        {/* Header Widgets Row - positioned in header area as shown in screenshots */}
        <div className="absolute top-20 left-0 right-0 z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-start">
              {/* Left side - Advertising Widget */}
              <div className="w-80 animate-slide-in-left">
                <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-lg rounded-xl p-6 border border-green-400/30 shadow-2xl hover:shadow-green-400/20 transition-all duration-500 hover:scale-105 hover:rotate-1 group animate-float">
                  <div className="text-center space-y-4">
                    <div className="flex items-center justify-center mb-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></div>
                      <div className="text-green-400 font-bold text-lg group-hover:text-green-300 transition-colors duration-300">
                        Advertise With Us
                      </div>
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse ml-2"></div>
                    </div>
                    <div className="text-gray-300 text-sm group-hover:text-white transition-colors duration-300">
                      Reach thousands of South African readers with your message
                    </div>
                    <div className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                      Get noticed by our engaged audience
                    </div>
                    <div className="mt-4 transform group-hover:scale-110 transition-transform duration-300">
                      <div className="w-8 h-1 bg-gradient-to-r from-green-400 to-emerald-500 mx-auto rounded-full animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right side - Weather Widget */}
              <div className="w-80 animate-slide-in-right">
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
