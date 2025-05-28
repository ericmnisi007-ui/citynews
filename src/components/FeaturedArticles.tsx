
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Clock, Eye, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { NewsService, NewsArticle } from "@/services/newsService";

const FeaturedArticles = () => {
  const { toast } = useToast();
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
  }, [toast]);

  const getCategoryColor = (category: string) => {
    const colors = {
      Business: "from-blue-500 to-blue-600",
      Sports: "from-green-500 to-green-600",
      Technology: "from-purple-500 to-purple-600",
      Politics: "from-red-500 to-red-600",
      Headlines: "from-orange-500 to-orange-600",
      General: "from-teal-500 to-teal-600"
    };
    return colors[category as keyof typeof colors] || "from-gray-500 to-gray-600";
  };

  const handleReadMore = (article: NewsArticle) => {
    NewsService.incrementViews(article.id);
    toast({
      title: "Opening Article",
      description: `Reading: ${article.title}`,
    });
    
    // Create a simple article reader modal or new page
    const articleWindow = window.open('', '_blank', 'width=800,height=600,scrollbars=yes');
    if (articleWindow) {
      articleWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>${article.title}</title>
          <style>
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; 
              max-width: 800px; 
              margin: 0 auto; 
              padding: 20px;
              line-height: 1.6;
              color: #333;
            }
            .header { border-bottom: 1px solid #eee; padding-bottom: 20px; margin-bottom: 20px; }
            .category { 
              background: #22c55e; 
              color: white; 
              padding: 4px 12px; 
              border-radius: 16px; 
              font-size: 14px; 
              display: inline-block;
              margin-bottom: 10px;
            }
            .title { font-size: 32px; font-weight: bold; margin: 10px 0; }
            .meta { color: #666; font-size: 14px; margin-bottom: 20px; }
            .image { width: 100%; height: 300px; object-fit: cover; border-radius: 8px; margin-bottom: 20px; }
            .content { font-size: 18px; line-height: 1.8; }
            .source { 
              margin-top: 30px; 
              padding-top: 20px; 
              border-top: 1px solid #eee; 
              color: #666; 
              font-size: 14px; 
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="category">${article.category}</div>
            <h1 class="title">${article.title}</h1>
            <div class="meta">
              Published ${NewsService.formatTimeAgo(article.publishedAt)} • ${NewsService.formatViews(article.views)} views
            </div>
          </div>
          <img src="${article.imageUrl}" alt="${article.title}" class="image" />
          <div class="content">
            <p><strong>${article.description}</strong></p>
            <p>${article.content}</p>
          </div>
          <div class="source">
            Source: ${article.source} | <a href="${article.url}" target="_blank">View Original Article</a>
          </div>
        </body>
        </html>
      `);
      articleWindow.document.close();
    }
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
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="glass-effect border border-green-400/20 overflow-hidden animate-pulse">
              <div className="w-full h-48 bg-gray-700"></div>
              <CardContent className="p-6">
                <div className="h-4 bg-gray-700 rounded mb-2"></div>
                <div className="h-6 bg-gray-700 rounded mb-4"></div>
                <div className="h-16 bg-gray-700 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex items-center justify-between mb-12 animate-slide-up">
        <div>
          <h2 className="text-4xl font-bold text-white mb-2">Featured Stories</h2>
          <p className="text-gray-400">Real news from trusted South African sources</p>
        </div>
        <Button 
          variant="outline" 
          onClick={handleViewAll}
          className="glass-effect border-green-400/30 text-green-400 hover:bg-green-400/10"
        >
          View All Articles
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article, index) => (
          <Card 
            key={article.id} 
            className={`glass-effect border border-green-400/20 overflow-hidden hover-lift group animate-slide-up stagger-${index + 1} cursor-pointer`}
            onClick={() => handleReadMore(article)}
          >
            <div className="relative overflow-hidden">
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <Badge className={`bg-gradient-to-r ${getCategoryColor(article.category)} text-white border-0`}>
                  {article.category}
                </Badge>
                {article.isTrending && (
                  <Badge className="bg-gradient-to-r from-green-400 to-emerald-500 text-black border-0 animate-pulse">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    Trending
                  </Badge>
                )}
              </div>
            </div>
            
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-white mb-3 line-clamp-2 group-hover:text-green-400 transition-colors duration-300">
                {article.title}
              </h3>
              
              <p className="text-gray-400 text-sm mb-4 line-clamp-3 leading-relaxed">
                {article.description}
              </p>
              
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-gray-400">
                    <Clock className="h-3 w-3" />
                    {NewsService.formatTimeAgo(article.publishedAt)}
                  </div>
                  <div className="flex items-center gap-1 text-gray-400">
                    <Eye className="h-3 w-3" />
                    {NewsService.formatViews(article.views)}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-green-400 bg-green-400/10 px-2 py-1 rounded-full">
                  {article.source}
                </span>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleReadMore(article);
                  }}
                  className="text-green-400 hover:text-green-300 hover:bg-green-400/10"
                >
                  Read More
                  <ExternalLink className="h-3 w-3 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default FeaturedArticles;
