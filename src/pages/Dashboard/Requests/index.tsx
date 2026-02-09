import React, { useState } from "react";
import { Globe, UserCheck, Inbox } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCustomRequests } from "../../../hooks/useCustomRequests";
import { useCustomRequestFilters } from "../../../hooks/useCustomRequestFilters";
import { RequestCard } from "./components/RequestCard";
import { RequestFilter } from "./components/RequestFilter";
import { SearchBar } from "../../../components/ui/SearchBar";
import { PrinterLoader } from "../../../components/ui/PrinterLoader";
import styles from "./Requests.module.css";
import type { ServiceTypeEnum } from "../../../types/dtos";

const DashboardRequests: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"global" | "maker">("global");
  const { requests, loading, error } = useCustomRequests(activeTab);

  const {
    searchText,
    setSearchText,
    selectedCategories,
    setSelectedCategories,
    selectedService,
    setSelectedService,
    availableCategories,
    filteredRequests,
    activeFilterCount,
  } = useCustomRequestFilters(requests);

  const handleApplyFilters = (
    categories: string[],
    service: ServiceTypeEnum | "all",
  ) => {
    setSelectedCategories(categories);
    setSelectedService(service);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.titleSection}>
          <div className={styles.iconWrapper}>
            <Inbox size={32} />
          </div>
          <div>
            <h1>Solicitações Personalizadas</h1>
            <p>
              Descubra novos projetos ou gerencie suas propostas em andamento.
            </p>
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

        <div className={styles.actions}>
          <div className={styles.searchWrapper}>
            <SearchBar
              onSearch={setSearchText}
              placeholder="Buscar por título ou descrição..."
              className={styles.dashboardSearchBar}
            >
              <RequestFilter
                categories={availableCategories}
                selectedCategories={selectedCategories}
                selectedService={selectedService}
                activeFilterCount={activeFilterCount}
                onApplyFilters={handleApplyFilters}
              />
            </SearchBar>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={
            activeTab +
            (loading
              ? "-loading"
              : filteredRequests.length > 0
                ? "-data"
                : "-empty")
          }
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          style={{ width: "100%" }}
        >
          {loading ? (
            <div className={styles.loadingState}>
              <PrinterLoader />
              <p>Buscando solicitações...</p>
            </div>
          ) : error ? (
            <div className={styles.errorState}>
              <p>{error}</p>
            </div>
          ) : filteredRequests.length > 0 ? (
            <div className={styles.requestsGrid}>
              {filteredRequests.map((request) => (
                <RequestCard key={request.id} request={request} />
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <Inbox size={48} />
              <h3>Nenhuma solicitação encontrada</h3>
              <p>
                {searchText || activeFilterCount > 0
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
