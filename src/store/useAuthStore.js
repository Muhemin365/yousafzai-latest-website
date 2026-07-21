import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { api } from '../lib/api';

export const useAuthStore = create(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      token: null,
      loginError: null,
      loginLoading: false,

      login: async (email, password) => {
        set({ loginLoading: true, loginError: null });
        try {
          const res = await api.login(email, password);
          const d = res.data || res;
          set({
            isAuthenticated: true,
            user: d.user,
            token: d.token,
            loginLoading: false,
            loginError: null,
          });
          return { success: true };
        } catch (err) {
          set({ loginLoading: false, loginError: err.message });
          return { success: false, error: err.message };
        }
      },

      logout: async () => {
        try { await api.logout(); } catch {}
        set({ isAuthenticated: false, user: null, token: null, loginError: null });
      },

      clearLoginError: () => set({ loginError: null }),
    }),
    {
      name: 'yousafzai-auth',
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        token: state.token,
      }),
    }
  )
);
