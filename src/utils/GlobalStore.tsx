import { create } from "zustand";

export interface user_details_type {
  email: string
  extension: string
  firstName: string
  lastName: string
  middleName: string
  username: string
  photo: string
  userId: number
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
  email: '',
  extension: '',
  firstName: '',
  lastName: '',
  middleName: '',
  username: '',
  photo: '',
  userId: 0
}

export const GlobalStore = create<GlobalState>((set) => ({
  userDetails: userDetailsValue,
  isMobile: false,
  isDrawerOpened: true,

  setIsDrawerOpened: (isDrawerOpened) => set({ isDrawerOpened: isDrawerOpened }),
  setUserDetails: (userDetails) => set({ userDetails: userDetails }),
  setIsMobile: (isMobile) => set({ isMobile: isMobile }),
}));