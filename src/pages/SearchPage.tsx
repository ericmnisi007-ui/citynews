import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
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
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">Search News</h1>
          <div className="max-w-2xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleKeyPress}
                className="pl-10 pr-20 h-12 bg-secondary border-border text-white placeholder:text-muted-foreground focus:border-primary/50 rounded-xl"
              />
              {searchTerm && (
                <button
                  onClick={() => { setSearchTerm(""); setHasSearched(false); }}
                  className="absolute right-20 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
              <Button
                onClick={handleSearch}
                disabled={loading || !searchTerm.trim()}
                className="absolute right-1 top-1/2 -translate-y-1/2 h-10 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {loading ? "Searching..." : "Search"}
              </Button>
            </div>
          </div>
        </div>

        {hasSearched && !loading && (
          <p className="text-muted-foreground mb-8">
            Found <span className="text-primary font-semibold">{searchResults.length}</span> result{searchResults.length !== 1 ? 's' : ''} for "{searchTerm}"
          </p>
        )}

        {hasSearched && !loading && searchResults.length > 0 && (
          <FeaturedArticles articles={searchResults} />
        )}

        {hasSearched && !loading && searchResults.length === 0 && (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
              <Search className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="text-lg text-muted-foreground">No articles found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
