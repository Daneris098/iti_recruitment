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
    // Status: "" | "Offered" | "Archived" | "For Interview" | "Applied" | "Hired" | "For Transfer" | "Transferred" | "Transfer Employee";
}

export interface ApplicationMovements {
    HiringTeamFeedback: string;
    ApplicantFeedback: string;
    Order: number;
    Comment: string;
}

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
}

export type StatusType = "Offered" | "Archived" | "For Interview" | "Applied";

export type HandleStatusClickTypes = {
    StatusClick: StatusType
}

// export interface ApplicantResponse {
//     id: number;
//     dateApplied: string;

//     nameResponse: {
//         firstName: string;
//         lastName: string;
//         middleName?: string;
//         suffix?: string;
//     };

//     contact: {
//         mobileNo: string;
//         emailAddress: string;
//         landLineNo?: string;
//     };

//     positionsApplied: {
//         id: number;
//         name: string;
//         salary?: number;
//         choice?: {
//             id: number;
//             name: string;
//         };
//         AvailableDateStart?: string;
//     }[];

//     applicationMovements: {
//         status: {
//             id: number;
//             name: string;
//         };
//         dateMoved?: string;
//         remarks?: string;
//     }[];
// }

export interface ApplicantResponse {
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
            AvailableDateStart?: string;
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
}

export interface ApplicantResponseById {
    id: number;
}

export type ArchivePayload = {
    applicantId: number;
    queryParams: Record<string, any>
}