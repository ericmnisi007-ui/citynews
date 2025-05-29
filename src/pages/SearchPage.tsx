
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { NewsService, NewsArticle } from "@/services/newsService";
import FeaturedArticles from "@/components/FeaturedArticles";

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    
    setLoading(true);
    setHasSearched(true);
    
    try {
      // Simulate search by filtering articles
      const allArticles = await NewsService.getAllArticles();
      const filtered = allArticles.filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filtered);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 pt-24 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 animate-slide-up">
          <h1 className="text-5xl font-bold text-white mb-8">Search News</h1>
          
          <div className="max-w-2xl mx-auto">
            <div className="flex gap-4">
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleKeyPress}
                className="bg-white/10 border-red-400/30 text-white placeholder-gray-300 focus:border-red-400 focus:ring-red-400/20"
              />
              <Button
                onClick={handleSearch}
                className="bg-red-500 hover:bg-red-600"
                disabled={loading}
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {loading && (
          <div className="text-center animate-pulse">
            <div className="text-white text-lg">Searching...</div>
          </div>
        )}

        {hasSearched && !loading && (
          <div className="mb-8 animate-slide-up">
            <p className="text-gray-400">
              Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} for "{searchTerm}"
            </p>
          </div>
        )}

        {hasSearched && !loading && searchResults.length > 0 && (
          <div className="animate-scale-in-center">
            <FeaturedArticles articles={searchResults} />
          </div>
        )}

        {hasSearched && !loading && searchResults.length === 0 && (
          <div className="text-center animate-slide-up">
            <p className="text-gray-400 text-lg">No articles found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
