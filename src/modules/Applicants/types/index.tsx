export interface ApplicantStatus {
    company: string[];
    applicantName: string;
    applicationDateFrom: string | null;
    applicationDateTo: string | null;
    dateLastUpdatedFrom: string | null;
    dateLastUpdatedTo: string | null;
    applicationDateValue: string | null;
    position: any;
    status: any;
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