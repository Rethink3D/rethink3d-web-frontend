import { useEffect, useRef } from "react";
import { Skeleton } from "./Skeleton";
import styles from "./InfiniteScrollTrigger.module.css";

interface InfiniteScrollTriggerProps {
  onIntersect: () => void;
  hasMore: boolean;
  isLoading: boolean;
}

export const InfiniteScrollTrigger: React.FC<InfiniteScrollTriggerProps> = ({
  onIntersect,
  hasMore,
  isLoading,
}) => {
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          onIntersect();
        }
      },
      { threshold: 0.1 },
    );

    const currentTrigger = triggerRef.current;
    if (currentTrigger) {
      observer.observe(currentTrigger);
    }

    return () => {
      if (currentTrigger) {
        observer.unobserve(currentTrigger);
      }
    };
  }, [onIntersect, hasMore, isLoading]);

  if (!hasMore) return null;

  return (
    <div ref={triggerRef} className={styles.trigger}>
      {isLoading && (
        <div className={styles.loadingGrid}>
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} height={300} borderRadius={20} />
            ))}
        </div>
      )}
    </div>
  );
};
