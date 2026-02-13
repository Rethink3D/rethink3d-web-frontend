import React from "react";
import { ArrowRight, Package, AlertTriangle } from "lucide-react";
import type { OrderPreviewDTO } from "../../../../types/dtos/order";
import { formatCurrency } from "../../../../utils/formatCurrency";
import { getImageUrl } from "../../../../utils/imageUtil";
import { parseBackendDate } from "../../../../utils/dateUtil";
import { getOrderStatusConfig } from "../../../../utils/orderStatusUtil";
import styles from "./OrderCard.module.css";

interface OrderCardProps {
  order: OrderPreviewDTO;
  onClick?: () => void;
}

export const OrderCard: React.FC<OrderCardProps> = React.memo(
  ({ order, onClick }) => {
    const statusInfo = getOrderStatusConfig(order.status);

    const formattedDate = new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "long",
      hour: "2-digit",
      minute: "2-digit",
    }).format(parseBackendDate(order.creationTime));

    return (
      <div className={styles.orderCard} onClick={onClick}>
        <div className={styles.imageWrapper}>
          <img
            src={getImageUrl(order.imageUrl)}
            alt={`Pedido ${order.id}`}
            className={styles.orderImage}
            loading="lazy"
          />
        </div>

        <div className={styles.orderContent}>
          <div className={styles.cardHeader}>
            <div className={styles.idGroup}>
              <span className={styles.orderId}># {order.id.split("-")[0]}</span>
            </div>
            <span className={styles.creationDate}>{formattedDate}</span>
          </div>

          <div className={styles.mainInfo}>
            <h3>
              {order.type === "product"
                ? "Pedido de Produto"
                : "Pedido Customizado"}
            </h3>
            <div className={styles.serviceLine}>
              <Package size={14} />
              <span>
                {order.service === "printing"
                  ? "Impressão 3D"
                  : "Modelagem & Impressão"}
              </span>
            </div>
          </div>

          <div className={styles.cardFooter}>
            <div className={styles.valueContainer}>
              <span className={styles.valueLabel}>Valor Total</span>
              <span className={styles.totalValue}>
                {formatCurrency(order.totalValue)}
              </span>
            </div>

            <div className={styles.statusWrapper}>
              {order.status === "awaiting_maker" && (
                <div
                  className={styles.criticalIndicator}
                  title="Novo pedido pendente"
                >
                  <AlertTriangle size={12} fill="currentColor" />
                  <span>PENDENTE</span>
                </div>
              )}
              <div className={`${styles.statusBadge} ${styles[order.status]}`}>
                {statusInfo.icon(14)}
                <span>{statusInfo.label}</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.arrowIcon}>
          <ArrowRight size={20} />
        </div>
      </div>
    );
  },
);
