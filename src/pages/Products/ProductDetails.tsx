import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ShoppingBag,
  Check,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import type { ProductPageDTO, MakerProductDTO } from "../../types/dtos";
import { productService } from "../../services/productService";
import { makerService } from "../../services/makerService";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { getImageUrl } from "../../utils/imageUtil";
import styles from "./ProductDetails.module.css";

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<ProductPageDTO | null>(null);
  const [makerProducts, setMakerProducts] = useState<MakerProductDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchProductAndRelated = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const productData = await productService.getProductById(id);
        setProduct(productData);
        setCurrentImageIndex(0);

        if (productData.maker?.id) {
          const makerData = await makerService.getMakerById(
            productData.maker.id,
          );
          const otherProducts =
            makerData.products?.filter((p) => p.id !== id) || [];
          setMakerProducts(otherProducts.slice(0, 4));
        }
      } catch (error) {
        console.error("Failed to load product details", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductAndRelated();
    window.scrollTo(0, 0);
  }, [id]);

  const nextImage = () => {
    if (!product?.images) return;
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    if (!product?.images) return;
    setCurrentImageIndex(
      (prev) => (prev - 1 + product.images.length) % product.images.length,
    );
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
        <span className="mt-4">Carregando produto...</span>
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

  const hasMultipleImages = product.images && product.images.length > 1;

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
        {/* Left Column: Image Gallery */}
        <div className={styles.gallerySection}>
          <div className={styles.mainImageContainer}>
            {hasMultipleImages && (
              <button
                onClick={prevImage}
                className={`${styles.navButton} ${styles.prevButton}`}
              >
                <ChevronLeft size={24} />
              </button>
            )}

            <img
              src={
                product.images && product.images.length > 0
                  ? getImageUrl(product.images[currentImageIndex].url)
                  : "/placeholder.png"
              }
              alt={product.name}
              className={styles.mainImage}
            />

            {hasMultipleImages && (
              <button
                onClick={nextImage}
                className={`${styles.navButton} ${styles.nextButton}`}
              >
                <ChevronRight size={24} />
              </button>
            )}
          </div>

          {hasMultipleImages && (
            <div className={styles.thumbnails}>
              {product.images.map((img, index) => (
                <div
                  key={img.id}
                  className={`${styles.thumbnail} ${index === currentImageIndex ? styles.activeThumbnail : ""}`}
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <img
                    src={getImageUrl(img.url)}
                    alt={`${product.name} view ${index + 1}`}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Info & Actions */}
        <div className={styles.productInfo}>
          <div className={styles.header}>
            <h1>{product.name}</h1>
            <span className={styles.price}>
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(product.price)}
            </span>
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
              Baixe o App Rethink3D para encomendar, personalizar e acompanhar
              seu pedido em tempo real.
            </p>
            <Button
              fullWidth
              size="lg"
              onClick={() => window.open("https://rethink3d.com/app", "_blank")}
              className={styles.downloadButton}
            >
              <ShoppingBag size={20} className="mr-2" /> Baixar App e Encomendar
            </Button>
            {product.isPersonalizable && (
              <div className="flex items-center justify-center gap-2 mt-4 text-sm text-gray-500">
                <Check size={16} /> Personalização disponível
              </div>
            )}
          </div>
        </div>
      </div>

      {makerProducts.length > 0 && (
        <div className={styles.relatedSection}>
          <h2>Mais criações de {product.maker?.name}</h2>
          <div className={styles.relatedGrid}>
            {makerProducts.map((prod) => (
              <Card
                key={prod.id}
                onClick={() => navigate(`/products/${prod.id}`)}
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <div className="aspect-square overflow-hidden bg-gray-100">
                  <img
                    src={getImageUrl(prod.imageUrl)}
                    alt={prod.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-lg mb-1 truncate">
                    {prod.name}
                  </h4>
                  <span className="text-primary font-bold">
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(prod.price)}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
