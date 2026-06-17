import React from "react";
import { useParams } from "react-router-dom";

const ArticleNotFound = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center pt-20">
      <div className="text-center px-4">
        <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mx-auto mb-6">
          <span className="text-3xl font-bold text-muted-foreground">?</span>
        </div>
        <h1 className="text-2xl font-bold text-white mb-3">Article Not Found</h1>
        <p className="text-muted-foreground mb-2 max-w-md">
          The article you're looking for doesn't exist or has been removed.
        </p>
        {id && (
          <p className="text-xs text-muted-foreground mb-6">
            ID: {id}
          </p>
        )}
        <div className="flex items-center justify-center gap-3">
          <a href="/" className="px-4 py-2 bg-primary text-primary-foreground text-sm font-semibold rounded-lg hover:bg-primary/90 transition-colors">
            Go Home
          </a>
          <button
            onClick={() => window.history.back()}
            className="px-4 py-2 bg-secondary text-white text-sm font-semibold rounded-lg hover:bg-secondary/80 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArticleNotFound;
