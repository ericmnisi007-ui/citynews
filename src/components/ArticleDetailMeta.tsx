
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Clock, Eye } from 'lucide-react';
import { NewsService } from '@/services/newsService';

interface ArticleDetailMetaProps {
  category: string;
  publishedAt: string;
  views: number;
}

const ArticleDetailMeta = ({ category, publishedAt, views }: ArticleDetailMetaProps) => {
  return (
    <div className="flex items-center gap-4 mb-6">
      <Badge className="bg-green-500 text-white">
        {category}
      </Badge>
      <div className="flex items-center text-gray-400 text-sm">
        <Clock className="h-4 w-4 mr-1" />
        {NewsService.formatTimeAgo(publishedAt)}
      </div>
      <div className="flex items-center text-gray-400 text-sm">
        <Eye className="h-4 w-4 mr-1" />
        {NewsService.formatViews(views)}
      </div>
    </div>
  );
};

export default ArticleDetailMeta;
