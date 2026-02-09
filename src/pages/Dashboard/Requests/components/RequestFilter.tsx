import { useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import type { ServiceTypeEnum } from "../../../../types/dtos";
import styles from "./RequestFilter.module.css";

interface RequestFilterProps {
  categories: string[];
  selectedCategories: string[];
  selectedService: ServiceTypeEnum | "all";
  onApplyFilters: (
    categories: string[],
    service: ServiceTypeEnum | "all",
  ) => void;
  activeFilterCount: number;
}

export const RequestFilter: React.FC<RequestFilterProps> = ({
  categories,
  selectedCategories,
  selectedService,
  onApplyFilters,
  activeFilterCount,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tempCategories, setTempCategories] =
    useState<string[]>(selectedCategories);
  const [tempService, setTempService] = useState<ServiceTypeEnum | "all">(
    selectedService,
  );

  const toggleSidebar = () => {
    if (!isOpen) {
      setTempCategories(selectedCategories);
      setTempService(selectedService);
    }
    setIsOpen(!isOpen);
  };

  const toggleCategory = (category: string) => {
    setTempCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };

  const handleApply = () => {
    onApplyFilters(tempCategories, tempService);
    setIsOpen(false);
  };

  const handleClear = () => {
    setTempCategories([]);
    setTempService("all");
  };

  const handleCancel = () => {
    setTempCategories(selectedCategories);
    setTempService(selectedService);
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
                  {}
                  <div className={styles.filterSection}>
                    <h3>Tipo de Serviço</h3>
                    <div className={styles.radioGroup}>
                      <label className={styles.radioItem}>
                        <input
                          type="radio"
                          name="service"
                          className={styles.radio}
                          checked={tempService === "all"}
                          onChange={() => setTempService("all")}
                        />
                        <span className={styles.radioCustom}></span>
                        <span className={styles.radioLabel}>Todos</span>
                      </label>
                      <label className={styles.radioItem}>
                        <input
                          type="radio"
                          name="service"
                          className={styles.radio}
                          checked={tempService === "printing"}
                          onChange={() => setTempService("printing")}
                        />
                        <span className={styles.radioCustom}></span>
                        <span className={styles.radioLabel}>
                          Apenas Impressão
                        </span>
                      </label>
                      <label className={styles.radioItem}>
                        <input
                          type="radio"
                          name="service"
                          className={styles.radio}
                          checked={tempService === "printing_modeling"}
                          onChange={() => setTempService("printing_modeling")}
                        />
                        <span className={styles.radioCustom}></span>
                        <span className={styles.radioLabel}>
                          Modelagem & Impressão
                        </span>
                      </label>
                    </div>
                  </div>

                  {}
                  <div className={styles.filterSection}>
                    <div className={styles.sectionHeader}>
                      <h3>Categorias</h3>
                      {tempCategories.length > 0 && (
                        <button
                          onClick={handleClear}
                          className={styles.clearButton}
                          type="button"
                        >
                          Limpar Tudo
                        </button>
                      )}
                    </div>
                    <div className={styles.categoryList}>
                      {categories.map((category) => {
                        const isSelected = tempCategories.includes(category);
                        return (
                          <label key={category} className={styles.categoryItem}>
                            <input
                              type="checkbox"
                              className={styles.checkbox}
                              checked={isSelected}
                              onChange={() => toggleCategory(category)}
                            />
                            <span className={styles.checkboxCustom}>
                              {isSelected && (
                                <svg
                                  width="12"
                                  height="12"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="3"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <polyline points="20 6 9 17 4 12" />
                                </svg>
                              )}
                            </span>
                            <span className={styles.categoryName}>
                              {category}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className={styles.sidebarFooter}>
                  <button
                    onClick={handleCancel}
                    className={styles.cancelButton}
                    type="button"
                  >
                    Cancelar
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
