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
  isDrawerOpened: boolean;

  setIsDrawerOpened: (isDrawerOpened: any) => void;
  setUserDetails: (userDetails: any) => void;
  setIsMobile: (isMobile: boolean) => void;
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
  isDrawerOpened: true,

  setIsDrawerOpened: (isDrawerOpened) => set({ isDrawerOpened: isDrawerOpened }),
  setUserDetails: (userDetails) => set({ userDetails: userDetails }),
  setIsMobile: (isMobile) => set({ isMobile: isMobile }),
}));