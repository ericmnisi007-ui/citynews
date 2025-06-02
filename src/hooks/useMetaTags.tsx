
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
      const truncatedDescription = description.length > 150 
        ? description.substring(0, 150) + '...' 
        : description;
      updateMetaTag('meta[property="og:description"]', truncatedDescription);
      updateMetaTag('meta[name="twitter:description"]', truncatedDescription);
    }

    if (image) {
      // Ensure the image URL is absolute
      const imageUrl = image.startsWith('http') ? image : `https://cnza.lovable.app${image}`;
      updateMetaTag('meta[property="og:image"]', imageUrl);
      updateMetaTag('meta[name="twitter:image"]', imageUrl);
      
      // Add additional image meta tags for better social media support
      updateMetaTag('meta[property="og:image:width"]', '1200');
      updateMetaTag('meta[property="og:image:height"]', '630');
      updateMetaTag('meta[property="og:image:type"]', 'image/jpeg');
    }

    if (url) {
      // Ensure the URL is absolute and uses the correct domain
      const absoluteUrl = url.startsWith('http') ? url : `https://cnza.lovable.app${url}`;
      updateMetaTag('meta[property="og:url"]', absoluteUrl);
      updateMetaTag('meta[name="twitter:url"]', absoluteUrl);
    }

    updateMetaTag('meta[property="og:type"]', type);
    updateMetaTag('meta[property="og:site_name"]', siteName);

    // Add additional Twitter and WhatsApp specific meta tags
    updateMetaTag('meta[name="twitter:card"]', 'summary_large_image');

    console.log('Meta tags updated for:', title || 'page');

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
