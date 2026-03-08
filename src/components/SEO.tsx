import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  author?: string;
  ogType?: string;
  ogSiteName?: string;
  robots?: string;
}

const SEO = ({
  title,
  description,
  keywords,
  canonical,
  author = "Arun Reddy",
  ogType = "article",
  ogSiteName = "axiom-systems.netlify.app",
  robots = "index, follow",
}: SEOProps) => {
  useEffect(() => {
    document.title = title;

    const setMeta = (attr: string, key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("name", "description", description);
    setMeta("name", "robots", robots);
    setMeta("name", "author", author);
    if (keywords) setMeta("name", "keywords", keywords);
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:type", ogType);
    setMeta("property", "og:site_name", ogSiteName);

    // Canonical
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    if (canonical) {
      link.setAttribute("href", canonical);
    }

    return () => {
      // Clean up canonical on unmount
      const c = document.querySelector('link[rel="canonical"]');
      if (c) c.remove();
    };
  }, [title, description, keywords, canonical, author, ogType, ogSiteName, robots]);

  return null;
};

export default SEO;
