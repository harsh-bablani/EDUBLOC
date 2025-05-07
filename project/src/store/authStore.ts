import { create } from 'zustand';
import { User } from '../types';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,

  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      // Mock login for now - would connect to Supabase in real implementation
      await new Promise((resolve) => setTimeout(resolve, 800));
      const mockUser = {
        id: '1',
        email,
        name: 'Demo User',
        createdAt: new Date().toISOString(),
      };
      set({ user: mockUser, isLoading: false, isAuthenticated: true });
    } catch (err) {
      set({ 
        error: err instanceof Error ? err.message : 'An error occurred during login', 
        isLoading: false,
        isAuthenticated: false 
      });
    }
  },

  signup: async (email: string, password: string, name: string) => {
    set({ isLoading: true, error: null });
    try {
      // Mock signup for now - would connect to Supabase in real implementation
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const mockUser = {
        id: '1',
        email,
        name,
        createdAt: new Date().toISOString(),
      };
      set({ user: mockUser, isLoading: false, isAuthenticated: true });
    } catch (err) {
      set({ 
        error: err instanceof Error ? err.message : 'An error occurred during signup', 
        isLoading: false 
      });
    }
  },

  logout: async () => {
    set({ isLoading: true });
    try {
      // Mock logout for now - would connect to Supabase in real implementation
      await new Promise((resolve) => setTimeout(resolve, 300));
      set({ user: null, isLoading: false, isAuthenticated: false });
    } catch (err) {
      set({ 
        error: err instanceof Error ? err.message : 'An error occurred during logout', 
        isLoading: false 
      });
    }
  },

  resetPassword: async (email: string) => {
    set({ isLoading: true, error: null });
    try {
      // Mock reset for now - would connect to Supabase in real implementation
      await new Promise((resolve) => setTimeout(resolve, 500));
      set({ isLoading: false });
    } catch (err) {
      set({ 
        error: err instanceof Error ? err.message : 'An error occurred during password reset', 
        isLoading: false 
      });
    }
  },

  setUser: (user: User | null) => {
    set({ user, isAuthenticated: !!user });
  },
}));