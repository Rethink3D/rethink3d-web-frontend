import React, { useState } from "react";
import styles from "./SearchBar.module.css";

interface SearchBarProps {
  onSearch: (value: string) => void;
  placeholder?: string;
  className?: string;
  children?: React.ReactNode;
}

export const SearchBar: React.FC<SearchBarProps> = React.memo(
  ({
    onSearch,
    placeholder = "Buscar produtos...",
    className = "",
    children,
  }) => {
    const [inputValue, setInputValue] = useState("");
    const [isFocused, setIsFocused] = useState(false);

    const handleSearch = () => {
      onSearch(inputValue);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        handleSearch();
      }
    };

    const handleClear = () => {
      setInputValue("");
      onSearch("");
    };

    return (
      <div
        className={`${styles.searchBar} ${isFocused ? styles.focused : ""} ${className}`}
      >
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className={styles.input}
        />
        {inputValue && (
          <button
            onClick={handleClear}
            className={styles.clearButton}
            type="button"
            aria-label="Limpar busca"
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
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
        <button
          onClick={handleSearch}
          className={styles.searchButton}
          type="button"
          aria-label="Buscar"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
        </button>
        {children && <div className={styles.actions}>{children}</div>}
      </div>
    );
  },
);
