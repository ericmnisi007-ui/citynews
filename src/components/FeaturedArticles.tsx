
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Clock, Eye } from "lucide-react";

const FeaturedArticles = () => {
  const articles = [
    {
      id: 1,
      title: "Johannesburg Stock Exchange Reaches New Heights",
      category: "Business",
      summary: "The JSE continues its upward trajectory as investor confidence grows in the South African market...",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      source: "Business Report",
      timeAgo: "4 hours ago",
      views: "1.2k"
    },
    {
      id: 2,
      title: "Springboks Prepare for Rugby Championship",
      category: "Sports",
      summary: "The national rugby team intensifies training as they gear up for the upcoming championship matches...",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      source: "SuperSport",
      timeAgo: "6 hours ago",
      views: "3.4k"
    },
    {
      id: 3,
      title: "Tech Innovation Hub Opens in Durban",
      category: "Technology",
      summary: "A new technology incubator promises to boost innovation and entrepreneurship in KwaZulu-Natal...",
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      source: "TechCentral",
      timeAgo: "8 hours ago",
      views: "892"
    }
  ];

  const getCategoryColor = (category: string) => {
    const colors = {
      Business: "bg-blue-100 text-blue-800",
      Sports: "bg-green-100 text-green-800",
      Technology: "bg-purple-100 text-purple-800",
      Politics: "bg-red-100 text-red-800",
      Headlines: "bg-orange-100 text-orange-800"
    };
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Featured Stories</h2>
        <Button variant="outline">View All Articles</Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article, index) => (
          <Card 
            key={article.id} 
            className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="relative overflow-hidden">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4">
                <Badge className={getCategoryColor(article.category)}>
                  {article.category}
                </Badge>
              </div>
            </div>
            
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-green-600 transition-colors">
                {article.title}
              </h3>
              
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {article.summary}
              </p>
              
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {article.timeAgo}
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    {article.views}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-green-600">
                  {article.source}
                </span>
                <Button size="sm" variant="ghost" className="text-green-600 hover:text-green-700">
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
