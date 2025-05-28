
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, TrendingUp, Clock, Eye, Play, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const HeroSection = () => {
  const { toast } = useToast();
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const heroStories = [
    {
      id: 1,
      title: "South Africa's Economic Recovery Shows Strong Signs of Growth",
      category: "Headlines",
      summary: "Latest economic indicators show a significant upturn in South Africa's GDP growth, with key sectors showing remarkable resilience and innovation in the face of global challenges...",
      image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      source: "Business Day",
      timeAgo: "2 hours ago",
      views: "15.2k",
      isBreaking: true
    },
    {
      id: 2,
      title: "Cape Town Emerges as Africa's Leading Tech Innovation Hub",
      category: "Technology",
      summary: "The Mother City attracts billions in tech investment as startups and multinational companies establish major operations, creating thousands of high-skill jobs...",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      source: "TechCentral",
      timeAgo: "4 hours ago",
      views: "8.7k",
      isBreaking: false
    },
    {
      id: 3,
      title: "Springboks Set New World Rugby Championship Records",
      category: "Sports",
      summary: "The national rugby team's latest victory secures their position as world champions, with record-breaking performances that have captured global attention...",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      source: "SuperSport",
      timeAgo: "6 hours ago",
      views: "12.4k",
      isBreaking: false
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroStories.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleReadMore = (story: any) => {
    toast({
      title: "Opening Article",
      description: `Reading: ${story.title}`,
    });
    // In a real app, this would navigate to the full article
    window.open(`https://example.com/article/${story.id}`, '_blank');
  };

  const currentStory = heroStories[currentSlide];

  return (
    <section className="relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%2322c55e\" fill-opacity=\"0.03\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"1\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        {/* Hero Header */}
        <div className="text-center mb-16 animate-slide-up">
          <div className="inline-flex items-center px-6 py-3 rounded-full glass-effect border border-green-400/30 mb-8 animate-float">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-3"></div>
              <TrendingUp className="h-5 w-5 text-green-400 mr-2" />
              <span className="text-green-400 font-semibold">Live News Feed</span>
            </div>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black text-white mb-8 leading-tight tracking-tight">
            <span className="bg-gradient-to-r from-white via-green-100 to-emerald-200 bg-clip-text text-transparent">
              ZA News
            </span>
            <br />
            <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-green-500 bg-clip-text text-transparent text-glow animate-pulse-slow">
              Hub
            </span>
          </h1>
          
          <p className="text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
            Your gateway to South Africa's most important stories, delivered in real-time
          </p>
        </div>

        {/* Dynamic Hero Story Carousel */}
        <div className="relative">
          <Card className="glass-effect border border-green-400/20 overflow-hidden hover-lift group animate-scale-in-center glow-green">
            <div className="relative h-[600px] md:h-[500px]">
              {/* Story Image */}
              <div className="absolute inset-0 md:w-3/5">
                <img
                  src={currentStory.image}
                  alt={currentStory.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-900/20 to-slate-900/90 md:to-slate-900"></div>
                
                {/* Breaking News Badge */}
                {currentStory.isBreaking && (
                  <div className="absolute top-6 left-6 animate-pulse">
                    <Badge className="bg-red-500 text-white font-bold px-4 py-2 text-sm border-0">
                      <div className="w-2 h-2 bg-white rounded-full animate-ping mr-2"></div>
                      BREAKING NEWS
                    </Badge>
                  </div>
                )}
              </div>

              {/* Story Content */}
              <div className="absolute inset-0 md:left-3/5 p-8 md:p-12 flex flex-col justify-center bg-gradient-to-t from-slate-900/95 via-slate-900/80 to-transparent md:from-transparent md:via-transparent md:to-transparent">
                <div className="space-y-6">
                  {/* Meta Info */}
                  <div className="flex items-center gap-6 text-sm">
                    <Badge className={`${
                      currentStory.category === 'Headlines' ? 'bg-red-500' :
                      currentStory.category === 'Technology' ? 'bg-purple-500' :
                      'bg-green-500'
                    } text-white border-0 px-3 py-1`}>
                      {currentStory.category}
                    </Badge>
                    <div className="flex items-center text-gray-400">
                      <Clock className="h-4 w-4 mr-1" />
                      {currentStory.timeAgo}
                    </div>
                    <div className="flex items-center text-gray-400">
                      <Eye className="h-4 w-4 mr-1" />
                      {currentStory.views}
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight group-hover:text-green-400 transition-colors duration-300">
                    {currentStory.title}
                  </h2>

                  {/* Summary */}
                  <p className="text-lg text-gray-300 leading-relaxed max-w-xl">
                    {currentStory.summary}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-4 pt-4">
                    <Button 
                      onClick={() => handleReadMore(currentStory)}
                      className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold px-8 py-3 hover-lift glow-green group/btn"
                    >
                      <Play className="h-5 w-5 mr-2 group-hover/btn:translate-x-1 transition-transform" />
                      Read Full Story
                    </Button>
                    
                    <div className="text-sm font-medium text-green-400 bg-green-400/10 px-4 py-2 rounded-full border border-green-400/30">
                      {currentStory.source}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Story Navigation Dots */}
          <div className="flex justify-center mt-8 gap-3">
            {heroStories.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-green-400 w-8 glow-green' 
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {[
            { label: "Breaking Stories", value: "24", icon: TrendingUp },
            { label: "Live Updates", value: "156", icon: Clock },
            { label: "Daily Readers", value: "45k+", icon: Eye }
          ].map((stat, index) => (
            <Card key={stat.label} className={`glass-effect border border-green-400/20 text-center p-6 hover-lift animate-slide-up stagger-${index + 1}`}>
              <CardContent className="p-0">
                <stat.icon className="h-8 w-8 text-green-400 mx-auto mb-3" />
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
