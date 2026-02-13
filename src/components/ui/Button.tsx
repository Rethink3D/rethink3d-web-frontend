import React from "react";
import styles from "./Button.module.css";
import classNames from "classnames";

interface ButtonProps extends React.ButtonHTMLAttributes<
  HTMLButtonElement | HTMLAnchorElement
> {
  variant?: "primary" | "secondary" | "text" | "outline";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  href?: string;
  target?: string;
}

export const Button: React.FC<ButtonProps> = React.memo(
  ({
    children,
    variant = "primary",
    size = "md",
    fullWidth = false,
    className,
    href,
    target,
    ...props
  }) => {
    const combinedClassName = classNames(
      styles.button,
      styles[variant],
      styles[size],
      { [styles.fullWidth]: fullWidth },
      className,
    );

    if (href) {
      const { ...anchorProps } =
        props as React.AnchorHTMLAttributes<HTMLAnchorElement>;
      return (
        <a
          href={href}
          className={combinedClassName}
          target={target}
          {...anchorProps}
        >
          {children}
        </a>
      );
    }

    const { ...buttonProps } =
      props as React.ButtonHTMLAttributes<HTMLButtonElement>;
    return (
      <button className={combinedClassName} {...buttonProps}>
        {children}
      </button>
    );
  },
);
