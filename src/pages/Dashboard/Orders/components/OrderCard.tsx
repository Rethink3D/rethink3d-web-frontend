import React from "react";
import {
  ArrowRight,
  Package,
  Clock,
  CheckCircle2,
  AlertTriangle,
  CreditCard,
  Truck,
} from "lucide-react";
import type { OrderPreviewDTO } from "../../../../types/dtos";
import { formatCurrency } from "../../../../utils/formatCurrency";
import { getImageUrl } from "../../../../utils/imageUtil";
import { parseBackendDate } from "../../../../utils/dateUtil";
import styles from "./OrderCard.module.css";

interface OrderCardProps {
  order: OrderPreviewDTO;
  onClick?: () => void;
}

const statusConfig: Record<string, { label: string; icon: React.ReactNode }> = {
  awaiting_payment: {
    label: "Aguardando Pagamento",
    icon: <CreditCard size={14} />,
  },
  awaiting_maker: { label: "Novo Pedido", icon: <Package size={14} /> },
  on_going: { label: "Em Produção", icon: <Clock size={14} /> },
  ready: { label: "Pronto para Entrega", icon: <Truck size={14} /> },
  delayed: { label: "Atrasado", icon: <AlertTriangle size={14} /> },
  new_deadline: { label: "Novo Prazo Solicitado", icon: <Clock size={14} /> },
  awaiting_confirmation: {
    label: "Aguardando Confirmação",
    icon: <CheckCircle2 size={14} />,
  },
  refund_in_analysis: {
    label: "Reembolso em Análise",
    icon: <AlertTriangle size={14} />,
  },
  refund_in_process: {
    label: "Reembolso em Processamento",
    icon: <CreditCard size={14} />,
  },
  partial_refund_in_process: {
    label: "Reembolso Parcial em Processamento",
    icon: <CreditCard size={14} />,
  },
  partial_refund: {
    label: "Reembolso Parcial",
    icon: <CheckCircle2 size={14} />,
  },
  refunded: { label: "Reembolsado", icon: <CheckCircle2 size={14} /> },
  done: { label: "Finalizado", icon: <CheckCircle2 size={14} /> },
};

export const OrderCard: React.FC<OrderCardProps> = React.memo(
  ({ order, onClick }) => {
    const statusInfo = statusConfig[order.status] || {
      label: order.status,
      icon: <Package size={14} />,
    };

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
                {statusInfo.icon}
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
