import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { ProductCard } from "./components/ProductCard";
import { SearchBar } from "../../components/ui/SearchBar";
import { FilterSidebar } from "./components/CategoryFilter";
import { Skeleton } from "../../components/ui/Skeleton";
import { InfiniteScrollTrigger } from "../../components/ui/InfiniteScrollTrigger";
import { useProductCatalog } from "../../hooks/useProductCatalog";
import { trackProductCatalogView } from "../../utils/analytics";
import styles from "./ProductCatalog.module.css";

const ProductCatalog: React.FC = () => {
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
  } = useProductCatalog();

  useEffect(() => {
    trackProductCatalogView();
  }, []);

  return (
    <div className={styles.catalog}>
      <div className={styles.headerContainer}>
        <header className={styles.headerLeft}>
          <h1 className={styles.pageTitle}>Catálogo de Produtos</h1>
          <p>Explore criações únicas feitas pela nossa comunidade de Makers.</p>
        </header>

        <div className={styles.headerRight}>
          <div className={styles.filterBar}>
            <SearchBar
              onSearch={setSearch}
              placeholder="Buscar produtos..."
              className={styles.catalogSearchBar}
            >
              <FilterSidebar
                categories={availableCategories}
                selectedCategories={filters.selectedCategories}
                isPersonalizableFilter={filters.isPersonalizable}
                onApplyFilters={applyFilters}
                activeFilterCount={activeFilterCount}
              />
            </SearchBar>
          </div>
        </div>
      </div>

      {loading && items.length === 0 ? (
        <div className={styles.grid}>
          {Array(8)
            .fill(0)
            .map((_, i) => (
              <div key={i}>
                <Skeleton height={420} borderRadius={20} />
              </div>
            ))}
        </div>
      ) : items.length === 0 ? (
        <div className={styles.emptyState}>
          <p>Nenhum produto encontrado com os filtros selecionados.</p>
        </div>
      ) : (
        <>
          <div className={styles.grid}>
            {items.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => navigate(`/products/${product.id}`)}
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

export default ProductCatalog;
