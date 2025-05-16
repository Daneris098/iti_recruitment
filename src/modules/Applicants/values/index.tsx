import { ApplicantStatus, Applicants } from "@modules/Applicants/types";

export const filterVal: ApplicantStatus = {
    company: [],
    applicantName: "",
    applicationDateFrom: "",
    applicationDateTo: "",
    dateLastUpdatedFrom: "",
    dateLastUpdatedTo: "",
    applicationDateValue: "",
    position: [],
    status: [],
}

export const selectedVal: Applicants = {
    id: 0,
    applicantName: "",
    applicationDate: "",
    phone: "",
    email: "",
    position: "",
    status: "",
    page: 0,
    pageSize: 0,
    total: 0,
    movement: [],
    comments: ""
}