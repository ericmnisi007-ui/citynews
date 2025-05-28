
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, TrendingUp, Clock, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const HeroSection = () => {
  const { toast } = useToast();
  
  const featuredStory = {
    title: "Breaking: Major Economic Development Announced in Cape Town",
    category: "Headlines",
    summary: "The Western Cape government has announced a significant infrastructure investment that is expected to create thousands of jobs and boost economic growth across the region...",
    image: "https://images.unsplash.com/photo-1577495508048-b635879837f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    source: "IOL News",
    timeAgo: "2 hours ago",
    views: "2.4k"
  };

  const handleReadMore = () => {
    toast({
      title: "Article Opened",
      description: "Reading the full story...",
    });
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
      <div className="text-center mb-16 animate-slide-up">
        <div className="inline-flex items-center px-4 py-2 rounded-full glass-effect border border-yellow-400/30 mb-6 animate-float">
          <TrendingUp className="h-4 w-4 text-yellow-400 mr-2" />
          <span className="text-yellow-400 text-sm font-medium">Breaking News</span>
        </div>
        <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Latest South African 
          <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent text-glow"> News</span>
        </h2>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Stay updated with the most important stories from across South Africa
        </p>
      </div>

      <Card className="glass-effect border border-yellow-400/20 overflow-hidden hover-lift group animate-scale-in-center">
        <div className="md:flex">
          <div className="md:w-1/2 relative overflow-hidden">
            <img
              src={featuredStory.image}
              alt={featuredStory.title}
              className="w-full h-64 md:h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          </div>
          <div className="md:w-1/2 p-8">
            <div className="flex items-center gap-4 mb-6">
              <Badge className="bg-gradient-to-r from-red-500 to-red-600 text-white border-0 glow-yellow">
                <TrendingUp className="h-3 w-3 mr-1" />
                {featuredStory.category}
              </Badge>
              <div className="flex items-center text-gray-400 text-sm">
                <Clock className="h-3 w-3 mr-1" />
                {featuredStory.timeAgo}
              </div>
              <div className="flex items-center text-gray-400 text-sm">
                <Eye className="h-3 w-3 mr-1" />
                {featuredStory.views}
              </div>
            </div>
            
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 leading-tight group-hover:text-yellow-400 transition-colors duration-300">
              {featuredStory.title}
            </h3>
            
            <p className="text-gray-300 mb-8 leading-relaxed text-lg">
              {featuredStory.summary}
            </p>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-yellow-400 bg-yellow-400/10 px-3 py-1 rounded-full">
                {featuredStory.source}
              </span>
              <Button 
                onClick={handleReadMore}
                className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-semibold hover-lift glow-yellow"
              >
                Read Full Story
                <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
};

export default HeroSection;
