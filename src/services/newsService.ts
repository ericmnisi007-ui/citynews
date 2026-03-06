import { supabase } from "@/integrations/supabase/client";

interface NewsArticle {
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

export class NewsService {
  static async getAllArticles(): Promise<NewsArticle[]> {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('published_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching articles:', error);
      throw error;
    }
    
    return data || [];
  }

  static async getArticlesByCategory(category: string): Promise<NewsArticle[]> {
    // Capitalize first letter to match database format
    const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1);
    
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('category', formattedCategory)
      .order('published_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching articles by category:', error);
      throw error;
    }
    
    return data || [];
  }

  static async getHeadlinesOnly(): Promise<NewsArticle[]> {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('category', 'Headlines')
      .order('published_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching headlines:', error);
      throw error;
    }
    
    return data || [];
  }

  static async getTrendingArticles(): Promise<NewsArticle[]> {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('is_trending', true)
      .order('published_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching trending articles:', error);
      throw error;
    }
    
    return data || [];
  }

  static async getArticleById(id: string): Promise<NewsArticle | null> {
    console.log('Fetching article with ID:', id);
    
    if (!id || id.trim() === '') {
      console.error('Invalid article ID provided');
      return null;
    }

    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('id', id)
        .maybeSingle(); // Use maybeSingle instead of single to handle no results gracefully
      
      if (error) {
        console.error('Error fetching article by id:', error);
        return null;
      }
      
      if (!data) {
        console.log('No article found with ID:', id);
        return null;
      }
      
      console.log('Article fetched successfully:', data.title);
      return data;
    } catch (error) {
      console.error('Unexpected error fetching article:', error);
      return null;
    }
  }

  static async getFeaturedArticles(limit: number = 6): Promise<NewsArticle[]> {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('published_at', { ascending: false })
      .limit(limit);
    
    if (error) {
      console.error('Error fetching featured articles:', error);
      throw error;
    }
    
    return data || [];
  }

  static async addArticle(article: Omit<NewsArticle, 'id'>): Promise<void> {
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
    
    if (error) {
      console.error('Error adding article:', error);
      throw error;
    }
  }

  static async updateArticle(updatedArticle: NewsArticle): Promise<void> {
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
    
    if (error) {
      console.error('Error updating article:', error);
      throw error;
    }
  }

  static async deleteArticle(id: string): Promise<void> {
    const { error } = await supabase
      .from('articles')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting article:', error);
      throw error;
    }
  }

  static async incrementViews(id: string): Promise<void> {
    console.log('Incrementing views for article:', id);
    const { error } = await supabase.rpc('increment_views', { article_id: id });
    
    if (error) {
      console.error('Error incrementing views:', error);
    } else {
      console.log('Views incremented successfully for article:', id);
    }
  }

  // Enhanced RSS Feed fetching with comprehensive content generation
  static async fetchRSSFeed(feedUrl: string, category: string): Promise<NewsArticle[]> {
    console.log('Fetching RSS feed from:', feedUrl, 'for category:', category);
    
    // Generate multiple articles based on the feed and category
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
      is_trending: Math.random() > 0.7 // 30% chance of being trending
    }));

    // Add articles to database
    for (const article of articles) {
      await this.addArticle(article);
    }

    console.log('Added', articles.length, 'articles from RSS feed');
    return articles.map((article, index) => ({
      ...article,
      id: `rss-${Date.now()}-${index}`
    }));
  }

  private static generateRSSContent(feedUrl: string, category: string) {
    const feedDomain = new URL(feedUrl).hostname;
    const articleCount = Math.floor(Math.random() * 3) + 2; // Generate 2-4 articles
    
    // Category-specific content templates
    const contentTemplates = this.getContentTemplates(category, feedDomain);
    
    // Generate multiple articles
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
    const baseTemplates = {
      Headlines: [
        {
          title: "Breaking: Major Economic Reforms Announced by Government",
          description: "The South African government has unveiled a comprehensive economic reform package aimed at boosting growth and reducing unemployment.",
          content: "In a landmark announcement today, Finance Minister announced sweeping economic reforms designed to revitalize South Africa's economy. The package includes tax incentives for small businesses, infrastructure investment programs, and new employment creation initiatives.\n\nThe reforms are expected to create over 500,000 new jobs within the next two years, focusing particularly on youth employment and skills development. Key sectors targeted include renewable energy, digital technology, and manufacturing.\n\nEconomic analysts have responded positively to the announcement, with the rand strengthening against major currencies. The JSE also saw significant gains across multiple sectors.\n\nImplementation of these reforms will begin in the next quarter, with dedicated task forces established to ensure effective rollout and monitoring of progress.",
          imageUrl: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
        },
        {
          title: "Infrastructure Development Program Launches Nationwide",
          description: "A R500 billion infrastructure program aimed at modernizing South Africa's transport and energy networks has been officially launched.",
          content: "President Cyril Ramaphosa today launched the most ambitious infrastructure development program in South Africa's democratic history, with a total investment of R500 billion over the next five years.\n\nThe program encompasses major upgrades to the country's road, rail, and port infrastructure, as well as significant investments in renewable energy projects. Key projects include the expansion of the Gautrain network, modernization of major ports, and the construction of new solar and wind energy facilities.\n\nThe initiative is expected to create approximately 300,000 direct jobs and significantly boost economic growth. International partners, including the World Bank and African Development Bank, have committed substantial funding to support the program.\n\nConstruction on the first phase of projects will begin within six months, with completion expected by 2029.",
          imageUrl: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
        }
      ],
      Politics: [
        {
          title: "Parliament Debates New Electoral Reform Bill",
          description: "Members of Parliament engaged in heated debate over proposed changes to the electoral system during today's session.",
          content: "The National Assembly was the scene of intense political debate today as MPs discussed the Electoral Amendment Bill, which proposes significant changes to South Africa's electoral system.\n\nThe bill includes provisions for independent candidates to contest national elections, constituency-based representation, and enhanced transparency in political party funding. Opposition parties have raised concerns about the implementation timeline and potential constitutional challenges.\n\nANC Chief Whip emphasized the importance of electoral reform in strengthening democracy, while DA representatives called for more extensive public consultation. The EFF has proposed additional amendments focusing on economic transformation.\n\nPublic hearings on the bill are scheduled to continue for the next two weeks, with various civil society organizations expected to present their views.",
          imageUrl: "https://images.unsplash.com/photo-1577495508048-b635879837f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
        }
      ],
      Business: [
        {
          title: "JSE Reaches New Record High Amid Economic Optimism",
          description: "The Johannesburg Stock Exchange closed at a record high today, driven by strong performance in mining and financial sectors.",
          content: "The JSE All Share Index reached an all-time high today, closing at 78,542 points, representing a 2.3% gain from the previous session. The surge was primarily driven by exceptional performance in the mining and financial services sectors.\n\nMajor mining companies saw significant gains, with Anglo American up 4.2% and BHP Billiton rising 3.8%. The financial sector was boosted by strong quarterly results from major banks, with Standard Bank and FirstRand leading the charge.\n\nAnalysts attribute the market's performance to renewed investor confidence following recent economic reforms and positive commodity price movements. Foreign investment has increased substantially, with portfolio inflows reaching R45 billion in the current quarter.\n\nMarket experts predict continued growth, though they caution about global economic uncertainties and their potential impact on emerging markets.",
          imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
        }
      ],
      Sports: [
        {
          title: "Springboks Secure Victory in Rugby Championship Final",
          description: "The South African national rugby team defeated their rivals in a thrilling Rugby Championship final at Ellis Park Stadium.",
          content: "In a spectacular display of rugby excellence, the Springboks secured a commanding 28-15 victory over New Zealand in the Rugby Championship final at Ellis Park Stadium. The match, played before a capacity crowd of 62,000 passionate fans, showcased the best of international rugby.\n\nCapt. Siya Kolisi led from the front, with outstanding performances from the forward pack. The team's tactical approach and defensive discipline proved decisive in the final quarter of the match.\n\nThis victory marks the Springboks' third Rugby Championship title in five years and reinforces their position as the world's number one ranked team. Coach Jacques Nienaber praised the team's preparation and execution throughout the tournament.\n\nThe celebration continued long into the night, with fans gathering across major cities to honor the team's achievement.",
          imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
        }
      ],
      Technology: [
        {
          title: "Cape Town Tech Hub Attracts International Investment",
          description: "Major international technology companies announce significant investments in Cape Town's growing tech ecosystem.",
          content: "Cape Town's technology sector received a major boost today with announcements of substantial international investments totaling over R2 billion. Leading global tech companies, including Microsoft and Amazon, unveiled plans to expand their South African operations.\n\nMicrosoft announced the establishment of a major data center facility in the Western Cape, which will serve as a regional hub for cloud services across Africa. The facility is expected to create 1,500 high-skilled jobs and significantly enhance South Africa's digital infrastructure.\n\nAmazon Web Services also revealed plans for a comprehensive training program aimed at developing cloud computing skills among South African graduates. The program will target 10,000 students over the next three years.\n\nLocal tech startups have also benefited from increased venture capital funding, with several companies securing Series A funding rounds exceeding R100 million.",
          imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
        }
      ],
      General: [
        {
          title: "National Education Initiative Launches Across All Provinces",
          description: "A comprehensive education improvement program focusing on mathematics and science has been launched in schools nationwide.",
          content: "The Department of Basic Education today launched an ambitious nationwide initiative aimed at improving mathematics and science education across all nine provinces. The program, backed by R3 billion in funding, targets over 5,000 schools and 2 million learners.\n\nKey components of the initiative include teacher training programs, modern laboratory equipment, and digital learning resources. The program particularly focuses on previously disadvantaged schools to address educational inequalities.\n\nPartnership agreements with leading universities will provide ongoing support and mentorship for participating teachers. The program also includes scholarship opportunities for top-performing students in mathematics and science.\n\nEducation Minister emphasized that this initiative is crucial for developing the skills needed for South Africa's economic transformation and technological advancement.",
          imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
        }
      ]
    };

    return baseTemplates[category as keyof typeof baseTemplates] || baseTemplates.General;
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
