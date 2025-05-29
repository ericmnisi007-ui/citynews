
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Clock, Eye, TrendingUp, Share2 } from "lucide-react";
import { NewsArticle } from "@/services/newsService";
import { useToast } from "@/hooks/use-toast";

interface ArticleCardProps {
  article: NewsArticle;
  index: number;
  onReadMore: (article: NewsArticle) => void;
}

const ArticleCard = ({ article, index, onReadMore }: ArticleCardProps) => {
  const { toast } = useToast();

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

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    return `${Math.floor(diffInHours / 24)} days ago`;
  };

  const formatViews = (views: number) => {
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}k`;
    }
    return views.toString();
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    const shareData = {
      title: article.title,
      text: article.description,
      url: `${window.location.origin}/article/${article.id}`,
    };

    try {
      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
        toast({
          title: "Shared Successfully",
          description: "Article shared successfully",
        });
      } else {
        await navigator.clipboard.writeText(shareData.url);
        toast({
          title: "Link Copied",
          description: "Article link copied to clipboard",
        });
      }
    } catch (error) {
      console.error('Error sharing:', error);
      try {
        await navigator.clipboard.writeText(shareData.url);
        toast({
          title: "Link Copied",
          description: "Article link copied to clipboard",
        });
      } catch (clipboardError) {
        console.error('Clipboard error:', clipboardError);
        toast({
          title: "Share Failed",
          description: "Unable to share or copy link",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <Card 
      className={`bg-slate-900/70 backdrop-blur-md border border-green-400/20 overflow-hidden hover-lift group animate-slide-up stagger-${index + 1} cursor-pointer`}
      onClick={() => onReadMore(article)}
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
        <div className="absolute top-4 right-4">
          <Button
            size="sm"
            variant="ghost"
            onClick={handleShare}
            className="bg-slate-900/70 text-white hover:bg-slate-800/70 backdrop-blur-sm"
          >
            <Share2 className="h-3 w-3" />
          </Button>
        </div>
      </div>
      
      <CardContent className="p-6 bg-slate-900/50">
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
              {formatTimeAgo(article.publishedAt)}
            </div>
            <div className="flex items-center gap-1 text-gray-400">
              <Eye className="h-3 w-3" />
              {formatViews(article.views)}
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-green-400 bg-green-400/10 px-2 py-1 rounded-full">
            News Source
          </span>
          <Button 
            size="sm" 
            variant="ghost" 
            onClick={(e) => {
              e.stopPropagation();
              onReadMore(article);
            }}
            className="bg-green-500 hover:bg-green-600 text-white hover:text-white"
          >
            Read More
            <ExternalLink className="h-3 w-3 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ArticleCard;
