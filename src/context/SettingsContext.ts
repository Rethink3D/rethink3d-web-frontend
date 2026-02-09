import { createContext } from "react";

export interface SettingsContextType {
  isAnimationEnabled: boolean;
  toggleAnimation: () => void;
}

export const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined,
);
