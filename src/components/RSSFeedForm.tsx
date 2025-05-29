
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Rss } from "lucide-react";
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
    
    try {
      const articles = await NewsService.fetchRSSFeed(selectedRssFeed, rssCategory);
      
      toast({
        title: "RSS Feed Fetched Successfully",
        description: `Added ${articles.length} articles to ${rssCategory} category from ${rssFeeds.find(feed => feed.url === selectedRssFeed)?.label}`,
      });

      setSelectedRssFeed("");
      setRssCategory("");
      onArticleSaved();
    } catch (error) {
      console.error('RSS fetch error:', error);
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
    <Card className="bg-slate-900/70 backdrop-blur-md border border-green-400/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Rss className="h-5 w-5 mr-2 text-green-400" />
          Fetch RSS Feed
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              RSS Feed Source
            </label>
            <Select value={selectedRssFeed} onValueChange={setSelectedRssFeed}>
              <SelectTrigger className="bg-slate-800/50 border-green-400/30 text-white">
                <SelectValue placeholder="Select RSS feed source" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-green-400/30">
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
            <Select value={rssCategory} onValueChange={setRssCategory}>
              <SelectTrigger className="bg-slate-800/50 border-green-400/30 text-white">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-green-400/30">
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
        <Button 
          onClick={handleFetchRSS}
          disabled={isLoading || !selectedRssFeed || !rssCategory}
          className="mt-4 bg-green-500 hover:bg-green-600 text-white disabled:opacity-50"
        >
          <Rss className="h-4 w-4 mr-2" />
          {isLoading ? 'Fetching Articles...' : 'Fetch RSS Articles'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default RSSFeedForm;
