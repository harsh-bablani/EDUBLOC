import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, BookOpen, Users, Award, ChevronDown, ChevronUp, CheckCircle, Circle } from 'lucide-react';
import { useCourseStore } from '../../store/courseStore';
import { useAuthStore } from '../../store/authStore';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

const CourseDetailPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { activeCourse, fetchCourseById, userProgress, fetchUserProgress, updateProgress, isLoading } = useCourseStore();
  const { user, isAuthenticated } = useAuthStore();
  const [openModules, setOpenModules] = useState<string[]>([]);
  
  useEffect(() => {
    if (courseId) {
      fetchCourseById(courseId);
      
      if (user) {
        fetchUserProgress(user.id);
      }
    }
  }, [courseId, fetchCourseById, user, fetchUserProgress]);
  
  if (isLoading || !activeCourse) {
    return (
      <div className="min-h-screen bg-neutral-50 pt-24 pb-12 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }
  
  const toggleModule = (moduleId: string) => {
    setOpenModules(prev => 
      prev.includes(moduleId)
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };
  
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    if (hours === 0) {
      return `${mins} min`;
    } else if (mins === 0) {
      return `${hours} hr`;
    } else {
      return `${hours} hr ${mins} min`;
    }
  };
  
  const progress = user 
    ? userProgress.find(p => p.courseId === activeCourse.id)
    : undefined;
  
  const handleModuleCompletion = (moduleId: string) => {
    if (user) {
      updateProgress(user.id, activeCourse.id, moduleId);
    }
  };
  
  return (
    <div className="min-h-screen bg-neutral-50 pt-16 pb-12">
      {/* Hero section */}
      <div 
        className="relative h-80 bg-cover bg-center flex items-end"
        style={{ backgroundImage: `url(${activeCourse.imageUrl})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10 pb-8 w-full">
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge 
              variant={
                activeCourse.difficulty === 'beginner'
                  ? 'success'
                  : activeCourse.difficulty === 'intermediate'
                  ? 'accent'
                  : 'error'
              }
              size="md"
            >
              {activeCourse.difficulty.charAt(0).toUpperCase() + activeCourse.difficulty.slice(1)}
            </Badge>
            
            {activeCourse.topics.slice(0, 3).map((topic, index) => (
              <Badge key={index} variant="default" size="md">
                {topic}
              </Badge>
            ))}
          </div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-white mb-2"
          >
            {activeCourse.title}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-white/80 mb-4 max-w-3xl"
          >
            {activeCourse.description}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap gap-6 text-white/90"
          >
            <div className="flex items-center">
              <Clock size={18} className="mr-2" />
              <span>{formatDuration(activeCourse.duration)}</span>
            </div>
            <div className="flex items-center">
              <BookOpen size={18} className="mr-2" />
              <span>{activeCourse.modules.length} modules</span>
            </div>
            <div className="flex items-center">
              <Users size={18} className="mr-2" />
              <span>1,234 students</span>
            </div>
            <div className="flex items-center">
              <Award size={18} className="mr-2" />
              <span>Verified certificate</span>
            </div>
          </motion.div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-semibold mb-6">Course Content</h2>
              
              <div className="bg-white rounded-lg shadow-card overflow-hidden mb-8">
                {activeCourse.modules.map((module) => {
                  const isOpen = openModules.includes(module.id);
                  const isCompleted = progress?.completedModules.includes(module.id);
                  
                  return (
                    <div key={module.id} className="border-b border-neutral-200 last:border-b-0">
                      <button
                        className="flex justify-between items-center w-full p-4 text-left hover:bg-neutral-50 focus:outline-none"
                        onClick={() => toggleModule(module.id)}
                      >
                        <div className="flex items-center">
                          {isCompleted ? (
                            <CheckCircle size={18} className="text-success-500 mr-3" />
                          ) : (
                            <Circle size={18} className="text-neutral-400 mr-3" />
                          )}
                          <span className="font-medium">{module.title}</span>
                        </div>
                        {isOpen ? (
                          <ChevronUp size={18} className="text-neutral-500" />
                        ) : (
                          <ChevronDown size={18} className="text-neutral-500" />
                        )}
                      </button>
                      
                      {isOpen && (
                        <div className="p-4 pt-0 pl-12 text-neutral-600">
                          <p className="mb-4">{module.content}</p>
                          
                          {module.exercises.length > 0 && (
                            <div className="mt-4">
                              <h4 className="font-medium mb-2">Exercises</h4>
                              <ul className="list-disc pl-5 space-y-1">
                                {module.exercises.map((exercise) => (
                                  <li key={exercise.id}>{exercise.question}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                          
                          {isAuthenticated && (
                            <div className="mt-6">
                              <Button
                                variant={isCompleted ? 'outline' : 'primary'}
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleModuleCompletion(module.id);
                                }}
                              >
                                {isCompleted ? 'Completed' : 'Mark as Complete'}
                              </Button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              
              <div className="bg-white rounded-lg shadow-card p-6 mb-8">
                <h2 className="text-2xl font-semibold mb-4">About this Course</h2>
                <p className="text-neutral-600 mb-4">
                  This comprehensive course covers all the essential aspects of {activeCourse.title.toLowerCase()}. 
                  You'll gain both theoretical knowledge and practical skills through interactive lessons and 
                  hands-on exercises. By the end of this course, you'll be confident in applying these concepts 
                  in real-world scenarios.
                </p>
                <p className="text-neutral-600">
                  Upon completion, you'll receive a blockchain-verified credential that you can share with 
                  employers or add to your professional profile.
                </p>
              </div>
            </motion.div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="sticky top-24"
            >
              <div className="bg-white rounded-lg shadow-card overflow-hidden mb-6">
                {progress && (
                  <div className="p-4 bg-primary-50 border-b border-primary-100">
                    <div className="flex justify-between items-center mb-1">
                      <div className="text-sm font-medium text-primary-700">Your Progress</div>
                      <div className="text-sm font-medium text-primary-700">{progress.completionPercentage}%</div>
                    </div>
                    <div className="w-full bg-primary-200 rounded-full h-2.5">
                      <div 
                        className="bg-primary-600 h-2.5 rounded-full" 
                        style={{ width: `${progress.completionPercentage}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-primary-600 mt-2">
                      {progress.completedModules.length} of {activeCourse.modules.length} modules completed
                    </p>
                  </div>
                )}
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Start Learning Today</h3>
                  
                  {isAuthenticated ? (
                    <Button 
                      variant="primary" 
                      fullWidth
                      onClick={() => {
                        // Open the first uncompleted module or first module if none completed
                        const uncompletedModules = activeCourse.modules.filter(
                          module => !progress?.completedModules.includes(module.id)
                        );
                        
                        const moduleToOpen = uncompletedModules.length > 0
                          ? uncompletedModules[0].id
                          : activeCourse.modules[0].id;
                        
                        setOpenModules(prev => 
                          prev.includes(moduleToOpen) ? prev : [...prev, moduleToOpen]
                        );
                        
                        // Scroll to module
                        document.getElementById(moduleToOpen)?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      {progress?.completionPercentage === 100 
                        ? 'Review Course' 
                        : progress?.completionPercentage && progress.completionPercentage > 0
                        ? 'Continue Learning'
                        : 'Start Course'}
                    </Button>
                  ) : (
                    <>
                      <Link to="/login">
                        <Button 
                          variant="primary" 
                          fullWidth
                          className="mb-3"
                        >
                          Log in to Start
                        </Button>
                      </Link>
                      <Link to="/signup">
                        <Button 
                          variant="outline" 
                          fullWidth
                        >
                          Sign up
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-card p-6">
                <h3 className="text-xl font-semibold mb-4">What You'll Learn</h3>
                <ul className="space-y-3">
                  <li className="flex">
                    <CheckCircle size={18} className="text-success-500 mr-3 flex-shrink-0" />
                    <span>Comprehensive understanding of {activeCourse.topics[0]}</span>
                  </li>
                  <li className="flex">
                    <CheckCircle size={18} className="text-success-500 mr-3 flex-shrink-0" />
                    <span>Practical skills that you can apply immediately</span>
                  </li>
                  <li className="flex">
                    <CheckCircle size={18} className="text-success-500 mr-3 flex-shrink-0" />
                    <span>Industry best practices and advanced techniques</span>
                  </li>
                  <li className="flex">
                    <CheckCircle size={18} className="text-success-500 mr-3 flex-shrink-0" />
                    <span>Problem-solving strategies for real-world challenges</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;