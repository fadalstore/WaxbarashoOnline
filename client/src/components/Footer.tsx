import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { BookOpen, Facebook, Twitter, Instagram, Youtube, Mail } from 'lucide-react';
import { useState } from 'react';

interface FooterProps {
  language?: 'so' | 'en';
}

export default function Footer({ language = 'so' }: FooterProps) {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = () => {
    console.log('Newsletter subscription:', email);
    setEmail('');
  };

  const texts = {
    so: {
      newsletter: {
        title: "Warkii Cusub",
        description: "Ka hel xog cusub oo ku saabsan koorsooyin cusub iyo talooyinka waxbarashada",
        placeholder: "Emailkaaga ku qor",
        subscribe: "Iska Qor"
      },
      links: {
        courses: "Koorsooyin",
        allCourses: "Dhammaan Koorsooyin",
        freeBoxes: "Koorsooyin Bilaash",
        programming: "Programming",
        digitalMarketing: "Digital Marketing",
        business: "Ganacsi"
      },
      company: {
        title: "Shirkadda", 
        about: "Ku saabsan",
        contact: "Xiriir",
        careers: "Shaqo",
        privacy: "Qarsoodi",
        terms: "Shuruudaha"
      },
      support: {
        title: "Taageero",
        help: "Caawimo",
        faq: "Su'aalaha Badan La Weydiiy",
        community: "Bulshada",
        tutorials: "Casharrada"
      },
      description: "EduSomali waa platform-ka waxbarashada online-ka ee Soomaaliyeed. Waxaan ka caawinaa ardayda inay helaan aqoonta iyo xirfadaha loo baahan yahay mustaqbalka.",
      copyright: "© 2024 EduSomali. Xuquuqda oo dhan way dhowran yihiin."
    },
    en: {
      newsletter: {
        title: "Newsletter",
        description: "Get updates about new courses and learning tips",
        placeholder: "Enter your email",
        subscribe: "Subscribe"
      },
      links: {
        courses: "Courses",
        allCourses: "All Courses",
        freeBoxes: "Free Courses",
        programming: "Programming",
        digitalMarketing: "Digital Marketing", 
        business: "Business"
      },
      company: {
        title: "Company",
        about: "About Us",
        contact: "Contact",
        careers: "Careers",
        privacy: "Privacy Policy",
        terms: "Terms of Service"
      },
      support: {
        title: "Support",
        help: "Help Center",
        faq: "FAQ",
        community: "Community",
        tutorials: "Tutorials"
      },
      description: "EduSomali is the leading Somali online learning platform. We help students gain the knowledge and skills needed for the future.",
      copyright: "© 2024 EduSomali. All rights reserved."
    }
  };

  const text = texts[language];

  return (
    <footer className="bg-muted/30 pt-12 pb-6">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <BookOpen className="w-8 h-8 text-primary" />
              <span className="text-xl font-bold">EduSomali</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {text.description}
            </p>
            
            {/* Social Media */}
            <div className="flex gap-2">
              <Button data-testid="button-facebook" variant="ghost" size="icon">
                <Facebook className="w-4 h-4" />
              </Button>
              <Button data-testid="button-twitter" variant="ghost" size="icon">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button data-testid="button-instagram" variant="ghost" size="icon">
                <Instagram className="w-4 h-4" />
              </Button>
              <Button data-testid="button-youtube" variant="ghost" size="icon">
                <Youtube className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Courses Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">{text.links.courses}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  {text.links.allCourses}
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  {text.links.freeBoxes}
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  {text.links.programming}
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  {text.links.digitalMarketing}
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  {text.links.business}
                </a>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">{text.company.title}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  {text.company.about}
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  {text.company.contact}
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  {text.company.careers}
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  {text.company.privacy}
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  {text.company.terms}
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="font-semibold">{text.newsletter.title}</h3>
            <p className="text-sm text-muted-foreground">
              {text.newsletter.description}
            </p>
            <div className="flex gap-2">
              <Input
                data-testid="input-newsletter"
                placeholder={text.newsletter.placeholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleNewsletterSubmit()}
                className="flex-1"
              />
              <Button 
                data-testid="button-newsletter"
                onClick={handleNewsletterSubmit}
                size="icon"
              >
                <Mail className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        <Separator className="mb-6" />

        {/* Copyright */}
        <div className="text-center text-sm text-muted-foreground">
          {text.copyright}
        </div>
      </div>
    </footer>
  );
}