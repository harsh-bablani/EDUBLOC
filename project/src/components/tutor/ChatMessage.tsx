import React from 'react';
import { motion } from 'framer-motion';
import { User, Bot } from 'lucide-react';
import { TutorMessage } from '../../types';

interface ChatMessageProps {
  message: TutorMessage;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isAi = message.sender === 'ai';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex w-full my-4 ${isAi ? 'justify-start' : 'justify-end'}`}
    >
      <div 
        className={`flex max-w-[80%] ${isAi ? 'flex-row' : 'flex-row-reverse'}`}
      >
        <div 
          className={`
            flex items-center justify-center w-8 h-8 rounded-full 
            ${isAi ? 'bg-secondary-100 text-secondary-700 mr-3' : 'bg-primary-100 text-primary-700 ml-3'}
          `}
        >
          {isAi ? <Bot size={16} /> : <User size={16} />}
        </div>
        
        <div 
          className={`
            p-4 rounded-lg 
            ${isAi 
              ? 'bg-neutral-100 text-neutral-800 rounded-tl-none' 
              : 'bg-primary-600 text-white rounded-tr-none'}
          `}
        >
          <p className="whitespace-pre-wrap">{message.content}</p>
          <div 
            className={`
              text-xs mt-2 
              ${isAi ? 'text-neutral-500' : 'text-primary-100'}
            `}
          >
            {new Date(message.timestamp).toLocaleTimeString()}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatMessage;