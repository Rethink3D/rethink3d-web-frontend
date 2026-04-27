import { useNavigate } from "react-router-dom";
import { SearchBar } from "../../components/ui/SearchBar";
import { MakerFilterSidebar } from "./components/MakerFilter";
import { MakerCard } from "./components/MakerCard";
import { Skeleton } from "../../components/ui/Skeleton";
import { InfiniteScrollTrigger } from "../../components/ui/InfiniteScrollTrigger";
import { useMakerCatalog } from "../../hooks/useMakerCatalog";
import styles from "./MakerCatalog.module.css";

const MakerCatalog: React.FC = () => {
  const navigate = useNavigate();
  const {
    items,
    loading,
    filters,
    availableCategories,
    activeFilterCount,
    hasMore,
    setSearch,
    applyFilters,
    loadMore,
  } = useMakerCatalog();

  return (
    <div className={styles.catalog}>
      <div className={styles.headerContainer}>
        <header className={styles.headerLeft}>
          <h1 className={styles.pageTitle}>Nossos Makers</h1>
          <p>Encontre o maker ideal para o seu projeto de impressão 3D.</p>
        </header>

        <div className={styles.headerRight}>
          <div className={styles.filterBar}>
            <SearchBar
              onSearch={setSearch}
              placeholder="Buscar por nome do maker..."
              className={styles.catalogSearchBar}
            >
              <MakerFilterSidebar
                categories={availableCategories}
                selectedCategories={filters.selectedCategories}
                selectedServiceTypes={filters.selectedServiceTypes}
                onApplyFilters={applyFilters}
                activeFilterCount={activeFilterCount}
              />
            </SearchBar>
          </div>
        </div>
      </div>


      {loading && items.length === 0 ? (
        <div className={styles.grid}>
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <div key={i}>
                <Skeleton height={320} borderRadius={20} />
              </div>
            ))}
        </div>
      ) : items.length === 0 ? (
        <div className={styles.emptyState}>
          <p>Nenhum maker encontrado com os filtros selecionados.</p>
        </div>
      ) : (
        <>
          <div className={styles.grid}>
            {items.map((maker) => (
              <MakerCard
                key={maker.id}
                maker={maker}
                onClick={() => navigate(`/makers/${maker.id}`)}
              />
            ))}
          </div>

          <InfiniteScrollTrigger
            onIntersect={loadMore}
            hasMore={hasMore}
            isLoading={loading}
          />
        </>
      )}
    </div>
  );
};

export default MakerCatalog;
