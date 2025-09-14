import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import FeaturedCourses from '@/components/FeaturedCourses';
import LatestBlog from '@/components/LatestBlog';
import Footer from '@/components/Footer';
import ThemeToggle from '@/components/ThemeToggle';
import ShoppingCart from '@/components/ShoppingCart';

export default function Home() {
  const [language, setLanguage] = useState<'so' | 'en'>('so');
  const [cartItems] = useState([
    {
      id: '1',
      title: 'Python Programming Bilaaga',
      instructor: 'Ahmed Mohamed',
      price: 29,
      originalPrice: 49,
      thumbnail: '/assets/generated_images/Programming_course_thumbnail_d1dd9e63.png',
      quantity: 1
    }
  ]);

  // Fetch courses from API
  const { data: coursesResponse, isLoading: coursesLoading } = useQuery({
    queryKey: ['/api/courses'],
    queryFn: () => fetch('/api/courses?limit=4').then(res => res.json())
  });

  const courses = coursesResponse?.data || [];

  // Fetch blog posts from API
  const { data: blogResponse, isLoading: blogLoading } = useQuery({
    queryKey: ['/api/blog'],
    queryFn: () => fetch('/api/blog?limit=3').then(res => res.json())
  });

  const blogPosts = blogResponse?.data || [];

  const handleEnrollCourse = (courseId: string) => {
    console.log('Enroll in course:', courseId);
    // TODO: implement course enrollment
  };

  const handleAddToCart = (courseId: string) => {
    console.log('Add to cart:', courseId);
    // TODO: implement add to cart functionality
  };

  const handleViewAllCourses = () => {
    console.log('View all courses');
    // TODO: navigate to courses page
  };

  const handleViewAllBlog = () => {
    console.log('View all blog posts');
    // TODO: navigate to blog page
  };

  const handleReadMore = (postId: string) => {
    console.log('Read more:', postId);
    // TODO: navigate to blog post
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header
        cartItemCount={cartItems.length}
        userRole="student"
        currentLanguage={language}
        onLanguageChange={setLanguage}
      />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <Hero language={language} />

        {/* Featured Courses */}
        <FeaturedCourses
          courses={courses.map((course: any) => ({
            id: course.id,
            title: language === 'so' ? course.titleSo : course.titleEn,
            description: language === 'so' ? course.descriptionSo : course.descriptionEn,
            instructor: {
              name: course.instructor?.name || 'Unknown Instructor',
              avatar: course.instructor?.avatar || '/placeholder-avatar.jpg'
            },
            thumbnail: course.thumbnail,
            price: parseFloat(course.price),
            originalPrice: course.originalPrice ? parseFloat(course.originalPrice) : undefined,
            rating: parseFloat(course.rating),
            reviewCount: course.reviewCount,
            duration: course.duration,
            studentCount: course.studentCount,
            level: course.level === 'beginner' ? 'Bilow' : course.level === 'intermediate' ? 'Dhexe' : 'Horumar',
            category: course.category
          }))}
          language={language}
          isLoading={coursesLoading}
          onViewAll={handleViewAllCourses}
          onEnrollCourse={handleEnrollCourse}
          onAddToCart={handleAddToCart}
        />

        {/* Latest Blog Posts */}
        <LatestBlog
          posts={blogPosts.map((post: any) => ({
            id: post.id,
            title: language === 'so' ? post.titleSo : post.titleEn,
            excerpt: language === 'so' ? post.excerptSo : post.excerptEn,
            author: {
              name: post.author?.name || 'Unknown Author',
              avatar: post.author?.avatar || '/placeholder-avatar.jpg'
            },
            publishDate: new Date(post.publishedAt || post.createdAt).toLocaleDateString('so-SO'),
            readTime: `${post.readTime} daqiiqo`,
            category: post.category?.name || 'General',
            tags: post.tags || [],
            commentCount: 0, // TODO: Implement comment counting
            featuredImage: post.featuredImage || 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=200&fit=crop'
          }))}
          language={language}
          isLoading={blogLoading}
          onViewAll={handleViewAllBlog}
          onReadMore={handleReadMore}
        />
      </main>

      {/* Footer */}
      <Footer language={language} />

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-40">
        <ThemeToggle />
        <ShoppingCart
          items={cartItems}
          language={language}
          onUpdateQuantity={(id, quantity) => console.log('Update quantity:', id, quantity)}
          onRemoveItem={(id) => console.log('Remove item:', id)}
          onCheckout={() => console.log('Checkout')}
        />
      </div>
    </div>
  );
}