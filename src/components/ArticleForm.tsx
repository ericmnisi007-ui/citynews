
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Save, Rss, Calendar } from "lucide-react";
import { NewsService, NewsArticle } from "@/services/newsService";
import { useToast } from "@/hooks/use-toast";
import ImageUpload from "./ImageUpload";

interface ArticleFormProps {
  editingArticle: NewsArticle | null;
  onArticleSaved: () => void;
  onCancel: () => void;
}

const ArticleForm = ({ editingArticle, onArticleSaved, onCancel }: ArticleFormProps) => {
  const { toast } = useToast();
  const [uploadedImage, setUploadedImage] = useState<string | null>(editingArticle?.imageUrl || null);
  const [selectedRssFeed, setSelectedRssFeed] = useState("");
  const [rssCategory, setRssCategory] = useState("");
  const [customDate, setCustomDate] = useState(
    editingArticle?.publishedAt ? new Date(editingArticle.publishedAt).toISOString().slice(0, 16) : ""
  );
  const [formData, setFormData] = useState({
    title: editingArticle?.title || "",
    description: editingArticle?.description || "",
    content: editingArticle?.content || "",
    category: editingArticle?.category || "",
    source: editingArticle?.source || "",
    imageUrl: editingArticle?.imageUrl || "",
    isTrending: editingArticle?.isTrending || false
  });

  const rssFeeds = [
    { label: "IOL Politics", url: "https://www.iol.co.za/news/politics/rss" },
    { label: "IOL News", url: "https://www.iol.co.za/news/rss" },
    { label: "IOL Business Report", url: "https://www.iol.co.za/business-report/rss" },
    { label: "SuperSport Video", url: "https://supersport.com/rss/video" },
    { label: "AI In The News", url: "http://feeds.feedburner.com/AIInTheNews" }
  ];

  const handleImageUpload = (imageUrl: string) => {
    setUploadedImage(imageUrl);
    setFormData(prev => ({ ...prev, imageUrl }));
  };

  const handleFetchRSS = async () => {
    if (!selectedRssFeed || !rssCategory) {
      toast({
        title: "Error",
        description: "Please select an RSS feed and category",
        variant: "destructive",
      });
      return;
    }

    try {
      // Simulate RSS fetch - in real implementation, you'd use a proper RSS parser
      const mockRSSArticles = [
        {
          title: `RSS Article from ${rssFeeds.find(feed => feed.url === selectedRssFeed)?.label}`,
          description: "Description from RSS feed",
          content: "Full content from RSS feed...",
          imageUrl: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
        },
        {
          title: `Another RSS Article from ${rssFeeds.find(feed => feed.url === selectedRssFeed)?.label}`, 
          description: "Another description from RSS feed",
          content: "Another full content from RSS feed...",
          imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
        }
      ];

      for (const rssArticle of mockRSSArticles) {
        const articleData: NewsArticle = {
          id: Date.now().toString() + Math.random().toString(36),
          title: rssArticle.title,
          description: rssArticle.description,
          content: rssArticle.content,
          category: rssCategory,
          source: new URL(selectedRssFeed).hostname,
          publishedAt: new Date().toISOString(),
          imageUrl: rssArticle.imageUrl,
          url: `#/article/${Date.now().toString()}`,
          views: 0,
          isTrending: false
        };

        await NewsService.addArticle(articleData);
      }

      toast({
        title: "RSS Feed Fetched",
        description: `Added ${mockRSSArticles.length} articles to ${rssCategory} category from ${rssFeeds.find(feed => feed.url === selectedRssFeed)?.label}`,
      });

      setSelectedRssFeed("");
      setRssCategory("");
      onArticleSaved();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch RSS feed",
        variant: "destructive",
      });
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
      const publishedDate = customDate ? new Date(customDate).toISOString() : (editingArticle?.publishedAt || new Date().toISOString());
      
      const articleData: NewsArticle = {
        id: editingArticle?.id || Date.now().toString(),
        title: formData.title,
        description: formData.description,
        content: formData.content,
        category: formData.category,
        source: formData.source || "City News ZA",
        publishedAt: publishedDate,
        imageUrl: formData.imageUrl || "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        url: `#/article/${editingArticle?.id || Date.now().toString()}`,
        views: editingArticle?.views || 0,
        isTrending: formData.isTrending
      };

      if (editingArticle) {
        await NewsService.updateArticle(articleData);
      } else {
        await NewsService.addArticle(articleData);
      }
      
      toast({
        title: editingArticle ? "Article Updated" : "Article Created",
        description: `Article "${formData.title}" has been ${editingArticle ? 'updated' : 'created'} successfully`,
      });

      onArticleSaved();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save article",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-8">
      {/* RSS Feed Section */}
      <Card className="bg-slate-900/70 backdrop-blur-md border border-green-400/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Rss className="h-5 w-5 mr-2 text-green-400" />
            Fetch RSS Feed
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                RSS Feed Source
              </label>
              <Select value={selectedRssFeed} onValueChange={setSelectedRssFeed}>
                <SelectTrigger className="bg-slate-800/50 border-green-400/30 text-white">
                  <SelectValue placeholder="Select RSS feed source" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-green-400/30">
                  {rssFeeds.map((feed) => (
                    <SelectItem 
                      key={feed.url} 
                      value={feed.url} 
                      className="text-white hover:bg-slate-700"
                    >
                      {feed.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Category
              </label>
              <Select value={rssCategory} onValueChange={setRssCategory}>
                <SelectTrigger className="bg-slate-800/50 border-green-400/30 text-white">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-green-400/30">
                  <SelectItem value="Headlines" className="text-white hover:bg-slate-700">Headlines</SelectItem>
                  <SelectItem value="Politics" className="text-white hover:bg-slate-700">Politics</SelectItem>
                  <SelectItem value="Business" className="text-white hover:bg-slate-700">Business</SelectItem>
                  <SelectItem value="Sports" className="text-white hover:bg-slate-700">Sports</SelectItem>
                  <SelectItem value="Technology" className="text-white hover:bg-slate-700">Technology</SelectItem>
                  <SelectItem value="General" className="text-white hover:bg-slate-700">General</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button 
            onClick={handleFetchRSS}
            className="mt-4 bg-green-500 hover:bg-green-600 text-white"
          >
            <Rss className="h-4 w-4 mr-2" />
            Fetch RSS Articles
          </Button>
        </CardContent>
      </Card>

      {/* Article Form */}
      <Card className="bg-slate-900/70 backdrop-blur-md border border-green-400/20">
        <CardHeader>
          <CardTitle className="text-white">
            {editingArticle ? 'Edit Article' : 'Create New Article'}
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
                  className="bg-slate-800/50 border-green-400/30 text-white placeholder:text-gray-400"
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
                  <SelectTrigger className="bg-slate-800/50 border-green-400/30 text-white">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-green-400/30">
                    <SelectItem value="Headlines" className="text-white hover:bg-slate-700">Headlines</SelectItem>
                    <SelectItem value="Politics" className="text-white hover:bg-slate-700">Politics</SelectItem>
                    <SelectItem value="Business" className="text-white hover:bg-slate-700">Business</SelectItem>
                    <SelectItem value="Sports" className="text-white hover:bg-slate-700">Sports</SelectItem>
                    <SelectItem value="Technology" className="text-white hover:bg-slate-700">Technology</SelectItem>
                    <SelectItem value="General" className="text-white hover:bg-slate-700">General</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Source
                </label>
                <Input
                  value={formData.source}
                  onChange={(e) => setFormData(prev => ({ ...prev, source: e.target.value }))}
                  className="bg-slate-800/50 border-green-400/30 text-white placeholder:text-gray-400"
                  placeholder="City News ZA"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Image URL
                </label>
                <Input
                  value={formData.imageUrl}
                  onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
                  className="bg-slate-800/50 border-green-400/30 text-white placeholder:text-gray-400"
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <Calendar className="h-4 w-4 inline mr-1" />
                  Published Date
                </label>
                <Input
                  type="datetime-local"
                  value={customDate}
                  onChange={(e) => setCustomDate(e.target.value)}
                  className="bg-slate-800/50 border-green-400/30 text-white placeholder:text-gray-400"
                />
              </div>
            </div>

            <ImageUpload
              uploadedImage={uploadedImage}
              onImageUpload={handleImageUpload}
            />

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Description *
              </label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="bg-slate-800/50 border-green-400/30 text-white placeholder:text-gray-400 h-24"
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
                className="bg-slate-800/50 border-green-400/30 text-white placeholder:text-gray-400 h-48"
                required
              />
            </div>

            <div className="flex items-center gap-4">
              <Button type="submit" className="bg-green-500 hover:bg-green-600 text-white">
                <Save className="h-4 w-4 mr-2" />
                {editingArticle ? 'Update' : 'Create'} Article
              </Button>
              <Button type="button" variant="outline" onClick={onCancel} className="border-gray-600 text-gray-300 hover:bg-slate-700 hover:text-white">
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ArticleForm;
