import React, { useState, useRef, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";
import { getImageUrl } from "../../../utils/imageUtil";
import styles from "./ImageModal.module.css";

interface ImageModalProps {
  images: Array<{ id: number; url: string }>;
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
  productName: string;
}

export const ImageModal: React.FC<ImageModalProps> = ({
  images,
  initialIndex,
  isOpen,
  onClose,
  productName,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const resetZoom = useCallback(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    resetZoom();
  }, [images.length, resetZoom]);

  const handlePrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    resetZoom();
  }, [images.length, resetZoom]);

  
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrevious();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleNext, handlePrevious, onClose]);

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.5, 4));
  };

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 0.5, 1));
    if (scale <= 1.5) {
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      handleZoomIn();
    } else {
      handleZoomOut();
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale > 1) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && scale > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1 && scale > 1) {
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y,
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging && scale > 1 && e.touches.length === 1) {
      setPosition({
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y,
      });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {}
        <div className={styles.modalHeader}>
          <div className={styles.imageCounter}>
            {currentIndex + 1} / {images.length}
          </div>
          <button className={styles.closeButton} onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        {}
        <div
          ref={containerRef}
          className={styles.imageContainer}
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            ref={imageRef}
            className={styles.imageWrapper}
            style={{
              transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
              cursor:
                scale > 1 ? (isDragging ? "grabbing" : "grab") : "default",
            }}
          >
            <img
              src={getImageUrl(images[currentIndex].url)}
              alt={`${productName} - ${currentIndex + 1}`}
              className={styles.modalImage}
              draggable={false}
            />
          </div>
        </div>

        {}
        {images.length > 1 && (
          <>
            <button
              className={`${styles.navButton} ${styles.navPrev}`}
              onClick={handlePrevious}
            >
              <ChevronLeft size={32} />
            </button>
            <button
              className={`${styles.navButton} ${styles.navNext}`}
              onClick={handleNext}
            >
              <ChevronRight size={32} />
            </button>
          </>
        )}

        {}
        <div className={styles.zoomControls}>
          <button
            className={styles.zoomButton}
            onClick={handleZoomOut}
            disabled={scale <= 1}
          >
            <ZoomOut size={20} />
          </button>
          <span className={styles.zoomLevel}>{Math.round(scale * 100)}%</span>
          <button
            className={styles.zoomButton}
            onClick={handleZoomIn}
            disabled={scale >= 4}
          >
            <ZoomIn size={20} />
          </button>
        </div>

        {}
        {images.length > 1 && (
          <div className={styles.thumbnailContainer}>
            {images.map((img, index) => (
              <div
                key={img.id}
                className={`${styles.thumbnail} ${
                  index === currentIndex ? styles.activeThumbnail : ""
                }`}
                onClick={() => {
                  setCurrentIndex(index);
                  resetZoom();
                }}
              >
                <img
                  src={getImageUrl(img.url)}
                  alt={`${productName} thumbnail ${index + 1}`}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
