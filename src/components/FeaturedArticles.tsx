
import React, { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { NewsService, NewsArticle } from "@/services/newsService";
import { supabase } from "@/integrations/supabase/client";
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
            // Prioritize Headlines category for featured stories
            const headlinesArticles = await NewsService.getHeadlinesOnly();
            console.log('Headlines articles loaded:', headlinesArticles.length);
            
            if (headlinesArticles.length < 6) {
              // If we don't have enough headlines, supplement with other articles
              const allArticles = await NewsService.getAllArticles();
              const nonHeadlines = allArticles
                .filter(article => article.category !== 'Headlines')
                .slice(0, 6 - headlinesArticles.length);
              featuredArticles = [...headlinesArticles, ...nonHeadlines];
            } else {
              featuredArticles = headlinesArticles.slice(0, 6);
            }
          } else {
            featuredArticles = await NewsService.getFeaturedArticles(6);
          }
          console.log('Featured articles loaded:', featuredArticles.length);
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

  // Set up real-time subscription for article changes
  useEffect(() => {
    if (propArticles) return; // Don't subscribe if using prop articles

    const channel = supabase
      .channel('articles_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'articles'
        },
        (payload) => {
          console.log('Real-time update:', payload);
          
          // Reload articles when changes occur
          const reloadArticles = async () => {
            try {
              let featuredArticles;
              if (showOnlyHeadlines) {
                const headlinesArticles = await NewsService.getHeadlinesOnly();
                
                if (headlinesArticles.length < 6) {
                  const allArticles = await NewsService.getAllArticles();
                  const nonHeadlines = allArticles
                    .filter(article => article.category !== 'Headlines')
                    .slice(0, 6 - headlinesArticles.length);
                  featuredArticles = [...headlinesArticles, ...nonHeadlines];
                } else {
                  featuredArticles = headlinesArticles.slice(0, 6);
                }
              } else {
                featuredArticles = await NewsService.getFeaturedArticles(6);
              }
              setArticles(featuredArticles);
            } catch (error) {
              console.error('Error reloading articles:', error);
            }
          };
          
          reloadArticles();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [propArticles, showOnlyHeadlines]);

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
