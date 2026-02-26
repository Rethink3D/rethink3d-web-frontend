import React from "react";
import styles from "./InfiniteMarquee.module.css";

interface InfiniteMarqueeProps {
  children: React.ReactNode;
  direction?: "left" | "right";
  speed?: number;
  className?: string;
}

export const InfiniteMarquee: React.FC<InfiniteMarqueeProps> = React.memo(
  ({ children, direction = "left", speed = 20, className = "" }) => {
    return (
      <div className={`${styles.marqueeContainer} ${className}`}>
        <div
          className={styles.track}
          style={{
            animationDuration: `${speed}s`,
            animationDirection: direction === "right" ? "reverse" : "normal",
          }}
        >
          <div className={styles.content}>{children}</div>
          <div className={styles.content}>{children}</div>
        </div>
      </div>
    );
  },
);
