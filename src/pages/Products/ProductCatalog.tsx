import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { productService } from "../../services/productService";
import type { ProductPreviewDTO } from "../../types/dtos";
import { ProductCard } from "./components/ProductCard";
import styles from "./ProductCatalog.module.css";

const ProductCatalog: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<ProductPreviewDTO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
      <header className={styles.header}>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Catálogo de Produtos
        </motion.h1>
        <p>Explore criações únicas feitas pela nossa comunidade de Makers.</p>
      </header>

      {loading ? (
        <div className={styles.loading}>
          <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
          <span className="mt-4">Carregando produtos...</span>
        </div>
      ) : (
        <div className={styles.grid}>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => navigate(`/products/${product.id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductCatalog;
