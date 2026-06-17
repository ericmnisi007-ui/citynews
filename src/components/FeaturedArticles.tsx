import React, { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { NewsService, NewsArticle } from "@/services/newsService";
import { supabase } from "@/integrations/supabase/client";
import ArticleGrid from "./ArticleGrid";
import LoadingGrid from "./LoadingGrid";

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
      return;
    }

    const loadArticles = async () => {
      try {
        let featured;
        if (showOnlyHeadlines) {
          const headlines = await NewsService.getHeadlinesOnly();
          if (headlines.length < 6) {
            const all = await NewsService.getAllArticles();
            featured = [...headlines, ...all.filter(a => a.category !== 'Headlines').slice(0, 6 - headlines.length)];
          } else {
            featured = headlines.slice(0, 6);
          }
        } else {
          featured = await NewsService.getFeaturedArticles(6);
        }
        setArticles(featured);
      } catch (error) {
        console.error('Error loading articles:', error);
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, [propArticles, showOnlyHeadlines]);

  useEffect(() => {
    if (propArticles || !NewsService.getSupabaseAvailable()) return;
    try {
      const channel = supabase
        .channel('articles_changes')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'articles' }, () => {
          const reloadArticles = async () => {
            try {
              let featured;
              if (showOnlyHeadlines) {
                const headlines = await NewsService.getHeadlinesOnly();
                if (headlines.length < 6) {
                  const all = await NewsService.getAllArticles();
                  featured = [...headlines, ...all.filter(a => a.category !== 'Headlines').slice(0, 6 - headlines.length)];
                } else {
                  featured = headlines.slice(0, 6);
                }
              } else {
                featured = await NewsService.getFeaturedArticles(6);
              }
              setArticles(featured);
            } catch (error) {
              console.error('Error reloading articles:', error);
            }
          };
          reloadArticles();
        })
        .subscribe();
      return () => { supabase.removeChannel(channel); };
    } catch (e) {
      console.warn('Could not set up real-time subscription:', e);
    }
  }, [propArticles, showOnlyHeadlines]);

  const handleReadMore = (article: NewsArticle) => {
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
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {!propArticles && (
        <div className="mb-8">
          <h2 className="section-title">
            {showOnlyHeadlines ? "Top Headlines" : "Featured Stories"}
          </h2>
          <p className="text-muted-foreground mt-3">
            {showOnlyHeadlines
              ? "Breaking news and top stories from across South Africa"
              : "Curated stories you shouldn't miss"}
          </p>
        </div>
      )}
      <ArticleGrid articles={articles} onReadMore={handleReadMore} />
    </section>
  );
};

export default FeaturedArticles;
