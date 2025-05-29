
import React, { useState } from "react";
import { NewsService, NewsArticle } from "@/services/newsService";
import { useToast } from "@/hooks/use-toast";
import RSSFeedForm from "./RSSFeedForm";
import ArticleFormFields from "./ArticleFormFields";

interface ArticleFormProps {
  editingArticle: NewsArticle | null;
  onArticleSaved: () => void;
  onCancel: () => void;
}

const ArticleForm = ({ editingArticle, onArticleSaved, onCancel }: ArticleFormProps) => {
  const { toast } = useToast();
  const [uploadedImage, setUploadedImage] = useState<string | null>(editingArticle?.image_url || null);
  const [customDate, setCustomDate] = useState(
    editingArticle?.published_at ? new Date(editingArticle.published_at).toISOString().slice(0, 16) : ""
  );
  const [formData, setFormData] = useState({
    title: editingArticle?.title || "",
    description: editingArticle?.description || "",
    content: editingArticle?.content || "",
    category: editingArticle?.category || "",
    source: editingArticle?.source || "",
    imageUrl: editingArticle?.image_url || "",
    isTrending: editingArticle?.is_trending || false
  });

  const handleImageUpload = (imageUrl: string) => {
    setUploadedImage(imageUrl);
    setFormData(prev => ({ ...prev, imageUrl }));
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
      const publishedDate = customDate ? new Date(customDate).toISOString() : (editingArticle?.published_at || new Date().toISOString());
      
      const articleData: Omit<NewsArticle, 'id' | 'created_at' | 'updated_at'> = {
        title: formData.title,
        description: formData.description,
        content: formData.content,
        category: formData.category,
        source: formData.source || "City News ZA",
        published_at: publishedDate,
        image_url: formData.imageUrl || "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        url: `#/article/${editingArticle?.id || Date.now().toString()}`,
        views: editingArticle?.views || 0,
        is_trending: formData.isTrending
      };

      if (editingArticle) {
        await NewsService.updateArticle({ ...articleData, id: editingArticle.id } as NewsArticle);
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
      <RSSFeedForm onArticleSaved={onArticleSaved} />
      <ArticleFormFields
        editingArticle={editingArticle}
        formData={formData}
        uploadedImage={uploadedImage}
        customDate={customDate}
        onFormDataChange={setFormData}
        onImageUpload={handleImageUpload}
        onCustomDateChange={setCustomDate}
        onSubmit={handleSubmit}
        onCancel={onCancel}
      />
    </div>
  );
};

export default ArticleForm;
