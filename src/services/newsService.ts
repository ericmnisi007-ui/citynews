
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
    title: "President Ramaphosa Announces New Economic Growth Strategy",
    description: "A comprehensive plan to boost South Africa's economic growth through infrastructure development and job creation initiatives.",
    content: "President Cyril Ramaphosa has unveiled a new economic growth strategy aimed at revitalizing South Africa's economy. The plan includes major infrastructure projects, support for small businesses, and initiatives to create over 250,000 jobs in the next two years. The strategy focuses on renewable energy, digital transformation, and manufacturing sectors. Key components include investment in renewable energy infrastructure, expansion of broadband connectivity to rural areas, and support for emerging entrepreneurs.",
    category: "Headlines",
    source: "Business Day",
    publishedAt: "2024-01-15T10:30:00Z",
    imageUrl: "https://images.unsplash.com/photo-1577495508048-b635879837f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    url: "https://businessday.co.za/economic-growth-strategy",
    views: 18400,
    isTrending: true
  },
  {
    id: "2",
    title: "Load Shedding Reduced as New Power Plants Come Online",
    description: "Eskom announces significant improvements in electricity supply as renewable energy projects begin operations across the country.",
    content: "Eskom has announced a significant reduction in load shedding schedules as multiple renewable energy projects across South Africa begin commercial operations. The addition of over 2000MW of wind and solar capacity has provided much-needed relief to the national grid. Independent Power Producers have successfully connected their facilities, contributing to improved energy security. The utility company expects further improvements over the coming months as additional projects reach completion.",
    category: "Headlines",
    source: "Power FM",
    publishedAt: "2024-01-15T08:15:00Z",
    imageUrl: "https://images.unsplash.com/photo-1586771711003-d5fb3e542c20?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    url: "https://powerfm.co.za/load-shedding-reduction",
    views: 15600,
    isTrending: true
  },
  {
    id: "3",
    title: "Cape Town Named Africa's Leading Tourism Destination",
    description: "The Mother City receives international recognition for its tourism infrastructure and cultural attractions.",
    content: "Cape Town has been named Africa's leading tourism destination at the World Travel Awards, recognizing the city's exceptional tourism infrastructure, natural beauty, and cultural attractions. The award highlights Cape Town's successful recovery from the pandemic and its innovative approach to sustainable tourism. Key factors in the win include the city's diverse attractions, from Table Mountain to the V&A Waterfront, and its commitment to responsible tourism practices.",
    category: "Headlines",
    source: "IOL News",
    publishedAt: "2024-01-14T16:20:00Z",
    imageUrl: "https://images.unsplash.com/photo-1580836619550-7f8b46e1bd89?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    url: "https://iol.co.za/cape-town-tourism-award",
    views: 12400,
    isTrending: true
  },
  {
    id: "4",
    title: "Johannesburg Stock Exchange Reaches Record Highs",
    description: "The JSE All Share Index hits unprecedented levels as investor confidence grows in South Africa's economic prospects.",
    content: "The Johannesburg Stock Exchange has reached record highs this week, with the All Share Index climbing to unprecedented levels amid growing investor confidence in South Africa's economic recovery. Mining stocks led the surge, with major players like Anglo American and BHP Group posting significant gains. Financial analysts attribute this growth to improved commodity prices, political stability, and successful implementation of economic reforms.",
    category: "Business",
    source: "Business Day",
    publishedAt: "2024-01-15T10:30:00Z",
    imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    url: "https://businessday.co.za/jse-record-highs",
    views: 8900,
    isTrending: false
  },
  {
    id: "5",
    title: "Springboks Announce Squad for Rugby Championship",
    description: "Rassie Erasmus reveals his strategy and player selections for the highly anticipated Rugby Championship matches.",
    content: "Springbok coach Rassie Erasmus has announced a formidable squad for the upcoming Rugby Championship, combining experienced veterans with promising newcomers. The selection includes captain Siya Kolisi, who will lead the team through what promises to be a challenging tournament. Several exciting young talents have been included, signaling the coach's commitment to building depth for future competitions.",
    category: "Sports",
    source: "SuperSport",
    publishedAt: "2024-01-15T08:15:00Z",
    imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    url: "https://supersport.com/springboks-squad-announcement",
    views: 6700,
    isTrending: false
  },
  {
    id: "6",
    title: "Innovation Hub Launches AI Research Center",
    description: "South Africa's first dedicated artificial intelligence research facility opens with international partnerships.",
    content: "The Innovation Hub in Gauteng has officially launched South Africa's first dedicated artificial intelligence research center, marking a significant milestone in the country's technological advancement. The facility will focus on developing AI solutions for healthcare, agriculture, and financial services, with particular emphasis on addressing uniquely African challenges.",
    category: "Technology",
    source: "TechCentral",
    publishedAt: "2024-01-14T14:30:00Z",
    imageUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    url: "https://techcentral.co.za/ai-research-center-launch",
    views: 4200,
    isTrending: false
  }
];

export class NewsService {
  private static articles: NewsArticle[] = [...mockNewsData];

  static async getAllArticles(): Promise<NewsArticle[]> {
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

  static async getHeadlinesOnly(): Promise<NewsArticle[]> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return this.articles.filter(article => article.category === 'Headlines');
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
    const headlines = this.articles.filter(article => article.category === 'Headlines');
    return headlines.slice(0, limit);
  }

  static async addArticle(article: NewsArticle): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 300));
    this.articles.unshift(article);
  }

  static async updateArticle(updatedArticle: NewsArticle): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = this.articles.findIndex(article => article.id === updatedArticle.id);
    if (index !== -1) {
      this.articles[index] = updatedArticle;
    }
  }

  static async deleteArticle(id: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 300));
    this.articles = this.articles.filter(article => article.id !== id);
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
