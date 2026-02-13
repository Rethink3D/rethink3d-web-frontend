import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Download, Clock, Percent } from "lucide-react";
import { useConstants } from "../../hooks/useConstants";
import { ConstantName } from "../../types/constants";
import styles from "./Legal.module.css";

const MakerTerms: React.FC = () => {
  const { getConstant, loading } = useConstants([
    ConstantName.INTERMEDIARY_TAX,
    ConstantName.MAKER_ACCEPTANCE_DAYS,
    ConstantName.DELIVERY_HANDLING_DAYS,
  ]);

  const taxValue = getConstant(ConstantName.INTERMEDIARY_TAX, 0.12);
  const acceptanceDays = getConstant(ConstantName.MAKER_ACCEPTANCE_DAYS, 2);
  const deliveryDays = getConstant(ConstantName.DELIVERY_HANDLING_DAYS, 5);

  const formattedTax = `${(Number(taxValue) * 100).toFixed(0)}%`;

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
              Termos dos <br />
              <span className={styles.highlight} data-text="MAKERS.">
                Makers
              </span>
            </h1>
            <p className={styles.paragraph} style={{ textAlign: "center" }}>
              Regras Adicionais para Prestadores de Serviço
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
            <Briefcase size={32} className="text-green-500" />
            <p style={{ fontWeight: 700, color: "var(--color-text-primary)" }}>
              Obrigatório para todos os parceiros produtores da Plataforma.
            </p>
          </div>

          <section>
            <h2>1. Qualificação e Cadastro</h2>
            <p className={styles.paragraph}>
              Makers podem ser pessoas físicas ou jurídicas. Ao se cadastrar, o
              Maker garante possuir o equipamento e conhecimento técnico
              necessário para executar as impressões com qualidade. A Rethink3D
              pode exigir documentos comprobatórios a qualquer momento.
            </p>
          </section>

          <section>
            <h2>2. Prazos e Responsabilidades</h2>
            <ul className={styles.list}>
              <li className={styles.listItem}>
                <Clock
                  size={18}
                  style={{ marginRight: "8px", verticalAlign: "middle" }}
                />
                <strong>Resposta a Pedidos:</strong> O Maker deve aceitar ou
                recusar um Pedido Customizado em até{" "}
                <strong>{loading ? "..." : `${acceptanceDays} dias`}</strong>{" "}
                úteis. A inércia pode resultar no cancelamento automático e
                prejuízo à reputação.
              </li>
              <li className={styles.listItem}>
                <strong>Qualidade:</strong> O Maker é o único responsável por
                vícios de fabricação ou danos causados por embalagem inadequada.
              </li>
              <li className={styles.listItem}>
                <strong>Envio:</strong> O Maker deve postar o produto no prazo
                acordado no orçamento, observando o tempo de processamento
                padrão de até{" "}
                <strong>{loading ? "..." : `${deliveryDays} dias`}</strong>{" "}
                úteis em casos omissos.
              </li>
            </ul>
          </section>

          <section>
            <h2>3. Modelo Comercial</h2>
            <ul className={styles.list}>
              <li className={styles.listItem}>
                <Percent
                  size={18}
                  style={{ marginRight: "8px", verticalAlign: "middle" }}
                />
                <strong>Taxa Rethink3D:</strong> Será retido{" "}
                <strong>{loading ? "..." : formattedTax}</strong> do valor total
                do pedido.
              </li>
              <li className={styles.listItem}>
                <strong>Repasse (Payout):</strong> O pagamento será liberado
                para o Maker em até 7 dias úteis após a confirmação de
                recebimento ("DONE") pelo Cliente ou expiração do prazo de 2
                dias de recebimento tácito.
              </li>
            </ul>
          </section>

          <section>
            <h2>4. Garantia e CDC</h2>
            <p className={styles.paragraph}>
              O Maker entende que atua como **Fornecedor** perante o CDC,
              devendo respeitar a garantia legal de 90 dias contra defeitos de
              fabricação.
            </p>
          </section>

          <div className={styles.downloadSection}>
            <p className={styles.paragraph}>
              Este documento é complementar aos Termos Gerais.
            </p>
            <a
              href="/legal/termos-adicionais-makers.pdf"
              download
              className={styles.downloadButton}
            >
              <Download size={20} />
              Baixar Termos Adicionais Makers (PDF)
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MakerTerms;
