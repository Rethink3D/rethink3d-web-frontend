import React, { useState, useEffect } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { MouseTrace } from "../ui/MouseTrace";
import { RippleEffect } from "../ui/RippleEffect";
import { GridBackground } from "../ui/GridBackground";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [showEffects, setShowEffects] = useState(false);

  useEffect(() => {
    const handle = requestAnimationFrame(() => setShowEffects(true));
    return () => cancelAnimationFrame(handle);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "var(--color-primary)",
      }}
    >
      {showEffects && (
        <>
          <MouseTrace />
          <RippleEffect />
          <GridBackground />
        </>
      )}
      <Navbar />
      <main style={{ flex: 1, paddingTop: "72px" }}>{children}</main>
      <Footer />
    </div>
  );
};
