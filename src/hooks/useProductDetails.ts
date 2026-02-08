import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { productService } from "../services/productService";
import { makerService } from "../services/makerService";
import type {
  ProductPageDTO,
  MakerProductDTO,
  ProductPreviewDTO,
} from "../types/dtos";

export const useProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductPageDTO | null>(null);
  const [makerProducts, setMakerProducts] = useState<MakerProductDTO[]>([]);
  const [randomProducts, setRandomProducts] = useState<ProductPreviewDTO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductAndRelated = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const productData = await productService.getProductById(id);
        setProduct(productData);

        if (productData.maker?.id) {
          const makerData = await makerService.getMakerById(
            productData.maker.id,
          );
          const otherProducts =
            makerData.products?.filter((p) => p.id !== id) || [];
          setMakerProducts(otherProducts.slice(0, 4));
        }

        const allProducts = await productService.getProducts();
        const otherRandom = allProducts
          .filter((p) => p.id !== id)
          .sort(() => 0.5 - Math.random())
          .slice(0, 10);
        setRandomProducts(otherRandom);
      } catch (error) {
        console.error("Failed to load product details", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProductAndRelated();
    window.scrollTo(0, 0);
  }, [id]);

  return { product, makerProducts, randomProducts, loading };
};
