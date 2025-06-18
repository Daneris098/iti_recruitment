import { create } from "zustand"
import {
    ApplicantId, SharedApplicantStore,
    JobOpeningsStore, PaginationState,
    SelectedApplicantsStore, SelectedDateStore,
} from "@modules/Shared/types"

export const useApplicantIdStore = create<ApplicantId>((set) => ({
    id: 0,
    setApplicantId: (id) => set({ id }),
}))

export const useSharedApplicantStore = create<SharedApplicantStore>((set) => ({
    selectedApplicant: null,
    setSelectedApplicant: (selectedApplicant: any) => set({ selectedApplicant }),

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

interface StatusFilterStore {
    selectedStatusId: number;
    SetSelectedStatusId: (id: number) => void;
}

export const useStatusFilterStore = create<StatusFilterStore>((set) => ({
    selectedStatusId: 0,
    SetSelectedStatusId: (id) => set({ selectedStatusId: id }),
}))

interface PositionFilterStore {
    selectedPositionId: number;
    setSelectedPositionId: (id: number) => void;
}

export const usePositionFilterStore = create<PositionFilterStore>((set) => ({
    selectedPositionId: 0,
    setSelectedPositionId: (id) => set({ selectedPositionId: id }),
}));

export const useHiredStartDate = create<SelectedDateStore>((set) => ({
    selectedDate: null,
    setSelectedDate: (date) => set({ selectedDate: date })
}))

interface PositionAppliedState {
    firstPositionApplied: string;
    setFirstPositionApplied: (position: string) => void;
}

export const usePositionApplied = create<PositionAppliedState>()((set) => ({
    firstPositionApplied: '',
    setFirstPositionApplied: (position) =>
        set({ firstPositionApplied: position }),
}));

interface DepartmentState {
    departmentName: string;
    setDepartmentName: (position: string) => void;
}

export const useDepartmentStore = create<DepartmentState>()((set) => ({
    departmentName: '',
    setDepartmentName: (position) =>
        set({ departmentName: position }),
}));

interface DivisionState {
    divisionName: string;
    setDivisionName: (position: string) => void;
}

export const useDivisionStore = create<DivisionState>()((set) => ({
    divisionName: '',
    setDivisionName: (position) => set({ divisionName: position }),
}));

interface AmountState {
    totalAmount: number;
    setTotalAmount: (position: number) => void;
}

export const useAmountStore = create<AmountState>()((set) => ({
    totalAmount: 0,
    setTotalAmount: (position) => set({ totalAmount: position }),
}));