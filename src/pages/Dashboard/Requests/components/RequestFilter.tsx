import { useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import type { ServiceTypeEnum, CategoryDTO } from "../../../../types/dtos";
import orderStyles from "../../Orders/Orders.module.css";
import styles from "./RequestFilter.module.css";

interface RequestFilterProps {
  startDate: string;
  endDate: string;
  categories: CategoryDTO[];
  selectedCategories: string[];
  selectedMaterials: string[];
  selectedService: ServiceTypeEnum | "all";
  onApplyFilters: (
    startDate: string,
    endDate: string,
    categories: string[],
    materials: string[],
    service: ServiceTypeEnum | "all",
  ) => void;
  activeFilterCount: number;
}

export const RequestFilter: React.FC<RequestFilterProps> = ({
  startDate,
  endDate,
  categories,
  selectedCategories,
  selectedMaterials,
  selectedService,
  onApplyFilters,
  activeFilterCount,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tempStartDate, setTempStartDate] = useState(startDate);
  const [tempEndDate, setTempEndDate] = useState(endDate);
  const [tempCategories, setTempCategories] =
    useState<string[]>(selectedCategories);
  const [tempMaterials, setTempMaterials] =
    useState<string[]>(selectedMaterials);
  const [tempService, setTempService] = useState<ServiceTypeEnum | "all">(
    selectedService,
  );

  const toggleSidebar = () => {
    if (!isOpen) {
      setTempStartDate(startDate);
      setTempEndDate(endDate);
      setTempCategories(selectedCategories);
      setTempMaterials(selectedMaterials);
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

  const toggleMaterial = (material: string) => {
    setTempMaterials((prev) =>
      prev.includes(material)
        ? prev.filter((m) => m !== material)
        : [...prev, material],
    );
  };

  const handleApply = () => {
    onApplyFilters(
      tempStartDate,
      tempEndDate,
      tempCategories,
      tempMaterials,
      tempService,
    );
    setIsOpen(false);
  };

  const handleCancel = () => {
    setTempStartDate(startDate);
    setTempEndDate(endDate);
    setTempCategories(selectedCategories);
    setTempMaterials(selectedMaterials);
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
                  <div className={styles.filterSection}>
                    <div className={styles.sectionHeader}>
                      <h3>Materiais</h3>
                      {tempMaterials.length > 0 && (
                        <button
                          onClick={() => setTempMaterials([])}
                          className={styles.clearButton}
                          type="button"
                        >
                          Limpar
                        </button>
                      )}
                    </div>
                    <div className={styles.categoryList}>
                      {[
                        "PLA",
                        "ABS",
                        "PETG",
                        "RESIN",
                        "TPU",
                        "NYLON",
                        "ASA",
                      ].map((material) => {
                        const isSelected = tempMaterials.includes(material);
                        return (
                          <label key={material} className={styles.categoryItem}>
                            <input
                              type="checkbox"
                              className={styles.checkbox}
                              checked={isSelected}
                              onChange={() => toggleMaterial(material)}
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
                              {material}
                            </span>
                          </label>
                        );
                      })}
                    </div>
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
                            } catch {}
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
                            } catch {}
                          }}
                        />
                      </div>
                    </div>
                  </div>

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

                  <div className={styles.filterSection}>
                    <div className={styles.sectionHeader}>
                      <h3>Categorias</h3>
                      {tempCategories.length > 0 && (
                        <button
                          onClick={() => setTempCategories([])}
                          className={styles.clearButton}
                          type="button"
                        >
                          Limpar Tudo
                        </button>
                      )}
                    </div>
                    <div className={styles.categoryList}>
                      {categories.map((category) => {
                        const val = category.id.toString();
                        const isSelected = tempCategories.includes(val);
                        return (
                          <label
                            key={category.id}
                            className={styles.categoryItem}
                          >
                            <input
                              type="checkbox"
                              className={styles.checkbox}
                              checked={isSelected}
                              onChange={() => toggleCategory(val)}
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
                              {category.name}
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
