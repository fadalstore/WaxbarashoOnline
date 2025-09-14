import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Play, Users, BookOpen, Award } from 'lucide-react';
import { useState } from 'react';
import heroImage from '@assets/generated_images/Somali_students_learning_digitally_a61f37a8.png';

interface HeroProps {
  language?: 'so' | 'en';
}

export default function Hero({ language = 'so' }: HeroProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    console.log('Hero search triggered:', searchQuery);
  };

  const handleGetStarted = () => {
    console.log('Get started clicked');
  };

  const handleWatchDemo = () => {
    console.log('Watch demo clicked');
  };

  const texts = {
    so: {
      title: "Barashada Mustaqbalka",
      subtitle: "Koorsooyin casri ah, macallimiin khibrad leh, iyo shahaado la aqoonsado",
      description: "Ku soo biir boqolkii kun ee ardayda ah ee wax ka bartay EduSomali. Baro xirfado cusub, horumarinta shaqada, ama bilow ganacsi cusub.",
      searchPlaceholder: "Maxaad rabaa inaad barato maanta?",
      getStarted: "Bilaw Hadda",
      watchDemo: "Daawasho Demo",
      stats: {
        students: "10,000+ Arday",
        courses: "500+ Koorso",
        instructors: "100+ Macalin"
      }
    },
    en: {
      title: "Learn For Your Future",
      subtitle: "Modern courses, expert instructors, and recognized certificates",
      description: "Join thousands of students who have learned with EduSomali. Learn new skills, advance your career, or start a new business.",
      searchPlaceholder: "What do you want to learn today?",
      getStarted: "Get Started",
      watchDemo: "Watch Demo",
      stats: {
        students: "10,000+ Students",
        courses: "500+ Courses", 
        instructors: "100+ Instructors"
      }
    }
  };

  const text = texts[language];

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-3xl">
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            {text.title}
          </h1>
          
          <p className="text-xl text-white/90 mb-4">
            {text.subtitle}
          </p>
          
          <p className="text-lg text-white/80 mb-8 max-w-2xl">
            {text.description}
          </p>

          {/* Search Bar */}
          <div className="flex gap-3 mb-8 max-w-md">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                data-testid="input-hero-search"
                placeholder={text.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="pl-12 h-12 bg-white/95 backdrop-blur-sm border-white/20"
              />
            </div>
            <Button 
              data-testid="button-hero-search"
              onClick={handleSearch}
              size="lg"
              className="h-12 px-6"
            >
              <Search className="w-5 h-5" />
            </Button>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button 
              data-testid="button-get-started"
              size="lg"
              onClick={handleGetStarted}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {text.getStarted}
            </Button>
            
            <Button 
              data-testid="button-watch-demo"
              variant="outline"
              size="lg"
              onClick={handleWatchDemo}
              className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
            >
              <Play className="w-5 h-5 mr-2" />
              {text.watchDemo}
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-white">
            <div className="text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start mb-2">
                <Users className="w-6 h-6 mr-2 text-primary" />
                <span className="text-2xl font-bold">{text.stats.students}</span>
              </div>
            </div>
            
            <div className="text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start mb-2">
                <BookOpen className="w-6 h-6 mr-2 text-primary" />
                <span className="text-2xl font-bold">{text.stats.courses}</span>
              </div>
            </div>
            
            <div className="text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start mb-2">
                <Award className="w-6 h-6 mr-2 text-primary" />
                <span className="text-2xl font-bold">{text.stats.instructors}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}