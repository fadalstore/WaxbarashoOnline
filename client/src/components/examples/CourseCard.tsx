import CourseCard from '../CourseCard';
import programmingThumbnail from '@assets/generated_images/Programming_course_thumbnail_d1dd9e63.png';

export default function CourseCardExample() {
  return (
    <div className="w-80">
      <CourseCard
        id="1"
        title="Python Programming Bilaaga"
        description="Baro Python programming language-ka ugu muhiimka ah ee tech industry-ga. Waxaad baran doontaa variables, functions, loops iyo wax badan."
        instructor={{
          name: "Ahmed Mohamed",
          avatar: "/placeholder-avatar.jpg"
        }}
        thumbnail={programmingThumbnail}
        price={29}
        originalPrice={49}
        rating={4.8}
        reviewCount={234}
        duration="8 saacadood"
        studentCount={1250}
        level="Bilow"
        category="Programming"
        language="so"
        onEnroll={() => console.log('Enrolled in course')}
        onAddToCart={() => console.log('Added to cart')}
      />
    </div>
  );
}