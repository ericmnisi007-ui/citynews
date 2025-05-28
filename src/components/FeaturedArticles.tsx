
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Clock, Eye, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const FeaturedArticles = () => {
  const { toast } = useToast();
  
  const articles = [
    {
      id: 1,
      title: "Johannesburg Stock Exchange Reaches New Heights",
      category: "Business",
      summary: "The JSE continues its upward trajectory as investor confidence grows in the South African market, reaching record-breaking levels this quarter...",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      source: "Business Report",
      timeAgo: "4 hours ago",
      views: "1.2k",
      trending: true
    },
    {
      id: 2,
      title: "Springboks Prepare for Rugby Championship",
      category: "Sports",
      summary: "The national rugby team intensifies training as they gear up for the upcoming championship matches with new strategic formations...",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      source: "SuperSport",
      timeAgo: "6 hours ago",
      views: "3.4k",
      trending: false
    },
    {
      id: 3,
      title: "Tech Innovation Hub Opens in Durban",
      category: "Technology",
      summary: "A new technology incubator promises to boost innovation and entrepreneurship in KwaZulu-Natal, attracting international investors...",
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      source: "TechCentral",
      timeAgo: "8 hours ago",
      views: "892",
      trending: true
    }
  ];

  const getCategoryColor = (category: string) => {
    const colors = {
      Business: "from-blue-500 to-blue-600",
      Sports: "from-green-500 to-green-600",
      Technology: "from-purple-500 to-purple-600",
      Politics: "from-red-500 to-red-600",
      Headlines: "from-orange-500 to-orange-600"
    };
    return colors[category as keyof typeof colors] || "from-gray-500 to-gray-600";
  };

  const handleReadMore = (title: string) => {
    toast({
      title: "Article Opened",
      description: `Reading: ${title}`,
    });
  };

  const handleViewAll = () => {
    toast({
      title: "View All Articles",
      description: "Loading all featured articles...",
    });
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex items-center justify-between mb-12 animate-slide-up">
        <div>
          <h2 className="text-4xl font-bold text-white mb-2">Featured Stories</h2>
          <p className="text-gray-400">Handpicked news that matters most</p>
        </div>
        <Button 
          variant="outline" 
          onClick={handleViewAll}
          className="glass-effect border-yellow-400/30 text-yellow-400 hover:bg-yellow-400/10"
        >
          View All Articles
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article, index) => (
          <Card 
            key={article.id} 
            className={`glass-effect border border-white/10 overflow-hidden hover-lift group animate-slide-up stagger-${index + 1}`}
          >
            <div className="relative overflow-hidden">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <Badge className={`bg-gradient-to-r ${getCategoryColor(article.category)} text-white border-0`}>
                  {article.category}
                </Badge>
                {article.trending && (
                  <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black border-0 animate-pulse">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    Trending
                  </Badge>
                )}
              </div>
            </div>
            
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-white mb-3 line-clamp-2 group-hover:text-yellow-400 transition-colors duration-300">
                {article.title}
              </h3>
              
              <p className="text-gray-400 text-sm mb-4 line-clamp-3 leading-relaxed">
                {article.summary}
              </p>
              
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-gray-400">
                    <Clock className="h-3 w-3" />
                    {article.timeAgo}
                  </div>
                  <div className="flex items-center gap-1 text-gray-400">
                    <Eye className="h-3 w-3" />
                    {article.views}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-yellow-400 bg-yellow-400/10 px-2 py-1 rounded-full">
                  {article.source}
                </span>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={() => handleReadMore(article.title)}
                  className="text-yellow-400 hover:text-yellow-300 hover:bg-yellow-400/10"
                >
                  Read More
                  <ExternalLink className="h-3 w-3 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default FeaturedArticles;
