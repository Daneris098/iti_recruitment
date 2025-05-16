import { create } from "zustand"
import { ApplicantId, SharedApplicantStore } from "@modules/Shared/types"

export const useApplicantIdStore = create<ApplicantId>((set) => ({
    id: 0,
    setApplicantId: (id) => set({ id }),
}))

export const useSharedApplicantStore = create<SharedApplicantStore>((set) => ({
    records: [],
    setSharedApplicantRecords: (rows) => set({ records: rows }),
    updateApplicantStatus: (id, newStatus) =>
        set((state) => ({
            records: state.records.map((applicant) =>
                String(applicant.id) === id
                    ? { ...applicant, Status: newStatus }
                    : applicant
            ),
        })),
}));