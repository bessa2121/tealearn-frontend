import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import "./index.css";

import {
  ThemeProvider,
} from "@/providers/theme-provider";

import {
  LoadingProvider,
} from "@/contexts/LoadingContext";

import {
  AuthProvider,
} from "@/contexts/AuthContext";

import {
  Toaster,
} from "@/components/ui/sonner";

ReactDOM.createRoot(
  document.getElementById("root")!
).render(
  <React.StrictMode>

    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
    >

      <BrowserRouter>

        <LoadingProvider>

  <AuthProvider>

    <App />

    <Toaster richColors />

  </AuthProvider>

</LoadingProvider>

      </BrowserRouter>

    </ThemeProvider>

  </React.StrictMode>
);