# Comprehensive Design Guidelines for Somali Learning Management System

## Design Approach
**Reference-Based Approach**: Drawing inspiration from modern educational platforms like Udemy, Coursera, and Notion, combined with contemporary Somali cultural aesthetics. The design will emphasize accessibility, multilingual support, and mobile-first approach for the Somali market.

## Color Palette

### Primary Colors
- **Brand Primary (Dark Mode)**: 220 70% 45% - Professional blue conveying trust and education
- **Brand Primary (Light Mode)**: 220 65% 35% - Deeper variant for light backgrounds
- **Surface Dark**: 220 15% 12% - Main dark background
- **Surface Light**: 0 0% 98% - Clean light background

### Accent Colors
- **Success Green**: 145 60% 45% - For progress indicators and success states
- **Warning Amber**: 35 85% 55% - For important notifications
- **Text Primary Dark**: 220 5% 95% - High contrast text for dark mode
- **Text Primary Light**: 220 15% 15% - High contrast text for light mode

### Gradient Usage
- **Hero Gradients**: Subtle diagonal gradients from brand primary to deeper blue variants
- **Card Overlays**: Gentle gradients on course cards and feature sections
- **Background Treatments**: Soft radial gradients in hero sections with low opacity

## Typography
- **Primary Font**: Inter via Google Fonts - excellent multilingual support for Somali/English
- **Heading Font**: Inter (600-700 weight) for section headers
- **Body Font**: Inter (400-500 weight) for content and UI elements
- **Code/Technical**: JetBrains Mono for any technical content

## Layout System
**Spacing Units**: Consistent use of Tailwind units 2, 4, 6, 8, 12, and 16
- `p-4` for standard component padding
- `gap-6` for grid layouts and card spacing  
- `mb-8` for section separation
- `h-12` for button heights and form inputs

## Component Library

### Navigation
- **Header**: Sticky navigation with logo, main menu, language switcher, and user profile
- **Sidebar**: Collapsible course navigation and dashboard menu
- **Breadcrumbs**: Clear path indication for deep navigation

### Course Components
- **Course Cards**: Image thumbnail, title, instructor, rating, and price
- **Video Player**: Custom-styled player with progress tracking
- **Progress Bars**: Visual learning progress with percentage indicators
- **Lesson Lists**: Expandable curriculum with completion checkmarks

### E-commerce Elements
- **Shopping Cart**: Slide-out cart with item management
- **Checkout Forms**: Multi-step process with payment method selection
- **Product Grids**: Responsive course catalog with filtering

### Blog System
- **Article Cards**: Featured image, excerpt, author, and publish date
- **Reading Interface**: Clean typography with social sharing
- **Comment System**: Threaded discussions with user avatars

### Data Displays
- **Dashboards**: Student progress, instructor earnings, admin analytics
- **Tables**: Sortable course lists, user management, order history
- **Charts**: Progress visualization using Chart.js integration

### Forms & Inputs
- **Authentication**: Clean login/register forms with social options
- **Course Creation**: Multi-step form with rich text editor
- **Profile Management**: Editable user information with image upload

## Images and Visual Assets

### Hero Images
- **Homepage Hero**: Large background image showcasing diverse Somali students learning (1920x1080)
- **Course Category Headers**: Relevant subject-matter images for each course category
- **About Section**: Professional photos of instructors and learning environments

### Supporting Images
- **Course Thumbnails**: 16:9 aspect ratio placeholder images for course cards
- **Blog Featured Images**: Horizontal images (1200x630) for article headers
- **Instructor Profiles**: Professional headshots in circular crops
- **Cultural Elements**: Subtle Somali patterns or motifs as decorative elements

### Icon Usage
- **Heroicons**: Primary icon library via CDN for UI elements
- **Custom Placeholders**: `<!-- CUSTOM ICON: Somali flag -->` for cultural-specific icons

## Key Design Principles

### Cultural Sensitivity
- Right-to-left text support preparation for potential Arabic script
- Color choices that respect cultural preferences
- Imagery that represents diverse Somali community

### Accessibility Focus
- High contrast ratios maintained in both light and dark modes
- Keyboard navigation support throughout
- Screen reader optimization for educational content
- Consistent dark mode implementation across all components

### Mobile-First Approach
- Touch-friendly button sizes (minimum 44px)
- Responsive grid layouts using CSS Grid and Flexbox
- Optimized navigation for mobile devices
- Swipe gestures for course content navigation

### Performance Optimization
- Lazy loading for course images and video thumbnails
- Minimal animation usage - only for feedback and transitions
- Efficient color palette reducing CSS bundle size
- Strategic use of system fonts where possible

This comprehensive design system ensures a professional, culturally appropriate, and highly functional learning platform that serves the Somali community's educational needs while maintaining modern web standards and accessibility requirements.