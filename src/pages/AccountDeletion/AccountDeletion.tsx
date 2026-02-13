import React from "react";
import { motion } from "framer-motion";
import { ShieldAlert, Mail } from "lucide-react";
import styles from "./AccountDeletion.module.css";

const AccountDeletion: React.FC = () => {
  return (
    <div className={styles.section}>
      <div className={styles.decoration} />
      <div className={styles.container}>
        <header className={styles.header}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className={styles.title}>
              Exclusão de <br className="hidden md:block" />
              <span className={styles.highlight}>Conta</span>
            </h1>
          </motion.div>
        </header>

        <motion.div
          className={styles.contentCard}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className={styles.iconWrapper}>
            <ShieldAlert size={40} strokeWidth={1.5} />
          </div>

          <p className={styles.paragraph}>
            Os usuários da <strong>Rethink3D</strong> podem solicitar a exclusão
            completa de sua conta e dos dados pessoais armazenados enviando uma
            solicitação direta para:
          </p>

          <a
            href="mailto:contato@rethink3d.com.br"
            className={styles.emailLink}
          >
            <Mail size={24} />
            contato@rethink3d.com.br
          </a>

          <p className={styles.paragraph} style={{ fontSize: "1.1rem" }}>
            Após a confirmação da identidade, todos os dados pessoais associados
            à conta serão removidos de forma segura, conforme o{" "}
            <strong>Marco Civil da Internet</strong>.
          </p>

          <p
            className={styles.paragraph}
            style={{ fontSize: "0.95rem", opacity: 0.7 }}
          >
            <em>
              Notas fiscais e logs de acesso obrigatórios por lei podem ser
              mantidos por até 6 meses.
            </em>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default AccountDeletion;
