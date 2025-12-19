import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";

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

// Фиктивный пользователь для обхода аутентификации
const mockUser: User = {
  id: 1,
  username: "anonymous",
  is_admin: false,
};

const mockToken = "mock-token-for-bypass";

export const AuthProviderMock = ({ children }: { children: ReactNode }) => {
  const setToken = useState<string | null>(mockToken)[1];

  const setTokenValue = useCallback((value: string | null) => {
    // В режиме обхода аутентификации не меняем токен
    if (value) {
      setToken(mockToken);
    }
  }, []);

  const logout = useCallback(() => {
    // В режиме обхода аутентификации не выполняем выход
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user: mockUser,
      token: mockToken,
      isLoading: false,
      setTokenValue,
      logout,
      refetchUser: () => {
        // В режиме обхода аутентификации не обновляем данные
      },
    }),
    [setTokenValue, logout],
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