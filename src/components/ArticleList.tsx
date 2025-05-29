
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2 } from "lucide-react";
import { NewsService, NewsArticle } from "@/services/newsService";
import { useToast } from "@/hooks/use-toast";

interface ArticleListProps {
  articles: NewsArticle[];
  onEdit: (article: NewsArticle) => void;
  onDelete: () => void;
}

const ArticleList = ({ articles, onEdit, onDelete }: ArticleListProps) => {
  const { toast } = useToast();

  const handleDelete = async (id: string) => {
    try {
      await NewsService.deleteArticle(id);
      toast({
        title: "Article Deleted",
        description: "Article has been deleted successfully",
      });
      onDelete();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete article",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="grid gap-6">
      <h2 className="text-2xl font-bold text-white">Manage Articles</h2>
      {articles.map((article) => (
        <Card key={article.id} className="glass-effect border border-green-400/20 bg-slate-900/50">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <Badge className="bg-green-500 text-white">
                    {article.category}
                  </Badge>
                  {article.isTrending && (
                    <Badge className="bg-orange-500 text-white">
                      Trending
                    </Badge>
                  )}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {article.title}
                </h3>
                <p className="text-gray-400 mb-2">
                  {article.description}
                </p>
                <div className="text-sm text-gray-500">
                  Source: {article.source} | Views: {NewsService.formatViews(article.views)}
                </div>
              </div>
              <div className="flex gap-2 ml-4">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onEdit(article)}
                  className="border-green-400/30 text-green-400 hover:bg-green-400/10"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDelete(article.id)}
                  className="border-red-400/30 text-red-400 hover:bg-red-400/10"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ArticleList;
