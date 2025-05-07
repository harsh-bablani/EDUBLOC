import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User, LogOut, Book, Award, MessageSquare, Home } from 'lucide-react';
import Button from '../ui/Button';
import { useAuthStore } from '../../store/authStore';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b border-neutral-200 px-4 py-4 fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-primary-600 font-bold text-2xl">EduBloc</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="text-neutral-700 hover:text-primary-600 font-medium">
                Dashboard
              </Link>
              <Link to="/courses" className="text-neutral-700 hover:text-primary-600 font-medium">
                Courses
              </Link>
              <Link to="/tutor" className="text-neutral-700 hover:text-primary-600 font-medium">
                AI Tutor
              </Link>
              <Link to="/credentials" className="text-neutral-700 hover:text-primary-600 font-medium">
                Credentials
              </Link>
              <div className="flex items-center space-x-4">
                <Link to="/profile" className="flex items-center space-x-2 text-neutral-700 hover:text-primary-600">
                  <User size={18} />
                  <span>{user?.name}</span>
                </Link>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleLogout}
                  icon={<LogOut size={18} />}
                >
                  Logout
                </Button>
              </div>
            </>
          ) : (
            <>
              <Link to="/about" className="text-neutral-700 hover:text-primary-600 font-medium">
                About
              </Link>
              <Link to="/courses" className="text-neutral-700 hover:text-primary-600 font-medium">
                Courses
              </Link>
              <div className="flex items-center space-x-2">
                <Button 
                  variant="ghost" 
                  onClick={() => navigate('/login')}
                >
                  Log In
                </Button>
                <Button 
                  variant="primary" 
                  onClick={() => navigate('/signup')}
                >
                  Sign Up
                </Button>
              </div>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-neutral-700"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white"
          >
            <div className="flex flex-col space-y-4 py-4 px-4">
              {isAuthenticated ? (
                <>
                  <Link 
                    to="/dashboard" 
                    className="flex items-center space-x-2 text-neutral-700 py-2 px-3 rounded-md hover:bg-neutral-100"
                    onClick={toggleMenu}
                  >
                    <Home size={18} />
                    <span>Dashboard</span>
                  </Link>
                  <Link 
                    to="/courses" 
                    className="flex items-center space-x-2 text-neutral-700 py-2 px-3 rounded-md hover:bg-neutral-100"
                    onClick={toggleMenu}
                  >
                    <Book size={18} />
                    <span>Courses</span>
                  </Link>
                  <Link 
                    to="/tutor" 
                    className="flex items-center space-x-2 text-neutral-700 py-2 px-3 rounded-md hover:bg-neutral-100"
                    onClick={toggleMenu}
                  >
                    <MessageSquare size={18} />
                    <span>AI Tutor</span>
                  </Link>
                  <Link 
                    to="/credentials" 
                    className="flex items-center space-x-2 text-neutral-700 py-2 px-3 rounded-md hover:bg-neutral-100"
                    onClick={toggleMenu}
                  >
                    <Award size={18} />
                    <span>Credentials</span>
                  </Link>
                  <Link 
                    to="/profile" 
                    className="flex items-center space-x-2 text-neutral-700 py-2 px-3 rounded-md hover:bg-neutral-100"
                    onClick={toggleMenu}
                  >
                    <User size={18} />
                    <span>Profile</span>
                  </Link>
                  <button 
                    className="flex items-center space-x-2 text-neutral-700 py-2 px-3 rounded-md hover:bg-neutral-100 w-full text-left"
                    onClick={() => {
                      handleLogout();
                      toggleMenu();
                    }}
                  >
                    <LogOut size={18} />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/about" 
                    className="text-neutral-700 py-2 px-3 rounded-md hover:bg-neutral-100"
                    onClick={toggleMenu}
                  >
                    About
                  </Link>
                  <Link 
                    to="/courses" 
                    className="text-neutral-700 py-2 px-3 rounded-md hover:bg-neutral-100"
                    onClick={toggleMenu}
                  >
                    Courses
                  </Link>
                  <Button 
                    variant="outline" 
                    fullWidth
                    onClick={() => {
                      navigate('/login');
                      toggleMenu();
                    }}
                  >
                    Log In
                  </Button>
                  <Button 
                    variant="primary" 
                    fullWidth
                    onClick={() => {
                      navigate('/signup');
                      toggleMenu();
                    }}
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;