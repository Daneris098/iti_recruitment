/**
 * @version    HRDotNet(v.2.0.0)
 * @file       Use Width
 * @author     Hersvin Fred De La Cruz Labastida
 */

import { create } from "zustand";

interface LogoState {
  isLogowordVisible: boolean;
  isHovered: boolean;
  setHovered: (hovered: boolean) => void;
  toggleLogos: () => void;
}

const useLogoWidth = create<LogoState>((set) => ({
  isLogowordVisible: true,
  isHovered: false,
  toggleLogos: () =>
    set((state) => ({ isLogowordVisible: !state.isLogowordVisible })),
  setHovered: (hovered) => set({ isHovered: hovered }),
}));

export { useLogoWidth };
