import React, { useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { getOrderStatusOptions } from "../../../../utils/orderStatusUtil";
import styles from "../../../Products/components/CategoryFilter.module.css";
import orderStyles from "../Orders.module.css";

interface OrderFilterSidebarProps {
  status: string;
  startDate: string;
  endDate: string;
  onApplyFilters: (status: string, startDate: string, endDate: string) => void;
  activeFilterCount: number;
}

const statusOptions = getOrderStatusOptions();

export const OrderFilterSidebar: React.FC<OrderFilterSidebarProps> = ({
  status,
  startDate,
  endDate,
  onApplyFilters,
  activeFilterCount,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tempStatus, setTempStatus] = useState(status);
  const [tempStartDate, setTempStartDate] = useState(startDate);
  const [tempEndDate, setTempEndDate] = useState(endDate);

  const toggleSidebar = () => {
    if (!isOpen) {
      setTempStatus(status);
      setTempStartDate(startDate);
      setTempEndDate(endDate);
    }
    setIsOpen(!isOpen);
  };

  const handleApply = () => {
    onApplyFilters(tempStatus, tempStartDate, tempEndDate);
    setIsOpen(false);
  };

  const handleClear = () => {
    setTempStatus("");
    setTempStartDate("");
    setTempEndDate("");
  };

  const handleCancel = () => {
    setTempStatus(status);
    setTempStartDate(startDate);
    setTempEndDate(endDate);
    setIsOpen(false);
  };

  return (
    <div className={styles.filterContainer}>
      <button
        onClick={toggleSidebar}
        className={`${styles.filterButton} ${isOpen ? styles.active : ""}`}
        type="button"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="4" y1="21" x2="4" y2="14" />
          <line x1="4" y1="10" x2="4" y2="3" />
          <line x1="12" y1="21" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12" y2="3" />
          <line x1="20" y1="21" x2="20" y2="16" />
          <line x1="20" y1="12" x2="20" y2="3" />
          <line x1="1" y1="14" x2="7" y2="14" />
          <line x1="9" y1="8" x2="15" y2="8" />
          <line x1="17" y1="16" x2="23" y2="16" />
        </svg>
        <span>Filtros</span>
        {activeFilterCount > 0 && (
          <span className={styles.badge}>{activeFilterCount}</span>
        )}
      </button>

      {createPortal(
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className={styles.overlay}
                onClick={handleCancel}
              />
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className={styles.sidebar}
              >
                <div className={styles.sidebarHeader}>
                  <h2>Filtros</h2>
                  <button
                    onClick={handleCancel}
                    className={styles.closeButton}
                    type="button"
                    aria-label="Fechar filtros"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>

                <div className={styles.sidebarContent}>
                  <div className={styles.filterSection}>
                    <div className={styles.sectionHeader}>
                      <h3>Status</h3>
                      {tempStatus && (
                        <button
                          onClick={() => setTempStatus("")}
                          className={styles.clearButton}
                          type="button"
                        >
                          Limpar
                        </button>
                      )}
                    </div>
                    <select
                      className={orderStyles.statusSelect}
                      style={{ width: "100%", maxWidth: "100%" }}
                      value={tempStatus}
                      onChange={(e) => setTempStatus(e.target.value)}
                    >
                      <option value="">Todos os status</option>
                      {statusOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className={styles.filterSection}>
                    <div className={styles.sectionHeader}>
                      <h3>Período</h3>
                      {(tempStartDate || tempEndDate) && (
                        <button
                          onClick={() => {
                            setTempStartDate("");
                            setTempEndDate("");
                          }}
                          className={styles.clearButton}
                          type="button"
                        >
                          Limpar
                        </button>
                      )}
                    </div>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                      }}
                    >
                      <div className={orderStyles.filterGroup}>
                        <label
                          htmlFor="start-date"
                          className={orderStyles.filterLabel}
                          style={{ minWidth: "40px" }}
                        >
                          De:
                        </label>
                        <input
                          type="date"
                          id="start-date"
                          className={orderStyles.dateInput}
                          style={{ width: "100%" }}
                          value={tempStartDate}
                          onChange={(e) => setTempStartDate(e.target.value)}
                          onClick={(e) => {
                            try {
                              e.currentTarget.showPicker();
                            } catch {
                              alert("Erro ao abrir seletor de data");
                            }
                          }}
                        />
                      </div>

                      <div className={orderStyles.filterGroup}>
                        <label
                          htmlFor="end-date"
                          className={orderStyles.filterLabel}
                          style={{ minWidth: "40px" }}
                        >
                          Até:
                        </label>
                        <input
                          type="date"
                          id="end-date"
                          className={orderStyles.dateInput}
                          style={{ width: "100%" }}
                          value={tempEndDate}
                          min={tempStartDate}
                          onChange={(e) => setTempEndDate(e.target.value)}
                          onClick={(e) => {
                            try {
                              e.currentTarget.showPicker();
                            } catch {
                              alert("Erro ao abrir seletor de data");
                            }
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className={styles.sidebarFooter}>
                  <button
                    onClick={handleClear}
                    className={styles.cancelButton}
                    type="button"
                  >
                    Limpar Tudo
                  </button>
                  <button
                    onClick={handleApply}
                    className={styles.applyButton}
                    type="button"
                  >
                    Aplicar Filtros
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </div>
  );
};
