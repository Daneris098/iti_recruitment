import { create } from 'zustand';
import { sortBy } from "lodash";
import { Applicants, ApplicantStatus, FilterState, PDFProps, FileUploadStore, FileUploadStoreHired } from '@modules/Applicants/types';
import { filterVal, selectedVal } from '@modules/Applicants/values';

// for fetching the json from values folder
interface Applicant {
  id: any;
  applicantName: string;
  applicationDate: string;
  phone: string;
  email: string;
  position: string;
  status: string;
  feedback?: string;
  movement: any;
  comments: string;
  singlePosition: any;
}

interface ApplicantStore {
  records: Applicant[];
  setApplicantRecords: (rows: Applicant[]) => void;
  updateApplicantStatus: (id: string, newStatus: string) => void;
}

export const useApplicantStore = create<ApplicantStore>((set) => ({
  records: [],
  setApplicantRecords: (rows) => set({ records: rows }),
  updateApplicantStatus: (id, newStatus) =>
    set((state) => ({
      records: state.records.map((applicant) =>
        String(applicant.id) === id
          ? { ...applicant, Status: newStatus }
          : applicant
      ),
    })),
}));



interface ApplicantId {
  id: number
  setApplicantId: (id: number) => void
}

// for sorting table
interface SortState {
  columnAccessor: string;
  direction: "asc" | "desc";
  sortedRecords: Applicant[];

  setSort: (column: string, records: Applicant[]) => void;
  setRecords: (records: Applicant[]) => void;
}

export const useSortStore = create<SortState>((set, get) => ({
  columnAccessor: "applicantName",
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

    if (pageSize === -1) {
      return records;
    }

    const startIndex = (page - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, records.length);
    return records.slice(startIndex, endIndex);
  },
}));
// end of pagination store

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
  setClearFilter: (clearFilter: boolean) => set({ clearFilter: clearFilter }),
  setSelectedData: (selectedData: Applicants) => set({ selectedData: selectedData }),
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

  paymentSchemeId: number;
  setPaymentSchemeId: (paymentSchemeId: number) => void;

  fullName: string;
  setFullName: (name: string) => void;

  amount: number;
  setAmount: (amount: number) => void;

  position: string;
  setPosition: (position: string) => void;

  positionId: number;
  setPositionId: (positionId: number) => void;

  department: string;
  setDepartment: (department: string) => void;

  division: string;
  setDivision: (division: string) => void;

  divisionId: number;
  setDivisionId: (divisionId: number) => void;

  departmentId: number;
  setDepartmentId: (departmentId: number) => void;

  comments: string;
  setComments: (comments: string) => void;

  getInterviewer: string;
  setInterviewer: (interviewer: string) => void;

  interviewerId: number;
  setInterviewerID: (interviewerId: number) => void;

  interviewStages: string;
  setInterviewStages: (interviewStages: string) => void;

  interviewStagesId: number;
  setInterviewStagesId: (interviewStagesId: number) => void;

  interviewLocation: string;
  setInterviewLocation: (interviewPosition: string) => void;

  interviewDate: string;
  setInterviewDate: (interviewDate: string) => void;

  interviewTime: string;
  setInterviewTime: (interviewTime: string) => void;
}

