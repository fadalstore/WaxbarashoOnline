import { sql } from "drizzle-orm";
import { pgTable, text, integer, decimal, boolean, timestamp, varchar, jsonb } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

// Users table (keeping existing ID structure)
export const users = pgTable('users', {
  id: varchar('id').primaryKey().default(sql`gen_random_uuid()`),
  email: text('email').notNull().unique(),
  name: text('name').notNull(),
  role: text('role', { enum: ['student', 'instructor', 'admin'] }).notNull().default('student'),
  avatar: text('avatar'),
  bio: text('bio'),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});

// Course categories
export const categories = pgTable('categories', {
  id: varchar('id').primaryKey().default(sql`gen_random_uuid()`),
  name: text('name').notNull(),
  nameEn: text('name_en').notNull(),
  nameSo: text('name_so').notNull(),
  description: text('description'),
  slug: text('slug').notNull().unique()
});

// Courses table
export const courses = pgTable('courses', {
  id: varchar('id').primaryKey().default(sql`gen_random_uuid()`),
  title: text('title').notNull(),
  titleEn: text('title_en').notNull(),
  titleSo: text('title_so').notNull(),
  description: text('description').notNull(),
  descriptionEn: text('description_en').notNull(),
  descriptionSo: text('description_so').notNull(),
  instructorId: varchar('instructor_id').references(() => users.id).notNull(),
  categoryId: varchar('category_id').references(() => categories.id).notNull(),
  thumbnail: text('thumbnail').notNull(),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  originalPrice: decimal('original_price', { precision: 10, scale: 2 }),
  level: text('level', { enum: ['beginner', 'intermediate', 'advanced'] }).notNull(),
  duration: text('duration').notNull(),
  language: text('language', { enum: ['so', 'en', 'both'] }).notNull().default('both'),
  isPublished: boolean('is_published').default(false),
  features: text('features').array().default([]),
  requirements: text('requirements').array().default([]),
  learningOutcomes: text('learning_outcomes').array().default([]),
  studentCount: integer('student_count').default(0),
  rating: decimal('rating', { precision: 3, scale: 2 }).default('0'),
  reviewCount: integer('review_count').default(0),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});

// Course lessons/modules
export const lessons = pgTable('lessons', {
  id: varchar('id').primaryKey().default(sql`gen_random_uuid()`),
  courseId: varchar('course_id').references(() => courses.id).notNull(),
  title: text('title').notNull(),
  titleEn: text('title_en').notNull(),
  titleSo: text('title_so').notNull(),
  description: text('description'),
  videoUrl: text('video_url'),
  duration: integer('duration'), // in minutes
  order: integer('order').notNull(),
  isPreview: boolean('is_preview').default(false),
  content: text('content'), // lesson content/transcript
  createdAt: timestamp('created_at').defaultNow()
});

// Course enrollments
export const enrollments = pgTable('enrollments', {
  id: varchar('id').primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar('user_id').references(() => users.id).notNull(),
  courseId: varchar('course_id').references(() => courses.id).notNull(),
  progress: integer('progress').default(0), // percentage 0-100
  completedLessons: text('completed_lessons').array().default([]),
  enrolledAt: timestamp('enrolled_at').defaultNow(),
  completedAt: timestamp('completed_at')
});

// Course reviews
export const reviews = pgTable('reviews', {
  id: varchar('id').primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar('user_id').references(() => users.id).notNull(),
  courseId: varchar('course_id').references(() => courses.id).notNull(),
  rating: integer('rating').notNull(), // 1-5
  comment: text('comment'),
  isPublished: boolean('is_published').default(true),
  createdAt: timestamp('created_at').defaultNow()
});

// Blog posts
export const blogPosts = pgTable('blog_posts', {
  id: varchar('id').primaryKey().default(sql`gen_random_uuid()`),
  title: text('title').notNull(),
  titleEn: text('title_en').notNull(),
  titleSo: text('title_so').notNull(),
  excerpt: text('excerpt').notNull(),
  excerptEn: text('excerpt_en').notNull(),
  excerptSo: text('excerpt_so').notNull(),
  content: text('content').notNull(),
  contentEn: text('content_en').notNull(),
  contentSo: text('content_so').notNull(),
  authorId: varchar('author_id').references(() => users.id).notNull(),
  categoryId: varchar('category_id').references(() => categories.id),
  featuredImage: text('featured_image'),
  tags: text('tags').array().default([]),
  isPublished: boolean('is_published').default(false),
  publishedAt: timestamp('published_at'),
  readTime: integer('read_time'), // in minutes
  viewCount: integer('view_count').default(0),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});

// Blog comments
export const blogComments = pgTable('blog_comments', {
  id: varchar('id').primaryKey().default(sql`gen_random_uuid()`),
  postId: varchar('post_id').references(() => blogPosts.id).notNull(),
  userId: varchar('user_id').references(() => users.id).notNull(),
  content: text('content').notNull(),
  parentId: varchar('parent_id'), // for nested comments - self reference handled differently
  isApproved: boolean('is_approved').default(false),
  createdAt: timestamp('created_at').defaultNow()
});

