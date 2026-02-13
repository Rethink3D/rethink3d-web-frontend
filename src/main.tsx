import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles/global.css";
import { ThemeProvider } from "./context/ThemeProvider";
import { AuthProvider } from "./context/AuthContext";
import { SettingsProvider } from "./context/SettingsProvider";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GoogleReCaptchaProvider
      reCaptchaKey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
      language="pt-BR"
    >
      <ThemeProvider>
        <AuthProvider>
          <SettingsProvider>
            <App />
          </SettingsProvider>
        </AuthProvider>
      </ThemeProvider>
    </GoogleReCaptchaProvider>
  </React.StrictMode>,
);
