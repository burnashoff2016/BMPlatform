import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "./AppMock"; // Используем фиктивное приложение
import { AuthProviderMock } from "./context/AuthContextMock"; // Используем фиктивный контекст
import { ThemeProvider } from "./context/ThemeContext";
import "./index.css";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProviderMock> {/* Используем фиктивный провайдер */}
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AuthProviderMock>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
);