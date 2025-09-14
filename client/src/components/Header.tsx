import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator 
} from '@/components/ui/dropdown-menu';
import { Search, ShoppingCart, Globe, User, BookOpen, PenTool, Settings } from 'lucide-react';

interface HeaderProps {
  cartItemCount?: number;
  userRole?: 'student' | 'instructor' | 'admin' | null;
  onLanguageChange?: (lang: 'so' | 'en') => void;
  currentLanguage?: 'so' | 'en';
}

export default function Header({ 
  cartItemCount = 0, 
  userRole = null,
  onLanguageChange = () => {},
  currentLanguage = 'so'
}: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    console.log('Search triggered for:', searchQuery);
  };

  const handleCartClick = () => {
    console.log('Cart clicked');
  };

  const handleLoginClick = () => {
    console.log('Login clicked');
  };

  const isLoggedIn = userRole !== null;

  return (
    <header className="sticky top-0 z-50 bg-background border-b">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <BookOpen className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold">EduSomali</span>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                data-testid="input-search"
                placeholder={currentLanguage === 'so' ? "Raadi koorsooyin..." : "Search courses..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="pl-10"
              />
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button data-testid="button-language" variant="ghost" size="sm">
                  <Globe className="w-4 h-4 mr-2" />
                  {currentLanguage === 'so' ? 'SO' : 'EN'}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => onLanguageChange('so')}>
                  Soomaali
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onLanguageChange('en')}>
                  English
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Shopping Cart */}
            <Button 
              data-testid="button-cart"
              variant="ghost" 
              size="icon" 
              className="relative"
              onClick={handleCartClick}
            >
              <ShoppingCart className="w-4 h-4" />
              {cartItemCount > 0 && (
                <Badge variant="destructive" className="absolute -top-2 -right-2 min-w-5 h-5 text-xs">
                  {cartItemCount}
                </Badge>
              )}
            </Button>

            {/* User Menu */}
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button data-testid="button-profile" variant="ghost" size="icon">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src="/placeholder-avatar.jpg" />
                      <AvatarFallback>
                        <User className="w-4 h-4" />
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {userRole === 'student' && (
                    <DropdownMenuItem>
                      <BookOpen className="w-4 h-4 mr-2" />
                      {currentLanguage === 'so' ? 'Koorsadayda' : 'My Courses'}
                    </DropdownMenuItem>
                  )}
                  {userRole === 'instructor' && (
                    <DropdownMenuItem>
                      <PenTool className="w-4 h-4 mr-2" />
                      {currentLanguage === 'so' ? 'Macallinka' : 'Instructor Dashboard'}
                    </DropdownMenuItem>
                  )}
                  {userRole === 'admin' && (
                    <DropdownMenuItem>
                      <Settings className="w-4 h-4 mr-2" />
                      {currentLanguage === 'so' ? 'Maamulka' : 'Admin Panel'}
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Settings className="w-4 h-4 mr-2" />
                    {currentLanguage === 'so' ? 'Degganaashada' : 'Settings'}
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    {currentLanguage === 'so' ? 'Ka bax' : 'Sign Out'}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button data-testid="button-login" onClick={handleLoginClick}>
                {currentLanguage === 'so' ? 'Gal' : 'Sign In'}
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}