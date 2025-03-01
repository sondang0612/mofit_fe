import { useAuthStore } from "@/hooks/store/useAuthStore";
import { cookiesKey } from "@/libs/cookiesKey";
import Cookies from "js-cookie";
import React, { ReactNode } from "react";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const setAuthStatus = useAuthStore((state) => state.setAuthStatus);
  React.useEffect(() => {
    const accessToken = Cookies.get(cookiesKey.ACCESS_TOKEN);
    if (accessToken) {
      setAuthStatus({ accessToken, isLoggedIn: true });
    }
  }, []);
  return children;
};
