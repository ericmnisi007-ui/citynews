
import React from "react";
import { Button } from "@/components/ui/button";

interface ArticleHeaderProps {
  onViewAll: () => void;
}

const ArticleHeader = ({ onViewAll }: ArticleHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-12 animate-slide-up">
      <div>
        <h2 className="text-4xl font-bold text-white mb-2">Featured Stories</h2>
        <p className="text-gray-400">Real news from trusted South African sources</p>
      </div>
      <Button 
        variant="outline" 
        onClick={onViewAll}
        className="glass-effect border-green-400/30 text-green-400 hover:bg-green-400/10"
      >
        View All Articles
      </Button>
    </div>
  );
};

export default ArticleHeader;
