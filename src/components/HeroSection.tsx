import React, { useState, useEffect } from "react";
import { TrendingUp, Calendar, Eye, ArrowRight } from "lucide-react";
import { NewsService, NewsArticle } from "@/services/newsService";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import LoadingGrid from "./LoadingGrid";

const HeroSection = () => {
  const [recentArticles, setRecentArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const loadRecentArticles = async () => {
      try {
        const articles = await NewsService.getAllArticles();
        const sortedArticles = articles.sort((a, b) =>
          new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
        ).slice(0, 4);
        setRecentArticles(sortedArticles);
      } catch (error) {
        console.error('Error loading recent articles:', error);
      } finally {
        setLoading(false);
      }
    };

    loadRecentArticles();
  }, []);

  useEffect(() => {
    if (!NewsService.getSupabaseAvailable()) return;
    try {
      const channel = supabase
        .channel('hero_articles_changes')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'articles' }, () => {
          const reloadArticles = async () => {
            try {
              const articles = await NewsService.getAllArticles();
              setRecentArticles(articles.slice(0, 4));
            } catch (error) {
              console.error('Error reloading hero articles:', error);
            }
          };
          reloadArticles();
        })
        .subscribe();
      return () => { supabase.removeChannel(channel); };
    } catch (e) {
      console.warn('Could not set up real-time subscription:', e);
    }
  }, []);

  const handleReadMore = (article: NewsArticle) => {
    NewsService.incrementViews(article.id);
    toast({
      title: "Opening Article",
      description: `Reading: ${article.title}`,
    });
    navigate(`/article/${article.id}`);
  };

  if (loading || recentArticles.length === 0) {
    return <div className="pt-24"><LoadingGrid /></div>;
  }

  const mainArticle = recentArticles[0];
  const sideArticles = recentArticles.slice(1, 4);
  const fallbackImg = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'%3E%3Crect fill='%23121212' width='800' height='600'/%3E%3Ctext fill='%23444' font-family='Inter, sans-serif' font-size='20' x='300' y='300'%3ECity News ZA%3C/text%3E%3C/svg%3E";

  return (
    <section className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Featured Article */}
        <div
          className="lg:col-span-2 relative group cursor-pointer rounded-2xl overflow-hidden"
          onClick={() => handleReadMore(mainArticle)}
        >
          <div className="relative h-[420px] md:h-[500px]">
            <img
              src={mainArticle.image_url || fallbackImg}
              alt={mainArticle.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              onError={(e) => { (e.target as HTMLImageElement).src = fallbackImg; }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <div className="flex items-center space-x-3 mb-3">
                <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full">
                  {mainArticle.category}
                </span>
                <span className="flex items-center text-xs text-gray-400">
                  <Calendar className="h-3 w-3 mr-1" />
                  {NewsService.formatTimeAgo(mainArticle.published_at)}
                </span>
                <span className="flex items-center text-xs text-gray-400">
                  <Eye className="h-3 w-3 mr-1" />
                  {NewsService.formatViews(mainArticle.views)}
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 leading-tight">
                {mainArticle.title}
              </h2>
              <p className="text-gray-400 text-sm md:text-base line-clamp-2 mb-4">
                {mainArticle.description}
              </p>
              <span className="inline-flex items-center text-primary text-sm font-semibold group-hover:underline">
                Read Full Story <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </div>
        </div>

        {/* Side Articles */}
        <div className="flex flex-col gap-4">
          {sideArticles.map((article, index) => (
            <div
              key={article.id}
              className="group cursor-pointer rounded-xl overflow-hidden bg-card border border-border hover:border-primary/30 transition-all hover-lift"
              onClick={() => handleReadMore(article)}
            >
              <div className="flex h-[150px]">
                <div className="w-1/3 min-w-[120px] overflow-hidden">
                  <img
                    src={article.image_url || fallbackImg}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => { (e.target as HTMLImageElement).src = fallbackImg; }}
                  />
                </div>
                <div className="flex-1 p-4 flex flex-col justify-center">
                  <span className="text-[11px] font-bold text-primary uppercase tracking-wider mb-1">
                    {article.category}
                  </span>
                  <h3 className="text-sm font-semibold text-white line-clamp-2 leading-snug mb-2">
                    {article.title}
                  </h3>
                  <div className="flex items-center text-[11px] text-muted-foreground space-x-3">
                    <span className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {NewsService.formatTimeAgo(article.published_at)}
                    </span>
                    <span className="flex items-center">
                      <Eye className="h-3 w-3 mr-1" />
                      {NewsService.formatViews(article.views)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
