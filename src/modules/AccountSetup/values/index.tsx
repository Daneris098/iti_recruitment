import { company, branch, division, interviewStage, interviewer, profile, organization, hiring, form } from "@modules/AccountSetup/types"

// Constant values for the interfaces

export const companyValue: company = {
    id: 1,
    code: "C001",
    name: "Tech Innovations Inc."
};

export const branchValue: branch = {
    id: 1,
    code: "B001",
    name: "Main Branch",
    location: "123 Tech Lane, Silicon Valley",
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
    name: "Initial Screening"
};

export const interviewerValue: interviewer = {
    id: 1,
    name: "John Doe"
};

/* Stepper Parents */

export const profileValue: profile = {
    name: {
        lastName: "Doe",
        fisrtName: "Jane",
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
    offerResponsePeriod: 14,
    applicationSettings: {
        allowReApply: true,
        alloweReApplyAfer: 30
    },
    interviewStages: [interviewStageValue],
    interviewers: [interviewerValue]
};

export const formValue: form = {
    profile: profileValue,
    organization: organizationValue,
    hiring: hiringValue
}