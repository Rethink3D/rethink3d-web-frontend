import React from "react";
import { Globe, UserCheck, Inbox } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCustomRequests } from "../../../hooks/useCustomRequests";
import { RequestCard } from "./components/RequestCard";
import { RequestFilter } from "./components/RequestFilter";
import { PrinterLoader } from "../../../components/ui/PrinterLoader";
import { InfiniteScrollTrigger } from "../../../components/ui/InfiniteScrollTrigger";
import type { ServiceTypeEnum } from "../../../types/dtos";
import styles from "./Requests.module.css";
import orderStyles from "../Orders/Orders.module.css";

const DashboardRequests: React.FC = () => {
  const { 
    requests, 
    loading, 
    error, 
    activeTab, 
    setActiveTab,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    selectedCategories,
    setSelectedCategories,
    selectedService,
    setSelectedService,
    selectedMaterials,
    setSelectedMaterials,
    availableCategories,
    loadMore,
    hasMore
  } = useCustomRequests("global");

  const handleApplyFilters = (
    newStart: string,
    newEnd: string,
    newCategories: string[],
    newMaterials: string[],
    newService: ServiceTypeEnum | "all",
  ) => {
    setStartDate(newStart);
    setEndDate(newEnd);
    setSelectedCategories(newCategories);
    setSelectedMaterials(newMaterials);
    setSelectedService(newService === "all" ? [] : [newService]);
  };

  const activeFilterCount = 
    (startDate ? 1 : 0) + 
    (endDate ? 1 : 0) + 
    selectedCategories.length + 
    selectedMaterials.length +
    (selectedService.length > 0 ? 1 : 0);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={orderStyles.headerTop}>
          <div className={styles.titleSection}>
            <div className={styles.iconWrapper}>
              <Inbox size={32} />
            </div>
            <div>
              <h1>Solicitações</h1>
              <p>
                Descubra novos projetos ou gerencie suas propostas.
              </p>
            </div>
          </div>

          <div className={orderStyles.headerFilters}>
            <RequestFilter
              startDate={startDate}
              endDate={endDate}
              categories={availableCategories}
              selectedCategories={selectedCategories}
              selectedMaterials={selectedMaterials}
              selectedService={selectedService.length > 0 ? selectedService[0] as ServiceTypeEnum : "all"}
              activeFilterCount={activeFilterCount}
              onApplyFilters={handleApplyFilters}
            />
          </div>
        </div>
      </header>

      <div className={styles.controls}>
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === "global" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("global")}
          >
            <Globe size={18} />
            <span>Explorar Global</span>
          </button>
          <button
            className={`${styles.tab} ${activeTab === "maker" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("maker")}
          >
            <UserCheck size={18} />
            <span>Minhas Propostas</span>
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          style={{ width: "100%" }}
        >
          {loading && requests.length === 0 ? (
            <div className={styles.loadingState}>
              <PrinterLoader />
              <p>Buscando solicitações...</p>
            </div>
          ) : error && requests.length === 0 ? (
            <div className={styles.errorState}>
              <p>{error}</p>
            </div>
          ) : requests.length > 0 ? (
            <>
              <div className={styles.requestsGrid}>
                {requests.map((request) => (
                  <RequestCard key={request.id} request={request} />
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
              <Inbox size={48} />
              <h3>Nenhuma solicitação encontrada</h3>
              <p>
                {activeFilterCount > 0
                  ? "Nenhuma solicitação corresponde aos filtros aplicados."
                  : activeTab === "global"
                    ? "Não há novas solicitações globais no momento. Tente novamente mais tarde."
                    : "Você ainda não fez propostas para nenhuma solicitação."}
              </p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default DashboardRequests;
