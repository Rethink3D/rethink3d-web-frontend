import React from "react";
import { motion } from "framer-motion";
import { Download, ShieldCheck } from "lucide-react";
import styles from "./Legal.module.css";

const PrivacyPolicy: React.FC = () => {
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
              Política de <br />
              <span className={styles.highlight} data-text="PRIVACIDADE.">
                Privacidade
              </span>
            </h1>
            <p className={styles.paragraph} style={{ textAlign: "center" }}>
              Última Atualização: 13 de fevereiro de 2026
            </p>
          </motion.div>
        </header>

        <motion.div
          className={styles.contentCard}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              marginBottom: "3rem",
            }}
          >
            <ShieldCheck size={32} className="text-blue-500" />
            <p style={{ fontWeight: 700, color: "var(--color-text-primary)" }}>
              Seus dados estão protegidos pela LGPD na Rethink3D.
            </p>
          </div>

          <section>
            <h2>1. Definições e Compromisso</h2>
            <p className={styles.paragraph}>
              A Rethink3D manifesta seu profundo compromisso com a
              transparência, a privacidade e a segurança dos dados em todas as
              etapas de interação com a Plataforma. Todas as operações de
              tratamento de dados pessoais são realizadas em estrita
              conformidade com a legislação brasileira aplicável, em especial
              com a Lei Geral de Proteção de Dados Pessoais (LGPD).
            </p>
          </section>

          <section>
            <h2>2. Dados Coletados</h2>
            <p className={styles.paragraph}>
              Coletamos informações essenciais para o funcionamento do
              marketplace:
            </p>
            <ul className={styles.list}>
              <li className={styles.listItem}>
                <strong>Cadastro:</strong> Nome, E-mail, CPF/CNPJ e Telefone.
              </li>
              <li className={styles.listItem}>
                <strong>Projetos:</strong> Arquivos 3D (STL, OBJ, 3MF) e
                especificações técnicas para orçamentos.
              </li>
              <li className={styles.listItem}>
                <strong>Transações:</strong> Informações de pagamento (via
                Asaas) e dados para repasse de Makers.
              </li>
              <li className={styles.listItem}>
                <strong>Automáticos:</strong> Endereço IP, cookies e logs de
                acesso conforme o Marco Civil da Internet.
              </li>
            </ul>
          </section>

          <section>
            <h2>3. Finalidade do Tratamento</h2>
            <p className={styles.paragraph}>
              Seus dados são utilizados exclusivamente para:
            </p>
            <ul className={styles.list}>
              <li className={styles.listItem}>
                Viabilizar a confecção de peças e entrega de produtos.
              </li>
              <li className={styles.listItem}>
                Garantir a segurança dos acessos e prevenir fraudes.
              </li>
              <li className={styles.listItem}>
                Processar pagamentos e repasses financeiros.
              </li>
              <li className={styles.listItem}>
                Cumprir obrigações legais de guarda de logs (6 meses).
              </li>
            </ul>
          </section>

          <section>
            <h2>4. Compartilhamento</h2>
            <p className={styles.paragraph}>
              A Rethink3D não comercializa seus dados. O compartilhamento ocorre
              apenas com parceiros essenciais (Intermediários de Pagamento e
              Servidores em Nuvem como Google Firebase) ou entre Cliente e Maker
              após a confirmação do pedido para viabilizar a entrega.
            </p>
          </section>

          <section>
            <h2>5. Seus Direitos</h2>
            <p className={styles.paragraph}>
              Você possui direito à confirmação, acesso, correção, anonimização
              ou eliminação de seus dados. Para exercer esses direitos, entre em
              contato conosco em <strong>contato@rethink3d.com.br</strong>.
            </p>
          </section>

          <div className={styles.downloadSection}>
            <p className={styles.paragraph}>
              Deseja ler o documento juridico completo em formato offline?
            </p>
            <a
              href="/legal/politica-de-privacidade.pdf"
              download
              className={styles.downloadButton}
            >
              <Download size={20} />
              Baixar Política de Privacidade (PDF)
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
