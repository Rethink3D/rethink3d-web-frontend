import styles from "./PersonalizableBadge.module.css";

export const PersonalizableBadge: React.FC<{ compact?: boolean }> = ({
  compact,
}) => {
  return (
    <div
      className={`${styles.badge} ${compact ? styles.compact : ""}`}
      title="Este produto é personalizável"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
      <span>Personalizável</span>
    </div>
  );
};
