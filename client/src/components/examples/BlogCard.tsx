import BlogCard from '../BlogCard';

export default function BlogCardExample() {
  return (
    <div className="w-80">
      <BlogCard
        id="1"
        title="Sida lacag looga sameeyo internet-ka Soomaaliya"
        excerpt="Maanta waxa jira fursado badan oo ay dadku lacag kaga sameyn karaan internetka. Waxaan ku tusi doonaa 10 habab oo fudud oo aad lacag uga sameyn kartid internet-ka..."
        author={{
          name: "Fatima Ali",
          avatar: "/placeholder-avatar.jpg"
        }}
        publishDate="Janayo 15, 2024"
        readTime="5 daqiiqo"
        category="Lacag sameyn"
        tags={["internet", "lacag", "online work"]}
        commentCount={24}
        featuredImage="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=200&fit=crop"
        language="so"
        onReadMore={() => console.log('Read more clicked')}
      />
    </div>
  );
}