
import React, { useState, useEffect } from "react";
import { TrendingUp } from "lucide-react";
import HeroStoryCard from "./HeroStoryCard";
import StoryNavigationDots from "./StoryNavigationDots";
import QuickStats from "./QuickStats";
import { heroStories } from "@/data/heroData";

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroStories.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const currentStory = heroStories[currentSlide];

  const backgroundPattern = "data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2322c55e' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E";

  return (
    <section className="relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">
        <div 
          className="absolute inset-0 opacity-50"
          style={{ backgroundImage: `url("${backgroundPattern}")` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        {/* Live News Indicator */}
        <div className="text-center mb-16 animate-slide-up">
          <div className="inline-flex items-center px-6 py-3 rounded-full glass-effect border border-green-400/30 mb-8 animate-float">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-3"></div>
              <TrendingUp className="h-5 w-5 text-green-400 mr-2" />
              <span className="text-green-400 font-semibold">Live News Feed</span>
            </div>
          </div>
        </div>

        {/* Dynamic Hero Story Carousel */}
        <div className="relative">
          <HeroStoryCard story={currentStory} />
          <StoryNavigationDots 
            totalStories={heroStories.length}
            currentSlide={currentSlide}
            onSlideChange={setCurrentSlide}
          />
        </div>

        {/* Quick Stats */}
        <QuickStats />
      </div>
    </section>
  );
};

export default HeroSection;
