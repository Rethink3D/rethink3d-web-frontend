import React from "react";
import { useCookieConsent } from "../../hooks/useCookieConsent";
import styles from "./CookieConsent.module.css";

export const CookieConsent: React.FC = () => {
  const { consent, acceptCookies, rejectCookies } = useCookieConsent();

  if (consent !== "pending") {
    return null;
  }

  return (
    <div
      className={styles.cookieBanner}
      role="dialog"
      aria-label="Consentimento de cookies"
    >
      <div className={styles.container}>
        <div className={styles.content}>
          <h3 className={styles.title}>
            <span className={styles.icon}>🍪</span>
            Cookies e Privacidade
          </h3>
          <p className={styles.description}>
            Usamos cookies para melhorar sua experiência e analisar o uso do
            site. Ao aceitar, você concorda com nossa{" "}
            <a href="/privacy" target="_blank" rel="noopener noreferrer">
              Política de Privacidade
            </a>
            .
          </p>
        </div>

        <div className={styles.actions}>
          <button
            onClick={rejectCookies}
            className={`${styles.button} ${styles.rejectButton}`}
            aria-label="Rejeitar cookies"
          >
            Rejeitar
          </button>
          <button
            onClick={acceptCookies}
            className={`${styles.button} ${styles.acceptButton}`}
            aria-label="Aceitar cookies"
          >
            Aceitar Cookies
          </button>
        </div>
      </div>
    </div>
  );
};
