import React from "react";
import { Package, Plus, AlertCircle } from "lucide-react";
import { useMakerProducts } from "../../../hooks/useMakerProducts";
import { useMakerData } from "../../../hooks/useMakerData";
import { FilterSidebar } from "../../Products/components/CategoryFilter";
import { MakerProductCard } from "./components/MakerProductCard";
import { PrinterLoader } from "../../../components/ui/PrinterLoader";
import { InfiniteScrollTrigger } from "../../../components/ui/InfiniteScrollTrigger";
import { SearchBar } from "../../../components/ui/SearchBar";
import styles from "./Products.module.css";
import orderStyles from "../Orders/Orders.module.css";

const DashboardProducts: React.FC = () => {
  const { maker, loading: loadingMaker } = useMakerData();
  const {
    products,
    loading,
    loadingMore,
    error,
    searchText,
    setSearchText,
    isPersonalizableFilter,
    setIsPersonalizableFilter,
    isActiveFilter,
    setIsActiveFilter,
    total,
    hasMore,
    loadMore,
    activeFilterCount,
  } = useMakerProducts(maker?.id);

  const handleApplyFilters = (
    _categories: string[],
    isPersonalizable: boolean | null,
    isActive?: boolean | null,
  ) => {
    setIsPersonalizableFilter(isPersonalizable);
    if (isActive !== undefined) {
      setIsActiveFilter(isActive);
    }
  };

  if ((loading || loadingMaker) && products.length === 0) {
    return (
      <div className={styles.loaderContainer}>
        <PrinterLoader />
        <p>Carregando seus produtos...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={orderStyles.headerTop}>
          <div className={styles.headerTitle}>
            <Package size={32} />
            <div>
              <h1>Meus Produtos</h1>
              <p>Gerencie seu catálogo de peças e modelos 3D.</p>
            </div>
          </div>
        </div>
        
        <div className={styles.addBtnContainer}>
          <button className={styles.addBtn} disabled>
            <Plus size={20} />
            <span>Novo Produto</span>
          </button>
          <span className={styles.soonIndicator}>Em breve no Web</span>
        </div>
      </header>

      <div className={styles.noticeBanner}>
        <AlertCircle size={20} />
        <p>
          <strong>Gerenciamento no App:</strong> Por enquanto, a criação e
          edição de produtos estão disponíveis apenas no{" "}
          <strong>App Rethink3D</strong>. Em breve você poderá gerenciar tudo
          por aqui!
        </p>
      </div>

      <div className={styles.controls}>
        <div className={styles.stats}>
          <h2>
            {total} {total === 1 ? "Produto" : "Produtos"}
            {searchText && (
              <span className={styles.searchSuffix}>
                {" "}
                encontrados para "{searchText}"
              </span>
            )}
          </h2>
          <p>
            Mostrando {products.length} de {total} no total
          </p>
        </div>
        <div className={styles.searchWrapper}>
          <SearchBar
            onSearch={setSearchText}
            placeholder="Buscar nos meus produtos..."
            className={styles.dashboardSearchBar}
          >
            <FilterSidebar
              categories={[]} // Not needed anymore
              selectedCategories={[]}
              isPersonalizableFilter={isPersonalizableFilter}
              isActiveFilter={isActiveFilter}
              onApplyFilters={handleApplyFilters}
              activeFilterCount={activeFilterCount}
            />
          </SearchBar>
        </div>
      </div>

      {error ? (
        <div className={styles.errorContainer}>
          <AlertCircle size={48} color="#ff4d4d" />
          <h2>Ops!</h2>
          <p>{error}</p>
        </div>
      ) : products.length > 0 ? (
        <>
          <div className={styles.productGrid}>
            {products.map((product) => (
              <MakerProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <InfiniteScrollTrigger
            onIntersect={loadMore}
            hasMore={hasMore}
            isLoading={loadingMore}
          />
        </>
      ) : (
        <div className={styles.emptyState}>
          <Package size={64} className={styles.emptyIcon} />
          <h3>Nenhum produto encontrado</h3>
          <p>
            {searchText || activeFilterCount > 0
              ? "Experimente ajustar seus filtros ou busca."
              : "Você ainda não cadastrou produtos em sua loja."}
          </p>
        </div>
      )}
    </div>
  );
};

export default DashboardProducts;
