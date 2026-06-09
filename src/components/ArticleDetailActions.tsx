
import React from 'react';
import { Button } from '@/components/ui/button';
import { Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ArticleDetailActionsProps {
  articleId: string;
  title?: string;
  description?: string;
  source: string;
}

const ArticleDetailActions = ({ articleId, title, description, source }: ArticleDetailActionsProps) => {
  const { toast } = useToast();

  const handleShare = () => {
    const shareUrl = `https://cnza.lovable.app/article/${articleId}`;
    if (navigator.share) {
      navigator.share({
        title: title,
        text: description,
        url: shareUrl,
      });
    } else {
      navigator.clipboard.writeText(shareUrl);
      toast({
        title: "Link Copied",
        description: "Article link copied to clipboard",
      });
    }
  };

  return (
    <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-700">
      <div className="text-sm text-gray-400">
        Source: <span className="text-green-400">{source}</span>
      </div>
      <Button
        onClick={handleShare}
        variant="outline"
        size="sm"
        className="border-green-400/30 text-green-400 hover:bg-green-400/10"
      >
        <Share2 className="h-4 w-4 mr-2" />
        Share
      </Button>
    </div>
  );
};

export default ArticleDetailActions;
