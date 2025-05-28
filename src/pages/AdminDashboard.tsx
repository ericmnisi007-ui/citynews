
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { NewsService, NewsArticle } from "@/services/newsService";
import ArticleForm from "@/components/ArticleForm";
import ArticleList from "@/components/ArticleList";

const AdminDashboard = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [editingArticle, setEditingArticle] = useState<NewsArticle | null>(null);

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      const allArticles = await NewsService.getAllArticles();
      setArticles(allArticles);
    } catch (error) {
      console.error('Error loading articles:', error);
    }
  };

  const handleCreateNew = () => {
    setEditingArticle(null);
    setIsCreating(true);
  };

  const handleEdit = (article: NewsArticle) => {
    setEditingArticle(article);
    setIsCreating(true);
  };

  const handleArticleSaved = () => {
    setIsCreating(false);
    setEditingArticle(null);
    loadArticles();
  };

  const handleCancel = () => {
    setIsCreating(false);
    setEditingArticle(null);
  };

  const handleDelete = () => {
    loadArticles();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-white">Admin Dashboard</h1>
          <Button
            onClick={handleCreateNew}
            className="bg-green-500 hover:bg-green-600"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Article
          </Button>
        </div>

        {isCreating && (
          <ArticleForm
            editingArticle={editingArticle}
            onArticleSaved={handleArticleSaved}
            onCancel={handleCancel}
          />
        )}

        <ArticleList
          articles={articles}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
