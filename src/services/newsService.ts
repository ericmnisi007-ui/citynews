
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

// Utility function to persist data to localStorage
const saveToStorage = (articles: NewsArticle[]) => {
  try {
    localStorage.setItem('news_articles', JSON.stringify(articles));
  } catch (error) {
    console.error('Failed to save articles to localStorage:', error);
  }
};

// Utility function to load data from localStorage
const loadFromStorage = (): NewsArticle[] => {
  try {
    const stored = localStorage.getItem('news_articles');
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Failed to load articles from localStorage:', error);
  }
  return [...mockNewsData];
};

export class NewsService {
  private static articles: NewsArticle[] = loadFromStorage();

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
    saveToStorage(this.articles);
  }

  static async updateArticle(updatedArticle: NewsArticle): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = this.articles.findIndex(article => article.id === updatedArticle.id);
    if (index !== -1) {
      this.articles[index] = updatedArticle;
      saveToStorage(this.articles);
    }
  }

  static async deleteArticle(id: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 300));
    this.articles = this.articles.filter(article => article.id !== id);
    saveToStorage(this.articles);
  }

  static incrementViews(id: string): void {
    const article = this.articles.find(a => a.id === id);
    if (article) {
      article.views += 1;
      saveToStorage(this.articles);
    }
  }

  // RSS Feed fetching with real content
  static async fetchRSSFeed(feedUrl: string, category: string): Promise<NewsArticle[]> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulated RSS parsing with realistic content based on the feed
    const feedContent = this.generateRSSContent(feedUrl, category);
    
    const articles: NewsArticle[] = feedContent.map((item, index) => ({
      id: `rss-${Date.now()}-${index}`,
      title: item.title,
      description: item.description,
      content: item.content,
      category: category,
      source: new URL(feedUrl).hostname,
      publishedAt: new Date().toISOString(),
      imageUrl: item.imageUrl,
      url: `#/article/rss-${Date.now()}-${index}`,
      views: 0,
      isTrending: false
    }));

    // Add articles to storage
    for (const article of articles) {
      this.articles.unshift(article);
    }
    saveToStorage(this.articles);

    return articles;
  }

  private static generateRSSContent(feedUrl: string, category: string) {
    const feedDomain = new URL(feedUrl).hostname;
    
    // Generate content based on the specific RSS feed
    if (feedDomain.includes('iol.co.za')) {
      if (feedUrl.includes('politics')) {
        return [
          {
            title: "DA Calls for Emergency Session on Economic Reforms",
            description: "The Democratic Alliance has requested an urgent parliamentary session to discuss new economic reform proposals.",
            content: "The Democratic Alliance has formally requested an emergency parliamentary session to debate the government's latest economic reform proposals. Party leader John Steenhuisen emphasized the need for immediate action on unemployment and economic growth. The proposed reforms include changes to labor legislation, tax incentives for small businesses, and infrastructure development programs. The DA argues that these measures require urgent implementation to address South Africa's economic challenges.",
            imageUrl: "https://images.unsplash.com/photo-1577495508048-b635879837f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
          },
          {
            title: "EFF Proposes Land Reform Amendment Bill",
            description: "Economic Freedom Fighters introduce new legislation aimed at accelerating land redistribution processes.",
            content: "The Economic Freedom Fighters have tabled a new Land Reform Amendment Bill in Parliament, proposing significant changes to current land redistribution mechanisms. The bill includes provisions for faster expropriation processes and increased compensation for affected communities. EFF leader Julius Malema stated that the proposed legislation aims to address historical injustices while ensuring agricultural productivity. The bill will undergo committee review before parliamentary debate.",
            imageUrl: "https://images.unsplash.com/photo-1586771711003-d5fb3e542c20?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
          }
        ];
      } else if (feedUrl.includes('business')) {
        return [
          {
            title: "JSE Mining Index Surges on Commodity Price Rally",
            description: "South African mining stocks lead market gains as global commodity prices reach new highs.",
            content: "The Johannesburg Stock Exchange mining index surged by 4.2% today, driven by a global rally in commodity prices. Major mining companies including Anglo American, Sasol, and Sibanye-Stillwater posted significant gains. The rally was attributed to increased demand from emerging markets and supply chain disruptions in key producing regions. Mining analysts predict continued strength in the sector as infrastructure development accelerates globally.",
            imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
          },
          {
            title: "Standard Bank Reports Record Quarterly Profits",
            description: "South Africa's largest bank announces strong financial results amid economic recovery.",
            content: "Standard Bank Group has reported record quarterly profits of R8.4 billion, exceeding analyst expectations by 12%. The strong performance was driven by increased lending activity, improved credit loss provisions, and robust investment banking revenues. CEO Sim Tshabalala attributed the results to the bank's digital transformation initiatives and expansion into African markets. The bank announced plans to increase its dividend payout and invest further in technology infrastructure.",
            imageUrl: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
          }
        ];
      } else {
        return [
          {
            title: "Cape Town Water Crisis Shows Signs of Improvement",
            description: "Recent rainfall and conservation efforts contribute to rising dam levels in the Western Cape.",
            content: "Cape Town's water crisis shows significant improvement with dam levels rising to 67% capacity following recent rainfall and ongoing conservation efforts. The City of Cape Town reports that water consumption has decreased by 30% compared to previous years due to successful public awareness campaigns. Mayor Geordin Hill-Lewis announced the relaxation of some water restrictions while emphasizing the need for continued conservation. The city plans to invest R2 billion in water infrastructure over the next five years.",
            imageUrl: "https://images.unsplash.com/photo-1580836619550-7f8b46e1bd89?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
          },
          {
            title: "Gauteng Education Department Launches Digital Learning Initiative",
            description: "New program aims to provide tablets and internet access to underprivileged schools across the province.",
            content: "The Gauteng Department of Education has launched an ambitious digital learning initiative, providing tablets and internet connectivity to 500 previously disadvantaged schools. The R1.2 billion program aims to bridge the digital divide and improve educational outcomes. Education MEC Matome Chiloane stated that the initiative will benefit over 250,000 learners across the province. Teacher training programs are included to ensure effective implementation of digital learning tools.",
            imageUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
          }
        ];
      }
    } else if (feedDomain.includes('supersport.com')) {
      return [
        {
          title: "Bafana Bafana Qualifies for AFCON 2024",
          description: "South Africa secures their place in the Africa Cup of Nations after crucial victory over Morocco.",
          content: "Bafana Bafana has secured qualification for the 2024 Africa Cup of Nations following a thrilling 2-1 victory over Morocco in Cape Town. Goals from Percy Tau and Themba Zwane sealed the crucial win that guarantees South Africa's participation in the continental tournament. Coach Hugo Broos praised the team's resilience and tactical discipline throughout the qualifying campaign. The victory marks South Africa's return to AFCON after missing the previous tournament.",
          imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
        },
        {
          title: "Sharks Secure Dramatic Victory in URC Semi-Final",
          description: "Durban-based team advances to United Rugby Championship final after nail-biting encounter.",
          content: "The Sharks secured a dramatic 28-24 victory over Munster in the United Rugby Championship semi-final at Kings Park Stadium. A last-minute try from Makazole Mapimpi sealed the win in front of a capacity crowd. The victory sends the Sharks to their first URC final, where they will face either Leinster or Ulster. Coach Sean Everitt praised the team's character and the incredible support from the home crowd.",
          imageUrl: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
        }
      ];
    } else if (feedDomain.includes('feedburner.com')) {
      return [
        {
          title: "AI Revolution Transforms South African Banking Sector",
          description: "Major banks implement artificial intelligence solutions to enhance customer service and fraud detection.",
          content: "South African banks are leading the continent's AI revolution with comprehensive implementation of artificial intelligence across their operations. Standard Bank, FNB, and Nedbank have invested heavily in AI-powered chatbots, fraud detection systems, and personalized banking services. The technology has resulted in 40% faster transaction processing and significantly reduced fraud incidents. Industry experts predict AI will reshape the entire financial services landscape in Africa.",
          imageUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
        },
        {
          title: "Machine Learning Startup Raises R50 Million for Agriculture Solutions",
          description: "Cape Town-based company develops AI tools to help farmers optimize crop yields and reduce water usage.",
          content: "AgriTech startup DataFarm has raised R50 million in Series A funding to expand its machine learning solutions for African agriculture. The company's AI platform helps farmers optimize irrigation, predict crop diseases, and maximize yields using satellite imagery and sensor data. Founded in Cape Town, DataFarm has already assisted over 2,000 farmers across South Africa and plans to expand into Kenya and Nigeria. The funding round was led by international venture capital firm Atlantica Ventures.",
          imageUrl: "https://images.unsplash.com/photo-1574923876261-2c38f5c8b75d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
        }
      ];
    }

    // Default content if feed not recognized
    return [
      {
        title: `Breaking News from ${feedDomain}`,
        description: "Latest developments from one of South Africa's leading news sources.",
        content: "This is the latest breaking news story from our newsroom. Our journalists are working around the clock to bring you the most accurate and up-to-date information on the stories that matter most to South Africans. Stay tuned for more updates as this story develops.",
        imageUrl: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
      }
    ];
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
