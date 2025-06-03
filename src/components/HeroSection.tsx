import React, { useState, useEffect } from "react";
import { TrendingUp } from "lucide-react";
import { NewsService, NewsArticle } from "@/services/newsService";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import confetti from 'canvas-confetti';
import NewspaperLoader from "./NewspaperLoader";

const HeroSection = () => {
  const [recentArticles, setRecentArticles] = useState<NewsArticle[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const loadRecentArticles = async () => {
      try {
        const articles = await NewsService.getAllArticles();
        const sortedArticles = articles.sort((a, b) => 
          new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
        ).slice(0, 5);
        setRecentArticles(sortedArticles);
      } catch (error) {
        console.error('Error loading recent articles:', error);
      } finally {
        setLoading(false);
      }
    };

    loadRecentArticles();
  }, []);

  // Set up real-time subscription for article changes
  useEffect(() => {
    const channel = supabase
      .channel('hero_articles_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'articles'
        },
        (payload) => {
          console.log('Hero real-time update:', payload);
          
          // Reload articles when changes occur
          const reloadArticles = async () => {
            try {
              const articles = await NewsService.getAllArticles();
              const sortedArticles = articles.sort((a, b) => 
                new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
              ).slice(0, 5);
              setRecentArticles(sortedArticles);
            } catch (error) {
              console.error('Error reloading hero articles:', error);
            }
          };
          
          reloadArticles();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    if (recentArticles.length > 0) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % recentArticles.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [recentArticles.length]);

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

  const backgroundPattern = "data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2322C55E' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E";

  if (loading || recentArticles.length === 0) {
    return <NewspaperLoader />;
  }

  const currentArticle = recentArticles[currentSlide];

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 opacity-60">
        <div 
          className="absolute inset-0 opacity-50"
          style={{ backgroundImage: `url("${backgroundPattern}")` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-slate-900/70 backdrop-blur-md border border-green-400/30">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              <TrendingUp className="h-5 w-5 text-green-400 mr-2" />
              <span className="text-green-400 font-semibold">Latest News</span>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="bg-slate-900/70 backdrop-blur-md border border-green-400/20 overflow-hidden hover:shadow-xl transition-shadow duration-300 glow-green rounded-xl">
            <div className="relative h-[600px] md:h-[500px]">
              <div className="absolute inset-0 md:w-3/5">
                <img
                  src={currentArticle.image_url}
                  alt={currentArticle.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/80 to-slate-900/60 md:to-slate-900/95"></div>
                
                {currentArticle.is_trending && (
                  <div className="absolute top-6 left-6 z-10">
                    <div className="bg-green-500 text-white font-bold px-4 py-2 text-sm border-0 rounded-full">
                      <div className="w-2 h-2 bg-white rounded-full mr-2 inline-block"></div>
                      TRENDING
                    </div>
                  </div>
                )}
              </div>

              <div className="absolute inset-0 md:left-3/5 p-8 md:p-12 flex flex-col justify-center">
                <div className="absolute inset-0 bg-slate-900/70 md:bg-transparent"></div>
                
                <div className="space-y-6 relative z-10">
                  <div className="flex items-center gap-6 text-sm">
                    <div className="bg-green-500 text-white border-0 px-3 py-1 rounded-full">
                      {currentArticle.category}
                    </div>
                    <div className="flex items-center text-gray-300">
                      {NewsService.formatTimeAgo(currentArticle.published_at)}
                    </div>
                    <div className="flex items-center text-gray-300">
                      {NewsService.formatViews(currentArticle.views)} views
                    </div>
                  </div>

                  <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight hover:text-green-400 transition-colors duration-300 drop-shadow-lg text-shadow-lg">
                    {currentArticle.title}
                  </h2>

                  <p className="text-lg text-gray-200 leading-relaxed max-w-xl drop-shadow-md">
                    {currentArticle.description}
                  </p>

                  <div className="flex items-center gap-4 pt-4">
                    <button 
                      onClick={() => handleReadMore(currentArticle)}
                      className="bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 glow-green"
                    >
                      Read Full Story
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-6 space-x-2">
            {recentArticles.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-green-400 w-8' 
                    : 'bg-slate-600 hover:bg-slate-500'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
