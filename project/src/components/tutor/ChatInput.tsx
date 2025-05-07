import React, { useState } from 'react';
import { Send } from 'lucide-react';
import Button from '../ui/Button';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage('');
    }
  };
  
  return (
    <form 
      onSubmit={handleSubmit}
      className="border-t border-neutral-200 bg-white p-4"
    >
      <div className="flex items-center">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask your AI tutor a question..."
          className="flex-grow border border-neutral-300 rounded-l-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-primary-500"
          disabled={isLoading}
        />
        <Button
          type="submit"
          variant="primary"
          className="rounded-l-none"
          isLoading={isLoading}
          disabled={!message.trim() || isLoading}
          icon={<Send size={18} />}
        >
          Send
        </Button>
      </div>
    </form>
  );
};

export default ChatInput;