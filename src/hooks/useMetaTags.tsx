
import { useEffect } from 'react';

interface MetaTagsProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  siteName?: string;
}

export const useMetaTags = ({
  title,
  description,
  image,
  url,
  type = 'website',
  siteName = 'City News ZA'
}: MetaTagsProps) => {
  useEffect(() => {
    // Store original meta tags to restore later
    const originalTags: { [key: string]: string } = {};
    
    // Meta tag selectors
    const metaSelectors = [
      'meta[property="og:title"]',
      'meta[property="og:description"]',
      'meta[property="og:image"]',
      'meta[property="og:url"]',
      'meta[property="og:type"]',
      'meta[property="og:site_name"]',
      'meta[name="twitter:title"]',
      'meta[name="twitter:description"]',
      'meta[name="twitter:image"]',
      'meta[name="twitter:url"]',
      'meta[name="twitter:card"]',
      'meta[name="description"]',
      'title'
    ];

    // Store original values
    metaSelectors.forEach(selector => {
      const element = document.querySelector(selector);
      if (element) {
        originalTags[selector] = element.getAttribute('content') || element.textContent || '';
      }
    });

    // Update meta tags
    const updateMetaTag = (selector: string, content: string) => {
      let element = document.querySelector(selector);
      if (!element && (selector.includes('property=') || selector.includes('name='))) {
        element = document.createElement('meta');
        if (selector.includes('property=')) {
          element.setAttribute('property', selector.match(/property="([^"]+)"/)?.[1] || '');
        } else {
          element.setAttribute('name', selector.match(/name="([^"]+)"/)?.[1] || '');
        }
        document.head.appendChild(element);
      }
      
      if (element) {
        if (selector === 'title') {
          element.textContent = content;
        } else {
          element.setAttribute('content', content);
        }
      }
    };

    if (title) {
      const pageTitle = `${title} | City News ZA`;
      updateMetaTag('title', pageTitle);
      updateMetaTag('meta[property="og:title"]', title);
      updateMetaTag('meta[name="twitter:title"]', title);
    }

    if (description) {
      // Ensure description is not too long for social media
      const truncatedDescription = description.length > 160 
        ? description.substring(0, 160) + '...' 
        : description;
      updateMetaTag('meta[name="description"]', truncatedDescription);
      updateMetaTag('meta[property="og:description"]', truncatedDescription);
      updateMetaTag('meta[name="twitter:description"]', truncatedDescription);
    }

    if (image) {
      // Ensure the image URL is absolute and publicly accessible
      const imageUrl = image.startsWith('http') ? image : `https://cnza.lovable.app${image}`;
      updateMetaTag('meta[property="og:image"]', imageUrl);
      updateMetaTag('meta[name="twitter:image"]', imageUrl);
      
      // Add additional image meta tags for better social media support
      updateMetaTag('meta[property="og:image:width"]', '1200');
      updateMetaTag('meta[property="og:image:height"]', '630');
      updateMetaTag('meta[property="og:image:type"]', 'image/jpeg');
      updateMetaTag('meta[property="og:image:alt"]', title || 'City News ZA Article');
    }

    if (url) {
      // Ensure the URL is absolute and uses the correct domain
      const absoluteUrl = url.startsWith('http') ? url : `https://cnza.lovable.app${url}`;
      updateMetaTag('meta[property="og:url"]', absoluteUrl);
      updateMetaTag('meta[name="twitter:url"]', absoluteUrl);
      
      // Add canonical URL
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute('href', absoluteUrl);
    }

    // Set article type and site info
    updateMetaTag('meta[property="og:type"]', type);
    updateMetaTag('meta[property="og:site_name"]', siteName);

    // Ensure Twitter card is set to large image for better previews
    updateMetaTag('meta[name="twitter:card"]', 'summary_large_image');
    updateMetaTag('meta[name="twitter:site"]', '@CityNewsZA');

    // Add additional structured data for articles
    if (type === 'article') {
      updateMetaTag('meta[property="article:publisher"]', 'City News ZA');
      updateMetaTag('meta[property="og:locale"]', 'en_ZA');
    }

    console.log('Meta tags updated for:', title || 'page');
    console.log('Image URL:', image);
    console.log('Page URL:', url);

    // Cleanup function to restore original meta tags
    return () => {
      Object.entries(originalTags).forEach(([selector, content]) => {
        const element = document.querySelector(selector);
        if (element) {
          if (selector === 'title') {
            element.textContent = content;
          } else {
            element.setAttribute('content', content);
          }
        }
      });
    };
  }, [title, description, image, url, type, siteName]);
};
