import React from "react";
import { useNavigate } from "react-router-dom";
import { ProductCard } from "../../Products/components/ProductCard";
import type { ProductPreviewDTO } from "../../../types/dtos";
import styles from "./ProductGrid.module.css";

interface ProductGridProps {
  title: string;
  products: ProductPreviewDTO[];
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  title,
  products,
}) => {
  const navigate = useNavigate();

  return (
    <div className={styles.portfolioContainer}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.grid}>
        {products.map((prod) => (
          <ProductCard
            key={prod.id}
            product={prod}
            onClick={() => navigate(`/products/${prod.id}`)}
          />
        ))}
      </div>
    </div>
  );
};
