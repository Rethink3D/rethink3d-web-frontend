import { useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FilterHelp } from "../../../components/ui/FilterHelp";
import styles from "./CategoryFilter.module.css";

interface FilterSidebarProps {
  categories: string[];
  selectedCategories: string[];
  isPersonalizableFilter: boolean | null;
  isActiveFilter?: boolean | null; 
  onApplyFilters: (
    categories: string[],
    isPersonalizable: boolean | null,
    isActive?: boolean | null,
  ) => void;
  activeFilterCount: number;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  categories,
  selectedCategories,
  isPersonalizableFilter,
  isActiveFilter = null,
  onApplyFilters,
  activeFilterCount,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tempSelectedCategories, setTempSelectedCategories] =
    useState<string[]>(selectedCategories);
  const [tempIsPersonalizable, setTempIsPersonalizable] = useState<
    boolean | null
  >(isPersonalizableFilter);
  const [tempIsActive, setTempIsActive] = useState<boolean | null>(
    isActiveFilter,
  );

  const toggleSidebar = () => {
    if (!isOpen) {
      setTempSelectedCategories(selectedCategories);
      setTempIsPersonalizable(isPersonalizableFilter);
      setTempIsActive(isActiveFilter);
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

  const handlePersonalizableChange = (value: boolean | null) => {
    setTempIsPersonalizable(value);
  };

  const handleActiveChange = (value: boolean | null) => {
    setTempIsActive(value);
  };

  const handleApply = () => {
    onApplyFilters(tempSelectedCategories, tempIsPersonalizable, tempIsActive);
    setIsOpen(false);
  };

  const handleClear = () => {
    setTempSelectedCategories([]);
    setTempIsPersonalizable(null);
    setTempIsActive(null);
  };

  const handleCancel = () => {
    setTempSelectedCategories(selectedCategories);
    setTempIsPersonalizable(isPersonalizableFilter);
    setTempIsActive(isActiveFilter);
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
                        Tipo de Produto
                        <FilterHelp
                          content={
                            <>
                              <p>
                                <strong>Personalizáveis:</strong> Produtos que
                                aceitam sua marca ou ajustes exclusivos.
                              </p>
                              <p>
                                <strong>Prontos:</strong> Produtos com design
                                fixo, aceita poucos ajustes.
                              </p>
                            </>
                          }
                        />
                      </h3>
                    </div>
                    <div className={styles.radioGroup}>
                      <label className={styles.radioItem}>
                        <input
                          type="radio"
                          name="personalizable"
                          checked={tempIsPersonalizable === null}
                          onChange={() => handlePersonalizableChange(null)}
                          className={styles.radio}
                        />
                        <span className={styles.radioCustom}></span>
                        <span className={styles.radioLabel}>Todos</span>
                      </label>
                      <label className={styles.radioItem}>
                        <input
                          type="radio"
                          name="personalizable"
                          checked={tempIsPersonalizable === true}
                          onChange={() => handlePersonalizableChange(true)}
                          className={styles.radio}
                        />
                        <span className={styles.radioCustom}></span>
                        <span className={styles.radioLabel}>
                          Apenas Personalizáveis
                        </span>
                      </label>
                      <label className={styles.radioItem}>
                        <input
                          type="radio"
                          name="personalizable"
                          checked={tempIsPersonalizable === false}
                          onChange={() => handlePersonalizableChange(false)}
                          className={styles.radio}
                        />
                        <span className={styles.radioCustom}></span>
                        <span className={styles.radioLabel}>
                          Não Personalizáveis
                        </span>
                      </label>
                    </div>
                  </div>

                  {isActiveFilter !== undefined && (
                    <div className={styles.filterSection}>
                      <div className={styles.sectionHeader}>
                        <h3>
                          Status do Produto
                          <FilterHelp
                            content={
                              <>
                                <p>
                                  <strong>Ativo:</strong> Visível para todos os
                                  clientes no catálogo.
                                </p>
                                <p>
                                  <strong>Pausado:</strong> Oculto para
                                  clientes, mas salvo em sua conta.
                                </p>
                              </>
                            }
                          />
                        </h3>
                      </div>
                      <div className={styles.radioGroup}>
                        <label className={styles.radioItem}>
                          <input
                            type="radio"
                            name="status"
                            checked={tempIsActive === null}
                            onChange={() => handleActiveChange(null)}
                            className={styles.radio}
                          />
                          <span className={styles.radioCustom}></span>
                          <span className={styles.radioLabel}>Todos</span>
                        </label>
                        <label className={styles.radioItem}>
                          <input
                            type="radio"
                            name="status"
                            checked={tempIsActive === true}
                            onChange={() => handleActiveChange(true)}
                            className={styles.radio}
                          />
                          <span className={styles.radioCustom}></span>
                          <span className={styles.radioLabel}>Ativos</span>
                        </label>
                        <label className={styles.radioItem}>
                          <input
                            type="radio"
                            name="status"
                            checked={tempIsActive === false}
                            onChange={() => handleActiveChange(false)}
                            className={styles.radio}
                          />
                          <span className={styles.radioCustom}></span>
                          <span className={styles.radioLabel}>Pausados</span>
                        </label>
                      </div>
                    </div>
                  )}

                  {}
                  <div className={styles.filterSection}>
                    <div className={styles.sectionHeader}>
                      <h3>Categorias</h3>
                      {tempSelectedCategories.length > 0 && (
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
