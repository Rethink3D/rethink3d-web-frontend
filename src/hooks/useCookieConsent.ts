import { useState } from "react";

const CONSENT_KEY = "rethink3d_cookie_consent";

export type ConsentStatus = "pending" | "accepted" | "rejected";

// Função helper para ler consentimento do localStorage
const getInitialConsent = (): ConsentStatus => {
  if (typeof window === "undefined") return "pending";
  const savedConsent = localStorage.getItem(CONSENT_KEY);
  if (savedConsent === "accepted" || savedConsent === "rejected") {
    return savedConsent as ConsentStatus;
  }
  return "pending";
};

export const useCookieConsent = () => {
  // Lazy initialization: função só executa na primeira renderização
  const [consent, setConsent] = useState<ConsentStatus>(getInitialConsent);

  const acceptCookies = () => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setConsent("accepted");
    window.location.reload();
  };

  const rejectCookies = () => {
    localStorage.setItem(CONSENT_KEY, "rejected");
    setConsent("rejected");
  };

  const resetConsent = () => {
    localStorage.removeItem(CONSENT_KEY);
    setConsent("pending");
  };

  return {
    consent,
    acceptCookies,
    rejectCookies,
    resetConsent,
    hasConsent: consent === "accepted",
  };
};
