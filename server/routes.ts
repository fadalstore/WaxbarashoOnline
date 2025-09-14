import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // prefix all routes with /api
  
  // Categories API
  app.get('/api/categories', async (req, res) => {
    try {
      const categories = await storage.getCategories();
      res.json({ success: true, data: categories });
    } catch (error) {
      console.error('Error fetching categories:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });

  // Courses API
  app.get('/api/courses', async (req, res) => {
    try {
      const { category, level, language, limit, offset, search, priceMin, priceMax } = req.query;
      
      const filters = {
        ...(category && { category: category as string }),
        ...(level && { level: level as string }),
        ...(language && { language: language as string }),
        ...(limit && { limit: parseInt(limit as string) }),
        ...(offset && { offset: parseInt(offset as string) }),
        ...(search && { search: search as string }),
        ...(priceMin && { priceMin: parseFloat(priceMin as string) }),
        ...(priceMax && { priceMax: parseFloat(priceMax as string) })
      };

      const courses = await storage.getCourses(filters);
      res.json({ success: true, data: courses });
    } catch (error) {
      console.error('Error fetching courses:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });

  app.get('/api/courses/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const course = await storage.getCourseWithInstructor(id);
      
      if (!course) {
        return res.status(404).json({ success: false, message: 'Course not found' });
      }

      res.json({ success: true, data: course });
    } catch (error) {
      console.error('Error fetching course:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });

  // Blog Posts API
  app.get('/api/blog', async (req, res) => {
    try {
      const { category, limit, offset, search } = req.query;
      
      const filters = {
        published: true,
        ...(category && { category: category as string }),
        ...(limit && { limit: parseInt(limit as string) }),
        ...(offset && { offset: parseInt(offset as string) }),
        ...(search && { search: search as string })
      };

      const posts = await storage.getBlogPosts(filters);
      res.json({ success: true, data: posts });
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });

  app.get('/api/blog/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const post = await storage.getBlogPost(id);
      
      if (!post) {
        return res.status(404).json({ success: false, message: 'Blog post not found' });
      }

      // Increment view count
      await storage.incrementBlogPostViews(id);

      res.json({ success: true, data: post });
    } catch (error) {
      console.error('Error fetching blog post:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
