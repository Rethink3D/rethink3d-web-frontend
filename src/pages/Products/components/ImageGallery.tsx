import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getImageUrl } from "../../../utils/imageUtil";
import { ImageModal } from "./ImageModal";
import styles from "./ImageGallery.module.css";
import type { ProductPageDTO } from "../../../types/dtos";

interface ImageGalleryProps {
  product: ProductPageDTO;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ product }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInitialIndex, setModalInitialIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isProgrammaticScroll = useRef(false);

  const handleImageError = (index: number) => {
    setImageErrors((prev) => new Set(prev).add(index));
  };

  const handleOpenModal = (index: number) => {
    setModalInitialIndex(index);
    setIsModalOpen(true);
  };

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

  const handleScroll = () => {
    
    if (isProgrammaticScroll.current) return;

    if (scrollContainerRef.current) {
      const { scrollLeft, offsetWidth } = scrollContainerRef.current;
      const newIndex = Math.round(scrollLeft / offsetWidth);
      if (
        newIndex !== currentImageIndex &&
        newIndex >= 0 &&
        newIndex < (product.images?.length || 0)
      ) {
        setCurrentImageIndex(newIndex);
      }
    }
  };

  
  useEffect(() => {
    if (scrollContainerRef.current && product.images?.length > 0) {
      const width = scrollContainerRef.current.offsetWidth;
      
      
      const currentScroll = scrollContainerRef.current.scrollLeft;
      const targetScroll = currentImageIndex * width;

      if (Math.abs(currentScroll - targetScroll) > 10) {
        isProgrammaticScroll.current = true;
        scrollContainerRef.current.scrollTo({
          left: targetScroll,
          behavior: "smooth",
        });

        
        const timeout = setTimeout(() => {
          isProgrammaticScroll.current = false;
        }, 600);
        return () => clearTimeout(timeout);
      }
    }
  }, [currentImageIndex, product.images]);

  const hasMultipleImages = product.images && product.images.length > 1;

  if (!product.images || product.images.length === 0) {
    return (
      <div className={styles.mainImageContainer}>
        <div className={styles.imagePlaceholder}>
          <span>Imagem não disponível</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={styles.mainImageContainer}>
        {hasMultipleImages && (
          <button
            onClick={prevImage}
            className={`${styles.navButton} ${styles.prevButton}`}
          >
            <ChevronLeft size={24} />
          </button>
        )}

        <div
          className={styles.scrollContainer}
          ref={scrollContainerRef}
          onScroll={handleScroll}
        >
          {product.images.map((img, index) => (
            <div key={img.id} className={styles.scrollImageWrapper}>
              {!imageErrors.has(index) ? (
                <img
                  src={getImageUrl(img.url)}
                  alt={`${product.name} - ${index + 1}`}
                  className={styles.mainImage}
                  onError={() => handleImageError(index)}
                  onClick={() => handleOpenModal(index)}
                  draggable={false}
                  style={{ cursor: "pointer" }}
                />
              ) : (
                <div className={styles.imagePlaceholder}>
                  <span>Imagem não disponível</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {hasMultipleImages && (
          <button
            onClick={nextImage}
            className={`${styles.navButton} ${styles.nextButton}`}
            style={{ right: "1rem" }}
          >
            <ChevronRight size={24} />
          </button>
        )}

        {hasMultipleImages && (
          <div className={styles.indicatorsContainer}>
            {product.images.map((_, index) => (
              <div
                key={index}
                className={`${styles.indicator} ${
                  index === currentImageIndex ? styles.activeIndicator : ""
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIndex(index);
                }}
              />
            ))}
          </div>
        )}
      </div>

      {hasMultipleImages && (
        <div className={styles.thumbnails}>
          {product.images.map((img, index) =>
            !imageErrors.has(index) ? (
              <div
                key={img.id}
                className={`${styles.thumbnail} ${
                  index === currentImageIndex
                    ? styles.activeIndicatorThumbnail
                    : ""
                }`}
                onClick={() => setCurrentImageIndex(index)}
              >
                <img
                  src={getImageUrl(img.url)}
                  alt={`${product.name} view ${index + 1}`}
                  onError={() => handleImageError(index)}
                />
              </div>
            ) : null,
          )}
        </div>
      )}

      {isModalOpen && (
        <ImageModal
          images={product.images}
          initialIndex={modalInitialIndex}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          productName={product.name}
        />
      )}
    </>
  );
};
