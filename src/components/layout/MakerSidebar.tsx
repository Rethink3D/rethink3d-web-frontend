import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Receipt,
  MessageSquare,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import classNames from "classnames";
import { useAuth } from "../../context/useAuth";
import styles from "./MakerSidebar.module.css";

interface MakerSidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export const MakerSidebar: React.FC<MakerSidebarProps> = ({
  isCollapsed,
  onToggleCollapse,
}) => {
  const { signOut } = useAuth();

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Loja", path: "/dashboard/store", icon: ShoppingBag },
    { name: "Produtos", path: "/dashboard/products", icon: Package },
    { name: "Pedidos", path: "/dashboard/orders", icon: Receipt },
    { name: "Solicitações", path: "/dashboard/requests", icon: MessageSquare },
  ];

  return (
    <aside
      className={classNames(styles.sidebar, {
        [styles.collapsed]: isCollapsed,
      })}
    >
      <button
        className={styles.collapseBtn}
        onClick={onToggleCollapse}
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>

      <div className={styles.menuList}>
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              classNames(styles.menuItem, { [styles.active]: isActive })
            }
            end={item.path === "/dashboard"}
          >
            <item.icon size={22} className={styles.icon} />
            <span className={styles.name}>{item.name}</span>
          </NavLink>
        ))}
      </div>

      <button onClick={signOut} className={styles.logoutBtn}>
        <LogOut size={22} className={styles.icon} />
        <span className={styles.name}>Sair</span>
      </button>
    </aside>
  );
};
