import { DateTimeUtils } from "@shared/utils/DateTimeUtils";
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

export const APPLICANT_FIELDS: Record<string, (applicant: any) => string | undefined> = {
    id: (applicant) => String(applicant.id),
    applicantName: (applicant) => `${applicant.nameResponse.firstName} ${applicant.nameResponse.lastName}`,
    dateGenerated: (applicant) => DateTimeUtils.dateDefaultToWord(applicant.dateApplied) ?? "",
    dateLastUpdated: (applicant) => DateTimeUtils.dateDefaultToWord(applicant.applicationMovements.at(-1)?.audit?.date) ?? "",
    remarks: (applicant) => applicant.applicationMovements.at(-1)?.comment ?? "",
    status: (applicant) => {
        const lastStatus = applicant.applicationMovements.at(-1)?.status?.name;
        return lastStatus ? STATUS_MAP[lastStatus] ?? "Unknown" : "Unknown";
    },
    attachments: () => "",
};

export interface JobOffersColumns {
    id: string;
    applicantName: string;
    dateGenerated: string;
    dateLastUpdated: string;
    remarks: string;
    status: string;
    attachments: string;
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
}

export interface SharedApplicantStore {
    records: Applicant[];
    setSharedApplicantRecords: (rows: Applicant[]) => void;
    updateApplicantStatus: (id: string, newStatus: string) => void;
}

export type ApplicantRoute = {
    path: string;
    status: string[];
    label: string;
};
