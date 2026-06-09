
import React from "react";
import { NewsArticle } from "@/services/newsService";
import ArticleCard from "./ArticleCard";

interface ArticleGridProps {
  articles: NewsArticle[];
  onReadMore: (article: NewsArticle) => void;
}

const ArticleGrid = ({ articles, onReadMore }: ArticleGridProps) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {articles.map((article, index) => (
        <ArticleCard
          key={article.id}
          article={article}
          index={index}
          onReadMore={onReadMore}
        />
      ))}
    </div>
  );
};

export default ArticleGrid;
