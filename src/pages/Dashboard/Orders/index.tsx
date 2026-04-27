import React from "react";
import { Package, ShoppingBag, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useMakerOrders } from "../../../hooks/useMakerOrders";
import { OrderCard } from "./components/OrderCard";
import { OrderFilterSidebar } from "./components/OrderFilterSidebar";
import { PrinterLoader } from "../../../components/ui/PrinterLoader";
import { InfiniteScrollTrigger } from "../../../components/ui/InfiniteScrollTrigger";
import styles from "./Orders.module.css";

const DashboardOrders: React.FC = () => {
  const navigate = useNavigate();
  const {
    orders,
    loading,
    error,
    activeTab,
    setActiveTab,
    status,
    setStatus,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    loadMore,
    hasMore,
  } = useMakerOrders();

  const handleApplyFilters = (
    newStatus: string,
    newStart: string,
    newEnd: string,
  ) => {
    setStatus(newStatus);
    setStartDate(newStart);
    setEndDate(newEnd);
  };

  const activeFilterCount =
    (status ? 1 : 0) + (startDate ? 1 : 0) + (endDate ? 1 : 0);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerTop}>
          <div className={styles.headerTitle}>
            <ShoppingBag size={32} />
            <h1>Pedidos</h1>
          </div>

          <div className={styles.headerFilters}>
            <OrderFilterSidebar
              status={status}
              startDate={startDate}
              endDate={endDate}
              onApplyFilters={handleApplyFilters}
              activeFilterCount={activeFilterCount}
            />
          </div>
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
      </div>

      {loading && orders.length === 0 ? (
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
        <>
          <div className={styles.ordersList}>
            {orders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onClick={() => navigate(`/dashboard/orders/${order.id}`)}
              />
            ))}
          </div>

          <InfiniteScrollTrigger
            onIntersect={loadMore}
            hasMore={hasMore}
            isLoading={loading}
          />
        </>
      ) : (
        <div className={styles.emptyState}>
          <Package size={64} className={styles.emptyIcon} />
          <h3>Nenhum pedido por aqui</h3>
          <p>
            {activeTab === "product"
              ? "Você ainda não tem pedidos de produtos com esses filtros."
              : "Você ainda não tem pedidos de serviços com esses filtros."}
          </p>
        </div>
      )}
    </div>
  );
};

export default DashboardOrders;
