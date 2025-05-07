import React from 'react';
import { Link } from 'react-router-dom';
import * as Lucide from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="text-2xl font-bold text-white">EduBloc</Link>
            <p className="mt-3 text-neutral-400 text-sm">
              Decentralized AI education platform with blockchain-verified credentials
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <Lucide.Github size={20} />
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <Lucide.Twitter size={20} />
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <Lucide.Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Platform</h3>
            <ul className="space-y-2">
              <li><Link to="/courses" className="text-neutral-400 hover:text-white transition-colors">Courses</Link></li>
              <li><Link to="/tutor" className="text-neutral-400 hover:text-white transition-colors">AI Tutor</Link></li>
              <li><Link to="/credentials" className="text-neutral-400 hover:text-white transition-colors">Credential Verification</Link></li>
              <li><Link to="/dashboard" className="text-neutral-400 hover:text-white transition-colors">Dashboard</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-neutral-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/faq" className="text-neutral-400 hover:text-white transition-colors">FAQ</Link></li>
              <li><Link to="/blog" className="text-neutral-400 hover:text-white transition-colors">Blog</Link></li>
              <li><Link to="/support" className="text-neutral-400 hover:text-white transition-colors">Support</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/terms" className="text-neutral-400 hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="text-neutral-400 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/cookie" className="text-neutral-400 hover:text-white transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-500 text-sm">
            © {new Date().getFullYear()} EduBloc. All rights reserved.
          </p>
          <p className="text-neutral-500 text-sm mt-4 md:mt-0">
            Built with ❤️ for decentralized education
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;