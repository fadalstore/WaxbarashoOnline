import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, Clock, Users, Play } from 'lucide-react';

interface CourseCardProps {
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
  category: {
    id: string;
    name: string;
    nameEn: string;
    nameSo: string;
    description?: string;
    slug: string;
  };
  language?: 'so' | 'en';
  onEnroll?: () => void;
  onAddToCart?: () => void;
}

export default function CourseCard({
  id,
  title,
  description,
  instructor,
  thumbnail,
  price,
  originalPrice,
  rating,
  reviewCount,
  duration,
  studentCount,
  level,
  category,
  language = 'so',
  onEnroll = () => {},
  onAddToCart = () => {}
}: CourseCardProps) {
  
  const handleCardClick = () => {
    console.log('Course card clicked:', id);
  };

  const handleEnroll = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEnroll();
    console.log('Enroll clicked for course:', id);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart();
    console.log('Add to cart clicked for course:', id);
  };

  const texts = {
    so: {
      enroll: "Iska Qor",
      addToCart: "Ku Dar Kaashada",
      students: "arday",
      reviews: "dib u eegis"
    },
    en: {
      enroll: "Enroll Now",
      addToCart: "Add to Cart",
      students: "students",
      reviews: "reviews"
    }
  };

  const text = texts[language];

  return (
    <Card 
      data-testid={`card-course-${id}`}
      className="hover-elevate cursor-pointer transition-all duration-200 overflow-hidden"
      onClick={handleCardClick}
    >
      {/* Thumbnail */}
      <div className="relative">
        <img 
          src={thumbnail} 
          alt={title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 left-3">
          <Badge variant="secondary" className="bg-black/20 text-white backdrop-blur-sm">
            {language === 'so' ? category.nameSo : category.nameEn}
          </Badge>
        </div>
        <div className="absolute top-3 right-3">
          <Badge variant="outline" className="bg-white/90 backdrop-blur-sm">
            {level}
          </Badge>
        </div>
        <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
          <Button size="icon" variant="secondary" className="bg-white/90 backdrop-blur-sm">
            <Play className="w-6 h-6" />
          </Button>
        </div>
      </div>

      <CardContent className="p-4">
        {/* Title */}
        <h3 className="font-semibold text-lg mb-2 line-clamp-2 text-card-foreground">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {description}
        </p>

        {/* Instructor */}
        <div className="flex items-center gap-2 mb-3">
          <Avatar className="w-6 h-6">
            <AvatarImage src={instructor.avatar} />
            <AvatarFallback className="text-xs">
              {instructor.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm text-muted-foreground">{instructor.name}</span>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 mb-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{rating}</span>
            <span>({reviewCount} {text.reviews})</span>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{studentCount} {text.students}</span>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg font-bold text-primary">${price}</span>
          {originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ${originalPrice}
            </span>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 gap-2">
        <Button 
          data-testid={`button-enroll-${id}`}
          onClick={handleEnroll} 
          className="flex-1"
        >
          {text.enroll}
        </Button>
        <Button 
          data-testid={`button-cart-${id}`}
          variant="outline" 
          onClick={handleAddToCart}
          className="flex-1"
        >
          {text.addToCart}
        </Button>
      </CardFooter>
    </Card>
  );
}