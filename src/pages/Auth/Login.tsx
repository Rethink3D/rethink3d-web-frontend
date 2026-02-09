import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../../context/useAuth";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { PrinterViewer } from "../../components/ui/PrinterViewer";
import styles from "./Login.module.css";

interface LoginError extends Error {
  code?: string;
}

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { signIn, signInWithGoogle, signInWithApple } = useAuth();
  const navigate = useNavigate();

  const handleLoginError = (err: unknown) => {
    console.error(err);
    const error = err as LoginError;

    if (error.message === "INCOMPLETE_PROFILE") {
      setError(
        "Sua conta não possui um perfil de Maker completo. Por favor, utilize o aplicativo para finalizar seu cadastro.",
      );
    } else if (error.code === "auth/invalid-credential") {
      setError("Credenciais inválidas.");
    } else if (error.code === "auth/popup-closed-by-user") {
      setError("Login cancelado pelo usuário.");
    } else {
      setError("Ocorreu um erro ao fazer login. Tente novamente.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await signIn(email, password);
      navigate("/dashboard");
    } catch (err: unknown) {
      handleLoginError(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError(null);
    setIsSubmitting(true);
    try {
      if (signInWithGoogle) {
        await signInWithGoogle();
        navigate("/dashboard");
      }
    } catch (err: unknown) {
      handleLoginError(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAppleLogin = async () => {
    setError(null);
    setIsSubmitting(true);
    try {
      if (signInWithApple) {
        await signInWithApple();
        navigate("/dashboard");
      }
    } catch (err: unknown) {
      handleLoginError(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formSection}>
        <div className={styles.contentWrapper}>
          <h1 className={styles.title}>Bem-vindo</h1>
          <p className={styles.subtitle}>Acesse sua dashboard Maker</p>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="email" className={styles.label}>
                E-mail
              </label>
              <div className={styles.inputWrapper}>
                <Mail className={styles.icon} size={18} />
                <input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  className={styles.input}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="password" className={styles.label}>
                Senha
              </label>
              <div className={styles.inputWrapper}>
                <Lock className={styles.icon} size={18} />
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className={styles.input}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {error && <div className={styles.error}>{error}</div>}

            <button
              type="submit"
              className={styles.submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Entrando..." : "Entrar"}
              {!isSubmitting && <ArrowRight size={18} />}
            </button>

            <div className={styles.separator}>
              <span>Ou continue com</span>
            </div>

            <div className={styles.socialButtons}>
              <button
                type="button"
                className={styles.socialButton}
                onClick={handleGoogleLogin}
                disabled={isSubmitting}
              >
                <svg className={styles.socialIcon} viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1 .67-2.26 1.07-3.71 1.07-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Google
              </button>
              <button
                type="button"
                className={styles.socialButton}
                onClick={handleAppleLogin}
                disabled={isSubmitting}
              >
                <svg className={styles.socialIcon} viewBox="0 0 384 512">
                  <path
                    fill="currentColor"
                    d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5c0 66.2 23.9 122.2 52.4 167.7 20.3 32.9 44.7 68.2 76.9 66.8 28.5-1.2 38.6-18.1 72.4-18.1 33.3 0 43.8 17.5 73.1 17.5 30.2 0 54-27.1 73.6-59.5 15.6-26.7 22-47.1 22.3-48.2-.5-.2-42.9-16.6-46-60.9zM208 19.3c15.6-19.5 26.2-46.1 23.1-69.7-22.5 1.5-49.8 15.1-65.7 34-14.7 17.5-27.6 45.4-24.3 68.4 25.1 2.3 50.8-12.7 66.9-32.7z"
                  />
                </svg>
                Apple
              </button>
            </div>
          </form>

          <div className={styles.footer}>
            <p>Novo por aqui?</p>
            <Link to="/" className={styles.link}>
              Baixe o App para se cadastrar
            </Link>
          </div>
        </div>
      </div>

      <div className={styles.visualSection}>
        <motion.div
          className={styles.printerVisualWrapper}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <PrinterViewer />
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
