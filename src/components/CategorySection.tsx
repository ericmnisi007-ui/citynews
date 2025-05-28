
import React from "react";
import { useNavigate } from "react-router-dom";
import { NewsService } from "@/services/newsService";
import { categories } from "@/data/categoryData";
import CategoryCard from "./CategoryCard";

const CategorySection = () => {
  const navigate = useNavigate();
  const [categoryCounts, setCategoryCounts] = React.useState<{[key: string]: number}>({});

  React.useEffect(() => {
    const loadCategoryCounts = async () => {
      try {
        const allArticles = await NewsService.getAllArticles();
        const counts: {[key: string]: number} = {};
        
        categories.forEach(category => {
          counts[category.name] = allArticles.filter(article => 
            article.category === category.name
          ).length;
        });
        
        setCategoryCounts(counts);
      } catch (error) {
        console.error('Error loading category counts:', error);
      }
    };

    loadCategoryCounts();
  }, []);

  const handleCategoryClick = (categoryName: string) => {
    navigate(`/category/${categoryName.toLowerCase()}`);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16 animate-slide-up">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Browse by Category</h2>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">Explore real news from trusted South African sources</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category, index) => {
          const count = categoryCounts[category.name] || 0;
          
          return (
            <CategoryCard
              key={category.name}
              category={category}
              count={count}
              index={index}
              onCategoryClick={handleCategoryClick}
            />
          );
        })}
      </div>
    </section>
  );
};

export default CategorySection;
