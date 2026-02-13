import React from "react";
import { FileText } from "lucide-react";
import { formatCurrency } from "../../../../utils/formatCurrency";
import styles from "../OrderDetails.module.css";

interface FinancialSummaryProps {
  totalValue: number;
  paymentFee: number;
  subtotal: number;
  intermediaryFee?: number;
}

export const FinancialSummary: React.FC<FinancialSummaryProps> = ({
  totalValue,
  paymentFee,
  subtotal,
  intermediaryFee,
}) => {
  const calculatedIntermediaryFee = Math.max(
    0,
    totalValue - paymentFee - subtotal,
  );

  const displayIntermediaryFee =
    intermediaryFee && intermediaryFee > 0
      ? intermediaryFee
      : calculatedIntermediaryFee;

  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <FileText size={20} />
        <h2>Resumo Financeiro</h2>
      </div>
      <div className={styles.summaryTable}>
        <div className={styles.summaryRow}>
          <div className={styles.labelWithInfo}>
            <span>Total Pago pelo Cliente</span>
          </div>
          <span className={styles.valueStrong}>
            {formatCurrency(totalValue)}
          </span>
        </div>

        {paymentFee > 0 && (
          <div className={`${styles.summaryRow} ${styles.neutralRow}`}>
            <div className={styles.labelWithInfo}>
              <span>Taxa de Transação</span>
              <span className={styles.infoText}>(Paga pelo cliente)</span>
            </div>
            <span>- {formatCurrency(paymentFee)}</span>
          </div>
        )}

        {displayIntermediaryFee > 0 && (
          <div className={styles.summaryRow}>
            <div className={styles.labelWithInfo}>
              <span>Taxa de Intermediação</span>
              <span className={styles.infoText}>(Comissão da plataforma)</span>
            </div>
            <span className={styles.valueStrong}>
              - {formatCurrency(displayIntermediaryFee)}
            </span>
          </div>
        )}

        <div className={styles.dashedDivider} />

        <div className={`${styles.summaryRow} ${styles.totalRow}`}>
          <span>Você recebe (Líquido)</span>
          <span className={styles.earningsValue}>
            {formatCurrency(subtotal)}
          </span>
        </div>
      </div>
    </section>
  );
};
