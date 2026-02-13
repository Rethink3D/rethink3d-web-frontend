import React from "react";
import { motion } from "framer-motion";
import { Scale, Download } from "lucide-react";
import { useConstants } from "../../hooks/useConstants";
import { ConstantName } from "../../types/constants";
import styles from "./Legal.module.css";

const TermsOfUse: React.FC = () => {
  const { getConstant, loading } = useConstants([
    ConstantName.INTERMEDIARY_TAX,
    ConstantName.MIN_ORDER_VALUE,
  ]);

  const taxValue = getConstant(ConstantName.INTERMEDIARY_TAX, 0.12);
  const minOrderValue = getConstant(ConstantName.MIN_ORDER_VALUE, 10);

  const formattedTax = `${(Number(taxValue) * 100).toFixed(0)}%`;
  const formattedMinOrder = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Number(minOrderValue));

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
              Termos e <br />
              <span className={styles.highlight} data-text="CONDIÇÕES.">
                Condições
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
            <Scale size={32} className="text-blue-500" />
            <p style={{ fontWeight: 700, color: "var(--color-text-primary)" }}>
              Contrato de adesão legalmente vinculante para todos os usuários.
            </p>
          </div>

          <section>
            <h2>1. Objeto dos Serviços</h2>
            <p className={styles.paragraph}>
              A Rethink3D atua como um marketplace de intermediação tecnológica,
              conectando Clientes que precisam de peças impressas em 3D a Makers
              capazes de fornecer tais serviços. A Rethink3D{" "}
              <strong>NÃO</strong> é fabricante ou vendedora direta das peças; a
              responsabilidade pela qualidade e entrega é do Maker contratado.
            </p>
          </section>

          <section>
            <h2>2. Regras Financeiras e Taxas</h2>
            <ul className={styles.list}>
              <li className={styles.listItem}>
                <strong>Comissão de Intermediação:</strong> A Rethink3D retém{" "}
                <strong>{loading ? "..." : formattedTax}</strong> sobre o valor
                total bruto de cada transação concluída na plataforma.
              </li>
              <li className={styles.listItem}>
                <strong>Valor Mínimo:</strong> O valor mínimo para qualquer
                pedido ou orçamento na plataforma é de{" "}
                <strong>{loading ? "..." : formattedMinOrder}</strong>.
              </li>
              <li className={styles.listItem}>
                <strong>Não Contorno:</strong> É expressamente proibido que
                Usuários iniciem uma negociação na Rethink3D e a concluam por
                fora da plataforma para evitar taxas. O descumprimento gera
                banimento imediato.
              </li>
            </ul>
          </section>

          <section>
            <h2>3. Responsabilidades do Cliente</h2>
            <p className={styles.paragraph}>
              O Cliente garante possuir os direitos de propriedade intelectual
              sobre os arquivos 3D enviados para orçamento. Ao carregar um
              modelo, o Cliente assume total responsabilidade por infrações de
              copyright ou patentes.
            </p>
          </section>

          <section>
            <h2>4. Sistema de Chat e Orçamentos</h2>
            <p className={styles.paragraph}>
              O chat deve ser usado exclusivamente para alinhamento técnico e
              comercial do pedido. Proibições incluem o envio de spam, conteúdo
              ofensivo ou troca de contatos pessoais (Telefone/WhatsApp) antes
              da confirmação do pagamento.
            </p>
          </section>

          <section>
            <h2>5. Cancelamento e Arrependimento</h2>
            <p className={styles.paragraph}>
              Conforme o CDC, o Cliente possui 7 dias de arrependimento. No
              entanto, para produtos personalizados (sob medida), as regras de
              cancelamento podem sofrer restrições caso a produção já tenha sido
              iniciada pelo Maker.
            </p>
          </section>

          <div className={styles.downloadSection}>
            <p className={styles.paragraph}>
              Abaixo disponibilizamos os Termos e Condições Gerais completos:
            </p>
            <a
              href="/legal/termos-e-condicoes-gerais.pdf"
              download
              className={styles.downloadButton}
            >
              <Download size={20} />
              Baixar Termos Gerais (PDF)
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsOfUse;
