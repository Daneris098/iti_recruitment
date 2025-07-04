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
    positionId: number | undefined;
    setPositionId: (positionId: number) => void;
    setFirstPositionApplied: (position: string) => void;
}

export const usePositionApplied = create<PositionAppliedState>()((set) => ({
    firstPositionApplied: '',
    positionId: 0,
    setPositionId: (positionId) => set({ positionId: positionId }),
    setFirstPositionApplied: (position) =>
        set({ firstPositionApplied: position }),
}));

interface DepartmentState {
    departmentName: string;
    setDepartmentName: (position: string) => void;
}

interface ApplicantNameState {
    applicantName: string;
    setApplicantName: (name: string) => void;
}

export const useApplicantNameStore = create<ApplicantNameState>()((set) => ({
    applicantName: '',
    setApplicantName: (name) =>
        set({ applicantName: name }),
}));

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

interface LoadTimeState {
    loadTime: number | null;
    setLoadTime: (t: number) => void;
}

export const useLoadTimeStore = create<LoadTimeState>()((set) => ({
    loadTime: null,
    setLoadTime: (t) => set({ loadTime: t }),
}));
interface ApplicantChoiceState {
    transferredPositionName: string | null;
    setTransferredPositionName: (value: string | null) => void;

    transferredDepartmentId: number | null;
    setTransferredDepartmentId: (value: number | null) => void;
}

export const useChoiceStore = create<ApplicantChoiceState>((set) => ({
    transferredPositionName: null,
    setTransferredPositionName: (value) => set({ transferredPositionName: value }),

    transferredDepartmentId: null,
    setTransferredDepartmentId: (value) => set({ transferredDepartmentId: value }),
}));


type Company = {
    id: number;
    name: string;
};

type JobOpening = {
    id: number;
    department: number;
    position: string;
    company: Company | null;
    slots: number;
    departmentName?: string;
    divisionName?: string;
    items?: any;
};

interface JobOpeningPositionStore {
    jobOpenings: JobOpening[];
    selectedOpening: JobOpening | null;
    departmentName: string | null;
    setJobOpenings: (openings: JobOpening[]) => void;
    setSelectedOpening: (opening: JobOpening | null) => void;
    setDepartmentName: (name: string | null) => void;
}

export const useJobOpeningPositionStore = create<JobOpeningPositionStore>((set) => ({
    jobOpenings: [],
    selectedOpening: null,
    departmentName: null,
    setJobOpenings: (openings) => set({ jobOpenings: openings }),
    setSelectedOpening: (opening) => set({ selectedOpening: opening }),
    setDepartmentName: (name) => set({ departmentName: name }),
}));