import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Search, Filter, X } from 'lucide-react';

interface CourseFiltersProps {
  language?: 'so' | 'en';
  onFilterChange?: (filters: FilterState) => void;
  onSearch?: (query: string) => void;
}

interface FilterState {
  search: string;
  category: string;
  level: string;
  priceRange: [number, number];
  duration: string;
  rating: number;
  features: string[];
}

export default function CourseFilters({
  language = 'so',
  onFilterChange = () => {},
  onSearch = () => {}
}: CourseFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    category: '',
    level: '',
    priceRange: [0, 100],
    duration: '',
    rating: 0,
    features: []
  });

  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const updateFilter = (key: keyof FilterState, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
    
    // Update active filters for display
    if (value !== '' && value !== 0 && (!Array.isArray(value) || value.length > 0)) {
      if (!activeFilters.includes(key)) {
        setActiveFilters([...activeFilters, key]);
      }
    } else {
      setActiveFilters(activeFilters.filter(f => f !== key));
    }
    
    console.log('Filter updated:', key, value);
  };

  const handleSearch = () => {
    onSearch(filters.search);
    console.log('Search triggered:', filters.search);
  };

  const clearFilter = (key: keyof FilterState) => {
    const defaultValue = key === 'priceRange' ? [0, 100] : 
                        Array.isArray(filters[key]) ? [] : 
                        typeof filters[key] === 'number' ? 0 : '';
    updateFilter(key, defaultValue);
  };

  const clearAllFilters = () => {
    const defaultFilters: FilterState = {
      search: '',
      category: '',
      level: '',
      priceRange: [0, 100],
      duration: '',
      rating: 0,
      features: []
    };
    setFilters(defaultFilters);
    setActiveFilters([]);
    onFilterChange(defaultFilters);
    console.log('All filters cleared');
  };

  const texts = {
    so: {
      search: "Raadi koorsooyin",
      filters: "Shaandhayaal",
      category: "Qaybta",
      level: "Heerka",
      price: "Qiimaha",
      duration: "Mudada",
      rating: "Qiimaynta",
      features: "Sifooyinka",
      clear: "Nadiifi",
      clearAll: "Nadiifi dhammaan",
      categories: {
        all: "Dhammaan",
        programming: "Programming",
        marketing: "Marketing",
        business: "Ganacsi",
        design: "Design",
        language: "Luqad"
      },
      levels: {
        all: "Dhammaan heerarka",
        beginner: "Bilow",
        intermediate: "Dhexe", 
        advanced: "Horumar"
      },
      durations: {
        all: "Dhammaan mudadaha",
        short: "Gaaban (0-2 saac)",
        medium: "Dhexe (2-10 saac)",
        long: "Dheer (10+ saac)"
      },
      featuresOptions: [
        "Shahaado",
        "Video HD",
        "Mashruuc",
        "Taageero",
        "Mobile app"
      ]
    },
    en: {
      search: "Search courses",
      filters: "Filters",
      category: "Category",
      level: "Level",
      price: "Price",
      duration: "Duration",
      rating: "Rating",
      features: "Features",
      clear: "Clear",
      clearAll: "Clear all",
      categories: {
        all: "All categories",
        programming: "Programming",
        marketing: "Marketing",
        business: "Business",
        design: "Design",
        language: "Language"
      },
      levels: {
        all: "All levels",
        beginner: "Beginner",
        intermediate: "Intermediate",
        advanced: "Advanced"
      },
      durations: {
        all: "All durations",
        short: "Short (0-2 hrs)",
        medium: "Medium (2-10 hrs)",
        long: "Long (10+ hrs)"
      },
      featuresOptions: [
        "Certificate",
        "HD Video",
        "Projects",
        "Support",
        "Mobile app"
      ]
    }
  };

  const text = texts[language];

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                data-testid="input-course-search"
                placeholder={text.search}
                value={filters.search}
                onChange={(e) => updateFilter('search', e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="pl-10"
              />
            </div>
            <Button 
              data-testid="button-course-search"
              onClick={handleSearch}
            >
              <Search className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm text-muted-foreground">{text.filters}:</span>
          {activeFilters.map((filterKey) => (
            <Badge 
              key={filterKey} 
              variant="secondary" 
              className="gap-1"
            >
              {text[filterKey as keyof typeof text] as string}
              <button 
                onClick={() => clearFilter(filterKey as keyof FilterState)}
                className="hover:text-destructive"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
          <Button
            data-testid="button-clear-all-filters"
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
          >
            {text.clearAll}
          </Button>
        </div>
      )}

      {/* Filters Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            {text.filters}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Category Filter */}
          <div>
            <label className="text-sm font-medium mb-2 block">{text.category}</label>
            <Select value={filters.category} onValueChange={(value) => updateFilter('category', value)}>
              <SelectTrigger data-testid="select-category">
                <SelectValue placeholder={text.categories.all} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">{text.categories.all}</SelectItem>
                <SelectItem value="programming">{text.categories.programming}</SelectItem>
                <SelectItem value="marketing">{text.categories.marketing}</SelectItem>
                <SelectItem value="business">{text.categories.business}</SelectItem>
                <SelectItem value="design">{text.categories.design}</SelectItem>
                <SelectItem value="language">{text.categories.language}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Level Filter */}
          <div>
            <label className="text-sm font-medium mb-2 block">{text.level}</label>
            <Select value={filters.level} onValueChange={(value) => updateFilter('level', value)}>
              <SelectTrigger data-testid="select-level">
                <SelectValue placeholder={text.levels.all} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">{text.levels.all}</SelectItem>
                <SelectItem value="beginner">{text.levels.beginner}</SelectItem>
                <SelectItem value="intermediate">{text.levels.intermediate}</SelectItem>
                <SelectItem value="advanced">{text.levels.advanced}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Price Range */}
          <div>
            <label className="text-sm font-medium mb-2 block">
              {text.price}: ${filters.priceRange[0]} - ${filters.priceRange[1]}
            </label>
            <Slider
              data-testid="slider-price"
              value={filters.priceRange}
              onValueChange={(value) => updateFilter('priceRange', value)}
              max={100}
              min={0}
              step={5}
              className="w-full"
            />
          </div>

          {/* Duration Filter */}
          <div>
            <label className="text-sm font-medium mb-2 block">{text.duration}</label>
            <Select value={filters.duration} onValueChange={(value) => updateFilter('duration', value)}>
              <SelectTrigger data-testid="select-duration">
                <SelectValue placeholder={text.durations.all} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">{text.durations.all}</SelectItem>
                <SelectItem value="short">{text.durations.short}</SelectItem>
                <SelectItem value="medium">{text.durations.medium}</SelectItem>
                <SelectItem value="long">{text.durations.long}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Rating Filter */}
          <div>
            <label className="text-sm font-medium mb-2 block">
              {text.rating}: {filters.rating}+ ⭐
            </label>
            <Slider
              data-testid="slider-rating"
              value={[filters.rating]}
              onValueChange={(value) => updateFilter('rating', value[0])}
              max={5}
              min={0}
              step={0.5}
              className="w-full"
            />
          </div>

          {/* Features Filter */}
          <div>
            <label className="text-sm font-medium mb-2 block">{text.features}</label>
            <div className="space-y-2">
              {text.featuresOptions.map((feature) => (
                <div key={feature} className="flex items-center space-x-2">
                  <Checkbox
                    data-testid={`checkbox-feature-${feature.toLowerCase().replace(' ', '-')}`}
                    id={feature}
                    checked={filters.features.includes(feature)}
                    onCheckedChange={(checked) => {
                      const newFeatures = checked
                        ? [...filters.features, feature]
                        : filters.features.filter(f => f !== feature);
                      updateFilter('features', newFeatures);
                    }}
                  />
                  <label
                    htmlFor={feature}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {feature}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}