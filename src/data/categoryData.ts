
import { TrendingUp, Users, Building, Zap, Trophy, Globe } from "lucide-react";

export interface Category {
  name: string;
  icon: typeof TrendingUp;
  count: number;
  description: string;
  gradient: string;
  bgGradient: string;
}

export const categories: Category[] = [
  {
    name: "Headlines",
    icon: TrendingUp,
    count: 0,
    description: "Breaking news and top stories",
    gradient: "from-red-500 to-orange-500",
    bgGradient: "from-red-500/10 to-orange-500/10"
  },
  {
    name: "Politics",
    icon: Users,
    count: 0,
    description: "Government and political updates",
    gradient: "from-blue-500 to-purple-500",
    bgGradient: "from-blue-500/10 to-purple-500/10"
  },
  {
    name: "Business",
    icon: Building,
    count: 0,
    description: "Economic and market news",
    gradient: "from-green-500 to-teal-500",
    bgGradient: "from-green-500/10 to-teal-500/10"
  },
  {
    name: "Technology",
    icon: Zap,
    count: 0,
    description: "Tech innovations and startups",
    gradient: "from-purple-500 to-pink-500",
    bgGradient: "from-purple-500/10 to-pink-500/10"
  },
  {
    name: "Sports",
    icon: Trophy,
    count: 0,
    description: "Sports news and updates",
    gradient: "from-orange-500 to-red-500",
    bgGradient: "from-orange-500/10 to-red-500/10"
  },
  {
    name: "General",
    icon: Globe,
    count: 0,
    description: "General news and lifestyle",
    gradient: "from-teal-500 to-blue-500",
    bgGradient: "from-teal-500/10 to-blue-500/10"
  }
];
