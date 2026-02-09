import React, { useState, useEffect } from "react";
import { SettingsContext } from "./SettingsContext";

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAnimationEnabled, setIsAnimationEnabled] = useState<boolean>(() => {
    const stored = localStorage.getItem("isAnimationEnabled");
    return stored !== null ? JSON.parse(stored) : true;
  });

  useEffect(() => {
    localStorage.setItem(
      "isAnimationEnabled",
      JSON.stringify(isAnimationEnabled),
    );
  }, [isAnimationEnabled]);

  const toggleAnimation = () => {
    setIsAnimationEnabled((prev) => !prev);
  };

  return (
    <SettingsContext.Provider value={{ isAnimationEnabled, toggleAnimation }}>
      {children}
    </SettingsContext.Provider>
  );
};
