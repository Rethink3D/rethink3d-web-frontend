import styles from "./Card.module.css";
import classNames from "classnames";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  hoverEffect = true,
  ...props
}) => {
  return (
    <div
      className={classNames(
        styles.card,
        { [styles.hoverEffect]: hoverEffect },
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};
