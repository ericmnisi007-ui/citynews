
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { NewsService, NewsArticle } from "@/services/newsService";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useMetaTags } from "@/hooks/useMetaTags";
import ArticleDetailHeader from "@/components/ArticleDetailHeader";
import ArticleDetailContent from "@/components/ArticleDetailContent";
import ArticleDetailSkeleton from "@/components/ArticleDetailSkeleton";
import ArticleNotFound from "@/components/ArticleNotFound";

const ArticleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Dynamic meta tags for the article with absolute URLs
  useMetaTags({
    title: article?.title,
    description: article?.description,
    image: article?.image_url,
    url: `/article/${id}`,
    type: 'article',
    siteName: 'City News ZA'
  });

  useEffect(() => {
    const loadArticle = async () => {
      if (!id) {
        setError("No article ID provided");
        setLoading(false);
        return;
      }

      try {
        console.log('Loading article with ID:', id);
        const articleData = await NewsService.getArticleById(id);
        
        if (articleData) {
          setArticle(articleData);
          setError(null);
          // Increment views for valid articles
          NewsService.incrementViews(id);
          console.log('Article loaded successfully:', articleData.title);
        } else {
          console.log('Article not found for ID:', id);
          setError("Article not found");
        }
      } catch (error) {
        console.error('Error loading article:', error);
        setError("Failed to load article");
        toast({
          title: "Error",
          description: "Failed to load article. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadArticle();
  }, [id, toast]);

  // Set up real-time subscription for this specific article
  useEffect(() => {
    if (!id || !article) return;

    console.log('Setting up real-time subscription for article:', id);
    const channel = supabase
      .channel(`article_${id}_changes`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'articles',
          filter: `id=eq.${id}`
        },
        (payload) => {
          console.log('Article real-time update:', payload);
          setArticle(payload.new as NewsArticle);
        }
      )
      .subscribe();

    return () => {
      console.log('Cleaning up real-time subscription for article:', id);
      supabase.removeChannel(channel);
    };
  }, [id, article]);

  // Handle loading state
  if (loading) {
    return <ArticleDetailSkeleton />;
  }

  // Handle error states
  if (error || !article) {
    return <ArticleNotFound />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ArticleDetailHeader />
        <ArticleDetailContent article={article} />
      </div>
    </div>
  );
};

export default ArticleDetail;
