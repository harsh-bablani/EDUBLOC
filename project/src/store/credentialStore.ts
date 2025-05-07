import { create } from 'zustand';
import { Credential } from '../types';

interface CredentialState {
  credentials: Credential[];
  isLoading: boolean;
  error: string | null;
  fetchUserCredentials: (userId: string) => Promise<void>;
  verifyCredential: (id: string) => Promise<boolean>;
  issueCredential: (credential: Omit<Credential, 'id' | 'verificationHash' | 'status'>) => Promise<void>;
}

export const useCredentialStore = create<CredentialState>((set, get) => ({
  credentials: [],
  isLoading: false,
  error: null,

  fetchUserCredentials: async (userId: string) => {
    set({ isLoading: true, error: null });
    try {
      // Mock API call - would connect to backend in real implementation
      await new Promise((resolve) => setTimeout(resolve, 700));
      
      const mockCredentials: Credential[] = [
        {
          id: '1',
          userId,
          title: 'Blockchain Fundamentals',
          issuer: 'Blockchain Academy',
          issueDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
          description: 'Completed the introductory course on blockchain technology.',
          skills: ['blockchain', 'distributed ledger', 'smart contracts'],
          verificationHash: '0xabc123def456',
          imageUrl: 'https://images.pexels.com/photos/8369590/pexels-photo-8369590.jpeg',
          status: 'verified'
        },
        {
          id: '2',
          userId,
          title: 'AI Ethics Certificate',
          issuer: 'AI Global Institute',
          issueDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
          description: 'Certified in ethical considerations for artificial intelligence development.',
          skills: ['AI ethics', 'responsible AI', 'bias detection'],
          verificationHash: '0xfed987cba654',
          status: 'verified'
        },
        {
          id: '3',
          userId,
          title: 'Advanced Data Science',
          issuer: 'Data Science Foundation',
          issueDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
          description: 'Mastered advanced data science techniques and methodologies.',
          skills: ['machine learning', 'data analysis', 'statistics'],
          verificationHash: '0x123abc456def',
          status: 'pending'
        }
      ];
      
      set({ credentials: mockCredentials, isLoading: false });
    } catch (err) {
      set({ 
        error: err instanceof Error ? err.message : `Failed to fetch credentials for user: ${userId}`, 
        isLoading: false 
      });
    }
  },

  verifyCredential: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      // Mock verification - would connect to blockchain/verification service in real implementation
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Update credential status in state
      const { credentials } = get();
      const updatedCredentials = credentials.map(cred => 
        cred.id === id ? { ...cred, status: 'verified' as const } : cred
      );
      
      set({ credentials: updatedCredentials, isLoading: false });
      return true;
    } catch (err) {
      set({ 
        error: err instanceof Error ? err.message : `Failed to verify credential: ${id}`, 
        isLoading: false 
      });
      return false;
    }
  },

  issueCredential: async (credential) => {
    set({ isLoading: true, error: null });
    try {
      // Mock issuing - would connect to backend in real implementation
      await new Promise((resolve) => setTimeout(resolve, 1200));
      
      // Create new credential with mock data
      const newCredential: Credential = {
        ...credential,
        id: Math.random().toString(36).substring(2, 9),
        verificationHash: `0x${Math.random().toString(36).substring(2, 15)}`,
        status: 'pending'
      };
      
      const { credentials } = get();
      set({ 
        credentials: [...credentials, newCredential], 
        isLoading: false 
      });
    } catch (err) {
      set({ 
        error: err instanceof Error ? err.message : 'Failed to issue credential', 
        isLoading: false 
      });
    }
  }
}));