import { create } from 'zustand';
import { setAccessToken, setSessionEndHandler } from '@/services/api';
import { authService } from '@/services';

// status: 'idle' (not checked yet) | 'loading' | 'authenticated' | 'anonymous'
export const useAuthStore = create((set, get) => ({
  user: null,
  status: 'idle',

  // Restores the session from the refresh cookie once per page load.
  bootstrap: async () => {
    if (get().status !== 'idle') return;
    set({ status: 'loading' });
    try {
      const { accessToken, user } = await authService.refresh();
      setAccessToken(accessToken);
      set({ user, status: 'authenticated' });
    } catch {
      set({ user: null, status: 'anonymous' });
    }
  },

  login: async (credentials) => {
    const { accessToken, user } = await authService.login(credentials);
    setAccessToken(accessToken);
    set({ user, status: 'authenticated' });
    return user;
  },

  logout: async () => {
    try {
      await authService.logout();
    } finally {
      setAccessToken(null);
      set({ user: null, status: 'anonymous' });
    }
  },
}));

setSessionEndHandler(() => useAuthStore.setState({ user: null, status: 'anonymous' }));
