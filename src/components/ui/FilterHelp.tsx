import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "../../pages/Products/components/CategoryFilter.module.css";

interface FilterHelpProps {
  content: React.ReactNode;
}

export const FilterHelp: React.FC<FilterHelpProps> = ({ content }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const updatePosition = () => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();

      
      
      const tooltipWidth = 260;
      let left = rect.right - tooltipWidth + window.scrollX;

      
      if (left < 20) left = 20;
      
      if (left + tooltipWidth > window.innerWidth - 20) {
        left = window.innerWidth - tooltipWidth - 20;
      }

      setCoords({
        top: rect.bottom + window.scrollY + 8,
        left: left,
      });
    }
  };

  const toggleTooltip = (e: React.MouseEvent) => {
    e.stopPropagation();
    updatePosition();
    setShowTooltip((prev) => !prev);
  };

  useEffect(() => {
    if (showTooltip) {
      window.addEventListener("resize", updatePosition);
      window.addEventListener("scroll", updatePosition);

      
      timeoutRef.current = setTimeout(() => {
        setShowTooltip(false);
      }, 8000);

      const handleClickOutside = (event: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node)
        ) {
          
          const tooltipElement = document.getElementById("filter-help-tooltip");
          if (tooltipElement && tooltipElement.contains(event.target as Node))
            return;

          setShowTooltip(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        window.removeEventListener("resize", updatePosition);
        window.removeEventListener("scroll", updatePosition);
        document.removeEventListener("mousedown", handleClickOutside);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      };
    }
  }, [showTooltip]);

  return (
    <div className={styles.helpContainer} ref={containerRef}>
      <button
        type="button"
        className={styles.helpIcon}
        onClick={toggleTooltip}
        aria-label="Informação de ajuda"
      >
        <Info size={16} />
      </button>

      {createPortal(
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              id="filter-help-tooltip"
              initial={{ opacity: 0, y: 5, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 5, scale: 0.95 }}
              className={styles.helpTooltip}
              style={{
                position: "absolute",
                top: coords.top,
                left: coords.left,
                zIndex: 10000,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {content}
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </div>
  );
};
