
import React, { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { NewsService, NewsArticle } from "@/services/newsService";
import ArticleGrid from "./ArticleGrid";
import LoadingGrid from "./LoadingGrid";
import confetti from 'canvas-confetti';

interface FeaturedArticlesProps {
  articles?: NewsArticle[];
  showOnlyHeadlines?: boolean;
}

const FeaturedArticles = ({ articles: propArticles, showOnlyHeadlines = false }: FeaturedArticlesProps) => {
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
          let featuredArticles;
          if (showOnlyHeadlines) {
            featuredArticles = await NewsService.getHeadlinesOnly();
          } else {
            featuredArticles = await NewsService.getFeaturedArticles(3);
          }
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
  }, [propArticles, showOnlyHeadlines, toast]);

  const handleReadMore = (article: NewsArticle) => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    
    NewsService.incrementViews(article.id);
    toast({
      title: "Opening Article",
      description: `Reading: ${article.title}`,
    });
    navigate(`/article/${article.id}`);
  };

  if (loading) {
    return <LoadingGrid />;
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {!propArticles && (
        <div className="mb-12 animate-slide-up">
          <div>
            <h2 className="text-4xl font-bold text-white mb-2">Featured Stories</h2>
            <p className="text-gray-400">Real news from trusted South African sources</p>
          </div>
        </div>
      )}
      <ArticleGrid articles={articles} onReadMore={handleReadMore} />
    </section>
  );
};

export default FeaturedArticles;
