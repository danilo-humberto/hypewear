import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "./hooks/theme-provider.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CartProvider } from "./hooks/useCart.tsx";
import { Toaster } from "@/components/ui/sonner.tsx";

const queryCliente = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryCliente}>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <CartProvider>
          <Toaster position="bottom-right" />
          <App />
        </CartProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
);
