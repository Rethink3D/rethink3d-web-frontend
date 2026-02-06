import { useEffect, useState } from "react";
import { X, Check, ShoppingBag } from "lucide-react";
import type { ProductPageDTO } from "../../../types/dtos";
import { productService } from "../../../services/productService";
import { Button } from "../../../components/ui/Button";
import { getImageUrl } from "../../../utils/imageUtil";
import styles from "./ProductModal.module.css";

interface ProductModalProps {
  productId: string;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  productId,
  onClose,
}) => {
  const [product, setProduct] = useState<ProductPageDTO | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await productService.getProductById(productId);
        setProduct(data);
      } catch (error) {
        console.error("Failed to fetch product details", error);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  if (!productId) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          <X size={24} />
        </button>

        {loading ? (
          <div className={styles.loading}>Carregando...</div>
        ) : product ? (
          <div className={styles.content}>
            <div className={styles.gallery}>
              {}
              <div className={styles.mainImage}>
                <img
                  src={
                    product.images && product.images.length > 0
                      ? getImageUrl(product.images[0].url)
                      : "/placeholder.png"
                  }
                  alt={product.name}
                />
              </div>
              {}
            </div>

            <div className={styles.details}>
              <h2>{product.name}</h2>
              <div className={styles.meta}>
                <span className={styles.price}>
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(product.price)}
                </span>
                {product.maker && (
                  <span className={styles.maker}>
                    Por{" "}
                    <span className={styles.highlight}>
                      {product.maker.name}
                    </span>
                  </span>
                )}
              </div>

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

              <div className={styles.actions}>
                <div className={styles.ctaContainer}>
                  <p className={styles.ctaText}>
                    Disponível exclusivamente no App
                  </p>
                  <Button
                    fullWidth
                    size="lg"
                    onClick={() =>
                      window.open("https://rethink3d.com/app", "_blank")
                    }
                    className={styles.downloadButton}
                  >
                    <ShoppingBag size={20} className="mr-2" /> Baixar App para
                    Encomendar
                  </Button>
                  <p className={styles.downloadHint}>
                    Baixe agora para iOS e Android
                  </p>
                </div>

                {product.isPersonalizable && (
                  <div className={styles.feature}>
                    <Check size={16} /> Personalizável
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.error}>Produto não encontrado.</div>
        )}
      </div>
    </div>
  );
};
