import { IconAlarmPlus, IconCalendarPlus, IconFileCheck, IconFileExcel, IconUserPin, IconUsers, IconUserUp } from "@tabler/icons-react";
import { ChartNoAxesCombined, Trello } from "lucide-react";
import { Reports } from "@modules/Reports/types"
export const reports = [
    {
        title:'Generate Applicant Source Report',
        icon: <IconUserUp strokeWidth={1} />,
        name: "Source Efficiency Report",
        description: "Analyzes the effectiveness of various recruiting sources.",
        type: Reports.sourceEfficiencyReport
    },
    {
        title: 'Generate Applicant Location Summary',
        icon: <IconUserPin strokeWidth={1} />,
        name: "Location Summary",
        description: " Provides an overview of applicant locations and distribution.",
        type: Reports.locationSummary
    },
    {
        title: 'Generate Position Report',
        icon: <IconUsers strokeWidth={1} />,
        name: "Position Report",
        description: "Provides an overview of open positions and candidate progress",
        type: Reports.positionReport
    },
    {
        title: 'Generate Time to Fill Report',
        icon: <IconCalendarPlus strokeWidth={1} />,
        name: "Time to Fill",
        description: "Summary of the duration between job posting and position fulfillment.",
        type: Reports.timeToFill
    },
    {
        title: 'Generate Applicant Status Report',
        icon: <ChartNoAxesCombined strokeWidth={1} />,
        name: "Applicant Status Report",
        description: "Provide summary of applicants under specific status.",
        type: Reports.applicantStatusReport
    },
    {
        title: 'Generate Recruitment Activity Report',
        icon: <Trello strokeWidth={1} />,
        name: "Recruitment Activity Report",
        description: "Summary of interview attendance and job offers extended.",
        type: Reports.recruitmentActivityReport
    },
    {
        title: 'Generate Time to Hire Report',
        icon: <IconAlarmPlus strokeWidth={1} />,
        name: "Time to Hire",
        description: "Tracks duration of the hiring process from application to hire.",
        type: Reports.timeToHire
    },
    {
        title: 'Generate Acceptance Report',
        icon: <IconFileCheck strokeWidth={1} />,
        name: "Offer Acceptance Report",
        description: "Analysis of offer acceptance rates by department.",
        type: Reports.offerAcceptanceReport
    },
    {
        title: 'Generate Offer Rejection Summary',
        icon: <IconFileExcel strokeWidth={1}  />,
        name: "Offer Rejection Summary",
        description: "Provide summary of applicants' feedback on declined offers.",
        type: Reports.offerRejectionSummary
    }
]

export const source = [
    'Employee Referal',
    'JobStreet',
    'Walk-in',
    'Word of Mouth',
    'Head Hunter',
    'Others',
]