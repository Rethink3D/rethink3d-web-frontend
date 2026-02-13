import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, AlertTriangle, Smartphone } from "lucide-react";
import { getMakerTimelineEvents } from "./utils/orderTimelineBuilder";
import { useOrderDetails } from "../../../hooks/useOrderDetails";
import { PrinterLoader } from "../../../components/ui/PrinterLoader";
import styles from "./OrderDetails.module.css";

// Refactored Components
import { OrderHeader } from "./components/OrderHeader";
import { OrderItems } from "./components/OrderItems";
import { FinancialSummary } from "./components/FinancialSummary";
import { ClientCard } from "./components/ClientCard";
import { DeadlineCard } from "./components/DeadlineCard";
import { OrderHistory } from "./components/OrderHistory";

const OrderDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { order, loading, error } = useOrderDetails(id);

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

  const processedEvents = getMakerTimelineEvents(order);

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

      <OrderHeader
        orderId={order.id}
        orderType={order.type}
        creationTime={order.creationTime}
        status={order.status}
      />

      <div className={styles.mainGrid}>
        <div className={styles.leftColumn}>
          <OrderItems
            products={order.products}
            quotationItems={order.quotation?.items}
          />

          <FinancialSummary
            totalValue={order.totalValue}
            paymentFee={order.paymentFee}
            subtotal={order.subtotal}
            intermediaryFee={order.intermediaryFee}
          />
        </div>

        <div className={styles.rightColumn}>
          <ClientCard user={order.user} />

          <DeadlineCard
            deadline={order.deadline}
            status={order.status}
            totalEstimatedProductionTime={order.totalEstimatedProductionTime}
          />

          <OrderHistory events={processedEvents} />
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
