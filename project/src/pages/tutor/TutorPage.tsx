import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTutorStore } from '../../store/tutorStore';
import ChatMessage from '../../components/tutor/ChatMessage';
import ChatInput from '../../components/tutor/ChatInput';
import { Brain } from 'lucide-react';

const TutorPage: React.FC = () => {
  const { messages, sendMessage, clearConversation, isLoading } = useTutorStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom of messages on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSendMessage = (content: string) => {
    sendMessage(content);
  };
  
  return (
    <div className="min-h-screen bg-neutral-50 pt-16">
      <div className="max-w-5xl mx-auto px-4 h-screen flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="py-6"
        >
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">
            AI Tutor
          </h1>
          <p className="text-neutral-600">
            Ask questions, get explanations, and receive personalized learning guidance
          </p>
        </motion.div>
        
        <div className="flex-grow flex flex-col bg-white rounded-t-lg shadow-card overflow-hidden">
          {/* Chat messages area */}
          <div className="flex-grow overflow-y-auto p-4">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center px-4">
                <div className="bg-primary-100 rounded-full p-6 mb-6">
                  <Brain size={48} className="text-primary-600" />
                </div>
                <h2 className="text-2xl font-semibold text-neutral-900 mb-3">Welcome to Your AI Tutor</h2>
                <p className="text-neutral-600 mb-6 max-w-md">
                  I'm here to help you learn and grow. Ask me any question about your courses, 
                  explain concepts, or get assistance with challenging topics.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-lg w-full">
                  <SuggestionButton 
                    text="Explain blockchain consensus mechanisms"
                    onClick={() => handleSendMessage("Can you explain blockchain consensus mechanisms?")}
                  />
                  <SuggestionButton 
                    text="How do digital credentials work?"
                    onClick={() => handleSendMessage("How do digital credentials work on a blockchain?")}
                  />
                  <SuggestionButton 
                    text="What courses should I take first?"
                    onClick={() => handleSendMessage("What courses should I take first if I'm a beginner?")}
                  />
                  <SuggestionButton 
                    text="Help with my current course"
                    onClick={() => handleSendMessage("I need help with my current course module")}
                  />
                </div>
              </div>
            ) : (
              <div>
                {messages.map(message => (
                  <ChatMessage key={message.id} message={message} />
                ))}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>
          
          {/* Chat input area */}
          <ChatInput 
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

interface SuggestionButtonProps {
  text: string;
  onClick: () => void;
}

const SuggestionButton: React.FC<SuggestionButtonProps> = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-lg py-2 px-4 text-sm text-left transition-colors"
    >
      {text}
    </button>
  );
};

export default TutorPage;