import { Link } from "react-router-dom";
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
            <Link to="/">Home</Link>
            <Link to="/products">Produtos</Link>
            <Link to="/makers">Makers</Link>
            <Link to="/contact">Contato</Link>
          </div>

          <div className={styles.column}>
            <h4>Legal</h4>
            <Link to="/terms">Termos de Uso</Link>
            <Link to="/privacy">Privacidade</Link>
            <Link to="/maker-terms">Termos de Maker</Link>
            <Link to="/delete-account">Exclusão de Conta</Link>
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
