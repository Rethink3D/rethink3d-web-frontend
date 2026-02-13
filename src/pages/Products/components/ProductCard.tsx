import type { ProductPreviewDTO } from "../../../types/dtos";
import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { getImageUrl } from "../../../utils/imageUtil";
import { PersonalizableBadge } from "./PersonalizableBadge";
import { trackProductClick } from "../../../utils/analytics";
import styles from "./ProductCard.module.css";

interface ProductCardProps {
  product: ProductPreviewDTO;
  onClick?: () => void;
  compact?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onClick,
  compact,
}) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  const handleClick = () => {
    trackProductClick(product.id, product.name, "catalog");
    onClick?.();
  };

  return (
    <Card className={styles.productCard} onClick={handleClick}>
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
          <div className={styles.priceRow}>
            <span className={styles.price}>{formatPrice(product.price)}</span>
            {product.isPersonalizable && (
              <PersonalizableBadge compact={compact} />
            )}
          </div>
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
