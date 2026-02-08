import { useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import styles from "../../Products/components/CategoryFilter.module.css";

interface MakerFilterSidebarProps {
  categories: string[];
  selectedCategories: string[];
  selectedServiceTypes: string[];
  onApplyFilters: (categories: string[], serviceTypes: string[]) => void;
  activeFilterCount: number;
}

const SERVICE_TYPE_LABELS = {
  PRINT: "Impressão",
  PRINT_AND_MODEL: "Impressão + Modelagem",
};

import { FilterHelp } from "../../../components/ui/FilterHelp";

export const MakerFilterSidebar: React.FC<MakerFilterSidebarProps> = ({
  categories,
  selectedCategories,
  selectedServiceTypes,
  onApplyFilters,
  activeFilterCount,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tempSelectedCategories, setTempSelectedCategories] =
    useState<string[]>(selectedCategories);
  const [tempSelectedServiceTypes, setTempSelectedServiceTypes] =
    useState<string[]>(selectedServiceTypes);

  const toggleSidebar = () => {
    if (!isOpen) {
      
      setTempSelectedCategories(selectedCategories);
      setTempSelectedServiceTypes(selectedServiceTypes);
    }
    setIsOpen(!isOpen);
  };

  const toggleCategory = (category: string) => {
    setTempSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };

  const toggleServiceType = (serviceType: string) => {
    setTempSelectedServiceTypes((prev) =>
      prev.includes(serviceType)
        ? prev.filter((s) => s !== serviceType)
        : [...prev, serviceType],
    );
  };

  const handleApply = () => {
    onApplyFilters(tempSelectedCategories, tempSelectedServiceTypes);
    setIsOpen(false);
  };

  const handleClear = () => {
    setTempSelectedCategories([]);
    setTempSelectedServiceTypes([]);
  };

  const handleCancel = () => {
    setTempSelectedCategories(selectedCategories);
    setTempSelectedServiceTypes(selectedServiceTypes);
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
                  {}
                  <div className={styles.filterSection}>
                    <div className={styles.sectionHeader}>
                      <h3>
                        Tipo de Serviço
                        <FilterHelp
                          content={
                            <>
                              <p>
                                <strong>Impressão:</strong> Projetos prontos,
                                você já tem o arquivo ou link.
                              </p>
                              <p>
                                <strong>Modelagem + Impressão:</strong> Serviço
                                completo, da ideia ao produto final.
                              </p>
                            </>
                          }
                        />
                      </h3>
                      {tempSelectedServiceTypes.length > 0 && (
                        <button
                          onClick={() => setTempSelectedServiceTypes([])}
                          className={styles.clearButton}
                          type="button"
                        >
                          Limpar
                        </button>
                      )}
                    </div>
                    <div className={styles.categoryList}>
                      {Object.entries(SERVICE_TYPE_LABELS).map(
                        ([value, label]) => {
                          const isSelected =
                            tempSelectedServiceTypes.includes(value);
                          return (
                            <label key={value} className={styles.categoryItem}>
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => toggleServiceType(value)}
                                className={styles.checkbox}
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
                                {label}
                              </span>
                            </label>
                          );
                        },
                      )}
                    </div>
                  </div>

                  {}
                  <div className={styles.filterSection}>
                    <div className={styles.sectionHeader}>
                      <h3>Categorias</h3>
                      {tempSelectedCategories.length > 0 && (
                        <button
                          onClick={() => setTempSelectedCategories([])}
                          className={styles.clearButton}
                          type="button"
                        >
                          Limpar
                        </button>
                      )}
                    </div>
                    <div className={styles.categoryList}>
                      {categories.map((category) => {
                        const isSelected =
                          tempSelectedCategories.includes(category);
                        return (
                          <label key={category} className={styles.categoryItem}>
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => toggleCategory(category)}
                              className={styles.checkbox}
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
