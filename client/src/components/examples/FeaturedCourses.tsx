import FeaturedCourses from '../FeaturedCourses';
import programmingThumbnail from '@assets/generated_images/Programming_course_thumbnail_d1dd9e63.png';
import marketingThumbnail from '@assets/generated_images/Digital_marketing_course_thumbnail_00effed1.png';

export default function FeaturedCoursesExample() {
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
    }
  ];

  return (
    <FeaturedCourses
      courses={mockCourses}
      language="so"
      onViewAll={() => console.log('View all courses')}
      onEnrollCourse={(id) => console.log('Enroll in course:', id)}
      onAddToCart={(id) => console.log('Add to cart:', id)}
    />
  );
}