import { LocalArticle, getLocalArticles, setLocalArticles } from "@/data/localArticles";

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

export interface NewsArticle extends LocalArticle {}

export class NewsService {
  static async getAllArticles(): Promise<NewsArticle[]> {
    const articles = getLocalArticles();
    return articles.sort((a, b) => 
      new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
    );
  }

  static async getArticlesByCategory(category: string): Promise<NewsArticle[]> {
    const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1);
    const articles = getLocalArticles();
    return articles
      .filter(article => article.category === formattedCategory)
      .sort((a, b) => 
        new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
      );
  }

  static async getHeadlinesOnly(): Promise<NewsArticle[]> {
    const articles = getLocalArticles();
    return articles
      .filter(article => article.category === 'Headlines')
      .sort((a, b) => 
        new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
      );
  }

  static async getTrendingArticles(): Promise<NewsArticle[]> {
    const articles = getLocalArticles();
    return articles
      .filter(article => article.is_trending)
      .sort((a, b) => 
        new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
      );
  }

  static async getArticleById(id: string): Promise<NewsArticle | null> {
    if (!id || id.trim() === '') {
      console.error('Invalid article ID provided');
      return null;
    }
    const articles = getLocalArticles();
    return articles.find(article => article.id === id) || null;
  }

  static async getFeaturedArticles(limit: number = 6): Promise<NewsArticle[]> {
    const articles = getLocalArticles();
    return articles
      .sort((a, b) => 
        new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
      )
      .slice(0, limit);
  }

  static async addArticle(article: Omit<NewsArticle, 'id'>): Promise<void> {
    const articles = getLocalArticles();
    const newArticle: NewsArticle = {
      ...article,
      id: generateId(),
    };
    articles.unshift(newArticle);
    setLocalArticles(articles);
  }

  static async updateArticle(updatedArticle: NewsArticle): Promise<void> {
    const articles = getLocalArticles();
    const index = articles.findIndex(a => a.id === updatedArticle.id);
    if (index !== -1) {
      articles[index] = updatedArticle;
      setLocalArticles(articles);
    }
  }

  static async deleteArticle(id: string): Promise<void> {
    const articles = getLocalArticles();
    const filtered = articles.filter(a => a.id !== id);
    setLocalArticles(filtered);
  }

  static async incrementViews(id: string): Promise<void> {
    const articles = getLocalArticles();
    const article = articles.find(a => a.id === id);
    if (article) {
      article.views = (article.views || 0) + 1;
      setLocalArticles(articles);
    }
  }

  static async fetchRSSFeed(feedUrl: string, category: string): Promise<NewsArticle[]> {
    const feedContent = this.generateRSSContent(feedUrl, category);
    const articles = feedContent.map((item) => ({
      title: item.title,
      description: item.description,
      content: item.content,
      category: category,
      source: new URL(feedUrl).hostname,
      published_at: new Date().toISOString(),
      image_url: item.imageUrl,
      url: `#/article/${Date.now()}`,
      views: 0,
      is_trending: Math.random() > 0.7
    }));

    for (const article of articles) {
      await this.addArticle(article);
    }

    return articles.map((article, index) => ({
      ...article,
      id: `rss-${Date.now()}-${index}`
    }));
  }

  private static generateRSSContent(feedUrl: string, category: string) {
    const feedDomain = new URL(feedUrl).hostname;
    const articleCount = Math.floor(Math.random() * 3) + 2;
    const contentTemplates = this.getContentTemplates(category, feedDomain);
    const articles = [];
    for (let i = 0; i < articleCount; i++) {
      const template = contentTemplates[i % contentTemplates.length];
      articles.push({
        title: template.title,
        description: template.description,
        content: template.content,
        imageUrl: template.imageUrl
      });
    }
    return articles;
  }

  private static getContentTemplates(category: string, feedDomain: string) {
    const baseTemplates: Record<string, { title: string; description: string; content: string; imageUrl: string }[]> = {
      Headlines: [
        {
          title: "Breaking: Major Economic Reforms Announced by Government",
          description: "The South African government has unveiled a comprehensive economic reform package aimed at boosting growth and reducing unemployment.",
          content: "In a landmark announcement today, Finance Minister announced sweeping economic reforms designed to revitalize South Africa's economy. The package includes tax incentives for small businesses, infrastructure investment programs, and new employment creation initiatives.",
          imageUrl: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
        },
        {
          title: "Infrastructure Development Program Launches Nationwide",
          description: "A R500 billion infrastructure program aimed at modernizing South Africa's transport and energy networks has been officially launched.",
          content: "President Cyril Ramaphosa today launched the most ambitious infrastructure development program in South Africa's democratic history, with a total investment of R500 billion over the next five years.",
          imageUrl: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
        }
      ],
      Politics: [
        {
          title: "Parliament Debates New Electoral Reform Bill",
          description: "Members of Parliament engaged in heated debate over proposed changes to the electoral system during today's session.",
          content: "The National Assembly was the scene of intense political debate today as MPs discussed the Electoral Amendment Bill, which proposes significant changes to South Africa's electoral system.",
          imageUrl: "https://images.unsplash.com/photo-1577495508048-b635879837f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
        }
      ],
      Business: [
        {
          title: "JSE Reaches New Record High Amid Economic Optimism",
          description: "The Johannesburg Stock Exchange closed at a record high today, driven by strong performance in mining and financial sectors.",
          content: "The JSE All Share Index reached an all-time high today, closing at 78,542 points, representing a 2.3% gain from the previous session.",
          imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
        }
      ],
      Sports: [
        {
          title: "Springboks Secure Victory in Rugby Championship Final",
          description: "The South African national rugby team defeated their rivals in a thrilling Rugby Championship final at Ellis Park Stadium.",
          content: "In a spectacular display of rugby excellence, the Springboks secured a commanding 28-15 victory over New Zealand in the Rugby Championship final at Ellis Park Stadium.",
          imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
        }
      ],
      Technology: [
        {
          title: "Cape Town Tech Hub Attracts International Investment",
          description: "Major international technology companies announce significant investments in Cape Town's growing tech ecosystem.",
          content: "Cape Town's technology sector received a major boost today with announcements of substantial international investments totaling over R2 billion.",
          imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
        }
      ],
      General: [
        {
          title: "National Education Initiative Launches Across All Provinces",
          description: "A comprehensive education improvement program focusing on mathematics and science has been launched in schools nationwide.",
          content: "The Department of Basic Education today launched an ambitious nationwide initiative aimed at improving mathematics and science education across all nine provinces.",
          imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
        }
      ]
    };
    return baseTemplates[category] || baseTemplates.General;
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
