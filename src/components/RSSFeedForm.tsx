
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Rss, CheckCircle } from "lucide-react";
import { NewsService } from "@/services/newsService";
import { useToast } from "@/hooks/use-toast";

interface RSSFeedFormProps {
  onArticleSaved: () => void;
}

const RSSFeedForm = ({ onArticleSaved }: RSSFeedFormProps) => {
  const { toast } = useToast();
  const [selectedRssFeed, setSelectedRssFeed] = useState("");
  const [rssCategory, setRssCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState("");

  const rssFeeds = [
    { label: "IOL Politics", url: "https://www.iol.co.za/news/politics/rss" },
    { label: "IOL News", url: "https://www.iol.co.za/news/rss" },
    { label: "IOL Business Report", url: "https://www.iol.co.za/business-report/rss" },
    { label: "SuperSport Video", url: "https://supersport.com/rss/video" },
    { label: "AI In The News", url: "http://feeds.feedburner.com/AIInTheNews" }
  ];

  const handleFetchRSS = async () => {
    if (!selectedRssFeed || !rssCategory) {
      toast({
        title: "Error",
        description: "Please select an RSS feed and category",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setProgress("Initializing RSS feed fetch...");
    
    try {
      const feedName = rssFeeds.find(feed => feed.url === selectedRssFeed)?.label;
      setProgress(`Fetching articles from ${feedName}...`);
      
      // Simulate progressive loading for better UX
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProgress("Processing articles one by one...");
      
      const articles = await NewsService.fetchRSSFeed(selectedRssFeed, rssCategory);
      
      setProgress(`Successfully processed ${articles.length} articles!`);
      
      toast({
        title: "RSS Feed Fetched Successfully",
        description: `Added ${articles.length} articles to ${rssCategory} category from ${feedName}`,
      });

      // Reset form after short delay
      setTimeout(() => {
        setSelectedRssFeed("");
        setRssCategory("");
        setProgress("");
        onArticleSaved();
      }, 2000);
      
    } catch (error) {
      console.error('RSS fetch error:', error);
      setProgress("Error occurred during fetch");
      toast({
        title: "Error",
        description: "Failed to fetch RSS feed. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-slate-900/70 backdrop-blur-md border border-red-400/20 animate-slide-up">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Rss className="h-5 w-5 mr-2 text-red-400" />
          Fetch RSS Feed
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              RSS Feed Source
            </label>
            <Select value={selectedRssFeed} onValueChange={setSelectedRssFeed} disabled={isLoading}>
              <SelectTrigger className="bg-slate-800/50 border-red-400/30 text-white">
                <SelectValue placeholder="Select RSS feed source" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-red-400/30">
                {rssFeeds.map((feed) => (
                  <SelectItem 
                    key={feed.url} 
                    value={feed.url} 
                    className="text-white hover:bg-slate-700"
                  >
                    {feed.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Category
            </label>
            <Select value={rssCategory} onValueChange={setRssCategory} disabled={isLoading}>
              <SelectTrigger className="bg-slate-800/50 border-red-400/30 text-white">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-red-400/30">
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
        
        {progress && (
          <div className="mt-4 p-3 bg-slate-800/50 rounded-lg border border-red-400/20 animate-fade-in">
            <div className="flex items-center text-red-400">
              {isLoading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-400 mr-2"></div>
              ) : (
                <CheckCircle className="h-4 w-4 mr-2" />
              )}
              <span className="text-sm">{progress}</span>
            </div>
          </div>
        )}
        
        <Button 
          onClick={handleFetchRSS}
          disabled={isLoading || !selectedRssFeed || !rssCategory}
          className="mt-4 bg-red-500 hover:bg-red-600 text-white disabled:opacity-50 transition-all duration-300"
        >
          <Rss className="h-4 w-4 mr-2" />
          {isLoading ? 'Processing Articles...' : 'Fetch RSS Articles'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default RSSFeedForm;
