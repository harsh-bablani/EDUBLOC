import { create } from 'zustand';
import { TutorMessage } from '../types';

interface TutorState {
  messages: TutorMessage[];
  isLoading: boolean;
  error: string | null;
  sendMessage: (content: string, courseId?: string, moduleId?: string) => Promise<void>;
  clearConversation: () => void;
}

export const useTutorStore = create<TutorState>((set, get) => ({
  messages: [],
  isLoading: false,
  error: null,

  sendMessage: async (content: string, courseId?: string, moduleId?: string) => {
    // Add user message to state immediately
    const userMessage: TutorMessage = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      content,
      sender: 'user',
      timestamp: new Date().toISOString(),
      relatedCourseId: courseId,
      relatedModuleId: moduleId
    };
    
    const { messages } = get();
    set({ 
      messages: [...messages, userMessage],
      isLoading: true, 
      error: null 
    });
    
    try {
      // Mock AI response - would connect to AI service in real implementation
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      let aiResponse = '';
      
      // Generate contextual responses based on user input
      if (content.toLowerCase().includes('blockchain')) {
        aiResponse = "Blockchain is a distributed ledger technology that enables secure, transparent, and immutable record-keeping. Each 'block' contains a batch of transactions, and each new block includes a hash of the previous one, forming a chain. This creates a tamper-evident system where altering any block would require changing all subsequent blocks. Would you like to learn more about specific aspects like consensus mechanisms or smart contracts?";
      } else if (content.toLowerCase().includes('credential') || content.toLowerCase().includes('certificate')) {
        aiResponse = "Digital credentials use cryptographic techniques to ensure their authenticity and integrity. In a blockchain-based system, credentials are typically represented as tokens or NFTs with metadata describing the achievement. The verification process involves checking the digital signature against the issuer's public key and confirming the record exists on the blockchain. This eliminates the need for centralized verification services and prevents credential forgery.";
      } else if (content.toLowerCase().includes('course') || content.toLowerCase().includes('learn')) {
        aiResponse = "I'd be happy to help you find a suitable course! Our platform offers courses across various disciplines with a focus on emerging technologies. Each course includes interactive modules, practical exercises, and assessments. Upon completion, you'll receive a verifiable digital credential. What specific subject are you interested in learning about?";
      } else {
        aiResponse = "I'm your AI tutor, here to help with your learning journey. I can explain concepts, answer questions about our courses, help with exercises, or provide information about digital credentials. What would you like assistance with today?";
      }
      
      const aiMessage: TutorMessage = {
        id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        content: aiResponse,
        sender: 'ai',
        timestamp: new Date().toISOString(),
        relatedCourseId: courseId,
        relatedModuleId: moduleId
      };
      
      set({ 
        messages: [...get().messages, aiMessage],
        isLoading: false 
      });
    } catch (err) {
      set({ 
        error: err instanceof Error ? err.message : 'Failed to get AI response', 
        isLoading: false 
      });
    }
  },

  clearConversation: () => {
    set({ messages: [] });
  }
}));