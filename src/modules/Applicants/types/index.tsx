//#region View Applicant PDF
export interface ApplicantId {
    id: number
    setApplicantId: (id: number) => void
}

export interface Applicant {
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

export interface ApplicantStore {
    records: Applicant[];
    setApplicantRecords: (rows: Applicant[]) => void;
    updateApplicantStatus: (id: string, newStatus: string) => void;
}

//#region Sort State
export interface SortState {
    columnAccessor: string;
    direction: "asc" | "desc";
    sortedRecords: Applicant[];

    setSort: (column: string, records: Applicant[]) => void;
    setRecords: (records: Applicant[]) => void;
}

//#region Pagination State
export interface PaginationState {
    page: number;
    pageSize: number;
    setPageSize: (size: number) => void;
    setPage: (page: number) => void;
    getPaginatedRecords: (records: Applicant[]) => Applicant[];
}

//#region MODALS



//#region Dropdown offered modal
export interface ModalState {
    isopen: boolean;
    closeModal: () => void;
    openModal: () => void;
}

export interface UpdateApplicantState {
    status: string;
    applicantId: string | null; // Add applicantId
    setStatus: (newStatus: string) => void;
    setApplicantId: (id: string) => void;
}

export interface useDropDownOfferedState {
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

//#region Archived modal
export interface Feedbacks {

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

//#region Close Modal
export interface CloseModal {
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

//#region Close update status modal
export interface CloseUpdateStatusModal {
    isModalOpen: boolean;
    setIsModalOpen: (isOpen: boolean) => void;
}

//#region Applicant Status State
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
export interface ApplicantStatusState {
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


//#region Date picker
export interface DatePickerState {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
}

export interface ApplicationDateRangeState {
    applicationDateValue: [Date | null, Date | null];
    setApplicationDateValue: (newValue: [Date | null, Date | null]) => void;
}

export interface DateUpdatedRangeState {
    dateUpdated: [Date | null, Date | null];
    setDateUpdated: (newValue: [Date | null, Date | null]) => void;
}

//#region Selected Applicant
export interface SelectedApplicantState {
    selectedIds: number[];
    setSelectedIds: (ids: number[]) => void;
    clearSelectedIds: () => void;
}
export interface ApplicantStatus {
    company: string[];
    applicantName: string;
    applicationDateFrom: string | null;
    applicationDateTo: string | null;
    dateLastUpdatedFrom: string | null;
    dateLastUpdatedTo: string | null;
    applicationDateValue: string | null;
    position: string[];
    status: string[];
    dateUpdated: any;
    setDateUpdated: any;
}

export interface Applicants {
    id: number;
    applicantName: string;
    applicationDate: string;
    phone: string;
    email: string;
    position: string;
    status: string;
    page: number;
    pageSize: number;
    total: number;
    movement: string[];
    comments: string
}

export type FileUploadStore = {
    file: File | null;
    setFile: (file: File) => void;
    clearFile: () => void;
    handleFileClick: () => void;
};

export type FileUploadStoreHired = {
    uploadHiredFile: File | null;
    setFile: (uploadHiredFile: File) => void;
    clearFile: () => void;
    handleFileClick: () => void;
};


export interface FilterState {
    selectedData: Applicants;
    filterDrawer: boolean;
    filter: ApplicantStatus;
    clearFilter: boolean;
    isFiltered: boolean;
    modal: boolean;
    alert: string;

