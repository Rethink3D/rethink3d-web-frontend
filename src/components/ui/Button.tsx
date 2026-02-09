import React from "react";
import styles from "./Button.module.css";
import classNames from "classnames";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "text" | "outline";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = React.memo(
  ({
    children,
    variant = "primary",
    size = "md",
    fullWidth = false,
    className,
    ...props
  }) => {
    return (
      <button
        className={classNames(
          styles.button,
          styles[variant],
          styles[size],
          { [styles.fullWidth]: fullWidth },
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);
