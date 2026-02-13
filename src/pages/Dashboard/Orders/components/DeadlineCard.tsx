import React from "react";
import { Calendar } from "lucide-react";
import {
  formatDeadlineMaker,
  formatProductionTime,
} from "../utils/orderTimelineBuilder";
import type { OrderStatusEnum } from "../../../../types/dtos";
import styles from "../OrderDetails.module.css";

interface DeadlineCardProps {
  deadline: string;
  status: OrderStatusEnum;
  totalEstimatedProductionTime: number;
}

export const DeadlineCard: React.FC<DeadlineCardProps> = ({
  deadline,
  status,
  totalEstimatedProductionTime,
}) => {
  const deadlineMessage = formatDeadlineMaker(deadline, status);

  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <Calendar size={20} />
        <h2>Prazo de Entrega</h2>
      </div>
      <div className={styles.deadlineInfo}>
        <div className={styles.deadlineValue}>{deadlineMessage}</div>
        <p>
          O prazo total de produção foi de{" "}
          {formatProductionTime(totalEstimatedProductionTime)}.
        </p>
      </div>
    </section>
  );
};