// Shopping cart
export const cartItems = pgTable('cart_items', {
  id: varchar('id').primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar('user_id').references(() => users.id).notNull(),
  courseId: varchar('course_id').references(() => courses.id).notNull(),
  quantity: integer('quantity').default(1),
  addedAt: timestamp('added_at').defaultNow()
});

// Orders/purchases
export const orders = pgTable('orders', {
  id: varchar('id').primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar('user_id').references(() => users.id).notNull(),
  total: decimal('total', { precision: 10, scale: 2 }).notNull(),
  currency: text('currency').default('USD'),
  paymentMethod: text('payment_method', { enum: ['stripe', 'zaad', 'evcplus'] }).notNull(),
  paymentStatus: text('payment_status', { enum: ['pending', 'completed', 'failed', 'refunded'] }).default('pending'),
  paymentIntentId: text('payment_intent_id'), // for Stripe
  transactionId: text('transaction_id'), // for Zaad/EVC+
  metadata: jsonb('metadata'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});

// Order items (courses purchased)
export const orderItems = pgTable('order_items', {
  id: varchar('id').primaryKey().default(sql`gen_random_uuid()`),
  orderId: varchar('order_id').references(() => orders.id).notNull(),
  courseId: varchar('course_id').references(() => courses.id).notNull(),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  quantity: integer('quantity').default(1)
});

// User sessions (for authentication)
export const userSessions = pgTable('user_sessions', {
  id: varchar('id').primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar('user_id').references(() => users.id).notNull(),
  sessionToken: text('session_token').notNull().unique(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').defaultNow()
});

// Zod schemas for validation
export const insertUserSchema = createInsertSchema(users).omit({ 
  id: true, 
  createdAt: true, 
  updatedAt: true 
});

export const insertCategorySchema = createInsertSchema(categories).omit({ 
  id: true 
});

export const insertCourseSchema = createInsertSchema(courses).omit({ 
  id: true, 
  createdAt: true, 
  updatedAt: true,
  studentCount: true,
  rating: true,
  reviewCount: true
}).extend({
  price: z.string().regex(/^\d+(\.\d{1,2})?$/, "Price must be a valid decimal"),
  originalPrice: z.string().regex(/^\d+(\.\d{1,2})?$/, "Original price must be a valid decimal").optional()
});

export const insertLessonSchema = createInsertSchema(lessons).omit({ 
  id: true, 
  createdAt: true 
});

export const insertEnrollmentSchema = createInsertSchema(enrollments).omit({ 
  id: true, 
  enrolledAt: true,
  completedAt: true 
});

export const insertReviewSchema = createInsertSchema(reviews).omit({ 
  id: true, 
  createdAt: true 
});

export const insertBlogPostSchema = createInsertSchema(blogPosts).omit({ 
  id: true, 
  createdAt: true, 
  updatedAt: true,
  publishedAt: true,
  viewCount: true 
});

export const insertBlogCommentSchema = createInsertSchema(blogComments).omit({ 
  id: true, 
  createdAt: true 
});

export const insertCartItemSchema = createInsertSchema(cartItems).omit({ 
  id: true, 
  addedAt: true 
});

export const insertOrderSchema = createInsertSchema(orders).omit({ 
  id: true, 
  createdAt: true, 
  updatedAt: true 
}).extend({
  total: z.string().regex(/^\d+(\.\d{1,2})?$/, "Total must be a valid decimal")
});

export const insertOrderItemSchema = createInsertSchema(orderItems).omit({ 
  id: true 
}).extend({
  price: z.string().regex(/^\d+(\.\d{1,2})?$/, "Price must be a valid decimal")
});

// Type definitions
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Category = typeof categories.$inferSelect;
export type InsertCategory = z.infer<typeof insertCategorySchema>;

export type Course = typeof courses.$inferSelect;
export type InsertCourse = z.infer<typeof insertCourseSchema>;

export type Lesson = typeof lessons.$inferSelect;
export type InsertLesson = z.infer<typeof insertLessonSchema>;

export type Enrollment = typeof enrollments.$inferSelect;
export type InsertEnrollment = z.infer<typeof insertEnrollmentSchema>;

export type Review = typeof reviews.$inferSelect;
export type InsertReview = z.infer<typeof insertReviewSchema>;

export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;

export type BlogComment = typeof blogComments.$inferSelect;
export type InsertBlogComment = z.infer<typeof insertBlogCommentSchema>;

export type CartItem = typeof cartItems.$inferSelect;
export type InsertCartItem = z.infer<typeof insertCartItemSchema>;

export type Order = typeof orders.$inferSelect;
export type InsertOrder = z.infer<typeof insertOrderSchema>;

export type OrderItem = typeof orderItems.$inferSelect;
export type InsertOrderItem = z.infer<typeof insertOrderItemSchema>;

export type UserSession = typeof userSessions.$inferSelect;