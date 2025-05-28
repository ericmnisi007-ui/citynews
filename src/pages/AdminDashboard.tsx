
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Edit, Trash2, Save } from "lucide-react";
import { NewsService, NewsArticle } from "@/services/newsService";
import { useToast } from "@/hooks/use-toast";

const AdminDashboard = () => {
  const { toast } = useToast();
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    category: "",
    source: "",
    imageUrl: "",
    isTrending: false
  });

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.content || !formData.category) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      const newArticle: NewsArticle = {
        id: editingId || Date.now().toString(),
        title: formData.title,
        description: formData.description,
        content: formData.content,
        category: formData.category,
        source: formData.source || "ZA News Hub",
        publishedAt: new Date().toISOString(),
        imageUrl: formData.imageUrl || "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        url: `#/article/${editingId || Date.now().toString()}`,
        views: 0,
        isTrending: formData.isTrending
      };

      // In a real app, this would save to the backend
      console.log('Saving article:', newArticle);
      
      toast({
        title: editingId ? "Article Updated" : "Article Created",
        description: `Article "${formData.title}" has been ${editingId ? 'updated' : 'created'} successfully`,
      });

      resetForm();
      loadArticles();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save article",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      content: "",
      category: "",
      source: "",
      imageUrl: "",
      isTrending: false
    });
    setIsCreating(false);
    setEditingId(null);
  };

  const handleEdit = (article: NewsArticle) => {
    setFormData({
      title: article.title,
      description: article.description,
      content: article.content,
      category: article.category,
      source: article.source,
      imageUrl: article.imageUrl,
      isTrending: article.isTrending
    });
    setEditingId(article.id);
    setIsCreating(true);
  };

  const handleDelete = (id: string) => {
    // In a real app, this would delete from the backend
    toast({
      title: "Article Deleted",
      description: "Article has been deleted successfully",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-white">Admin Dashboard</h1>
          <Button
            onClick={() => setIsCreating(true)}
            className="bg-green-500 hover:bg-green-600"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Article
          </Button>
        </div>

        {isCreating && (
          <Card className="glass-effect border border-green-400/20 mb-8">
            <CardHeader>
              <CardTitle className="text-white">
                {editingId ? 'Edit Article' : 'Create New Article'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Title *
                    </label>
                    <Input
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      className="glass-effect border-green-400/30 text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Category *
                    </label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                    >
                      <SelectTrigger className="glass-effect border-green-400/30 text-white">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Headlines">Headlines</SelectItem>
                        <SelectItem value="Politics">Politics</SelectItem>
                        <SelectItem value="Business">Business</SelectItem>
                        <SelectItem value="Sports">Sports</SelectItem>
                        <SelectItem value="Technology">Technology</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Source
                    </label>
                    <Input
                      value={formData.source}
                      onChange={(e) => setFormData(prev => ({ ...prev, source: e.target.value }))}
                      className="glass-effect border-green-400/30 text-white"
                      placeholder="ZA News Hub"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Image URL
                    </label>
                    <Input
                      value={formData.imageUrl}
                      onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
                      className="glass-effect border-green-400/30 text-white"
                      placeholder="https://..."
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Description *
                  </label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    className="glass-effect border-green-400/30 text-white h-24"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Content *
                  </label>
                  <Textarea
                    value={formData.content}
                    onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                    className="glass-effect border-green-400/30 text-white h-48"
                    required
                  />
                </div>

                <div className="flex items-center gap-4">
                  <Button type="submit" className="bg-green-500 hover:bg-green-600">
                    <Save className="h-4 w-4 mr-2" />
                    {editingId ? 'Update' : 'Create'} Article
                  </Button>
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="grid gap-6">
          <h2 className="text-2xl font-bold text-white">Manage Articles</h2>
          {articles.map((article) => (
            <Card key={article.id} className="glass-effect border border-green-400/20">
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
                      onClick={() => handleEdit(article)}
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
      </div>
    </div>
  );
};

export default AdminDashboard;
