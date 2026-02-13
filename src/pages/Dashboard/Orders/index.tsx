import React from "react";
import { Package, ShoppingBag, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useMakerOrders } from "../../../hooks/useMakerOrders";
import { OrderCard } from "./components/OrderCard";
import { PrinterLoader } from "../../../components/ui/PrinterLoader";
import styles from "./Orders.module.css";

import { getOrderStatusOptions } from "../../../utils/orderStatusUtil";

const statusOptions = getOrderStatusOptions();

const DashboardOrders: React.FC = () => {
  const navigate = useNavigate();
  const { orders, loading, error, activeTab, setActiveTab, status, setStatus } =
    useMakerOrders();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerTitle}>
          <ShoppingBag size={32} />
          <h1>Pedidos</h1>
        </div>
        <p className={styles.description}>
          Gerencie os pedidos de produtos e serviços da sua loja.
        </p>
      </header>

      <div className={styles.controls}>
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === "product" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("product")}
          >
            Venda de Produtos
          </button>
          <button
            className={`${styles.tab} ${activeTab === "custom" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("custom")}
          >
            Pedidos de Serviços
          </button>
        </div>

        <div className={styles.filterWrapper}>
          <label htmlFor="status-filter" className={styles.filterLabel}>
            Filtrar:
          </label>
          <select
            id="status-filter"
            className={styles.statusSelect}
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            {statusOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className={styles.loaderContainer}>
          <PrinterLoader />
          <p>Buscando pedidos...</p>
        </div>
      ) : error ? (
        <div className={styles.errorContainer}>
          <AlertCircle size={48} color="#ff4d4d" />
          <h2>Ops!</h2>
          <p>{error}</p>
        </div>
      ) : orders.length > 0 ? (
        <div className={styles.ordersList}>
          {orders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onClick={() => navigate(`/dashboard/orders/${order.id}`)}
            />
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <Package size={64} className={styles.emptyIcon} />
          <h3>Nenhum pedido por aqui</h3>
          <p>
            {activeTab === "product"
              ? "Você ainda não recebeu pedidos de produtos do seu catálogo."
              : "Não há pedidos de serviços vinculados à sua loja no momento."}
          </p>
        </div>
      )}
    </div>
  );
};

export default DashboardOrders;
