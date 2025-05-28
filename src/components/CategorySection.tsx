
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, Users, Building, Zap, Trophy, Globe, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CategorySection = () => {
  const { toast } = useToast();
  
  const categories = [
    {
      name: "Headlines",
      icon: TrendingUp,
      count: 24,
      description: "Breaking news and top stories",
      gradient: "from-red-500 to-orange-500",
      bgGradient: "from-red-500/10 to-orange-500/10"
    },
    {
      name: "Politics",
      icon: Users,
      count: 18,
      description: "Government and political updates",
      gradient: "from-blue-500 to-purple-500",
      bgGradient: "from-blue-500/10 to-purple-500/10"
    },
    {
      name: "Business",
      icon: Building,
      count: 32,
      description: "Economic and market news",
      gradient: "from-green-500 to-teal-500",
      bgGradient: "from-green-500/10 to-teal-500/10"
    },
    {
      name: "Technology",
      icon: Zap,
      count: 15,
      description: "Tech innovations and startups",
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-500/10 to-pink-500/10"
    },
    {
      name: "Sports",
      icon: Trophy,
      count: 28,
      description: "Sports news and updates",
      gradient: "from-orange-500 to-red-500",
      bgGradient: "from-orange-500/10 to-red-500/10"
    },
    {
      name: "General",
      icon: Globe,
      count: 41,
      description: "General news and lifestyle",
      gradient: "from-teal-500 to-blue-500",
      bgGradient: "from-teal-500/10 to-blue-500/10"
    }
  ];

  const handleCategoryClick = (categoryName: string) => {
    toast({
      title: `${categoryName} Category`,
      description: `Browsing ${categoryName} articles...`,
    });
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16 animate-slide-up">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Browse by Category</h2>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">Explore news that interests you most</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category, index) => {
          const IconComponent = category.icon;
          return (
            <Card 
              key={category.name}
              className={`group cursor-pointer glass-effect border border-white/10 hover-lift animate-slide-up stagger-${index + 1} bg-gradient-to-br ${category.bgGradient}`}
            >
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className={`p-4 rounded-2xl bg-gradient-to-r ${category.gradient} glow-yellow`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <Badge variant="secondary" className="glass-effect border border-yellow-400/30 text-yellow-400">
                    {category.count} articles
                  </Badge>
                </div>
                
                <h3 className="text-2xl font-semibold text-white mb-3 group-hover:text-yellow-400 transition-colors duration-300">
                  {category.name}
                </h3>
                
                <p className="text-gray-400 mb-6 leading-relaxed">
                  {category.description}
                </p>
                
                <Button 
                  variant="ghost" 
                  onClick={() => handleCategoryClick(category.name)}
                  className="w-full glass-effect border border-yellow-400/30 text-yellow-400 hover:bg-yellow-400/10 hover:text-yellow-300 group-hover:scale-105 transition-all duration-300"
                >
                  View Articles
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
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
