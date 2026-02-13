import React from "react";
import {
  Package,
  CreditCard,
  Clock,
  Truck,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

export interface OrderStatusConfig {
  label: string;
  icon: (size?: number) => React.ReactNode;
  color: string;
  textColor?: string;
}

const statusMap: Record<string, OrderStatusConfig> = {
  awaiting_payment: {
    label: "Aguardando Pagamento",
    icon: (size = 18) => <CreditCard size={size} />,
    color: "#eab308",
  },
  awaiting_maker: {
    label: "Novo Pedido",
    icon: (size = 18) => <Package size={size} />,
    color: "#3b82f6",
  },
  on_going: {
    label: "Em Produção",
    icon: (size = 18) => <Clock size={size} />,
    color: "#a855f7",
  },
  ready: {
    label: "Pronto para Entrega",
    icon: (size = 18) => <Truck size={size} />,
    color: "#22c55e",
  },
  delayed: {
    label: "Atrasado",
    icon: (size = 18) => <AlertTriangle size={size} />,
    color: "#ef4444",
  },
  done: {
    label: "Finalizado",
    icon: (size = 18) => <CheckCircle2 size={size} />,
    color: "#1e9650",
  },
  new_deadline: {
    label: "Novo Prazo Solicitado",
    icon: (size = 18) => <Clock size={size} />,
    color: "#3b82f6",
  },
  awaiting_confirmation: {
    label: "Aguardando Confirmação",
    icon: (size = 18) => <CheckCircle2 size={size} />,
    color: "#3b82f6",
  },
  refund_in_analysis: {
    label: "Reembolso em Análise",
    icon: (size = 18) => <AlertTriangle size={size} />,
    color: "#ef4444",
  },
  refund_in_process: {
    label: "Reembolso em Processamento",
    icon: (size = 18) => <CreditCard size={size} />,
    color: "#eab308",
  },
  partial_refund_in_process: {
    label: "Reembolso Parcial em Processamento",
    icon: (size = 18) => <CreditCard size={size} />,
    color: "#eab308",
  },
  partial_refund: {
    label: "Reembolso Parcial",
    icon: (size = 18) => <CheckCircle2 size={size} />,
    color: "#1e9650",
  },
  refunded: {
    label: "Reembolsado",
    icon: (size = 18) => <CheckCircle2 size={size} />,
    color: "#1e9650",
  },
};

export const getOrderStatusConfig = (status: string): OrderStatusConfig => {
  return (
    statusMap[status] || {
      label: status.replace("_", " "),
      icon: (size = 18) => <Package size={size} />,
      color: "var(--color-text-muted)",
    }
  );
};

export const getOrderStatusOptions = () => {
  return [
    { value: "", label: "Todos os status" },
    ...Object.entries(statusMap).map(([value, config]) => ({
      value,
      label: config.label,
    })),
  ];
};
