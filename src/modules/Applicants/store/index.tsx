import { create } from 'zustand';
import applicantsRecord from '@modules/Applicants/values/response/applicants.json';
import { sortBy } from "lodash";
import { Applicants, ApplicantStatus, FilterState } from '@modules/Applicants/types';
import { filterVal, selectedVal } from '@modules/Applicants/values';

// for fetching the json from values folder
interface Applicant {
  id: number;
  Applicant_Name: string;
  Application_Date: string;
  Phone: string;
  Email: string;
  Position: string;
  Status: string;
  Feedback?: string;
}

interface ApplicantStore {
  records: Applicant[];
  loadApplicants: () => void;
  updateApplicantStatus: (id: string, newStatus: string) => void;
}

export const useApplicantStore = create<ApplicantStore>((set) => ({
  records: [],
  loadApplicants: () => set({ records: applicantsRecord }),

  updateApplicantStatus: (id: string, newStatus: string) =>
    set((state) => ({
      records: state.records.map((applicant) =>
        String(applicant.id) === id ? { ...applicant, Status: newStatus } : applicant
      ),
    })),
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
  getInterviewer: string;
  setInterviewer: (interviewer: string) => void;
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

  getInterviewer: "",
  setInterviewer: (interviewer) => set({ getInterviewer: interviewer }),

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

  isFeedbackSent: boolean;
  setIsFeedbackSent: (isOpen: boolean) => void;

  isViewPDF: boolean;
  setIsViewPDF: (isOpen: boolean) => void;

  isUpdateSuccessful: boolean;
  setIsUpdateSuccessful: (isOpen: boolean) => void;

  isJobGeneratedOpen: boolean,
  setIsJobGeneratedOpen: (isOpen: boolean) => void;

  isScheduleInterview: boolean;
  setIsScheduleInterview: (isOpen: boolean) => void;

  isForTransfer: boolean;
  setisForTransfer: (isOpen: boolean) => void;

  transferred: boolean;
  setTransferred: (isOpen: boolean) => void;

  isDropdownOpen: boolean;
  setIsDropdownOpen: (isOpen: boolean) => void;

  isAddtoCalendar: boolean;
  setIsAddtoCalendar: (isOpen: boolean) => void;

  isContactApplicant: boolean;
  setIsContactApplicant: (isOpen: boolean) => void;

  resetTransferState: () => void;

  isUpdated: boolean;
  setIsUpdated: (isOpen: boolean) => void;

  isJobGeneratedAlertOpen: boolean;
  setIsJobGeneratedAlertOpen: (isOpen: boolean) => void;

  isUpdatedStatusModalOpen: boolean;
  setIsUpdatedStatusModalOpen: (isOpen: boolean) => void;

  isUpdateStatusButtonModalOpen: boolean;
  setIsUpdateStatusButtonModalOpen: (isOpen: boolean) => void;

  isApplicantNotReachable: boolean;
  setIsApplicantNotReachable: (isOpen: boolean) => void;

  isViewApplicant: boolean;
  setIsViewApplicant: (isOpen: boolean) => void;

  isApplicantUnreachableArchive: boolean;
  setIsApplicantUnreachableArchive: (isOpen: boolean) => void;
}

export const useCloseModal = create<CloseModal>((set) => ({
  isModalOpen: false,
  setIsModalOpen: (isOpen) => set({ isModalOpen: isOpen }),

  isFeedbackSent: false,
  setIsFeedbackSent: (isOpen) => set({ isFeedbackSent: isOpen }),

  isViewPDF: false,
  setIsViewPDF: (isOpen) => set({ isViewPDF: isOpen }),

  isUpdateSuccessful: false,
  setIsUpdateSuccessful: (isOpen) => set({ isUpdateSuccessful: isOpen }),

  isJobGeneratedOpen: true,
  setIsJobGeneratedOpen: (value) => set({ isJobGeneratedOpen: value }),

  isScheduleInterview: false,
  setIsScheduleInterview: (value) => set({ isScheduleInterview: value }),

  isForTransfer: false,
  setisForTransfer: (value) => set({ isForTransfer: value }),

  transferred: false,
  setTransferred: (value) => set({ transferred: value }),

  isDropdownOpen: false,
  setIsDropdownOpen: (value) => set({ isDropdownOpen: value }),

  isAddtoCalendar: false,
  setIsAddtoCalendar: (value) => set({ isAddtoCalendar: value }),


  isContactApplicant: false,
  setIsContactApplicant: (value) => set({ isContactApplicant: value }),

  isUpdated: false,
  setIsUpdated: (value) => set({ isUpdated: value }),


  isUpdatedStatusModalOpen: false,
  setIsUpdatedStatusModalOpen: (value) => set({ isUpdatedStatusModalOpen: value }),

  isJobGeneratedAlertOpen: false,
  setIsJobGeneratedAlertOpen: (value) => set({ isJobGeneratedAlertOpen: value }),

  isUpdateStatusButtonModalOpen: false,
  setIsUpdateStatusButtonModalOpen: (value) => set({ isUpdateStatusButtonModalOpen: value }),

  isApplicantNotReachable: false,
  setIsApplicantNotReachable: (value) => set({ isApplicantNotReachable: value }),

  isViewApplicant: false,
  setIsViewApplicant: (value) => set({ isViewApplicant: value }),

  isApplicantUnreachableArchive: false,
  setIsApplicantUnreachableArchive: (value) => set({ isApplicantUnreachableArchive: value }),

  resetTransferState: () => set((state) => ({
    ...state,  //  Keep existing state
    isForTransfer: false,
    transferred: false,
  }))



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
  Application_Date: string;
  onClose: () => void;
}

// for updating the selected status in update status modal
type StatusType = Applicants["Status"] | null;

interface StatusState {
  selectedStatus: StatusType;
  setSelectedStatus: (status: StatusType) => void;
}

export const useStatusStore = create<StatusState>((set) => ({
  selectedStatus: null,
  setSelectedStatus: (status) => set({ selectedStatus: status })
}))
// end for updating the selected status in update status modal


// for proper displaying of status choices from drop drown
// Define status options
// export type StatusDropDown =
//   | "Applied"
//   | "For Interview"
//   | "Offered"
//   | "Hired"
//   | "For Transfer"
//   | "Transferred"
//   | "Archived";

// type StatusOption = "For Interview" | "Offered" | "Hired" | "Archived" | "Transferred";

// interface DropDownStatusStore {
//   dropdownSelectedStatus: StatusDropDown;
//   availableStatuses: StatusOption[];
//   setDropDownSelectedStatus: (status: StatusDropDown) => void;
// }

// // Status options mapping
// const statusOptions: Record<StatusDropDown, StatusOption[]> = {
//   Applied: ["For Interview", "Offered", "Archived"],
//   "For Interview": ["Offered", "Archived"],
//   Offered: ["Hired", "Archived"],
//   Hired: [],
//   "For Transfer": ["Transferred", "Archived"],
//   Transferred: [],
//   Archived: [],
// };

// // Zustand Store
// export const useDropDownStatusStore = create<DropDownStatusStore>((set) => ({
//   dropdownSelectedStatus: "Applied",
//   availableStatuses: [...statusOptions["Applied"]], // ✅ FIX: Creating a new array instance

//   setDropDownSelectedStatus: (status) => {
//     set(() => ({
//       dropdownSelectedStatus: status,
//       availableStatuses: [...statusOptions[status]], // ✅ FIX: Ensuring a new array instance
//     }));
//   },
// }));

// Type definitions
export const statusOptions = {
  Applied: ["For Interview", "Offered", "Archived"],
  "For Interview": ["Offered", "Archived"],
  Offered: ["Hired", "Archived"],
  Hired: [],
  "For Transfer": ["Transferred", "Archived"],
  Transferred: [],
  Archived: [],
} as const;

export type DropDownStatus = keyof typeof statusOptions;
export type StatusOption = "Offered" | "Archived" | "For Interview" | "Hired" | "Transferred";

interface ApplicantStatusState {
  // Current state
  currentStatus: DropDownStatus;
  isModalOpen: boolean;
  selectedStatus: StatusOption | null;
  excludeForInterviewChoice: DropDownStatus[];

  // Actions
  setCurrentStatus: (status: DropDownStatus) => void;
  setIsModalOpen: (isOpen: boolean) => void;
  setSelectedStatus: (status: StatusOption | null) => void;
  setExcludeForInterviewChoice: (statuses: DropDownStatus[]) => void;
  handleStatusClick: (status: StatusOption) => void;
  resetSelectedStatus: () => void;

  // Computed
  getAvailableStatuses: () => readonly string[];
}

export const useApplicantStatusStore = create<ApplicantStatusState>((set, get) => ({
  // Initial state
  currentStatus: 'Applied',
  isModalOpen: false,
  selectedStatus: null,
  excludeForInterviewChoice: [],

  // Actions
  setCurrentStatus: (status) => set({ currentStatus: status }),
  setIsModalOpen: (isOpen) => set({ isModalOpen: isOpen }),
  setSelectedStatus: (status) => set({ selectedStatus: status }),
  setExcludeForInterviewChoice: (statuses) => set({ excludeForInterviewChoice: statuses }),

  handleStatusClick: (status) => {
    set({
      selectedStatus: status,
      isModalOpen: true
    });
  },

  resetSelectedStatus: () => set({ selectedStatus: null }),

  // Computed value for available statuses
  getAvailableStatuses: () => {
    const { currentStatus, excludeForInterviewChoice } = get();

    // Check if current status is valid
    if (!Object.keys(statusOptions).includes(currentStatus)) {
      return [];
    }

    // Get available statuses based on current status
    let availableStatuses = statusOptions[currentStatus];

    // Filter out "For Interview" if current status is in excludeForInterviewChoice
    if (excludeForInterviewChoice.includes(currentStatus)) {
      return availableStatuses.filter(s => s !== "For Interview");
    }

    return availableStatuses;
  }
}));


interface ModalState {
  isopen: boolean;
  closeModal: () => void;
  openModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isopen: true,
  closeModal: () => set({ isopen: false }),
  openModal: () => set({ isopen: true }),
}))

interface UpdateApplicantState {
  status: string;
  applicantId: string | null; // Add applicantId
  setStatus: (newStatus: string) => void;
  setApplicantId: (id: string) => void;
}

export const useUpdateApplicantStore = create<UpdateApplicantState>((set) => ({
  status: '',
  applicantId: null, // Store the ID
  setStatus: (newStatus: string) => set({ status: newStatus }),
  setApplicantId: (id: string) => set({ applicantId: id }) // Setter for ID
}));


interface DatePickerState {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const useDatePickerStore = create<DatePickerState>((set) => ({
  isOpen: false,
  setIsOpen: (open) => set({ isOpen: open }),
}));
