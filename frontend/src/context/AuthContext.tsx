import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { api } from "../lib/api";
import { getToken, logout as clearToken, saveToken } from "../lib/auth";

export type User = {
  id: number;
  username: string;
  is_admin: boolean;
};

type AuthContextValue = {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  setTokenValue: (value: string | null) => void;
  logout: () => void;
  refetchUser: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();
  const [token, setToken] = useState<string | null>(getToken());

  const { data, isFetching, refetch } = useQuery({
    queryKey: ["current-user", token],
    queryFn: async () => {
      if (!token) {
        throw new Error("no-token");
      }
      const response = await api.get<User>("/auth/me");
      return response.data;
    },
    enabled: Boolean(token),
    retry: false,
  });

  const setTokenValue = useCallback((value: string | null) => {
    if (value) {
      saveToken(value);
      setToken(value);
    } else {
      clearToken();
      setToken(null);
      queryClient.removeQueries({ queryKey: ["current-user"] });
    }
  }, [queryClient]);

  const logout = useCallback(() => {
    clearToken();
    setToken(null);
    queryClient.clear();
  }, [queryClient]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user: data ?? null,
      token,
      isLoading: Boolean(token) && isFetching,
      setTokenValue,
      logout,
      refetchUser: () => {
        void refetch();
      },
    }),
    [data, token, isFetching, setTokenValue, logout, refetch],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
