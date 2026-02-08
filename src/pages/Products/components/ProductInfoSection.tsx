import React from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingBag, Check } from "lucide-react";
import { Button } from "../../../components/ui/Button";
import { getImageUrl } from "../../../utils/imageUtil";
import styles from "./ProductInfoSection.module.css";
import type { ProductPageDTO } from "../../../types/dtos";

interface ProductInfoSectionProps {
  product: ProductPageDTO;
}

export const ProductInfoSection: React.FC<ProductInfoSectionProps> = ({
  product,
}) => {
  const navigate = useNavigate();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  return (
    <div className={styles.productInfo}>
      <div className={styles.header}>
        <h1>{product.name}</h1>
        <span className={styles.price}>{formatPrice(product.price)}</span>
      </div>

      {product.maker && (
        <div
          className={styles.makerInfo}
          onClick={() => navigate(`/makers/${product.maker.id}`)}
          title="Ver perfil do Maker"
        >
          <img
            src={getImageUrl(product.maker.imageUrl)}
            alt={product.maker.name}
            className={styles.makerAvatar}
          />
          <div className={styles.makerText}>
            <span className={styles.makerLabel}>Criado por</span>
            <span className={styles.makerName}>{product.maker.name}</span>
          </div>
        </div>
      )}

      {product.categories && product.categories.length > 0 && (
        <div className={styles.categories}>
          <h3>Categorias</h3>
          <div className={styles.tags}>
            {product.categories.map((category: string) => (
              <span key={category} className={styles.tag}>
                {category}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className={styles.description}>
        <h3>Descrição</h3>
        <p>{product.description}</p>
      </div>

      {product.materials && product.materials.length > 0 && (
        <div className={styles.materials}>
          <h3>Materiais</h3>
          <div className={styles.tags}>
            {product.materials.map((mat: string) => (
              <span key={mat} className={styles.tag}>
                {mat}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className={styles.ctaContainer}>
        <h3 className={styles.ctaTitle}>Gostou deste produto?</h3>
        <p className={styles.ctaText}>
          Baixe o App Rethink3D para encomendar, personalizar e acompanhar seu
          pedido em tempo real.
        </p>
        <Button
          fullWidth
          size="lg"
          onClick={() => {
            navigate("/");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className={styles.downloadButton}
        >
          <ShoppingBag size={20} /> Baixar App e Encomendar
        </Button>
        {product.isPersonalizable && (
          <div className={styles.personalizableNote}>
            <Check size={16} /> Personalização disponível
          </div>
        )}
      </div>
    </div>
  );
};
