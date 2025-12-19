import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Home, Layers, Menu, MessageCircle, Moon, Settings as SettingsIcon, Sun, X } from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";

const navItems = [
  { label: "Главная", description: "Дашборд и кейсы", icon: Home, href: "/" },
  { label: "Настройки", description: "Тема, профиль", icon: SettingsIcon, href: "/settings" },
  { label: "Обратная связь", description: "TG и почта", icon: MessageCircle, href: "/feedback" },
  { label: "Технологический стек", description: "Что под капотом", icon: Layers, href: "/stack" },
];

const MainLayout = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-slate-900/60 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-72 transform border-r border-slate-200 bg-white/95 px-6 py-8 shadow-xl transition-transform dark:border-slate-800 dark:bg-slate-900/95 lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Учебные кейсы</p>
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">BM CaseFlow</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            платформа курса «Информационно-аналитические технологии ГМУ»
          </p>
        </div>
        <nav className="flex flex-col gap-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const content = (
              <span className="flex flex-col text-left">
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{item.label}</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">{item.description}</span>
              </span>
            );
            return (
              <Button
                key={item.label}
                variant="ghost"
                className={cn(
                  "flex w-full items-center justify-between rounded-2xl border border-slate-200 px-4 py-3 text-slate-600 hover:border-brand-500 hover:text-brand-600 dark:border-slate-700 dark:text-slate-200",
                  location.pathname === item.href &&
                    "border-brand-500 bg-brand-50/40 text-brand-700 dark:bg-slate-800 dark:text-brand-300",
                )}
                asChild
              >
                <Link to={item.href} onClick={() => setSidebarOpen(false)}>
                  <div className="flex items-center gap-3">
                    <Icon size={18} />
                    {content}
                  </div>
                </Link>
              </Button>
            );
          })}
        </nav>
        <div className="mt-auto pt-10 text-xs text-slate-400 dark:text-slate-500">
           © BM CaseFlow 2025
        </div>
      </aside>
      <section className="flex min-h-screen flex-col lg:pl-72">
        <header className="flex items-center justify-between border-b border-slate-200/70 bg-white/80 px-6 py-4 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
          <div className="flex items-center gap-3">
            <button
              className="rounded-xl border border-slate-200 p-2 text-slate-600 transition hover:border-brand-500 hover:text-brand-600 dark:border-slate-700 dark:text-slate-300 lg:hidden"
              onClick={() => setSidebarOpen((prev) => !prev)}
              aria-label="Открыть меню"
            >
              {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">BM CaseFlow</p>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                Платформа курса «Информационно-аналитические технологии государственного и муниципального управления»
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              className="flex h-11 w-20 items-center justify-center gap-2 rounded-2xl border border-slate-200 text-sm font-medium text-slate-600 transition hover:border-brand-500 hover:text-brand-600 dark:border-slate-700 dark:text-slate-200"
              onClick={toggleTheme}
              aria-label="Сменить тему"
              title="Сменить тему"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
              <span className="uppercase text-[10px] tracking-widest">{theme === "dark" ? "День" : "Ночь"}</span>
            </button>
            <div className="text-right">
              <p className="text-sm font-semibold text-slate-900 dark:text-white">{user?.username}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{user?.is_admin ? "Руководитель" : "Магистрант"}</p>
            </div>
            <Button variant="ghost" onClick={logout}>
              Выйти
            </Button>
          </div>
        </header>
        <main className="flex-1 px-4 py-8 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <Outlet />
          </div>
        </main>
      </section>
    </div>
  );
};

export default MainLayout;
