import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { MoreVertical, Edit2, Pause, Play, Trash2, Lock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./ProductActions.module.css";

interface ProductActionsProps {
  isActive: boolean;
  onAction?: (action: string) => void;
}

export const ProductActions: React.FC<ProductActionsProps> = ({ isActive }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      window.addEventListener("scroll", () => setIsOpen(false), {
        passive: true,
      });

      if (triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect();
        setMenuPos({
          top: rect.bottom + window.scrollY,
          left: rect.right - 200 + window.scrollX,
        });
      }
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", () => setIsOpen(false));
    };
  }, [isOpen]);

  const actions = [
    {
      id: "edit",
      label: "Editar",
      icon: <Edit2 size={16} />,
      soon: true,
    },
    {
      id: "status",
      label: isActive ? "Pausar" : "Ativar",
      icon: isActive ? <Pause size={16} /> : <Play size={16} />,
      soon: true,
    },
    {
      id: "delete",
      label: "Remover",
      icon: <Trash2 size={16} />,
      soon: true,
      danger: true,
    },
  ];

  const menuContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={menuRef}
          initial={{ opacity: 0, scale: 0.95, y: -5 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -5 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className={styles.menu}
          style={{
            position: "absolute",
            top: menuPos.top + 8,
            left: menuPos.left,
          }}
        >
          <div className={styles.menuHeader}>
            <span>Ações do Produto</span>
          </div>
          <div className={styles.actionsList}>
            {actions.map((action) => (
              <button
                key={action.id}
                className={`${styles.actionItem} ${action.danger ? styles.danger : ""}`}
                disabled={action.soon}
              >
                <div className={styles.actionIcon}>{action.icon}</div>
                <span className={styles.actionLabel}>{action.label}</span>
                {action.soon && (
                  <div className={styles.soonBadge}>
                    <Lock size={10} />
                    <span>Em breve</span>
                  </div>
                )}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className={styles.wrapper}>
      <button
        ref={triggerRef}
        className={`${styles.trigger} ${isOpen ? styles.active : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Opções do produto"
      >
        <MoreVertical size={20} strokeWidth={2.5} />
      </button>

      {createPortal(menuContent, document.body)}
    </div>
  );
};
