import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { VirtuosoGrid } from "react-virtuoso";
import { productService } from "../../services/productService";
import type { ProductPreviewDTO } from "../../types/dtos";
import { ProductCard } from "./components/ProductCard";
import { SearchBar } from "../../components/ui/SearchBar";
import { FilterSidebar } from "./components/CategoryFilter";
import { useProductFilters } from "../../hooks/useProductFilters";
import { trackProductCatalogView } from "../../utils/analytics";
import { Skeleton } from "../../components/ui/Skeleton";
import styles from "./ProductCatalog.module.css";

const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const ProductCatalog: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<ProductPreviewDTO[]>([]);
  const [loading, setLoading] = useState(true);

  const activeProducts = useMemo(() => {
    const active = products.filter((product) => product.isActive);
    return shuffleArray(active);
  }, [products]);

  const {
    setSearchText,
    selectedCategories,
    setSelectedCategories,
    isPersonalizableFilter,
    setIsPersonalizableFilter,
    availableCategories,
    filteredProducts,
    activeFilterCount,
  } = useProductFilters(activeProducts);

  const handleApplyFilters = (
    categories: string[],
    isPersonalizable: boolean | null,
  ) => {
    setSelectedCategories(categories);
    setIsPersonalizableFilter(isPersonalizable);
  };

  useEffect(() => {
    trackProductCatalogView();

    const fetchProducts = async () => {
      try {
        const data = await productService.getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className={styles.catalog}>
      <div className={styles.headerContainer}>
        <header className={styles.headerLeft}>
          <motion.h1 initial={{ y: -20 }} animate={{ y: 0 }}>
            Catálogo de Produtos
          </motion.h1>
          <p>Explore criações únicas feitas pela nossa comunidade de Makers.</p>
        </header>

        <div className={styles.headerRight}>
          <div className={styles.filterBar}>
            <SearchBar
              onSearch={setSearchText}
              placeholder="Buscar produtos..."
              className={styles.catalogSearchBar}
            >
              <FilterSidebar
                categories={availableCategories}
                selectedCategories={selectedCategories}
                isPersonalizableFilter={isPersonalizableFilter}
                onApplyFilters={handleApplyFilters}
                activeFilterCount={activeFilterCount}
              />
            </SearchBar>
          </div>
        </div>
      </div>

      {loading ? (
        <div className={styles.grid}>
          {Array(8)
            .fill(0)
            .map((_, i) => (
              <div key={i} className={styles.gridItem}>
                <Skeleton height={420} borderRadius={20} />
              </div>
            ))}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className={styles.emptyState}>
          <p>Nenhum produto encontrado com os filtros selecionados.</p>
        </div>
      ) : (
        <VirtuosoGrid
          style={{ height: "800px" }}
          useWindowScroll
          totalCount={filteredProducts.length}
          listClassName={styles.grid}
          itemClassName={styles.gridItem}
          itemContent={(index: number) => {
            const product = filteredProducts[index];
            return (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => navigate(`/products/${product.id}`)}
              />
            );
          }}
        />
      )}
    </div>
  );
};

export default ProductCatalog;
