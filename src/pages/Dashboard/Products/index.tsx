import React from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import { useMakerData } from "../../../hooks/useMakerData";
import { useMakerProductFilters } from "../../../hooks/useMakerProductFilters";
import { getImageUrl } from "../../../utils/imageUtil";
import { formatCurrency } from "../../../utils/formatCurrency";
import {
  Package,
  Plus,
  AlertCircle,
  Eye,
  EyeOff,
  Settings,
} from "lucide-react";
import { SearchBar } from "../../../components/ui/SearchBar";
import { FilterSidebar } from "../../Products/components/CategoryFilter";
import { ProductActions } from "./components/ProductActions";
import styles from "./Products.module.css";
import { PrinterLoader } from "../../../components/ui/PrinterLoader";

const DashboardProducts: React.FC = () => {
  const navigate = useNavigate();
  const { maker, loading, error } = useMakerData();
  const {
    searchText,
    setSearchText,
    selectedCategories,
    setSelectedCategories,
    isPersonalizableFilter,
    setIsPersonalizableFilter,
    isActiveFilter,
    setIsActiveFilter,
    availableCategories,
    filteredProducts,
    activeFilterCount,
  } = useMakerProductFilters(maker?.products || []);

  const handleApplyFilters = (
    categories: string[],
    isPersonalizable: boolean | null,
    isActive?: boolean | null,
  ) => {
    setSelectedCategories(categories);
    setIsPersonalizableFilter(isPersonalizable);
    if (isActive !== undefined) setIsActiveFilter(isActive);
  };

  if (loading) {
    return (
      <div className={styles.loaderContainer}>
        <PrinterLoader />
        <p>Carregando seus produtos...</p>
      </div>
    );
  }

  if (error || !maker) {
    return (
      <div className={styles.errorContainer}>
        <AlertCircle size={48} color="#ff4d4d" />
        <h2>Ops!</h2>
        <p>{error || "Informações não encontradas."}</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerTitle}>
          <Package size={32} />
          <div>
            <h1>Meus Produtos</h1>
            <p>Gerencie seu catálogo de peças e modelos 3D.</p>
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
            {filteredProducts.length}{" "}
            {filteredProducts.length === 1 ? "Produto" : "Produtos"}
            {searchText && (
              <span className={styles.searchSuffix}>
                {" "}
                encontrados para "{searchText}"
              </span>
            )}
          </h2>
          <p>
            Mostrando {filteredProducts.length} de {maker.products?.length || 0}{" "}
            no total
          </p>
        </div>
        <div className={styles.searchWrapper}>
          <SearchBar
            onSearch={setSearchText}
            placeholder="Buscar nos meus produtos..."
            className={styles.dashboardSearchBar}
          >
            <FilterSidebar
              categories={availableCategories}
              selectedCategories={selectedCategories}
              isPersonalizableFilter={isPersonalizableFilter}
              isActiveFilter={isActiveFilter}
              onApplyFilters={handleApplyFilters}
              activeFilterCount={activeFilterCount}
            />
          </SearchBar>
        </div>
      </div>

      {filteredProducts.length > 0 ? (
        <div className={styles.productGrid}>
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className={styles.productCard}
              onClick={() => navigate(`/products/${product.id}`)}
              style={{ cursor: "pointer" }}
            >
              <div className={styles.imageWrapper}>
                <img
                  src={getImageUrl(product.imageUrl)}
                  alt={product.name}
                  className={styles.productImage}
                />
                <div className={styles.productCardOverlay}>
                  <div className={styles.viewProductBtn}>
                    <Eye size={18} />
                    <span>Ver Produto</span>
                  </div>
                </div>
                <div
                  className={classNames(styles.statusBadge, {
                    [styles.active]: product.isActive,
                    [styles.inactive]: !product.isActive,
                  })}
                >
                  {product.isActive ? <Eye size={12} /> : <EyeOff size={12} />}
                  <span>{product.isActive ? "Ativo" : "Pausado"}</span>
                </div>
              </div>
              <div className={styles.productInfo}>
                <div className={styles.productHeader}>
                  <h3 className={styles.productName}>{product.name}</h3>
                  <div onClick={(e) => e.stopPropagation()}>
                    <ProductActions isActive={product.isActive} />
                  </div>
                </div>
                <p className={styles.productDescription}>
                  {product.description}
                </p>
                <div className={styles.productFooter}>
                  <span className={styles.price}>
                    {formatCurrency(product.price)}
                  </span>
                  {product.isPersonalizable && (
                    <div className={styles.personalizableTag}>
                      <Settings size={12} />
                      <span>Personalizável</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <Package size={64} className={styles.emptyIcon} />
          <h3>Nenhum produto encontrado</h3>
          <p>
            {searchText || selectedCategories.length > 0
              ? "Experimente ajustar seus filtros ou busca."
              : "Você ainda não cadastrou produtos em sua loja."}
          </p>
        </div>
      )}
    </div>
  );
};

export default DashboardProducts;
