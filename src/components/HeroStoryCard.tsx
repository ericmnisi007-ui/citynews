
import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Eye, Play } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { HeroStory } from "@/data/heroData";

interface HeroStoryCardProps {
  story: HeroStory;
}

const HeroStoryCard = ({ story }: HeroStoryCardProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleReadMore = (story: HeroStory) => {
    toast({
      title: "Opening Article",
      description: `Reading: ${story.title}`,
    });
    navigate(`/article/${story.id}`);
  };

  return (
    <Card className="glass-effect border border-green-400/20 overflow-hidden hover-lift group animate-scale-in-center glow-green">
      <div className="relative h-[600px] md:h-[500px]">
        {/* Story Image */}
        <div className="absolute inset-0 md:w-3/5">
          <img
            src={story.image}
            alt={story.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
          />
          {/* Enhanced gradient overlay for better text visibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/80 to-slate-900/60 md:to-slate-900/95"></div>
          
          {/* Breaking News Badge */}
          {story.isBreaking && (
            <div className="absolute top-6 left-6 animate-pulse z-10">
              <Badge className="bg-red-500 text-white font-bold px-4 py-2 text-sm border-0">
                <div className="w-2 h-2 bg-white rounded-full animate-ping mr-2"></div>
                BREAKING NEWS
              </Badge>
            </div>
          )}
        </div>

        {/* Story Content */}
        <div className="absolute inset-0 md:left-3/5 p-8 md:p-12 flex flex-col justify-center">
          {/* Dark background overlay for better text visibility */}
          <div className="absolute inset-0 bg-slate-900/90 md:bg-transparent"></div>
          
          <div className="space-y-6 relative z-10">
            {/* Meta Info */}
            <div className="flex items-center gap-6 text-sm">
              <Badge className={`${
                story.category === 'Headlines' ? 'bg-red-500' :
                story.category === 'Technology' ? 'bg-purple-500' :
                'bg-green-500'
              } text-white border-0 px-3 py-1`}>
                {story.category}
              </Badge>
              <div className="flex items-center text-gray-300">
                <Clock className="h-4 w-4 mr-1" />
                {story.timeAgo}
              </div>
              <div className="flex items-center text-gray-300">
                <Eye className="h-4 w-4 mr-1" />
                {story.views}
              </div>
            </div>

            {/* Title with text shadow for better visibility */}
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight group-hover:text-green-400 transition-colors duration-300 drop-shadow-lg text-shadow-lg">
              {story.title}
            </h2>

            {/* Summary with improved contrast */}
            <p className="text-lg text-gray-200 leading-relaxed max-w-xl drop-shadow-md">
              {story.summary}
            </p>

            {/* Action Buttons */}
            <div className="flex items-center gap-4 pt-4">
              <Button 
                onClick={() => handleReadMore(story)}
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold px-8 py-3 hover-lift glow-green group/btn"
              >
                <Play className="h-5 w-5 mr-2 group-hover/btn:translate-x-1 transition-transform" />
                Read Full Story
              </Button>
              
              <div className="text-sm font-medium text-green-400 bg-green-400/20 px-4 py-2 rounded-full border border-green-400/40">
                {story.source}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default HeroStoryCard;