    setAlert: (alert: string) => void;
    setModal: (modal: boolean) => void;
    setClearFilter: (clearFilter: boolean) => void;
    setSelectedData: (selectedData: Applicants) => void;
    setFilterDrawer: (filterDrawer: boolean) => void;
    setIsFiltered: (isFiltered: boolean) => void;
    setFilter: (filter: ApplicantStatus) => void;
}

export interface PDFProps {
    applicantName: string;
    Position: string;
    Department: string;
    Remarks: string;
    Salary_Monthly: string;
    Salary_Yearly: string;
    Note_Salary: string;
    Merit_Increase: string;
    Description_VL: string;
    Description_SL: string;
    Description_BL: string;
    Benefit_Paternity: string;
    Benefit_Maternity: string;
    Description_Transpo: string;
    Acknowledgement: string;
    // firstChoice: string;
}

export type StatusType = "Offered" | "Archived" | "For Interview" | "Applied";

export type HandleStatusClickTypes = {
    StatusClick: StatusType
}

export interface ApplicantResponse {
    nameResponse: any;
    items: {
        id: number;
        dateApplied: string;

        nameResponse: {
            firstName: string;
            lastName: string;
            middleName?: string;
            suffix?: string;
        };

        contact: {
            mobileNo: string;
            emailAddress: string;
            landLineNo?: string;
        };

        positionsApplied: {
            id: number;
            name: string;
            salary?: number;
            choice?: {
                id: number;
                name: string;
            };
            availableDateStart?: string; // typo fix: was 'AvailableDateStart'
        }[];

        applicationMovements: {
            status: {
                id: number;
                name: string;
            };
            dateMoved?: string;
            remarks?: string;
        }[];
    }[];
    page: number;
    pageSize: number;
    total: number;
}


export interface ApplicantResponseById {
    id: number[];
}
export interface TransferApplicantsRequest {
    applicantIds: number[];
}

export interface TransferApplicantsResponse {
    // Add whatever properties your API returns on success
    success: boolean;
    transferredIds: number[];
}

export interface ApplicationMovementHired {
    dateStart: string;
    order: number;
}

type Employment = {
    referrer?: string;
    employerName: string;
    location: string;
    positionHeld: string;
    startDate: string;
    endDate: string;
    reasonForLeaving: string;
    contact?: string;
};

type ApplicationMovements = {
    name: string;
    comments: string;
    dates: string;
};

type Comments = {
    comment: string;
}

type Education = {
    name: string;
    course: string;
    educationalLevel: string;
    startDate: string;
    endDate: string;
};

type FamilyMember = {
    name: string;
    age: number;
    occupation: string;
    contact: Float64Array;
};

type SpecialSkill = {
    skill: string;
};

type Conviction = {
    answer: string;
};

type MedicalHistory = {
    answer: string;
}

type FamilyInSameCompany = {
    answer: string;
}
export interface ViewApplicantById {
    name: string;
    department?: string;
    generalInformation: {
        firstChoice: string;
        secondChoice: string;
        desiredSalary: string;
        startAvailability: string;
        presentAddress: string;
        permanentAddress: string;
        dateOfBirth: string;
        placeOfBirth: string;
        age: number;
        gender: string;
        height: string;
        weight: string;
        religion: string;
        civilStatus: string;
        skills?: string[];
        status?: string[];
    };

    governmentIdInformation: {
        gsisNo?: string;
        sssNo?: string;
        pagIbigNo?: string;
        tinNo?: string;
        rdoCode?: string;
        philhealthNo?: string;
        startDate?: string;
        passport?: string;
    };

    education: {
        primary: Education;
    };

    employmentRecord: {
        firstEmployment: Employment;
        secondEmployment: Employment;
    };

    familyBackground: {
        father: FamilyMember;
        mother: FamilyMember;
        siblings: FamilyMember[];
    };

    otherInformation: {
        specialSkills: SpecialSkill;
        medicalHistory: MedicalHistory;
        familyEmployed: FamilyInSameCompany;
        conviction: Conviction;
    };

    characterReference: {
        firstReference: Employment,
        secondReference: Employment
    };
    employmentReferences: {
        info: Employment
    },
    applicationMovements: {
        movements: ApplicationMovements[];
        movementLastModifiedDate?: string;
    },
    commentsByID: {
        item: Comments;
    }
}

export enum ApplicantMovementStatus {
    Applied = "Applied",
    FinalInterview = "Final Interview",
    InitialInterview = "Initial Interview",
    ForInterview = "For Interview",
    Assessment = "Assessment",
    Offered = "Offered",
    Hired = "Hired",
    ForTransfer = "For Transfer",
    Transferred = "Transferred",
    Archived = "Archived",
}

export const statusTransitions: Record<ApplicantMovementStatus, readonly ApplicantMovementStatus[]> = {
    [ApplicantMovementStatus.Applied]: [ApplicantMovementStatus.ForInterview, ApplicantMovementStatus.Offered, ApplicantMovementStatus.Archived],
    [ApplicantMovementStatus.FinalInterview]: [ApplicantMovementStatus.Offered, ApplicantMovementStatus.Archived],
    [ApplicantMovementStatus.InitialInterview]: [ApplicantMovementStatus.Offered, ApplicantMovementStatus.Archived],
    [ApplicantMovementStatus.ForInterview]: [ApplicantMovementStatus.Offered, ApplicantMovementStatus.Archived],
    [ApplicantMovementStatus.Assessment]: [ApplicantMovementStatus.Offered, ApplicantMovementStatus.Archived],
    [ApplicantMovementStatus.Offered]: [ApplicantMovementStatus.Hired, ApplicantMovementStatus.Archived],
    [ApplicantMovementStatus.Hired]: [],
    [ApplicantMovementStatus.ForTransfer]: [ApplicantMovementStatus.Transferred, ApplicantMovementStatus.Archived],
    [ApplicantMovementStatus.Transferred]: [],
    [ApplicantMovementStatus.Archived]: [],
};

export type interviewStagesOption = {
    value: number;
    label: string;
};