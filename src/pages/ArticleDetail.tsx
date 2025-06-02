
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { NewsService, NewsArticle } from "@/services/newsService";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useMetaTags } from "@/hooks/useMetaTags";
import ArticleDetailHeader from "@/components/ArticleDetailHeader";
import ArticleDetailContent from "@/components/ArticleDetailContent";
import ArticleDetailSkeleton from "@/components/ArticleDetailSkeleton";
import ArticleNotFound from "@/components/ArticleNotFound";

const ArticleDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);

  // Dynamic meta tags for the article
  useMetaTags({
    title: article?.title,
    description: article?.description,
    image: article?.image_url,
    url: `https://cnza.lovable.app/article/${id}`,
    type: 'article',
    siteName: 'City News ZA'
  });

  useEffect(() => {
    const loadArticle = async () => {
      if (id) {
        try {
          const articleData = await NewsService.getArticleById(id);
          setArticle(articleData);
          if (articleData) {
            NewsService.incrementViews(id);
          }
        } catch (error) {
          console.error('Error loading article:', error);
          toast({
            title: "Error",
            description: "Failed to load article",
            variant: "destructive",
          });
        } finally {
          setLoading(false);
        }
      }
    };

    loadArticle();
  }, [id, toast]);

  // Set up real-time subscription for this specific article
  useEffect(() => {
    if (!id) return;

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
      supabase.removeChannel(channel);
    };
  }, [id]);

  if (loading) {
    return <ArticleDetailSkeleton />;
  }

  if (!article) {
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
