import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  User,
  Package,
  Calendar,
  Clock,
  CheckCircle2,
  AlertTriangle,
  CreditCard,
  Truck,
  FileText,
  Smartphone,
} from "lucide-react";
import {
  getMakerTimelineEvents,
  formatDeadlineMaker,
  formatProductionTime,
  TimelineEventStatus,
} from "./utils/orderTimelineBuilder";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useOrderDetails } from "../../../hooks/useOrderDetails";
import { formatCurrency } from "../../../utils/formatCurrency";
import { PrinterLoader } from "../../../components/ui/PrinterLoader";
import styles from "./OrderDetails.module.css";

const statusConfig: Record<
  string,
  { label: string; icon: React.ReactNode; color: string }
> = {
  awaiting_payment: {
    label: "Aguardando Pagamento",
    icon: <CreditCard size={18} />,
    color: "#eab308",
  },
  awaiting_maker: {
    label: "Novo Pedido",
    icon: <Package size={18} />,
    color: "#3b82f6",
  },
  on_going: {
    label: "Em Produção",
    icon: <Clock size={18} />,
    color: "#a855f7",
  },
  ready: {
    label: "Pronto para Entrega",
    icon: <Truck size={18} />,
    color: "#22c55e",
  },
  delayed: {
    label: "Atrasado",
    icon: <AlertTriangle size={18} />,
    color: "#ef4444",
  },
  done: {
    label: "Finalizado",
    icon: <CheckCircle2 size={18} />,
    color: "#1e9650",
  },
  new_deadline: {
    label: "Novo Prazo Solicitado",
    icon: <Clock size={18} />,
    color: "#3b82f6",
  },
  awaiting_confirmation: {
    label: "Aguardando Confirmação",
    icon: <CheckCircle2 size={18} />,
    color: "#3b82f6",
  },
  refund_in_analysis: {
    label: "Reembolso em Análise",
    icon: <AlertTriangle size={18} />,
    color: "#ef4444",
  },
  refund_in_process: {
    label: "Reembolso em Processamento",
    icon: <CreditCard size={18} />,
    color: "#eab308",
  },
  partial_refund_in_process: {
    label: "Reembolso Parcial em Processamento",
    icon: <CreditCard size={18} />,
    color: "#eab308",
  },
  partial_refund: {
    label: "Reembolso Parcial",
    icon: <CheckCircle2 size={18} />,
    color: "#1e9650",
  },
  refunded: {
    label: "Reembolsado",
    icon: <CheckCircle2 size={18} />,
    color: "#1e9650",
  },
};

const OrderDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { order, loading, error } = useOrderDetails(id);
  const [isExpanded, setIsExpanded] = React.useState(false);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <PrinterLoader />
        <p>Carregando informações do pedido...</p>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className={styles.errorContainer}>
        <AlertTriangle size={48} color="#ef4444" />
        <h2>Pedido Não Encontrado</h2>
        <p>
          {error ||
            "Este pedido não existe ou você não tem permissão para visualizá-lo."}
        </p>
        <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
          <button
            className={styles.backButton}
            onClick={() => navigate("/dashboard")}
          >
            Voltar ao Dashboard
          </button>
          <button
            className={styles.backButton}
            onClick={() => navigate("/dashboard/orders")}
          >
            Ver Todos os Pedidos
          </button>
        </div>
      </div>
    );
  }

  const statusInfo = statusConfig[order.status] || {
    label: order.status,
    icon: <Package size={18} />,
    color: "var(--color-text-muted)",
  };

  const formattedDate = order
    ? new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(new Date(order.creationTime))
    : "";

  const processedEvents = order ? getMakerTimelineEvents(order) : [];
  const showToggleButton = processedEvents.length > 2;
  const displayedEvents =
    isExpanded || !showToggleButton
      ? processedEvents
      : [processedEvents[0], processedEvents[processedEvents.length - 1]];

  const deadlineMessage = order
    ? formatDeadlineMaker(order.deadline, order.status)
    : "";

  return (
    <div className={styles.container}>
      <button
        className={styles.backLink}
        onClick={() => navigate("/dashboard/orders")}
      >
        <ArrowLeft size={18} />
        Voltar para Lista
      </button>

      <div className={styles.appNotice}>
        <div className={styles.noticeIcon}>
          <Smartphone size={24} />
        </div>
        <div className={styles.noticeContent}>
          <h4>Gestão pelo Aplicativo</h4>
          <p>
            Para garantir sua segurança e a melhor experiência, ações como
            atualizar o status do pedido, e outras ações devem ser feitas pelo
            aplicativo <strong>Rethink3D</strong> no seu celular.
          </p>
        </div>
      </div>

      <div className={styles.header}>
        <div className={styles.titleSection}>
          <div className={styles.idBadge}>PEDIDO #{order.id.split("-")[0]}</div>
          <h1>
            {order.type === "product"
              ? "Pedido de Produto"
              : "Projeto Customizado"}
          </h1>
          <p className={styles.creationTime}>Realizado em {formattedDate}</p>
        </div>

        <div
          className={styles.statusSection}
          style={{ color: statusInfo.color, borderColor: statusInfo.color }}
        >
          {statusInfo.icon}
          <span>{statusInfo.label}</span>
        </div>
      </div>

      <div className={styles.mainGrid}>
        <div className={styles.leftColumn}>
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <Package size={20} />
              <h2>Itens do Pedido</h2>
            </div>
            <div className={styles.itemsList}>
              {order.products.map((item, index) => (
                <div key={index} className={styles.itemCard}>
                  <div className={styles.itemImage}>
                    <img src={item.product.imageUrl} alt={item.product.name} />
                  </div>
                  <div className={styles.itemInfo}>
                    <h3>{item.product.name}</h3>
                    <div className={styles.itemMeta}>
                      <span>Qtd: {item.quantity}</span>
                      <span className={styles.dot}>•</span>
                      <span>
                        {formatProductionTime(item.estimatedProductionTime)}
                      </span>
                      <span className={styles.dot}>•</span>
                      <span>Valor unit: {formatCurrency(item.price)}</span>
                    </div>
                  </div>
                  <div className={styles.itemPrice}>
                    {formatCurrency(item.totalValue)}
                  </div>
                </div>
              ))}

              {order.quotation?.items.map((item, index) => (
                <div key={index} className={styles.itemCard}>
                  <div className={styles.itemIcon}>
                    <FileText size={24} />
                  </div>
                  <div className={styles.itemInfo}>
                    <h3>{item.description}</h3>
                    <div className={styles.itemMeta}>
                      <span>Qtd: {item.quantity}</span>
                      <span className={styles.dot}>•</span>
                      <span>
                        {formatProductionTime(item.estimatedProductionTime)}
                      </span>
                    </div>
                  </div>
                  <div className={styles.itemPrice}>
                    {formatCurrency(item.price)}
                  </div>
                </div>
              ))}
            </div>
          </section>

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
                  {formatCurrency(order.totalValue)}
                </span>
              </div>

              {order.paymentFee > 0 && (
                <div className={`${styles.summaryRow} ${styles.neutralRow}`}>
                  <div className={styles.labelWithInfo}>
                    <span>Taxa de Transação</span>
                    <span className={styles.infoText}>(Paga pelo cliente)</span>
                  </div>
                  <span>- {formatCurrency(order.paymentFee)}</span>
                </div>
              )}

              {(() => {
                const subtotalNum = Number(order.subtotal);
                const calculatedIntermediaryFee = Math.max(
                  0,
                  order.totalValue - order.paymentFee - subtotalNum,
                );

                
                const displayIntermediaryFee =
                  order.intermediaryFee && order.intermediaryFee > 0
                    ? order.intermediaryFee
                    : calculatedIntermediaryFee;

                if (displayIntermediaryFee <= 0) return null;

                return (
                  <div className={styles.summaryRow}>
                    <div className={styles.labelWithInfo}>
                      <span>Taxa de Intermediação</span>
                      <span className={styles.infoText}>
                        (Comissão da plataforma)
                      </span>
                    </div>
                    <span className={styles.valueStrong}>
                      - {formatCurrency(displayIntermediaryFee)}
                    </span>
                  </div>
                );
              })()}

              <div className={styles.dashedDivider} />

              <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                <span>Você recebe (Líquido)</span>
                <span className={styles.earningsValue}>
                  {formatCurrency(order.subtotal)}
                </span>
              </div>
            </div>
          </section>
        </div>

        <div className={styles.rightColumn}>
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <User size={20} />
              <h2>Cliente</h2>
            </div>
            <div className={styles.userCard}>
              <img src={order.user.imageUrl} alt={order.user.name} />
              <div className={styles.userInfo}>
                <h3>{order.user.name}</h3>
                <div className={styles.userLocation}>
                  <MapPin size={14} />
                  <span>
                    {order.user.address.city}, {order.user.address.state}
                  </span>
                </div>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <Calendar size={20} />
              <h2>Prazo de Entrega</h2>
            </div>
            <div className={styles.deadlineInfo}>
              <div className={styles.deadlineValue}>{deadlineMessage}</div>
              <p>
                O prazo total de produção foi de{" "}
                {formatProductionTime(order.totalEstimatedProductionTime)}.
              </p>
            </div>
          </section>

          <section className={styles.section}>
            <div
              className={styles.sectionHeader}
              style={{ justifyContent: "space-between", width: "100%" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                }}
              >
                <Clock size={20} />
                <h2>Histórico</h2>
              </div>
              {showToggleButton && (
                <button
                  className={styles.toggleButton}
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  {isExpanded ? (
                    <>
                      <span>Mostrar menos</span> <ChevronUp size={16} />
                    </>
                  ) : (
                    <>
                      <span>Ver tudo</span> <ChevronDown size={16} />
                    </>
                  )}
                </button>
              )}
            </div>
            <div className={styles.historyTimeline}>
              {displayedEvents.map((entry, index) => (
                <div key={index} className={styles.timelineEntry}>
                  <div
                    className={styles.timelineDot}
                    style={{
                      backgroundColor:
                        entry.status === TimelineEventStatus.Current
                          ? "#ffa500"
                          : entry.circleColor || "#22c55e",
                    }}
                  />
                  <div className={styles.timelineContent}>
                    <div className={styles.timelineHeader}>
                      <div className={styles.timelineStatus}>{entry.title}</div>
                      <div className={styles.timelineTime}>{entry.time}</div>
                    </div>
                    <p className={styles.timelineDescription}>
                      {entry.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
