import { useState } from "react";
import type { FormEvent } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import { Button } from "../components/ui/button";
import { Card, CardDescription, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { useAuth } from "../context/AuthContext";
import { api } from "../lib/api";

const LoginPage = () => {
  const navigate = useNavigate();
  const { token, setTokenValue, refetchUser } = useAuth();
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin123");
  const [isSubmitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (token) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const response = await api.post<{ access_token: string }>("/auth/login", { username, password });
      setTokenValue(response.data.access_token);
      refetchUser();
      navigate("/");
    } catch (err) {
      setError("Неверный логин или пароль");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-950 dark:to-slate-900 px-4">
      <div className="w-full max-w-md">
        <Card className="bg-slate-800/90 backdrop-blur-sm border-slate-700 shadow-2xl shadow-slate-900/20 dark:bg-slate-900/80 dark:border-slate-800 dark:shadow-slate-950/30">
          <div className="mb-6 text-center">
            <p className="text-xs uppercase tracking-widest text-slate-400 mb-2">Учебная платформа</p>
            <CardTitle className="text-2xl font-bold text-slate-100 dark:text-white mb-2">BM CaseFlow</CardTitle>
            <CardDescription className="text-slate-400 dark:text-slate-300">
              Войдите, чтобы увидеть задания.
            </CardDescription>
          </div>
          <form className="space-y-5 text-left" onSubmit={handleSubmit}>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-300 dark:text-slate-200" htmlFor="username">
                Логин
              </label>
              <Input 
                id="username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                placeholder="Введите логин"
                className="bg-slate-700/50 border-slate-600 text-slate-100 placeholder:text-slate-400 focus:ring-2 focus:ring-brand-500 focus:border-transparent dark:bg-slate-800/50 dark:border-slate-700 dark:text-white"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-300 dark:text-slate-200" htmlFor="password">
                Пароль
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Введите пароль"
                className="bg-slate-700/50 border-slate-600 text-slate-100 placeholder:text-slate-400 focus:ring-2 focus:ring-brand-500 focus:border-transparent dark:bg-slate-800/50 dark:border-slate-700 dark:text-white"
              />
            </div>
            {error && (
              <div className="pt-2">
                <p className="text-sm text-rose-400 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {error}
                </p>
              </div>
            )}
            <Button 
              type="submit" 
              className="w-full py-5 text-base font-semibold bg-brand-600 hover:bg-brand-700 transition-all duration-300 transform hover:-translate-y-0.5 focus:ring-4 focus:ring-brand-500/30"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Входим...
                </span>
              ) : (
                "Войти в аккаунт"
              )}
            </Button>
          </form>
        </Card>
        <p className="mt-6 text-center text-sm text-slate-400 dark:text-slate-500">
          © {new Date().getFullYear()} BM CaseFlow. Все права защищены.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
