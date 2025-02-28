import { create } from 'zustand';
import applicantsRecord from '@modules/Applicants/values/response/applicants.json';
import { sortBy } from "lodash";
import { Applicants, ApplicantStatus, FilterState } from '@modules/Applicants/types';
import { filterVal, selectedVal } from '@modules/Applicants/values';

// for fetching the json from values folder
interface Applicant {
  Applicant_Name: string;
  Application_Date: string;
  Phone_Number: string;
  Email: string;
  Position: string;
  Status: string;
}

interface ApplicantStore {
  records: Applicant[];
  loadApplicants: () => void;
}

export const useApplicantStore = create<ApplicantStore>((set) => ({
  records: [],
  loadApplicants: () => set({ records: applicantsRecord }),
}))
// end of fetching the json from values folder

// for sorting table
interface SortState {
  columnAccessor: string;
  direction: "asc" | "desc";
  sortedRecords: Applicant[];

  setSort: (column: string, records: Applicant[]) => void;
  setRecords: (records: Applicant[]) => void;
}

export const useSortStore = create<SortState>((set, get) => ({
  columnAccessor: "Applicant_Name",
  direction: "asc",
  sortedRecords: [],

  setSort: (column, records) => {
    set((state) => {
      const newDirection =
        state.columnAccessor === column && state.direction === "asc" ? "desc" : "asc";

      const sorted = sortBy(records, column);
      const updatedRecords = newDirection === "desc" ? sorted.reverse() : sorted;

      return {
        columnAccessor: column,
        direction: newDirection,
        sortedRecords: updatedRecords,
      };
    });
  },

  setRecords: (records) => {
    const { columnAccessor, direction } = get();
    const sorted = sortBy(records, columnAccessor);
    set({ sortedRecords: direction === "desc" ? sorted.reverse() : sorted });
  },
}));
// end of sorting table

// pagination store
interface PaginationState {
  page: number;
  pageSize: number;
  setPageSize: (size: number) => void;
  setPage: (page: number) => void;
  getPaginatedRecords: (records: Applicant[]) => Applicant[];
}

export const usePaginationStore = create<PaginationState>((set, get) => ({
  page: 1,
  pageSize: 30,

  setPage: (page) => set({ page }),
  setPageSize: (size) => set({ pageSize: size }),

  getPaginatedRecords: (records) => {
    const { page, pageSize } = get();
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return records.slice(startIndex, endIndex);
  },
}));
// end of pagination store

// For Filter
export const FilterStore = create<FilterState>((set) => ({
  selectedData: selectedVal,
  filterDrawer: false,
  filter: filterVal,
  clearFilter: false,
  isFiltered: false,
  modal: false,
  alert: '',

  setAlert: (alert: string) => set({ alert: alert }),
  setModal: (modal: boolean) => set({ modal: modal }),
  setClearFilter: (filter: ApplicantStatus) => set({ filter: filter }),
  setSeleselectedVal: (selectedData: Applicants) => set({ selectedData: selectedData }),
  setFilterDrawer: (filterDrawer: boolean) => set({ filterDrawer: filterDrawer }),
  setIsFiltered: (isFiltered: boolean) => set({ isFiltered: isFiltered }),
  setFilter: (filter: ApplicantStatus) => set({ filter: filter }),
}))



// For DropDownOffered modal
interface useDropDownOfferedState {
  status: string;
  setStatus: (status: string) => void;
  getSalaryTypes: string;
  setSalaryTypes: (type: string) => void;
  fullName: string;
  setFullName: (name: string) => void;
  amount: string;
  setAmount: (amount: string) => void;
  position: string;
  setPosition: (position: string) => void;
  department: string;
  setDepartment: (department: string) => void;
  comments: string;
  setComments: (comments: string) => void;
}

export const useDropDownOfferedStore = create<useDropDownOfferedState>((set) => ({
  status: "Offered",
  setStatus: (status) => set({ status }),

  getSalaryTypes: "",
  setSalaryTypes: (type) => set({ getSalaryTypes: type }),

  fullName: "",
  setFullName: (name) => set({ fullName: name }),

  amount: "",
  setAmount: (amount) => set({ amount }),

  position: "",
  setPosition: (position) => set({ position }),

  department: "",
  setDepartment: (department) => set({ department }),

  comments: "",
  setComments: (comments) => set({ comments }),

}))
// End of DropDownOffered modal

// Archived Modal
interface Feedbacks {

  feedback: string;
  setFeedback: (feedback: string) => void;

  feedbacks: string[];
  addFeedback: (newFeedback: string) => void;

  status: string;
  setStatus: (status: string) => void;

  comments: string;
  setComments: (comments: string) => void;
}

export const useFeedbacksStore = create<Feedbacks>((set) => ({
  feedback: "",
  setFeedback: (feedback) => set({ feedback }),

  status: "Archived",
  setStatus: (status) => set({ status }),

  comments: "",
  setComments: (comments) => set({ comments }),

  feedbacks: ["Inactive", "Not Qualified", "Budget Constraint", "Add Feedback"],

  addFeedback: (newFeedback) =>
    set((state) => {
      const updatedFeedbacks = [
        ...state.feedbacks.slice(0, -1), // Remove "Add Feedback" temporarily
        newFeedback,
        "Add Feedback", // Add it back to the end
      ];
      console.log("Updated feedbacks:", updatedFeedbacks); // Debugging
      return { feedbacks: updatedFeedbacks };
    }),

}));
// End of Archived Modal

// For Closing modal
interface CloseModal {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}

export const useCloseModal = create<CloseModal>((set) => ({
  isModalOpen: false,
  setIsModalOpen: (isOpen) => set({ isModalOpen: isOpen }),
}))

interface CloseUpdateStatusModal {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}

export const useCloseUpdateStatusModal = create<CloseUpdateStatusModal>((set) => ({
  isModalOpen: false,
  setIsModalOpen: (isOpen) => set({ isModalOpen: isOpen }),
}))
// end of closing modal

export interface ViewApplicantsProps {
  Applicant_Name: string;
  Position: string;
  Status: string;
  Email: string;
  Phone: string;
  Skills: string;
  Remarks: string;
  onClose: () => void;
}