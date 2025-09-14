import { 
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
import { IStorage } from "./storage";

export class MemoryStorage implements IStorage {
  private users: Map<string, User> = new Map();
  private courses: Map<string, Course> = new Map();
  private categories: Map<string, Category> = new Map();
  private lessons: Map<string, Lesson> = new Map();
  private enrollments: Map<string, Enrollment> = new Map();
  private reviews: Map<string, Review> = new Map();
  private blogPosts: Map<string, BlogPost> = new Map();
  private blogComments: Map<string, BlogComment> = new Map();
  private cartItems: Map<string, CartItem> = new Map();
  private orders: Map<string, Order> = new Map();
  private orderItems: Map<string, OrderItem> = new Map();

  constructor() {
    this.seedData();
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }

  private seedData() {
    // Seed categories
    const categories = [
      { id: 'cat1', name: 'Programming', nameEn: 'Programming', nameSo: 'Barnaamij', description: 'Programming courses', slug: 'programming' },
      { id: 'cat2', name: 'Digital Marketing', nameEn: 'Digital Marketing', nameSo: 'Suuq-geeynta Dijitaal', description: 'Digital marketing courses', slug: 'digital-marketing' },
      { id: 'cat3', name: 'Business', nameEn: 'Business', nameSo: 'Ganacsi', description: 'Business courses', slug: 'business' }
    ];
    categories.forEach(cat => this.categories.set(cat.id, cat as Category));

    // Seed users (instructors)
    const users = [
      {
        id: 'user1',
        email: 'ahmed@example.com',
        name: 'Ahmed Mohamed',
        role: 'instructor',
        avatar: '/assets/generated_images/Somali_male_instructor_profile_9c05ec6b.png',
        bio: 'Experienced software developer with 10+ years in the industry',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'user2',
        email: 'fatima@example.com',
        name: 'Fatima Ali',
        role: 'instructor',
        avatar: '/assets/generated_images/Somali_female_instructor_profile_d3d40aee.png',
        bio: 'Digital marketing expert and entrepreneur',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    users.forEach(user => this.users.set(user.id, user as User));

    // Seed courses
    const courses = [
      {
        id: 'course1',
        title: 'Python Programming Basics',
        titleEn: 'Python Programming Basics',
        titleSo: 'Python Programming Bilaaga',
        description: 'Learn Python programming from scratch',
        descriptionEn: 'Learn Python programming from scratch with hands-on projects',
        descriptionSo: 'Baro Python programming bilowga ah oo ay weheliyaan mashruuco gacmeed',
        instructorId: 'user1',
        categoryId: 'cat1',
        thumbnail: '/assets/generated_images/Programming_course_thumbnail_d1dd9e63.png',
        price: '29.99',
        originalPrice: '49.99',
        level: 'beginner',
        duration: '8 hours',
        language: 'both',
        isPublished: true,
        features: ['Video Lessons', 'Hands-on Projects', 'Certificate'],
        requirements: ['Basic computer skills'],
        learningOutcomes: ['Learn Python syntax', 'Build projects', 'Understand programming concepts'],
        studentCount: 245,
        rating: '4.8',
        reviewCount: 52,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'course2',
        title: 'Digital Marketing Mastery',
        titleEn: 'Digital Marketing Mastery',
        titleSo: 'Suuq-geeynta Dijitaal ee Horumar',
        description: 'Master digital marketing strategies',
        descriptionEn: 'Master digital marketing strategies for modern businesses',
        descriptionSo: 'Baro xeeladaha suuq-geeynta dijitaal ee ganacsiga casriga ah',
        instructorId: 'user2',
        categoryId: 'cat2',
        thumbnail: '/assets/generated_images/Digital_marketing_course_thumbnail_00effed1.png',
        price: '39.99',
        originalPrice: '59.99',
        level: 'intermediate',
        duration: '12 hours',
        language: 'both',
        isPublished: true,
        features: ['Expert Content', 'Case Studies', 'Templates'],
        requirements: ['Basic business knowledge'],
        learningOutcomes: ['Social media marketing', 'SEO optimization', 'Content strategy'],
        studentCount: 189,
        rating: '4.6',
        reviewCount: 38,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'course3',
        title: 'JavaScript Web Development',
        titleEn: 'JavaScript Web Development',
        titleSo: 'JavaScript Horumarinta Websaydhka',
        description: 'Build modern web applications with JavaScript',
        descriptionEn: 'Build modern web applications with JavaScript and React',
        descriptionSo: 'Dhis websaydhyo casri ah JavaScript iyo React',
        instructorId: 'user1',
        categoryId: 'cat1',
        thumbnail: '/assets/generated_images/Programming_course_thumbnail_d1dd9e63.png',
        price: '34.99',
        originalPrice: null,
        level: 'intermediate',
        duration: '15 hours',
        language: 'both',
        isPublished: true,
        features: ['Live Coding', 'Real Projects', 'Code Reviews'],
        requirements: ['Basic HTML/CSS', 'Programming fundamentals'],
        learningOutcomes: ['JavaScript mastery', 'React framework', 'Web app deployment'],
        studentCount: 156,
        rating: '4.9',
        reviewCount: 31,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'course4',
        title: 'Social Media Marketing',
        titleEn: 'Social Media Marketing',
        titleSo: 'Suuq-geeynta Baraha Bulshada',
        description: 'Grow your brand on social media platforms',
        descriptionEn: 'Grow your brand on social media platforms effectively',
        descriptionSo: 'Kordhi sumadaada baraha bulshada si hufan',
        instructorId: 'user2',
        categoryId: 'cat2',
        thumbnail: '/assets/generated_images/Digital_marketing_course_thumbnail_00effed1.png',
        price: '24.99',
        originalPrice: '39.99',
        level: 'beginner',
        duration: '6 hours',
        language: 'both',
        isPublished: true,
        features: ['Platform Strategies', 'Content Planning', 'Analytics'],
        requirements: ['Social media account'],
        learningOutcomes: ['Platform optimization', 'Content creation', 'Engagement strategies'],
        studentCount: 98,
        rating: '4.7',
        reviewCount: 24,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    courses.forEach(course => this.courses.set(course.id, course as Course));

    // Seed blog posts
    const blogPosts = [
      {
        id: 'blog1',
        title: 'Getting Started with Programming',
        titleEn: 'Getting Started with Programming',
        titleSo: 'Bilowga Barnaamijka',
        excerpt: 'A beginner\'s guide to programming',
        excerptEn: 'A comprehensive beginner\'s guide to programming fundamentals',
        excerptSo: 'Tilmaame dhamaystiran oo loogu talagalay bilowga barnaamijka',
        content: 'Full content here...',
        contentEn: 'Programming is the process of creating instructions for computers...',
        contentSo: 'Barnaamijku waa habka loo abuurayo tilmaamo kombiyuutarada...',
        authorId: 'user1',
        categoryId: 'cat1',
        featuredImage: '/assets/generated_images/Somali_students_learning_digitally_a61f37a8.png',
        tags: ['programming', 'beginner', 'tutorial'],
        isPublished: true,
        publishedAt: new Date(),
        readTime: 5,
        viewCount: 234,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'blog2',
        title: 'Digital Marketing Trends 2024',
        titleEn: 'Digital Marketing Trends 2024',
        titleSo: 'Isbeddellada Suuq-geeynta Dijitaal 2024',
        excerpt: 'Latest trends in digital marketing',
        excerptEn: 'Discover the latest trends shaping digital marketing in 2024',
        excerptSo: 'Ogaada isbeddellada cusub ee qaabeynaya suuq-geeynta dijitaal 2024',
        content: 'Full content here...',
        contentEn: 'Digital marketing continues to evolve rapidly...',
        contentSo: 'Suuq-geeynta dijitaal ayaa sii socdaa isbeddel degdeg ah...',
        authorId: 'user2',
        categoryId: 'cat2',
        featuredImage: '/assets/generated_images/Digital_marketing_course_thumbnail_00effed1.png',
        tags: ['marketing', 'trends', '2024'],
        isPublished: true,
        publishedAt: new Date(),
        readTime: 8,
        viewCount: 189,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'blog3',
        title: 'Building Your First Web App',
        titleEn: 'Building Your First Web App',
        titleSo: 'Dhisidda Websaydhkaaga Ugu Horreeyay',
        excerpt: 'Step-by-step guide to building web applications',
        excerptEn: 'A step-by-step guide to building your first web application',
        excerptSo: 'Tilmaame tallaabo-tallaabo ah oo lagu dhisayo websaydhkaaga ugu horreeyay',
        content: 'Full content here...',
        contentEn: 'Building web applications has become more accessible than ever...',
        contentSo: 'Dhisidda websaydhyada ayaa noqotay mid la heli karo...',
        authorId: 'user1',
        categoryId: 'cat1',
        featuredImage: '/assets/generated_images/Programming_course_thumbnail_d1dd9e63.png',
        tags: ['web development', 'tutorial', 'beginner'],
        isPublished: true,
        publishedAt: new Date(),
        readTime: 12,
        viewCount: 156,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    blogPosts.forEach(post => this.blogPosts.set(post.id, post as BlogPost));
  }

  // User operations
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    for (const user of this.users.values()) {
      if (user.email === email) return user;
    }
    return undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const user: User = {
      id: this.generateId(),
      ...insertUser,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.users.set(user.id, user);
    return user;
  }

  async updateUser(id: string, updates: Partial<InsertUser>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...updates, updatedAt: new Date() };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  // Category operations
  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async getCategory(id: string): Promise<Category | undefined> {
    return this.categories.get(id);
  }

  async createCategory(category: InsertCategory): Promise<Category> {
    const newCategory: Category = {
      id: this.generateId(),
      ...category
    };
    this.categories.set(newCategory.id, newCategory);
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
    let courses = Array.from(this.courses.values()).filter(course => course.isPublished);

    // Apply filters
    if (filters.category) {
      courses = courses.filter(course => course.categoryId === filters.category);
    }
    if (filters.level) {
      courses = courses.filter(course => course.level === filters.level);
    }
    if (filters.priceMin !== undefined) {
      courses = courses.filter(course => parseFloat(course.price) >= filters.priceMin!);
    }
    if (filters.priceMax !== undefined) {
      courses = courses.filter(course => parseFloat(course.price) <= filters.priceMax!);
    }
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      courses = courses.filter(course => 
        course.title.toLowerCase().includes(searchLower) ||
        course.description.toLowerCase().includes(searchLower)
      );
    }
    if (filters.language && filters.language !== 'both') {
      courses = courses.filter(course => course.language === filters.language || course.language === 'both');
    }

    // Sort by creation date (newest first)
    courses.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    // Apply pagination
    if (filters.offset) {
      courses = courses.slice(filters.offset);
    }
    if (filters.limit) {
      courses = courses.slice(0, filters.limit);
    }

    // Join with instructor and category data
    return courses.map(course => {
      const instructor = this.users.get(course.instructorId)!;
      const category = this.categories.get(course.categoryId)!;
      return {
        ...course,
        instructor,
        category
      };
    });
  }

  async getCourse(id: string): Promise<Course | undefined> {
    return this.courses.get(id);
  }

  async getCourseWithInstructor(id: string): Promise<(Course & { instructor: User }) | undefined> {
    const course = this.courses.get(id);
    if (!course) return undefined;
    
    const instructor = this.users.get(course.instructorId);
    if (!instructor) return undefined;
    
    return {
      ...course,
      instructor
    };
  }

  async createCourse(course: InsertCourse): Promise<Course> {
    const newCourse: Course = {
      id: this.generateId(),
      ...course,
      studentCount: 0,
      rating: '0',
      reviewCount: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.courses.set(newCourse.id, newCourse);
    return newCourse;
  }

  async updateCourse(id: string, updates: Partial<InsertCourse>): Promise<Course | undefined> {
    const course = this.courses.get(id);
    if (!course) return undefined;
    
    const updatedCourse = { ...course, ...updates, updatedAt: new Date() };
    this.courses.set(id, updatedCourse);
    return updatedCourse;
  }

  async updateCourseStats(id: string, rating: number, reviewCount: number, studentCount: number): Promise<void> {
    const course = this.courses.get(id);
    if (course) {
      course.rating = rating.toString();
      course.reviewCount = reviewCount;
      course.studentCount = studentCount;
      course.updatedAt = new Date();
      this.courses.set(id, course);
    }
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
    let posts = Array.from(this.blogPosts.values());

    // Apply filters
    if (filters.published !== undefined) {
      posts = posts.filter(post => post.isPublished === filters.published);
    }
    if (filters.category) {
      posts = posts.filter(post => post.categoryId === filters.category);
    }
    if (filters.author) {
      posts = posts.filter(post => post.authorId === filters.author);
    }
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      posts = posts.filter(post => 
        post.title.toLowerCase().includes(searchLower) ||
        post.excerpt.toLowerCase().includes(searchLower)
      );
    }
    if (filters.tags && filters.tags.length > 0) {
      posts = posts.filter(post => 
        filters.tags!.some(tag => post.tags.includes(tag))
      );
    }

    // Sort by creation date (newest first)
    posts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    // Apply pagination
    if (filters.offset) {
      posts = posts.slice(filters.offset);
    }
    if (filters.limit) {
      posts = posts.slice(0, filters.limit);
    }

    // Join with author and category data
    return posts.map(post => {
      const author = this.users.get(post.authorId)!;
      const category = post.categoryId ? this.categories.get(post.categoryId) : undefined;
      return {
        ...post,
        author,
        category
      };
    });
  }

  async getBlogPost(id: string): Promise<(BlogPost & { author: User; category?: Category }) | undefined> {
    const post = this.blogPosts.get(id);
    if (!post) return undefined;
    
    const author = this.users.get(post.authorId);
    if (!author) return undefined;
    
    const category = post.categoryId ? this.categories.get(post.categoryId) : undefined;
    
    return {
      ...post,
      author,
      category
    };
  }

  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    const newPost: BlogPost = {
      id: this.generateId(),
      ...post,
      viewCount: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.blogPosts.set(newPost.id, newPost);
    return newPost;
  }

  async updateBlogPost(id: string, updates: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const post = this.blogPosts.get(id);
    if (!post) return undefined;
    
    const updatedPost = { ...post, ...updates, updatedAt: new Date() };
    this.blogPosts.set(id, updatedPost);
    return updatedPost;
  }

  async incrementBlogPostViews(id: string): Promise<void> {
    const post = this.blogPosts.get(id);
    if (post) {
      post.viewCount += 1;
      this.blogPosts.set(id, post);
    }
  }

  // Other operations (simplified implementations)
  async getCourseLessons(courseId: string): Promise<Lesson[]> { return []; }
  async getLesson(id: string): Promise<Lesson | undefined> { return undefined; }
  async createLesson(lesson: InsertLesson): Promise<Lesson> { 
    const newLesson = { id: this.generateId(), ...lesson, createdAt: new Date() } as Lesson;
    this.lessons.set(newLesson.id, newLesson);
    return newLesson;
  }
  async updateLesson(id: string, updates: Partial<InsertLesson>): Promise<Lesson | undefined> { return undefined; }

  async getUserEnrollments(userId: string): Promise<(Enrollment & { course: Course })[]> { return []; }
  async getCourseEnrollments(courseId: string): Promise<(Enrollment & { user: User })[]> { return []; }
  async enrollUser(enrollment: InsertEnrollment): Promise<Enrollment> { 
    const newEnrollment = { id: this.generateId(), ...enrollment, enrolledAt: new Date() } as Enrollment;
    this.enrollments.set(newEnrollment.id, newEnrollment);
    return newEnrollment;
  }
  async updateEnrollmentProgress(userId: string, courseId: string, progress: number, completedLessons: string[]): Promise<void> {}
  async isUserEnrolled(userId: string, courseId: string): Promise<boolean> { return false; }

  async getCourseReviews(courseId: string): Promise<(Review & { user: User })[]> { return []; }
  async getUserReview(userId: string, courseId: string): Promise<Review | undefined> { return undefined; }
  async createReview(review: InsertReview): Promise<Review> { 
    const newReview = { id: this.generateId(), ...review, createdAt: new Date() } as Review;
    this.reviews.set(newReview.id, newReview);
    return newReview;
  }
  async updateReview(id: string, updates: Partial<InsertReview>): Promise<Review | undefined> { return undefined; }

  async getPostComments(postId: string): Promise<(BlogComment & { user: User })[]> { return []; }
  async createBlogComment(comment: InsertBlogComment): Promise<BlogComment> { 
    const newComment = { id: this.generateId(), ...comment, createdAt: new Date() } as BlogComment;
    this.blogComments.set(newComment.id, newComment);
    return newComment;
  }
  async updateBlogComment(id: string, updates: Partial<InsertBlogComment>): Promise<BlogComment | undefined> { return undefined; }

  async getUserCart(userId: string): Promise<(CartItem & { course: Course })[]> { return []; }
  async addToCart(cartItem: InsertCartItem): Promise<CartItem> { 
    const newCartItem = { id: this.generateId(), ...cartItem, addedAt: new Date() } as CartItem;
    this.cartItems.set(newCartItem.id, newCartItem);
    return newCartItem;
  }
  async updateCartItemQuantity(userId: string, courseId: string, quantity: number): Promise<void> {}
  async removeFromCart(userId: string, courseId: string): Promise<void> {}
  async clearUserCart(userId: string): Promise<void> {}

  async getUserOrders(userId: string): Promise<(Order & { items: (OrderItem & { course: Course })[] })[]> { return []; }
  async getOrder(id: string): Promise<(Order & { items: (OrderItem & { course: Course })[] }) | undefined> { return undefined; }
  async createOrder(order: InsertOrder, items: InsertOrderItem[]): Promise<Order> { 
    const newOrder = { id: this.generateId(), ...order, createdAt: new Date(), updatedAt: new Date() } as Order;
    this.orders.set(newOrder.id, newOrder);
    return newOrder;
  }
  async updateOrderStatus(id: string, status: 'pending' | 'completed' | 'failed' | 'refunded', transactionId?: string): Promise<void> {}
}