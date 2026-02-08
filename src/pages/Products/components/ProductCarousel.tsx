import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductCard } from "./ProductCard";
import styles from "./ProductCarousel.module.css";
import type { ProductPreviewDTO } from "../../../types/dtos";

interface ProductCarouselProps {
  title: string;
  products: ProductPreviewDTO[];
  className?: string;
  variant?: "default" | "compact";
}

export const ProductCarousel: React.FC<ProductCarouselProps> = ({
  title,
  products,
  className,
  variant = "default",
}) => {
  const navigate = useNavigate();
  const carouselRef = useRef<HTMLDivElement>(null);
  const [scrollState, setScrollState] = useState({
    left: false,
    right: false,
  });

  const isCompact = variant === "compact";

  const checkScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setScrollState({
        left: scrollLeft > 0,
        right: scrollLeft < scrollWidth - clientWidth - 2,
      });
    }
  };

  useEffect(() => {
    const handleResize = () => checkScroll();
    window.addEventListener("resize", handleResize);
    setTimeout(handleResize, 100);
    return () => window.removeEventListener("resize", handleResize);
  }, [products]);

  const scrollCarousel = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = 300;
      carouselRef.current.scrollBy({
        left: direction === "right" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
      setTimeout(checkScroll, 300);
    }
  };

  if (products.length === 0) return null;

  return (
    <div
      className={`${className || styles.relatedSection} ${
        isCompact ? styles.compact : ""
      }`}
    >
      <h3>{title}</h3>
      <div className={styles.carouselWrapper}>
        {scrollState.left && (
          <button
            className={`${styles.carouselNavButton} ${styles.carouselPrev}`}
            onClick={() => scrollCarousel("left")}
          >
            <ChevronLeft size={24} />
          </button>
        )}
        <div className={styles.relatedCarouselContainer}>
          <div
            className={styles.relatedCarousel}
            ref={carouselRef}
            onScroll={checkScroll}
          >
            {products.map((prod) => (
              <div key={prod.id} className={styles.relatedCardWrapper}>
                <ProductCard
                  product={prod}
                  onClick={() => navigate(`/products/${prod.id}`)}
                  compact={isCompact}
                />
              </div>
            ))}
          </div>
        </div>
        {scrollState.right && (
          <button
            className={`${styles.carouselNavButton} ${styles.carouselNext}`}
            onClick={() => scrollCarousel("right")}
          >
            <ChevronRight size={24} />
          </button>
        )}
      </div>
    </div>
  );
};
