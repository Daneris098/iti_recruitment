import { create } from "zustand"
import {
    SelectedApplicantsStore,
    ApplicantId, SharedApplicantStore,
    JobOpeningsStore, PaginationState,
} from "@modules/Shared/types"

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

export const useJobOpeningStore = create<JobOpeningsStore>((set) => ({
    records: [],
    setJobOpenings: (rows) => set({ records: rows }),
    updateJobOpenings: (id, newJobOpenings) =>
        set((state) => ({
            records: state.records.map((openings) =>
                String(openings.id) === id ? { ...openings, Openings: newJobOpenings } : openings
            )
        }))
}))

export const usePaginationStore = create<PaginationState>((set, get) => ({
    page: 1,
    pageSize: 30,

    setPage: (page) => set({ page }),
    setPageSize: (size) => set({ pageSize: size }),
    getPaginatedRecords: (records) => {
        const { page, pageSize } = get();

        if (pageSize === -1) {
            return records;
        }

        const startIndex = (page - 1) * pageSize;
        const endIndex = Math.min(startIndex + pageSize, records.length);
        return records.slice(startIndex, endIndex);
    },
}));

export const useSelectedApplicantsStore = create<SelectedApplicantsStore>((set) => ({
    selectedIds: [],
    setSelectedIds: (ids) => set({ selectedIds: ids }),
    addSelectedId: (id) => set((state) => ({ selectedIds: [...state.selectedIds, id] })),
    removeSelectedId: (id) =>
        set((state) => ({ selectedIds: state.selectedIds.filter((selectedId) => selectedId !== id) })),
}));