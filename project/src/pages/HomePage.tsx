import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Book, Shield, Brain, Users } from 'lucide-react';
import Button from '../components/ui/Button';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900 to-secondary-900 z-0"></div>
        <div 
          className="absolute inset-0 opacity-30 bg-cover bg-center z-0"
          style={{ backgroundImage: 'url(https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg)' }}
        ></div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Learn Anything.
              <br />
              <span className="text-accent-400">Own Your Credentials.</span>
            </h1>
            <p className="text-xl mb-8 text-neutral-200">
              EduBloc combines AI-powered personalized tutoring with blockchain-verified credentials. Take control of your learning journey and own your achievements.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                variant="accent" 
                size="lg"
                onClick={() => navigate('/signup')}
              >
                Get Started
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
                onClick={() => navigate('/courses')}
              >
                Explore Courses
              </Button>
            </div>
          </motion.div>
        </div>
        
        <div className="absolute bottom-8 left-0 right-0 flex justify-center">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <a 
              href="#features" 
              className="text-white opacity-80 hover:opacity-100"
              aria-label="Scroll to features"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </a>
          </motion.div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-neutral-900 mb-4">Why Choose EduBloc?</h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Our platform combines cutting-edge AI with blockchain technology to create a 
              revolutionary learning experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={<Brain className="h-10 w-10 text-primary-600" />}
              title="AI-Powered Tutoring"
              description="Get personalized learning assistance with our advanced AI tutor that adapts to your learning style and pace."
            />
            <FeatureCard 
              icon={<Shield className="h-10 w-10 text-primary-600" />}
              title="Blockchain Verification"
              description="All credentials issued on our platform are stored on blockchain, making them tamper-proof and instantly verifiable."
            />
            <FeatureCard 
              icon={<Book className="h-10 w-10 text-primary-600" />}
              title="Quality Curriculum"
              description="Access a wide range of courses designed by experts in various fields, from blockchain to machine learning."
            />
            <FeatureCard 
              icon={<Users className="h-10 w-10 text-primary-600" />}
              title="Community Learning"
              description="Connect with peers, share insights, and collaborate on projects in our decentralized learning community."
            />
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-neutral-900 mb-4">How It Works</h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Our simple three-step process gets you from learning to earning verifiable credentials
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center">
            <StepCard 
              number={1}
              title="Choose Your Courses"
              description="Browse our catalog of courses across various subjects and difficulty levels."
            />
            <div className="hidden md:block h-0.5 w-12 bg-primary-200"></div>
            <StepCard 
              number={2}
              title="Learn with AI Assistance"
              description="Study at your own pace with personalized help from our AI tutor whenever you need."
            />
            <div className="hidden md:block h-0.5 w-12 bg-primary-200"></div>
            <StepCard 
              number={3}
              title="Earn Verified Credentials"
              description="Complete assessments to earn blockchain-verified credentials you can share anywhere."
            />
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Learning Journey?</h2>
          <p className="text-xl mb-8 text-white/80 max-w-3xl mx-auto">
            Join thousands of learners who are already benefiting from our decentralized education platform.
          </p>
          <Button 
            variant="accent" 
            size="lg"
            onClick={() => navigate('/signup')}
          >
            Start Learning Today
          </Button>
        </div>
      </section>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white p-6 rounded-xl shadow-card border border-neutral-100"
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-neutral-900">{title}</h3>
      <p className="text-neutral-600">{description}</p>
    </motion.div>
  );
};

interface StepCardProps {
  number: number;
  title: string;
  description: string;
}

const StepCard: React.FC<StepCardProps> = ({ number, title, description }) => {
  return (
    <div className="flex flex-col items-center text-center mb-8 md:mb-0 max-w-xs">
      <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 text-2xl font-bold mb-4">
        {number}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-neutral-900">{title}</h3>
      <p className="text-neutral-600">{description}</p>
    </div>
  );
};

export default HomePage;