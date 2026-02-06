import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import styles from "./InfiniteMarquee.module.css";

interface InfiniteMarqueeProps {
  children: React.ReactNode;
  direction?: "left" | "right";
  speed?: number;
  className?: string;
}

export const InfiniteMarquee: React.FC<InfiniteMarqueeProps> = ({
  children,
  direction = "left",
  speed = 20,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: "100px" });

  return (
    <div
      ref={containerRef}
      className={`${styles.marqueeContainer} ${className}`}
    >
      <motion.div
        className={styles.track}
        initial={{ x: direction === "left" ? 0 : "-50%" }}
        animate={
          isInView ? { x: direction === "left" ? "-50%" : 0 } : undefined
        }
        transition={{
          duration: speed,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        <div className={styles.content}>{children}</div>
        <div className={styles.content}>{children}</div>
      </motion.div>
    </div>
  );
};
