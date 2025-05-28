
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
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-900/20 to-slate-900/90 md:to-slate-900"></div>
          
          {/* Breaking News Badge */}
          {story.isBreaking && (
            <div className="absolute top-6 left-6 animate-pulse">
              <Badge className="bg-red-500 text-white font-bold px-4 py-2 text-sm border-0">
                <div className="w-2 h-2 bg-white rounded-full animate-ping mr-2"></div>
                BREAKING NEWS
              </Badge>
            </div>
          )}
        </div>

        {/* Story Content */}
        <div className="absolute inset-0 md:left-3/5 p-8 md:p-12 flex flex-col justify-center bg-gradient-to-t from-slate-900/95 via-slate-900/80 to-transparent md:from-transparent md:via-transparent md:to-transparent">
          <div className="space-y-6">
            {/* Meta Info */}
            <div className="flex items-center gap-6 text-sm">
              <Badge className={`${
                story.category === 'Headlines' ? 'bg-red-500' :
                story.category === 'Technology' ? 'bg-purple-500' :
                'bg-green-500'
              } text-white border-0 px-3 py-1`}>
                {story.category}
              </Badge>
              <div className="flex items-center text-gray-400">
                <Clock className="h-4 w-4 mr-1" />
                {story.timeAgo}
              </div>
              <div className="flex items-center text-gray-400">
                <Eye className="h-4 w-4 mr-1" />
                {story.views}
              </div>
            </div>

            {/* Title */}
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight group-hover:text-green-400 transition-colors duration-300">
              {story.title}
            </h2>

            {/* Summary */}
            <p className="text-lg text-gray-300 leading-relaxed max-w-xl">
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
              
              <div className="text-sm font-medium text-green-400 bg-green-400/10 px-4 py-2 rounded-full border border-green-400/30">
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
