// Sitemap generator for Google Search Console
import type { Express } from "express";
import { storage } from "./storage";

export function registerSitemapRoutes(app: Express) {
  // Generate XML sitemap
  app.get('/sitemap.xml', async (req, res) => {
    try {
      const baseUrl = `https://${req.get('host')}`;
      
      // Get all published courses and blog posts
      const courses = await storage.getCourses({ limit: 1000 });
      const blogPosts = await storage.getBlogPosts({ published: true, limit: 1000 });
      
      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  
  <!-- Homepage -->
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
    <xhtml:link rel="alternate" hreflang="so" href="${baseUrl}?lang=so"/>
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}?lang=en"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}"/>
  </url>
  
  <!-- Courses Pages -->
  ${courses.map(course => `
  <url>
    <loc>${baseUrl}/courses/${course.id}</loc>
    <lastmod>${course.updatedAt?.toISOString().split('T')[0] || new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="so" href="${baseUrl}/courses/${course.id}?lang=so"/>
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/courses/${course.id}?lang=en"/>
  </url>`).join('')}
  
  <!-- Blog Posts -->
  ${blogPosts.map(post => `
  <url>
    <loc>${baseUrl}/blog/${post.id}</loc>
    <lastmod>${post.updatedAt?.toISOString().split('T')[0] || new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
    <xhtml:link rel="alternate" hreflang="so" href="${baseUrl}/blog/${post.id}?lang=so"/>
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/blog/${post.id}?lang=en"/>
  </url>`).join('')}
  
  <!-- Categories Page -->
  <url>
    <loc>${baseUrl}/courses</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <!-- Blog Page -->
  <url>
    <loc>${baseUrl}/blog</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  
</urlset>`;

      res.set('Content-Type', 'application/xml');
      res.send(sitemap);
    } catch (error) {
      console.error('Error generating sitemap:', error);
      res.status(500).send('Internal server error');
    }
  });

  // Generate robots.txt
  app.get('/robots.txt', (req, res) => {
    const baseUrl = `https://${req.get('host')}`;
    
    const robotsTxt = `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Disallow: /*.json$

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml

# Crawl delay for better server performance
Crawl-delay: 1

# Google AdSense
User-agent: Googlebot
Allow: /

# Social media crawlers
User-agent: facebookexternalhit
Allow: /

User-agent: Twitterbot
Allow: /`;

    res.set('Content-Type', 'text/plain');
    res.send(robotsTxt);
  });
}