import React, { useState } from "react";
import { MakerSidebar } from "./MakerSidebar";
import { Navbar } from "./Navbar";
import styles from "./MakerDashboardLayout.module.css";
import { GridBackground } from "../ui/GridBackground";
import classNames from "classnames";

interface MakerDashboardLayoutProps {
  children: React.ReactNode;
}

export const MakerDashboardLayout: React.FC<MakerDashboardLayoutProps> = ({
  children,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={styles.layout}>
      <GridBackground />
      <Navbar />
      <div className={styles.wrapper}>
        <MakerSidebar
          isCollapsed={isCollapsed}
          onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
        />
        <main
          className={classNames(styles.content, {
            [styles.collapsed]: isCollapsed,
          })}
        >
          {children}
        </main>
      </div>
    </div>
  );
};
