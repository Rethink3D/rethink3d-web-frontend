import React from "react";
import { Mail, Instagram } from "lucide-react";
import styles from "./Footer.module.css";

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <h3>Rethink3D</h3>
          <p>Conectando ideias à realidade através da impressão 3D.</p>
        </div>

        <div className={styles.links}>
          <div className={styles.column}>
            <h4>Navegação</h4>
            <a href="/">Home</a>
            <a href="/products">Produtos</a>
            <a href="/makers">Makers</a>
            <a href="/contact">Contato</a>
          </div>

          <div className={styles.column}>
            <h4>Legal</h4>
            <a href="/terms">Termos de Uso</a>
            <a href="/privacy">Privacidade</a>
            <a href="/delete-account">Exclusão de Conta</a>
          </div>

          <div className={`${styles.column} ${styles.contactColumn}`}>
            <h4>Contato</h4>
            <a
              href="mailto:contato@rethink3d.com.br"
              className={styles.iconLink}
            >
              <Mail size={16} /> contato@rethink3d.com.br
            </a>
            <a
              href="https://instagram.com/_rethink3d"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.iconLink}
            >
              <Instagram size={16} /> @_rethink3d
            </a>
          </div>
        </div>
      </div>
      <div className={styles.copyright}>
        <p>
          &copy; {new Date().getFullYear()} Rethink3D. Todos os direitos
          reservados.
        </p>
      </div>
    </footer>
  );
};
