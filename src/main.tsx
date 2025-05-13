import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "./hooks/theme-provider.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryCliente = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryCliente}>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
);
