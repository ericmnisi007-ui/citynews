
interface NewsArticle {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  source: string;
  publishedAt: string;
  imageUrl: string;
  url: string;
  views: number;
  isTrending: boolean;
}

// Mock RSS data that simulates real South African news
const mockNewsData: NewsArticle[] = [
  {
    id: "1",
    title: "Johannesburg Stock Exchange Reaches Record Highs Amid Economic Recovery",
    description: "The JSE All Share Index hits unprecedented levels as investor confidence grows in South Africa's economic prospects.",
    content: "The Johannesburg Stock Exchange has reached record highs this week, with the All Share Index climbing to unprecedented levels amid growing investor confidence in South Africa's economic recovery. Mining stocks led the surge, with major players like Anglo American and BHP Group posting significant gains. Financial analysts attribute this growth to improved commodity prices, political stability, and successful implementation of economic reforms. The banking sector also showed strong performance, with Standard Bank and FirstRand leading the charge. This milestone reflects both domestic and international investor confidence in South Africa's long-term economic prospects.",
    category: "Business",
    source: "Business Day",
    publishedAt: "2024-01-15T10:30:00Z",
    imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    url: "https://businessday.co.za/jse-record-highs",
    views: 12400,
    isTrending: true
  },
  {
    id: "2",
    title: "Springboks Announce Squad for Upcoming Rugby Championship",
    description: "Rassie Erasmus reveals his strategy and player selections for the highly anticipated Rugby Championship matches.",
    content: "Springbok coach Rassie Erasmus has announced a formidable squad for the upcoming Rugby Championship, combining experienced veterans with promising newcomers. The selection includes captain Siya Kolisi, who will lead the team through what promises to be a challenging tournament. Several exciting young talents have been included, signaling the coach's commitment to building depth for future competitions. The team will face Australia, New Zealand, and Argentina in a series of matches that will test their preparation for the next World Cup cycle. Training camps are already underway in Stellenbosch, with players showing exceptional form and fitness levels.",
    category: "Sports",
    source: "SuperSport",
    publishedAt: "2024-01-15T08:15:00Z",
    imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    url: "https://supersport.com/springboks-squad-announcement",
    views: 8900,
    isTrending: true
  },
  {
    id: "3",
    title: "Cape Town's V&A Waterfront Unveils Major Expansion Plans",
    description: "The iconic waterfront destination announces a R2 billion development project to enhance tourism and retail offerings.",
    content: "The V&A Waterfront in Cape Town has unveiled ambitious expansion plans worth R2 billion, aimed at enhancing its position as Africa's most visited destination. The development will include new retail spaces, luxury accommodation, and innovative entertainment facilities. The project is expected to create thousands of jobs and significantly boost tourism in the Western Cape. Environmental sustainability is a key focus, with green building practices and renewable energy solutions integrated throughout the design. Construction is set to begin in the second quarter of 2024, with completion expected by 2026. The expansion will include a new marine research center and public aquarium.",
    category: "General",
    source: "IOL News",
    publishedAt: "2024-01-15T06:45:00Z",
    imageUrl: "https://images.unsplash.com/photo-1580836619550-7f8b46e1bd89?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    url: "https://iol.co.za/va-waterfront-expansion",
    views: 6700,
    isTrending: false
  },
  {
    id: "4",
    title: "President Ramaphosa Announces New Infrastructure Development Initiative",
    description: "A comprehensive R500 billion infrastructure program aims to modernize South Africa's critical infrastructure.",
    content: "President Cyril Ramaphosa has announced a landmark R500 billion infrastructure development initiative designed to modernize South Africa's critical infrastructure over the next decade. The program will focus on transportation networks, energy systems, digital connectivity, and water infrastructure. Key projects include the expansion of high-speed rail networks, renewable energy installations, and fiber optic connectivity to rural areas. The initiative is expected to create over 300,000 jobs and significantly improve the country's economic competitiveness. International partnerships with development banks and private investors will help fund the ambitious program, which aligns with the National Development Plan's long-term objectives.",
    category: "Politics",
    source: "News24",
    publishedAt: "2024-01-14T16:20:00Z",
    imageUrl: "https://images.unsplash.com/photo-1577495508048-b635879837f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    url: "https://news24.com/infrastructure-development-initiative",
    views: 15600,
    isTrending: true
  },
  {
    id: "5",
    title: "Innovation Hub in Gauteng Launches AI Research Center",
    description: "South Africa's first dedicated artificial intelligence research facility opens with international partnerships.",
    content: "The Innovation Hub in Gauteng has officially launched South Africa's first dedicated artificial intelligence research center, marking a significant milestone in the country's technological advancement. The facility will focus on developing AI solutions for healthcare, agriculture, and financial services, with particular emphasis on addressing uniquely African challenges. International partnerships with leading tech companies and universities will provide expertise and funding for groundbreaking research projects. The center aims to position South Africa as a leader in AI development on the African continent. Local universities will collaborate on research initiatives, while the facility will also serve as an incubator for AI startups and provide training programs for the next generation of tech professionals.",
    category: "Technology",
    source: "TechCentral",
    publishedAt: "2024-01-14T14:30:00Z",
    imageUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    url: "https://techcentral.co.za/ai-research-center-launch",
    views: 4200,
    isTrending: false
  },
  {
    id: "6",
    title: "Load Shedding Reduced as Renewable Energy Projects Come Online",
    description: "Eskom announces significant improvements in electricity supply as new renewable energy facilities begin operations.",
    content: "Eskom has announced a significant reduction in load shedding schedules as multiple renewable energy projects across South Africa begin commercial operations. The addition of over 2000MW of wind and solar capacity has provided much-needed relief to the national grid. Independent Power Producers have successfully connected their facilities, contributing to improved energy security. The utility company expects further improvements over the coming months as additional projects reach completion. Energy Minister Gwede Mantashe praised the progress, noting that the diversification of South Africa's energy mix is crucial for long-term economic stability. Citizens and businesses are already experiencing fewer power cuts, with some regions seeing complete elimination of scheduled outages.",
    category: "Headlines",
    source: "Power FM",
    publishedAt: "2024-01-14T12:15:00Z",
    imageUrl: "https://images.unsplash.com/photo-1586771711003-d5fb3e542c20?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    url: "https://powerfm.co.za/load-shedding-reduction",
    views: 18900,
    isTrending: true
  }
];

export class NewsService {
  private static articles: NewsArticle[] = mockNewsData;

  static async getAllArticles(): Promise<NewsArticle[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return [...this.articles];
  }

  static async getArticlesByCategory(category: string): Promise<NewsArticle[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    if (category === 'General') {
      return this.articles.filter(article => article.category === 'General');
    }
    return this.articles.filter(article => 
      article.category.toLowerCase() === category.toLowerCase()
    );
  }

  static async getTrendingArticles(): Promise<NewsArticle[]> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return this.articles.filter(article => article.isTrending);
  }

  static async getArticleById(id: string): Promise<NewsArticle | null> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return this.articles.find(article => article.id === id) || null;
  }

  static async getFeaturedArticles(limit: number = 3): Promise<NewsArticle[]> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return this.articles.slice(0, limit);
  }

  static incrementViews(id: string): void {
    const article = this.articles.find(a => a.id === id);
    if (article) {
      article.views += 1;
    }
  }

  static formatTimeAgo(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    return `${Math.floor(diffInHours / 24)} days ago`;
  }

  static formatViews(views: number): string {
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}k`;
    }
    return views.toString();
  }
}

export type { NewsArticle };
