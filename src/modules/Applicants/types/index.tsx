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
    id: string;
    Applicant_Name: string;
    Application_Date: string;
    Phone: string;
    Email: string;
    Position: string;
    Status: "" | "Offered" | "Archived" | "For Interview" | "Applied" | "Hired" | "For Transfer" | "Transferred" | "Transfer Employee";
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
    Applicant_Name: string;
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
