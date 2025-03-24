import { company, branch, division, interviewStage, interviewer, profile, organization, hiring, accountSetupForm } from "@modules/AccountSetup/types"

// Constant values for the interfaces

export const companyValue: company = {
    id: 1,
    code: "C001",
    name: "Tech Innovations Inc."
};

export const companyValue2: company = {
    id: 12,
    code: "C002",
    name: "Tech Innovations Inc2."
};

export const branchValue: branch = {
    id: 1,
    code: "B001",
    name: "Main Branch",
    location: "Quezon City",
    area: "Silicon Valley",
    status: "Active",
    description: "The main branch of Tech Innovations Inc."
};

export const divisionValue: division = {
    id: 1,
    code: "D001",
    name: "Research and Development",
    status: "Active",
    description: "Responsible for innovative product development."
};

export const interviewStageValue: interviewStage = {
    id: 1,
    name: ""
};

export const interviewerValue: interviewer = {
    id: 1,
    name: ""
};

/* Stepper Parents */

export const profileValue: profile = {
    name: {
        lastName: "Doe",
        firstName: "Jane",
        middleName: "A.",
        suffix: "Jr."
    }
};

export const organizationValue: organization = {
    companyList: [companyValue],
    branchList: [branchValue],
    divisionList: [divisionValue]
};

export const hiringValue: hiring = {
    offerResponsePeriod: null,
    applicationSettings: {
        allowReApply: null,
        alloweReApplyAfer: null
    },
    interviewStages: [interviewStageValue],
    interviewers: [interviewerValue]
};

export const formValue: accountSetupForm = {
    profile: profileValue,
    organization: organizationValue,
    hiring: hiringValue
}