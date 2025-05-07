import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Key, Shield, ClipboardCheck } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const ProfilePage: React.FC = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('profile');
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [bio, setBio] = useState(user?.bio || '');
  
  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };
  
  const handleSaveProfile = () => {
    // Would update profile in real implementation
    alert('Profile updated successfully!');
  };
  
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
              Your Profile
            </h1>
            <p className="text-neutral-600">
              Manage your account settings and preferences
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-lg shadow-card p-4">
                <nav className="space-y-1">
                  <NavItem 
                    icon={<User size={18} />}
                    text="Profile"
                    isActive={activeTab === 'profile'}
                    onClick={() => setActiveTab('profile')}
                  />
                  <NavItem 
                    icon={<Mail size={18} />}
                    text="Notifications"
                    isActive={activeTab === 'notifications'}
                    onClick={() => setActiveTab('notifications')}
                  />
                  <NavItem 
                    icon={<Key size={18} />}
                    text="Security"
                    isActive={activeTab === 'security'}
                    onClick={() => setActiveTab('security')}
                  />
                  <NavItem 
                    icon={<Shield size={18} />}
                    text="Privacy"
                    isActive={activeTab === 'privacy'}
                    onClick={() => setActiveTab('privacy')}
                  />
                  <NavItem 
                    icon={<ClipboardCheck size={18} />}
                    text="Preferences"
                    isActive={activeTab === 'preferences'}
                    onClick={() => setActiveTab('preferences')}
                  />
                </nav>
                
                <div className="mt-6 pt-6 border-t border-neutral-200">
                  <Button 
                    variant="outline" 
                    size="sm"
                    fullWidth
                    onClick={handleLogout}
                  >
                    Sign out
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Main content */}
            <div className="md:col-span-3">
              <div className="bg-white rounded-lg shadow-card p-6">
                {activeTab === 'profile' && (
                  <div>
                    <h2 className="text-xl font-semibold mb-6">Profile Information</h2>
                    
                    <div className="mb-6 flex justify-center">
                      <div className="relative">
                        <div className="w-24 h-24 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
                          <User size={40} />
                        </div>
                        <button className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md border border-neutral-200">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    
                    <form onSubmit={(e) => { e.preventDefault(); handleSaveProfile(); }}>
                      <Input
                        label="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        icon={<User size={18} />}
                        fullWidth
                      />
                      
                      <Input
                        label="Email Address"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        icon={<Mail size={18} />}
                        fullWidth
                      />
                      
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-neutral-700 mb-1">
                          Bio
                        </label>
                        <textarea
                          rows={4}
                          value={bio}
                          onChange={(e) => setBio(e.target.value)}
                          className="w-full rounded-md border-neutral-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500 focus:ring-opacity-50"
                          placeholder="Tell us a bit about yourself"
                        />
                      </div>
                      
                      <div className="mt-6 flex justify-end">
                        <Button
                          type="submit"
                          variant="primary"
                        >
                          Save Changes
                        </Button>
                      </div>
                    </form>
                  </div>
                )}
                
                {activeTab === 'security' && (
                  <div>
                    <h2 className="text-xl font-semibold mb-6">Security Settings</h2>
                    
                    <form>
                      <Input
                        label="Current Password"
                        type="password"
                        fullWidth
                      />
                      
                      <Input
                        label="New Password"
                        type="password"
                        fullWidth
                      />
                      
                      <Input
                        label="Confirm New Password"
                        type="password"
                        fullWidth
                      />
                      
                      <div className="mt-6 flex justify-end">
                        <Button
                          type="submit"
                          variant="primary"
                        >
                          Update Password
                        </Button>
                      </div>
                    </form>
                    
                    <div className="mt-8 pt-8 border-t border-neutral-200">
                      <h3 className="text-lg font-semibold mb-4">Two-Factor Authentication</h3>
                      <p className="text-neutral-600 mb-4">
                        Add an extra layer of security to your account by enabling two-factor authentication.
                      </p>
                      <Button
                        variant="outline"
                      >
                        Enable 2FA
                      </Button>
                    </div>
                  </div>
                )}
                
                {activeTab === 'notifications' && (
                  <div>
                    <h2 className="text-xl font-semibold mb-6">Notification Preferences</h2>
                    
                    <div className="space-y-4">
                      <NotificationSetting
                        title="Email Notifications"
                        description="Receive updates about your courses, credentials, and account activity"
                        checked={true}
                      />
                      
                      <NotificationSetting
                        title="Learning Reminders"
                        description="Get reminders to continue your learning journey"
                        checked={true}
                      />
                      
                      <NotificationSetting
                        title="New Course Alerts"
                        description="Be notified when new courses relevant to your interests are added"
                        checked={false}
                      />
                      
                      <NotificationSetting
                        title="Credential Updates"
                        description="Receive notifications about credential verification status changes"
                        checked={true}
                      />
                    </div>
                    
                    <div className="mt-6 flex justify-end">
                      <Button
                        variant="primary"
                      >
                        Save Preferences
                      </Button>
                    </div>
                  </div>
                )}
                
                {(activeTab === 'privacy' || activeTab === 'preferences') && (
                  <div className="text-center py-10">
                    <h2 className="text-xl font-semibold mb-4">Coming Soon</h2>
                    <p className="text-neutral-600">
                      This feature is currently under development. Check back later!
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

interface NavItemProps {
  icon: React.ReactNode;
  text: string;
  isActive: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, text, isActive, onClick }) => {
  return (
    <button
      className={`
        flex items-center w-full px-3 py-2 text-sm font-medium rounded-md
        ${isActive 
          ? 'bg-primary-50 text-primary-700' 
          : 'text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900'}
      `}
      onClick={onClick}
    >
      <span className="mr-3">{icon}</span>
      <span>{text}</span>
    </button>
  );
};

interface NotificationSettingProps {
  title: string;
  description: string;
  checked: boolean;
}

const NotificationSetting: React.FC<NotificationSettingProps> = ({ 
  title, 
  description, 
  checked 
}) => {
  const [isChecked, setIsChecked] = useState(checked);
  
  return (
    <div className="flex items-start">
      <div className="flex items-center h-5">
        <input
          id={title.replace(/\s+/g, '-').toLowerCase()}
          type="checkbox"
          checked={isChecked}
          onChange={() => setIsChecked(!isChecked)}
          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
        />
      </div>
      <div className="ml-3 text-sm">
        <label htmlFor={title.replace(/\s+/g, '-').toLowerCase()} className="font-medium text-neutral-700">
          {title}
        </label>
        <p className="text-neutral-500">{description}</p>
      </div>
    </div>
  );
};

export default ProfilePage;