export const useDropDownOfferedStore = create<useDropDownOfferedState>((set) => ({
  status: "Offered",
  setStatus: (status) => set({ status }),

  getSalaryTypes: "",
  setSalaryTypes: (type) => set({ getSalaryTypes: type }),

  paymentSchemeId: 0,
  setPaymentSchemeId: (paymentSchemeId) => set({ paymentSchemeId }),

  fullName: "",
  setFullName: (name) => set({ fullName: name }),

  amount: 0,
  setAmount: (amount) => set({ amount }),

  position: "",
  setPosition: (position) => set({ position }),

  positionId: 0,
  setPositionId: (positionId) => set({ positionId }),

  department: "",
  setDepartment: (department) => set({ department }),

  departmentId: 0,
  setDepartmentId: (departmentId) => set({ departmentId }),

  comments: "",
  setComments: (comments) => set({ comments }),

  getInterviewer: "",
  setInterviewer: (interviewer) => set({ getInterviewer: interviewer }),

  interviewerId: 0,
  setInterviewerID: (interviewerId) => set({ interviewerId }),

  interviewStages: "",
  setInterviewStages: (interviewStages) => set({ interviewStages }),

  interviewStagesId: 0,
  setInterviewStagesId: (interviewStagesId) => set({ interviewStagesId }),

  interviewLocation: "",
  setInterviewLocation: (interviewLocation) => set({ interviewLocation }),

  interviewDate: "",
  setInterviewDate: (interviewDate) => set({ interviewDate }),

  interviewTime: "",
  setInterviewTime: (interviewTime) => set({ interviewTime }),

  division: "",
  setDivision: (division) => set({ division }),

  divisionId: 0,
  setDivisionId: (divisionId) => set({ divisionId })
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

  applicantFeedback: string;
  setApplicantFeedback: (applicantFeedback: string) => void;
}

export const useFeedbacksStore = create<Feedbacks>((set) => ({
  feedback: "",
  setFeedback: (feedback) => set({ feedback }),

  applicantFeedback: "",
  setApplicantFeedback: (applicantFeedback) => set({ applicantFeedback }),

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

  isDefaultUpdated: boolean;
  setIsDefaultUpdated: (isOpen: boolean) => void;

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

  isForInterviewOpen: boolean;
  setIsForInterviewOpen: (isOpen: boolean) => void;

  isOffered: boolean;
  setIsOffered: (isOffered: boolean) => void;

  isUpdateStatus: boolean;
  setIsUpdateStatus: (isOffered: boolean) => void;

  isStatusUpdated: boolean;
  setIsStatusUpdated: (isOffered: boolean) => void;

  isForTransferLoader: boolean;
  setIsForTransferLoader: (isOffered: boolean) => void;

  isGenerateNewOffer: boolean;
  setIsGenerateNewOffer: (isOffered: boolean) => void;

  isTransferEmployee: boolean;
  setIsTransferEmployee: (isOpen: boolean) => void;

  isTransferEmployeePosition: boolean;
  setIsTransferEmployeePosition: (isOpen: boolean) => void;

  isForMultipleTransfer: boolean;
  setIsForMultipleTransfer: (isMultipleTransfer: boolean) => void;

  isTransferPosition: boolean;
  setIsTransferPosition: (isTransferPosition: boolean) => void;
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

  isDefaultUpdated: false,
  setIsDefaultUpdated: (value) => set({ isDefaultUpdated: value }),

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

  isForInterviewOpen: false,
  setIsForInterviewOpen: (value) => set({ isForInterviewOpen: value }),

  isOffered: false,
  setIsOffered: (value) => set({ isOffered: value }),

  isUpdateStatus: false,
  setIsUpdateStatus: (value) => set({ isUpdateStatus: value }),

  isStatusUpdated: false,
  setIsStatusUpdated: (value) => set({ isStatusUpdated: value }),

  isForTransferLoader: false,
  setIsForTransferLoader: (value) => set({ isForTransferLoader: value }),

  isGenerateNewOffer: false,
  setIsGenerateNewOffer: (value) => set({ isGenerateNewOffer: value }),

  isTransferEmployee: false,
  setIsTransferEmployee: (value) => set({ isTransferEmployee: value }),

  isTransferEmployeePosition: false,
  setIsTransferEmployeePosition: (value) => set({ isTransferEmployeePosition: value }),

  isForMultipleTransfer: false,
  setIsForMultipleTransfer: (value) => set({ isForMultipleTransfer: value }),

  isTransferPosition: false,
  setIsTransferPosition: (value) => set({ isTransferPosition: value }),

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

export interface ViewApplicantsProps extends Partial<PDFProps> {
  applicantName: string;
  Position: string;
  Status: string;
  Email: string;
  Phone: string;
  Skills: string;
  Remarks: string;
  Application_Date: string;
  IsJobOffer: any;
  onClose: () => void;
}

// for updating the selected status in update status modal
type StatusType = Applicants["status"] | null;

interface StatusState {
  selectedStatus: StatusType;
  setSelectedStatus: (status: StatusType) => void;
}

export const useStatusStore = create<StatusState>((set) => ({
  selectedStatus: null,
  setSelectedStatus: (status) => set({ selectedStatus: status })
}))
// end for updating the selected status in update status modal


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


interface ApplicationDateRangeState {
  applicationDateValue: [Date | null, Date | null];
  setApplicationDateValue: (newValue: [Date | null, Date | null]) => void;
}

export const useApplicationDateStore = create<ApplicationDateRangeState>((set) => ({
  applicationDateValue: [null, null],
  setApplicationDateValue: (newValue) => set({ applicationDateValue: newValue })
}))

interface DateUpdatedRangeState {
  dateUpdated: [Date | null, Date | null];
  setDateUpdated: (newValue: [Date | null, Date | null]) => void;
}

export const useDateUpdatedRangeStore = create<DateUpdatedRangeState>((set) => ({
  dateUpdated: [null, null],
  setDateUpdated: (newValue) => set({ dateUpdated: newValue })
}))

export const useFileUploadStore = create<FileUploadStore>((set, get) => ({
  file: null,
  setFile: (file: File) => set({ file }),
  clearFile: () => set({ file: null }),
  handleFileClick: () => {
    const file = get().file;
    if (file) {
      const fileURL = URL.createObjectURL(file);
      const isPDF = file.type === 'application/pdf';
      if (isPDF) {
        window.open(fileURL, '_blank');
      } else {
        const a = document.createElement('a');
        a.href = fileURL;
        a.download = file.name;
        a.click();
      }
    }
  },
}));

export const useFileUploadHiredStore = create<FileUploadStoreHired>((set, get) => ({
  uploadHiredFile: null,
  setFile: (uploadHiredFile: File) => set({ uploadHiredFile }),
  clearFile: () => set({ uploadHiredFile: undefined }),
  handleFileClick: () => {
    const uploadHiredFile = get().uploadHiredFile;
    if (uploadHiredFile) {
      const fileURL = URL.createObjectURL(uploadHiredFile);
      const isPDF = uploadHiredFile.type === 'application/pdf';
      if (isPDF) {
        window.open(fileURL, '_blank');
      } else {
        const a = document.createElement('a');
        a.href = fileURL;
        a.download = uploadHiredFile.name;
        a.click();
      }
    }
  },
}));

interface SelectedApplicantState {
  selectedIds: number[];
  setSelectedIds: (ids: number[]) => void;
  clearSelectedIds: () => void;
}

export const useSelectedApplicantsStore = create<SelectedApplicantState>((set) => ({
  selectedIds: [],
  setSelectedIds: (ids) => set({ selectedIds: ids }),
  clearSelectedIds: () => set({ selectedIds: [] }),
}))

export const useApplicantIdStore = create<ApplicantId>((set) => ({
  id: 0,
  setApplicantId: (id) => set({ id }),
}))
