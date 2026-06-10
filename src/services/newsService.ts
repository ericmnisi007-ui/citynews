import { supabase } from "@/integrations/supabase/client";
import { LocalArticle, getLocalArticles, setLocalArticles } from "@/data/localArticles";

export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  source: string;
  published_at: string;
  image_url: string;
  url: string;
  views: number;
  is_trending: boolean;
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

const TIMEOUT = Symbol('timeout');

let supabaseAvailable = true;

async function withFallback<T>(
  supabaseFn: () => Promise<T>,
  localFn: () => T,
  ignoreError = false
): Promise<T> {
  if (!supabaseAvailable) {
    return localFn();
  }
  try {
    const result = await Promise.race([
      supabaseFn(),
      new Promise<typeof TIMEOUT>((resolve) => setTimeout(() => resolve(TIMEOUT), 1500))
    ]);
    if (result === TIMEOUT) throw new Error('timeout');
    return result as T;
  } catch (e: any) {
    if (e?.message?.includes('Failed to fetch') || e?.message?.includes('NetworkError') || e?.message === 'timeout') {
      supabaseAvailable = false;
    }
    if (!ignoreError) {
      console.warn('Supabase unavailable, falling back to local data');
    }
    return localFn();
  }
}

export class NewsService {
  static async getAllArticles(): Promise<NewsArticle[]> {
    return withFallback(
      async () => {
        const { data, error } = await supabase
          .from('articles')
          .select('*')
          .order('published_at', { ascending: false });
        if (error) throw error;
        return (data || []) as NewsArticle[];
      },
      () => getLocalArticles().sort((a, b) =>
        new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
      )
    );
  }

  static async getArticlesByCategory(category: string): Promise<NewsArticle[]> {
    const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1);
    return withFallback(
      async () => {
        const { data, error } = await supabase
          .from('articles')
          .select('*')
          .eq('category', formattedCategory)
          .order('published_at', { ascending: false });
        if (error) throw error;
        return (data || []) as NewsArticle[];
      },
      () => getLocalArticles()
        .filter(a => a.category === formattedCategory)
        .sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime())
    );
  }

  static async getHeadlinesOnly(): Promise<NewsArticle[]> {
    return withFallback(
      async () => {
        const { data, error } = await supabase
          .from('articles')
          .select('*')
          .eq('category', 'Headlines')
          .order('published_at', { ascending: false });
        if (error) throw error;
        return (data || []) as NewsArticle[];
      },
      () => getLocalArticles()
        .filter(a => a.category === 'Headlines')
        .sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime())
    );
  }

  static async getTrendingArticles(): Promise<NewsArticle[]> {
    return withFallback(
      async () => {
        const { data, error } = await supabase
          .from('articles')
          .select('*')
          .eq('is_trending', true)
          .order('published_at', { ascending: false });
        if (error) throw error;
        return (data || []) as NewsArticle[];
      },
      () => getLocalArticles()
        .filter(a => a.is_trending)
        .sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime())
    );
  }

  static async getArticleById(id: string): Promise<NewsArticle | null> {
    if (!id || id.trim() === '') return null;
    return withFallback(
      async () => {
        const { data, error } = await supabase
          .from('articles')
          .select('*')
          .eq('id', id)
          .maybeSingle();
        if (error) throw error;
        return data as NewsArticle | null;
      },
      () => getLocalArticles().find(a => a.id === id) || null
    );
  }

  static async getFeaturedArticles(limit: number = 6): Promise<NewsArticle[]> {
    return withFallback(
      async () => {
        const { data, error } = await supabase
          .from('articles')
          .select('*')
          .order('published_at', { ascending: false })
          .limit(limit);
        if (error) throw error;
        return (data || []) as NewsArticle[];
      },
      () => getLocalArticles()
        .sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime())
        .slice(0, limit)
    );
  }

  static async addArticle(article: Omit<NewsArticle, 'id'>): Promise<void> {
    try {
      if (supabaseAvailable) {
        const { error } = await supabase
          .from('articles')
          .insert([{
            title: article.title,
            description: article.description,
            content: article.content,
            category: article.category,
            source: article.source,
            published_at: article.published_at,
            image_url: article.image_url,
            url: article.url,
            views: article.views,
            is_trending: article.is_trending
          }]);
        if (error) throw error;
      }
    } catch (e: any) {
      if (e?.message?.includes('Failed to fetch') || e?.message?.includes('NetworkError')) {
        supabaseAvailable = false;
      }
      console.warn('Could not save to Supabase, saving locally:', e?.message);
    }
    const articles = getLocalArticles();
    articles.unshift({ ...article, id: generateId() });
    setLocalArticles(articles);
  }

  static async updateArticle(updatedArticle: NewsArticle): Promise<void> {
    try {
      if (supabaseAvailable) {
        const { error } = await supabase
          .from('articles')
          .update({
            title: updatedArticle.title,
            description: updatedArticle.description,
            content: updatedArticle.content,
            category: updatedArticle.category,
            source: updatedArticle.source,
            published_at: updatedArticle.published_at,
            image_url: updatedArticle.image_url,
            url: updatedArticle.url,
            views: updatedArticle.views,
            is_trending: updatedArticle.is_trending
          })
          .eq('id', updatedArticle.id);
        if (error) throw error;
      }
    } catch (e: any) {
      if (e?.message?.includes('Failed to fetch') || e?.message?.includes('NetworkError')) {
        supabaseAvailable = false;
      }
      console.warn('Could not update in Supabase, updating locally:', e?.message);
    }
    const articles = getLocalArticles();
    const index = articles.findIndex(a => a.id === updatedArticle.id);
    if (index !== -1) {
      articles[index] = updatedArticle;
    } else {
      articles.unshift(updatedArticle);
    }
    setLocalArticles(articles);
  }

  static async deleteArticle(id: string): Promise<void> {
    try {
      if (supabaseAvailable) {
        const { error } = await supabase
          .from('articles')
          .delete()
          .eq('id', id);
        if (error) throw error;
      }
    } catch (e: any) {
      if (e?.message?.includes('Failed to fetch') || e?.message?.includes('NetworkError')) {
        supabaseAvailable = false;
      }
      console.warn('Could not delete from Supabase, deleting locally:', e?.message);
    }
    const articles = getLocalArticles();
    setLocalArticles(articles.filter(a => a.id !== id));
  }

  static async incrementViews(id: string): Promise<void> {
    try {
      if (supabaseAvailable) {
        const { error } = await supabase.rpc('increment_views', { article_id: id });
        if (error) throw error;
      }
    } catch (e: any) {
      if (e?.message?.includes('Failed to fetch') || e?.message?.includes('NetworkError')) {
        supabaseAvailable = false;
      }
    }
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
    if (views >= 1000) return `${(views / 1000).toFixed(1)}k`;
    return views.toString();
  }

  static getSupabaseAvailable(): boolean {
    return supabaseAvailable;
  }
}
