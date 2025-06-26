import { DateTimeUtils } from "@shared/utils/DateTimeUtils";
import React from "react";
export interface ApplicantResponseById {
    id: number[];
}
export interface ApplicantResponse {
    dateApplied: string;
    positionsApplied: any;
    applicationMovements: any;
    id: any;
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
export interface Applicant {
    id: number;
    dateApplied?: string;

    nameResponse?: {
        firstName: string;
        lastName: string;
        middleName?: string;
        suffix?: string;
    };

    contact?: {
        mobileNo: string;
        emailAddress: string;
        landLineNo?: string;
    };

    positionsApplied?: {
        id: number;
        name: string;
        salary?: number;
        choice?: {
            id: number;
            name: string;
        };
        availableDateStart?: string;
    }[];

    applicationMovements?: {
        status: {
            id: number;
            name: string;
        };
        dateMoved?: string;
        remarks?: string;
    }[];

    page: number;
    pageSize: number;
    total: number;
}

export enum JobOfferStatus {
    Pending = "Pending",
    Accepted = "Accepted",
    Archived = "Archived"
}

export const STATUS_MAP: Record<string, JobOfferStatus> = {
    Offered: JobOfferStatus.Pending,
    Hired: JobOfferStatus.Accepted,
    Archived: JobOfferStatus.Archived
}
// debugger;
export const APPLICANT_FIELDS: Record<string, (applicant: any) => string | undefined> = {
    id: (applicant) => String(applicant.id),
    applicantName: (applicant) => applicant.applicantName,
    dateGenerated: (applicant) => DateTimeUtils.dateDefaultToWord(applicant.generalApplicant.dateApplied) ?? "",
    dateLastUpdated: (applicant) => DateTimeUtils.dateDefaultToWord(applicant.generalApplicant.applicationMovements.at(-1)?.audit?.date) ?? "",
    remarks: (applicant) => applicant.generalApplicant.applicationMovements.at(-1)?.comment,
    status: (applicant) => {
        const lastStatus = applicant.generalApplicant?.applicationMovements?.at(-1)?.status?.name;
        return lastStatus ? STATUS_MAP[lastStatus] ?? "Unknown" : "Unknown";
    },
    attachments: (applicant) => applicant.acceptedOffer?.[0]?.name ?? ''
};

export interface JobOffersColumns {
    id: string;
    applicantName: string;
    dateGenerated: string;
    dateLastUpdated: string;
    remarks: string;
    status: string;
    attachments: string | React.ReactNode;
}

export interface ApplicantId {
    id: number
    setApplicantId: (id: number) => void
}

export interface Applicant {
    id: number;
    applicantName: string;
    applicationDate: string;
    phone: string;
    email: string;
    position: string;
    status: string;
    feedback?: string;
    movement: string;
    comments: string;
    generalApplicant: any;
    location?: string;
    singlePosition: string;
}

export interface SharedApplicantStore {
    selectedApplicant: any,
    setSelectedApplicant: (setSelectedApplicant: any) => void;
    records: Applicant[];
    setSharedApplicantRecords: (rows: Applicant[]) => void;
    updateApplicantStatus: (id: string, newStatus: string) => void;
}

export type ApplicantRoute = {
    path: string;
    status: string[];
    label: string;
};

export interface SelectedApplicantsStore {
    selectedIds: (string | number)[];
    setSelectedIds: (ids: (string | number)[]) => void;
    addSelectedId: (id: string | number) => void;
    removeSelectedId: (id: string | number) => void;
}

export interface JobOpenings {
    division: any;
    departmentResponse: {
        id: number;
        name?: string;
    };
    id: string | number;
    position: string;
    department: {
        name: any;
        id: number
    }
    company: {
        name: string;
        [key: string]: any;
    } | null;
    availableSlot: number;
    vacancyDuration: {
        dateStart: string;
    }
}

export interface JobOpeningsStore {
    records: JobOpenings[],
    setJobOpenings: (rows: JobOpenings[]) => void;
    updateJobOpenings: (id: string, newJobOpenings: string) => void;
}


export interface ApplicantTransfereeName {
    Applicant_Name: string;
    onClose: () => void;
}

export interface Company {
    id?: number;
    name?: string;
}

export interface Slot {
    id: any;
    position: string;
    company?: Company | null;
    slots: number;
}

export interface PaginationState {
    page: number;
    pageSize: number;
    setPageSize: (size: number) => void;
    setPage: (page: number) => void;
    getPaginatedRecords: (records: Applicant[]) => Applicant[];
}

export type ForInterviewForm = {
    ApplicantId: number;
    Date: string;
    Time: string;
    Location: string;
    Interviewer: {
        Id: number;
        Name: string;
    };
    InterviewStage: {
        Id: number;
        Name: string;
    };
    Order: number;
    Comment?: string;
}

export type HiredForm = {
    ApplicantId: number;
    FileAttachment: File | null;
    Order?: number;
    DateStart: string | null;
}

export type OfferForm = {
    ApplicantId: number;
    Position: {
        Id: number;
        Name: string;
    }
    Department: {
        Id: number;
        Name: string;
    }
    PaymentScheme: {
        Id: number;
        Name: string;
    }
    Salary: number;
    Comment?: string;
}

export type ArchiveForm = {
    ApplicantId: number;
    File: File | null;
    Feedback: string;
    ApplicantFeedback: string;
    Comments?: string;
    Order?: number;
}

export type TransferApplicationPositionForm = {
    applicantId: number;
    position: {
        id: number,
        name: string,
        salary: number,

        choice: {
            id: number;
            name: string;
        },

        availableDateStart: string;
        companyId: number;
        departmentId: number;
    }, comment: string;
}

export type ViewAcceptedOffer = {
    applicantId: number;
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
}

export type TextRendererProps = {
    as?: 'h1' | 'h2' | 'h3' | 'p';
    className?: string;
    children: React.ReactNode;
};


export interface ViewApplicantsProps extends Partial<PDFProps> {
    applicantName: string;
    position: string;
    status: string;
    email: string;
    phone: string;
    skills: string;
    remarks: string;
    applicationDate: string;
    IsJobOffer: any;
    location?: string;
    onClose: () => void;
}

export type ModalsProps = {
    isUpdateStatusOpen: boolean;
    isTransferPositionOpen: boolean;
    isGenerateNewOfferOpen: boolean;
    isViewPDFOpen: boolean;
    onCloseAll: () => void;
    onCloseUpdateStatus: () => void;
    onCloseTransferPosition: () => void;
    onCloseGenerateNewOffer: () => void;
    onClosePDF: () => void;

    applicantName: string;
    Status: string;
    IsJobOffer: string;
    Position: string;
    Remarks: string;
    Acknowledgement: string;
    Department: string;
};

export type AcceptedOffer = {
    path: string;
    name: string;
    isUploaded: boolean;
}[];

export interface SelectedDateStore {
    selectedDate: string | null;
    setSelectedDate: (date: string | null) => void;
}

// export type PDFViewerProps<T> = {
//     identifier: T;
//     getApplicantStatus: (identifier: T) => Promise<"Accepted" | "Pending">;
//     getPdfPathFnHired: (identifier: T) => Promise<string>;
//     getPdfPathFnPending: (identifier: T) => Promise<string>;
// };
// @modules/Shared/types/PDFViewerProps.ts
export type PDFViewerProps<T> = {
    identifier: T;
    token?: string;                                         // ← NEW
    getApplicantStatus: (id: T) => Promise<"Accepted" | "Pending">;
    getPdfPathFnHired: (id: T) => Promise<string>;
    getPdfPathFnPending: (id: T) => Promise<string>;
};


export type PersonalDetailsType = {
    positionsApplied?: {
        id: number | undefined;
        name?: string;
        salary?: string | number;
        availableDateStart?: string;
    }[];
    addresses?: {
        city: any;
        street: any;
        houseNo: any;
        subdivision?: string;
    }[];
    identification?: {
        sssNo?: string;
        hdmfNo?: string;
        phicNo?: string;
        tinNo?: string;
        driversLicenseNo?: string;
        gsisNo?: string;
        passportNo?: string;
    };
    educations?: {
        school?: string;
        course?: string;
        level?: {
            name?: string;
        };
        yearFrom?: string;
        yearTo?: string;
    }[];
    previousEmployments?: {
        company?: string;
        location?: string;
        position?: string;
        dateFrom?: string;
        dateTo?: string;
        reason?: string;
    }[];
    family?: {
        father?: {
            name?: string;
            age?: number;
            occupation?: string;
            contactNo?: string;
        };
        mother?: {
            name?: string;
            age?: number;
            occupation?: string;
            contactNo?: string;
        };
        childCount?: number;
        siblings?: {
            name?: string;
            occupation?: string;
            contact?: string;
        }[];
    };
    characterReferences?: {
        name?: string;
        company?: string;
        position?: string;
        contactNo?: string;
    }[];
    questionnaire?: {
        answer?: string;
    }[];
    birthDate?: any;
    birthPlace?: string;
    civilStatus?: {
        name?: string;
    };
    gender?: {
        name?: string;
    };
    religion?: {
        name?: string;
    };
    height?: string;
    weight?: string;
    skills?: {
        keyword?: string;
    }[];
    mother?: {
        name?: string;
    };
};

export type ApplicationMovementProps = {
    status: { id: number; name: string };
    comment: string;
    audit: { id: number; date: string };
};

export type Movement = {
    status: { id: number; name: string };
    comment: string;
    audit: { id: number; date: string };
};

export interface InterviewSchedule {
    schedule: {
        interviewDate?: string;
        date?: any;
        interviewStage?: {
            name: string;
        };
    };
}
export type ApplicantMovementsProps = {
    applicationMovements: Movement[];
    interviewSchedules: InterviewSchedule[];
};

export type Props = {
    status: string;
    applicantName: string;
    remarks: string;
};
export interface FeedbackBody {
    description: string;
    isApplicantFeedback: boolean;
}
