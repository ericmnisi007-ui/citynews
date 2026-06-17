import React from "react";

const ArticleDetailSkeleton = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-pulse">
        <div className="h-4 bg-secondary rounded w-16 mb-6" />
        <div className="h-[300px] md:h-[450px] bg-secondary rounded-2xl mb-8" />
        <div className="h-6 bg-secondary rounded w-24 mb-4" />
        <div className="h-10 bg-secondary rounded w-full mb-4" />
        <div className="h-10 bg-secondary rounded w-3/4 mb-6" />
        <div className="h-4 bg-secondary rounded w-1/2 mb-8" />
        <div className="space-y-3 mb-8">
          <div className="h-4 bg-secondary rounded w-full" />
          <div className="h-4 bg-secondary rounded w-5/6" />
          <div className="h-4 bg-secondary rounded w-4/6" />
        </div>
        <div className="space-y-3">
          <div className="h-4 bg-secondary rounded w-full" />
          <div className="h-4 bg-secondary rounded w-full" />
          <div className="h-4 bg-secondary rounded w-3/4" />
        </div>
      </div>
    </div>
  );
};

export default ArticleDetailSkeleton;
