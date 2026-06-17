import React from "react";
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
    <div
      className={`group cursor-pointer rounded-xl bg-card border border-border hover:border-primary/30 p-6 transition-all hover-lift animate-slide-up stagger-${Math.min(index + 1, 6)}`}
      onClick={() => onCategoryClick(category.name)}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl bg-gradient-to-r ${category.gradient} shadow-lg`}>
          <IconComponent className="h-6 w-6 text-white" />
        </div>
        <span className="text-xs font-semibold text-muted-foreground bg-secondary px-2.5 py-1 rounded-full">
          {count} articles
        </span>
      </div>

      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors">
        {category.name}
      </h3>

      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
        {category.description}
      </p>

      <div className={`flex items-center text-sm font-semibold ${count === 0 ? 'text-muted-foreground' : 'text-primary'} group-hover:gap-2 transition-all`}>
        {count === 0 ? 'No Articles' : 'View Articles'}
        <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
      </div>
    </div>
  );
};

export default CategoryCard;
