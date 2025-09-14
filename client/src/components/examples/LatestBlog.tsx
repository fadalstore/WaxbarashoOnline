import LatestBlog from '../LatestBlog';

export default function LatestBlogExample() {
  const mockPosts = [
    {
      id: '1',
      title: 'Sida lacag looga sameeyo internet-ka Soomaaliya',
      excerpt: 'Maanta waxa jira fursado badan oo ay dadku lacag kaga sameyn karaan internetka. Waxaan ku tusi doonaa 10 habab oo fudud oo aad lacag uga sameyn kartid internet-ka...',
      author: {
        name: 'Fatima Ali',
        avatar: '/placeholder-avatar.jpg'
      },
      publishDate: 'Janayo 15, 2024',
      readTime: '5 daqiiqo',
      category: 'Lacag sameyn',
      tags: ['internet', 'lacag', 'online work'],
      commentCount: 24,
      featuredImage: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=200&fit=crop'
    },
    {
      id: '2',
      title: 'Sida loo barto Python (bilow ilaa heer sare)',
      excerpt: 'Python waa luuqadda programming-ka ugu fudud ee loo baran karo. Halkan waxaan ku sharxi doonaa sida aad u bilaabi kartid barashada Python-ka...',
      author: {
        name: 'Ahmed Mohamed',
        avatar: '/placeholder-avatar.jpg'
      },
      publishDate: 'Janayo 12, 2024',
      readTime: '8 daqiiqo',
      category: 'Programming',
      tags: ['python', 'programming', 'tutorial'],
      commentCount: 45,
      featuredImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=200&fit=crop'
    },
    {
      id: '3',
      title: 'Top 10 siyaabood oo lacag loogu sameeyo Mobile (2025)',
      excerpt: 'Telefoonkaaga wuxuu noqon karaa aalad lacag ku keentaa haddii aad si fiican u isticmaalto. Waxaan ku tusi doonaa 10 hab oo lacag lagu sameeyo mobile-ka...',
      author: {
        name: 'Hassan Yusuf',
        avatar: '/placeholder-avatar.jpg'
      },
      publishDate: 'Janayo 10, 2024',
      readTime: '6 daqiiqo',
      category: 'Mobile Money',
      tags: ['mobile', 'apps', 'income'],
      commentCount: 18,
      featuredImage: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=200&fit=crop'
    }
  ];

  return (
    <LatestBlog
      posts={mockPosts}
      language="so"
      onViewAll={() => console.log('View all blog posts')}
      onReadMore={(id) => console.log('Read more post:', id)}
    />
  );
}