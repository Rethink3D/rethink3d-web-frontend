import React from "react";
import styles from "./Skeleton.module.css";

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width,
  height,
  borderRadius,
  className = "",
}) => {
  const formatValue = (val: string | number | undefined, fallback: string) => {
    if (val === undefined) return fallback;
    return typeof val === "number" ? `${val}px` : val;
  };

  return (
    <div
      className={`${styles.skeleton} ${className}`}
      style={{
        width: formatValue(width, "100%"),
        height: formatValue(height, "100%"),
        borderRadius: formatValue(borderRadius, "8px"),
      }}
    />
  );
};
