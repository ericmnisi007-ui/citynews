import React from "react";
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
  const fallbackImg = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect fill='%23121212' width='400' height='300'/%3E%3Ctext fill='%23444' font-family='Inter, sans-serif' font-size='16' x='120' y='155'%3ECity News%3C/text%3E%3C/svg%3E";

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Business: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      Sports: "bg-green-500/10 text-green-400 border-green-500/20",
      Technology: "bg-purple-500/10 text-purple-400 border-purple-500/20",
      Politics: "bg-red-500/10 text-red-400 border-red-500/20",
      Headlines: "bg-amber-500/10 text-amber-400 border-amber-500/20",
      General: "bg-teal-500/10 text-teal-400 border-teal-500/20",
      Leisure: "bg-pink-500/10 text-pink-400 border-pink-500/20"
    };
    return colors[category] || "bg-gray-500/10 text-gray-400 border-gray-500/20";
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
      } else {
        await navigator.clipboard.writeText(shareData.url);
        toast({ title: "Link Copied", description: "Article link copied to clipboard" });
      }
    } catch {
      try {
        await navigator.clipboard.writeText(shareData.url);
        toast({ title: "Link Copied", description: "Article link copied to clipboard" });
      } catch {
        toast({ title: "Share Failed", description: "Unable to share", variant: "destructive" });
      }
    }
  };

  return (
    <div
      className={`group cursor-pointer rounded-xl overflow-hidden bg-card border border-border hover:border-primary/30 transition-all hover-lift animate-slide-up stagger-${Math.min(index + 1, 6)}`}
      onClick={() => onReadMore(article)}
    >
      <div className="relative overflow-hidden">
        <img
          src={article.image_url || fallbackImg}
          alt={article.title}
          className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-105"
          onError={(e) => { (e.target as HTMLImageElement).src = fallbackImg; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-transparent to-transparent" />
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full border ${getCategoryColor(article.category)}`}>
            {article.category}
          </span>
          {article.is_trending && (
            <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-primary/10 text-primary border border-primary/20 animate-pulse flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              Trending
            </span>
          )}
        </div>
        <button
          onClick={handleShare}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 text-white/70 hover:text-white hover:bg-black/70 transition-all backdrop-blur-sm"
        >
          <Share2 className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="p-5">
        <h3 className="text-base font-bold text-white mb-2 line-clamp-2 leading-snug group-hover:text-primary transition-colors">
          {article.title}
        </h3>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
          {article.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {NewsService.formatTimeAgo(article.published_at)}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              {NewsService.formatViews(article.views)}
            </span>
          </div>
          <Button
            size="sm"
            variant="ghost"
            onClick={(e) => { e.stopPropagation(); onReadMore(article); }}
            className="text-primary hover:text-primary-foreground hover:bg-primary/20 px-3 py-1 h-auto text-xs font-semibold"
          >
            Read <ExternalLink className="h-3 w-3 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
