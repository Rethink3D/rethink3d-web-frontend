import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles/global.css";
import { ThemeProvider } from "./context/ThemeProvider";
import { AuthProvider } from "./context/AuthContext";
import { SettingsProvider } from "./context/SettingsProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <SettingsProvider>
          <App />
        </SettingsProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
