import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import BlogCard from './BlogCard';
import { ArrowRight, PenTool } from 'lucide-react';

interface BlogPost {
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
}

interface LatestBlogProps {
  posts?: BlogPost[];
  language?: 'so' | 'en';
  isLoading?: boolean;
  onViewAll?: () => void;
  onReadMore?: (postId: string) => void;
}

export default function LatestBlog({
  posts = [],
  language = 'so',
  isLoading = false,
  onViewAll = () => {},
  onReadMore = () => {}
}: LatestBlogProps) {

  const handleViewAll = () => {
    onViewAll();
    console.log('View all blog posts clicked');
  };

  const texts = {
    so: {
      title: "Maqaalladii Ugu Dambeeyay",
      subtitle: "Talooyinka, casharro, iyo fikradaha cusub ee ku saabsan waxbarashada iyo teknoolojiyadda",
      viewAll: "Arki Dhammaan Maqaallada",
      new: "Cusub"
    },
    en: {
      title: "Latest Blog Posts",
      subtitle: "Tips, tutorials, and new ideas about learning and technology",
      viewAll: "View All Articles",
      new: "New"
    }
  };

  const text = texts[language];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <PenTool className="w-6 h-6 text-primary" />
              <Badge variant="secondary" className="text-xs">
                {text.new}
              </Badge>
            </div>
            <h2 className="text-3xl font-bold mb-2">{text.title}</h2>
            <p className="text-muted-foreground max-w-2xl">
              {text.subtitle}
            </p>
          </div>
          
          <Button 
            data-testid="button-view-all-blog"
            variant="outline"
            onClick={handleViewAll}
            className="group"
          >
            {text.viewAll}
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            // Loading skeleton
            Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="space-y-3">
                <Skeleton className="h-48 w-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-1/2" />
                  <div className="flex items-center justify-between mt-4">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                </div>
              </div>
            ))
          ) : (
            posts.map((post) => (
              <BlogCard
                key={post.id}
                {...post}
                language={language}
                onReadMore={() => onReadMore(post.id)}
              />
            ))
          )}
        </div>

        {/* Empty State */}
        {!isLoading && posts.length === 0 && (
          <div className="text-center py-12">
            <PenTool className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              {language === 'so' ? 'Maqaallo ma jiraan' : 'No articles available'}
            </h3>
            <p className="text-muted-foreground">
              {language === 'so' 
                ? 'Maqaallo cusub ayaa dhowaan la daabici doonaa' 
                : 'New articles will be published soon'
              }
            </p>
          </div>
        )}
      </div>
    </section>
  );
}