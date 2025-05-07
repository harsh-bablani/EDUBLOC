import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter } from 'lucide-react';
import { useCourseStore } from '../../store/courseStore';
import CourseCard from '../../components/courses/CourseCard';
import Input from '../../components/ui/Input';
import Badge from '../../components/ui/Badge';

const CoursesPage: React.FC = () => {
  const { courses, fetchCourses, isLoading } = useCourseStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  
  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);
  
  // Get all unique topics from courses
  const allTopics = Array.from(
    new Set(
      courses.flatMap(course => course.topics)
    )
  );
  
  // Filter courses based on search term and selected filter
  const filteredCourses = courses.filter(course => {
    const matchesSearch = 
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      course.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = 
      !selectedFilter || 
      course.topics.includes(selectedFilter);
    
    return matchesSearch && matchesFilter;
  });
  
  return (
    <div className="min-h-screen bg-neutral-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-neutral-900 mb-2">
              Explore Courses
            </h1>
            <p className="text-neutral-600">
              Discover new skills with our AI-powered learning experiences
            </p>
          </div>
          
          {/* Search and Filters */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row items-stretch mb-4">
              <div className="w-full md:w-2/3 mb-4 md:mb-0 md:mr-4">
                <Input 
                  placeholder="Search for courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  icon={<Search size={18} />}
                  fullWidth
                />
              </div>
              <div className="w-full md:w-1/3 bg-white rounded-md border border-neutral-300 p-4 flex items-center">
                <Filter size={18} className="text-neutral-500 mr-2" />
                <span className="text-neutral-700 mr-2">Filter by:</span>
                <div className="flex flex-wrap gap-2">
                  {selectedFilter && (
                    <Badge 
                      variant="primary"
                      className="cursor-pointer"
                      onClick={() => setSelectedFilter(null)}
                    >
                      {selectedFilter} ×
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            
            {/* Topic filters */}
            <div className="flex flex-wrap gap-2">
              {allTopics.map((topic) => (
                <Badge 
                  key={topic}
                  variant={selectedFilter === topic ? 'primary' : 'default'}
                  className="cursor-pointer"
                  onClick={() => setSelectedFilter(prev => prev === topic ? null : topic)}
                >
                  {topic}
                </Badge>
              ))}
            </div>
          </div>
          
          {/* Course List */}
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
          ) : (
            <>
              <div className="mb-4">
                <p className="text-neutral-600">
                  Showing {filteredCourses.length} {filteredCourses.length === 1 ? 'course' : 'courses'}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.length > 0 ? (
                  filteredCourses.map(course => (
                    <CourseCard key={course.id} course={course} />
                  ))
                ) : (
                  <div className="col-span-3 text-center py-10">
                    <h3 className="text-xl font-medium text-neutral-700 mb-2">No courses found</h3>
                    <p className="text-neutral-600">
                      Try adjusting your search or filter criteria
                    </p>
                  </div>
                )}
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default CoursesPage;