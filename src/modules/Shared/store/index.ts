import { create } from "zustand"

interface ApplicantId {
    id: number
    setApplicantId: (id: number) => void
}

export const useApplicantIdStore = create<ApplicantId>((set) => ({
    id: 0,
    setApplicantId: (id) => set({ id }),
}))