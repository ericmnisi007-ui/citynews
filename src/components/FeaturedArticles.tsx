
import React, { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { NewsService, NewsArticle } from "@/services/newsService";
import ArticleHeader from "./ArticleHeader";
import ArticleGrid from "./ArticleGrid";
import LoadingGrid from "./LoadingGrid";

interface FeaturedArticlesProps {
  articles?: NewsArticle[];
}

const FeaturedArticles = ({ articles: propArticles }: FeaturedArticlesProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(!propArticles);

  useEffect(() => {
    if (propArticles) {
      setArticles(propArticles);
      setLoading(false);
    } else {
      const loadArticles = async () => {
        try {
          const featuredArticles = await NewsService.getFeaturedArticles(3);
          setArticles(featuredArticles);
        } catch (error) {
          console.error('Error loading articles:', error);
          toast({
            title: "Error",
            description: "Failed to load articles. Please try again.",
            variant: "destructive",
          });
        } finally {
          setLoading(false);
        }
      };

      loadArticles();
    }
  }, [propArticles, toast]);

  const handleReadMore = (article: NewsArticle) => {
    NewsService.incrementViews(article.id);
    toast({
      title: "Opening Article",
      description: `Reading: ${article.title}`,
    });
    navigate(`/article/${article.id}`);
  };

  const handleViewAll = async () => {
    try {
      const allArticles = await NewsService.getAllArticles();
      toast({
        title: "All Articles Loaded",
        description: `Found ${allArticles.length} articles across all categories`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load all articles",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <LoadingGrid />;
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {!propArticles && (
        <ArticleHeader onViewAll={handleViewAll} />
      )}
      <ArticleGrid articles={articles} onReadMore={handleReadMore} />
    </section>
  );
};

export default FeaturedArticles;
