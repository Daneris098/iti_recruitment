import { create } from "zustand";

export interface user_details_type {
  email: string
  name: string
  username: string
  role: number[]
  profile_pic_path: string
  exp?: Number
};

export interface GlobalState {
  userDetails: user_details_type;
  isMobile: boolean;
  isFullscreen: boolean;

  setUserDetails: (userDetails: any) => void;
  setIsMobile: (isMobile: boolean) => void;
  setIsFullscreen: (isFullscreen: boolean) => void;
}

export const userDetailsValue = {
  name: '',
  email: '',
  username: '',
  role: [1],
  profile_pic_path: ''
}

export const GlobalStore = create<GlobalState>((set) => ({
  userDetails: userDetailsValue,
  isMobile: false,
  isFullscreen: false,

  setUserDetails: (userDetails) => set({ userDetails: userDetails }),
  setIsMobile: (isMobile) => set({ isMobile: isMobile }),
  setIsFullscreen: (isFullscreen) => set({ isFullscreen: isFullscreen }),
}));