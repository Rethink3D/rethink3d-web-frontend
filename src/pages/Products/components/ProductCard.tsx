import type { ProductPreviewDTO } from "../../../types/dtos";
import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { getImageUrl } from "../../../utils/imageUtil";
import styles from "./ProductCard.module.css";

interface ProductCardProps {
  product: ProductPreviewDTO;
  onClick?: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onClick,
}) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  return (
    <Card className={styles.productCard} onClick={onClick}>
      <div className={styles.imageContainer}>
        <img
          src={getImageUrl(product.imageUrl)}
          alt={product.name}
          loading="lazy"
        />
        <div className={styles.overlay}>
          <Button size="sm" variant="primary" className={styles.viewButton}>
            Ver Detalhes
          </Button>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.header}>
          <h3 title={product.name}>{product.name}</h3>
          <span className={styles.price}>{formatPrice(product.price)}</span>
        </div>
        <div className={styles.meta}>
          {product.maker && (
            <span className={styles.maker}>Por {product.maker}</span>
          )}
          {product.rating > 0 && (
            <span className={styles.rating}>★ {product.rating.toFixed(1)}</span>
          )}
        </div>
      </div>
    </Card>
  );
};
