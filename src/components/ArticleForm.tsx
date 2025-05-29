
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
  const [uploadedImage, setUploadedImage] = useState<string | null>(editingArticle?.imageUrl || null);
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
