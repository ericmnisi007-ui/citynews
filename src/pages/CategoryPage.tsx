import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { NewsService, NewsArticle } from "@/services/newsService";
import { supabase } from "@/integrations/supabase/client";
import FeaturedArticles from "@/components/FeaturedArticles";
import LoadingGrid from "@/components/LoadingGrid";
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
          const categoryArticles = await NewsService.getArticlesByCategory(category);
          setArticles(categoryArticles);
        } catch (error) {
          console.error('Error loading category articles:', error);
          toast({ title: "Error", description: "Failed to load articles", variant: "destructive" });
        } finally {
          setLoading(false);
        }
      }
    };
    loadCategoryArticles();
  }, [category]);

  useEffect(() => {
    if (!category || !NewsService.getSupabaseAvailable()) return;
    try {
      const channel = supabase
        .channel(`category_${category}_changes`)
        .on('postgres_changes', { event: '*', schema: 'public', table: 'articles', filter: `category=eq.${category}` }, () => {
          const reloadArticles = async () => {
            try {
              const categoryArticles = await NewsService.getArticlesByCategory(category);
              setArticles(categoryArticles);
            } catch (error) {
              console.error('Error reloading category articles:', error);
            }
          };
          reloadArticles();
        })
        .subscribe();
      return () => { supabase.removeChannel(channel); };
    } catch (e) {
      console.warn('Could not set up real-time subscription:', e);
    }
  }, [category]);

  const capitalizedCategory = category?.charAt(0).toUpperCase() + category?.slice(1);

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            {capitalizedCategory} News
          </h1>
          <p className="text-muted-foreground">
            Latest {capitalizedCategory?.toLowerCase()} stories from South Africa
            <span className="text-primary font-semibold"> ({articles.length} articles)</span>
          </p>
        </div>

        {loading ? (
          <LoadingGrid />
        ) : articles.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl text-muted-foreground">!</span>
            </div>
            <p className="text-lg text-muted-foreground mb-2">No articles found in this category</p>
            <p className="text-sm text-muted-foreground">Check back later for new content</p>
          </div>
        ) : (
          <FeaturedArticles articles={articles} />
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
