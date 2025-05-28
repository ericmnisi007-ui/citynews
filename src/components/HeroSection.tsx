
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, TrendingUp } from "lucide-react";

const HeroSection = () => {
  const featuredStory = {
    title: "Breaking: Major Economic Development Announced in Cape Town",
    category: "Headlines",
    summary: "The Western Cape government has announced a significant infrastructure investment that is expected to create thousands of jobs...",
    image: "https://images.unsplash.com/photo-1577495508048-b635879837f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    source: "IOL News",
    timeAgo: "2 hours ago"
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12 animate-fade-in">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Latest South African News
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Stay updated with the most important stories from across South Africa
        </p>
      </div>

      <Card className="overflow-hidden hover:shadow-2xl transition-all duration-500 animate-scale-in">
        <div className="md:flex">
          <div className="md:w-1/2">
            <img
              src={featuredStory.image}
              alt={featuredStory.title}
              className="w-full h-64 md:h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="md:w-1/2 p-8">
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="destructive" className="bg-red-600">
                <TrendingUp className="h-3 w-3 mr-1" />
                {featuredStory.category}
              </Badge>
              <span className="text-sm text-gray-500">{featuredStory.timeAgo}</span>
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
              {featuredStory.title}
            </h3>
            
            <p className="text-gray-600 mb-6 leading-relaxed">
              {featuredStory.summary}
            </p>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-green-600">
                {featuredStory.source}
              </span>
              <Button className="bg-gradient-to-r from-green-600 to-orange-500 hover:from-green-700 hover:to-orange-600">
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
