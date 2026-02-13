import React from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import { Eye, EyeOff, Settings } from "lucide-react";
import { getImageUrl } from "../../../../utils/imageUtil";
import { formatCurrency } from "../../../../utils/formatCurrency";
import type { MakerProductDTO } from "../../../../types/dtos/maker";
import styles from "./MakerProductCard.module.css";

interface MakerProductCardProps {
  product: MakerProductDTO;
}

export const MakerProductCard: React.FC<MakerProductCardProps> = ({
  product,
}) => {
  const navigate = useNavigate();

  return (
    <div
      className={styles.productCard}
      onClick={() => navigate(`/products/${product.id}`)}
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
        </div>
        <p className={styles.productDescription}>{product.description}</p>
        <div className={styles.productFooter}>
          <span className={styles.price}>{formatCurrency(product.price)}</span>
          {product.isPersonalizable && (
            <div className={styles.personalizableTag}>
              <Settings size={12} />
              <span>Personalizável</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
