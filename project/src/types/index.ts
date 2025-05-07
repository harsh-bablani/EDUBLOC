export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  bio?: string;
  createdAt: string;
}

export interface Credential {
  id: string;
  userId: string;
  title: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  description: string;
  skills: string[];
  verificationHash: string;
  imageUrl?: string;
  status: 'verified' | 'pending' | 'revoked';
}

export interface Course {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  topics: string[];
  duration: number; // in minutes
  modules: CourseModule[];
}

export interface CourseModule {
  id: string;
  title: string;
  content: string;
  order: number;
  exercises: Exercise[];
  completionStatus?: 'not-started' | 'in-progress' | 'completed';
}

export interface Exercise {
  id: string;
  question: string;
  options?: string[];
  type: 'multiple-choice' | 'text' | 'code';
  correctAnswer?: string;
}

export interface TutorMessage {
  id: string;
  content: string;
  sender: 'ai' | 'user';
  timestamp: string;
  relatedCourseId?: string;
  relatedModuleId?: string;
}

export interface LearningProgress {
  userId: string;
  courseId: string;
  completedModules: string[];
  startedAt: string;
  lastActiveAt: string;
  completionPercentage: number;
}