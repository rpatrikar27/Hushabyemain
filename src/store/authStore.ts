import { create } from 'zustand';
import { supabase } from '../lib/supabase';

interface User {
  id: string;
  email?: string;
  full_name?: string;
  role?: 'admin' | 'customer';
}

interface AuthState {
  user: User | null;
  session: any | null;
  isAdmin: boolean;
  loading: boolean;
  setUser: (user: User | null) => void;
  setSession: (session: any | null) => void;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  isAdmin: false,
  loading: true,
  setUser: (user) => set({ user, isAdmin: user?.role === 'admin' }),
  setSession: (session) => set({ session }),
  signOut: async () => {
    await supabase.auth.signOut();
    set({ user: null, session: null, isAdmin: false });
  },
}));
