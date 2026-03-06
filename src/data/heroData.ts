
export const heroStories = [
  {
    id: 1,
    title: "South Africa's Economic Recovery Shows Strong Signs of Growth",
    category: "Headlines",
    summary: "Latest economic indicators show a significant upturn in South Africa's GDP growth, with key sectors showing remarkable resilience and innovation in the face of global challenges...",
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    source: "Business Day",
    timeAgo: "2 hours ago",
    views: "15.2k",
    isBreaking: true
  },
  {
    id: 2,
    title: "Cape Town Emerges as Africa's Leading Tech Innovation Hub",
    category: "Technology",
    summary: "The Mother City attracts billions in tech investment as startups and multinational companies establish major operations, creating thousands of high-skill jobs...",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    source: "TechCentral",
    timeAgo: "4 hours ago",
    views: "8.7k",
    isBreaking: false
  },
  {
    id: 3,
    title: "Springboks Set New World Rugby Championship Records",
    category: "Sports",
    summary: "The national rugby team's latest victory secures their position as world champions, with record-breaking performances that have captured global attention...",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    source: "SuperSport",
    timeAgo: "6 hours ago",
    views: "12.4k",
    isBreaking: false
  }
];

export interface HeroStory {
  id: number;
  title: string;
  category: string;
  summary: string;
  image: string;
  source: string;
  timeAgo: string;
  views: string;
  isBreaking: boolean;
}
