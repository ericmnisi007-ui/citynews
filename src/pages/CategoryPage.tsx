
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { NewsService, NewsArticle } from "@/services/newsService";
import { supabase } from "@/integrations/supabase/client";
import FeaturedArticles from "@/components/FeaturedArticles";
import { useToast } from "@/hooks/use-toast";

const CategoryPage = () => {
  const { category } = useParams();
  const { toast } = useToast();
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategoryArticles = async () => {
      if (category) {
        try {
          console.log('Loading articles for category:', category);
          const categoryArticles = await NewsService.getArticlesByCategory(category);
          console.log('Loaded articles:', categoryArticles);
          setArticles(categoryArticles);
        } catch (error) {
          console.error('Error loading category articles:', error);
          toast({
            title: "Error",
            description: "Failed to load articles",
            variant: "destructive",
          });
        } finally {
          setLoading(false);
        }
      }
    };

    loadCategoryArticles();
  }, [category, toast]);

  // Set up real-time subscription for category articles
  useEffect(() => {
    if (!category) return;

    const channel = supabase
      .channel(`category_${category}_changes`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'articles',
          filter: `category=eq.${category}`
        },
        (payload) => {
          console.log('Category real-time update:', payload);
          
          // Reload category articles when changes occur
          const reloadArticles = async () => {
            try {
              const categoryArticles = await NewsService.getArticlesByCategory(category);
              setArticles(categoryArticles);
            } catch (error) {
              console.error('Error reloading category articles:', error);
            }
          };
          
          reloadArticles();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [category]);

  const capitalizedCategory = category?.charAt(0).toUpperCase() + category?.slice(1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            {capitalizedCategory} News
          </h1>
          <p className="text-xl text-gray-400">
            Latest {capitalizedCategory?.toLowerCase()} stories from South Africa ({articles.length} articles)
          </p>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="glass-effect border border-green-400/20 rounded-xl overflow-hidden animate-pulse">
                <div className="w-full h-48 bg-gray-700"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-700 rounded mb-2"></div>
                  <div className="h-6 bg-gray-700 rounded mb-4"></div>
                  <div className="h-16 bg-gray-700 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-gray-400 mb-4">No articles found in this category</p>
            <p className="text-gray-500">Check back later for new content</p>
          </div>
        ) : (
          <FeaturedArticles articles={articles} />
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
