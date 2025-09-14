import CourseFilters from '../CourseFilters';

export default function CourseFiltersExample() {
  return (
    <div className="w-80">
      <CourseFilters
        language="so"
        onFilterChange={(filters) => console.log('Filters changed:', filters)}
        onSearch={(query) => console.log('Search query:', query)}
      />
    </div>
  );
}