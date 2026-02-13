import React from "react";
import { getOrderStatusConfig } from "../../../../utils/orderStatusUtil";
import styles from "../OrderDetails.module.css";

interface OrderHeaderProps {
  orderId: string;
  orderType: string;
  creationTime: string;
  status: string;
}

export const OrderHeader: React.FC<OrderHeaderProps> = ({
  orderId,
  orderType,
  creationTime,
  status,
}) => {
  const statusInfo = getOrderStatusConfig(status);

  const formattedDate = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(creationTime));

  return (
    <div className={styles.header}>
      <div className={styles.titleSection}>
        <div className={styles.idBadge}>PEDIDO #{orderId.split("-")[0]}</div>
        <h1>
          {orderType === "product"
            ? "Pedido de Produto"
            : "Projeto Customizado"}
        </h1>
        <p className={styles.creationTime}>Realizado em {formattedDate}</p>
      </div>

      <div
        className={styles.statusSection}
        style={{ color: statusInfo.color, borderColor: statusInfo.color }}
      >
        {statusInfo.icon(18)}
        <span>{statusInfo.label}</span>
      </div>
    </div>
  );
};
