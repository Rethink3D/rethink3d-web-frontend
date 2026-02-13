import React from "react";
import { Link } from "react-router-dom";
import {
  Package,
  Plus,
  Store,
  CreditCard,
  TrendingUp,
  Truck,
  Box,
  MessageSquare,
} from "lucide-react";
import { useAuth } from "../../context/useAuth";
import { Card } from "../../components/ui/Card";
import { PrinterLoader } from "../../components/ui/PrinterLoader";
import { useDashboardData } from "../../hooks/useDashboardData";
import styles from "./Dashboard.module.css";
import { RequestCard } from "./Requests/components/RequestCard";

import { OrderListItem } from "./components/OrderListItem";

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { profile, stats, recentOrders, recentRequests, loading } =
    useDashboardData();

  if (loading) {
    return <PrinterLoader />;
  }

  return (
    <div className={styles.container}>
      {}
      <div className={styles.header}>
        <h1>Olá, {user?.displayName?.split(" ")[0] || "Maker"}!</h1>
        <p>Aqui está o resumo das suas atividades e oportunidades hoje.</p>
      </div>

      {}
      <div className={styles.statsGrid}>
        <Card className={styles.statCard} hoverEffect={false}>
          <div className={styles.statIcon}>
            <Truck size={24} />
          </div>
          <div className={styles.statInfo}>
            <h3>{stats.activeOrders}</h3>
            <p>Pedidos Ativos</p>
          </div>
        </Card>

        <Card className={styles.statCard} hoverEffect={false}>
          <div className={styles.statIcon}>
            <Box size={24} />
          </div>
          <div className={styles.statInfo}>
            <h3>{stats.totalProducts}</h3>
            <p>Meus Produtos</p>
          </div>
        </Card>

        <Card className={styles.statCard} hoverEffect={false}>
          <div className={styles.statIcon}>
            <MessageSquare size={24} />
          </div>
          <div className={styles.statInfo}>
            <h3>{stats.pendingRequests}</h3>
            <p>Solicitações Abertas</p>
          </div>
        </Card>
      </div>

      {}
      <div className={styles.actionsGrid}>
        <div
          className={`${styles.actionButton} ${styles.actionButtonDisabled}`}
        >
          <div className={styles.buttonContent}>
            <Plus size={20} />
            Adicionar Produto
            <span className={styles.comingSoonInline}>Em breve</span>
          </div>
        </div>
        <Link
          to={`/makers/${profile?.makerId}`}
          className={styles.actionButton}
        >
          <Store size={20} />
          Ver Minha Loja
        </Link>
        <Link to="/dashboard/orders" className={styles.actionButton}>
          <CreditCard size={20} />
          Gerenciar Pedidos
        </Link>
      </div>

      {}
      <div className={styles.mainGrid}>
        {}
        <div className={styles.leftColumn}>
          <div className={styles.sectionTitle}>
            <TrendingUp size={20} />
            Solicitações Recentes para Você
          </div>

          <div className={styles.recentList}>
            {recentRequests.length > 0 ? (
              recentRequests.map((req) => (
                <div key={req.id} className={styles.requestWrapper}>
                  <RequestCard request={req} />
                </div>
              ))
            ) : (
              <div className={styles.emptyState}>
                Nenhuma solicitação nova compatível com seu perfil no momento.
              </div>
            )}
            {recentRequests.length > 0 && (
              <Link
                to="/dashboard/requests"
                style={{
                  display: "inline-block",
                  marginTop: "1rem",
                  color: "var(--color-primary)",
                  textDecoration: "none",
                  fontWeight: 500,
                }}
              >
                Ver todas as solicitações →
              </Link>
            )}
          </div>
        </div>

        {}
        <div className={styles.rightColumn}>
          <div className={styles.sectionTitle}>
            <Package size={20} />
            Pedidos Recentes
          </div>

          <div className={styles.recentList}>
            {recentOrders.length > 0 ? (
              recentOrders.map((order) => (
                <OrderListItem key={order.id} order={order} />
              ))
            ) : (
              <div className={styles.emptyState}>
                Você não tem pedidos ativos no momento.
              </div>
            )}
            <Link
              to="/dashboard/orders"
              style={{
                display: "inline-block",
                marginTop: "1rem",
                color: "var(--color-text-secondary)",
                fontSize: "0.9rem",
                textDecoration: "none",
              }}
            >
              Ver histórico completo
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
