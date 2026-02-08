import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { useProductDetails } from "../../hooks/useProductDetails";
import { ImageGallery } from "./components/ImageGallery";
import { ProductInfoSection } from "./components/ProductInfoSection";
import { ProductCarousel } from "./components/ProductCarousel";
import styles from "./ProductDetails.module.css";
import type { ProductPreviewDTO } from "../../types/dtos";

const ProductDetails: React.FC = () => {
  const navigate = useNavigate();
  const { product, makerProducts, randomProducts, loading } =
    useProductDetails();

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <span className={styles.loadingText}>Carregando produto...</span>
      </div>
    );
  }

  if (!product) {
    return (
      <div className={styles.error}>
        <h2>Produto não encontrado</h2>
        <Button onClick={() => navigate("/products")} className="mt-4">
          Voltar para o Catálogo
        </Button>
      </div>
    );
  }

  const makerPreviewProducts: ProductPreviewDTO[] = makerProducts.map((p) => ({
    id: p.id,
    name: p.name,
    price: p.price,
    imageUrl: p.imageUrl,
    description: p.description,
    maker: product.maker?.name || "",
    makerId: product.maker?.id || "",
    rating: 0,
    isPersonalizable: false,
    isActive: true,
    categories: [],
  }));

  return (
    <div className={styles.container}>
      <Button
        variant="text"
        onClick={() => navigate(-1)}
        className={styles.backButton}
      >
        <ArrowLeft size={20} className="mr-2" /> Voltar
      </Button>

      <div className={styles.mainSection}>
        <div className={styles.imageWrapper}>
          <ImageGallery product={product} />
        </div>

        {makerPreviewProducts.length > 0 && (
          <div className={styles.makerWrapper}>
            <ProductCarousel
              title={`Mais criações de ${product.maker?.name}`}
              products={makerPreviewProducts}
              variant="compact"
            />
          </div>
        )}

        <div className={styles.infoWrapper}>
          <ProductInfoSection product={product} />
        </div>
      </div>

      {randomProducts.length > 0 && (
        <ProductCarousel
          title="Você também pode gostar"
          products={randomProducts}
          className={styles.randomSection}
        />
      )}
    </div>
  );
};

export default ProductDetails;
