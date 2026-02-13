import React from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, ChevronRight } from "lucide-react";
import { parseBackendDate } from "../../../utils/dateUtil";
import { getOrderStatusConfig } from "../../../utils/orderStatusUtil";
import styles from "./OrderListItem.module.css";

interface OrderListItemProps {
  order: {
    id: string;
    creationTime: string;
    status: string;
  };
}

const getStatusClass = (status: string) => {
  if (["on_going", "ready", "done", "awaiting_confirmation"].includes(status))
    return styles.status_active;
  if (["awaiting_maker", "new_deadline"].includes(status))
    return styles.status_pending;
  if (status === "delayed") return styles.status_delayed;
  return "";
};

export const OrderListItem: React.FC<OrderListItemProps> = ({ order }) => {
  const navigate = useNavigate();
  const statusConfig = getOrderStatusConfig(order.status);

  const formatDate = (dateString: string | undefined | null) => {
    const date = parseBackendDate(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
    });
  };

  return (
    <div
      className={styles.orderItem}
      onClick={() => navigate(`/dashboard/orders/${order.id}`)}
    >
      <div className={styles.orderInfo}>
        <h4>Pedido #{order.id.slice(0, 8)}</h4>
        <div className={styles.orderDate}>
          <Calendar size={12} />
          {formatDate(order.creationTime)}
        </div>
      </div>
      <span className={`${styles.orderStatus} ${getStatusClass(order.status)}`}>
        {statusConfig.label}
      </span>
      <ChevronRight size={16} color="#666" />
    </div>
  );
};
