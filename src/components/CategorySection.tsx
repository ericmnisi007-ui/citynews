
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, Users, Building, Zap, Trophy, Globe } from "lucide-react";

const CategorySection = () => {
  const categories = [
    {
      name: "Headlines",
      icon: TrendingUp,
      count: 24,
      description: "Breaking news and top stories",
      color: "from-red-500 to-orange-500",
      bgColor: "bg-red-50"
    },
    {
      name: "Politics",
      icon: Users,
      count: 18,
      description: "Government and political updates",
      color: "from-blue-500 to-purple-500",
      bgColor: "bg-blue-50"
    },
    {
      name: "Business",
      icon: Building,
      count: 32,
      description: "Economic and market news",
      color: "from-green-500 to-teal-500",
      bgColor: "bg-green-50"
    },
    {
      name: "Technology",
      icon: Zap,
      count: 15,
      description: "Tech innovations and startups",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50"
    },
    {
      name: "Sports",
      icon: Trophy,
      count: 28,
      description: "Sports news and updates",
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50"
    },
    {
      name: "General",
      icon: Globe,
      count: 41,
      description: "General news and lifestyle",
      color: "from-teal-500 to-blue-500",
      bgColor: "bg-teal-50"
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Browse by Category</h2>
        <p className="text-lg text-gray-600">Explore news by your interests</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category, index) => {
          const IconComponent = category.icon;
          return (
            <Card 
              key={category.name}
              className={`group cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${category.bgColor} border-0 animate-fade-in`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${category.color}`}>
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <Badge variant="secondary" className="bg-white/80">
                    {category.count} articles
                  </Badge>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                  {category.name}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4">
                  {category.description}
                </p>
                
                <Button 
                  variant="ghost" 
                  className="w-full group-hover:bg-white/50 transition-colors"
                >
                  View Articles
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
};

export default CategorySection;
