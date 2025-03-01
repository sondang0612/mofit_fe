import { create } from "zustand";

export type AuthStatus = {
  accessToken: string | undefined;
  isLoggedIn: boolean;
};

interface AuthState {
  accessToken: string | undefined;
  isLoggedIn: boolean;
  setAuthStatus: (status: AuthStatus) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: undefined,
  isLoggedIn: false,
  setAuthStatus: (status) => set(status),
}));
