import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import CourseCard from './CourseCard';
import { ArrowRight, TrendingUp } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: {
    name: string;
    avatar?: string;
  };
  thumbnail: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  duration: string;
  studentCount: number;
  level: 'Bilow' | 'Dhexe' | 'Horumar' | 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
}

interface FeaturedCoursesProps {
  courses?: Course[];
  language?: 'so' | 'en';
  isLoading?: boolean;
  onViewAll?: () => void;
  onEnrollCourse?: (courseId: string) => void;
  onAddToCart?: (courseId: string) => void;
}

export default function FeaturedCourses({
  courses = [],
  language = 'so',
  isLoading = false,
  onViewAll = () => {},
  onEnrollCourse = () => {},
  onAddToCart = () => {}
}: FeaturedCoursesProps) {

  const handleViewAll = () => {
    onViewAll();
    console.log('View all courses clicked');
  };

  const texts = {
    so: {
      title: "Koorsooyin Muhiim Ah",
      subtitle: "Koorsooyin casri ah oo ay macallimiin khibrad leh diyaariyeen",
      viewAll: "Arki Dhammaan",
      trending: "Caad"
    },
    en: {
      title: "Featured Courses",
      subtitle: "Modern courses prepared by experienced instructors",
      viewAll: "View All",
      trending: "Trending"
    }
  };

  const text = texts[language];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-6 h-6 text-primary" />
              <Badge variant="secondary" className="text-xs">
                {text.trending}
              </Badge>
            </div>
            <h2 className="text-3xl font-bold mb-2">{text.title}</h2>
            <p className="text-muted-foreground max-w-2xl">
              {text.subtitle}
            </p>
          </div>
          
          <Button 
            data-testid="button-view-all-courses"
            variant="outline"
            onClick={handleViewAll}
            className="group"
          >
            {text.viewAll}
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {isLoading ? (
            // Loading skeleton
            Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="space-y-3">
                <Skeleton className="h-48 w-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-8 w-20" />
                  </div>
                </div>
              </div>
            ))
          ) : (
            courses.map((course) => (
              <CourseCard
                key={course.id}
                {...course}
                language={language}
                onEnroll={() => onEnrollCourse(course.id)}
                onAddToCart={() => onAddToCart(course.id)}
              />
            ))
          )}
        </div>

        {/* Empty State */}
        {!isLoading && courses.length === 0 && (
          <div className="text-center py-12">
            <TrendingUp className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              {language === 'so' ? 'Koorsooyin ma jiraan' : 'No courses available'}
            </h3>
            <p className="text-muted-foreground">
              {language === 'so' 
                ? 'Koorsooyin cusub ayaa dhowaan lagu dari doonaa' 
                : 'New courses will be added soon'
              }
            </p>
          </div>
        )}
      </div>
    </section>
  );
}