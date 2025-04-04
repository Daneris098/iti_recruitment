export interface ApplicantStatus {
    applicantName: string;
    applicationDateFrom: string | null;
    applicationDateTo: string | null;
    dateLastUpdatedFrom: string | null;
    dateLastUpdatedTo: string | null;
    position: string;
    status: string;
}

export interface Applicants {
    id: string;
    Applicant_Name: string;
    Application_Date: string;
    Phone: string;
    Email: string;
    Position: string;
    Status: "" | "Offered" | "Archived" | "For Interview" | "Applied" | "Hired" | "For Transfer" | "Transfer Employee" | "Transferred";
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

