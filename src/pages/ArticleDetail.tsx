import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { NewsService, NewsArticle } from "@/services/newsService";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useMetaTags } from "@/hooks/useMetaTags";
import { ArrowLeft, Calendar, Eye, Clock, Share2 } from "lucide-react";
import ArticleDetailSkeleton from "@/components/ArticleDetailSkeleton";
import ArticleNotFound from "@/components/ArticleNotFound";

const ArticleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fallbackImg = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='600' viewBox='0 0 1200 600'%3E%3Crect fill='%23121212' width='1200' height='600'/%3E%3Ctext fill='%23444' font-family='Inter, sans-serif' font-size='24' x='450' y='310'%3ECity News ZA%3C/text%3E%3C/svg%3E";

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
      if (!id) { setError("No article ID provided"); setLoading(false); return; }
      try {
        const articleData = await NewsService.getArticleById(id);
        if (articleData) {
          setArticle(articleData);
          setError(null);
          NewsService.incrementViews(id);
        } else {
          setError("Article not found");
        }
      } catch (error) {
        console.error('Error loading article:', error);
        setError("Failed to load article");
        toast({ title: "Error", description: "Failed to load article.", variant: "destructive" });
      } finally {
        setLoading(false);
      }
    };
    loadArticle();
  }, [id]);

  useEffect(() => {
    if (!id || !article || !NewsService.getSupabaseAvailable()) return;
    try {
      const channel = supabase
        .channel(`article_${id}_changes`)
        .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'articles', filter: `id=eq.${id}` },
          (payload) => { setArticle(payload.new as NewsArticle); }
        )
        .subscribe();
      return () => { supabase.removeChannel(channel); };
    } catch (e) {
      console.warn('Could not set up real-time subscription:', e);
    }
  }, [id, article]);

  const handleShare = async () => {
    const shareData = { title: article!.title, text: article!.description, url: window.location.href };
    try {
      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast({ title: "Link Copied", description: "Article link copied to clipboard" });
      }
    } catch {
      toast({ title: "Share Failed", description: "Unable to share", variant: "destructive" });
    }
  };

  if (loading) return <ArticleDetailSkeleton />;
  if (error || !article) return <ArticleNotFound />;

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-20">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <a
          href="/"
          onClick={(e) => { e.preventDefault(); window.history.back(); }}
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-6 group"
        >
          <ArrowLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
          Back
        </a>

        {/* Hero Image */}
        <div className="relative rounded-2xl overflow-hidden mb-8">
          <img
            src={article.image_url || fallbackImg}
            alt={article.title}
            className="w-full h-[300px] md:h-[450px] object-cover"
            onError={(e) => { (e.target as HTMLImageElement).src = fallbackImg; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
        </div>

        {/* Category Badge & Meta */}
        <div className="flex items-center gap-3 mb-4">
          <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full border border-primary/20">
            {article.category}
          </span>
          {article.is_trending && (
            <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full border border-primary/20 animate-pulse">
              Trending
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
          {article.title}
        </h1>

        {/* Meta Info */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6 pb-6 border-b border-border">
          <span className="font-medium text-white">{article.source}</span>
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            {new Date(article.published_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {NewsService.formatTimeAgo(article.published_at)}
          </span>
          <span className="flex items-center gap-1">
            <Eye className="h-3.5 w-3.5" />
            {NewsService.formatViews(article.views)} views
          </span>
          <button
            onClick={handleShare}
            className="ml-auto flex items-center gap-1 text-primary hover:text-primary/80 transition-colors"
          >
            <Share2 className="h-4 w-4" />
            Share
          </button>
        </div>

        {/* Description */}
        <p className="text-lg text-gray-300 mb-8 leading-relaxed font-medium">
          {article.description}
        </p>

        {/* Content */}
        <div className="prose prose-invert prose-lg max-w-none">
          {article.content.split('\n\n').map((paragraph, i) => (
            <p key={i} className="text-gray-400 leading-relaxed mb-6">
              {paragraph}
            </p>
          ))}
        </div>
      </article>
    </div>
  );
};

export default ArticleDetail;
