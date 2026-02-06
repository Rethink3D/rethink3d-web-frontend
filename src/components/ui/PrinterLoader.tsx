import styles from "./PrinterLoader.module.css";

export const PrinterLoader = () => {
  return (
    <div className={styles.container}>
      <div className={styles.iconWrapper}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={styles.printerIcon}
        >
          <path d="M2 21h20" className={styles.frame} />
          <path
            d="M5 21V7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v14"
            className={styles.frame}
          />

          <g className={styles.nozzle}>
            <rect x="9" y="8" width="6" height="4" />
            <path d="M12 12v3" />
          </g>
        </svg>
      </div>
      <div className={styles.loadingText}>FATIANDO...</div>
    </div>
  );
};
