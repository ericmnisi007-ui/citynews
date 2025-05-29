
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Save, Calendar } from "lucide-react";
import { NewsArticle } from "@/services/newsService";
import ImageUpload from "./ImageUpload";

interface ArticleFormFieldsProps {
  editingArticle: NewsArticle | null;
  formData: {
    title: string;
    description: string;
    content: string;
    category: string;
    source: string;
    imageUrl: string;
    isTrending: boolean;
  };
  uploadedImage: string | null;
  customDate: string;
  onFormDataChange: (data: any) => void;
  onImageUpload: (imageUrl: string) => void;
  onCustomDateChange: (date: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

const ArticleFormFields = ({
  editingArticle,
  formData,
  uploadedImage,
  customDate,
  onFormDataChange,
  onImageUpload,
  onCustomDateChange,
  onSubmit,
  onCancel
}: ArticleFormFieldsProps) => {
  return (
    <Card className="bg-slate-900/70 backdrop-blur-md border border-green-400/20">
      <CardHeader>
        <CardTitle className="text-white">
          {editingArticle ? 'Edit Article' : 'Create New Article'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Title *
              </label>
              <Input
                value={formData.title}
                onChange={(e) => onFormDataChange({ ...formData, title: e.target.value })}
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
                onValueChange={(value) => onFormDataChange({ ...formData, category: value })}
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
                onChange={(e) => onFormDataChange({ ...formData, source: e.target.value })}
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
                onChange={(e) => onFormDataChange({ ...formData, imageUrl: e.target.value })}
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
                onChange={(e) => onCustomDateChange(e.target.value)}
                className="bg-slate-800/50 border-green-400/30 text-white placeholder:text-gray-400"
              />
            </div>
          </div>

          <ImageUpload
            uploadedImage={uploadedImage}
            onImageUpload={onImageUpload}
          />

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Description *
            </label>
            <Textarea
              value={formData.description}
              onChange={(e) => onFormDataChange({ ...formData, description: e.target.value })}
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
              onChange={(e) => onFormDataChange({ ...formData, content: e.target.value })}
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
  );
};

export default ArticleFormFields;
