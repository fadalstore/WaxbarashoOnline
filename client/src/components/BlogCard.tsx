import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MessageCircle, ArrowRight } from 'lucide-react';

interface BlogCardProps {
  id: string;
  title: string;
  excerpt: string;
  author: {
    name: string;
    avatar?: string;
  };
  publishDate: string;
  readTime: string;
  category: string;
  tags: string[];
  commentCount: number;
  featuredImage: string;
  language?: 'so' | 'en';
  onReadMore?: () => void;
}

export default function BlogCard({
  id,
  title,
  excerpt,
  author,
  publishDate,
  readTime,
  category,
  tags,
  commentCount,
  featuredImage,
  language = 'so',
  onReadMore = () => {}
}: BlogCardProps) {

  const handleCardClick = () => {
    console.log('Blog card clicked:', id);
    onReadMore();
  };

  const handleReadMore = (e: React.MouseEvent) => {
    e.stopPropagation();
    onReadMore();
    console.log('Read more clicked for article:', id);
  };

  const texts = {
    so: {
      readMore: "Akhriso dhameystiran",
      comments: "faallooyin"
    },
    en: {
      readMore: "Read more",
      comments: "comments"
    }
  };

  const text = texts[language];

  return (
    <Card 
      data-testid={`card-blog-${id}`}
      className="hover-elevate cursor-pointer transition-all duration-200 overflow-hidden"
      onClick={handleCardClick}
    >
      {/* Featured Image */}
      <div className="relative">
        <img 
          src={featuredImage} 
          alt={title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 left-3">
          <Badge variant="secondary" className="bg-black/20 text-white backdrop-blur-sm">
            {category}
          </Badge>
        </div>
      </div>

      <CardContent className="p-4">
        {/* Title */}
        <h3 className="font-semibold text-lg mb-2 line-clamp-2 text-card-foreground">
          {title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
          {excerpt}
        </p>

        {/* Author and Date */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Avatar className="w-6 h-6">
              <AvatarImage src={author.avatar} />
              <AvatarFallback className="text-xs">
                {author.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm text-muted-foreground">{author.name}</span>
          </div>
        </div>

        {/* Meta Info */}
        <div className="flex items-center gap-4 mb-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{publishDate}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{readTime}</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageCircle className="w-4 h-4" />
            <span>{commentCount} {text.comments}</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button 
          data-testid={`button-read-more-${id}`}
          variant="outline" 
          onClick={handleReadMore}
          className="w-full group"
        >
          {text.readMore}
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </CardFooter>
    </Card>
  );
}