import { create } from 'zustand';
import { Course, LearningProgress } from '../types';

interface CourseState {
  courses: Course[];
  activeCourse: Course | null;
  userProgress: LearningProgress[];
  isLoading: boolean;
  error: string | null;
  fetchCourses: () => Promise<void>;
  fetchCourseById: (id: string) => Promise<void>;
  fetchUserProgress: (userId: string) => Promise<void>;
  updateProgress: (userId: string, courseId: string, moduleId: string) => Promise<void>;
}

export const useCourseStore = create<CourseState>((set, get) => ({
  courses: [],
  activeCourse: null,
  userProgress: [],
  isLoading: false,
  error: null,

  fetchCourses: async () => {
    set({ isLoading: true, error: null });
    try {
      // Mock API call - would connect to backend in real implementation
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      const mockCourses: Course[] = [
        {
          id: '1',
          title: 'Introduction to Blockchain',
          description: 'Learn the fundamentals of blockchain technology and its applications.',
          imageUrl: 'https://images.pexels.com/photos/8370752/pexels-photo-8370752.jpeg',
          difficulty: 'beginner',
          topics: ['blockchain', 'cryptocurrency', 'decentralization'],
          duration: 120,
          modules: [
            {
              id: 'm1',
              title: 'What is Blockchain?',
              content: 'Blockchain is a distributed database that maintains a continuously growing list of records...',
              order: 1,
              exercises: [
                {
                  id: 'e1',
                  question: 'Which of the following is a key feature of blockchain?',
                  type: 'multiple-choice',
                  options: ['Centralization', 'Immutability', 'Easy modification', 'Single point of failure'],
                  correctAnswer: 'Immutability'
                }
              ]
            },
            {
              id: 'm2',
              title: 'Blockchain Architecture',
              content: 'The architecture of a blockchain consists of blocks, nodes, and miners...',
              order: 2,
              exercises: []
            }
          ]
        },
        {
          id: '2',
          title: 'Machine Learning Fundamentals',
          description: 'Understand the core concepts of machine learning and AI.',
          imageUrl: 'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg',
          difficulty: 'intermediate',
          topics: ['machine learning', 'AI', 'data science'],
          duration: 180,
          modules: [
            {
              id: 'm1',
              title: 'Introduction to ML',
              content: 'Machine learning is a method of data analysis that automates analytical model building...',
              order: 1,
              exercises: []
            }
          ]
        }
      ];
      
      set({ courses: mockCourses, isLoading: false });
    } catch (err) {
      set({ 
        error: err instanceof Error ? err.message : 'Failed to fetch courses', 
        isLoading: false 
      });
    }
  },

  fetchCourseById: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const { courses } = get();
      let course = courses.find(c => c.id === id);
      
      if (!course) {
        // Mock API call if not in state - would connect to backend in real implementation
        await new Promise((resolve) => setTimeout(resolve, 400));
        course = {
          id: '1',
          title: 'Introduction to Blockchain',
          description: 'Learn the fundamentals of blockchain technology and its applications.',
          imageUrl: 'https://images.pexels.com/photos/8370752/pexels-photo-8370752.jpeg',
          difficulty: 'beginner',
          topics: ['blockchain', 'cryptocurrency', 'decentralization'],
          duration: 120,
          modules: [
            {
              id: 'm1',
              title: 'What is Blockchain?',
              content: 'Blockchain is a distributed database that maintains a continuously growing list of records...',
              order: 1,
              exercises: [
                {
                  id: 'e1',
                  question: 'Which of the following is a key feature of blockchain?',
                  type: 'multiple-choice',
                  options: ['Centralization', 'Immutability', 'Easy modification', 'Single point of failure'],
                  correctAnswer: 'Immutability'
                }
              ]
            },
            {
              id: 'm2',
              title: 'Blockchain Architecture',
              content: 'The architecture of a blockchain consists of blocks, nodes, and miners...',
              order: 2,
              exercises: []
            }
          ]
        };
      }
      
      set({ activeCourse: course, isLoading: false });
    } catch (err) {
      set({ 
        error: err instanceof Error ? err.message : `Failed to fetch course with ID: ${id}`, 
        isLoading: false 
      });
    }
  },

  fetchUserProgress: async (userId: string) => {
    set({ isLoading: true, error: null });
    try {
      // Mock API call - would connect to backend in real implementation
      await new Promise((resolve) => setTimeout(resolve, 600));
      
      const mockProgress: LearningProgress[] = [
        {
          userId,
          courseId: '1',
          completedModules: ['m1'],
          startedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          lastActiveAt: new Date().toISOString(),
          completionPercentage: 50
        }
      ];
      
      set({ userProgress: mockProgress, isLoading: false });
    } catch (err) {
      set({ 
        error: err instanceof Error ? err.message : `Failed to fetch progress for user: ${userId}`, 
        isLoading: false 
      });
    }
  },

  updateProgress: async (userId: string, courseId: string, moduleId: string) => {
    set({ isLoading: true, error: null });
    try {
      const { userProgress } = get();
      
      // Find existing progress or create new one
      let progress = userProgress.find(p => p.userId === userId && p.courseId === courseId);
      
      if (progress) {
        // Update existing progress
        if (!progress.completedModules.includes(moduleId)) {
          progress.completedModules.push(moduleId);
        }
        progress.lastActiveAt = new Date().toISOString();
        
        // Recalculate completion percentage
        const { activeCourse } = get();
        if (activeCourse) {
          progress.completionPercentage = Math.round(
            (progress.completedModules.length / activeCourse.modules.length) * 100
          );
        }
      } else {
        // Create new progress
        const { activeCourse } = get();
        progress = {
          userId,
          courseId,
          completedModules: [moduleId],
          startedAt: new Date().toISOString(),
          lastActiveAt: new Date().toISOString(),
          completionPercentage: activeCourse 
            ? Math.round((1 / activeCourse.modules.length) * 100) 
            : 0
        };
      }
      
      // Update progress in state
      const updatedProgress = userProgress.filter(
        p => !(p.userId === userId && p.courseId === courseId)
      );
      updatedProgress.push(progress);
      
      set({ userProgress: updatedProgress, isLoading: false });
    } catch (err) {
      set({ 
        error: err instanceof Error ? err.message : 'Failed to update progress', 
        isLoading: false 
      });
    }
  }
}));