import { create } from "zustand";

export interface Store  {
    selectedRow: any;
    isModalOpen: any;
    setSelectedRow: (row: any) => void;
    toggleModal:(open: boolean) => void;
};

export const useStore = create<Store>((set) => ({
    selectedRow: null,
    isModalOpen: false,
    setSelectedRow: (row) => set ({selectedRow : row, isModalOpen: true}),
    toggleModal: (open) => set({isModalOpen: open})
}))

//// 
