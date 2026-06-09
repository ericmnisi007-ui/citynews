
import React from 'react';
import { NewsArticle } from '@/services/newsService';
import ArticleDetailMeta from './ArticleDetailMeta';
import ArticleDetailActions from './ArticleDetailActions';

interface ArticleDetailContentProps {
  article: NewsArticle;
}

const ArticleDetailContent = ({ article }: ArticleDetailContentProps) => {
  return (
    <article className="bg-slate-900/50 backdrop-blur-sm border border-green-400/20 rounded-xl overflow-hidden">
      <img
        src={article.image_url}
        alt={article.title}
        className="w-full h-64 md:h-96 object-cover"
      />
      
      <div className="p-8">
        <ArticleDetailMeta 
          category={article.category}
          publishedAt={article.published_at}
          views={article.views}
        />

        <h1 className="text-4xl font-bold text-white mb-4 leading-tight">
          {article.title}
        </h1>

        <p className="text-xl text-gray-300 mb-6 leading-relaxed">
          {article.description}
        </p>

        <div className="prose prose-invert max-w-none">
          <div className="text-gray-300 leading-relaxed text-lg">
            {article.content?.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <ArticleDetailActions
          articleId={article.id}
          title={article.title}
          description={article.description}
          source={article.source}
        />
      </div>
    </article>
  );
};

export default ArticleDetailContent;
