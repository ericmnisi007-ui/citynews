
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Category } from "@/data/categoryData";

interface CategoryCardProps {
  category: Category;
  count: number;
  index: number;
  onCategoryClick: (categoryName: string) => void;
}

const CategoryCard = ({ category, count, index, onCategoryClick }: CategoryCardProps) => {
  const IconComponent = category.icon;
  
  return (
    <Card 
      className={`group cursor-pointer bg-slate-900/70 backdrop-blur-md border border-green-400/20 hover-lift animate-slide-up stagger-${index + 1}`}
    >
      <CardContent className="p-8 bg-slate-900/50">
        <div className="flex items-center justify-between mb-6">
          <div className={`p-4 rounded-2xl bg-gradient-to-r ${category.gradient} glow-green`}>
            <IconComponent className="h-8 w-8 text-white" />
          </div>
          <Badge variant="secondary" className="bg-slate-800/80 border border-green-400/30 text-green-400">
            {count} articles
          </Badge>
        </div>
        
        <h3 className="text-2xl font-semibold text-white mb-3 group-hover:text-green-400 transition-colors duration-300">
          {category.name}
        </h3>
        
        <p className="text-gray-400 mb-6 leading-relaxed">
          {category.description}
        </p>
        
        <Button 
          variant="ghost" 
          onClick={() => onCategoryClick(category.name)}
          className="w-full bg-slate-800/50 border border-green-400/30 text-green-400 hover:bg-green-400/10 hover:text-green-300 group-hover:scale-105 transition-all duration-300"
          disabled={count === 0}
        >
          {count === 0 ? 'No Articles' : 'View Articles'}
          <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;
