import { useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import FeaturedCourses from '@/components/FeaturedCourses';
import LatestBlog from '@/components/LatestBlog';
import Footer from '@/components/Footer';
import ThemeToggle from '@/components/ThemeToggle';
import ShoppingCart from '@/components/ShoppingCart';

// Mock data - TODO: remove mock functionality
import programmingThumbnail from '@assets/generated_images/Programming_course_thumbnail_d1dd9e63.png';
import marketingThumbnail from '@assets/generated_images/Digital_marketing_course_thumbnail_00effed1.png';

export default function Home() {
  const [language, setLanguage] = useState<'so' | 'en'>('so');
  const [cartItems] = useState([
    {
      id: '1',
      title: 'Python Programming Bilaaga',
      instructor: 'Ahmed Mohamed',
      price: 29,
      originalPrice: 49,
      thumbnail: programmingThumbnail,
      quantity: 1
    }
  ]);

  // Mock featured courses data - TODO: remove mock functionality
  const mockCourses = [
    {
      id: '1',
      title: 'Python Programming Bilaaga',
      description: 'Baro Python programming language-ka ugu muhiimka ah ee tech industry-ga. Waxaad baran doontaa variables, functions, loops iyo wax badan.',
      instructor: {
        name: 'Ahmed Mohamed',
        avatar: '/placeholder-avatar.jpg'
      },
      thumbnail: programmingThumbnail,
      price: 29,
      originalPrice: 49,
      rating: 4.8,
      reviewCount: 234,
      duration: '8 saacadood',
      studentCount: 1250,
      level: 'Bilow' as const,
      category: 'Programming'
    },
    {
      id: '2',
      title: 'Digital Marketing Asaasiga',
      description: 'Baro sida loo sameeyo suuq geeynta dijital ah. Facebook Ads, Google Ads, Social Media Marketing iyo wax badan.',
      instructor: {
        name: 'Fatima Ali',
        avatar: '/placeholder-avatar.jpg'
      },
      thumbnail: marketingThumbnail,
      price: 39,
      originalPrice: 59,
      rating: 4.9,
      reviewCount: 156,
      duration: '12 saacadood',
      studentCount: 890,
      level: 'Dhexe' as const,
      category: 'Marketing'
    },
    {
      id: '3',
      title: 'Freelancing & Online Work',
      description: 'Sida loo helo shaqo online ah, loo dhiso profile fiican, loona gaadhayo macaash wanaagsan.',
      instructor: {
        name: 'Hassan Yusuf',
        avatar: '/placeholder-avatar.jpg'
      },
      thumbnail: programmingThumbnail, // Reusing for demo
      price: 19,
      originalPrice: 35,
      rating: 4.7,
      reviewCount: 89,
      duration: '6 saacadood',
      studentCount: 450,
      level: 'Bilow' as const,
      category: 'Business'
    },
    {
      id: '4',
      title: 'Mobile App Development',
      description: 'Baro sida loo sameeyo apps mobile-ka. React Native, Flutter iyo native development.',
      instructor: {
        name: 'Omar Ali',
        avatar: '/placeholder-avatar.jpg'
      },
      thumbnail: marketingThumbnail, // Reusing for demo
      price: 49,
      originalPrice: 79,
      rating: 4.6,
      reviewCount: 67,
      duration: '15 saacadood',
      studentCount: 320,
      level: 'Horumar' as const,
      category: 'Programming'
    }
  ];

  // Mock blog posts data - TODO: remove mock functionality
  const mockPosts = [
    {
      id: '1',
      title: 'Sida lacag looga sameeyo internet-ka Soomaaliya',
      excerpt: 'Maanta waxa jira fursado badan oo ay dadku lacag kaga sameyn karaan internetka. Waxaan ku tusi doonaa 10 habab oo fudud oo aad lacag uga sameyn kartid internet-ka...',
      author: {
        name: 'Fatima Ali',
        avatar: '/placeholder-avatar.jpg'
      },
      publishDate: 'Janayo 15, 2024',
      readTime: '5 daqiiqo',
      category: 'Lacag sameyn',
      tags: ['internet', 'lacag', 'online work'],
      commentCount: 24,
      featuredImage: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=200&fit=crop'
    },
    {
      id: '2',
      title: 'Sida loo barto Python (bilow ilaa heer sare)',
      excerpt: 'Python waa luuqadda programming-ka ugu fudud ee loo baran karo. Halkan waxaan ku sharxi doonaa sida aad u bilaabi kartid barashada Python-ka...',
      author: {
        name: 'Ahmed Mohamed',
        avatar: '/placeholder-avatar.jpg'
      },
      publishDate: 'Janayo 12, 2024',
      readTime: '8 daqiiqo',
      category: 'Programming',
      tags: ['python', 'programming', 'tutorial'],
      commentCount: 45,
      featuredImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=200&fit=crop'
    },
    {
      id: '3',
      title: 'Top 10 siyaabood oo lacag loogu sameeyo Mobile (2025)',
      excerpt: 'Telefoonkaaga wuxuu noqon karaa aalad lacag ku keentaa haddii aad si fiican u isticmaalto. Waxaan ku tusi doonaa 10 hab oo lacag lagu sameeyo mobile-ka...',
      author: {
        name: 'Hassan Yusuf',
        avatar: '/placeholder-avatar.jpg'
      },
      publishDate: 'Janayo 10, 2024',
      readTime: '6 daqiiqo',
      category: 'Mobile Money',
      tags: ['mobile', 'apps', 'income'],
      commentCount: 18,
      featuredImage: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=200&fit=crop'
    }
  ];

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
          courses={mockCourses}
          language={language}
          onViewAll={handleViewAllCourses}
          onEnrollCourse={handleEnrollCourse}
          onAddToCart={handleAddToCart}
        />

        {/* Latest Blog Posts */}
        <LatestBlog
          posts={mockPosts}
          language={language}
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