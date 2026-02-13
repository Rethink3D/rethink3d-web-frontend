import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import type { MakerPreviewDTO } from "../../types/dtos";
import { makerService } from "../../services/makerService";
import { MakerCard } from "./components/MakerCard";
import { SearchBar } from "../../components/ui/SearchBar";
import { MakerFilterSidebar } from "./components/MakerFilter";
import { useMakerFilters } from "../../hooks/useMakerFilters";
import { trackMakerCatalogView } from "../../utils/analytics";
import styles from "./MakerCatalog.module.css";

const MakerCatalog: React.FC = () => {
  const [makers, setMakers] = useState<MakerPreviewDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const {
    setSearchText,
    selectedCategories,
    setSelectedCategories,
    selectedServiceTypes,
    setSelectedServiceTypes,
    availableCategories,
    filteredMakers,
    activeFilterCount,
  } = useMakerFilters(makers);

  const handleApplyFilters = (categories: string[], serviceTypes: string[]) => {
    setSelectedCategories(categories);
    setSelectedServiceTypes(serviceTypes);
  };

  useEffect(() => {
    trackMakerCatalogView();

    const fetchMakers = async () => {
      try {
        const data = await makerService.getMakers();
        setMakers(data);
      } catch (error) {
        console.error("Failed to fetch makers", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMakers();
  }, []);

  return (
    <div className={styles.catalog}>
      <div className={styles.headerContainer}>
        <header className={styles.headerLeft}>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Nossos Makers
          </motion.h1>
          <p>Conheça os especialistas por trás das criações.</p>
        </header>

        <div className={styles.headerRight}>
          <div className={styles.filterBar}>
            <SearchBar
              onSearch={setSearchText}
              placeholder="Buscar makers..."
              className={styles.catalogSearchBar}
            >
              <MakerFilterSidebar
                categories={availableCategories}
                selectedCategories={selectedCategories}
                selectedServiceTypes={selectedServiceTypes}
                onApplyFilters={handleApplyFilters}
                activeFilterCount={activeFilterCount}
              />
            </SearchBar>
          </div>
        </div>
      </div>

      {loading ? (
        <div className={styles.loading}>
          <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
          <span className="mt-4">Carregando makers...</span>
        </div>
      ) : filteredMakers.length === 0 ? (
        <div className={styles.emptyState}>
          <p>Nenhum maker encontrado com os filtros selecionados.</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {filteredMakers.map((maker) => (
            <MakerCard
              key={maker.id}
              maker={maker}
              onClick={() => navigate(`/makers/${maker.id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MakerCatalog;
