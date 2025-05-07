import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Clock, Sparkles, Award, BookOpen, ArrowRight } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useCourseStore } from '../../store/courseStore';
import { useCredentialStore } from '../../store/credentialStore';
import CourseCard from '../../components/courses/CourseCard';
import CredentialCard from '../../components/credentials/CredentialCard';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const DashboardPage: React.FC = () => {
  const { user } = useAuthStore();
  const { 
    courses, 
    userProgress, 
    fetchCourses, 
    fetchUserProgress 
  } = useCourseStore();
  
  const {
    credentials,
    fetchUserCredentials
  } = useCredentialStore();
  
  useEffect(() => {
    if (user) {
      fetchCourses();
      fetchUserProgress(user.id);
      fetchUserCredentials(user.id);
    }
  }, [user, fetchCourses, fetchUserProgress, fetchUserCredentials]);
  
  // Get in-progress courses
  const inProgressCourses = courses.filter(course => {
    const progress = userProgress.find(p => p.courseId === course.id);
    return progress && progress.completionPercentage < 100;
  });
  
  // Get most recent credential
  const recentCredentials = credentials.slice(0, 2);
  
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
              Welcome back, {user?.name || 'Learner'}
            </h1>
            <p className="text-neutral-600">
              Track your progress, continue learning, and manage your credentials
            </p>
          </div>
          
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard
              title="Learning Streak"
              value="7 days"
              icon={<Sparkles className="h-5 w-5 text-primary-600" />}
              bgColor="bg-primary-50"
            />
            <StatCard
              title="Time Learned"
              value="42 hours"
              icon={<Clock className="h-5 w-5 text-secondary-600" />}
              bgColor="bg-secondary-50"
            />
            <StatCard
              title="Courses"
              value={`${courses.length} total`}
              icon={<BookOpen className="h-5 w-5 text-accent-500" />}
              bgColor="bg-accent-50"
            />
            <StatCard
              title="Credentials"
              value={`${credentials.length} earned`}
              icon={<Award className="h-5 w-5 text-success-500" />}
              bgColor="bg-success-50"
            />
          </div>
          
          {/* Continue Learning */}
          <div className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-neutral-900">Continue Learning</h2>
              <Link to="/courses" className="text-primary-600 hover:text-primary-700 flex items-center">
                <span>View all courses</span>
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {inProgressCourses.length > 0 ? (
                inProgressCourses.slice(0, 3).map(course => {
                  const progress = userProgress.find(p => p.courseId === course.id);
                  return (
                    <CourseCard 
                      key={course.id} 
                      course={course} 
                      progressPercentage={progress?.completionPercentage || 0}
                    />
                  );
                })
              ) : (
                <div className="col-span-3 p-8 bg-white rounded-lg shadow-card text-center">
                  <p className="text-neutral-600 mb-4">You haven't started any courses yet.</p>
                  <Button 
                    variant="primary"
                    onClick={() => window.location.href = '/courses'}
                  >
                    Browse Courses
                  </Button>
                </div>
              )}
            </div>
          </div>
          
          {/* Recent Credentials */}
          <div className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-neutral-900">Recent Credentials</h2>
              <Link to="/credentials" className="text-primary-600 hover:text-primary-700 flex items-center">
                <span>View all credentials</span>
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentCredentials.length > 0 ? (
                recentCredentials.map(credential => (
                  <CredentialCard key={credential.id} credential={credential} />
                ))
              ) : (
                <div className="col-span-3 p-8 bg-white rounded-lg shadow-card text-center">
                  <p className="text-neutral-600 mb-4">You haven't earned any credentials yet.</p>
                  <Button 
                    variant="primary"
                    onClick={() => window.location.href = '/courses'}
                  >
                    Complete Courses to Earn Credentials
                  </Button>
                </div>
              )}
            </div>
          </div>
          
          {/* AI Tutor */}
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-neutral-900">Your AI Tutor</h2>
            </div>
            
            <div className="bg-gradient-to-r from-primary-500 to-secondary-600 rounded-xl p-8 text-white flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0 md:mr-6">
                <h3 className="text-2xl font-bold mb-2">Need help with your studies?</h3>
                <p className="mb-4 text-white/90">
                  Your AI tutor is available 24/7 to answer questions, explain concepts, 
                  and guide you through your learning journey.
                </p>
                <Button 
                  variant="accent"
                  onClick={() => window.location.href = '/tutor'}
                >
                  Chat with AI Tutor
                </Button>
              </div>
              <div className="w-full md:w-1/3 lg:w-1/4 flex-shrink-0">
                <img 
                  src="https://images.pexels.com/photos/8438923/pexels-photo-8438923.jpeg" 
                  alt="AI Tutor" 
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  bgColor: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, bgColor }) => {
  return (
    <Card className="p-6">
      <div className="flex items-start">
        <div className={`${bgColor} p-3 rounded-full mr-4`}>
          {icon}
        </div>
        <div>
          <p className="text-sm font-medium text-neutral-500">{title}</p>
          <p className="text-2xl font-semibold text-neutral-900">{value}</p>
        </div>
      </div>
    </Card>
  );
};

export default DashboardPage;