import { 
  users, 
  courses, 
  categories, 
  lessons, 
  enrollments, 
  reviews, 
  blogPosts, 
  blogComments, 
  cartItems, 
  orders, 
  orderItems,
  type User, 
  type InsertUser,
  type Course,
  type InsertCourse,
  type Category,
  type InsertCategory,
  type Lesson,
  type InsertLesson,
  type Enrollment,
  type InsertEnrollment,
  type Review,
  type InsertReview,
  type BlogPost,
  type InsertBlogPost,
  type BlogComment,
  type InsertBlogComment,
  type CartItem,
  type InsertCartItem,
  type Order,
  type InsertOrder,
  type OrderItem,
  type InsertOrderItem
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, sql, ilike, gte, lte, inArray } from "drizzle-orm";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, updates: Partial<InsertUser>): Promise<User | undefined>;

  // Category operations
  getCategories(): Promise<Category[]>;
  getCategory(id: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;

  // Course operations
  getCourses(filters?: {
    category?: string;
    level?: string;
    priceMin?: number;
    priceMax?: number;
    search?: string;
    language?: string;
    limit?: number;
    offset?: number;
  }): Promise<(Course & { instructor: User; category: Category })[]>;
  getCourse(id: string): Promise<Course | undefined>;
  getCourseWithInstructor(id: string): Promise<(Course & { instructor: User }) | undefined>;
  createCourse(course: InsertCourse): Promise<Course>;
  updateCourse(id: string, updates: Partial<InsertCourse>): Promise<Course | undefined>;
  updateCourseStats(id: string, rating: number, reviewCount: number, studentCount: number): Promise<void>;

  // Lesson operations
  getCourseLessons(courseId: string): Promise<Lesson[]>;
  getLesson(id: string): Promise<Lesson | undefined>;
  createLesson(lesson: InsertLesson): Promise<Lesson>;
  updateLesson(id: string, updates: Partial<InsertLesson>): Promise<Lesson | undefined>;

  // Enrollment operations
  getUserEnrollments(userId: string): Promise<(Enrollment & { course: Course })[]>;
  getCourseEnrollments(courseId: string): Promise<(Enrollment & { user: User })[]>;
  enrollUser(enrollment: InsertEnrollment): Promise<Enrollment>;
  updateEnrollmentProgress(userId: string, courseId: string, progress: number, completedLessons: string[]): Promise<void>;
  isUserEnrolled(userId: string, courseId: string): Promise<boolean>;

  // Review operations
  getCourseReviews(courseId: string): Promise<(Review & { user: User })[]>;
  getUserReview(userId: string, courseId: string): Promise<Review | undefined>;
  createReview(review: InsertReview): Promise<Review>;
  updateReview(id: string, updates: Partial<InsertReview>): Promise<Review | undefined>;

  // Blog operations
  getBlogPosts(filters?: {
    category?: string;
    author?: string;
    tags?: string[];
    published?: boolean;
    search?: string;
    limit?: number;
    offset?: number;
  }): Promise<(BlogPost & { author: User; category?: Category })[]>;
  getBlogPost(id: string): Promise<(BlogPost & { author: User; category?: Category }) | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: string, updates: Partial<InsertBlogPost>): Promise<BlogPost | undefined>;
  incrementBlogPostViews(id: string): Promise<void>;

  // Blog comment operations
  getPostComments(postId: string): Promise<(BlogComment & { user: User })[]>;
  createBlogComment(comment: InsertBlogComment): Promise<BlogComment>;
  updateBlogComment(id: string, updates: Partial<InsertBlogComment>): Promise<BlogComment | undefined>;

  // Cart operations
  getUserCart(userId: string): Promise<(CartItem & { course: Course })[]>;
  addToCart(cartItem: InsertCartItem): Promise<CartItem>;
  updateCartItemQuantity(userId: string, courseId: string, quantity: number): Promise<void>;
  removeFromCart(userId: string, courseId: string): Promise<void>;
  clearUserCart(userId: string): Promise<void>;

  // Order operations
  getUserOrders(userId: string): Promise<(Order & { items: (OrderItem & { course: Course })[] })[]>;
  getOrder(id: string): Promise<(Order & { items: (OrderItem & { course: Course })[] }) | undefined>;
  createOrder(order: InsertOrder, items: InsertOrderItem[]): Promise<Order>;
  updateOrderStatus(id: string, status: 'pending' | 'completed' | 'failed' | 'refunded', transactionId?: string): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async updateUser(id: string, updates: Partial<InsertUser>): Promise<User | undefined> {
    const [user] = await db
      .update(users)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    return user || undefined;
  }

  // Category operations
  async getCategories(): Promise<Category[]> {
    return await db.select().from(categories);
  }

  async getCategory(id: string): Promise<Category | undefined> {
    const [category] = await db.select().from(categories).where(eq(categories.id, id));
    return category || undefined;
  }

  async createCategory(category: InsertCategory): Promise<Category> {
    const [newCategory] = await db
      .insert(categories)
      .values(category)
      .returning();
    return newCategory;
  }

  // Course operations
  async getCourses(filters: {
    category?: string;
    level?: string;
    priceMin?: number;
    priceMax?: number;
    search?: string;
    language?: string;
    limit?: number;
    offset?: number;
  } = {}): Promise<(Course & { instructor: User; category: Category })[]> {
    const conditions = [eq(courses.isPublished, true)];

    if (filters.category) {
      conditions.push(eq(courses.categoryId, filters.category));
    }
    if (filters.level) {
      conditions.push(eq(courses.level, filters.level as 'beginner' | 'intermediate' | 'advanced'));
    }
    if (filters.priceMin !== undefined) {
      conditions.push(gte(courses.price, filters.priceMin.toString()));
    }
    if (filters.priceMax !== undefined) {
      conditions.push(lte(courses.price, filters.priceMax.toString()));
    }
    if (filters.search) {
      conditions.push(
        sql`${courses.title} ILIKE ${`%${filters.search}%`} OR ${courses.description} ILIKE ${`%${filters.search}%`}`
      );
    }
    if (filters.language && filters.language !== 'both') {
      conditions.push(sql`${courses.language} = ${filters.language} OR ${courses.language} = 'both'`);
    }

    let query = db
      .select()
      .from(courses)
      .innerJoin(users, eq(courses.instructorId, users.id))
      .innerJoin(categories, eq(courses.categoryId, categories.id));
    
    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    query = query.orderBy(desc(courses.createdAt));

    if (filters.limit && filters.offset) {
      query = query.limit(filters.limit).offset(filters.offset);
    } else if (filters.limit) {
      query = query.limit(filters.limit);
    } else if (filters.offset) {
      query = query.offset(filters.offset);
    }

    const results = await query;
    
    return results.map(result => ({
      ...result.courses,
      instructor: result.users,
      category: result.categories
    }));
  }

  async getCourse(id: string): Promise<Course | undefined> {
    const [course] = await db.select().from(courses).where(eq(courses.id, id));
    return course || undefined;
  }

  async getCourseWithInstructor(id: string): Promise<(Course & { instructor: User }) | undefined> {
    const [result] = await db
      .select()
      .from(courses)
      .innerJoin(users, eq(courses.instructorId, users.id))
      .where(eq(courses.id, id));
    
    if (!result) return undefined;
    
    return {
      ...result.courses,
      instructor: result.users
    };
  }

  async createCourse(course: InsertCourse): Promise<Course> {
    const [newCourse] = await db
      .insert(courses)
      .values(course)
      .returning();
    return newCourse;
  }

  async updateCourse(id: string, updates: Partial<InsertCourse>): Promise<Course | undefined> {
    const [course] = await db
      .update(courses)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(courses.id, id))
      .returning();
    return course || undefined;
  }

  async updateCourseStats(id: string, rating: number, reviewCount: number, studentCount: number): Promise<void> {
    await db
      .update(courses)
      .set({ 
        rating: rating.toString(), 
        reviewCount, 
        studentCount,
        updatedAt: new Date() 
      })
      .where(eq(courses.id, id));
  }

  // Lesson operations
  async getCourseLessons(courseId: string): Promise<Lesson[]> {
    return await db
      .select()
      .from(lessons)
      .where(eq(lessons.courseId, courseId))
      .orderBy(lessons.order);
  }

  async getLesson(id: string): Promise<Lesson | undefined> {
    const [lesson] = await db.select().from(lessons).where(eq(lessons.id, id));
    return lesson || undefined;
  }

  async createLesson(lesson: InsertLesson): Promise<Lesson> {
    const [newLesson] = await db
      .insert(lessons)
      .values(lesson)
      .returning();
    return newLesson;
  }

  async updateLesson(id: string, updates: Partial<InsertLesson>): Promise<Lesson | undefined> {
    const [lesson] = await db
      .update(lessons)
      .set(updates)
      .where(eq(lessons.id, id))
      .returning();
    return lesson || undefined;
  }

  // Enrollment operations
  async getUserEnrollments(userId: string): Promise<(Enrollment & { course: Course })[]> {
    const results = await db
      .select()
      .from(enrollments)
      .innerJoin(courses, eq(enrollments.courseId, courses.id))
      .where(eq(enrollments.userId, userId))
      .orderBy(desc(enrollments.enrolledAt));
    
    return results.map(result => ({
      ...result.enrollments,
      course: result.courses
    }));
  }

  async getCourseEnrollments(courseId: string): Promise<(Enrollment & { user: User })[]> {
    const results = await db
      .select()
      .from(enrollments)
      .innerJoin(users, eq(enrollments.userId, users.id))
      .where(eq(enrollments.courseId, courseId))
      .orderBy(desc(enrollments.enrolledAt));
    
    return results.map(result => ({
      ...result.enrollments,
      user: result.users
    }));
  }

  async enrollUser(enrollment: InsertEnrollment): Promise<Enrollment> {
    const [newEnrollment] = await db
      .insert(enrollments)
      .values(enrollment)
      .returning();
    return newEnrollment;
  }

  async updateEnrollmentProgress(userId: string, courseId: string, progress: number, completedLessons: string[]): Promise<void> {
    await db
      .update(enrollments)
      .set({ 
        progress, 
        completedLessons,
        ...(progress === 100 ? { completedAt: new Date() } : {})
      })
      .where(and(
        eq(enrollments.userId, userId),
        eq(enrollments.courseId, courseId)
      ));
  }

  async isUserEnrolled(userId: string, courseId: string): Promise<boolean> {
    const [enrollment] = await db
      .select()
      .from(enrollments)
      .where(and(
        eq(enrollments.userId, userId),
        eq(enrollments.courseId, courseId)
      ));
    return !!enrollment;
  }

  // Review operations
  async getCourseReviews(courseId: string): Promise<(Review & { user: User })[]> {
    const results = await db
      .select()
      .from(reviews)
      .innerJoin(users, eq(reviews.userId, users.id))
      .where(and(
        eq(reviews.courseId, courseId),
        eq(reviews.isPublished, true)
      ))
      .orderBy(desc(reviews.createdAt));
    
    return results.map(result => ({
      ...result.reviews,
      user: result.users
    }));
  }

  async getUserReview(userId: string, courseId: string): Promise<Review | undefined> {
    const [review] = await db
      .select()
      .from(reviews)
      .where(and(
        eq(reviews.userId, userId),
        eq(reviews.courseId, courseId)
      ));
    return review || undefined;
  }

  async createReview(review: InsertReview): Promise<Review> {
    const [newReview] = await db
      .insert(reviews)
      .values(review)
      .returning();
    return newReview;
  }

  async updateReview(id: string, updates: Partial<InsertReview>): Promise<Review | undefined> {
    const [review] = await db
      .update(reviews)
      .set(updates)
      .where(eq(reviews.id, id))
      .returning();
    return review || undefined;
  }

  // Blog operations
  async getBlogPosts(filters: {
    category?: string;
    author?: string;
    tags?: string[];
    published?: boolean;
    search?: string;
    limit?: number;
    offset?: number;
  } = {}): Promise<(BlogPost & { author: User; category?: Category })[]> {
    const conditions: any[] = [];

    if (filters.published !== undefined) {
      conditions.push(eq(blogPosts.isPublished, filters.published));
    }
    if (filters.category) {
      conditions.push(eq(blogPosts.categoryId, filters.category));
    }
    if (filters.author) {
      conditions.push(eq(blogPosts.authorId, filters.author));
    }
    if (filters.search) {
      conditions.push(
        sql`${blogPosts.title} ILIKE ${`%${filters.search}%`} OR ${blogPosts.excerpt} ILIKE ${`%${filters.search}%`}`
      );
    }
    if (filters.tags && filters.tags.length > 0) {
      conditions.push(sql`${blogPosts.tags} && ${filters.tags}`);
    }

    const baseQuery = db
      .select()
      .from(blogPosts)
      .innerJoin(users, eq(blogPosts.authorId, users.id))
      .leftJoin(categories, eq(blogPosts.categoryId, categories.id));

    let query = baseQuery;

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    query = query.orderBy(desc(blogPosts.createdAt));

    if (filters.limit) {
      query = query.limit(filters.limit);
    }
    if (filters.offset) {
      query = query.offset(filters.offset);
    }

    const results = await query;
    
    return results.map(result => ({
      ...result.blog_posts,
      author: result.users,
      category: result.categories || undefined
    }));
  }

  async getBlogPost(id: string): Promise<(BlogPost & { author: User; category?: Category }) | undefined> {
    const [result] = await db
      .select()
      .from(blogPosts)
      .innerJoin(users, eq(blogPosts.authorId, users.id))
      .leftJoin(categories, eq(blogPosts.categoryId, categories.id))
      .where(eq(blogPosts.id, id));
    
    if (!result) return undefined;
    
    return {
      ...result.blog_posts,
      author: result.users,
      category: result.categories || undefined
    };
  }

  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    const [newPost] = await db
      .insert(blogPosts)
      .values(post)
      .returning();
    return newPost;
  }

  async updateBlogPost(id: string, updates: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const [post] = await db
      .update(blogPosts)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(blogPosts.id, id))
      .returning();
    return post || undefined;
  }

  async incrementBlogPostViews(id: string): Promise<void> {
    await db
      .update(blogPosts)
      .set({ viewCount: sql`${blogPosts.viewCount} + 1` })
      .where(eq(blogPosts.id, id));
  }

  // Blog comment operations
  async getPostComments(postId: string): Promise<(BlogComment & { user: User })[]> {
    const results = await db
      .select()
      .from(blogComments)
      .innerJoin(users, eq(blogComments.userId, users.id))
      .where(and(
        eq(blogComments.postId, postId),
        eq(blogComments.isApproved, true)
      ))
      .orderBy(blogComments.createdAt);
    
    return results.map(result => ({
      ...result.blog_comments,
      user: result.users
    }));
  }

  async createBlogComment(comment: InsertBlogComment): Promise<BlogComment> {
    const [newComment] = await db
      .insert(blogComments)
      .values(comment)
      .returning();
    return newComment;
  }

  async updateBlogComment(id: string, updates: Partial<InsertBlogComment>): Promise<BlogComment | undefined> {
    const [comment] = await db
      .update(blogComments)
      .set(updates)
      .where(eq(blogComments.id, id))
      .returning();
    return comment || undefined;
  }

  // Cart operations
  async getUserCart(userId: string): Promise<(CartItem & { course: Course })[]> {
    const results = await db
      .select()
      .from(cartItems)
      .innerJoin(courses, eq(cartItems.courseId, courses.id))
      .where(eq(cartItems.userId, userId))
      .orderBy(desc(cartItems.addedAt));
    
    return results.map(result => ({
      ...result.cart_items,
      course: result.courses
    }));
  }

  async addToCart(cartItem: InsertCartItem): Promise<CartItem> {
    const [newCartItem] = await db
      .insert(cartItems)
      .values(cartItem)
      .returning();
    return newCartItem;
  }

  async updateCartItemQuantity(userId: string, courseId: string, quantity: number): Promise<void> {
    await db
      .update(cartItems)
      .set({ quantity })
      .where(and(
        eq(cartItems.userId, userId),
        eq(cartItems.courseId, courseId)
      ));
  }

  async removeFromCart(userId: string, courseId: string): Promise<void> {
    await db
      .delete(cartItems)
      .where(and(
        eq(cartItems.userId, userId),
        eq(cartItems.courseId, courseId)
      ));
  }

  async clearUserCart(userId: string): Promise<void> {
    await db
      .delete(cartItems)
      .where(eq(cartItems.userId, userId));
  }

  // Order operations
  async getUserOrders(userId: string): Promise<(Order & { items: (OrderItem & { course: Course })[] })[]> {
    const orderResults = await db
      .select()
      .from(orders)
      .where(eq(orders.userId, userId))
      .orderBy(desc(orders.createdAt));

    const ordersWithItems = await Promise.all(
      orderResults.map(async (order) => {
        const itemResults = await db
          .select()
          .from(orderItems)
          .innerJoin(courses, eq(orderItems.courseId, courses.id))
          .where(eq(orderItems.orderId, order.id));

        const items = itemResults.map(result => ({
          ...result.order_items,
          course: result.courses
        }));

        return {
          ...order,
          items
        };
      })
    );

    return ordersWithItems;
  }

  async getOrder(id: string): Promise<(Order & { items: (OrderItem & { course: Course })[] }) | undefined> {
    const [order] = await db
      .select()
      .from(orders)
      .where(eq(orders.id, id));

    if (!order) return undefined;

    const itemResults = await db
      .select()
      .from(orderItems)
      .innerJoin(courses, eq(orderItems.courseId, courses.id))
      .where(eq(orderItems.orderId, order.id));

    const items = itemResults.map(result => ({
      ...result.order_items,
      course: result.courses
    }));

    return {
      ...order,
      items
    };
  }

  async createOrder(order: InsertOrder, items: InsertOrderItem[]): Promise<Order> {
    const [newOrder] = await db
      .insert(orders)
      .values(order)
      .returning();

    // Add order items
    const orderItemsWithOrderId = items.map(item => ({
      ...item,
      orderId: newOrder.id
    }));

    await db
      .insert(orderItems)
      .values(orderItemsWithOrderId);

    return newOrder;
  }

  async updateOrderStatus(id: string, status: 'pending' | 'completed' | 'failed' | 'refunded', transactionId?: string): Promise<void> {
    await db
      .update(orders)
      .set({ 
        paymentStatus: status,
        ...(transactionId ? { transactionId } : {}),
        updatedAt: new Date()
      })
      .where(eq(orders.id, id));
  }
}

import { MemoryStorage } from "./memory-storage";

// Use memory storage when database is not available
export const storage = new MemoryStorage();