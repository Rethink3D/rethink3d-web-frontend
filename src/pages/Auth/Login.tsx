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
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                  alt="Google"
                  className={styles.socialIcon}
                />
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
