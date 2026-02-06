import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sun, Moon } from "lucide-react";
import classNames from "classnames";
import { useTheme } from "../../hooks/useTheme";
import styles from "./Navbar.module.css";

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Produtos", path: "/products" },
    { name: "Makers", path: "/makers" },
    { name: "Contato", path: "/contact" },
  ];

  return (
    <nav className={classNames(styles.navbar, { [styles.scrolled]: scrolled })}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <img src="/Logo.webp" alt="Rethink3D" />
          <span className={styles.logoText}>
            Rethink<span className={styles.highlight}>3D</span>
          </span>
        </Link>

        <div className={styles.desktopMenu}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={classNames(styles.navLink, {
                [styles.active]: location.pathname === link.path,
              })}
            >
              {location.pathname === link.path && (
                <motion.span
                  layoutId="activeNav"
                  className={styles.activeIndicator}
                  transition={{
                    type: "spring",
                    stiffness: 380,
                    damping: 30,
                  }}
                />
              )}
              {link.name}
            </Link>
          ))}

          <a
            href="https://dashboard.rethink3d.com.br"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.makerButton}
          >
            Área Maker
          </a>

          <button
            onClick={toggleTheme}
            className={styles.themeToggle}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        <button
          className={styles.mobileToggle}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {createPortal(
          <AnimatePresence>
            {isOpen && (
              <>
                <motion.div
                  className={styles.backdrop}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  className={styles.mobileMenu}
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <div className={styles.mobileHeader}>
                    <span className={styles.logoText}>Menu</span>
                    <button
                      onClick={() => setIsOpen(false)}
                      className={styles.closeBtn}
                    >
                      <X size={24} />
                    </button>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1rem",
                    }}
                  >
                    {navLinks.map((link) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        className={styles.mobileNavLink}
                        onClick={() => setIsOpen(false)}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>

                  <div
                    style={{
                      marginTop: "auto",
                      display: "flex",
                      flexDirection: "column",
                      gap: "1rem",
                    }}
                  >
                    <button
                      onClick={() => {
                        toggleTheme();
                        setIsOpen(false);
                      }}
                      className={styles.themeToggleMobile}
                    >
                      <span>
                        {theme === "dark" ? "Modo Claro" : "Modo Escuro"}
                      </span>
                      {theme === "dark" ? (
                        <Sun size={20} />
                      ) : (
                        <Moon size={20} />
                      )}
                    </button>

                    <a
                      href="https://dashboard.rethink3d.com.br"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.mobileMakerBtn}
                    >
                      Área Maker
                    </a>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>,
          document.body,
        )}
      </div>
    </nav>
  );
};
