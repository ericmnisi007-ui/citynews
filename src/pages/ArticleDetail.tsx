
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, Eye, Share2 } from "lucide-react";
import { NewsService, NewsArticle } from "@/services/newsService";
import { useToast } from "@/hooks/use-toast";

const ArticleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);

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

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article?.title,
        text: article?.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied",
        description: "Article link copied to clipboard",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 pt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-700 rounded mb-4 w-3/4"></div>
            <div className="h-64 bg-gray-700 rounded mb-6"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-700 rounded"></div>
              <div className="h-4 bg-gray-700 rounded w-5/6"></div>
              <div className="h-4 bg-gray-700 rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 pt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Article Not Found</h1>
          <p className="text-gray-400 mb-8">The article you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/')} className="bg-green-500 hover:bg-green-600">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Button 
          onClick={() => navigate('/')}
          variant="ghost"
          className="text-green-400 hover:text-green-300 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>

        <article className="bg-slate-900/50 backdrop-blur-sm border border-green-400/20 rounded-xl overflow-hidden">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-64 md:h-96 object-cover"
          />
          
          <div className="p-8">
            <div className="flex items-center gap-4 mb-6">
              <Badge className="bg-green-500 text-white">
                {article.category}
              </Badge>
              <div className="flex items-center text-gray-400 text-sm">
                <Clock className="h-4 w-4 mr-1" />
                {NewsService.formatTimeAgo(article.publishedAt)}
              </div>
              <div className="flex items-center text-gray-400 text-sm">
                <Eye className="h-4 w-4 mr-1" />
                {NewsService.formatViews(article.views)}
              </div>
            </div>

            <h1 className="text-4xl font-bold text-white mb-4 leading-tight">
              {article.title}
            </h1>

            <p className="text-xl text-gray-300 mb-6 leading-relaxed">
              {article.description}
            </p>

            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 leading-relaxed text-lg">
                {article.content}
              </p>
            </div>

            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-700">
              <div className="text-sm text-gray-400">
                Source: <span className="text-green-400">{article.source}</span>
              </div>
              <Button
                onClick={handleShare}
                variant="outline"
                size="sm"
                className="border-green-400/30 text-green-400 hover:bg-green-400/10"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default ArticleDetail;
