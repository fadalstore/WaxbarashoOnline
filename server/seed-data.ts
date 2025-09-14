import { storage } from "./storage";
import type { InsertUser, InsertCategory, InsertCourse, InsertBlogPost } from "@shared/schema";

export async function seedDatabase() {
  console.log('Seeding database with initial data...');
  
  try {
    // Create categories first
    const categories = [
      {
        name: 'Programming',
        nameEn: 'Programming',
        nameSo: 'Barnaamijyada',
        description: 'Learn programming languages and software development',
        slug: 'programming'
      },
      {
        name: 'Digital Marketing', 
        nameEn: 'Digital Marketing',
        nameSo: 'Suuq-Geynta Dijital',
        description: 'Master digital marketing strategies and tools',
        slug: 'digital-marketing'
      },
      {
        name: 'Business',
        nameEn: 'Business', 
        nameSo: 'Ganacsi',
        description: 'Business skills and entrepreneurship',
        slug: 'business'
      },
      {
        name: 'Language Learning',
        nameEn: 'Language Learning',
        nameSo: 'Barashada Luqadaha',
        description: 'Learn new languages effectively',
        slug: 'language-learning'
      }
    ];

    const createdCategories: any[] = [];
    for (const category of categories) {
      try {
        const created = await storage.createCategory(category as InsertCategory);
        createdCategories.push(created);
        console.log(`Created category: ${created.name}`);
      } catch (error) {
        console.log(`Category ${category.name} already exists or error:`, error);
      }
    }

    // Create sample instructors
    const instructors = [
      {
        name: 'Ahmed Mohamed Hassan',
        email: 'ahmed@edusomal.com',
        role: 'instructor' as const,
        bio: 'Software Engineer badan 8 sano oo khibrad leh Python, JavaScript iyo web development. Waxa uu ka shaqeeyay shirkado waaweyn oo tech ah.',
        avatar: '/placeholder-avatar.jpg'
      },
      {
        name: 'Fatima Ali Omar',
        email: 'fatima@edusomal.com', 
        role: 'instructor' as const,
        bio: 'Digital Marketing khabiir ah oo ka shaqeysa shirkado waaweyn. 6 sano oo ay ku shaqeyneysay Facebook Ads, Google Ads iyo Social Media Marketing.',
        avatar: '/placeholder-avatar.jpg'
      },
      {
        name: 'Hassan Yusuf Ahmed',
        email: 'hassan@edusomal.com',
        role: 'instructor' as const, 
        bio: 'Ganacsade guuleystay oo ku takhasusay online business iyo freelancing. Waxa uu caawiyaa dadka inay helaan shaqo online ah.',
        avatar: '/placeholder-avatar.jpg'
      },
      {
        name: 'Khadija Omar Ali',
        email: 'khadija@edusomal.com',
        role: 'instructor' as const,
        bio: 'Arabic language macallimad ah oo leh shahaado master degree ee Arabic Literature. 10 sano oo ay barisa Arabic language.',
        avatar: '/placeholder-avatar.jpg'
      }
    ];

    const createdInstructors: any[] = [];
    for (const instructor of instructors) {
      try {
        const created = await storage.createUser(instructor as InsertUser);
        createdInstructors.push(created);
        console.log(`Created instructor: ${created.name}`);
      } catch (error) {
        console.log(`Instructor ${instructor.name} already exists or error:`, error);
      }
    }

    // Create real courses
    const courses = [
      {
        title: 'Python Programming Bilaaga - Asaasiga ilaa Advanced',
        titleEn: 'Python Programming Basics - From Fundamentals to Advanced',
        titleSo: 'Python Programming Bilaaga - Asaasiga ilaa Advanced',
        description: 'Baro Python programming language-ka ugu muhiimka ah ee tech industry-ga. Koorskan waxa aad ka baran doontaa variables, functions, loops, object-oriented programming, databases, web development iyo wax badan. Waxa kaloo aad samaysan doontaa mashaariic dhabta ah.',
        descriptionEn: 'Learn Python, the most important programming language in the tech industry. In this course, you will learn variables, functions, loops, object-oriented programming, databases, web development and much more. You will also build real projects.',
        descriptionSo: 'Baro Python programming language-ka ugu muhiimka ah ee tech industry-ga. Koorskan waxa aad ka baran doontaa variables, functions, loops, object-oriented programming, databases, web development iyo wax badan. Waxa kaloo aad samaysan doontaa mashaariic dhabta ah.',
        instructorId: '', // Will be set below
        categoryId: '', // Will be set below
        thumbnail: '/assets/generated_images/Programming_course_thumbnail_d1dd9e63.png',
        price: '49.99',
        originalPrice: '99.99',
        level: 'beginner' as const,
        duration: '20 saacadood',
        language: 'both' as const,
        isPublished: true,
        features: ['20+ Video Lessons', 'Downloadable Resources', 'Lifetime Access', 'Certificate of Completion', 'Q&A Support'],
        requirements: ['Computer with internet connection', 'No prior programming experience needed', 'Willingness to learn'],
        learningOutcomes: ['Master Python basics and advanced concepts', 'Build real-world projects', 'Understand web development with Python', 'Database integration skills', 'Career-ready programming skills']
      },
      {
        title: 'Digital Marketing Strategy - Facebook Ads iyo Google Ads',
        titleEn: 'Digital Marketing Strategy - Facebook Ads and Google Ads',
        titleSo: 'Digital Marketing Strategy - Facebook Ads iyo Google Ads',
        description: 'Baro sida loo sameeyo suuq geeynta dijital ah si professional ah. Facebook Ads, Google Ads, Social Media Marketing, Email Marketing, Content Marketing iyo analytics. Waxa aad baran doontaa sida loo maamulo campaigns, targeting, iyo ROI optimization.',
        descriptionEn: 'Learn how to do digital marketing professionally. Facebook Ads, Google Ads, Social Media Marketing, Email Marketing, Content Marketing and analytics. You will learn how to manage campaigns, targeting, and ROI optimization.',
        descriptionSo: 'Baro sida loo sameeyo suuq geeynta dijital ah si professional ah. Facebook Ads, Google Ads, Social Media Marketing, Email Marketing, Content Marketing iyo analytics. Waxa aad baran doontaa sida loo maamulo campaigns, targeting, iyo ROI optimization.',
        instructorId: '',
        categoryId: '',
        thumbnail: '/assets/generated_images/Digital_marketing_course_thumbnail_00effed1.png',
        price: '79.99',
        originalPrice: '149.99',
        level: 'intermediate' as const,
        duration: '25 saacadood',
        language: 'both' as const,
        isPublished: true,
        features: ['25+ In-depth Modules', 'Live Campaign Examples', 'Templates & Tools', 'Advanced Analytics Training', '30-day Money Back Guarantee'],
        requirements: ['Basic computer skills', 'Facebook and Google accounts', 'Small budget for practice ads ($50-100)'],
        learningOutcomes: ['Create effective Facebook ad campaigns', 'Master Google Ads strategies', 'Understand analytics and reporting', 'Build comprehensive marketing funnels', 'Generate leads and sales online']
      },
      {
        title: 'Online Business iyo Freelancing - Hel Shaqo Internet-ka',
        titleEn: 'Online Business and Freelancing - Find Work Online',
        titleSo: 'Online Business iyo Freelancing - Hel Shaqo Internet-ka',
        description: 'Sida loo helo shaqo online ah, loo dhiso profile fiican Upwork, Fiverr iyo platforms kale, loona gaadhayo macaash wanaagsan. Waxa aad baran doontaa client communication, project management, pricing strategies, iyo sida loo dhiso online business.',
        descriptionEn: 'How to find work online, build a good profile on Upwork, Fiverr and other platforms, and achieve good income. You will learn client communication, project management, pricing strategies, and how to build an online business.',
        descriptionSo: 'Sida loo helo shaqo online ah, loo dhiso profile fiican Upwork, Fiverr iyo platforms kale, loona gaadhayo macaash wanaagsan. Waxa aad baran doontaa client communication, project management, pricing strategies, iyo sida loo dhiso online business.',
        instructorId: '',
        categoryId: '',
        thumbnail: '/assets/generated_images/Programming_course_thumbnail_d1dd9e63.png',
        price: '39.99',
        originalPrice: '79.99',
        level: 'beginner' as const,
        duration: '15 saacadood',
        language: 'both' as const,
        isPublished: true,
        features: ['15+ Practical Lessons', 'Profile Templates', 'Real Client Examples', 'Pricing Calculators', 'Community Access'],
        requirements: ['Basic English skills', 'Internet connection', 'Paypal or bank account'],
        learningOutcomes: ['Create compelling freelancer profiles', 'Write winning proposals', 'Manage client relationships professionally', 'Price services competitively', 'Build sustainable online income']
      },
      {
        title: 'Arabic Language Mastery - Af-Carabi Casri ah',
        titleEn: 'Arabic Language Mastery - Modern Arabic',
        titleSo: 'Arabic Language Mastery - Af-Carabi Casri ah',
        description: 'Baro Af-Carabi si degdeg ah oo sahlan. Grammar, vocabulary, conversation, reading iyo writing. Waxa koorskan ku yaal methodology cusub oo sahlan oo ku salaysan real-life situations. Perfect for beginners iyo kuwa doonaya inay horumariyaan xirfadahooda.',
        descriptionEn: 'Learn Arabic quickly and easily. Grammar, vocabulary, conversation, reading and writing. This course features a new and easy methodology based on real-life situations. Perfect for beginners and those who want to improve their skills.',
        descriptionSo: 'Baro Af-Carabi si degdeg ah oo sahlan. Grammar, vocabulary, conversation, reading iyo writing. Waxa koorskan ku yaal methodology cusub oo sahlan oo ku salaysan real-life situations. Perfect for beginners iyo kuwa doonaya inay horumariyaan xirfadahooda.',
        instructorId: '',
        categoryId: '',
        thumbnail: '/assets/generated_images/Digital_marketing_course_thumbnail_00effed1.png',
        price: '59.99',
        originalPrice: '119.99',
        level: 'beginner' as const,
        duration: '30 saacadood',
        language: 'both' as const,
        isPublished: true,
        features: ['30+ Interactive Lessons', 'Audio Pronunciations', 'Cultural Context', 'Progress Tracking', 'Speaking Practice'],
        requirements: ['No prior Arabic knowledge needed', 'Device with audio capability', 'Dedication to practice daily'],
        learningOutcomes: ['Read and write Arabic script', 'Understand basic to intermediate conversations', 'Communicate in everyday situations', 'Grasp essential grammar rules', 'Build vocabulary of 1000+ words']
      }
    ];

    // Set instructor and category IDs
    if (createdInstructors.length > 0 && createdCategories.length > 0) {
      courses[0].instructorId = createdInstructors[0].id; // Ahmed for Python
      courses[0].categoryId = createdCategories[0].id; // Programming
      
      courses[1].instructorId = createdInstructors[1].id; // Fatima for Marketing
      courses[1].categoryId = createdCategories[1].id; // Digital Marketing
      
      courses[2].instructorId = createdInstructors[2].id; // Hassan for Business
      courses[2].categoryId = createdCategories[2].id; // Business
      
      courses[3].instructorId = createdInstructors[3].id; // Khadija for Arabic
      courses[3].categoryId = createdCategories[3].id; // Language Learning
    }

    // Create courses
    for (const course of courses) {
      if (course.instructorId && course.categoryId) {
        try {
          const created = await storage.createCourse(course as InsertCourse);
          console.log(`Created course: ${created.title}`);
        } catch (error) {
          console.log(`Course ${course.title} already exists or error:`, error);
        }
      }
    }

    console.log('✅ Database seeding completed successfully!');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  }
}

// Auto-run the seeding function
seedDatabase().then(() => {
  console.log('Seeding process finished');
  process.exit(0);
}).catch(error => {
  console.error('Seeding failed:', error);
  process.exit(1);
});